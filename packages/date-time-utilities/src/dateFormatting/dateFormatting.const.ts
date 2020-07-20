import { IDateGridStrings, IDateFormatting } from './dateFormatting.types';
import { formatDay } from './formatDay';
import { formatYear } from './formatYear';
import { formatMonthDayYear } from './formatMonthDayYear';
import { formatMonthYear } from './formatMonthYear';

export const DEFAULT_LOCALIZED_STRINGS: IDateGridStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

export const DEFAULT_DATE_FORMATTING: IDateFormatting = {
  formatDay: formatDay,
  formatYear: formatYear,
  formatMonthDayYear: date => formatMonthDayYear(date, DEFAULT_LOCALIZED_STRINGS),
  formatMonthYear: date => formatMonthYear(date, DEFAULT_LOCALIZED_STRINGS),
  parseDate: (dateStr: string) => {
    const date = Date.parse(dateStr);
    if (date) {
      return new Date(date);
    }

    return null;
  },
  ...DEFAULT_LOCALIZED_STRINGS,
};
