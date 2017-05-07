"use strict";
JQX("jqx-base-progress-bar", function(e) {
    function t() {
        return babelHelpers.classCallCheck(this, t), babelHelpers.possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return babelHelpers.inherits(t, e), babelHelpers.createClass(t, [{
        key: "ready",
        value: function() {
            babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "ready", this).call(this), this._updateProgress()
        }
    }, {
        key: "propertyChangedHandler",
        value: function(e, a, r) {
            babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "propertyChangedHandler", this).call(this, e, a, r);
            var l = this;
            l._updateProgress(), "value" === e && l.$.fireEvent("change", {
                value: r,
                oldValue: a,
                changeType: "api"
            })
        }
    }, {
        key: "_updateProgress",
        value: function() {}
    }, {
        key: "_percentageValue",
        get: function() {
            var e = this,
                t = Math.max(e.min, e.max),
                a = Math.min(e.min, e.max);
            return (Math.min(t, Math.max(a, e.value)) - a) / (t - a)
        }
    }], [{
        key: "properties",
        get: function() {
            return {
                indeterminate: {
                    value: !1,
                    type: "boolean"
                },
                inverted: {
                    value: !1,
                    type: "boolean"
                },
                formatFunction: {
                    value: null,
                    type: "function"
                },
                max: {
                    value: 100,
                    type: "number"
                },
                min: {
                    value: 0,
                    type: "number"
                },
                showProgressValue: {
                    value: !1,
                    type: "boolean"
                },
                value: {
                    value: 0,
                    type: "number?"
                }
            }
        }
    }]), t
}(JQX.BaseElement)), JQX("jqx-circular-progress-bar", function(e) {
    function t() {
        return babelHelpers.classCallCheck(this, t), babelHelpers.possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return babelHelpers.inherits(t, e), babelHelpers.createClass(t, [{
        key: "template",
        value: function() {
            return '<div>\n                    <div class="jqx-label-container"><content></content><div id="label" class="jqx-label"></div></div>\n                    <svg width="100%" height="100%" viewPort="0 0 100 100" viewBox="0 0 100 100">\n                       <circle id="value" class ="jqx-value-path" r="50" cx="50" cy="50" transform="rotate(270 50 50)"></circle>\n                       <circle id="value" class ="jqx-value" r="50" cx="50" cy="50" transform="rotate(270 50 50)"></circle>\n                    </svg>\n                </div>'
        }
    }, {
        key: "_updateProgress",
        value: function() {
            babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_updateProgress", this).call(this);
            var e = this,
                a = e.indeterminate ? 100 * Math.PI : 100 * Math.PI - e._percentageValue * Math.PI * 100,
                r = !!document.documentMode,
                l = !r && !!window.StyleMedia;
            if (e.showProgressValue) {
                var n = parseInt(100 * e._percentageValue);
                e.$.label.innerHTML = e.formatFunction ? e.formatFunction(n) : n + "%"
            } else e.$.label.innerHTML = "";
            return r || l ? null === e.value || e.indeterminate ? (e.$.value.style.strokeDashoffset = "", void e.$.value.setAttribute("class", "jqx-value jqx-value-animation-ms")) : (e.$.value.setAttribute("class", "jqx-value"), void(e.$.value.style.strokeDashoffset = e.inverted ? -a : a)) : (e.$.value.style.strokeDashoffset = e.inverted ? -a : a, null === e.value || e.indeterminate ? void e.$value.addClass("jqx-value-animation") : void e.$value.removeClass("jqx-value-animation"))
        }
    }]), t
}(JQX.BaseProgressBar)), JQX("jqx-progress-bar", function(e) {
    function t() {
        return babelHelpers.classCallCheck(this, t), babelHelpers.possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return babelHelpers.inherits(t, e), babelHelpers.createClass(t, [{
        key: "template",
        value: function() {
            return '<div>\n                    <div id="value" class="jqx-value"></div>\n                    <div id="label" class ="jqx-label"></div>\n                </div>'
        }
    }, {
        key: "_updateProgress",
        value: function() {
            babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_updateProgress", this).call(this);
            var e = this;
            if (e.showProgressValue) {
                var a = parseInt(100 * e._percentageValue);
                e.$.label.innerHTML = e.formatFunction ? e.formatFunction(a) : a + "%"
            } else e.$.label.innerHTML = "";
            null === e.value || e.indeterminate ? e.$value.addClass("jqx-value-animation") : e.$value.removeClass("jqx-value-animation"), e.$.value.style.transform = "horizontal" === e.orientation ? "scaleX(" + e._percentageValue + ")" : "scaleY(" + e._percentageValue + ")"
        }
    }], [{
        key: "properties",
        get: function() {
            return {
                orientation: {
                    value: "horizontal",
                    allowedValues: ["horizontal", "vertical"],
                    type: "string"
                }
            }
        }
    }]), t
}(JQX.BaseProgressBar));
//# sourceMappingURL=jqxprogressbar.js.map