import { MbscPopupDisplay } from '../../components/popup/popup.types.public';
import { PickerBase } from '../../shared/picker/picker';
import { IPickerProps, IPickerState } from '../../shared/picker/picker.types';
import { IActiveChangeArgs, IWheelIndexChangeArgs } from '../../shared/wheel/wheel';
/**
 * Options for all scroller based components
 */
export interface IScrollerProps extends IPickerProps {
    circular?: boolean | boolean[];
    /** @hidden */
    displayStyle?: MbscPopupDisplay;
    /** @hidden */
    inContentTemplate?: any;
    /**
     * Height of the wheel items in pixels.
     */
    itemHeight?: number;
    renderItem?: any;
    itemTemplate?: any;
    minWheelWidth?: number | number[];
    maxWheelWidth?: number | number[];
    wheelWidth?: number | number[];
    /** @hidden */
    preContentData?: any;
    /** @hidden */
    preContentTemplate?: any;
    selectOnScroll?: boolean;
    /**
     * Number of visible rows on the wheel.
     */
    rows?: number;
    scroll3d?: boolean;
    onWheelMove?: (args: IWheelMoveArgs) => any[] | undefined;
    /** @hidden */
    renderInContent?: (inst: any) => any;
    /** @hidden */
    renderPreContent?: (inst: any) => any;
    validate?: (args: IScrollerValidateArgs) => {
        disabled?: any[];
        init?: boolean;
        indexes?: number[];
        valid?: any[];
    };
    valueEquality?: (v1: any, v2: any) => boolean;
    /** function that is called to decide if the value should be validated */
    shouldValidate?: (s: any, prevS: any) => boolean;
}
/**
 * Scroller options
 */
export interface MbscScrollerOptions extends IScrollerProps {
    wheels?: MbscScrollerWheel[][];
    formatValue?(values: any[]): string;
    getValue?(values: any[]): any;
    writeValue?(elm: HTMLElement, text: string, value: any): boolean;
    parseValue?(valueStr: string): any[];
}
/** @hidden */
export interface MbscScrollerState extends IPickerState {
    value?: any;
}
/** @hidden */
export declare type IWheelDataItem = string | number | {
    display: string;
    isGroup?: boolean;
    value: any;
};
/** @hidden */
export declare type IScrollerRepresentation = any[];
export interface MbscScrollerWheel {
    label?: string;
    circular?: boolean;
    cssClass?: string;
    data?: IWheelDataItem[];
    max?: number;
    min?: number;
    multiple?: boolean;
    checkmark?: boolean;
    closeOnTap?: boolean;
    spaceAround?: boolean;
    getItem?: (index: number) => any;
    getIndex?: (value: any) => number;
    _circular?: boolean;
    _key?: number;
    _map?: Map<any, number>;
    _offset?: number;
}
/** @hidden */
export interface IScrollerValidateArgs {
    direction?: number;
    index?: number;
    values: IScrollerRepresentation;
    wheels: MbscScrollerWheel[];
}
/** @hidden */
export interface IWheelMoveArgs {
    dataItem: any;
    wheelIndex: number;
    selection: boolean;
}
/**
 * Returns the closest valid value on a wheel.
 * @hidden
 * @param wheel The wheel object.
 * @param val The current value.
 * @param direction Direction of the wheel movement.
 * @param disabled Disabled values on the wheel.
 */
export declare function getValid(wheel: MbscScrollerWheel, val: any, disabled?: Map<any, boolean>, direction?: number): any;
/** @hidden */
export declare class ScrollerBase extends PickerBase<MbscScrollerOptions, MbscScrollerState> {
    /** @hidden */
    static defaults: MbscScrollerOptions;
    protected static _name: string;
    /** @hidden */
    _circular?: boolean | boolean[];
    /** @hidden */
    _disabled?: Array<Map<any, boolean>>;
    /** @hidden */
    _displayStyle?: MbscPopupDisplay;
    /** @hidden */
    _indexes: number[];
    /** @hidden */
    _activeIndexes: number[];
    /** @hidden */
    _lineStyle?: any;
    /** @hidden */
    _overlayStyle?: any;
    /** @hidden */
    _rows: number;
    /** @hidden */
    _scroll3d: boolean;
    /** @hidden */
    _wheels: MbscScrollerWheel[][];
    private _batches;
    /**
     * Stores the last index that was set when selecting a value
     * Check out the _setIndexes method for more explanations.
     */
    private _lastIndexes;
    private _shouldSetIndex?;
    private _indexFromValue?;
    private _wheelMap;
    _onSet: () => void;
    /**
     * Triggered when the active item is changed via keyboard navigation.
     * When the selectOnScroll is true the onWheelIndexChange is triggered instead,
     * because selection also happens.
     */
    _onActiveChange: ({ wheel, index }: IActiveChangeArgs) => void;
    _onWheelIndexChange: (args: IWheelIndexChangeArgs) => void;
    _initWheels(): void;
    _shouldValidate(s: MbscScrollerOptions, prevS: MbscScrollerOptions): boolean;
    _valueEquals(v1: any, v2: any): boolean;
    protected _render(s: MbscScrollerOptions, state: MbscScrollerState): void;
    protected _writeValue(elm: HTMLInputElement, text: string, value: any): boolean;
    protected _copy(value: any[]): any[];
    protected _format(value: any[]): string;
    protected _get(value: any[]): any;
    protected _parse(valueStr: any): any[];
    /**
     * Does the validation
     * @param index Index of the wheel
     * @param direction Direction the wheel was moved
     */
    protected _validate(index?: number, direction?: number): void;
    protected _onOpen(): void;
    protected _onParse(): void;
    private _initWheel;
    /** Indexes must be set in two occasions:
     * 1. When the picker is opened
     * 2. When the wheels are changed (ex. select filtering)
     *
     * The new index can come from the value (when opening the scroller), or from the currently scrolled to item
     */
    private _setIndexes;
    /**
     * The newIndex is the index of the topmost visible item on the scroller, but the selected item can be under that.
     * So if the newIndex comes from the selected value, the newIndex can turn up greater than the topmost item's
     * index. So we need to constrain the newIndex in this case, otherwise at the end of the list, there will be an
     * empty space
     * @param newIndex
     * @param wheel
     */
    private _constrainIndex;
}
