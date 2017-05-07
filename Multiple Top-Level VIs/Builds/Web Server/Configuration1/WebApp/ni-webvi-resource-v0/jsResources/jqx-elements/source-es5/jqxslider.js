"use strict";
JQX("jqx-slider", function(e) {
    function t() {
        return babelHelpers.classCallCheck(this, t), babelHelpers.possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return babelHelpers.inherits(t, e), babelHelpers.createClass(t, [{
        key: "template",
        value: function() {
            return '<div id="container" class="jqx-container">\n            <div id="scaleNear" class="jqx-scale jqx-scale-near"></div>\n            <div id="trackContainer" class="jqx-track-container">\n                <jqx-repeat-button id="leftButton" class="jqx-spin-button">\n                    <div id="leftArrow" class="jqx-arrow"></div>\n                </jqx-repeat-button>\n                <div id="track" class="jqx-track">\n                    <div id="fill" class="jqx-value"></div>\n                    <div id="trackTicksContainer" class="jqx-track-ticks-container jqx-hidden"></div>\n                    <div id="thumb" class="jqx-thumb">\n                        <div id="tooltip" class="jqx-tooltip">\n                            <div id="tooltipContent" class="jqx-tooltip-content jqx-unselectable"></div>\n                        </div>\n                    </div>\n                    <div id="secondThumb" class="jqx-thumb">\n                        <div id="secondTooltip" class="jqx-tooltip">\n                            <div id="secondTooltipContent" class="jqx-tooltip-content jqx-unselectable"></div>\n                        </div>\n                    </div>\n                </div>\n                <jqx-repeat-button id="rightButton" class="jqx-spin-button">\n                    <div id="rightArrow" class="jqx-arrow"></div>\n                </jqx-repeat-button>\n            </div>\n            <div id="scaleFar" class="jqx-scale jqx-scale-far"></div>\n        </div>'
        }
    }, {
        key: "_createElement",
        value: function() {
            var e = this;
            e._checkMissingModules(), e._setSettingsObject(), e._setDrawVariables(), e._getLayoutType(), e._numericProcessor = new JQX.Utilities.NumericProcessor(e, "scaleType"), e._numberRenderer = new JQX.Utilities.NumberRenderer, e._setInitialComponentDisplay(), e._measurements = {}, e._getMeasurements(), e._wordLengthNumber = e._numericProcessor.getWordLength(e.wordLength), e._validateInitialPropertyValues(), e._setTicksAndInterval(), (e._valuesHandler = e.rangeSlider ? new JQX.Utilities.SliderMultipleValueHandler(e) : new JQX.Utilities.SliderSingleValueHandler(e)).validate(!0), e._setTabIndex(), e._makeThumbAccessible()
        }
    }, {
        key: "val",
        value: function(e) {
            var t = this,
                a = "object" === (void 0 === e ? "undefined" : babelHelpers.typeof(e)) && 0 === Object.keys(e).length,
                i = t._valuesHandler;
            if (void 0 === e || a !== !1) return i.getValue();
            i.areDifferent(e) && (t._programmaticValueIsSet = !0, i.validate(!1, e), t._programmaticValueIsSet = !1)
        }
    }, {
        key: "getOptimalSize",
        value: function() {
            var e = this,
                t = window.getComputedStyle(e),
                a = window.getComputedStyle(e.$.trackContainer),
                i = 0,
                o = void 0,
                r = void 0,
                n = void 0,
                l = void 0,
                s = void 0,
                u = void 0,
                c = void 0;
            return o = "all" === e.labelsVisibility ? e._numericProcessor._longestLabelSize : "endPoints" === e.labelsVisibility ? Math.max(e._tickIntervalHandler.labelsSize.minLabelOtherSize, e._tickIntervalHandler.labelsSize.maxLabelOtherSize) : 0, "horizontal" === e.orientation ? (i += parseFloat(a.marginTop) + parseFloat(a.marginBottom) + e.$.track.offsetHeight, "near" !== e.scalePosition && "both" !== e.scalePosition || (i += o, n = e.$.scaleNear.getElementsByClassName("jqx-label"), l = n[0], s = n[n.length - 1], i += parseFloat(window.getComputedStyle(l).bottom)), "far" !== e.scalePosition && "both" !== e.scalePosition || (i += o, n = e.$.scaleFar.getElementsByClassName("jqx-label"), l = n[0], s = n[n.length - 1], i += parseFloat(window.getComputedStyle(l).top)), i += parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), r = e.offsetWidth, "none" !== e.scalePosition && (u = l.getBoundingClientRect(), c = s.getBoundingClientRect(), u.left + l.offsetWidth - c.left > 0 && (r = l.offsetWidth + s.offsetWidth + Math.max(10, e.$.thumb.offsetWidth))), {
                width: r,
                height: i
            }) : (i += parseFloat(a.marginLeft) + parseFloat(a.marginRight) + e.$.track.offsetWidth, "near" !== e.scalePosition && "both" !== e.scalePosition || (i += o, n = e.$.scaleNear.getElementsByClassName("jqx-label"), l = n[0], s = n[n.length - 1], i += parseFloat(window.getComputedStyle(l).right)), "far" !== e.scalePosition && "both" !== e.scalePosition || (i += o, n = e.$.scaleFar.getElementsByClassName("jqx-label"), l = n[0], s = n[n.length - 1], i += parseFloat(window.getComputedStyle(l).left)), i += parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), r = e.offsetHeight, "none" !== e.scalePosition && (u = l.getBoundingClientRect(), c = s.getBoundingClientRect(), u.top + l.offsetHeight - c.top > 0 && (r = l.offsetHeight + s.offsetHeight + Math.max(10, e.$.thumb.offsetHeight))), {
                width: i,
                height: r
            })
        }
    }, {
        key: "propertyChangedHandler",
        value: function(e, a, i) {
            function o() {
                r._setTicksAndInterval(), n.validate(!1, n.getValue())
            }
            var r = this;
            if (["disabled", "readonly", "ticksPosition", "tooltipPosition"].indexOf(e) !== -1) return void babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "propertyChangedHandler", this).call(this, e, a, i);
            var n = r._valuesHandler;
            switch (e) {
                case "coerce":
                    if (i) {
                        var l = n.getValue();
                        n.validate(!1, l), r._valueBeforeCoercion = l
                    } else void 0 !== r._valueBeforeCoercion && n.validate(!1, r._valueBeforeCoercion);
                    break;
                case "decimalSeparator":
                case "labelFormatFunction":
                case "scientificNotation":
                    o();
                    break;
                case "interval":
                    r._numericProcessor.validateInterval(i), n.validate(!1, n.getValue());
                    break;
                case "inverted":
                    r._getLayoutType(), r._normalLayout && (r.$.fill.style[r._settings.margin] = "0px"), o();
                    break;
                case "labelsVisibility":
                case "ticksVisibility":
                    return;
                case "logarithmicScale":
                    r._validateMinMax("both"), o();
                    break;
                case "min":
                case "max":
                    r._validateMinMax(e, !1, a), o();
                    break;
                case "orientation":
                    r.$.container.removeAttribute("style"), r.$.trackContainer.removeAttribute("style"), r.$.fill.removeAttribute("style"), r.$.thumb.removeAttribute("style"), r.$.secondThumb.removeAttribute("style"), r._setSettingsObject(), r._getLayoutType(), r._getMeasurements(), o(), "horizontal" === i ? (r.$leftArrow.removeClass("jqx-arrow-up"), r.$rightArrow.removeClass("jqx-arrow-down"), r.$leftArrow.addClass("jqx-arrow-left"), r.$rightArrow.addClass("jqx-arrow-right")) : (r.$leftArrow.removeClass("jqx-arrow-left"), r.$rightArrow.removeClass("jqx-arrow-right"), r.$leftArrow.addClass("jqx-arrow-up"), r.$rightArrow.addClass("jqx-arrow-down"));
                    break;
                case "precisionDigits":
                case "significantDigits":
                    "precisionDigits" === e && "integer" === r.scaleType && r.error(r.localize("noInteger", {
                        elementType: r.nodeName.toLowerCase(),
                        property: e
                    })), "significantDigits" === e && null !== r.precisionDigits ? r.precisionDigits = null : "precisionDigits" === e && null !== r.significantDigits && (r.significantDigits = null), o();
                    break;
                case "rangeSlider":
                    i ? (r.values = [r.min, r.value], void 0 !== r._valueBeforeCoercion && (r._valueBeforeCoercion = [r.min, r._valueBeforeCoercion]), n = r._valuesHandler = new JQX.Utilities.SliderMultipleValueHandler(r)) : (r.value = r.values[1], void 0 !== r._valueBeforeCoercion && (r._valueBeforeCoercion = r._valueBeforeCoercion[1]), n = r._valuesHandler = new JQX.Utilities.SliderSingleValueHandler(r), r.$.fill.style.marginTop = 0, r.$.fill.style.marginLeft = 0), n.validate(!1, n.getValue());
                    break;
                case "scalePosition":
                    r._setInitialComponentDisplay(), o();
                    break;
                case "scaleType":
                    r._numericProcessor = new JQX.Utilities.NumericProcessor(r, "scaleType"), r._validateMinMax("both"), r._setTicksAndInterval(), n.validate(!0);
                    break;
                case "showButtons":
                    i ? (r.$leftButton.removeClass("jqx-hidden"), r.$rightButton.removeClass("jqx-hidden")) : (r.$leftButton.addClass("jqx-hidden"), r.$rightButton.addClass("jqx-hidden")), r._setTicksAndInterval(), n.moveThumbBasedOnValue(n.getDrawValue(), void 0, !0);
                    break;
                case "showUnit":
                case "unit":
                    r._setTicksAndInterval();
                    break;
                case "value":
                case "values":
                    if (r.rangeSlider && "value" === e) return;
                    r._programmaticValueIsSet = !0, n.validate(!1, i), r._programmaticValueIsSet = !1;
                    break;
                case "wordLength":
                    r._wordLengthNumber = r._numericProcessor.getWordLength(i), r._validateMinMax("both"), o()
            }
        }
    }, {
        key: "_setInitialComponentDisplay",
        value: function() {
            babelHelpers.get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_setInitialComponentDisplay", this).call(this);
            var e = this;
            e.$secondTooltip.addClass("jqx-hidden"), e.showButtons || (e.$leftButton.addClass("jqx-hidden"), e.$rightButton.addClass("jqx-hidden"))
        }
    }, {
        key: "_getMeasurements",
        value: function() {
            var e = this,
                t = e._measurements,
                a = e.$.track,
                i = e.$.thumb;
            "horizontal" === e.orientation ? (t.trackWidth = a.offsetHeight, t.thumbSize = i.offsetWidth, t.borderWidth = parseFloat(window.getComputedStyle(e.$.track).borderLeftWidth)) : (t.trackWidth = a.offsetWidth, t.thumbSize = i.offsetHeight, t.borderWidth = parseFloat(window.getComputedStyle(e.$.track).borderTopWidth)), t.halfThumbSize = t.thumbSize / 2
        }
    }, {
        key: "_layout",
        value: function() {
            var e = this,
                t = e._measurements,
                a = e.$.container.style,
                i = t.halfThumbSize,
                o = e._tickIntervalHandler.labelsSize,
                r = void 0,
                n = void 0,
                l = void 0,
                s = void 0;
            if ("none" !== e.scalePosition ? (r = o.minLabelSize / 2, n = o.maxLabelSize / 2) : (r = 0, n = 0), e.showButtons) {
                var u = e.$.leftButton[e._settings.size],
                    c = u + i;
                l = Math.max(r - c, 0) + "px", s = Math.max(n - c, 0) + "px"
            } else l = Math.max(i, r) + "px", s = Math.max(i, n) + "px";
            "horizontal" === e.orientation ? (e.inverted ? (a.paddingLeft = s, a.paddingRight = l) : (a.paddingLeft = l, a.paddingRight = s), t.trackLength = e.$.track.clientWidth, e.$leftArrow.addClass("jqx-arrow-left"), e.$rightArrow.addClass("jqx-arrow-right")) : (e.inverted ? (a.paddingBottom = s, a.paddingTop = l) : (a.paddingBottom = l, a.paddingTop = s), t.trackLength = e.$.track.clientHeight, e.$leftArrow.addClass("jqx-arrow-up"), e.$rightArrow.addClass("jqx-arrow-down"))
        }
    }, {
        key: "_trackDownHandler",
        value: function(e) {
            var t = this,
                a = t.mechanicalAction;
            if (!(t.disabled || t.readonly || !t.rangeSlider && e.target === t.$.thumb)) {
                if (t._stopTrackDownHandler) return void(t._stopTrackDownHandler = !1);
                "switchUntilReleased" === a && (t._valueAtDragStart = t._valuesHandler.getValue()), t._getTrackStartAndEnd(), t._valuesHandler.setActiveThumbOnTrackClick(e), t._moveThumbBasedOnCoordinates(e, !0, "switchWhenReleased" !== a), t._thumbDragged = !0, t.showTooltip && t._movedTooltip.removeClass("jqx-hidden")
            }
        }
    }, {
        key: "_thumbDownHandler",
        value: function(e) {
            var t = this;
            t.disabled || t.readonly || (t._getTrackStartAndEnd(), (e.pageX < t._trackStart || e.pageX > t._trackEnd) && (t._stopTrackDownHandler = !0), "switchUntilReleased" === t.mechanicalAction && (t._valueAtDragStart = t._valuesHandler.getValue()), window.getSelection().removeAllRanges(), t._thumbDragged = !0, t.$track.addClass("jqx-dragged"), t._movedThumb = e.target, t._movedTooltip = t.$tooltip, t.rangeSlider && (t._movedThumb === t.$.thumb ? t._staticThumb = t.$.secondThumb : (t._staticThumb = t.$.thumb, t._movedTooltip = t.$secondTooltip)), t.showTooltip && t._movedTooltip.removeClass("jqx-hidden"), e.stopPropagation())
        }
    }, {
        key: "_documentMoveHandler",
        value: function(e) {
            var t = this;
            t._thumbDragged && t._moveThumbBasedOnCoordinates(e, !0, "switchWhenReleased" !== t.mechanicalAction)
        }
    }, {
        key: "_documentUpHandler",
        value: function(e) {
            var t = this;
            t._thumbDragged && ("switchUntilReleased" === t.mechanicalAction ? t._valuesHandler.validate(!1, t._valueAtDragStart) : "switchWhenReleased" === t.mechanicalAction && t._moveThumbBasedOnCoordinates(e, !0, !0), t.showTooltip && t._movedTooltip.addClass("jqx-hidden"), t._thumbDragged = !1, t.$track.removeClass("jqx-dragged"), t._makeThumbAccessible())
        }
    }, {
        key: "_spinButtonClickHandler",
        value: function(e) {
            var t = this;
            if (!t.disabled && !t.readonly) {
                var a = void 0;
                a = t.$.leftButton.contains(e.target) === t._normalLayout ? "subtract" : "add", t._valuesHandler.incrementOrDecrement(a)
            }
        }
    }, {
        key: "_keydownHandlerSlider",
        value: function(e) {
            this._valuesHandler.keydownHandler(e)
        }
    }, {
        key: "_resizeAndStyleChangedHandler",
        value: function() {
            var e = this,
                t = e._valuesHandler;
            e._setTicksAndInterval(), t.validate(!1, t.getValue())
        }
    }, {
        key: "_moveThumbBasedOnCoordinates",
        value: function(e, t, a) {
            var i = this,
                o = i._numericProcessor,
                r = i._trackStart,
                n = i._settings.margin,
                l = e[i._settings.page];
            t && (l = i._valuesHandler.restrictThumbCoordinates(l, r, i._trackEnd));
            var s = o.pxToValue(l),
                u = s;
            i.logarithmicScale ? (s = o.getCoercedValue(Math.log10(s)), u = parseFloat(Math.pow(10, s).toFixed(13))) : (s = o.getCoercedValue(s), u = s), l = o.valueToPx(s) + r;
            var c = l - r;
            i._movedThumb.style[n] = c - i._measurements.halfThumbSize + "px", i._valuesHandler.updateFillSizeAndPosition(c, n, u, !0, a)
        }
    }, {
        key: "_moveThumbBasedOnValue",
        value: function(e, t, a) {
            var i = this,
                o = i._numericProcessor.valueToPx(t),
                r = i._settings.margin;
            e.style[r] = o - i._measurements.halfThumbSize + "px";
            var n = i._getSingleActualValue(t);
            i._valuesHandler.updateFillSizeAndPosition(o, r, n, a, a)
        }
    }, {
        key: "_validate",
        value: function(e, t) {
            this._valuesHandler.validate(e, t)
        }
    }, {
        key: "_updateValue",
        value: function(e) {
            var t = this._valuesHandler;
            t.updateValue(t.getActualValue(e))
        }
    }, {
        key: "_makeThumbAccessible",
        value: function() {
            var e = this;
            e.rangeSlider && (e.$.thumb[e._settings.offset] === e.$.secondThumb[e._settings.offset] && e._numericProcessor.compare(e.values[1], e.max) === !1 ? e.$thumb.addClass("accessible") : e.$thumb.removeClass("accessible"))
        }
    }, {
        key: "_getSingleActualValue",
        value: function(e) {
            return this.logarithmicScale ? parseFloat(Math.pow(10, e).toFixed(13)) : e.toString()
        }
    }], [{
        key: "properties",
        get: function() {
            return {
                orientation: {
                    value: "horizontal",
                    allowedValues: ["horizontal", "vertical"],
                    type: "string",
                    defaultReflectToAttribute: !0
                },
                rangeSlider: {
                    value: !1,
                    type: "boolean"
                },
                showButtons: {
                    value: !1,
                    type: "boolean"
                },
                values: {
                    value: ["0", "100"],
                    type: "array"
                }
            }
        }
    }, {
        key: "listeners",
        get: function() {
            return {
                "track.down": "_trackDownHandler",
                "thumb.down": "_thumbDownHandler",
                "secondThumb.down": "_thumbDownHandler",
                "document.move": "_documentMoveHandler",
                "document.up": "_documentUpHandler",
                "leftButton.click": "_spinButtonClickHandler",
                "rightButton.click": "_spinButtonClickHandler",
                keydown: "_keydownHandlerSlider",
                resize: "_resizeAndStyleChangedHandler",
                styleChanged: "_resizeAndStyleChangedHandler",
                "document.selectstart": "_selectStartHandler"
            }
        }
    }]), t
}(JQX.Tank)), JQX.Utilities.Assign("SliderSingleValueHandler", function() {
    function e(t) {
        babelHelpers.classCallCheck(this, e), this.context = t
    }
    return babelHelpers.createClass(e, [{
        key: "applyFunctionToValue",
        value: function(e, t) {
            var a = this,
                i = a.context;
            return void 0 === t && (t = i.value), e.apply(i, [t])
        }
    }, {
        key: "areDifferent",
        value: function(e) {
            return this.context.value !== e
        }
    }, {
        key: "incrementOrDecrement",
        value: function(e) {
            var t = this.context,
                a = t._keyIncrementDecrement(e);
            this.validate(!1, a)
        }
    }, {
        key: "setActiveThumbOnTrackClick",
        value: function() {
            var e = this.context;
            e._movedThumb = e.$.thumb, e._movedTooltip = e.$tooltip
        }
    }, {
        key: "getActualValue",
        value: function(e) {
            return this.context._getSingleActualValue(e)
        }
    }, {
        key: "getCoercedLogarithmicValue",
        value: function(e) {
            var t = this.context;
            if (t.logarithmicScale) {
                var a = t._numericProcessor.getCoercedValue(Math.log10(e));
                return this.getActualValue(a)
            }
            return e
        }
    }, {
        key: "getDrawValue",
        value: function() {
            return this.context._drawValue
        }
    }, {
        key: "getValue",
        value: function() {
            return this.context.value
        }
    }, {
        key: "keydownHandler",
        value: function(e) {
            this.context._keydownHandler(e)
        }
    }, {
        key: "moveThumbBasedOnValue",
        value: function(e, t, a) {
            var i = this.context;
            if (void 0 === e && (e = i.value), i._moveThumbBasedOnValue(i.$.thumb, e, t), a !== !0) {
                i._drawValue = e;
                var o = this.getActualValue(e);
                i.value = o.toString(), delete i._valueBeforeCoercion, this.updateTooltipValue(o)
            }
        }
    }, {
        key: "restrictThumbCoordinates",
        value: function(e, t, a) {
            return e = Math.max(e, t), e = Math.min(e, a)
        }
    }, {
        key: "updateFillSizeAndPosition",
        value: function(e, t, a, i, o) {
            var r = this.context,
                n = r.$.fill.style,
                l = r._settings.dimension;
            if (r._normalLayout ? n[l] = e + "px" : (n[l] = r._measurements.trackLength - e + "px", n[t] = e + "px"), i) {
                var s = r.value,
                    u = r._numericProcessor;
                u.compare(u.createDescriptor(a), u.createDescriptor(s)) && (this.updateTooltipValue(a), o && (r._drawValue = r.logarithmicScale ? Math.log10(a) : a, r.value = a.toString(), delete r._valueBeforeCoercion, r._programmaticValueIsSet !== !0 && r.$.fireEvent("change", {
                    value: r.value,
                    oldValue: s
                })))
            }
        }
    }, {
        key: "updateTooltipValue",
        value: function(e) {
            var t = this.context;
            void 0 === e && (e = t.value), t.$.tooltipContent.innerHTML = t._formatLabel(e)
        }
    }, {
        key: "updateValue",
        value: function(e) {
            var t = this.context,
                a = t._numericProcessor.createDescriptor(e, !0, !1);
            t._drawValue = t.logarithmicScale ? Math.log10(a) : a, this.moveThumbBasedOnValue(t._drawValue, !0)
        }
    }, {
        key: "validate",
        value: function(e, t) {
            var a = this.context,
                i = a._numericProcessor,
                o = void 0;
            o = e ? a.value : t;
            var r = void 0;
            r = a.logarithmicScale ? this.getCoercedLogarithmicValue(o) : i.getCoercedValue(o), r = i.createDescriptor(r, !0, !0, !0), e ? (a._drawValue = a.logarithmicScale ? Math.log10(r) : r, a.value = r.toString(), this.moveThumbBasedOnValue(a._drawValue), a._programmaticValueIsSet = !1) : this.updateValue(r)
        }
    }]), e
}()), JQX.Utilities.Assign("SliderMultipleValueHandler", function() {
    function e(t) {
        babelHelpers.classCallCheck(this, e), this.context = t
    }
    return babelHelpers.createClass(e, [{
        key: "applyFunctionToValue",
        value: function(e, t) {
            var a = this,
                i = a.context,
                o = [];
            return void 0 === t && (t = i.values), o[0] = e.apply(i, [t[0]]), o[1] = e.apply(i, [t[1]]), o
        }
    }, {
        key: "areDifferent",
        value: function(e) {
            var t = this.context.values;
            return t[0] !== e[0] || t[1] !== e[1]
        }
    }, {
        key: "incrementOrDecrement",
        value: function(e) {
            var t = this.context,
                a = t.values.slice(0),
                i = void 0;
            i = "add" === e ? 1 : 0, a[i] = this.keyIncrementDecrement(e, i), this.validate(!1, a)
        }
    }, {
        key: "keydownHandler",
        value: function(e) {
            var t = this.context;
            if (!t.disabled && !t.readonly) {
                var a = e.charCode ? e.charCode : e.which;
                if ([35, 36, 37, 38, 39, 40].indexOf(a) !== -1) {
                    e.preventDefault();
                    var i = t.values.slice(0),
                        o = void 0;
                    switch (a) {
                        case 40:
                        case 37:
                            o = this.keyIncrementDecrement("subtract", 0), i[0] = o;
                            break;
                        case 38:
                        case 39:
                            o = this.keyIncrementDecrement("add", 1), i[1] = o;
                            break;
                        case 36:
                            t._drawValues[0] = t._drawMin, i[0] = t.min;
                            break;
                        case 35:
                            t._drawValues[1] = t._drawMax, i[1] = t.max
                    }
                    return this.validate(!1, i), !1
                }
            }
        }
    }, {
        key: "keyIncrementDecrement",
        value: function(e, t) {
            var a = this.context,
                i = a._drawValues[t],
                o = a._numericProcessor.createDescriptor(i),
                r = a._numericProcessor.incrementDecrement(o, e, a._validInterval);
            return a.logarithmicScale && (a._drawValues[t] = r, r = parseFloat(Math.pow(10, Math.round(r)).toFixed(13))), r
        }
    }, {
        key: "setActiveThumbOnTrackClick",
        value: function(e) {
            var t = this.context,
                a = t._trackStart + t._measurements.halfThumbSize,
                i = t._settings.offset,
                o = t.$.thumb,
                r = t.$.secondThumb,
                n = o[i],
                l = r[i],
                s = e[t._settings.page],
                u = t._normalLayout ? a + n + (l - n) / 2 : a + l + (n - l) / 2;
            t._normalLayout && s <= u || !t._normalLayout && s > u ? (t._movedThumb = o, t._staticThumb = r, t._movedTooltip = t.$tooltip) : (t._movedThumb = r, t._staticThumb = o, t._movedTooltip = t.$secondTooltip)
        }
    }, {
        key: "getActualValue",
        value: function(e) {
            return this.context.logarithmicScale ? [parseFloat(Math.pow(10, e[0].toString()).toFixed(13)), parseFloat(Math.pow(10, e[1].toString()).toFixed(13))] : [e[0].toString(), e[1].toString()]
        }
    }, {
        key: "getCoercedLogarithmicValue",
        value: function(e) {
            var t = this.context;
            if (t.logarithmicScale) {
                var a = [];
                return a[0] = t._numericProcessor.getCoercedValue(Math.log10(e[0])), a[1] = t._numericProcessor.getCoercedValue(Math.log10(e[1])), this.getActualValue(a)
            }
            return e
        }
    }, {
        key: "getDrawValue",
        value: function() {
            return this.context._drawValues
        }
    }, {
        key: "getValue",
        value: function() {
            return this.context.values.slice(0)
        }
    }, {
        key: "moveThumbBasedOnValue",
        value: function(e, t, a) {
            var i = this.context;
            if (void 0 === e && (e = i.values), i._numericProcessor.restrictValue(e), void 0 !== t && 0 !== t || (i._movedThumb = i.$.thumb, i._moveThumbBasedOnValue(i.$.thumb, e[0], !0)), void 0 !== t && 1 !== t || (i._movedThumb = i.$.secondThumb, i._moveThumbBasedOnValue(i.$.secondThumb, e[1], !0)), a !== !0) {
                i._drawValues = e;
                var o = this.getActualValue(e);
                i.values = o, delete i._valueBeforeCoercion, this.updateTooltipValue()
            }
        }
    }, {
        key: "restrictThumbCoordinates",
        value: function(e, t, a) {
            var i = this.context,
                o = t + i._staticThumb[i._settings.offset] + i._measurements.halfThumbSize;
            return i._movedThumb === i.$.thumb && i._normalLayout || i._movedThumb === i.$.secondThumb && !i._normalLayout ? (e = Math.max(e, t), e = Math.min(e, a, o)) : (e = Math.max(e, t, o), e = Math.min(e, a)), e
        }
    }, {
        key: "updateFillSizeAndPosition",
        value: function(e, t, a, i, o) {
            var r = this.context,
                n = r.$.fill.style,
                l = r._settings.dimension,
                s = r._settings.offset,
                u = r._measurements.halfThumbSize;
            if (r._normalLayout ? (n[l] = r.$.secondThumb[s] - r.$.thumb[s] + "px", n[t] = r.$.thumb[s] + u + "px") : (n[l] = r.$.thumb[s] - r.$.secondThumb[s] + "px", n[t] = r.$.secondThumb[s] + u + "px"), i) {
                var c = r._numericProcessor,
                    d = r._movedThumb === r.$.thumb ? 0 : 1,
                    h = r.values[d],
                    v = r.values.slice(0);
                if (c.compare(c.createDescriptor(a), c.createDescriptor(h))) {
                    var m = r.values.slice(0);
                    m[d] = a.toString(), this.updateTooltipValue(a, d), o && (this.updateDrawValues(m), r.values = m, delete r._valueBeforeCoercion, r._programmaticValueIsSet !== !0 && r.$.fireEvent("change", {
                        value: r.values.slice(0),
                        oldValue: v
                    }))
                }
            }
        }
    }, {
        key: "updateDrawValues",
        value: function(e) {
            var t = this.context;
            t.logarithmicScale ? (t._drawValues[0] = Math.log10(e[0]), t._drawValues[1] = Math.log10(e[1])) : t._drawValues = e.slice(0)
        }
    }, {
        key: "updateTooltipValue",
        value: function(e, t) {
            var a = this.context;
            if (void 0 === e) {
                var i = a.values;
                a.$.tooltipContent.innerHTML = a._formatLabel(i[0]), a.$.secondTooltipContent.innerHTML = a._formatLabel(i[1])
            } else 0 === t ? a.$.tooltipContent.innerHTML = a._formatLabel(e) : a.$.secondTooltipContent.innerHTML = a._formatLabel(e)
        }
    }, {
        key: "updateValue",
        value: function(e) {
            var t = this.context,
                a = [];
            a[0] = t._numericProcessor.createDescriptor(e[0], !0, !1), a[1] = t._numericProcessor.createDescriptor(e[1], !0, !1), this.updateDrawValues(a), this.moveThumbBasedOnValue(t._drawValues.slice(0))
        }
    }, {
        key: "validate",
        value: function(e, t) {
            var a = this.context,
                i = a._numericProcessor,
                o = [],
                r = void 0;
            r = e ? a.values.slice(0) : t, a.logarithmicScale ? o = this.getCoercedLogarithmicValue(r) : (o[0] = i.getCoercedValue(r[0]), o[1] = i.getCoercedValue(r[1])), o[0] = i.createDescriptor(o[0], !0, !0, !0), o[1] = i.createDescriptor(o[1], !0, !0, !0), e ? (a._drawValues = [], this.updateDrawValues(o), a.values = [o[0].toString(), o[1].toString()], this.moveThumbBasedOnValue(a._drawValues), a._programmaticValueIsSet = !1) : this.updateValue(o)
        }
    }]), e
}());
//# sourceMappingURL=jqxslider.js.map