import { PureComponent, ReactNode } from 'react';
export declare function Directive(args: any): (ctor: any) => any;
/** @hidden */
export declare class Base<PropsType, StateType> extends PureComponent<PropsType, StateType> {
    /** @hidden */
    static propTypes: any;
    /** @hidden */
    static contextType: import("react").Context<{}>;
    /** @hidden */
    s: PropsType;
    /** @hidden */
    /** @hidden */
    value: any;
    /** @hidden */
    _el: HTMLElement;
    protected _opt: any;
    private __value;
    /** @hidden */
    componentDidMount(): void;
    /** @hidden */
    componentDidUpdate(): void;
    /** @hidden */
    componentWillUnmount(): void;
    /** @hidden */
    render(): ReactNode;
    /** @hidden */
    _setEl: (el: any) => void;
    /** @hidden */
    _safeHtml(html: string): {
        __html: string;
    };
    protected _init(): void;
    protected __init(): void;
    protected _emit(name: string, args: any): void;
    protected _mounted(): void;
    protected _updated(): void;
    protected _destroy(): void;
    protected __destroy(): void;
    protected _willUpdate(): void;
    protected _template(s: PropsType, state: StateType): ReactNode;
}