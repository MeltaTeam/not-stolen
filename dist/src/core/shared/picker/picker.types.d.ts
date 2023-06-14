import { IBaseProps } from '../../base';
import { MbscPopupButton, MbscPopupDisplay, MbscPopupPredefinedButton } from '../../components/popup/popup.types.public';
import { DateType, IValidateProps } from '../../util/datetime';
/**
 * Options for all picker components
 */
export interface IPickerProps extends IBaseProps {
    defaultSelection?: any;
    defaultValue?: any;
    disabled?: boolean;
    element?: any;
    inputComponent?: any;
    inputProps?: any;
    invalid?: DateType[] | IValidateProps[];
    inputTyping?: boolean;
    modelValue?: any;
    selectMultiple?: boolean;
    showInput?: boolean;
    showOnFocus?: boolean;
    showOnClick?: boolean;
    valid?: DateType[] | IValidateProps[];
    value?: any;
    valueMap?: any;
    dropdown?: boolean;
    endIcon?: string;
    endIconSrc?: string;
    endIconSvg?: string;
    error?: boolean;
    errorMessage?: string;
    inputStyle?: 'underline' | 'outline' | 'box';
    label?: string;
    labelStyle?: 'floating' | 'stacked' | 'inline';
    name?: string;
    placeholder?: string;
    startIcon?: string;
    startIconSrc?: string;
    startIconSvg?: string;
    tagInput?: boolean;
    activeElm?: HTMLElement | string;
    anchor?: HTMLElement;
    anchorAlign?: 'start' | 'end' | 'center';
    animation?: 'pop' | 'slide-down' | 'slide-up' | boolean;
    buttons?: Array<MbscPopupButton | MbscPopupPredefinedButton | string>;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnScroll?: boolean;
    display?: MbscPopupDisplay;
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
    showArrow?: boolean;
    showOverlay?: boolean;
    width?: string | number;
    cancelText?: string;
    clearText?: string;
    closeText?: string;
    okText?: string;
    setText?: string;
    onCancel?(args: any, inst: any): void;
    onChange?(args: any, inst: any): void;
    onTempChange?(args: any, inst: any): void;
    onClose?(args: any, inst: any): void;
    onOpen?(args: any, inst: any): void;
    onResize?(args: any, inst: any): void;
}
export interface IPickerState {
    isOpen?: boolean;
    value?: any;
    width?: number;
}
