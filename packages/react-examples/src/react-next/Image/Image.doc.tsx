import * as React from 'react';
import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';
import { ImageCenterExample } from './Image.Center.Example';
import { ImageCenterContainExample } from './Image.CenterContain.Example';
import { ImageCenterCoverExample } from './Image.CenterCover.Example';
import { ImageContainExample } from './Image.Contain.Example';
import { ImageCoverExample } from './Image.Cover.Example';
import { ImageDefaultExample } from './Image.Default.Example';
import { ImageMaximizeFrameExample } from './Image.MaximizeFrame.Example';
import { ImageNoneExample } from './Image.None.Example';

const ImageDefaultExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.Default.Example.tsx') as string;
const ImageCenterExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.Center.Example.tsx') as string;
const ImageContainExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.Contain.Example.tsx') as string;
const ImageCoverExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.Cover.Example.tsx') as string;
const ImageCenterContainExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.CenterContain.Example.tsx') as string;
const ImageCenterCoverExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.CenterCover.Example.tsx') as string;
const ImageNoneExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.None.Example.tsx') as string;
const ImageMaximizeFrameExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Image/Image.MaximizeFrame.Example.tsx') as string;

export const ImagePageProps: IDocPageProps = {
  title: 'Image',
  componentName: 'Image',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Image',
  examples: [
    {
      title: 'ImageFit: Not specified',
      code: ImageDefaultExampleCode,
      view: <ImageDefaultExample />,
    },
    {
      title: 'ImageFit: None',
      code: ImageNoneExampleCode,
      view: <ImageNoneExample />,
    },
    {
      title: 'ImageFit: Center',
      code: ImageCenterExampleCode,
      view: <ImageCenterExample />,
    },
    {
      title: 'ImageFit: Contain',
      code: ImageContainExampleCode,
      view: <ImageContainExample />,
    },
    {
      title: 'ImageFit: Cover',
      code: ImageCoverExampleCode,
      view: <ImageCoverExample />,
    },
    {
      title: 'ImageFit: CenterContain',
      code: ImageCenterContainExampleCode,
      view: <ImageCenterContainExample />,
    },
    {
      title: 'ImageFit: CenterCover',
      code: ImageCenterCoverExampleCode,
      view: <ImageCenterCoverExample />,
    },
    {
      title: 'Maximizing the image frame',
      code: ImageMaximizeFrameExampleCode,
      view: <ImageMaximizeFrameExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react-next/Image/docs/ImageOverview.md'),
  dos: require<string>('!raw-loader!@fluentui/react-examples/src/react-next/Image/docs/ImageDos.md'),
  donts: require<string>('!raw-loader!@fluentui/react-examples/src/react-next/Image/docs/ImageDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'img',
};
