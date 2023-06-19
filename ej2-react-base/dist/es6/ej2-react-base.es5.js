import { Children, Component, PureComponent, createElement } from 'react';
import { createPortal } from 'react-dom';
import { extend, getTemplateEngine, getValue, isNullOrUndefined, isObject, setTemplateEngine, setValue } from '@syncfusion/ej2-base';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * React Component Base
 */
var defaulthtmlkeys = ['alt', 'className', 'disabled', 'form', 'id',
    'readOnly', 'style', 'tabIndex', 'title', 'type', 'name',
    'onClick', 'onFocus', 'onBlur'];
var delayUpdate = ['accordion', 'tab', 'splitter'];
var isColEName = new RegExp('\]');
// tslint:disable
/* eslint-disable @typescript-eslint/no-explicit-any */
var ComponentBase = /** @__PURE__ @class */ (function (_super) {
    __extends(ComponentBase, _super);
    function ComponentBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mountingState = false;
        _this.attrKeys = [];
        _this.cachedTimeOut = 0;
        _this.isAppendCalled = false;
        _this.initRenderCalled = false;
        _this.isReactForeceUpdate = false;
        _this.isReact = true;
        _this.isshouldComponentUpdateCalled = false;
        _this.isCreated = false;
        return _this;
    }
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentWillMount
    // tslint:disable-next-line:no-any
    ComponentBase.prototype.componentDidMount = function () {
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
    };
    ComponentBase.prototype.componentDidUpdate = function (prev) {
        if (!this.isshouldComponentUpdateCalled && this.initRenderCalled && !this.isReactForeceUpdate) {
            if (prev !== this.props) {
                this.isshouldComponentUpdateCalled = true;
                this.refreshProperties(this.props, this.props);
            }
        }
    };
    ComponentBase.prototype.renderReactComponent = function () {
        var ele = this.reactElement;
        if (ele && !this.isAppendCalled) {
            this.isAppendCalled = true;
            this.appendTo(ele);
        }
    };
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
    // tslint:disable-next-line:no-any
    /**
     * @private
     */
    ComponentBase.prototype.shouldComponentUpdate = function (nextProps) {
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
    };
    /**
     * @private
     */
    ComponentBase.prototype.updateProperties = function (nextProps, silent) {
        var _this = this;
        var dProps = extend({}, nextProps);
        var keys = Object.keys(nextProps);
        // The statelessTemplates props value is taken from sample level property or default component property.
        var statelessTemplates = !isNullOrUndefined(this.props['statelessTemplates']) ? this.props['statelessTemplates'] :
            (!isNullOrUndefined(this['statelessTemplateProps']) ? this['statelessTemplateProps'] : []);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var propkey = keys_1[_i];
            var isClassName = propkey === 'className';
            if (propkey === 'children') {
                continue;
            }
            if (!isClassName && !isNullOrUndefined(this.htmlattributes["" + propkey]) &&
                this.htmlattributes["" + propkey] !== dProps["" + propkey]) {
                this.htmlattributes["" + propkey] = dProps["" + propkey];
            }
            if (this.compareValues(this.props["" + propkey], nextProps["" + propkey])) {
                delete dProps["" + propkey];
            }
            else if (this.attrKeys.indexOf(propkey) !== -1) {
                if (isClassName) {
                    this.clsName = true;
                    var propsClsName = this.props["" + propkey].split(' ');
                    for (var i = 0; i < propsClsName.length; i++) {
                        this.element.classList.remove(propsClsName[parseInt(i.toString(), 10)]);
                    }
                    var dpropsClsName = dProps["" + propkey].split(' ');
                    for (var j = 0; j < dpropsClsName.length; j++) {
                        this.element.classList.add(dpropsClsName[parseInt(j.toString(), 10)]);
                    }
                }
                else if (propkey !== 'disabled' && !this.properties.hasOwnProperty(propkey)) {
                    delete dProps["" + propkey];
                }
            }
            else if (propkey === 'value' && nextProps["" + propkey] === this["" + propkey]) {
                delete dProps["" + propkey];
            }
            else if (statelessTemplates.indexOf(propkey) > -1 && ((propkey === 'content' && typeof dProps["" + propkey] === 'function') || (nextProps["" + propkey].toString() === this["" + propkey].toString()))) {
                delete dProps["" + propkey];
            }
        }
        if (dProps['children']) {
            delete dProps['children'];
        }
        // tslint:disable-next-line:no-any
        if (this.initRenderCalled && (this.canDelayUpdate || this.props.delayUpdate)) {
            setTimeout(function () {
                _this.refreshProperties(dProps, nextProps, silent);
            });
        }
        else {
            this.refreshProperties(dProps, nextProps, silent);
        }
    };
    ComponentBase.prototype.refreshProperties = function (dProps, nextProps, silent) {
        var statelessTemplates = !isNullOrUndefined(this.props['statelessTemplates']) ? this.props['statelessTemplates'] : [];
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
    };
    ComponentBase.prototype.processComplexTemplate = function (curObject, context) {
        var compTemplate = context.complexTemplate;
        if (compTemplate) {
            for (var prop in compTemplate) {
                var PropVal = compTemplate["" + prop];
                if (curObject["" + prop]) {
                    setValue(PropVal, getValue(prop, curObject), curObject);
                }
            }
        }
    };
    ComponentBase.prototype.getDefaultAttributes = function () {
        var _this = this;
        this.isReact = true;
        var propKeys = Object.keys(this.props);
        if (!this.htmlattributes) {
            this.htmlattributes = {};
        }
        this.attrKeys = defaulthtmlkeys.concat(this.controlAttributes || []);
        for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
            var prop = propKeys_1[_i];
            if (prop.indexOf('data-') !== -1 || prop.indexOf('aria-') !== -1 || this.attrKeys.indexOf(prop) !== -1) {
                if (this.htmlattributes["" + prop] !== this.props["" + prop]) {
                    this.htmlattributes["" + prop] = this.props["" + prop];
                }
            }
        }
        if (!this.htmlattributes.ref) {
            /* tslint:disable:no-any */
            this.htmlattributes.ref = function (ele) {
                _this.reactElement = ele;
            };
            var keycompoentns = ['autocomplete', 'combobox', 'dropdownlist', 'dropdowntree', 'multiselect',
                'listbox', 'colorpicker', 'numerictextbox', 'textbox',
                'uploader', 'maskedtextbox', 'slider', 'datepicker', 'datetimepicker', 'daterangepicker', 'timepicker', 'checkbox', 'switch', 'radio'];
            if (keycompoentns.indexOf(this.getModuleName()) !== -1) {
                this.htmlattributes.key = '' + ComponentBase.reactUid;
                ComponentBase.reactUid++;
            }
        }
        if (this.clsName) {
            var clsList = this.element.classList;
            var className = this.htmlattributes['className'];
            for (var i = 0; i < clsList.length; i++) {
                if ((className.indexOf(clsList[parseInt(i.toString(), 10)]) === -1)) {
                    this.htmlattributes['className'] = this.htmlattributes['className'] + ' ' + clsList[parseInt(i.toString(), 10)];
                }
            }
            this.clsName = false;
        }
        return this.htmlattributes;
    };
    /* tslint:disable:no-any */
    ComponentBase.prototype.trigger = function (eventName, eventProp, successHandler) {
        var _this = this;
        if (this.isDestroyed !== true && this.modelObserver) {
            if (isColEName.test(eventName)) {
                var handler = getValue(eventName, this);
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
            var prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            if (eventName === 'created') {
                setTimeout(function () {
                    _this.isCreated = true;
                    if (!_this.isDestroyed) {
                        _this.modelObserver.notify(eventName, eventProp, successHandler);
                    }
                }, 10);
            }
            else {
                this.modelObserver.notify(eventName, eventProp, successHandler);
            }
            this.isProtectedOnChange = prevDetection;
        }
    };
    ComponentBase.prototype.compareValues = function (value1, value2) {
        var typeVal = typeof value1;
        var typeVal2 = typeof value2;
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
                var tempVal = value1;
                var tempVal2 = value2;
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
    };
    ComponentBase.prototype.compareObjects = function (oldProps, newProps, propName) {
        var status = true;
        var lenSimilarity = (oldProps.length === newProps.length);
        var diffArray = [];
        var templateProps = !isNullOrUndefined(this['templateProps']) ? this['templateProps'] : [];
        if (lenSimilarity) {
            for (var i = 0, len = newProps.length; i < len; i++) {
                var curObj = {};
                var oldProp = oldProps[parseInt(i.toString(), 10)];
                var newProp = newProps[parseInt(i.toString(), 10)];
                var keys = Object.keys(newProp);
                if (keys.length !== 0) {
                    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                        var key = keys_2[_i];
                        var oldValue = oldProp["" + key];
                        var newValue = newProp["" + key];
                        if (key === 'items') {
                            for (var _j = 0; _j < newValue.length; _j++) {
                                if (this.getModuleName() === 'richtexteditor' && typeof (newValue[parseInt(_j.toString(), 10)]) === 'object') {
                                    return { status: true };
                                }
                            }
                        }
                        if (this.getModuleName() === 'grid' && key === 'field') {
                            curObj["" + key] = newValue;
                        }
                        if (!oldProp.hasOwnProperty(key) || !((templateProps.length > 0 && templateProps.indexOf("" + key) === -1 && typeof (newValue) === 'function') ? this.compareValues(oldValue.toString(), newValue.toString()) : this.compareValues(oldValue, newValue))) {
                            if (!propName) {
                                return { status: false };
                            }
                            status = false;
                            curObj["" + key] = newValue;
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
    };
    ComponentBase.prototype.refreshChild = function (silent, props) {
        if (this.checkInjectedModules) {
            var prevModule = this.getInjectedModules() || [];
            var curModule = this.getInjectedServices() || [];
            for (var _i = 0, curModule_1 = curModule; _i < curModule_1.length; _i++) {
                var mod = curModule_1[_i];
                if (prevModule.indexOf(mod) === -1) {
                    prevModule.push(mod);
                }
            }
            this.injectedModules = prevModule;
        }
        if (this.directivekeys) {
            var changedProps = [];
            var directiveValue = this.validateChildren({}, this.directivekeys, (props || this.props));
            if (directiveValue && Object.keys(directiveValue).length) {
                if (!silent && this.skipRefresh) {
                    for (var _a = 0, _b = this.skipRefresh; _a < _b.length; _a++) {
                        var fields = _b[_a];
                        delete directiveValue["" + fields];
                    }
                }
                if (this.prevProperties) {
                    var dKeys = Object.keys(this.prevProperties);
                    for (var i = 0; i < dKeys.length; i++) {
                        var key = dKeys[parseInt(i.toString(), 10)];
                        if (!directiveValue.hasOwnProperty(key)) {
                            continue;
                        }
                        var compareOutput = this.compareObjects(this.prevProperties["" + key], directiveValue["" + key], key);
                        if (compareOutput.status) {
                            delete directiveValue["" + key];
                        }
                        else {
                            if (compareOutput.changedProperties.length) {
                                changedProps = changedProps.concat(compareOutput.changedProperties);
                            }
                            var obj = {};
                            obj["" + key] = directiveValue["" + key];
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
                            var compareField1 = getValue('field', allColumns[parseInt(_c1.toString(), 10)]);
                            var compareField2 = getValue(_c1 + '.value.field', changedProps);
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
                        for (var _c = 0, changedProps_1 = changedProps; _c < changedProps_1.length; _c++) {
                            var changes = changedProps_1[_c];
                            var propInstance_1 = getValue(changes.key + '.' + changes.index, this);
                            if (propInstance_1 && propInstance_1.setProperties) {
                                propInstance_1.setProperties(changes.value);
                            }
                            else {
                                extend(propInstance_1, changes.value);
                            }
                        }
                    }
                }
                else {
                    this.setProperties(directiveValue, silent);
                }
            }
        }
    };
    ComponentBase.prototype.componentWillUnmount = function () {
        clearTimeout(this.cachedTimeOut);
        var modulesName = ['dropdowntree', 'checkbox'];
        // tslint:disable-next-line:no-any
        if (this.initRenderCalled && this.isAppendCalled && this.element && ((!modulesName.indexOf(this.getModuleName())) ? document.body.contains(this.element) : true) && !this.isDestroyed && this.isCreated) {
            this.destroy();
        }
    };
    // tslint:disable:no-any
    ComponentBase.prototype.appendReactElement = function (element, container) {
        var portal = createPortal(element, container);
        if (!this.portals) {
            this.portals = [portal];
        }
        else {
            this.portals.push(portal);
        }
    };
    // tslint:disable:no-any
    ComponentBase.prototype.renderReactTemplates = function (callback) {
        this.isReactForeceUpdate = true;
        if (callback) {
            this.forceUpdate(callback);
        }
        else {
            this.forceUpdate();
        }
        this.isReactForeceUpdate = false;
    };
    // tslint:disable:no-any
    ComponentBase.prototype.clearTemplate = function (templateNames, index, callback) {
        var _this = this;
        var tempPortal = [];
        if (templateNames && templateNames.length) {
            Array.prototype.forEach.call(templateNames, function (propName) {
                var propIndexCount = 0;
                _this.portals.forEach(function (portal) {
                    if (portal.propName === propName) {
                        tempPortal.push(propIndexCount);
                        propIndexCount++;
                    }
                });
                if (!isNullOrUndefined(index) && _this.portals[index] && _this.portals[index].propName === propName) {
                    _this.portals.splice(index, 1);
                    
                }
                else {
                    for (var i = 0; i < _this.portals.length; i++) {
                        if (_this.portals[parseInt(i.toString(), 10)].propName === propName) {
                            _this.portals.splice(i, 1);
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
    };
    /* tslint:disable:no-any */
    ComponentBase.prototype.validateChildren = function (childCache, mapper, props) {
        var flag = false;
        var childs = Children.toArray(props.children);
        for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
            var child = childs_1[_i];
            var ifield = this.getChildType(child);
            var key = mapper["" + ifield];
            if (ifield && mapper) {
                // tslint:disable
                var childProps = this.getChildProps(Children.toArray(child.props.children), key);
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
    };
    // tslint:disable:no-any
    ComponentBase.prototype.getChildType = function (child) {
        if (child.type && child.type.isDirective) {
            return child.type.moduleName || '';
        }
        return '';
    };
    ComponentBase.prototype.getChildProps = function (subChild, matcher) {
        var ret = [];
        for (var _i = 0, subChild_1 = subChild; _i < subChild_1.length; _i++) {
            var child = subChild_1[_i];
            var accessProp = false;
            var key = void 0;
            if (typeof matcher === 'string') {
                accessProp = true;
                key = matcher;
            }
            else {
                key = Object.keys(matcher)[0];
            }
            var prop = child.props;
            // tslint:disable-next-line:no-any
            var field = this.getChildType(child);
            if (field === key) {
                if (accessProp || !prop.children) {
                    // tslint:disable
                    var cacheVal = extend({}, prop, {}, true);
                    // tslint:disable
                    this.processComplexTemplate(cacheVal, child.type);
                    ret.push(cacheVal);
                }
                else {
                    var cachedValue = this.validateChildren(extend({}, prop), matcher["" + key], prop) || prop;
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
    };
    // tslint:disable:no-any
    ComponentBase.prototype.getInjectedServices = function () {
        var childs = Children.toArray(this.props.children);
        for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
            var child = childs_2[_i];
            /* tslint:disable:no-any */
            if (child.type.isService) {
                return child.props.services;
            }
        }
        return [];
    };
    /**
     * @private
     */
    ComponentBase.reactUid = 1;
    return ComponentBase;
}(Component));

/* tslint:enable:no-any */

// eslint-disable-next-line
function applyMixins(derivedClass, baseClass) {
    // tslint:disable:typedef
    baseClass.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            if (name !== 'isMounted' && name !== 'replaceState') {
                derivedClass.prototype["" + name] = baseClass.prototype["" + name];
            }
        });
    });
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Directory base
 */
var ComplexBase = /** @__PURE__ @class */ (function (_super) {
    __extends$1(ComplexBase, _super);
    function ComplexBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComplexBase.prototype.render = function () {
        return null;
    };
    ComplexBase.isDirective = true;
    return ComplexBase;
}(PureComponent));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Dependency injection
 */
var Inject = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Inject, _super);
    function Inject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line
    Inject.prototype.render = function () {
        return null;
    };
    Inject.isService = true;
    return Inject;
}(PureComponent));

/**
 * Template compiler for react
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
var stringCompiler = getTemplateEngine();
// eslint-disable-next-line
function compile(templateElement, helper) {
    if (typeof templateElement === 'string') {
        return stringCompiler(templateElement, helper);
    }
    else {
        return function (data, component, prop, element) {
            var actTemplate = templateElement;
            var actData = data;
            if (typeof actTemplate === 'object') {
                actTemplate = templateElement.template;
                actData = extend({}, data, templateElement.data || {});
            }
            var cEle;
            if (element) {
                cEle = element;
            }
            else {
                cEle = document.createElement('div');
            }
            var rele = createElement(actTemplate, actData);
            var portal = createPortal(rele, cEle);
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
//# sourceMappingURL=ej2-react-base.es5.js.map