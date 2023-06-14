import { DateType, IDatetimeProps } from '../../util/datetime';
import { MbscRecurrenceRule } from '../../util/recurrence.types.public';
import { MbscCalendarNavService } from '../calendar-nav/calendar-nav';
import { InstanceServiceBase } from '../instance-service';
import { MbscCalendarDayData } from './calendar-day';
import { CalendarViewBase } from './calendar-view';
import { MbscCalendarColor, MbscCalendarEvent, MbscCalendarEventData, MbscCalendarLabel, MbscCalendarMarked, MbscResource } from './calendar-view.types.public';
export * from './calendar-view.types.public';
export declare type ViewType = 'month' | 'year' | 'multi-year';
export interface IPageChangeEvent {
    firstDay: Date;
    lastDay: Date;
    viewStart: Date;
    viewEnd: Date;
}
export interface IPageLoadingEvent {
    firstDay: Date;
    lastDay: Date;
    month?: Date;
    viewChanged: boolean;
    viewStart: Date;
    viewEnd: Date;
    inst: CalendarViewBase;
}
export interface IPageLoadedEvent {
    activeElm: HTMLDivElement;
    firstDay: Date;
    lastDay: Date;
    month: Date;
    viewStart: Date;
    viewEnd: Date;
}
/** Common interface for all kind of labels (standard, more, count, placeholder). */
export interface ICalendarProcessedLabel {
    id: string | number;
    /** Total number of labels for the day, in case when the label is showing the count. */
    count?: number;
    /** Label data in case of standard labels. */
    event?: MbscCalendarLabel;
    /** The calculated aria-label text for accessibility */
    label?: string;
    /** Last day of the month, needed when outer days are not shown */
    lastDay?: Date;
    /** More text in case of 'x more' labels. */
    more?: string;
    /** Indicates if it's a label spanning across multiple days. */
    multiDay?: boolean;
    /** Indicates if it's just a placeholder label. */
    placeholder?: boolean;
    /** Multiple day labels will have an empty label rendered for each day, without text. */
    showText?: boolean;
    /** Width of the label in case of multiple days. */
    width?: number;
}
/** Label data for one calendar day. */
export interface ICalendarLabelData {
    /** Labels to display on the given day, including placeholders and more label. */
    data: ICalendarProcessedLabel[];
    /** All the labels for the given day. */
    events: MbscCalendarLabel[];
}
/** @hidden */
export interface ICalendarProps extends IDatetimeProps {
    cssClass?: string;
    colors?: MbscCalendarColor[];
    downIcon?: string;
    hasPicker?: boolean;
    height?: number | string;
    hoverEnd?: number;
    hoverStart?: number;
    labels?: MbscCalendarLabel[];
    marked?: MbscCalendarMarked[];
    mousewheel?: boolean;
    nextIconH?: string;
    nextIconV?: string;
    prevIconH?: string;
    prevIconV?: string;
    rangeStart?: number;
    rangeEnd?: number;
    resourcesMap?: {
        [key: number]: MbscResource;
    };
    showControls?: boolean;
    showEventTooltip?: boolean;
    showLabelCount?: boolean;
    showToday?: boolean;
    upIcon?: string;
    width?: number | string;
    dateText?: string;
    eventText?: string;
    eventsText?: string;
    firstDay?: number;
    moreEventsText?: string;
    moreEventsPluralText?: string;
    nextPageText?: string;
    prevPageText?: string;
    timeText?: string;
    onDayHoverIn?(args: any, inst: any): void;
    onDayHoverOut?(args: any, inst: any): void;
    onResize?(args: any, inst: any): void;
}
/** @hidden */
export interface ICalendarViewProps extends ICalendarProps {
    activeDate?: number;
    calendarScroll?: 'horizontal' | 'vertical';
    calendarType?: 'year' | 'month' | 'week';
    clickToCreate?: boolean | 'double' | 'single';
    className?: string;
    dragData?: ILabelDragData;
    dragToCreate?: boolean;
    dragToMove?: boolean;
    dragToResize?: boolean;
    endDay?: number;
    eventMap?: {
        [key: string]: MbscCalendarEvent[];
    };
    eventOrder?: (event1: MbscCalendarLabel, event2: MbscCalendarLabel) => number;
    eventRange?: 'year' | 'month' | 'week' | 'day';
    eventRangeSize?: number;
    instanceService?: InstanceServiceBase;
    hasContent?: boolean;
    headerTemplate?: any;
    isPicker?: boolean;
    labelList?: 'all' | boolean | number;
    labelsMap?: {
        [key: string]: MbscCalendarEvent[];
    };
    marksMap?: {
        [key: string]: MbscCalendarEvent[];
    };
    mouseSwipe?: boolean;
    navigationService?: MbscCalendarNavService;
    noOuterChange?: boolean;
    pageLoad?: number;
    pages?: number | 'auto';
    refDate?: DateType;
    responsiveStyle?: boolean;
    selectedDates?: any;
    selectedEventsMap?: {
        [key: number]: MbscCalendarEvent;
    };
    selectMultipleEvents?: boolean;
    selectView?: ViewType;
    showCalendar?: boolean;
    showSchedule?: boolean;
    showOuterDays?: boolean;
    showWeekNumbers?: boolean;
    size?: number;
    startDay?: number;
    swipe?: boolean;
    update?: number;
    weeks?: number;
    resolution?: 'hour' | 'day' | 'week' | 'month' | 'year';
    onActiveChange?(args: any, inst: any): void;
    onCellHoverIn?(args: any, inst: any): void;
    onCellHoverOut?(args: any, inst: any): void;
    onDayClick?(args: any, inst: any): void;
    onDayDoubleClick?(args: any, inst: any): void;
    onDayRightClick?(args: any, inst: any): void;
    onGestureStart?(args: any, inst: any): void;
    onLabelClick?(args: any, inst: any): void;
    onLabelDoubleClick?(args: any, inst: any): void;
    onLabelRightClick?(args: any, inst: any): void;
    onLabelHoverIn?(args: any, inst: any): void;
    onLabelHoverOut?(args: any, inst: any): void;
    onLabelDelete?(args: any): void;
    onLabelUpdateStart?(args: any): void;
    onLabelUpdateMove?(args: any): void;
    onLabelUpdateEnd?(args: any): void;
    onLabelUpdateModeOn?(args: any): void;
    onLabelUpdateModeOff?(args: any): void;
    onPageChange?(args: IPageChangeEvent, inst: any): void;
    onPageLoaded?(args: IPageLoadedEvent, inst: any): void;
    onPageLoading?(args: IPageLoadingEvent, inst: any): void;
    onSelectedEventsChange?(args: any, inst: any): void;
    onTodayClick?(): void;
    renderDay?(args: MbscCalendarDayData): any;
    renderDayContent?(args: MbscCalendarDayData): any;
    renderHeader?(): any;
    renderLabel?(event: MbscCalendarEventData): any;
    renderLabelContent?(event: MbscCalendarEventData): any;
}
/** @hidden */
export interface ICalendarViewState {
    cellTextHeight?: number;
    hasScrollY?: boolean;
    maxLabels?: number;
    pageSize: number;
    pickerSize: number;
    ready?: boolean;
    height: 'sm' | 'md';
    labelHeight?: number;
    update?: number;
    width: 'sm' | 'md';
    view?: ViewType;
    viewClosing?: ViewType;
    viewOpening?: ViewType;
}
/** @hidden */
export interface ICalendarViewHost {
    _theme: string;
    _calendarView: CalendarViewBase;
    _instanceService: InstanceServiceBase;
}
export interface ILabelDragDataSet {
    event?: MbscCalendarLabel;
    width?: number;
}
export interface ILabelDragData {
    /**
     * The dates of the event which is dragged.
     * We need to display the event boxes in case of touch drag, when we enter drag mode,
     * and continue to display during drag, but invisible, otherwise, if we loose the
     * element on which the touch started, the touch events will stop firing.
     */
    originDates?: {
        [key: string]: ILabelDragDataSet;
    };
    /** The dates of the dragged event. Only containing the start of the event on every week and the
     * width of the event on that week
     */
    draggedDates?: {
        [key: string]: ILabelDragDataSet;
    };
    /** The dragged event, displayed during drag. */
    draggedEvent?: MbscCalendarEvent;
}
/** Common interface for colors, marked and labels */
export interface ICalendarData {
    date?: Date | string | object;
    start?: Date | string | object;
    end?: Date | string | object;
    recurring?: MbscRecurrenceRule | string;
    recurringException?: Array<string | object | Date> | string | object | Date;
    recurringExceptionRule?: MbscRecurrenceRule | string;
    /** Occurrence number in case of recurrence */
    nr?: number;
    /** Occurrence id in case of recurrence */
    occurrenceId?: string;
    /** Origin of the occurrence */
    original?: ICalendarData;
    /** CSS class for custom CSS. */
    cssClass?: string;
    [x: string]: any;
}
