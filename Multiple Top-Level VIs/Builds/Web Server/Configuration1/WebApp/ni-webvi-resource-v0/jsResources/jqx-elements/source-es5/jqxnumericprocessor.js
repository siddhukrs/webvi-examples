"use strict";
JQX.Utilities.Assign("NumericProcessor", function e(a, t) {
    switch (babelHelpers.classCallCheck(this, e), a[t]) {
        case "integer":
            return new JQX.Utilities.IntegerNumericProcessor(a, t);
        case "floatingPoint":
            return new JQX.Utilities.DecimalNumericProcessor(a, t);
        case "complex":
            return new JQX.Utilities.ComplexNumericProcessor(a, t)
    }
}), JQX.Utilities.Assign("BaseNumericProcessor", function() {
    function e(a, t) {
        babelHelpers.classCallCheck(this, e);
        var i = this;
        i.context = a, i._longestLabelSize = 0, i.numericFormatProperty = t, i.regexScientificNotation = new RegExp(/^([-+]?([0-9]*\.[0-9]+|[0-9]+))(Y|Z|E|P|T|G|M|k|c|m|u|n|p|f|a|z|y){1}$/), i.regexNoLeadingZero = new RegExp(/^[.]\d+$/), i.prefixesToPowers = {
            Y: 24,
            Z: 21,
            E: 18,
            P: 15,
            T: 12,
            G: 9,
            M: 6,
            k: 3,
            c: -2,
            m: -3,
            u: -6,
            n: -9,
            p: -12,
            f: -15,
            a: -18,
            z: -21,
            y: -24
        }
    }
    return babelHelpers.createClass(e, [{
        key: "prepareForValidation",
        value: function(e, a, t) {
            var i = this.context,
                r = e || void 0 !== a;
            t = t.replace(/\s/g, ""), t = i._discardDecimalSeparator(t), this.regexNoLeadingZero.test(t) ? t = "0" + t : ("integer" === i[this.numericFormatProperty] && (10 === i._radixNumber || r) || "floatingPoint" === i[this.numericFormatProperty]) && this.regexScientificNotation.test(t) && (t = this.scientificToDecimal(t));
            var n = !1,
                l = void 0;
            if ("complex" === i[this.numericFormatProperty] && i._regexSpecial.nonNumericValue.test(t) === !1) try {
                if (i._regexSpecial.exaValue.test(t)) {
                    var o = t.indexOf("E"),
                        c = parseFloat(t.slice(0, o)) * Math.pow(10, 18),
                        s = parseFloat(t.slice(o + 1, -1));
                    l = new NIComplex(c, s)
                } else l = new NIComplex(t);
                n = !0
            } catch (e) {
                n = !1
            }
            return n === !1 && (!r && i._regex[i._radixNumber].test(t) === !1 || r && i._regex[10].test(t) === !1) ? void i._handleNonNumericValue(e, a, t) : {
                value: t,
                enteredComplexNumber: l
            }
        }
    }, {
        key: "isENotation",
        value: function(e) {
            return new RegExp(/e/i).test(e.toString())
        }
    }, {
        key: "scientificToDecimal",
        value: function(e) {
            var a = e.replace(/[a-z]/gi, ""),
                t = e.replace(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/g, "");
            return parseFloat(a) * Math.pow(10, this.prefixesToPowers[t])
        }
    }, {
        key: "_createMeasureLabel",
        value: function() {
            var e = this.context,
                a = document.createElement("div");
            return a.className = "jqx-label", a.style.position = "absolute", a.style.visibility = "hidden", "far" !== e.scalePosition ? e._measureLabelScale = e.$.scaleNear : e._measureLabelScale = e.$.scaleFar, e._measureLabelScale.appendChild(a), a
        }
    }, {
        key: "_addMajorTickAndLabel",
        value: function(e, a, t, i, r) {
            var n = this.context,
                l = n._settings.leftOrTop,
                o = n._numericProcessor.valueToPx(i),
                c = "",
                s = "";
            if (parseInt(o) > parseInt(n._measurements.trackLength)) return {
                tick: c,
                label: s
            };
            if (n.logarithmicScale && (e = n._formatLabel(Math.pow(10, i))), "jqx-tank" === n.nodeName.toLowerCase() || n._intervalHasChanged) {
                var u = n._tickIntervalHandler.labelsSize;
                if (r) {
                    n._labelDummy.innerHTML = e;
                    var m = n._numericProcessor.valueToPx(i),
                        d = n._numericProcessor.valueToPx(parseFloat(n._drawMax)),
                        v = n._numericProcessor.valueToPx(parseFloat(n._drawMin)),
                        g = n._labelDummy[n._settings.size],
                        _ = "vertical" === n.orientation ? n._labelDummy.offsetWidth : n._labelDummy.offsetHeight,
                        b = (g + u.minLabelSize) / 2,
                        f = (g + u.maxLabelSize) / 2;
                    t = n._normalLayout ? m + f < d && m - b > v : m - f > d && m + b < v, _ > this._longestLabelSize && (this._longestLabelSize = _)
                } else this._longestLabelSize = Math.max(u.minLabelOtherSize, u.maxLabelOtherSize, this._longestLabelSize)
            }
            if (n._tickValues.push(i), c = '<div style="' + l + ": " + o + 'px;" class="jqx-tick"></div>', t !== !1) {
                void 0 === a && (n._labelDummy.innerHTML = e, a = n._labelDummy[n._settings.size]);
                var p = o - a / 2;
                s += '<div class="jqx-label' + (r ? " jqx-label-middle" : "") + '" style="' + l + ": " + p + 'px;">' + e + "</div>"
            }
            return {
                tick: c,
                label: s
            }
        }
    }, {
        key: "getWordLength",
        value: function(e) {
            switch (e) {
                case "int8":
                case "uint8":
                    return 8;
                case "int16":
                case "uint16":
                    return 16;
                case "int32":
                case "uint32":
                    return 32;
                case "int64":
                case "uint64":
                    return 64
            }
        }
    }, {
        key: "getAngleByValue",
        value: function(e, a, t) {
            var i = this.context;
            a !== !1 && i.logarithmicScale && (e = Math.log10(e));
            var r = (e - i._drawMin) * i._angleRangeCoefficient,
                n = void 0;
            return n = i.inverted ? i.startAngle + r : i.endAngle - r, t ? n : n * Math.PI / 180 + Math.PI / 2
        }
    }, {
        key: "getValueByAngle",
        value: function(e, a) {
            var t = this.context,
                i = void 0,
                r = void 0,
                n = void 0;
            for (t.inverted ? (i = e, r = t._normalizedStartAngle) : (i = t.endAngle, r = e); i < r;) i += 360;
            return n = (i - r) / t._angleDifference * t._range + parseFloat(t._drawMin), t.logarithmicScale && (n = Math.pow(10, n)), a && !t.coerce ? Math.round(n) : this.getCoercedValue(n, !1)
        }
    }, {
        key: "updateGaugeValue",
        value: function(e) {
            var a = this.context,
                t = a.value;
            a.value = e, a._drawValue = a.logarithmicScale ? Math.log10(e).toString() : e, a._number = this.createDescriptor(a.value), a.$.digitalDisplay.value = e, a.$.fireEvent("change", {
                value: e,
                oldValue: t
            }), delete a._valueBeforeCoercion
        }
    }, {
        key: "validateColorRange",
        value: function(e) {
            var a = this.context;
            return Math.min(Math.max(e, a.min), a.max)
        }
    }, {
        key: "getActualValue",
        value: function(e) {
            return this.context.logarithmicScale ? Math.pow(10, e) : e
        }
    }, {
        key: "drawGaugeLogarithmicScaleMinorTicks",
        value: function(e, a, t) {
            var i = this.context,
                r = void 0;
            a instanceof BigNumber && (a = parseFloat(a.toString()));
            for (var n in e)
                if (r = n, n >= 0 && n % 1 == 0) break;
            for (var l = parseFloat(r); l < i._drawMax; l += a)
                for (var o = 2; o <= 9; o++) {
                    var c = o * Math.pow(10, l + a - 1);
                    c < i.max && t(c)
                }
            for (var s = parseFloat(r); s > i._drawMin; s -= a)
                for (var u = 2; u <= 9; u++) {
                    var m = u * Math.pow(10, s - 1);
                    m > i.min && t(m)
                }
        }
    }]), e
}()), JQX.Utilities.Assign("IntegerNumericProcessor", function(e) {
    function a(e, t) {
        babelHelpers.classCallCheck(this, a);
        var i = babelHelpers.possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e, t)),
            r = i;
        return r.context = e, r.defaultMins = {
            int8: "-128",
            uint8: "0",
            int16: "-32768",
            uint16: "0",
            int32: "-2147483648",
            uint32: "0",
            int64: "-9223372036854775808",
            uint64: "0"
        }, r.defaultMaxs = {
            int8: "127",
            uint8: "255",
            int16: "32767",
            uint16: "65535",
            int32: "2147483647",
            uint32: "4294967295",
            int64: "9223372036854775807",
            uint64: "18446744073709551615"
        }, i
    }
    return babelHelpers.inherits(a, e), babelHelpers.createClass(a, [{
        key: "createDescriptor",
        value: function(e, a, t, i, r) {
            var n = void 0;
            if (e.constructor !== BigNumber) {
                var l = !r && this.context._radixNumber ? this.context._radixNumber : 10;
                10 === l && a && e.constructor !== BigNumber && this.isENotation(e) && (e = new JQX.Utilities.NumberRenderer(e).largeExponentialToDecimal()), n = this.context._toBigNumberDecimal ? this.context._toBigNumberDecimal(e.toString(l, this.context._wordLengthNumber), l) : new BigNumber(e)
            } else n = new BigNumber(e);
            return t && (this.context._unsigned && n.compare(0) === -1 && (n = n.set(0)), i && (n = this.context._validateRange(n)), n = this.round(n)), n
        }
    }, {
        key: "round",
        value: function(e) {
            if (this.context._wordLengthNumber < 64) return new BigNumber(Math.round(e.toString()));
            var a = e.mod(1);
            return 1 === a._d.length && 0 === a._d[0] || (e = e.intPart(), e._s ? a._d[1] > 5 && (e = e.add(-1)) : a._d[1] > 4 && (e = e.add(1))), e
        }
    }, {
        key: "validate",
        value: function(e, a, t) {
            return e.compare(a) === -1 ? a : 1 === e.compare(t) ? t : e
        }
    }, {
        key: "validateMinMax",
        value: function(e, a) {
            var t = this.context,
                i = this.defaultMins[t.wordLength],
                r = new BigNumber(i),
                n = this.defaultMaxs[t.wordLength],
                l = new BigNumber(n);
            if (void 0 === t._numberRenderer && (t._numberRenderer = new JQX.Utilities.NumberRenderer), e) {
                null !== t.min && (t.min = t.min.toString().replace(/\s/g, ""), t._numericProcessor.regexScientificNotation.test(t.min) && (t.min = t._numericProcessor.scientificToDecimal(t.min)));
                var o = this.round(new BigNumber(t.min));
                null === t.min || t._minIsNull && t._initialized || !(o.compare(r) >= 0) ? (t._minIsNull = !0, t.min = i, t._minObject = r) : t._minObject = o
            }
            if (a) {
                null !== t.max && (t.max = t.max.toString().replace(/\s/g, ""), t._numericProcessor.regexScientificNotation.test(t.max) && (t.max = t._numericProcessor.scientificToDecimal(t.max)));
                var c = this.round(new BigNumber(t.max));
                null === t.max || t._maxIsNull && t._initialized || !(c.compare(l) <= 0) ? (t._maxIsNull = !0, t.max = n, t._maxObject = l) : t._maxObject = c
            }
            this.compare(t._minObject, t._maxObject) || (t._minObject = r, t._maxObject = l, t._drawMin = t.logarithmicScale ? 0 : i, t._drawMax = t.logarithmicScale ? 10 : n, t.min = i, t.max = n)
        }
    }, {
        key: "valueToPx",
        value: function(e) {
            var a = this.context,
                t = new BigNumber(a._measurements.trackLength).divide(new BigNumber(a._range)),
                i = void 0;
            if (a._normalLayout) {
                var r = a._drawMin instanceof BigNumber ? a._drawMin : new BigNumber(a._drawMin);
                e = new BigNumber(e), i = parseFloat(t.multiply(e.subtract(r)).toString())
            } else {
                var n = a._drawMax instanceof BigNumber ? a._drawMax : new BigNumber(a._drawMax);
                i = parseFloat(this.round(n.subtract(e).multiply(t)).toString())
            }
            return i
        }
    }, {
        key: "pxToValue",
        value: function(e) {
            var a = this.context,
                t = void 0;
            if (t = a._normalLayout ? a._valuePerPx.multiply(e - a._trackStart) : a._valuePerPx.multiply(a._trackEnd - e), a.logarithmicScale) {
                var i = parseFloat(t) + parseFloat(a._drawMin);
                return a._drawValue = i, new BigNumber(Math.round(Math.pow(10, i)))
            }
            var r = a._numericProcessor.round(new BigNumber(a.min).add(t));
            return a._drawValue = r, r
        }
    }, {
        key: "compare",
        value: function(e, a) {
            return e.constructor !== BigNumber && (e = new BigNumber(e)), 0 !== e.compare(a)
        }
    }, {
        key: "incrementDecrement",
        value: function(e, a, t) {
            var i = this.context,
                r = void 0;
            if (e.constructor !== BigNumber && (e = new BigNumber(e)), "add" === a) {
                if (r = e.add(t), void 0 !== i._drawMax) return r.compare(i._drawMax) > 0 ? new BigNumber(i._drawMax) : r
            } else if (r = e.subtract(t), void 0 !== i._drawMin) return r.compare(i._drawMin) < 0 ? new BigNumber(i._drawMin) : r;
            return r
        }
    }, {
        key: "render",
        value: function(e, a) {
            var t = this.context;
            if (!t.scientificNotation && a === !0) return new JQX.Utilities.NumberRenderer(new BigNumber(e)).bigNumberToExponent(t.significantDigits);
            var i = e;
            return "string" != typeof e && (i = e.toString(t._radixNumber, t._wordLengthNumber)), t.scientificNotation && a === !0 && (i = new JQX.Utilities.NumberRenderer(i).toScientific()), i
        }
    }, {
        key: "addTicksAndLabels",
        value: function() {
            var e = this.context,
                a = e._measurements.trackLength,
                t = e._normalLayout,
                i = e._majorTicksInterval,
                r = e._numericProcessor.round(new BigNumber(e._range).divide(i)),
                n = a / r,
                l = new BigNumber(e._drawMin),
                o = new BigNumber(e._drawMax),
                c = void 0,
                s = void 0,
                u = void 0,
                m = void 0,
                d = void 0,
                v = void 0,
                g = void 0,
                _ = void 0,
                b = void 0,
                f = "",
                p = "";
            e._tickValues = [], this._longestLabelSize = 0, t ? (c = l, s = i.add(c.subtract(c.mod(i))), u = s.subtract(c), d = e._formatLabel(l), v = e._tickIntervalHandler.labelsSize.minLabelSize, m = o, g = e._formatLabel(o), _ = e._tickIntervalHandler.labelsSize.maxLabelSize) : (c = o, s = c.subtract(c.mod(i)), u = c.subtract(s), d = e._formatLabel(o), v = e._tickIntervalHandler.labelsSize.maxLabelSize, m = l, g = e._formatLabel(l), _ = e._tickIntervalHandler.labelsSize.minLabelSize), e._labelDummy = this._createMeasureLabel(), b = this._addMajorTickAndLabel(d, v, !0, c), f += b.tick, p += b.label;
            var h = u.divide(i).multiply(n);
            if (0 !== s.compare(e.max) && h.compare(a) < 0) {
                var x = e._formatLabel(s.toString()),
                    w = h.compare(v) > 0;
                b = this._addMajorTickAndLabel(x, void 0, w, s, !0), f += b.tick, p += b.label
            }
            b = this.addMiddleMajorTicks(r, n, h, u, t, i), f += b.tick, p += b.label, b = this._addMajorTickAndLabel(g, _, !0, m), f += b.tick, p += b.label, f += this.addMinorTicks(t), e._measureLabelScale.removeChild(e._labelDummy), delete e._labelDummy, delete e._measureLabelScale, "jqx-tank" === e.nodeName.toLowerCase() && e._updateScaleWidth(this._longestLabelSize), e._appendTicksAndLabelsToScales(f, p)
        }
    }, {
        key: "addMiddleMajorTicks",
        value: function(e, a, t, i, r, n) {
            for (var l = this.context, o = "", c = "", s = void 0, u = 1; u < e; u++) {
                var m = t.add(u * a),
                    d = void 0;
                if (r ? d = n.multiply(u).add(i.add(new BigNumber(l._drawMin))) : (d = new BigNumber(l._drawMax).subtract(i).subtract(n.multiply(u)), u === e - 1 && 0 === d.compare(0) && (l._numberRenderer.numericValue = l._tickIntervalHandler.nearestPowerOfTen, s = l._numberRenderer.bigNumberToExponent(1))), 0 !== d.compare(l._drawMax)) {
                    var v = l._formatLabel(d.toString()),
                        g = !0;
                    l._labelDummy.innerHTML = s ? s : v;
                    var _ = l._labelDummy[l._settings.size];
                    m.add(_).compare(e * a) >= 0 && (g = !1);
                    var b = this._addMajorTickAndLabel(v, void 0, g, d, !0);
                    o += b.tick, c += b.label
                }
            }
            return {
                tick: o,
                label: c
            }
        }
    }, {
        key: "addMinorTicks",
        value: function(e) {
            function a(e) {
                i.indexOf(e) === -1 && e % n == 0 && (u += '<div style="' + l + ": " + t._numericProcessor.valueToPx(e) + 'px;" class="jqx-tick jqx-tick-minor"></div>')
            }
            var t = this.context,
                i = t._tickValues,
                r = t._tickIntervalHandler.nearestPowerOfTen,
                n = t._minorTicksInterval,
                l = t._settings.leftOrTop,
                o = void 0,
                c = void 0,
                s = void 0,
                u = "";
            if (e ? (o = i[0], c = i[1], s = i[i.length - 1]) : (o = i[i.length - 1], c = i[i.length - 2], s = i[0]), t.logarithmicScale) ! function() {
                var e = t._measurements.trackLength,
                    a = e / i.length,
                    r = .1;
                a < 20 ? r = 1 : a >= 20 && a < 40 ? r = c - o > 1 ? 1 : .5 : a >= 40 && a < 80 && (r = .2);
                for (var n = Math.floor(t._drawMax), s = t._drawMax - n, m = t._drawMax - t._drawMin > i.length, d = t._drawMax; d > 0; d -= 1)
                    for (var v = s > 0 ? Math.pow(10, d - s + 1) : Math.pow(10, d), g = v * r, _ = v; _ > 0; _ -= g)
                        if (_ < t.max && _ > t.min) {
                            var b = new BigNumber(Math.log10(_));
                            (b % 1 == 0 && m || !m) && (u += '<div style="' + l + ": " + t._numericProcessor.valueToPx(b) + 'px;" class="jqx-tick jqx-tick-minor"></div>')
                        }
            }();
            else {
                for (var m = c; o.compare(m) < 0; m = m.subtract(r)) a(m);
                for (var d = c.add(r); s.compare(d) > 0; d = d.add(r)) a(d)
            }
            return u
        }
    }, {
        key: "addGaugeTicksAndLabels",
        value: function() {
            var e = this.context;
            if ("none" !== e.ticksVisibility || "none" !== e.labelsVisibility) {
                var a = this,
                    t = Math.max(e._tickIntervalHandler.labelsSize.minLabelSize, e._tickIntervalHandler.labelsSize.maxLabelSize),
                    i = e._majorTicksInterval,
                    r = e._minorTicksInterval,
                    n = {},
                    l = e._distance,
                    o = e._measurements.radius,
                    c = o - l.majorTickDistance,
                    s = o - l.minorTickDistance,
                    u = new BigNumber(e._drawMin),
                    m = new BigNumber(e._drawMax),
                    d = void 0,
                    v = void 0,
                    g = void 0,
                    _ = void 0,
                    b = void 0,
                    f = void 0;
                "none" !== e.ticksVisibility ? (d = function(a) {
                    e._drawTick(a, c, "major")
                }, v = function(t) {
                    e._drawTick(a.getAngleByValue(t, !0), s, "minor")
                }) : (d = function() {}, v = function() {}), g = "none" !== e.labelsVisibility ? function(a, t, i) {
                    e._drawLabel(a, t, l.labelDistance, i)
                } : function() {}, e.inverted ? (b = e.startAngle, f = e.endAngle) : (b = e.endAngle, f = e.startAngle), _ = a.getAngleByValue(u, !1), d(_), n[e._drawMin.toString()] = !0, g(_, e.min, !1);
                var p = u.subtract(u.mod(i)),
                    h = void 0;
                u.compare(0) !== -1 && (p = p.add(i));
                for (var x = new BigNumber(p); x.compare(u) !== -1; x = x.subtract(r)) h = x;
                _ = a.getAngleByValue(p, !1), d(_), n[p.toString()] = !0, 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(b, a.getAngleByValue(p, !1, !0)) / 360) > t && g(_, this.getActualValue(p), p.compare(m) === -1);
                var w = void 0;
                for (w = p.add(i); w.compare(m.subtract(i)) === -1; w = w.add(i)) _ = a.getAngleByValue(w, !1), d(_), n[w.toString()] = !0, g(_, this.getActualValue(w), !1);
                if (void 0 === n[w.toString()] && 1 !== w.compare(m) && (_ = a.getAngleByValue(w, !1), d(_), n[w.toString()] = !0, 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(f, a.getAngleByValue(w, !1, !0)) / 360) >= t && g(_, this.getActualValue(w), !0), e._normalizedStartAngle !== e.endAngle && (_ = a.getAngleByValue(m, !1), d(_), 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(f, b) / 360) >= t && g(_, e.max, !1))), e.logarithmicScale) this.drawGaugeLogarithmicScaleMinorTicks(n, i, v);
                else
                    for (var M = h; M.compare(m) === -1; M = M.add(r)) n[M.toString()] || v(M)
            }
        }
    }, {
        key: "updateToolTipAndValue",
        value: function(e, a, t) {
            var i = this.context;
            i._updateTooltipValue(e.toString()), i.logarithmicScale && (e = parseFloat(Math.pow(10, parseFloat(e)).toFixed(13))), e = e instanceof BigNumber ? e : new BigNumber(e), 0 !== e.compare(a) && t && (i._drawValue = e.toString(), i.value = i._drawValue, i.$.fireEvent("change", {
                value: i.value,
                oldValue: a
            }))
        }
    }, {
        key: "validateInterval",
        value: function(e) {
            var a = this.context,
                t = a._maxObject.subtract(a._minObject);
            a._validInterval = new BigNumber(e), a._validInterval = this.round(a._validInterval), 1 === a._validInterval.compare(t) && (a._validInterval = t), a.interval = a._validInterval.toString()
        }
    }, {
        key: "getCoercedValue",
        value: function(e, a) {
            var t = this.context;
            if (!t.coerce) return e;
            e = e instanceof BigNumber ? e : new BigNumber(e);
            var i = void 0,
                r = void 0;
            a !== !1 ? (i = new BigNumber(t._drawMin), r = new BigNumber(t._drawMax)) : (i = new BigNumber(t.min), r = new BigNumber(t.max));
            var n = e.subtract(i),
                l = n.mod(t._validInterval);
            if (0 === l.compare(0)) return e;
            var o = n.subtract(l),
                c = o.add(t._validInterval);
            if (n.subtract(o).abs().compare(n.subtract(c).abs()) < 0) return o.add(i);
            var s = c.add(i);
            return s.compare(r) <= 0 ? s : o.add(i)
        }
    }, {
        key: "updateValue",
        value: function(e) {
            var a = this.context,
                t = e instanceof BigNumber == !1 ? new BigNumber(e) : e,
                i = a.value;
            (this.compare(t, a._number) || a._scaleTypeChangedFlag) && (a.value = t.toString(), a._number = this.createDescriptor(t), a.$.fireEvent("change", {
                value: t.toString(),
                oldValue: i
            })), a._drawValue = a.logarithmicScale ? Math.log10(t) : t, a._moveThumbBasedOnValue(a._drawValue)
        }
    }, {
        key: "getValuePerPx",
        value: function(e, a) {
            return new BigNumber(e).divide(a)
        }
    }, {
        key: "restrictValue",
        value: function(e) {
            e[1].constructor === BigNumber ? e[1].compare(e[0]) === -1 && e[1].set(e[0]) : e[1] < e[0] && (e[1] = e[0])
        }
    }, {
        key: "getAngleByValue",
        value: function(e, t, i) {
            var r = this.context;
            if (r._wordLengthNumber < 64) return babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "getAngleByValue", this).call(this, parseFloat(e.toString()), t, i);
            e instanceof BigNumber == !1 && (e = new BigNumber(e)), t !== !1 && r.logarithmicScale && (e = new BigNumber(Math.log10(e.toString())));
            var n = e.subtract(r._drawMin).multiply(r._angleRangeCoefficient),
                l = void 0;
            return l = r.inverted ? n.add(r.startAngle) : n.multiply(-1).add(r.endAngle), l = parseFloat(l.toString()), i ? l : l * Math.PI / 180 + Math.PI / 2
        }
    }, {
        key: "getValueByAngle",
        value: function(e) {
            var t = this.context;
            if (t._wordLengthNumber < 64) return babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "getValueByAngle", this).call(this, e, !0);
            var i = void 0,
                r = void 0,
                n = void 0;
            for (t.inverted ? (i = e, r = t._normalizedStartAngle) : (i = t.endAngle, r = e); i < r;) i += 360;
            return n = new BigNumber((i - r) / t._angleDifference).multiply(t._range).add(t._drawMin), t.logarithmicScale && (n = new BigNumber(Math.pow(10, n.toString()))), t.coerce ? this.getCoercedValue(n, !1) : this.round(n)
        }
    }, {
        key: "updateGaugeValue",
        value: function(e) {
            e instanceof BigNumber == !1 && babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "updateGaugeValue", this).call(this, e);
            var t = this.context,
                i = t.value;
            t.value = e.toString(), t._drawValue = t.logarithmicScale ? Math.log10(t.value).toString() : t.value, t._number = e, t.$.digitalDisplay.value = t.value, t.$.fireEvent("change", {
                value: t.value,
                oldValue: i
            })
        }
    }, {
        key: "validateColorRange",
        value: function(e) {
            var t = this.context;
            if (t._wordLengthNumber < 64) return babelHelpers.get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "validateColorRange", this).call(this, e);
            e = new BigNumber(e);
            var i = new BigNumber(t.min),
                r = new BigNumber(t.max);
            return e.compare(i) === -1 && (e = i), 1 === e.compare(r) && (e = r), e
        }
    }, {
        key: "lockRotation",
        value: function(e, a) {
            var t = this.context;
            if (a instanceof BigNumber == !1 && (a = new BigNumber(a)), e && a.compare(t._number) === -1) {
                if (t._lockCW = !0, a.compare(t._maxObject) === -1) return new BigNumber(t._maxObject)
            } else if (!e && 1 === a.compare(t._number) && (t._lockCCW = !0, 1 === a.compare(t._minObject))) return new BigNumber(t._minObject)
        }
    }, {
        key: "getAngleRangeCoefficient",
        value: function() {
            var e = this.context;
            e._angleRangeCoefficient = new BigNumber(e._angleDifference).divide(e._range)
        }
    }]), a
}(JQX.Utilities.BaseNumericProcessor)), JQX.Utilities.Assign("DecimalNumericProcessor", function(e) {
    function a(e, t) {
        babelHelpers.classCallCheck(this, a);
        var i = babelHelpers.possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e, t));
        return i.context = e, i
    }
    return babelHelpers.inherits(a, e), babelHelpers.createClass(a, [{
        key: "getPreciseModulo",
        value: function(e, a, t) {
            var i = e >= 0 ? 1 : -1;
            if (e = Math.abs(e), a = Math.abs(a), void 0 === t) {
                var r = e.toExponential(),
                    n = a.toExponential(),
                    l = parseInt(r.slice(r.indexOf("e") + 1), 10),
                    o = parseInt(n.slice(n.indexOf("e") + 1), 10),
                    c = l < 0 ? Math.abs(l) : 0,
                    s = o < 0 ? Math.abs(o) : 0,
                    u = Math.max(c, s);
                if (this.roundCoefficient = u, e < a) return i * e;
                if (e === a) return 0;
                if ((e < -1 || e > 1) && (a < -1 || a > 1 || 1 === a)) return e % 1 == 0 && a % 1 == 0 ? i * (e % a) : i * parseFloat(new BigNumber(e).mod(a).toString());
                var m = Math.pow(10, u);
                return i * (e * m % (a * m) / m)
            }
            return i * (Math.round(e * t) % Math.round(a * t))
        }
    }, {
        key: "createDescriptor",
        value: function(e, a, t, i) {
            var r = parseFloat(e);
            return i && (r = this.context._validateRange(r)), r
        }
    }, {
        key: "validate",
        value: function(e, a, t) {
            return e < a ? a : e > t ? t : e
        }
    }, {
        key: "validateMinMax",
        value: function(e, a) {
            var t = this.context,
                i = void 0 !== t._regexSpecial && t._regexSpecial.inf.test(t.min),
                r = void 0 !== t._regexSpecial && t._regexSpecial.inf.test(t.max);
            e && ((null === t.min || i) && (t.min = -(1 / 0)), t.min = t.min.toString().replace(/\s/g, ""), t._numericProcessor.regexScientificNotation.test(t.min) && (t.min = t._numericProcessor.scientificToDecimal(t.min)), t._minObject = t._discardDecimalSeparator(t.min)), a && ((null === t.max || r) && (t.max = 1 / 0), t.max = t.max.toString().replace(/\s/g, ""), t._numericProcessor.regexScientificNotation.test(t.max) && (t.max = t._numericProcessor.scientificToDecimal(t.max)), t._maxObject = t._discardDecimalSeparator(t.max)), this.compare(t._minObject, t._maxObject) || (t._maxObject = parseFloat(t._maxObject) + 1, t.max = t._maxObject)
        }
    }, {
        key: "valueToPx",
        value: function(e) {
            var a = this.context,
                t = a._measurements.trackLength / a._range,
                i = void 0;
            return i = a._normalLayout ? t * (e - a._drawMin) : t * (a._drawMax - e), Math.round(i)
        }
    }, {
        key: "pxToValue",
        value: function(e) {
            var a = this.context,
                t = void 0;
            if (t = a._normalLayout ? (e - a._trackStart) * a._valuePerPx : (a._trackEnd - e) * a._valuePerPx, a.logarithmicScale) {
                var i = t + parseFloat(a._drawMin);
                return a._drawValue = i, Math.pow(10, i)
            }
            return a._drawValue = t + parseFloat(a.min), t + parseFloat(a.min)
        }
    }, {
        key: "compare",
        value: function(e, a) {
            return e !== a
        }
    }, {
        key: "incrementDecrement",
        value: function(e, a, t) {
            var i = this.context,
                r = void 0;
            if ("add" === a) {
                if (r = parseFloat(e) + parseFloat(t), void 0 !== i._drawMax) return r > parseFloat(i._drawMax) ? i._drawMax : r
            } else if (r = parseFloat(e) - parseFloat(t), void 0 !== i._drawMin) return r < parseFloat(i._drawMin) ? i._drawMin : r;
            return r
        }
    }, {
        key: "render",
        value: function(e) {
            var a = this.context;
            if (void 0 !== a._regexSpecial && a._regexSpecial.nonNumericValue.test(e)) return e;
            var t = new JQX.Utilities.NumberRenderer(e);
            return a.scientificNotation ? t.toScientific() : t.toDigits(a.significantDigits, a.precisionDigits)
        }
    }, {
        key: "addTicksAndLabels",
        value: function() {
            var e = this.context,
                a = e._measurements.trackLength,
                t = e._normalLayout,
                i = e._majorTicksInterval,
                r = Math.round(e._range / parseFloat(i.toString())),
                n = a / r,
                l = parseFloat(e._drawMin),
                o = parseFloat(e._drawMax),
                c = void 0,
                s = void 0,
                u = void 0,
                m = void 0,
                d = void 0,
                v = void 0,
                g = void 0,
                _ = void 0,
                b = void 0,
                f = "",
                p = "";
            e._tickValues = [], this._longestLabelSize = 0, t ? (c = l, s = e.logarithmicScale && l < 0 && l !== -1 ? parseFloat(c - this.getPreciseModulo(c, i)) : parseFloat(c - this.getPreciseModulo(c, i) + parseFloat(i)), u = s - c, d = e._formatLabel(l), v = e._tickIntervalHandler.labelsSize.minLabelSize, m = o, g = e._formatLabel(o), _ = e._tickIntervalHandler.labelsSize.maxLabelSize) : (c = o, s = parseFloat(c - this.getPreciseModulo(c, i)), u = c - s, d = e._formatLabel(o), v = e._tickIntervalHandler.labelsSize.maxLabelSize, m = l, g = e._formatLabel(l), _ = e._tickIntervalHandler.labelsSize.minLabelSize), e._labelDummy = this._createMeasureLabel(), b = this._addMajorTickAndLabel(d, v, !0, c), f += b.tick, p += b.label;
            var h = u / i * n;
            if (s.toString() !== e._drawMax.toString() && h < a) {
                var x = e._formatLabel(s.toString()),
                    w = v < h;
                b = this._addMajorTickAndLabel(x, void 0, w, s, !0), f += b.tick, p += b.label
            }
            b = this.addMiddleMajorTicks(r, n, h, u, t, i), f += b.tick, p += b.label, b = this._addMajorTickAndLabel(g, _, !0, m), f += b.tick, p += b.label, f += this.addMinorTicks(t), e._measureLabelScale.removeChild(e._labelDummy), delete e._labelDummy, delete e._measureLabelScale, "jqx-tank" === e.nodeName.toLowerCase() && e._updateScaleWidth(this._longestLabelSize), e._appendTicksAndLabelsToScales(f, p)
        }
    }, {
        key: "addMiddleMajorTicks",
        value: function(e, a, t, i, r, n) {
            for (var l = this.context, o = "", c = "", s = 1; s < e; s++) {
                var u = s * a + t,
                    m = void 0;
                if (m = r ? parseFloat(l._drawMin) + n * s + i : parseFloat(l._drawMax) - n * s - i, m.toString() !== l._drawMax.toString()) {
                    var d = l._formatLabel(m.toString()),
                        v = !0;
                    l._labelDummy.innerHTML = d;
                    u + l._labelDummy[l._settings.size] >= e * a && (v = !1);
                    var g = this._addMajorTickAndLabel(d, void 0, v, m, !0);
                    o += g.tick, c += g.label
                }
            }
            return {
                tick: o,
                label: c
            }
        }
    }, {
        key: "addMinorTicks",
        value: function(e) {
            function a(e) {
                return parseFloat(e.toFixed(o))
            }

            function t(e) {
                r.indexOf(e) === -1 && 0 === i._numericProcessor.getPreciseModulo(e, l, c) && (v += '<div style="' + s + ": " + i._numericProcessor.valueToPx(e) + 'px;" class="jqx-tick jqx-tick-minor"></div>')
            }
            var i = this.context,
                r = i._tickValues,
                n = i._tickIntervalHandler.nearestPowerOfTen,
                l = i._minorTicksInterval,
                o = Math.log10(n) < 0 ? Math.round(Math.abs(Math.log10(n))) : 0,
                c = Math.pow(10, o),
                s = i._settings.leftOrTop,
                u = void 0,
                m = void 0,
                d = void 0,
                v = "";
            if (e ? (u = r[0], m = r[1], d = r[r.length - 1]) : (u = r[r.length - 1], m = r[r.length - 2], d = r[0]), i.logarithmicScale) ! function() {
                var e = i._measurements.trackLength,
                    a = e / r.length,
                    t = .1;
                a < 20 ? t = 1 : a >= 20 && a < 40 ? t = m - u > 1 ? 1 : .5 : a >= 40 && a < 80 && (t = .2);
                for (var n = Math.floor(i._drawMax), l = i._drawMax - n, o = i._drawMax - i._drawMin > r.length, c = i._drawMax; c > i._drawMin - 1; c -= 1)
                    for (var d = l > 0 ? Math.pow(10, c - l + 1) : Math.pow(10, c), g = d * t, _ = d; _ > 0; _ -= g)
                        if (_ < i.max && _ > i.min) {
                            var b = new BigNumber(Math.log10(_));
                            (b % 1 == 0 && o || !o) && (v += '<div style="' + s + ": " + i._numericProcessor.valueToPx(b) + 'px;" class="jqx-tick jqx-tick-minor"></div>')
                        }
            }();
            else {
                for (var g = m; g > u; g = a(g - n)) t(g);
                for (var _ = a(m + n); _ < d; _ = a(_ + n)) t(_)
            }
            return v
        }
    }, {
        key: "addGaugeTicksAndLabels",
        value: function() {
            var e = this.context;
            if ("none" !== e.ticksVisibility || "none" !== e.labelsVisibility) {
                var a = this,
                    t = Math.max(e._tickIntervalHandler.labelsSize.minLabelSize, e._tickIntervalHandler.labelsSize.maxLabelSize),
                    i = e._majorTicksInterval,
                    r = e._minorTicksInterval,
                    n = {},
                    l = e._distance,
                    o = e._measurements.radius,
                    c = o - l.majorTickDistance,
                    s = o - l.minorTickDistance,
                    u = void 0,
                    m = void 0,
                    d = void 0,
                    v = void 0,
                    g = void 0,
                    _ = void 0;
                "none" !== e.ticksVisibility && e._plotTicks !== !1 ? (u = function(a) {
                    e._drawTick(a, c, "major")
                }, m = function(t) {
                    e._drawTick(a.getAngleByValue(t, !0), s, "minor")
                }) : (u = function() {}, m = function() {}), d = "none" !== e.labelsVisibility && e._plotLabels !== !1 ? function(a, t, i) {
                    e._drawLabel(a, t, l.labelDistance, i)
                } : function() {}, e.inverted ? (g = e.startAngle, _ = e.endAngle) : (g = e.endAngle, _ = e.startAngle), v = a.getAngleByValue(e._drawMin, !1), u(v), n[e._drawMin] = !0, d(v, e.min, !1);
                var b = e._drawMin - a.getPreciseModulo(e._drawMin, i),
                    f = void 0;
                e._drawMin >= 0 && (b += i);
                for (var p = b; p >= e._drawMin; p -= r) f = p;
                v = a.getAngleByValue(b, !1), u(v), n[b] = !0, 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(g, a.getAngleByValue(b, !1, !0)) / 360) > t && d(v, this.getActualValue(b), b < e._drawMax);
                var h = void 0;
                for (h = b + i; h < e._drawMax - i; h += i) v = a.getAngleByValue(h, !1), u(v), n[h] = !0, d(v, this.getActualValue(h), !0);
                if (void 0 === n[h] && h <= e._drawMax && (v = a.getAngleByValue(h, !1), u(v), n[h] = !0, 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(_, a.getAngleByValue(h, !1, !0)) / 360) >= t && d(v, this.getActualValue(h), !0), e._normalizedStartAngle !== e.endAngle && (v = a.getAngleByValue(e._drawMax, !1), u(v), n[e._drawMax] = !0, 2 * Math.PI * e._measurements.innerRadius * (e._getAngleDifference(_, g) / 360) >= t && d(v, e.max, !1))), e.logarithmicScale) this.drawGaugeLogarithmicScaleMinorTicks(n, i, m);
                else
                    for (var x = f; x < e._drawMax; x += r) n[x] || m(x)
            }
        }
    }, {
        key: "updateToolTipAndValue",
        value: function(e, a, t) {
            var i = this.context;
            i._updateTooltipValue(e), i.logarithmicScale && (e = parseFloat(Math.pow(10, parseFloat(e)).toFixed(13))), e !== a && t && (i._drawValue = e.toString(), i.value = i._discardDecimalSeparator(i._drawValue), i.$.fireEvent("change", {
                value: i.value,
                oldValue: a
            }))
        }
    }, {
        key: "validateInterval",
        value: function(e) {
            var a = this.context,
                t = a._maxObject - a._minObject;
            a._validInterval = Math.min(parseFloat(e), t), a.interval = a._validInterval
        }
    }, {
        key: "getCoercedValue",
        value: function(e, a) {
            var t = this.context;
            if (!t.coerce) return e;
            var i = void 0,
                r = void 0;
            a !== !1 ? (i = parseFloat(t._drawMin), r = parseFloat(t._drawMax)) : (i = parseFloat(t.min), r = parseFloat(t.max));
            var n = e - i,
                l = t._numericProcessor.getPreciseModulo(n, parseFloat(t.interval)),
                o = this.roundCoefficient;
            if (0 === l) return e;
            0 === this.roundCoefficient && (o = 12);
            var c = parseFloat((n - l).toFixed(o)),
                s = c + parseFloat(t.interval);
            if (t.max - t.min <= parseFloat(t.interval) && !t.logarithmicScale) {
                var u = i,
                    m = r;
                return e >= u + (m - u) / 2 ? m : u
            }
            if (Math.abs(n - c) < Math.abs(n - s)) return c + i;
            var d = s + i;
            return d > r ? c + i : d
        }
    }, {
        key: "updateValue",
        value: function(e) {
            var a = this.context,
                t = e.toString(),
                i = a.value;
            (parseFloat(t) !== i || a._scaleTypeChangedFlag) && (a.value = t, a._number = this.createDescriptor(t), a.$.fireEvent("change", {
                value: t,
                oldValue: i
            })), a._drawValue = a.logarithmicScale ? Math.log10(t).toString() : t, a._moveThumbBasedOnValue(a._drawValue)
        }
    }, {
        key: "getValuePerPx",
        value: function(e, a) {
            return parseFloat(e) / a
        }
    }, {
        key: "restrictValue",
        value: function(e) {
            e[1] < e[0] && (e[1] = e[0])
        }
    }, {
        key: "lockRotation",
        value: function(e, a) {
            var t = this.context;
            if (e && a < t._number) {
                if (t._lockCW = !0, a < t._maxObject) return t._maxObject
            } else if (!e && a > t._number && (t._lockCCW = !0, a > t._minObject)) return t._minObject
        }
    }, {
        key: "getAngleRangeCoefficient",
        value: function() {
            var e = this.context;
            e._angleRangeCoefficient = e._angleDifference / e._range
        }
    }]), a
}(JQX.Utilities.BaseNumericProcessor)), JQX.Utilities.Assign("ComplexNumericProcessor", function(e) {
    function a(e, t) {
        babelHelpers.classCallCheck(this, a);
        var i = babelHelpers.possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e, t));
        return i.context = e, i
    }
    return babelHelpers.inherits(a, e), babelHelpers.createClass(a, [{
        key: "createDescriptor",
        value: function(e, a, t, i, r, n) {
            var l = void 0;
            if (n) l = n;
            else {
                var o = [];
                e.constructor === NIComplex ? (o[0] = e.realPart, o[1] = e.imaginaryPart) : o[0] = e, l = new(Function.prototype.bind.apply(NIComplex, [null].concat(o)))
            }
            return i && (l = this.context._validateRange(l)), l
        }
    }, {
        key: "validate",
        value: function(e, a, t) {
            var i = e;
            return a !== -(1 / 0) ? this.compareComplexNumbers(e, a) === -1 && (i = new NIComplex(a.realPart, a.imaginaryPart)) : t !== 1 / 0 && 1 === this.compareComplexNumbers(e, t) && (i = new NIComplex(t.realPart, t.imaginaryPart)), i
        }
    }, {
        key: "compare",
        value: function(e, a) {
            return 0 !== this.compareComplexNumbers(e, a)
        }
    }, {
        key: "validateMinMax",
        value: function(e, a) {
            var t = this.context;
            e && (null === t.min || t._regexSpecial.inf.test(t.min) ? (t.min = -(1 / 0), t._minObject = -(1 / 0)) : t._minObject = new NIComplex(t.min)), a && (null === t.max || t._regexSpecial.inf.test(t.max) ? (t.max = 1 / 0, t._maxObject = 1 / 0) : t._maxObject = new NIComplex(t.max))
        }
    }, {
        key: "incrementDecrement",
        value: function(e, a) {
            var t = new NIComplex(e.realPart, e.imaginaryPart),
                i = this.context._spinButtonsStepObject;
            return "add" === a ? (t.realPart += i.realPart, t.imaginaryPart += i.imaginaryPart) : (t.realPart -= i.realPart, t.imaginaryPart -= i.imaginaryPart), t
        }
    }, {
        key: "render",
        value: function(e) {
            var a = e;
            if (this.context._regexSpecial.nonNumericValue.test(e) === !1) {
                var t = a.realPart,
                    i = a.imaginaryPart,
                    r = void 0,
                    n = this.context.significantDigits,
                    l = this.context.precisionDigits;
                i >= 0 ? r = "+" : (r = "-", i = Math.abs(i));
                var o = new JQX.Utilities.NumberRenderer(t),
                    c = new JQX.Utilities.NumberRenderer(i);
                this.context.scientificNotation ? (t = o.toScientific(), i = c.toScientific()) : (t = o.toDigits(n, l), i = c.toDigits(n, l)), a = t + " " + r + " " + i + "i"
            }
            return a
        }
    }, {
        key: "compareComplexNumbers",
        value: function(e, a) {
            if (e.constructor !== NIComplex || a.constructor !== NIComplex) return -1;
            var t = e.realPart,
                i = a.realPart;
            if (t < i) return -1;
            if (t > i) return 1;
            var r = e.imaginaryPart,
                n = a.imaginaryPart;
            return r < n ? -1 : r > n ? 1 : 0
        }
    }]), a
}(JQX.Utilities.BaseNumericProcessor));
//# sourceMappingURL=jqxnumericprocessor.js.map