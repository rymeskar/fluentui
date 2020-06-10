import createCache from '@emotion/cache';
import { ObjectInterpolation, serializeStyles } from '@emotion/serialize';
import { StyleSheet } from '@emotion/sheet';
import { EmotionCache, insertStyles } from '@emotion/utils';
import {
  Renderer,
  RendererRenderGlobal,
  RendererRenderFont,
  RendererRenderRule,
} from '@fluentui/react-northstar-styles-renderer';
// @ts-ignore No typings :(
import focusVisiblePlugin from '@quid/stylis-plugin-focus-visible';
// @ts-ignore No typings :(
import rtlPlugin from 'stylis-plugin-rtl';
import * as React from 'react';

import { disableAnimations } from './disableAnimations';
import { generateFontSource, getFontLocals, toCSSString } from './fontUtils';
import { invokeKeyframes } from './invokeKeyframes';

export function createEmotionRenderer(target?: Document): Renderer {
  const cacheLtr = createCache({
    container: target?.head,
    key: 'fui',
    stylisPlugins: [focusVisiblePlugin],

    // TODO: make this configurable via perf flags
    speedy: true,
  }) as EmotionCache & { insert: Function };
  const cacheRtl = createCache({
    container: target?.head,
    key: 'rfui',
    stylisPlugins: [focusVisiblePlugin, rtlPlugin],

    // TODO: make this configurable via perf flags
    speedy: true,
  });

  const sheet = new StyleSheet({
    key: `${cacheLtr.key}-global`,
    nonce: cacheLtr.sheet.nonce,
    container: cacheLtr.sheet.container,
  });

  const Provider: React.FC = props => {
    // TODO: Find a way to cleanup global styles
    // React.useEffect(() => {
    // return () => sheet.flush();
    // });

    return React.createElement(React.Fragment, null, props.children);
  };

  const renderRule: RendererRenderRule = (styles, param) => {
    // Emotion has a bug with passing empty objects, should be fixed in upstream
    if (Object.keys(styles).length === 0) {
      return '';
    }

    const cache = param.direction === 'ltr' ? cacheLtr : cacheRtl;
    const style = param.disableAnimations ? disableAnimations(styles) : styles;
    const serialized = serializeStyles([invokeKeyframes(cache, style) as any], cache.registered, undefined);

    insertStyles(cache, serialized, true);

    return `${cache.key}-${serialized.name}`;
  };

  const renderGlobal: RendererRenderGlobal = (styles, selector) => {
    if (typeof styles === 'string') {
      const serializedStyles = serializeStyles(
        [styles],
        // This looks as a bug in typings as in Emotion code this function can be used with a single param.
        // https://github.com/emotion-js/emotion/blob/a076e7fa5f78fec6515671b78801cfc9d6cf1316/packages/core/src/global.js#L45
        // @ts-ignore
        undefined,
      );

      cacheLtr.insert(``, serializedStyles, sheet, false);
    }

    if (typeof styles === 'object') {
      if (typeof selector !== 'string') {
        throw new Error('A valid "selector" is required when an object is passed to "renderGlobal"');
      }

      const serializedStyles = serializeStyles(
        [{ [selector]: (styles as unknown) as ObjectInterpolation<{}> }],
        // This looks as a bug in typings as in Emotion code this function can be used with a single param.
        // https://github.com/emotion-js/emotion/blob/a076e7fa5f78fec6515671b78801cfc9d6cf1316/packages/core/src/global.js#L45
        // @ts-ignore
        null,
      );

      cacheLtr.insert(``, serializedStyles, sheet, false);
    }
  };
  const renderFont: RendererRenderFont = font => {
    const { localAlias, ...otherProperties } = font.props;

    const fontLocals = getFontLocals(localAlias);
    const fontFamily = toCSSString(font.name);

    renderGlobal(
      {
        ...otherProperties,
        src: generateFontSource(font.paths, fontLocals),
        fontFamily,
      },
      '@font-face',
    );
  };

  return {
    renderGlobal,
    renderFont,
    renderRule,

    Provider,
  };
}
