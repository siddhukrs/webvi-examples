"use strict";
JQX("jqx-tank", function(e) {
    function a() {
        return babelHelpers.classCallCheck(this, a), babelHelpers.possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments))
    }
    return babelHelpers.inherits(a, e), babelHelpers.createClass(a, [{
        key: "template",
        value: function() {
            return '<div id="container" class="jqx-container"><div id="scaleNear" class="jqx-scale jqx-scale-near"></div><div id="track" class="jqx-track"><div id="fill" class="jqx-value"><div id="tooltip" class="jqx-tooltip"><div id="tooltipContent" class="jqx-tooltip-content jqx-unselectable"></div></div></div><div id="thumb" class="jqx-thumb"></div><div id="trackTicksContainer" class="jqx-track-ticks-container jqx-hidden"></div></div><div id="scaleFar" class="jqx-scale jqx-scale-far"></div></div>'
        }
    }, {
        key: "ready",
        value: function() {
            babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "ready", this).call(this), this._createElement()
        }
    }, {
        key: "_createElement",
        value: function() {
            var e = this;
            e._checkMissingModules(), e._setSettingsObject(), e._setDrawVariables(), e._getLayoutType(), e._numericProcessor = new JQX.Utilities.NumericProcessor(e, "scaleType"), e._numberRenderer = new JQX.Utilities.NumberRenderer, e._setInitialComponentDisplay(), e._measurements = {}, e._wordLengthNumber = e._numericProcessor.getWordLength(e.wordLength), e._validateInitialPropertyValues(), e._setTicksAndInterval(), e._validate(!0), e._updateTooltipValue(e._drawValue), e._setTabIndex(), e._setTrackSize()
        }
    }, {
        key: "val",
        value: function(e) {
            var a = this,
                t = "object" === (void 0 === e ? "undefined" : babelHelpers.typeof(e)) && 0 === Object.keys(e).length;
            if (void 0 === e || t !== !1) return a.value;
            if (e = e.toString().replace(/\s/g, ""), a._numericProcessor.regexScientificNotation.test(e) && (e = a._numericProcessor.scientificToDecimal(e)), e = a.logarithmicScale ? a._formatNumber(Math.pow(10, a._numericProcessor.getCoercedValue(Math.log10(e)))) : a._numericProcessor.getCoercedValue(e), parseFloat(a.value) !== parseFloat(e)) {
                var i = e.toString();
                a._validate(!1, i, !0), a._programmaticValueIsSet = !0, a.value = a._discardDecimalSeparator(i), delete a._valueBeforeCoercion
            }
        }
    }, {
        key: "_setTrackSize",
        value: function() {
            var e = this;
            "vertical" === e.orientation ? e._trackSize = e.$.track.offsetWidth : e._trackSize = e.$.track.offsetHeight
        }
    }, {
        key: "getOptimalSize",
        value: function() {
            var e = this,
                a = void 0,
                t = void 0,
                i = void 0;
            switch (e.labelsVisibility) {
                case "all":
                    t = e._numericProcessor._longestLabelSize;
                    break;
                case "endPoints":
                    t = Math.max(e._tickIntervalHandler.labelsSize.minLabelOtherSize, e._tickIntervalHandler.labelsSize.maxLabelOtherSize);
                    break;
                case "none":
                    t = 0
            }
            switch (e.orientation) {
                case "horizontal":
                    return a = {
                        marginA: "marginBottom",
                        marginB: "marginTop",
                        nearScaleDistance: "bottom",
                        farScaleDistance: "top",
                        paddingA: "paddingBottom",
                        paddingB: "paddingTop",
                        offset: "offsetWidth",
                        distance: "left"
                    }, e._orientationChanged && (a.offset = "offsetHeight", e._trackChanged = !0), i = e._getSize(t, a), {
                        width: i.optimalOtherSize,
                        height: i.optimalSize
                    };
                case "vertical":
                    return a = {
                        marginA: "marginLeft",
                        marginB: "marginRight",
                        nearScaleDistance: "right",
                        farScaleDistance: "left",
                        paddingA: "paddingLeft",
                        paddingB: "paddingRight",
                        offset: "offsetHeight",
                        distance: "top"
                    }, e._orientationChanged && (a.offset = "offsetWidth", e._trackChanged = !0), i = e._getSize(t, a), {
                        width: i.optimalSize,
                        height: i.optimalOtherSize
                    }
            }
        }
    }, {
        key: "propertyChangedHandler",
        value: function(e, t, i) {
            babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "propertyChangedHandler", this).call(this, e, t, i);
            var r = this;
            switch (e) {
                case "labelsVisibility":
                case "ticksVisibility":
                    return void r._updateScaleWidth(r._numericProcessor._longestLabelSize);
                case "coerce":
                    if (i) {
                        var n = r.value;
                        r.val(n), r.logarithmicScale ? r._moveThumbBasedOnValue(r._drawValue) : r._moveThumbBasedOnValue(r.value), r._valueBeforeCoercion = n
                    } else void 0 !== r._valueBeforeCoercion && r.val(r._valueBeforeCoercion);
                    return;
                case "interval":
                    r._numericProcessor.validateInterval(i), r.val(r.value);
                    break;
                case "min":
                case "max":
                    r._validateMinMax(e, !1, t);
                    var o = r._numericProcessor.createDescriptor(r._discardDecimalSeparator(r.value, r.decimalSeparator)),
                        l = r._validateRange(o);
                    r._setTicksAndInterval(), r._numericProcessor.updateValue(l);
                    break;
                case "inverted":
                    r._getLayoutType(), r._normalLayout && (r.$.fill.style[r._settings.margin] = "0px");
                    var s = r._numericProcessor.createDescriptor(r.value),
                        c = r._validateRange(s);
                    r._setTicksAndInterval(), r._numericProcessor.updateValue(c);
                    break;
                case "orientation":
                    var d = r.$.fill.style,
                        u = r.$.container.style;
                    switch (r._orientationChanged !== !0 && (r._orientationChanged = !0), r._tankSizeBeforeOrientation = {
                        width: r.offsetWidth,
                        height: r.offsetHeight
                    }, r._setSettingsObject(), r._getLayoutType(), r.inverted && (d.marginTop = "0", d.marginLeft = "0"), r.orientation) {
                        case "vertical":
                            r.inverted || (d.marginTop = "auto", d.marginLeft = "0"), d.width = "100%", u.paddingLeft = "0", u.paddingRight = "0";
                            break;
                        case "horizontal":
                            r.inverted || (d.marginTop = "0", d.marginLeft = "auto"), d.height = "100%", u.paddingTop = "0", u.paddingBottom = "0"
                    }
                    r._validateMinMax("both");
                    var m = r._numericProcessor.createDescriptor(r.value),
                        v = r._validateRange(m);
                    r._setTicksAndInterval(), r._setTicksAndInterval(), r._numericProcessor.updateValue(v);
                    break;
                case "significantDigits":
                case "precisionDigits":
                    if ("precisionDigits" === e && "integer" === r.scaleType && r.error(r.localize("noInteger", {
                            elementType: r.nodeName.toLowerCase(),
                            property: e
                        })), "significantDigits" === e && null !== r.precisionDigits ? r.precisionDigits = null : "precisionDigits" === e && null !== r.significantDigits && (r.significantDigits = null), r._validateInitialPropertyValues(), r._setTicksAndInterval(), "horizontal" === r.orientation && r.inverted) {
                        var g = r._numericProcessor.valueToPx(r._numericProcessor.getCoercedValue(r._drawValue));
                        r.updateFillSizeAndPosition(g, r._settings.margin, i, !1)
                    }
                    break;
                case "decimalSeparator":
                    if ("integer" === r.scaleType) return;
                    var _ = r._discardDecimalSeparator(r.value, t),
                        p = r._applyDecimalSeparator(_);
                    r.value = _, delete r._valueBeforeCoercion, r._numericProcessor.addTicksAndLabels(), r._updateTooltipValue(p);
                    break;
                case "value":
                    if (null === i) return;
                    var h = void 0 !== i ? i.toString().replace(/\s/g, "") : t.toString().replace(/\s/g, "");
                    r._numericProcessor.regexScientificNotation.test(h) && (h = r._numericProcessor.scientificToDecimal(h)), r._validate(!1, h), r._programmaticValueIsSet = !0, r.value = h.toString(), delete r._valueBeforeCoercion;
                    break;
                case "scaleType":
                    r._changeScaleType(t, i);
                    break;
                case "disabled":
                case "readonly":
                    r._setTabIndex();
                    break;
                case "showUnit":
                case "unit":
                    r._setTicksAndInterval(), r._moveThumbBasedOnValue(r._drawValue);
                    break;
                case "tooltipPosition":
                    break;
                case "wordLength":
                    r._wordLengthNumber = r._numericProcessor.getWordLength(i), r._validateMinMax("both");
                    var f = r._numericProcessor.createDescriptor(r.value),
                        k = r._validateRange(f);
                    r._setTicksAndInterval(), r._numericProcessor.updateValue(k);
                    break;
                case "scalePosition":
                    r._setInitialComponentDisplay(), r._setTicksAndInterval(), r._numericProcessor.updateValue(r.value);
                    break;
                case "labelFormatFunction":
                case "scientificNotation":
                    var b = r._discardDecimalSeparator(r.value, r.decimalSeparator);
                    r._setTicksAndInterval(), r._updateTooltipValue(b);
                    break;
                case "logarithmicScale":
                    r._validateMinMax("both");
                    var y = r._numericProcessor.createDescriptor(r.value),
                        w = r._validateRange(y);
                    r._setTicksAndInterval(), r._numericProcessor.updateValue(w);
                    break;
                case "ticksPosition":
                    "scale" === i ? (r.$trackTicksContainer.addClass("jqx-hidden"), r.$.trackTicksContainer.innerHTML = "") : r.$trackTicksContainer.removeClass("jqx-hidden"), r._numericProcessor.addTicksAndLabels()
            }
        }
    }, {
        key: "_checkMissingModules",
        value: function() {
            var e = [];
            try {
                BigNumber
            } catch (a) {
                e.push("jqxmath.js")
            }
            if (void 0 === JQX.Utilities.NumberRenderer && e.push("jqxnumberrenderer.js"), void 0 === JQX.Utilities.NumericProcessor && e.push("jqxnumericprocessor.js"), void 0 === JQX.Utilities.TickIntervalHandler && e.push("jqxtickintervalhandler.js"), e.length > 0) {
                var a = this;
                a.error(a.localize("missingReference", {
                    elementType: a.nodeName.toLowerCase(),
                    files: e.join(", ")
                }))
            }
        }
    }, {
        key: "_setSettingsObject",
        value: function() {
            var e = this;
            "horizontal" === e.orientation ? e._settings = {
                clientSize: "clientWidth",
                dimension: "width",
                leftOrTop: "left",
                margin: "marginLeft",
                offset: "offsetLeft",
                otherSize: "offsetHeight",
                size: "offsetWidth",
                page: "pageX"
            } : e._settings = {
                clientSize: "clientHeight",
                dimension: "height",
                leftOrTop: "top",
                margin: "marginTop",
                offset: "offsetTop",
                otherSize: "offsetWidth",
                size: "offsetHeight",
                page: "pageY"
            }
        }
    }, {
        key: "_setInitialComponentDisplay",
        value: function() {
            var e = this;
            switch (e.scalePosition) {
                case "near":
                    e.$scaleNear.removeClass("jqx-hidden"), e.$scaleFar.addClass("jqx-hidden");
                    break;
                case "far":
                    e.$scaleNear.addClass("jqx-hidden"), e.$scaleFar.removeClass("jqx-hidden");
                    break;
                case "both":
                    e.$scaleFar.removeClass("jqx-hidden"), e.$scaleNear.removeClass("jqx-hidden");
                    break;
                case "none":
                    e.$scaleFar.addClass("jqx-hidden"), e.$scaleNear.addClass("jqx-hidden")
            }
            e.$tooltip.addClass("jqx-hidden"), "track" === e.ticksPosition && e.$trackTicksContainer.removeClass("jqx-hidden")
        }
    }, {
        key: "_styleChangedHandler",
        value: function() {
            var e = this;
            e._setTicksAndInterval(), e._moveThumbBasedOnValue(e._drawValue)
        }
    }, {
        key: "_validateInitialPropertyValues",
        value: function() {
            var e = this,
                a = babelHelpers.typeof(e.value) === String ? e.value.replace(/\s/g, "") : e.value.toString().replace(/\s/g, "");
            e._numericProcessor.regexScientificNotation.test(a) && (e.value = e._numericProcessor.scientificToDecimal(a), delete e._valueBeforeCoercion), e.significantDigits = null !== e.significantDigits ? Math.min(Math.max(e.significantDigits, 1), 21) : null, null === e.significantDigits && null === e.precisionDigits ? e.significantDigits = 8 : null !== e.significantDigits && null !== e.precisionDigits && e.error(e.localize("significantPrecisionDigits", {
                elementType: e.nodeName.toLowerCase()
            })), e._validateMinMax("both", !0)
        }
    }, {
        key: "_validateMinMax",
        value: function(e, a, t) {
            function i(e, t) {
                r._numericProcessor.validateMinMax("min" === e || a, "max" === e || a);
                var i = r["_" + e + "Object"];
                ("min" === e ? new BigNumber(r.max).compare(i) <= 0 : new BigNumber(r.min).compare(i) > 0) ? t ? (r._numberRenderer = new JQX.Utilities.NumberRenderer(t), "min" === e ? n = !1 : o = !1, r[e] = t, r["_" + e + "Object"] = t) : r.error(r.localize("invalidMinOrMax", {
                    elementType: r.nodeName.toLowerCase(),
                    property: e
                })): (r._numberRenderer = new JQX.Utilities.NumberRenderer(i), r[e] = r["_" + e + "Object"])
            }
            var r = this,
                n = "min" === e || "both" === e,
                o = "max" === e || "both" === e;
            void 0 === (void 0 === a ? "undefined" : babelHelpers.typeof(a)) && (a = !1), "both" === e ? (i("min", t), i("max", t)) : i(e, t), r.logarithmicScale ? r._validateOnLogarithmicScale(n, o, t) : (r._drawMin = r.min, r._drawMax = r.max), r.min = r.min.toString(), r.max = r.max.toString(), r._minObject = r._numericProcessor.createDescriptor(r.min), r._maxObject = r._numericProcessor.createDescriptor(r.max), r._numericProcessor.validateInterval(r.interval)
        }
    }, {
        key: "_calculateTickInterval",
        value: function() {
            var e = this,
                a = e._tickIntervalHandler.getInterval("linear", e._drawMin, e._drawMax, e.$.track, e.logarithmicScale);
            a.major !== e._majorTicksInterval ? (e._intervalHasChanged = !0, e._majorTicksInterval = a.major) : e._intervalHasChanged = !0, e._minorTicksInterval = a.minor
        }
    }, {
        key: "_formatNumber",
        value: function(e) {
            var a = this,
                t = a._numberRenderer,
                i = parseFloat(e);
            if (t.numericValue = e, a.scientificNotation) i = a._numberRenderer.toScientific();
            else switch (a.scaleType) {
                case "floatingPoint":
                    i = a._applyDecimalSeparator(t.toDigits(a.significantDigits, a.precisionDigits));
                    break;
                case "integer":
                    i = t.isENotation(i) ? Math.round(t.largeExponentialToDecimal(i)) : Math.round(i), i = t.toDigits(a.significantDigits, 0)
            }
            return i
        }
    }, {
        key: "_formatLabel",
        value: function(e, a) {
            var t = this,
                i = void 0;
            return t.labelFormatFunction && void 0 !== (i = t.labelFormatFunction(e)) && "" !== i ? i : (i = t._formatNumber(e), t._numberRenderer = new JQX.Utilities.NumberRenderer(i), t.showUnit && (i += a !== !1 ? ' <span class="jqx-unselectable">' + t.unit + "</span>" : " " + t.unit), i)
        }
    }, {
        key: "_layout",
        value: function() {
            var e = this,
                a = e.$.container.style,
                t = e._tickIntervalHandler.labelsSize.minLabelSize / 2 + "px",
                i = e._tickIntervalHandler.labelsSize.maxLabelSize / 2 + "px";
            switch (e.orientation) {
                case "horizontal":
                    if ("none" === e.scalePosition) {
                        a.paddingLeft = "", a.paddingRight = "";
                        break
                    }
                    e.inverted ? (a.paddingLeft = i, a.paddingRight = t) : (a.paddingLeft = t, a.paddingRight = i);
                    break;
                case "vertical":
                    if ("none" === e.scalePosition) {
                        a.paddingTop = "", a.paddingBottom = "";
                        break
                    }
                    e.inverted ? (a.paddingBottom = i, a.paddingTop = t) : (a.paddingBottom = t, a.paddingTop = i)
            }
            e._measurements.trackLength = e.$.track[this._settings.clientSize]
        }
    }, {
        key: "_trackDownHandler",
        value: function(e) {
            var a = this;
            a.disabled || a.readonly || ("switchUntilReleased" === a.mechanicalAction && (a._cachedValue = {}, a._cachedValue._drawValue = a._drawValue, a._cachedValue.value = a.value), a._getTrackStartAndEnd(), a._moveThumbBasedOnCoordinates(e, !0, "switchWhenReleased" !== a.mechanicalAction), a._thumbDragged = !0, a.$track.addClass("jqx-dragged"), a.showTooltip && a.$tooltip.removeClass("jqx-hidden"))
        }
    }, {
        key: "_documentMoveHandler",
        value: function(e) {
            var a = this;
            a._thumbDragged && a._moveThumbBasedOnCoordinates(e, !0, "switchWhenReleased" !== a.mechanicalAction)
        }
    }, {
        key: "_documentUpHandler",
        value: function(e) {
            var a = this;
            if (a._thumbDragged) {
                if ("switchWhenReleased" === a.mechanicalAction) a._moveThumbBasedOnCoordinates(e, !0, !0);
                else if ("switchUntilReleased" === a.mechanicalAction) {
                    var t = a.value;
                    a._drawValue = a._cachedValue._drawValue, a.value = a._cachedValue.value, a._moveThumbBasedOnValue(a._drawValue), a.$.fireEvent("change", {
                        value: a.value,
                        oldValue: t
                    })
                }
                a.showTooltip && a.$tooltip.addClass("jqx-hidden"), a._thumbDragged = !1, a.$track.removeClass("jqx-dragged")
            }
        }
    }, {
        key: "_selectStartHandler",
        value: function(e) {
            this._thumbDragged && e.preventDefault()
        }
    }, {
        key: "_resizeHandler",
        value: function() {
            var e = this;
            e._orientationChanged !== !0 && (e._setTicksAndInterval(), e._moveThumbBasedOnValue(e._drawValue)), e._trackChanged && (e._measurements.trackLength = e.$.track[this._settings.clientSize], e._numericProcessor.addTicksAndLabels(), e._moveThumbBasedOnValue(e._drawValue)), e._setTrackSize(), delete e._orientationChanged, delete e._trackChanged
        }
    }, {
        key: "_moveThumbBasedOnCoordinates",
        value: function(e, a, t) {
            var i = this,
                r = a ? Math.min(Math.max(e[i._settings.page], i._trackStart), i._trackEnd) : e[i._settings.page],
                n = i._numericProcessor.pxToValue(r);
            n = i.logarithmicScale ? i._numericProcessor.getCoercedValue(Math.log10(n)) : i._numericProcessor.getCoercedValue(n), r = Math.min(Math.max(i._numericProcessor.valueToPx(n) + i._trackStart, i._trackStart), i._trackEnd);
            var o = r - i._trackStart;
            i.updateFillSizeAndPosition(o, i._settings.margin, n, !0, t)
        }
    }, {
        key: "_moveThumbBasedOnValue",
        value: function(e) {
            var a = this,
                t = a._numericProcessor.valueToPx(a._numericProcessor.getCoercedValue(e));
            a.updateFillSizeAndPosition(t, a._settings.margin, e, !0)
        }
    }, {
        key: "updateFillSizeAndPosition",
        value: function(e, a, t, i, r) {
            var n = this,
                o = n.$.fill.style;
            if (n._normalLayout ? o[n._settings.dimension] = e + "px" : (o[n._settings.dimension] = Math.min(n._measurements.trackLength, Math.max(0, n._measurements.trackLength - e)) + "px", o[a] = e + "px"), i) {
                var l = n.value;
                delete n._valueBeforeCoercion, n._numericProcessor.updateToolTipAndValue(t, l, r)
            }
        }
    }, {
        key: "_updateTooltipValue",
        value: function(e) {
            var a = this;
            a.logarithmicScale && (e = Math.pow(10, e)), e = void 0 !== e ? a._formatLabel(e) : a.value, a.$.tooltipContent.innerHTML = e
        }
    }, {
        key: "_getSize",
        value: function(e, a) {
            function t(e, a) {
                var t = e.getElementsByClassName("jqx-label");
                l = t[0], s = t[t.length - 1];
                var i = window.getComputedStyle(t[0])[a];
                c += parseFloat(i)
            }
            var i = this,
                r = window.getComputedStyle(i),
                n = window.getComputedStyle(i.$.track),
                o = i._trackSize + parseFloat(n[a.marginA]) + parseFloat(n[a.marginB]),
                l = void 0,
                s = void 0,
                c = void 0,
                d = void 0;
            switch (c = o, i.scalePosition) {
                case "none":
                    return c += parseFloat(r[a.paddingA]) + parseFloat(r[a.paddingB]), d = void 0 !== i._tankSizeBeforeOrientation ? "horizontal" === i.orientation ? i._tankSizeBeforeOrientation.height : i._tankSizeBeforeOrientation.width : "horizontal" === i.orientation ? parseFloat(n.width) : parseFloat(n.height), i._trackChanged !== !0 && (i._trackChanged = !0), {
                        optimalSize: c,
                        optimalOtherSize: d
                    };
                case "near":
                    c += e, t(i.$.scaleNear, a.nearScaleDistance);
                    break;
                case "far":
                    c += e, t(i.$.scaleFar, a.farScaleDistance);
                    break;
                case "both":
                    c += 2 * e, t(i.$.scaleNear, a.nearScaleDistance), t(i.$.scaleFar, a.farScaleDistance)
            }
            var u = void 0,
                m = void 0,
                v = void 0;
            return c += parseFloat(r[a.paddingA]) + parseFloat(r[a.paddingB]), u = l.getBoundingClientRect(), m = s.getBoundingClientRect(), d = i[a.offset], v = u[a.distance] + l[a.offset] - m[a.distance], v > 0 && (d = l[a.offset] + s[a.offset]), {
                optimalSize: c,
                optimalOtherSize: d
            }
        }
    }, {
        key: "_getRange",
        value: function() {
            var e = this;
            if (e.logarithmicScale) return void(e._range = e._drawMax - e._drawMin);
            e._range = new BigNumber(e._drawMax).subtract(new BigNumber(e._drawMin)).toString()
        }
    }, {
        key: "_getTrackStartAndEnd",
        value: function() {
            var e = this,
                a = void 0,
                t = e.$.track.getBoundingClientRect();
            if ("horizontal" === e.orientation) {
                var i = document.body.scrollLeft || document.documentElement.scrollLeft;
                a = t.left + i
            } else {
                var r = document.body.scrollTop || document.documentElement.scrollTop;
                a = t.top + r
            }
            var n = a + e._measurements.trackLength,
                o = n - a;
            e._trackStart = a, e._trackEnd = n, e._valuePerPx = e._numericProcessor.getValuePerPx(e._range, o)
        }
    }, {
        key: "_updateScaleWidth",
        value: function(e) {
            var a = this,
                t = "track" === a.ticksPosition ? 4 : 12;
            switch (a.labelsVisibility) {
                case "all":
                    e = a._numericProcessor._longestLabelSize;
                    break;
                case "endPoints":
                    e = Math.max(a._tickIntervalHandler.labelsSize.minLabelOtherSize, a._tickIntervalHandler.labelsSize.maxLabelOtherSize);
                    break;
                case "none":
                    e = 0
            }
            var i = t + e;
            if (Boolean(window.getComputedStyle(a.$.track).getPropertyValue("--jqx-tank-scale-size"))) a.$.container.style.setProperty("--jqx-tank-scale-size", i + "px");
            else {
                var r = window.getComputedStyle(a),
                    n = a.$.scaleNear.style,
                    o = a.$.scaleFar.style,
                    l = a.$.track.style,
                    s = void 0,
                    c = void 0,
                    d = void 0,
                    u = void 0;
                switch (a.orientation) {
                    case "horizontal":
                        s = "height", c = "width", d = a.offsetHeight, u = parseFloat(r.getPropertyValue("padding-top")) + parseFloat(r.getPropertyValue("padding-bottom"));
                        break;
                    case "vertical":
                        s = "width", c = "height", d = a.offsetWidth, u = parseFloat(r.getPropertyValue("padding-left")) + parseFloat(r.getPropertyValue("padding-right"))
                }
                switch (a.scalePosition) {
                    case "near":
                        n.setProperty(s, i + "px"), l.setProperty(s, d - u - i - 4 + "px");
                        break;
                    case "far":
                        o.setProperty(s, i + "px"), l.setProperty(s, d - u - i - 4 + "px");
                        break;
                    case "both":
                        n.setProperty(s, i + "px"), o.setProperty(s, i + "px"), l.setProperty(s, d - u - 2 * i - 4 + "px");
                        break;
                    case "none":
                        l.setProperty(s, "")
                }
                l.setProperty(c, "100%"), n.setProperty(c, "100%"), o.setProperty(c, "100%")
            }
        }
    }, {
        key: "_appendTicksAndLabelsToScales",
        value: function(e, a) {
            function t(t) {
                t.innerHTML = a, "scale" === i.ticksPosition && (t.innerHTML += e)
            }
            var i = this;
            switch (i.scalePosition) {
                case "near":
                    t(i.$.scaleNear);
                    break;
                case "far":
                    t(i.$.scaleFar);
                    break;
                case "both":
                    t(i.$.scaleNear), t(i.$.scaleFar)
            }
            "track" === i.ticksPosition && (i.$.trackTicksContainer.innerHTML = e)
        }
    }, {
        key: "_discardDecimalSeparator",
        value: function(e, a) {
            var t = this;
            if (void 0 === a && (a = t.decimalSeparator), "." !== a) {
                var i = new RegExp(a, "g");
                return "string" == typeof e ? e.replace(i, ".") : e.toString().replace(i, ".")
            }
            return e
        }
    }, {
        key: "_applyDecimalSeparator",
        value: function(e) {
            var a = this;
            return "string" != typeof e && (e = e.toString()), "." !== a.decimalSeparator && (e = e.replace(/\./g, a.decimalSeparator)), e
        }
    }, {
        key: "_validate",
        value: function(e, a, t) {
            var i = this,
                r = void 0;
            r = e ? i.value : a;
            var n = i._numericProcessor.createDescriptor(r, !0, !0, !0);
            t !== !0 && (n = i.logarithmicScale ? i._formatNumber(Math.pow(10, i._numericProcessor.getCoercedValue(Math.log10(n)))) : i._numericProcessor.getCoercedValue(n)), i._numericProcessor.regexScientificNotation.test(n) && (n = i._numericProcessor.scientificToDecimal(n)), n = i._discardDecimalSeparator(n, i.decimalSeparator), e ? (i._number = n, i._drawValue = i.logarithmicScale ? Math.log10(n) : n, i.value = n.toString(), delete i._valueBeforeCoercion, i._moveThumbBasedOnValue(i._drawValue), i._programmaticValueIsSet = !1) : i._numericProcessor.updateValue(n)
        }
    }, {
        key: "_validateRange",
        value: function(e) {
            var a = this;
            return e = a._numericProcessor.validate(e, a._minObject, a._maxObject)
        }
    }, {
        key: "_changeScaleType",
        value: function() {
            var e = this;
            e._numericProcessor = new JQX.Utilities.NumericProcessor(e, "scaleType"), e._validateMinMax("both"), e._setTicksAndInterval(), e._scaleTypeChangedFlag = !0, e._validate(!0, e._number.toString()), e._scaleTypeChangedFlag = !1
        }
    }, {
        key: "_setTicksAndInterval",
        value: function() {
            var e = this,
                a = e._formatLabel(e.min),
                t = e._formatLabel(e.max);
            e._getRange(), e._tickIntervalHandler = new JQX.Utilities.TickIntervalHandler(e, a, t, "jqx-label", e._settings.size, "integer" === e.scaleType, e.logarithmicScale), e._layout(), e._calculateTickInterval(), e._numericProcessor.addTicksAndLabels()
        }
    }, {
        key: "_setTabIndex",
        value: function() {
            var e = this;
            if (e.disabled || e.readonly) return void e.removeAttribute("tabindex");
            var a = !!document.documentMode,
                t = !a && !!window.StyleMedia;
            a || t || e.tabIndex !== -1 ? (a || t) && 0 === e.tabIndex && (e.tabIndex = 1) : e.tabIndex = 0
        }
    }, {
        key: "_keyIncrementDecrement",
        value: function(e) {
            var a = this,
                t = a.logarithmicScale ? new BigNumber(a._drawValue) : a._drawValue,
                i = a._numericProcessor.incrementDecrement(t, e, a._validInterval);
            return a.logarithmicScale && (a._drawValue = i, i = Math.pow(10, Math.round(i))), i
        }
    }, {
        key: "_keydownHandler",
        value: function(e) {
            var a = this;
            if (!a.disabled && !a.readonly) {
                var t = e.charCode ? e.charCode : e.which,
                    i = [35, 36, 37, 38, 39, 40],
                    r = [35, 38, 39].indexOf(t) > -1,
                    n = [36, 37, 40].indexOf(t) > -1,
                    o = void 0;
                if ("floatingPoint" === a.scaleType) {
                    if (parseFloat(a.value) <= parseFloat(a.min) && n || parseFloat(a.value) >= parseFloat(a.max) && r) return
                } else {
                    var l = new BigNumber(a._drawValue);
                    if (1 !== l.compare(a._drawMin) && n || l.compare(a._drawMax) !== -1 && r) return
                }
                if (i.indexOf(t) > -1) {
                    switch (e.preventDefault(), t) {
                        case 40:
                        case 37:
                            o = a._keyIncrementDecrement("subtract");
                            break;
                        case 38:
                        case 39:
                            o = a._keyIncrementDecrement("add");
                            break;
                        case 36:
                            a._drawValue = a._drawMin, o = a.min;
                            break;
                        case 35:
                            a._drawValue = a._drawMax, o = a.max
                    }
                    return a._validate(!1, o), !1
                }
            }
        }
    }, {
        key: "_setDrawVariables",
        value: function() {
            var e = this;
            e.logarithmicScale ? (e._drawValue = Math.log10(e.value), e._drawMin = Math.log10(e.min), e._drawMax = Math.log10(e.max)) : (e._drawValue = e.value, e._drawMin = e.min, e._drawMax = e.max)
        }
    }, {
        key: "_validateOnLogarithmicScale",
        value: function(e, a) {
            function t(e) {
                return Math.pow(10, Math.round(Math.log10(e) - Math.log10(5.5) + .5))
            }
            var i = this;
            if (e)
                if (i.min <= 0) i.min = 1, i._drawMin = 0;
                else if (Math.log10(i.min) % 1 != 0) {
                var r = t(parseFloat(i.min));
                r > i.min && (r /= 10), i._drawMin = Math.log10(i.min)
            } else i._drawMin = Math.log10(i.min);
            if (a)
                if (i.max <= 0) i.max = 1, i._drawMax = 0;
                else if (Math.log10(i.max) % 1 != 0) {
                var n = t(parseFloat(i.max));
                n < i.max && (n *= 10), i._drawMax = Math.log10(i.max)
            } else i._drawMax = Math.log10(i.max);
            "integer" === i.scaleType && (i._drawMin < 0 && (i._drawMin = 0, i.min = 1), i._drawMax < 0 && (i._drawMax = 1, i.max = 10)), i._drawMax === i._drawMin && (i._drawMax = i._drawMin + 1)
        }
    }, {
        key: "_getLayoutType",
        value: function() {
            var e = this,
                a = e.orientation,
                t = e.inverted;
            e._normalLayout = "horizontal" === a && !t || "vertical" === a && t
        }
    }, {
        key: "_trackOnMouseEnterHandler",
        value: function() {
            var e = this;
            e.readonly || e.disabled || e.$track.addClass("track-hovered")
        }
    }, {
        key: "_trackOnMouseLeaveHandler",
        value: function() {
            var e = this;
            e.readonly || e.disabled || e.$track.removeClass("track-hovered")
        }
    }], [{
        key: "properties",
        get: function() {
            return {
                coerce: {
                    value: !1,
                    type: "boolean"
                },
                decimalSeparator: {
                    value: ".",
                    type: "string"
                },
                interval: {
                    value: "1",
                    type: "any"
                },
                inverted: {
                    value: !1,
                    type: "boolean"
                },
                labelFormatFunction: {
                    value: null,
                    type: "function"
                },
                labelsVisibility: {
                    value: "all",
                    allowedValues: ["all", "endPoints", "none"],
                    type: "string"
                },
                logarithmicScale: {
                    value: !1,
                    type: "boolean"
                },
                max: {
                    value: "100",
                    type: "any"
                },
                mechanicalAction: {
                    value: "switchWhileDragging",
                    allowedValues: ["switchUntilReleased", "switchWhenReleased", "switchWhileDragging"],
                    type: "string"
                },
                messages: {
                    value: {
                        en: {
                            missingReference: "{{elementType}}: Missing reference to {{files}}.",
                            significantPrecisionDigits: "{{elementType}}: the properties significantDigits and precisionDigits cannot be set at the same time.",
                            invalidMinOrMax: "{{elementType}}: Invalid {{property}} value. Max cannot be lower than Min.",
                            noInteger: '{{elementType}}: precisionDigits could be set only on "floatingPoint" scaleType.'
                        }
                    },
                    type: "object",
                    extend: !0
                },
                min: {
                    value: "0",
                    type: "any"
                },
                orientation: {
                    value: "vertical",
                    allowedValues: ["horizontal", "vertical"],
                    type: "string"
                },
                precisionDigits: {
                    value: null,
                    type: "number?"
                },
                readonly: {
                    value: !1,
                    type: "boolean"
                },
                scalePosition: {
                    value: "near",
                    allowedValues: ["near", "far", "both", "none"],
                    type: "string"
                },
                scaleType: {
                    value: "floatingPoint",
                    allowedValues: ["floatingPoint", "integer"],
                    type: "string"
                },
                scientificNotation: {
                    value: !1,
                    type: "boolean"
                },
                showTooltip: {
                    value: !1,
                    type: "boolean"
                },
                showUnit: {
                    value: !1,
                    type: "boolean"
                },
                significantDigits: {
                    value: null,
                    type: "number?"
                },
                ticksPosition: {
                    value: "scale",
                    allowedValues: ["scale", "track"],
                    type: "string"
                },
                ticksVisibility: {
                    value: "minor",
                    allowedValues: ["major", "minor", "none"],
                    type: "string"
                },
                tooltipPosition: {
                    value: "near",
                    allowedValues: ["near", "far"],
                    type: "string"
                },
                unit: {
                    value: "kg",
                    type: "string"
                },
                value: {
                    value: "0",
                    type: "any"
                },
                wordLength: {
                    value: "int32",
                    allowedValues: ["int8", "uint8", "int16", "uint16", "int32", "uint32", "int64", "uint64"],
                    type: "string"
                }
            }
        }
    }, {
        key: "listeners",
        get: function() {
            return {
                "track.down": "_trackDownHandler",
                "document.move": "_documentMoveHandler",
                "document.up": "_documentUpHandler",
                keydown: "_keydownHandler",
                resize: "_resizeHandler",
                styleChanged: "_styleChangedHandler",
                "document.selectstart": "_selectStartHandler",
                "track.mouseenter": "_trackOnMouseEnterHandler",
                "track.mouseleave": "_trackOnMouseLeaveHandler"
            }
        }
    }]), a
}(JQX.BaseElement));
//# sourceMappingURL=jqxtank.js.map