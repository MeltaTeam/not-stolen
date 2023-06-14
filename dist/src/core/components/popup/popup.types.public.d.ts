import { IBaseProps } from '../../base';
import { IPopupButtonBase } from './popup';
export declare type MbscPopupPredefinedButton = 'set' | 'cancel' | 'ok' | 'close';
export declare type MbscPopupDisplay = 'center' | 'bottom' | 'top' | 'anchored' | 'inline' | 'bubble';
export interface MbscPopupButton extends IPopupButtonBase {
    handler?: MbscPopupPredefinedButton | ((event: any) => void);
}
export interface MbscPopupOptions extends IBaseProps {
    activeElm?: HTMLElement | string;
    anchor?: HTMLElement;
    anchorAlign?: 'start' | 'end' | 'center';
    animation?: 'pop' | 'slide-down' | 'slide-up' | boolean;
    buttons?: Array<MbscPopupButton | MbscPopupPredefinedButton | string>;
    buttonVariant?: 'standard' | 'flat' | 'outline';
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnScroll?: boolean;
    contentPadding?: boolean;
    disableLeftRight?: boolean;
    display?: MbscPopupDisplay;
    focusElm?: any;
    focusOnClose?: boolean;
    focusOnOpen?: boolean;
    focusTrap?: boolean;
    fullScreen?: boolean;
    headerText?: string;
    height?: string | number;
    isOpen?: boolean;
    maxHeight?: string | number;
    maxWidth?: string | number;
    scrollLock?: boolean;
    /** Set the popup as active modal */
    setActive?: boolean;
    showArrow?: boolean;
    showOverlay?: boolean;
    windowWidth?: number;
    width?: string | number;
    cancelText?: string;
    closeText?: string;
    okText?: string;
    setText?: string;
    onButtonClick?(args: any, inst: any): void;
    onClose?(args: any, inst: any): void;
    onClosed?(args: any, inst: any): void;
    onKeyDown?(args: any, inst: any): void;
    onOpen?(args: any, inst: any): void;
    onPosition?(args: any, inst: any): void;
    onResize?(args: any, inst: any): void;
}
