import { IBaseProps } from '../base';
import { MbscCalendarSystem } from '../commons';
import { MbscRecurrenceRule } from './recurrence.types.public';
export declare const REF_DATE: Date;
export declare const DAY_OF_MONTH: RegExp;
export declare const DAY_OF_WEEK: RegExp;
export declare const ONE_MIN = 60000;
export declare const ONE_HOUR: number;
export declare const ONE_DAY: number;
export declare type DateType = string | Date | object;
export interface IValidateProps {
    allDay?: boolean;
    start?: DateType;
    end?: DateType;
    recurring?: MbscRecurrenceRule | string;
    recurringException?: DateType[] | DateType;
    recurringExceptionRule?: MbscRecurrenceRule | string;
}
export interface IDate extends Date {
    /** @hidden
     * It's a flag indicating that the Date Object as a Mobiscroll Date
     */
    _mbsc?: boolean;
    /**
     * Switches the timezone of the Date
     * @param timezone The timezone to switch the date to
     */
    setTimezone(timezone: string): void;
    /**
     * Returns a new Date object initialized with the same values.
     */
    clone(): IDate;
    createDate(value: number | Date): IDate;
    createDate(year?: number | string | IDate | Date, month?: number, date?: number, h?: number, min?: number, sec?: number, ms?: number): IDate;
}
export interface ITimezonePlugin {
    parse(date: number | string, s: any): IDate;
    createDate(s: any, year?: number | string | IDate | Date, month?: number, date?: number, h?: number, min?: number, sec?: number, ms?: number): IDate;
}
/** @hidden */
export interface IDatetimeProps extends IBaseProps {
    allDayText?: string;
    amText?: string;
    calendarSystem?: MbscCalendarSystem;
    dateFormat?: string;
    dateFormatLong?: string;
    dayNames?: string[];
    dayNamesMin?: string[];
    dayNamesShort?: string[];
    daySuffix?: string;
    defaultValue?: any;
    endDay?: number;
    exclusiveEndDates?: boolean;
    firstDay?: number;
    fromText?: string;
    invalid?: DateType[] | IValidateProps[];
    max?: DateType;
    min?: DateType;
    moment?: any;
    monthNames?: string[];
    monthNamesShort?: string[];
    monthSuffix?: string;
    pmText?: string;
    returnFormat?: 'jsdate' | 'iso8601' | 'locale' | 'moment';
    separator?: string;
    shortYearCutoff?: string | number;
    showEventTooltip?: boolean;
    startDay?: number;
    timeFormat?: string;
    timezonePlugin?: ITimezonePlugin;
    displayTimezone?: 'local' | 'utc' | string;
    dataTimezone?: 'local' | 'utc' | string;
    todayText?: string;
    toText?: string;
    yearSuffix?: string;
    valid?: DateType[] | IValidateProps[];
    weekText?: string;
    getDate?: (y: number, m: number, d: number, h?: number, i?: number, s?: number, u?: number) => Date;
    getDay?: (d: Date) => number;
    getMaxDayOfMonth?: (y: number, m: number) => number;
    getMonth?: (d: Date) => number;
    getWeekNumber?: (d: Date) => number;
    getYear?: (d: Date) => number;
}
/**
 * Returns if a date object is a pseudo-date object
 * Pseudo-date objects are our implementation of a Date interface
 */
export declare function isMBSCDate(d: any): d is IDate;
/**
 * Returns an ISO8601 date string in data timezone, if it's a timezoned date, otherwise the original date.
 * @param d The date to check.
 * @param s Options object containing timezone options.
 * @param tz Explicit timezone, if specified
 */
export declare function convertTimezone(d: DateType, s: IDatetimeProps, tz?: string): DateType;
/** @hidden */
export declare const dateTimeLocale: IDatetimeProps;
export declare const ISO_8601_FULL: RegExp;
export declare const ISO_8601_TIME: RegExp;
/**
 * Returns the milliseconds of a date since midnight.
 * @hidden
 * @param d The date.
 */
export declare function getDayMilliseconds(d: Date): number;
/**
 * Checks if two date ranges are overlapping each other
 * @hidden
 * @param start1 start date of the first range
 * @param end1 end date of the first range
 * @param start2 start date of the second range
 * @param end2 end date of the second range
 * @param adjust if true, 0 length range will be modified to 1ms
 * @returns true if there is overlap false otherwise
 */
export declare function checkDateRangeOverlap(start1: Date, end1: Date, start2: Date, end2: Date, adjust?: boolean): boolean;
/**
 * Returns the starting point of a day in display timezone
 * @param s
 * @param d
 * @returns
 */
export declare function getDayStart(s: IDatetimeProps, d: Date): Date;
/**
 * Returns the last point of a day in display timezone
 * @param s
 * @param d
 * @returns
 */
export declare function getDayEnd(s: IDatetimeProps, d: Date): Date;
/** @hidden */
export declare function getEndDate(s: IDatetimeProps, allDay: boolean | undefined, start: Date, end: Date, isList?: boolean): Date;
/** @hidden */
export declare function getDateStr(d: Date): string;
/** @hidden */
export declare function getDateOnly(d: Date, nativeDate?: boolean): Date;
/** @hidden */
export declare function getUTCDateOnly(d: Date): number;
/**
 * Returns the difference in days for two dates
 * @hidden
 * @param d1 First date
 * @param d2 Second date
 * @returns Difference in days
 */
export declare function getDayDiff(d1: Date, d2: Date): number;
/**
 * Returns the number of days between two dates if there are missing days between them
 * @hidden
 */
export declare function getGridDayDiff(from: Date, to: Date, startDay: number, endDay: number): number;
/**
 * Returns the date of the first day of the week for a given date
 * @hidden
 */
export declare function getFirstDayOfWeek(d: Date, s: any, w?: number): Date;
/**
 * Checks if two dates are on the same date
 * @hidden
 * @param d1 First date
 * @param d2 Second date
 * @returns True or false
 */
export declare function isSameDay(d1: Date, d2: Date): boolean;
/**
 * Checks if two dates renges are on the same range
 * @hidden
 * @param d1 First date of first range
 * @param d2 Second date of first range
 * @param d3 First date of second range
 * @param d4 Second date of second range
 * @returns True or false
 */
export declare function isSameDateRange(d1: Date, d2: Date, d3: Date, d4: Date): boolean;
/**
 * Check if 2 dates are in the same month (depends on the calendar system).
 * @param d1 First date.
 * @param d2 Second date.
 * @param s Settings containing the calendar system functions.
 */
export declare function isSameMonth(d1: Date, d2: Date, s: IDatetimeProps): boolean;
/** @hidden */
export declare function adjustedDate(y: number, m: number, d: number, h?: number, i?: number, s?: number, u?: number): Date;
export declare function isDate(d: any): d is Date;
export declare function isTime(d: any): boolean;
/**
 * When timezoneplugin is specified, return a date with the same parts as the passed date (year, month, day, hour)
 * only with a timezone specified to display timezone
 * Otherwise it returns the same thing in the local timezone
 * @param s Settings object
 * @param d Date object
 * @returns
 */
export declare function addTimezone(s: any, d: Date): Date;
/**
 * Returns a local date with the same year/monthday/hours/minutes... as the original date in the parameter
 * It does not convert to any timezone, it just takes the date/hour/minute and creates a new local date from that
 * @param d Date with or without timezone data or null/undefined
 * @returns A new local Date object or undefined/null when nothing is pass as param
 */
export declare function removeTimezone(d: Date): Date;
/**
 * Creates a new date object, depending on the parameters.
 * Will return a native Date object or a Mobiscroll Date object depending on what timezoneplugin is specified in
 * the Settings object.
 * Can be passed another datetime to initialize from, or can be passed individual date and time parameters
 * @param s Mobiscroll Settings object
 * @param yearOrStamp The year or the other date string/timestamp/object
 * @param month The month
 * @param date The date of month
 * @param h The Hour
 * @param min The Minute
 * @param sec The Second
 * @param ms The Millisecond
 * @returns
 */
export declare function createDate(s: any, value?: number | string | Date | IDate): Date;
export declare function createDate(s: any, year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number): Date;
/** @hidden */
export declare function makeDate(d: any, s?: any, format?: any, parts?: any, skipTimezone?: boolean): any;
/** @hidden */
export declare function returnDate(d: Date, s: IDatetimeProps, displayFormat: string, isoParts: any, hasTimePart: boolean): any;
/**
 * Format a date into a string value with a specified format.
 * @param {string} format - Output format.
 * @param {Date} date - Date to format.
 * @param {IDatetimeProps} options - Locale options.
 * @returns {string} The formatted date string.
 */
export declare function formatDatePublic(format: string, date: Date, options?: IDatetimeProps): string;
/**
 * Format a date into a string value with a specified format.
 * This is for inner usage, and it's faster than the one above, because it skips the option merge.
 * @param {string} format - Output format.
 * @param {Date} date - Date to format.
 * @param {IDatetimeProps} options - Locale options.
 * @returns {string} The formatted date string.
 */
export declare function formatDate(format: string, date: Date, s: IDatetimeProps): string;
/**
 * Extract a date from a string value with a specified format.
 * @param {string} format Input format.
 * @param {string} value String to parse.
 * @param {IDatetimeProps} options Locale options
 * @return {Date} Returns the extracted date or defaults to now if no format or no value is given
 */
export declare function parseDate(format: string, value: string, options: IDatetimeProps): Date;
/** Value Equality function for Date and Array of Date types
 * Checks if two dates or two array of dates are the same.
 * NOTE: empty Arrays are treated the same way as null values because,
 * when parsing a null value, the returned value representation is an empty object (datepicker),
 * which when turned back, won't be null, but rather an empty array
 */
export declare function dateValueEquals(v1: any, v2: any, s: IDatetimeProps): boolean;
/**
 * Clones a date object (native or custom mbsc date).
 * @param date The date to clone.
 */
export declare function cloneDate(date: Date): Date;
/**
 * Adds the sepcified number of days to a date. Returns a new date object.
 * @param date The date.
 * @param days Days to add.
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Adds the sepcified number of days to a date. Returns a new date object.
 * @param date The date.
 * @param days Days to add.
 */
export declare function addMonths(date: Date, months: number, s: IDatetimeProps): Date;
/**
 * Check if a day is inside the visible week days.
 * @param day Weekday to check.
 * @param startDay Start day of the week.
 * @param endDay End day of the week.
 */
export declare function isInWeek(day: number, startDay: number, endDay: number): boolean;
/**
 * Rounds a date to the specified minute step.
 * @param date The date to round.
 * @param step Step specified as minutes.
 */
export declare function roundTime(date: Date, step: number): Date;
/** Constrains a date to min and max */
export declare function constrainDate(date: Date, min?: Date, max?: Date): Date;
