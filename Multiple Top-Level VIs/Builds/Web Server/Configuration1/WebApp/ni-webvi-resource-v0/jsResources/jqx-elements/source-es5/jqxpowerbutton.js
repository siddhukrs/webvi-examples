"use strict";
JQX("jqx-power-button", function(t) {
    function e() {
        return babelHelpers.classCallCheck(this, e), babelHelpers.possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
    }
    return babelHelpers.inherits(e, t), babelHelpers.createClass(e, [{
        key: "template",
        value: function() {
            return "<div id='container' class='jqx-container'>\n                 <div id='powerButtonAnimation' class ='jqx-animation'></div>\n                 <span id='button' class ='jqx-input'></span>\n                 <input id='hiddenInput' class ='jqx-hidden-input' type='hidden'>\n               </div>"
        }
    }, {
        key: "ready",
        value: function() {
            var t = this;
            babelHelpers.get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "ready", this).call(this), t._updateHidenInputNameAndValue()
        }
    }]), e
}(JQX.ToggleButton));
//# sourceMappingURL=jqxpowerbutton.js.map