import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusTrapZonePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/FocusTrapZone/FocusTrapZone.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FocusTrapZonePage/docs/FocusTrapZoneRelated.md') as string;

export const FocusTrapZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
