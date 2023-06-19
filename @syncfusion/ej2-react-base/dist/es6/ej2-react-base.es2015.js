import { Children, Component, PureComponent, createElement } from 'react';
import { createPortal } from 'react-dom';
import { extend, getTemplateEngine, getValue, isNullOrUndefined, isObject, setTemplateEngine, setValue } from '@syncfusion/ej2-base';

/**
 * React Component Base
 */
const defaulthtmlkeys = ['alt', 'className', 'disabled', 'form', 'id',
    'readOnly', 'style', 'tabIndex', 'title', 'type', 'name',
    'onClick', 'onFocus', 'onBlur'];
const delayUpdate = ['accordion', 'tab', 'splitter'];
const isColEName = new RegExp('\]');
// tslint:disable
/* eslint-disable @typescript-eslint/no-explicit-any */
class ComponentBase extends Component {
    constructor() {
        super(...arguments);
        this.mountingState = false;
        this.attrKeys = [];
        this.cachedTimeOut = 0;
        this.isAppendCalled = false;
        this.initRenderCalled = false;
        this.isReactForeceUpdate = false;
        this.isReact = true;
        this.isshouldComponentUpdateCalled = false;
        this.isCreated = false;
    }
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentWillMount
    // tslint:disable-next-line:no-any
    componentDidMount() {
        this.refreshChild(true);
        this.canDelayUpdate = delayUpdate.indexOf(this.getModuleName()) !== -1;
        // Used timeout to resolve template binding
        // Reference link: https://github.com/facebook/react/issues/10309#issuecomment-318433235
        // tslint:disable-next-line:no-any
        this.renderReactComponent();
        if (this.portals && this.portals.length) {
            this.mountingState = true;
            this.renderReactTemplates();
            this.mountingState = false;
        }
    }
    componentDidUpdate(prev) {
        if (!this.isshouldComponentUpdateCalled && this.initRenderCalled && !this.isReactForeceUpdate) {
            if (prev !== this.props) {
                this.isshouldComponentUpdateCalled = true;
                this.refreshProperties(this.props, this.props);
            }
        }
    }
    renderReactComponent() {
        let ele = this.reactElement;
        if (ele && !this.isAppendCalled) {
            this.isAppendCalled = true;
            this.appendTo(ele);
        }
    }
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
    // tslint:disable-next-line:no-any
    /**
     * @private
     */
    shouldComponentUpdate(nextProps) {
        this.isshouldComponentUpdateCalled = true;
        if (!this.initRenderCalled) {
            this.updateProperties(nextProps, true);
            return true;
        }
        if (!this.isAppendCalled) {
            clearTimeout(this.cachedTimeOut);
            this.isAppendCalled = true;
            this.appendTo(this.reactElement);
        }
        this.updateProperties(nextProps);
        return true;
    }
    /**
     * @private
     */
    updateProperties(nextProps, silent) {
        let dProps = extend({}, nextProps);
        let keys = Object.keys(nextProps);
        // The statelessTemplates props value is taken from sample level property or default component property.
        let statelessTemplates = !isNullOrUndefined(this.props['statelessTemplates']) ? this.props['statelessTemplates'] :
            (!isNullOrUndefined(this['statelessTemplateProps']) ? this['statelessTemplateProps'] : []);
        for (let propkey of keys) {
            let isClassName = propkey === 'className';
            if (propkey === 'children') {
                continue;
            }
            if (!isClassName && !isNullOrUndefined(this.htmlattributes[`${propkey}`]) &&
                this.htmlattributes[`${propkey}`] !== dProps[`${propkey}`]) {
                this.htmlattributes[`${propkey}`] = dProps[`${propkey}`];
            }
            if (this.compareValues(this.props[`${propkey}`], nextProps[`${propkey}`])) {
                delete dProps[`${propkey}`];
            }
            else if (this.attrKeys.indexOf(propkey) !== -1) {
                if (isClassName) {
                    this.clsName = true;
                    let propsClsName = this.props[`${propkey}`].split(' ');
                    for (let i = 0; i < propsClsName.length; i++) {
                        this.element.classList.remove(propsClsName[parseInt(i.toString(), 10)]);
                    }
                    let dpropsClsName = dProps[`${propkey}`].split(' ');
                    for (let j = 0; j < dpropsClsName.length; j++) {
                        this.element.classList.add(dpropsClsName[parseInt(j.toString(), 10)]);
                    }
                }
                else if (propkey !== 'disabled' && !this.properties.hasOwnProperty(propkey)) {
                    delete dProps[`${propkey}`];
                }
            }
            else if (propkey === 'value' && nextProps[`${propkey}`] === this[`${propkey}`]) {
                delete dProps[`${propkey}`];
            }
            else if (statelessTemplates.indexOf(propkey) > -1 && ((propkey === 'content' && typeof dProps[`${propkey}`] === 'function') || (nextProps[`${propkey}`].toString() === this[`${propkey}`].toString()))) {
                delete dProps[`${propkey}`];
            }
        }
        if (dProps['children']) {
            delete dProps['children'];
        }
        // tslint:disable-next-line:no-any
        if (this.initRenderCalled && (this.canDelayUpdate || this.props.delayUpdate)) {
            setTimeout(() => {
                this.refreshProperties(dProps, nextProps, silent);
            });
        }
        else {
            this.refreshProperties(dProps, nextProps, silent);
        }
    }
    refreshProperties(dProps, nextProps, silent) {
        let statelessTemplates = !isNullOrUndefined(this.props['statelessTemplates']) ? this.props['statelessTemplates'] : [];
        if (Object.keys(dProps).length) {
            if (!silent) {
                // tslint:disable-next-line:no-any
                this.processComplexTemplate(dProps, this);
            }
            this.setProperties(dProps, silent);
        }
        if (statelessTemplates.indexOf('directiveTemplates') === -1) {
            this.refreshChild(silent, nextProps);
        }
    }
    processComplexTemplate(curObject, context) {
        let compTemplate = context.complexTemplate;
        if (compTemplate) {
            for (let prop in compTemplate) {
                let PropVal = compTemplate[`${prop}`];
                if (curObject[`${prop}`]) {
                    setValue(PropVal, getValue(prop, curObject), curObject);
                }
            }
        }
    }
    getDefaultAttributes() {
        this.isReact = true;
        let propKeys = Object.keys(this.props);
        if (!this.htmlattributes) {
            this.htmlattributes = {};
        }
        this.attrKeys = defaulthtmlkeys.concat(this.controlAttributes || []);
        for (let prop of propKeys) {
            if (prop.indexOf('data-') !== -1 || prop.indexOf('aria-') !== -1 || this.attrKeys.indexOf(prop) !== -1) {
                if (this.htmlattributes[`${prop}`] !== this.props[`${prop}`]) {
                    this.htmlattributes[`${prop}`] = this.props[`${prop}`];
                }
            }
        }
        if (!this.htmlattributes.ref) {
            /* tslint:disable:no-any */
            this.htmlattributes.ref = (ele) => {
                this.reactElement = ele;
            };
            let keycompoentns = ['autocomplete', 'combobox', 'dropdownlist', 'dropdowntree', 'multiselect',
                'listbox', 'colorpicker', 'numerictextbox', 'textbox',
                'uploader', 'maskedtextbox', 'slider', 'datepicker', 'datetimepicker', 'daterangepicker', 'timepicker', 'checkbox', 'switch', 'radio'];
            if (keycompoentns.indexOf(this.getModuleName()) !== -1) {
                this.htmlattributes.key = '' + ComponentBase.reactUid;
                ComponentBase.reactUid++;
            }
        }
        if (this.clsName) {
            let clsList = this.element.classList;
            let className = this.htmlattributes['className'];
            for (let i = 0; i < clsList.length; i++) {
                if ((className.indexOf(clsList[parseInt(i.toString(), 10)]) === -1)) {
                    this.htmlattributes['className'] = this.htmlattributes['className'] + ' ' + clsList[parseInt(i.toString(), 10)];
                }
            }
            this.clsName = false;
        }
        return this.htmlattributes;
    }
    /* tslint:disable:no-any */
    trigger(eventName, eventProp, successHandler) {
        if (this.isDestroyed !== true && this.modelObserver) {
            if (isColEName.test(eventName)) {
                let handler = getValue(eventName, this);
                if (handler) {
                    handler.call(this, eventProp);
                    if (successHandler) {
                        successHandler.call(this, eventProp);
                    }
                }
                else if (successHandler) {
                    successHandler.call(this, eventProp);
                }
            }
            if ((eventName === 'change' || eventName === 'input')) {
                if (this.props.onChange && eventProp.event) {
                    this.props.onChange.call(undefined, {
                        syntheticEvent: eventProp.event,
                        nativeEvent: { text: eventProp.value },
                        value: eventProp.value,
                        target: this
                    });
                }
            }
            let prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            if (eventName === 'created') {
                setTimeout(() => {
                    this.isCreated = true;
                    if (!this.isDestroyed) {
                        this.modelObserver.notify(eventName, eventProp, successHandler);
                    }
                }, 10);
            }
            else {
                this.modelObserver.notify(eventName, eventProp, successHandler);
            }
            this.isProtectedOnChange = prevDetection;
        }
    }
    compareValues(value1, value2) {
        let typeVal = typeof value1;
        let typeVal2 = typeof value2;
        if (typeVal === typeVal2) {
            if (value1 === value2) {
                return true;
            }
            if ((!isNullOrUndefined(value1) && value1.constructor) !== (!isNullOrUndefined(value2) && value2.constructor)) {
                return false;
            }
            if (value1 instanceof Date ||
                value1 instanceof RegExp ||
                value1 instanceof String ||
                value1 instanceof Number) {
                return value1.toString() === value2.toString();
            }
            if (isObject(value1) || Array.isArray(value1)) {
                let tempVal = value1;
                let tempVal2 = value2;
                if (isObject(tempVal)) {
                    tempVal = [value1];
                    tempVal2 = [value2];
                }
                return this.compareObjects(tempVal, tempVal2).status;
            }
            if (value1.constructor &&
                value1.constructor.name === value2.constructor.name &&
                (value1.constructor.name === 'Query' ||
                    value1.constructor.name === 'DataManager')) {
                if (JSON.stringify(value1) === JSON.stringify(value2)) {
                    return true;
                }
            }
        }
        return false;
    }
    compareObjects(oldProps, newProps, propName) {
        let status = true;
        let lenSimilarity = (oldProps.length === newProps.length);
        let diffArray = [];
        var templateProps = !isNullOrUndefined(this['templateProps']) ? this['templateProps'] : [];
        if (lenSimilarity) {
            for (let i = 0, len = newProps.length; i < len; i++) {
                let curObj = {};
                let oldProp = oldProps[parseInt(i.toString(), 10)];
                let newProp = newProps[parseInt(i.toString(), 10)];
                let keys = Object.keys(newProp);
                if (keys.length !== 0) {
                    for (let key of keys) {
                        let oldValue = oldProp[`${key}`];
                        let newValue = newProp[`${key}`];
                        if (key === 'items') {
                            for (var _j = 0; _j < newValue.length; _j++) {
                                if (this.getModuleName() === 'richtexteditor' && typeof (newValue[parseInt(_j.toString(), 10)]) === 'object') {
                                    return { status: true };
                                }
                            }
                        }
                        if (this.getModuleName() === 'grid' && key === 'field') {
                            curObj[`${key}`] = newValue;
                        }
                        if (!oldProp.hasOwnProperty(key) || !((templateProps.length > 0 && templateProps.indexOf(`${key}`) === -1 && typeof (newValue) === 'function') ? this.compareValues(oldValue.toString(), newValue.toString()) : this.compareValues(oldValue, newValue))) {
                            if (!propName) {
                                return { status: false };
                            }
                            status = false;
                            curObj[`${key}`] = newValue;
                        }
                    }
                }
                else if (newProps[parseInt(i.toString(), 10)] === oldProps[parseInt(i.toString(), 10)]) {
                    status = true;
                }
                else {
                    if (!propName) {
                        return { status: false };
                    }
                    status = false;
                }
                if (this.getModuleName() === 'grid' && propName === 'columns' && isNullOrUndefined(curObj['field'])) {
                    curObj['field'] = undefined;
                }
                if (Object.keys(curObj).length) {
                    diffArray.push({ index: i, value: curObj, key: propName });
                }
            }
        }
        else {
            status = false;
        }
        return { status: status, changedProperties: diffArray };
    }
    refreshChild(silent, props) {
        if (this.checkInjectedModules) {
            let prevModule = this.getInjectedModules() || [];
            let curModule = this.getInjectedServices() || [];
            for (let mod of curModule) {
                if (prevModule.indexOf(mod) === -1) {
                    prevModule.push(mod);
                }
            }
            this.injectedModules = prevModule;
        }
        if (this.directivekeys) {
            let changedProps = [];
            let directiveValue = this.validateChildren({}, this.directivekeys, (props || this.props));
            if (directiveValue && Object.keys(directiveValue).length) {
                if (!silent && this.skipRefresh) {
                    for (let fields of this.skipRefresh) {
                        delete directiveValue[`${fields}`];
                    }
                }
                if (this.prevProperties) {
                    var dKeys = Object.keys(this.prevProperties);
                    for (var i = 0; i < dKeys.length; i++) {
                        var key = dKeys[parseInt(i.toString(), 10)];
                        if (!directiveValue.hasOwnProperty(key)) {
                            continue;
                        }
                        let compareOutput = this.compareObjects(this.prevProperties[`${key}`], directiveValue[`${key}`], key);
                        if (compareOutput.status) {
                            delete directiveValue[`${key}`];
                        }
                        else {
                            if (compareOutput.changedProperties.length) {
                                changedProps = changedProps.concat(compareOutput.changedProperties);
                            }
                            let obj = {};
                            obj[`${key}`] = directiveValue[`${key}`];
                            this.prevProperties = extend(this.prevProperties, obj);
                        }
                    }
                }
                else {
                    this.prevProperties = extend({}, directiveValue, {}, true);
                }
                if (changedProps.length) {
                    if (this.getModuleName() === 'grid' && key === 'columns') {
                        for (var _c1 = 0, allColumns = this.columns; _c1 < allColumns.length; _c1++) {
                            let compareField1 = getValue('field', allColumns[parseInt(_c1.toString(), 10)]);
                            let compareField2 = getValue(_c1 + '.value.field', changedProps);
                            if (compareField1 === compareField2) {
                                var propInstance = getValue(changedProps[parseInt(_c1.toString(), 10)].key + '.' + changedProps[parseInt(_c1.toString(), 10)].index, this);
                                if (propInstance && propInstance.setProperties) {
                                    propInstance.setProperties(changedProps[parseInt(_c1.toString(), 10)].value);
                                }
                                else {
                                    extend(propInstance, changedProps[parseInt(_c1.toString(), 10)].value);
                                }
                            }
                            else {
                                this.setProperties(directiveValue, silent);
                            }
                        }
                    }
                    else {
                        for (let changes of changedProps) {
                            let propInstance = getValue(changes.key + '.' + changes.index, this);
                            if (propInstance && propInstance.setProperties) {
                                propInstance.setProperties(changes.value);
                            }
                            else {
                                extend(propInstance, changes.value);
                            }
                        }
                    }
                }
                else {
                    this.setProperties(directiveValue, silent);
                }
            }
        }
    }
    componentWillUnmount() {
        clearTimeout(this.cachedTimeOut);
        var modulesName = ['dropdowntree', 'checkbox'];
        // tslint:disable-next-line:no-any
        if (this.initRenderCalled && this.isAppendCalled && this.element && ((!modulesName.indexOf(this.getModuleName())) ? document.body.contains(this.element) : true) && !this.isDestroyed && this.isCreated) {
            this.destroy();
        }
    }
    // tslint:disable:no-any
    appendReactElement(element, container) {
        let portal = createPortal(element, container);
        if (!this.portals) {
            this.portals = [portal];
        }
        else {
            this.portals.push(portal);
        }
    }
    // tslint:disable:no-any
    renderReactTemplates(callback) {
        this.isReactForeceUpdate = true;
        if (callback) {
            this.forceUpdate(callback);
        }
        else {
            this.forceUpdate();
        }
        this.isReactForeceUpdate = false;
    }
    // tslint:disable:no-any
    clearTemplate(templateNames, index, callback) {
        var tempPortal = [];
        if (templateNames && templateNames.length) {
            Array.prototype.forEach.call(templateNames, (propName) => {
                let propIndexCount = 0;
                this.portals.forEach((portal) => {
                    if (portal.propName === propName) {
                        tempPortal.push(propIndexCount);
                        propIndexCount++;
                    }
                });
                if (!isNullOrUndefined(index) && this.portals[index] && this.portals[index].propName === propName) {
                    this.portals.splice(index, 1);
                    
                }
                else {
                    for (var i = 0; i < this.portals.length; i++) {
                        if (this.portals[parseInt(i.toString(), 10)].propName === propName) {
                            this.portals.splice(i, 1);
                            i--;
                        }
                    }
                }
            });
        }
        else {
            this.portals = [];
        }
        this.renderReactTemplates(callback);
    }
    /* tslint:disable:no-any */
    validateChildren(childCache, mapper, props) {
        let flag = false;
        let childs = Children.toArray(props.children);
        for (let child of childs) {
            let ifield = this.getChildType(child);
            let key = mapper[`${ifield}`];
            if (ifield && mapper) {
                // tslint:disable
                let childProps = this.getChildProps(Children.toArray(child.props.children), key);
                if (childProps.length) {
                    flag = true;
                    // tslint:disable
                    childCache[child.type.propertyName || ifield] = childProps;
                }
            }
        }
        if (flag) {
            return childCache;
        }
        return null;
    }
    // tslint:disable:no-any
    getChildType(child) {
        if (child.type && child.type.isDirective) {
            return child.type.moduleName || '';
        }
        return '';
    }
    getChildProps(subChild, matcher) {
        let ret = [];
        for (let child of subChild) {
            let accessProp = false;
            let key;
            if (typeof matcher === 'string') {
                accessProp = true;
                key = matcher;
            }
            else {
                key = Object.keys(matcher)[0];
            }
            let prop = child.props;
            // tslint:disable-next-line:no-any
            let field = this.getChildType(child);
            if (field === key) {
                if (accessProp || !prop.children) {
                    // tslint:disable
                    let cacheVal = extend({}, prop, {}, true);
                    // tslint:disable
                    this.processComplexTemplate(cacheVal, child.type);
                    ret.push(cacheVal);
                }
                else {
                    let cachedValue = this.validateChildren(extend({}, prop), matcher[`${key}`], prop) || prop;
                    if (cachedValue['children']) {
                        delete cachedValue['children'];
                    }
                    // tslint:disable
                    this.processComplexTemplate(cachedValue, child.type);
                    ret.push(cachedValue);
                }
            }
        }
        return ret;
    }
    // tslint:disable:no-any
    getInjectedServices() {
        let childs = Children.toArray(this.props.children);
        for (let child of childs) {
            /* tslint:disable:no-any */
            if (child.type.isService) {
                return child.props.services;
            }
        }
        return [];
    }
}
/**
 * @private
 */
ComponentBase.reactUid = 1;
/* tslint:enable:no-any */

// eslint-disable-next-line
function applyMixins(derivedClass, baseClass) {
    // tslint:disable:typedef
    baseClass.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            if (name !== 'isMounted' && name !== 'replaceState') {
                derivedClass.prototype[`${name}`] = baseClass.prototype[`${name}`];
            }
        });
    });
}

/**
 * Directory base
 */
class ComplexBase extends PureComponent {
    render() {
        return null;
    }
}
ComplexBase.isDirective = true;

/**
 * Dependency injection
 */
class Inject extends PureComponent {
    // eslint-disable-next-line
    render() {
        return null;
    }
}
Inject.isService = true;

/**
 * Template compiler for react
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const stringCompiler = getTemplateEngine();
// eslint-disable-next-line
function compile(templateElement, helper) {
    if (typeof templateElement === 'string') {
        return stringCompiler(templateElement, helper);
    }
    else {
        return (data, component, prop, element) => {
            let actTemplate = templateElement;
            let actData = data;
            if (typeof actTemplate === 'object') {
                actTemplate = templateElement.template;
                actData = extend({}, data, templateElement.data || {});
            }
            let cEle;
            if (element) {
                cEle = element;
            }
            else {
                cEle = document.createElement('div');
            }
            const rele = createElement(actTemplate, actData);
            const portal = createPortal(rele, cEle);
            portal.propName = prop;
            if (!component.portals) {
                component.portals = [portal];
            }
            else {
                component.portals.push(portal);
            }
            if (!element) {
                return [cEle];
            }
        };
    }
}
setTemplateEngine({ compile: compile });

/**
 * index for component base
 */

export { ComponentBase, applyMixins, ComplexBase, Inject, compile };
//# sourceMappingURL=ej2-react-base.es2015.js.map
