import { ButtonBase, MbscButtonOptions } from './button';
import '../../base.scss';
import './button.scss';
export declare function template(s: MbscButtonOptions, inst: ButtonBase, content: any): any;
/**
 * The Button component.
 *
 * Usage:
 *
 * ```
 * <Button icon="home">A button</Button>
 * ```
 */
export declare class Button extends ButtonBase {
    protected _template(s: MbscButtonOptions): any;
}
