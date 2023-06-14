import { DateType } from '../../../core/util/datetime';
import { MbscCalendarNavService } from '../../shared/calendar-nav/calendar-nav';
import { MbscCalendarDayData } from '../../shared/calendar-view/calendar-day';
import { CalendarViewBase } from '../../shared/calendar-view/calendar-view';
import { ICalendarProps, ViewType } from '../../shared/calendar-view/calendar-view.types';
import { InstanceServiceBase } from '../../shared/instance-service';
import { PickerBase } from '../../shared/picker/picker';
import { IPickerProps, IPickerState } from '../../shared/picker/picker.types';
/**
 * Calendar options
 * @interface MbscCalendarOptions
 */
export interface MbscCalendarOptions extends IPickerProps, ICalendarProps {
    active?: number;
    calendarType?: 'year' | 'month' | 'week';
    calendarScroll?: 'horizontal' | 'vertical';
    pages?: number | 'auto';
    refDate?: DateType;
    selectMax?: number;
    selectMin?: number;
    selectMultiple?: boolean;
    selectRange?: boolean;
    showOuterDays?: boolean;
    showWeekNumbers?: boolean;
    selectView?: ViewType;
    size?: number;
    weeks?: number;
    selectedText?: string;
    selectedPluralText?: string;
    /** @hidden */
    calendarHeaderTemplate?: any;
    dayTemplate?: any;
    dayContentTemplate?: any;
    renderDay?(args: MbscCalendarDayData): any;
    renderDayContent?(args: MbscCalendarDayData): any;
    renderCalendarHeader?(): any;
    onActiveChange?(args: any, inst: any): void;
    onCellClick?(args: any, inst: any): void;
    onCellHoverIn?(args: any, inst: any): void;
    onCellHoverOut?(args: any, inst: any): void;
    onLabelClick?(args: any, inst: any): void;
    onPageChange?(args: any, inst: any): void;
    onPageLoaded?(args: any, inst: any): void;
    onPageLoading?(args: any, inst: any): void;
}
/** @hidden */
export interface MbscCalendarState extends IPickerState {
    activeTab?: string;
    pages?: number;
}
/** @hidden */
export declare class CalendarBase extends PickerBase<MbscCalendarOptions, MbscCalendarState> {
    /** @hidden */
    static defaults: MbscCalendarOptions;
    static _name: string;
    /** @hidden */
    _calendarView: CalendarViewBase;
    /** @hidden */
    _instanceService?: InstanceServiceBase;
    /** @hidden */
    _navService: MbscCalendarNavService;
    /** @hidden */
    _update: number;
    /** @hidden */
    _onDayClick: (args: any) => void;
    /** @hidden */
    _onTodayClick: () => void;
    /** @hidden */
    _onActiveChange: (args: any) => void;
    /** @hidden */
    _valueEquals(v1: any, v2: any): boolean;
    _shouldValidate(s: MbscCalendarOptions, prevS: MbscCalendarOptions): boolean;
    _setCal: (cal: any) => void;
    protected _render(s: MbscCalendarOptions, state: MbscCalendarState): void;
    protected _copy(value: any): any;
    protected _format(value: any): string;
    protected _parse(value: any): {
        [key: number]: Date;
    };
    protected _get(value: {
        [key: string]: Date;
    }): any[] | Date;
}
