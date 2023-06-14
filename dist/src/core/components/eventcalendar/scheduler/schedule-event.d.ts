import { BaseComponent, IBaseProps } from '../../../base';
import { MbscCalendarEventData } from '../../../shared/calendar-view/calendar-view.types';
import { ITimezonePlugin } from '../../../util/datetime';
export interface MbscScheduleEventOptions extends IBaseProps {
    contentTemplate?: any;
    displayTimezone?: string;
    drag?: boolean;
    endDay: number;
    event: MbscCalendarEventData;
    eventHeight?: number;
    exclusiveEndDates?: boolean;
    gridEndTime: number;
    gridStartTime: number;
    hasResY?: boolean;
    hidden?: boolean;
    inactive?: boolean;
    isDrag?: boolean;
    isListing?: boolean;
    isTimeline?: boolean;
    lastDay: number;
    resize?: boolean;
    resource?: number | string;
    selected?: boolean;
    singleDay?: boolean;
    slot?: number | string;
    startDay: number;
    template?: any;
    timezonePlugin?: ITimezonePlugin;
    onClick?(arg: any): void;
    onDoubleClick?(arg: any): void;
    onHoverIn?(arg: any): void;
    onHoverOut?(arg: any): void;
    onRightClick?(arg: any): void;
    onDelete?(arg: any): void;
    onDragEnd?(arg: any): void;
    onDragModeOff?(args: any): void;
    onDragModeOn?(args: any): void;
    onDragMove?(arg: any): void;
    onDragStart?(arg: any): void;
    renderContent?(event: MbscCalendarEventData): any;
    render?(event: MbscCalendarEventData): any;
}
export interface MbscScheduleEventState {
    hasHover?: boolean;
    hasFocus?: boolean;
}
/** @hidden */
export declare class ScheduleEventBase extends BaseComponent<MbscScheduleEventOptions, MbscScheduleEventState> {
    _content?: any;
    _cssClass?: string;
    _html?: any;
    _isStart?: boolean;
    _isEnd?: boolean;
    _rangeText?: string;
    _style?: any;
    _isAllDay?: boolean;
    private _doc?;
    private _host?;
    private _isDrag?;
    private _text?;
    private _unlisten?;
    private _unsubscribe?;
    _onClick: (ev: any) => void;
    _onRightClick: (ev: any) => void;
    protected _onDocTouch: (ev: any) => void;
    protected _render(s: MbscScheduleEventOptions, state: MbscScheduleEventState): void;
    protected _mounted(): void;
    protected _destroy(): void;
    private _updateState;
    private _triggerClick;
}
