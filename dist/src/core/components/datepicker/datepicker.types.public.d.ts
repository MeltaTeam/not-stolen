import { DateType } from '../../util/datetime';
import { MbscCalendarOptions } from '../calendar/calendar';
import { MbscDatetimeOptions } from '../datetime/datetime';
import { TDatepickerControl } from './datepicker';
export interface MbscDatepickerOptions extends MbscCalendarOptions, MbscDatetimeOptions {
    calendarSize?: number;
    controls?: TDatepickerControl[];
    clearIcon?: string;
    defaultValue?: any;
    firstSelectDay?: number;
    rangeHighlight?: boolean;
    modules?: any[];
    tabs?: boolean | 'auto';
    rangeEndInvalid?: boolean;
    selectCounter?: boolean;
    select?: 'date' | 'range' | 'preset-range';
    selectSize?: number;
    startInput?: any;
    endInput?: any;
    inRangeInvalid?: boolean;
    showRangeLabels?: boolean;
    enableStartOnly?: boolean;
    maxRange?: number;
    maxTime?: DateType;
    minRange?: number;
    minTime?: DateType;
    rangeEndHelp?: string;
    rangeEndLabel?: string;
    rangeStartHelp?: string;
    rangeStartLabel?: string;
    onTempChange?(args: {
        value: DateType | DateType[];
    }, inst: any): void;
    onActiveDateChange?(args: {
        active: 'start' | 'end';
    }, inst: any): void;
}
