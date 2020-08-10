import {
  Accessibility,
  datepickerCalendarCellBehavior,
  DatepickerCalendarCellBehaviorProps,
} from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  compose,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, ComponentKeyboardEventHandler } from '../../types';
import { commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';

export interface DatepickerCalendarCellProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarCellBehaviorProps>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<DatepickerCalendarCellProps>;

  /** A cell can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A cell can show that it is currently selected or not. */
  selected?: boolean;

  /** Denotes that the cell marks today's date. */
  reference?: boolean;

  /** A cell can show that it is currently not in the main focus. */
  unfocused?: boolean;

  /**
   * Called on selected item key down.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<DatepickerCalendarCellProps>;
}

export type DatepickerCalendarCellStylesProps = Pick<
  DatepickerCalendarCellProps,
  'disabled' | 'selected' | 'unfocused' | 'reference'
>;

export const datepickerCalendarCellClassName = 'ui-datepicker__calendarcell';
/**
 * A Datepicker cell is used to display calendar grid cells.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarCell = compose<
  'button',
  DatepickerCalendarCellProps,
  DatepickerCalendarCellStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { className, design, styles, variables, disabled, selected, unfocused, reference, content } = props;
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        performClick: e => {
          // prevent Spacebar from scrolling
          e.preventDefault();
          handleClick(e);
        },
      },
      mapPropsToBehavior: () => ({
        selected,
        disabled,
        unfocused,
        reference,
      }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarCellStylesProps>(DatepickerCalendarCell.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        disabled,
        selected,
        unfocused,
        reference,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      composeOptions,
      unstable_props: props,
    });
    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          onClick: handleClick,
          ref,
          ...unhandledProps,
        })}
      >
        {content}
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: datepickerCalendarCellClassName,
    displayName: 'DatepickerCalendarCell',

    handledProps: [
      'accessibility',
      'as',
      'className',
      'content',
      'design',
      'disabled',
      'onClick',
      'selected',
      'styles',
      'variables',
      'unfocused',
      'reference',
    ],
  },
);

DatepickerCalendarCell.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  unfocused: PropTypes.bool,
  reference: PropTypes.bool,
};

DatepickerCalendarCell.defaultProps = {
  accessibility: datepickerCalendarCellBehavior,
  as: 'button',
};
