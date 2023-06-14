import { InputBase, MbscInputOptions, MbscInputState } from './input';
import '../../shared/form-controls/form-controls.scss';
import './input.scss';
export declare function template(s: MbscInputOptions, state: MbscInputState, inst: InputBase, content: any): JSX.Element;
export declare class Input extends InputBase {
    value: boolean;
    protected _template(s: MbscInputOptions, state: MbscInputState): any;
}