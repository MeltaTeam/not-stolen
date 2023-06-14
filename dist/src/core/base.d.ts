import { Base } from '../react/base';
export declare const version = "5.24.1";
/**
 * @hidden
 * Interface for modules, add-ons
 */
export interface IModule {
    init(inst: any): void;
}
/**
 * @hidden
 * Preact with typescript complains about these props missing,
 * so adding it here
 */
export interface IBaseProps {
    context?: any;
    cssClass?: string;
    responsive?: {
        [key: string]: any;
    };
    rtl?: boolean;
    theme?: string;
    themeVariant?: 'light' | 'dark' | 'auto';
    touchUi?: boolean | 'auto';
    locale?: string | object;
    modules?: IModule[];
    /** @hidden */
    baseTheme?: any;
    /** @hidden */
    children?: any;
    /** @hidden */
    class?: string;
    /** @hidden */
    className?: string;
    /** @hidden */
    dangerouslySetInnerHTML?: any;
    /** @hidden */
    hasChildren?: boolean;
    /** @hidden */
    key?: any;
    /** @hidden */
    ref?: any;
    /** @hidden */
    style?: any;
    onDestroy?(args: any, inst: BaseComponent<IBaseProps, any>): void;
    onInit?(args: any, inst: BaseComponent<IBaseProps, any>): void;
}
export interface IBaseEvent {
    inst?: any;
    type?: string;
}
/** @hidden */
export declare class BaseComponent<PropType extends IBaseProps, StateType> extends Base<PropType, StateType> {
    /** @hidden */
    static defaults: any;
    protected static _name: string;
    /** @hidden */
    readonly nativeElement: HTMLElement;
    /** @hidden */
    s: PropType;
    /** @hidden */
    state: StateType;
    /** @hidden */
    _className: string;
    /** @hidden */
    _hb: string;
    /**
     * Used to identify if it's a mobiscroll component
     * @hidden
     */
    _mbsc: boolean;
    /** @hidden */
    _rtl: string;
    /** @hidden */
    _theme: string;
    /** @hidden */
    _touchUi: boolean;
    /** @hidden */
    _v: any;
    /** @hidden */
    _shouldEnhance?: HTMLElement | string | boolean | null;
    /**
     * Needed for preact for dynamic updates, because props is immutable.
     * Merge this into the computed settings as well.
     */
    protected _prevS: PropType;
    protected _respProps?: PropType;
    protected _zone: any;
    protected _optChange?: number;
    protected _uid: number;
    protected readonly __getTextParam: any;
    private _textParam;
    readonly textParam: any;
    private _textParamMulti;
    textParamMulti(key: any): any;
    protected __getText: Function;
    /** @hidden */
    destroy(): void;
    /** @hidden */
    _hook(name: string, args: any): any;
    protected __init(): void;
    protected __destroy(): void;
    protected _render(s: PropType, state: StateType): void;
    protected _willUpdate(): void;
    private _resp;
    private _merge;
}
