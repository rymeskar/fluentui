import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { StackPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Stack/Stack.doc';

export const StackPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Stack.page.json')}
    {...{ ...StackPageProps, ...props }}
  />
);
