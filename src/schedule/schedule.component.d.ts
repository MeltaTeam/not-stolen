import * as React from 'react';
import { Schedule, ScheduleModel } from '@syncfusion/ej2-schedule';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ScheduleTypecast {
    dateHeaderTemplate?: string | Function | any;
    dateRangeTemplate?: string | Function | any;
    dayHeaderTemplate?: string | Function | any;
    cellTemplate?: string | Function | any;
    cellHeaderTemplate?: string | Function | any;
    eventSettingsTooltipTemplate?: string | Function | any;
    eventSettingsTemplate?: string | Function | any;
    editorTemplate?: string | Function | any;
    monthHeaderTemplate?: string | Function | any;
    timeScaleMinorSlotTemplate?: string | Function | any;
    timeScaleMajorSlotTemplate?: string | Function | any;
    resourceHeaderTemplate?: string | Function | any;
    headerIndentTemplate?: string | Function | any;
    quickInfoTemplatesHeader?: string | Function | any;
    quickInfoTemplatesContent?: string | Function | any;
    quickInfoTemplatesFooter?: string | Function | any;
    groupHeaderTooltipTemplate?: string | Function | any;
}
/**
 * `ScheduleComponent` represents the react Schedule.
 * ```tsx
 * <ScheduleComponent/>
 * ```
 */
export declare class ScheduleComponent extends Schedule {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ScheduleModel & DefaultHtmlAttributes | ScheduleTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ScheduleModel & DefaultHtmlAttributes | ScheduleTypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
