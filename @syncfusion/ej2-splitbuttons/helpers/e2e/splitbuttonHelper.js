var __extends = (this && this.__extends) || (function () {
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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitButtonHelper = (function (_super) {
        __extends(SplitButtonHelper, _super);
        function SplitButtonHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        SplitButtonHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        SplitButtonHelper.prototype.getDropDownElement = function () {
            return this.selector('#' + this.id + '_dropdownbtn');
        };
        SplitButtonHelper.prototype.getPopupElement = function () {
            return this.selector('#' + this.id + '_dropdownbtn_popup');
        };
        SplitButtonHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        SplitButtonHelper.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        SplitButtonHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return SplitButtonHelper;
    }(e2e_1.TestHelper));
    exports.SplitButtonHelper = SplitButtonHelper;
});
