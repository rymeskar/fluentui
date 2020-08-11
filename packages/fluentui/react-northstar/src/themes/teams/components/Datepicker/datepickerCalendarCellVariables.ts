import { pxToRem } from '../../../../utils';

export interface DatepickerCalendarCellVariables {
  height: string;
  width: string;

  backgroundColor: string;
  color: string;

  unfocusedColor: string;

  selectedColor: string;
  selectedBackgroundColor: string;

  referenceColor: string;
  referenceBackgroundColor: string;

  hoverColor: string;
  hoverBackgroundColor: string;
}

export const datepickerCalendarCellVariables = (siteVars: any): DatepickerCalendarCellVariables => ({
  height: pxToRem(32),
  width: pxToRem(32),

  backgroundColor: siteVars.colorScheme.white.foreground,
  color: 'inherit',

  unfocusedColor: siteVars.colorScheme.brand.foregroundDisabled,

  selectedColor: siteVars.colorScheme.brand.background4,
  selectedBackgroundColor: siteVars.colorScheme.brand.foregroundFocus3,

  referenceBackgroundColor: siteVars.colorScheme.brand.foregroundFocus1,
  referenceColor: siteVars.colorScheme.white.foreground,

  hoverBackgroundColor: siteVars.colorScheme.brand.backgroundHover1,
  hoverColor: 'inherit',
});
