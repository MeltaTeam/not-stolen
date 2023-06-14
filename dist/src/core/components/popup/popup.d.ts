import { BaseComponent } from '../../base';
import { MbscPopupButton, MbscPopupOptions, MbscPopupPredefinedButton } from './popup.types.public';
export interface IPopupButtonBase {
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    cssClass?: string;
    disabled?: boolean;
    handler?: MbscPopupPredefinedButton | ((event: any) => void);
    icon?: string;
    keyCode?: number | 'enter' | 'esc' | 'space' | Array<number | 'enter' | 'esc' | 'space'>;
    name?: MbscPopupPredefinedButton;
    text?: string;
    variant?: 'standard' | 'flat' | 'outline';
}
export interface IPopupButton {
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    cssClass?: string;
    disabled?: boolean;
    handler: (event: any) => void;
    icon?: string;
    keyCode?: number | 'enter' | 'esc' | 'space' | Array<number | 'enter' | 'esc' | 'space'>;
    name?: MbscPopupPredefinedButton;
    text?: string;
    variant?: 'standard' | 'flat' | 'outline';
}
/** @hidden */
export interface MbscPopupState {
    arrowPos?: {
        left?: string;
        top?: string;
    };
    bubblePos?: 'top' | 'bottom' | 'left' | 'right';
    isOpen?: boolean;
    isReady?: boolean;
    /** Top position of the popup */
    modalTop?: number;
    /** Left position of the popup */
    modalLeft?: number;
    /** Show or hide the popup arrow in anchored mode */
    showArrow?: boolean;
    /** Viewport width */
    width?: number;
    /** Viewport height */
    height?: number;
}
/** @hidden */
export declare function processButtons(inst: any, buttons?: Array<IPopupButton | MbscPopupButton | string>): IPopupButton[] | undefined;
/**
 * @hidden
 */
export declare class PopupBase extends BaseComponent<MbscPopupOptions, MbscPopupState> {
    /** @hidden */
    static defaults: MbscPopupOptions;
    _active: HTMLElement;
    _animation?: string;
    _buttons?: IPopupButton[];
    _ctx?: any;
    _content: HTMLElement;
    _flexButtons?: boolean;
    _hasContext?: boolean;
    _headerText?: any;
    _isClosing?: boolean;
    _isModal?: boolean;
    _isOpening?: boolean;
    _isOpen?: boolean;
    _isVisible?: boolean;
    _limitator?: HTMLElement;
    _limits?: any;
    _popup: HTMLElement;
    _prevFocus?: HTMLElement;
    _prevModal?: PopupBase;
    _round?: boolean;
    _style?: any;
    _wrapper: HTMLElement;
    protected _justClosed?: boolean;
    protected _justOpened?: boolean;
    private _doc?;
    private _hasWidth?;
    private _lastFocus;
    private _lock?;
    private _maxHeight;
    private _maxWidth;
    private _needsLock?;
    private _observer;
    private _preventClose?;
    private _scrollCont?;
    private _shouldPosition?;
    private _target?;
    private _vpWidth;
    private _vpHeight;
    private _win?;
    _setActive: (el: any) => void;
    _setContent: (el: any) => void;
    _setLimitator: (el: any) => void;
    _setPopup: (el: any) => void;
    _setWrapper: (el: any) => void;
    _onOverlayClick: () => void;
    _onDocClick: (ev: any) => void;
    _onMouseDown: (ev: any) => void;
    _onMouseUp: (ev: any) => void;
    _onPopupClick: () => void;
    _onAnimationEnd: (ev: any) => void;
    _onButtonClick: ({ domEvent, button }: {
        domEvent: any;
        button: MbscPopupButton;
    }) => void;
    _onFocus: (ev: any) => void;
    _onKeyDown: (ev: any) => void;
    _onContentScroll: (ev: any) => void;
    _onScroll: (ev: any) => void;
    _onWndKeyDown: (ev: any) => void;
    _onResize: () => void;
    /**
     * Open
     */
    open(): void;
    /**
     * Close
     */
    close(): void;
    /**
     * Is open?
     */
    isVisible(): boolean;
    position(): void;
    protected _render(s: MbscPopupOptions, state: MbscPopupState): void;
    protected _updated(): void;
    protected _destroy(): void;
    protected _onOpen(): void;
    protected _onClose(): void;
    protected _onOpened(): void;
    protected _onClosed(): void;
    private _unlisten;
    private _close;
}
