import { Accessibility, datepickerBehavior, DatepickerBehaviorProps } from '@fluentui/accessibility';
import {
  DateRangeType,
  DayOfWeek,
  FirstWeekOfYear,
  DEFAULT_CALENDAR_STRINGS,
  IDayGridOptions,
  ICalendarStrings,
  IDatepickerOptions,
  IRestrictedDatesOptions,
} from '@fluentui/date-time-utilities';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  useAutoControlled,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { commonPropTypes, createShorthand, createShorthandFactory, UIComponentProps } from '../../utils';
import { Button } from '../Button/Button';
import { Input, InputProps } from '../Input/Input';
import { Popup, PopupProps } from '../Popup/Popup';
import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';
import { DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarHeader } from './DatepickerCalendarHeader';
import { DatepickerCalendarHeaderAction } from './DatepickerCalendarHeaderAction';
import { DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';
import { validateDate } from './validateDate';
import { format } from '@uifabric/utilities';

export interface DatepickerProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDatepickerOptions> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;

  /** Shorthand for the datepicker calendar. */
  calendar?: ShorthandValue<DatepickerCalendarProps>;

  /** Shorthand for the datepicker popup. */
  popup?: ShorthandValue<PopupProps>;

  /** Shorthand for the date text input. */
  input?: ShorthandValue<InputProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Date needs to be entered, otherwise datepicker produces an error state. */
  required?: boolean;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerProps & { value: Date }>;

  /**
   * Called on error when changing the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChangeError?: ComponentEventHandler<DatepickerProps & { error: string }>;

  /** Target dates can be also entered through the input field. */
  allowManualInput?: boolean;

  /** The component automatically overrides faulty manual input upon blur. */
  fallbackToLastCorrectDateOnBlur?: boolean;

  /** Initial 'calendarOpenState' value. */
  defaultCalendarOpenState?: boolean;

  /** Controls the calendar's open state. */
  calendarOpenState?: boolean;

  /** Initial 'selectedDate' value. */
  defaultSelectedDate?: Date;

  /** Controls the calendar's 'selectedDate'. */
  selectedDate?: Date;
}

export type DatepickerStylesProps = Pick<DatepickerProps, 'allowManualInput'>;

export const datepickerClassName = 'ui-datepicker';

const formatRestrictedInput = (restrictedOptions: IRestrictedDatesOptions, localizationStrings: ICalendarStrings) => {
  if (!!restrictedOptions.minDate && !!restrictedOptions.maxDate) {
    return format(
      localizationStrings.inputBoundedFormatString,
      formatMonthDayYear(restrictedOptions.minDate),
      formatMonthDayYear(restrictedOptions.maxDate),
    );
  } else if (!!restrictedOptions.minDate) {
    return format(localizationStrings.inputMinBoundedFormatString, formatMonthDayYear(restrictedOptions.minDate));
  } else if (!!restrictedOptions.maxDate) {
    return format(localizationStrings.inputMaxBoundedFormatString, formatMonthDayYear(restrictedOptions.maxDate));
  } else {
    return localizationStrings.inputAriaLabel;
  }
};

/**
 * A Datepicker is used to display dates.
 * This component is currently UNSTABLE!
 */
export const Datepicker: ComponentWithAs<'div', DatepickerProps> &
  FluentComponentStaticProps<DatepickerProps> & {
    Calendar: typeof DatepickerCalendar;
    CalendarHeader: typeof DatepickerCalendarHeader;
    CalendarHeaderAction: typeof DatepickerCalendarHeaderAction;
    CalendarHeaderCell: typeof DatepickerCalendarHeaderCell;
    CalendarCell: typeof DatepickerCalendarCell;
    Input: typeof Input;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const inputRef = React.useRef<HTMLElement>();

  const dateFormatting: ICalendarStrings = {
    formatDay: props.formatDay,
    formatYear: props.formatYear,
    formatMonthDayYear: props.formatMonthDayYear,
    formatMonthYear: props.formatMonthYear,
    parseDate: props.parseDate,
    months: props.months,
    shortMonths: props.shortMonths,
    days: props.days,
    shortDays: props.shortDays,
    isRequiredErrorMessage: props.isRequiredErrorMessage,
    invalidInputErrorMessage: props.invalidInputErrorMessage,
    isOutOfBoundsErrorMessage: props.isOutOfBoundsErrorMessage,
    goToToday: props.goToToday,
    openCalendarTitle: props.openCalendarTitle,
    inputPlaceholder: props.inputPlaceholder,
    prevMonthAriaLabel: props.prevMonthAriaLabel,
    nextMonthAriaLabel: props.nextMonthAriaLabel,
    prevYearAriaLabel: props.prevYearAriaLabel,
    nextYearAriaLabel: props.nextYearAriaLabel,
    prevYearRangeAriaLabel: props.prevYearRangeAriaLabel,
    nextYearRangeAriaLabel: props.nextYearRangeAriaLabel,
    monthPickerHeaderAriaLabel: props.monthPickerHeaderAriaLabel,
    yearPickerHeaderAriaLabel: props.yearPickerHeaderAriaLabel,
    closeButtonAriaLabel: props.closeButtonAriaLabel,
    weekNumberFormatString: props.weekNumberFormatString,
    selectedDateFormatString: props.selectedDateFormatString,
    todayDateFormatString: props.todayDateFormatString,
    calendarCellFormatString: props.calendarCellFormatString,
    inputAriaLabel: props.inputAriaLabel,
    inputBoundedFormatString: props.inputBoundedFormatString,
    inputMinBoundedFormatString: props.inputMinBoundedFormatString,
    inputMaxBoundedFormatString: props.inputMaxBoundedFormatString,
  };

  const { calendar, popup, input, className, design, styles, variables, formatMonthDayYear, allowManualInput } = props;
  const valueFormatter = date => (date ? formatMonthDayYear(date, dateFormatting) : '');

  const [openState, setOpenState] = useAutoControlled<boolean>({
    defaultValue: props.defaultCalendarOpenState,
    value: props.calendarOpenState,
    initialValue: false,
  });

  const [selectedDate, setSelectedDate] = useAutoControlled<Date | undefined>({
    defaultValue: props.defaultSelectedDate,
    value: props.selectedDate,
    initialValue: undefined,
  });
  const [formattedDate, setFormattedDate] = React.useState<string>(valueFormatter(selectedDate));

  const restrictedDatesOptions: IRestrictedDatesOptions = {
    minDate: props.minDate,
    maxDate: props.maxDate,
    restrictedDates: props.restrictedDates,
  };

  const [error, setError] = React.useState<string>(() =>
    !!props.selectedDate || !!props.defaultSelectedDate
      ? validateDate(selectedDate, formattedDate, restrictedDatesOptions, dateFormatting, props.required)
      : '',
  );

  const calendarOptions: IDayGridOptions = {
    selectedDate: selectedDate ?? props.today ?? new Date(),
    navigatedDate: !!selectedDate && !error ? selectedDate : props.today ?? new Date(),
    firstDayOfWeek: props.firstDayOfWeek,
    firstWeekOfYear: props.firstWeekOfYear,
    dateRangeType: props.dateRangeType,
    daysToSelectInDayView: props.daysToSelectInDayView,
    today: props.today,
    showWeekNumbers: props.showWeekNumbers,
    workWeekDays: props.workWeekDays,
    ...restrictedDatesOptions,
  };

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Datepicker.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Datepicker.displayName,
    actionHandlers: {
      open: e => {
        if (!allowManualInput) {
          e.preventDefault();
          setOpenState(true);
        }
      },
    },
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerStylesProps>(Datepicker.displayName, {
    className: datepickerClassName,
    mapPropsToStyles: () => ({
      allowManualInput,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const overrideDatepickerCalendarProps = (predefinedProps: DatepickerCalendarProps): DatepickerCalendarProps => ({
    onDateChange: (e, itemProps) => {
      const targetDay = itemProps.value;
      setSelectedDate(targetDay.originalDate);
      setOpenState(false);
      setError('');
      setFormattedDate(valueFormatter(targetDay.originalDate));

      _.invoke(props, 'onDateChange', e, { itemProps, value: targetDay.originalDate });
    },
  });

  const calendarElement = createShorthand(DatepickerCalendar, calendar, {
    defaultProps: () => getA11yProps('calendar', { ...calendarOptions, ...dateFormatting }),
    overrideProps: overrideDatepickerCalendarProps,
  });

  const overrideInputProps = (predefinedProps: InputProps): InputProps => ({
    onClick: (e): void => {
      if (allowManualInput) {
        setOpenState(!openState);
      } else {
        // Keep popup open in case we can only enter the date through calendar.
        setOpenState(true);
      }

      _.invoke(predefinedProps, 'onClick', e, predefinedProps);
    },
    onChange: (e, target: { value: string }) => {
      const parsedDate = props.parseDate(target.value);
      const validationError = validateDate(parsedDate, target.value, calendarOptions, dateFormatting, props.required);
      setError(validationError);
      setFormattedDate(target.value);
      if (!!validationError) {
        _.invoke(props, 'onDateChangeError', e, { ...props, error: validationError });
      } else {
        setSelectedDate(parsedDate);
        _.invoke(props, 'onDateChange', e, { ...props, value: parsedDate });
      }

      _.invoke(predefinedProps, 'onChange', e, predefinedProps);
    },
    onBlur: e => {
      if (props.fallbackToLastCorrectDateOnBlur && !!error) {
        const futureFormattedDate = valueFormatter(selectedDate);
        const validationError = validateDate(
          selectedDate,
          futureFormattedDate,
          calendarOptions,
          dateFormatting,
          props.required,
        );
        setError(validationError);
        setFormattedDate(futureFormattedDate);
        if (!!validationError) {
          _.invoke(props, 'onDateChangeError', e, { ...props, error: validationError });
        }
      }

      _.invoke(predefinedProps, 'onBlur', e, predefinedProps);
    },
  });

  const element = (
    <Ref innerRef={datepickerRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          {createShorthand(Input, input, {
            defaultProps: () =>
              getA11yProps('input', {
                placeholder: props.inputPlaceholder,
                disabled: props.disabled,
                error: !!error,
                value: formattedDate,
                readOnly: !allowManualInput,
                required: props.required,
                ref: inputRef,
                'aria-label': formatRestrictedInput(restrictedDatesOptions, dateFormatting),
              }),
            overrideProps: overrideInputProps,
          })}
          {createShorthand(Popup, popup, {
            defaultProps: () => ({
              open: openState && !props.disabled,
              content: calendarElement,
              trapFocus: {
                disableFirstFocus: true,
              },
              trigger: <Button icon={<CalendarIcon />} title="Open calendar" iconOnly disabled={props.disabled} />,
            }),
            overrideProps: (predefinedProps: PopupProps): PopupProps => ({
              onOpenChange: (e, { open }) => {
                // In case the event is a click on input, we ignore such events as it should be directly handled by input.
                if (!(e.type === 'click' && e.target === inputRef?.current)) {
                  setOpenState(open);
                  _.invoke(predefinedProps, 'onOpenChange', e, { open });
                }
              },
            }),
          })}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

Datepicker.displayName = 'Datepicker';

Datepicker.propTypes = {
  ...commonPropTypes.createCommon(),
  calendar: customPropTypes.itemShorthand,
  popup: customPropTypes.itemShorthand,
  input: customPropTypes.itemShorthand,

  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onDateChange: PropTypes.func,
  onDateChangeError: PropTypes.func,
  allowManualInput: PropTypes.bool,
  fallbackToLastCorrectDateOnBlur: PropTypes.bool,
  defaultCalendarOpenState: PropTypes.bool,
  calendarOpenState: PropTypes.bool,

  selectedDate: PropTypes.instanceOf(Date),
  defaultSelectedDate: PropTypes.instanceOf(Date),

  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  restrictedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

  firstDayOfWeek: PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name])),
  firstWeekOfYear: PropTypes.oneOf(Object.keys(FirstWeekOfYear).map(name => FirstWeekOfYear[name])),
  dateRangeType: PropTypes.oneOf(Object.keys(DateRangeType).map(name => DateRangeType[name])),
  daysToSelectInDayView: PropTypes.number,
  today: PropTypes.instanceOf(Date),
  showWeekNumbers: PropTypes.bool,
  workWeekDays: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name]))),

  formatDay: PropTypes.func,
  formatYear: PropTypes.func,
  formatMonthDayYear: PropTypes.func,
  formatMonthYear: PropTypes.func,

  parseDate: PropTypes.func,

  months: PropTypes.arrayOf(PropTypes.string),
  shortMonths: PropTypes.arrayOf(PropTypes.string),
  days: PropTypes.arrayOf(PropTypes.string),
  shortDays: PropTypes.arrayOf(PropTypes.string),

  isRequiredErrorMessage: PropTypes.string,
  invalidInputErrorMessage: PropTypes.string,
  isOutOfBoundsErrorMessage: PropTypes.string,
  goToToday: PropTypes.string,
  openCalendarTitle: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  prevMonthAriaLabel: PropTypes.string,
  nextMonthAriaLabel: PropTypes.string,
  prevYearAriaLabel: PropTypes.string,
  nextYearAriaLabel: PropTypes.string,
  prevYearRangeAriaLabel: PropTypes.string,
  nextYearRangeAriaLabel: PropTypes.string,
  monthPickerHeaderAriaLabel: PropTypes.string,
  yearPickerHeaderAriaLabel: PropTypes.string,
  closeButtonAriaLabel: PropTypes.string,
  weekNumberFormatString: PropTypes.string,
  selectedDateFormatString: PropTypes.string,
  todayDateFormatString: PropTypes.string,
  calendarCellFormatString: PropTypes.string,

  inputAriaLabel: PropTypes.string,
  inputBoundedFormatString: PropTypes.string,
  inputMinBoundedFormatString: PropTypes.string,
  inputMaxBoundedFormatString: PropTypes.string,
};

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,

  calendar: {},
  popup: {},
  input: {},

  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  fallbackToLastCorrectDateOnBlur: true,
  allowManualInput: true,
  required: false,

  ...DEFAULT_CALENDAR_STRINGS,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

Datepicker.Calendar = DatepickerCalendar;
Datepicker.CalendarHeader = DatepickerCalendarHeader;
Datepicker.CalendarHeaderAction = DatepickerCalendarHeaderAction;
Datepicker.CalendarHeaderCell = DatepickerCalendarHeaderCell;
Datepicker.CalendarCell = DatepickerCalendarCell;
Datepicker.Input = Input;
