"use strict";
JQX.Utilities.Assign("TickIntervalHandler", function() {
    function e(i, a, t, l, n, r, s) {
        babelHelpers.classCallCheck(this, e);
        var o = this;
        o.context = i, o.minLabel = a, o.maxLabel = t, o.labelClass = l, o.dimension = n, o.logarithmic = s, o.labelsSize = o.getMinAndMaxLabelSize(), r ? (o.getNiceInterval = o.getNiceIntervalInteger, o.getPossibleBiggerLabel = o.getPossibleBiggerLabelInteger) : (o.getNiceInterval = o.getNiceIntervalFloatingPoint, o.getPossibleBiggerLabel = o.getPossibleBiggerLabelFloatingPoint)
    }
    return babelHelpers.createClass(e, [{
        key: "getInterval",
        value: function(e, i, a, t) {
            var l = this.context,
                n = l._measurements.innerRadius,
                r = void 0,
                s = 1;
            "radial" === e ? (r = Math.max(this.labelsSize.minLabelSize, this.labelsSize.minLabelOtherSize, this.labelsSize.maxLabelSize, this.labelsSize.maxLabelOtherSize), s = 1.35) : (r = Math.max(this.labelsSize.minLabelSize, this.labelsSize.maxLabelSize), s = 1.45), r *= s;
            var o = void 0;
            o = "radial" === e ? function() {
                var e = 2 * Math.PI * n * (Math.abs(l.startAngle - l.endAngle) / 360);
                return Math.round(e)
            }() : l[this.dimension] - this.labelsSize.minLabelSize / 2 - this.labelsSize.maxLabelSize / 2;
            var b = Math.ceil(o / r),
                g = "radial" === e ? 4 * b : 3 * b,
                h = this.getNiceInterval(i, a, b, !0),
                m = this.getNiceInterval(i, a, g);
            if (l._cachedLabelsSize = this.labelsSize, b > 2) {
                var c = this.getPossibleBiggerLabel(b, h);
                if (c.length > Math.max(this.minLabel.length, this.maxLabel.length)) {
                    var u = this.minLabel;
                    this.minLabel = c, this.labelsSize = this.getMinAndMaxLabelSize(), l._cachedLabelsSize = this.labelsSize;
                    var v = this.getInterval(e, i, a, t);
                    return this.minLabel = u, this.labelsSize = this.getMinAndMaxLabelSize(), v
                }
            }
            return {
                major: h,
                minor: m
            }
        }
    }, {
        key: "getNiceIntervalFloatingPoint",
        value: function(e, i, a, t) {
            var l = i - e,
                n = Math.floor(Math.log10(l) - Math.log10(a)),
                r = Math.pow(10, n),
                s = a * r,
                o = void 0;
            o = l < 2 * s ? 1 : l < 3 * s ? 2 : l < 7 * s ? 5 : 10;
            var b = o * r;
            if (t && this.context._range / b > a) {
                switch (o) {
                    case 5:
                        o = 10;
                        break;
                    case 2:
                        o = 5;
                        break;
                    case 1:
                        o = 2
                }
                b = o * r
            }
            return this.nearestPowerOfTen = r, this.logarithmic && t ? Math.max(1, b) : b
        }
    }, {
        key: "getPossibleBiggerLabelFloatingPoint",
        value: function(e, i) {
            var a = this.context,
                t = parseFloat(a.min - a._numericProcessor.getPreciseModulo(parseFloat(a.min), i) + parseFloat(i)),
                l = t,
                n = void 0,
                r = void 0;
            this.logarithmic && (t = Math.pow(10, t)), n = a._formatLabel(t);
            for (var s = 1; s < e; s++) l += i, r = this.logarithmic ? Math.pow(10, l) : l, r = a._formatLabel(r), r.length > n.length && (n = r);
            return n
        }
    }, {
        key: "getNiceIntervalInteger",
        value: function(e, i, a, t) {
            var l = new BigNumber(i).subtract(new BigNumber(e)),
                n = Math.floor(Math.log10(l.toString()) - Math.log10(a)),
                r = new BigNumber(10).pow(new BigNumber(n)),
                s = new BigNumber(a).multiply(r),
                o = void 0;
            o = l.compare(new BigNumber(2 * s)) === -1 ? 1 : l.compare(new BigNumber(3 * s)) === -1 ? 2 : l.compare(new BigNumber(7 * s)) === -1 ? 5 : 10;
            var b = new BigNumber(o).multiply(r);
            if (t && 1 === new BigNumber(this.context._range).divide(b).compare(a)) {
                switch (o) {
                    case 5:
                        o = 10;
                        break;
                    case 2:
                        o = 5;
                        break;
                    case 1:
                        o = 2
                }
                b = new BigNumber(o).multiply(r)
            }
            return b.compare(1) === -1 && (b = new BigNumber(1)), this.nearestPowerOfTen = r, b
        }
    }, {
        key: "getPossibleBiggerLabelInteger",
        value: function(e, i) {
            var a = this.context,
                t = new BigNumber(10),
                l = new BigNumber(a.min).subtract(new BigNumber(a.min).mod(i)).add(i),
                n = l,
                r = void 0,
                s = void 0;
            this.logarithmic && (l = t.pow(l)), r = a._formatLabel(l);
            for (var o = 1; o < e; o++) n = n.add(i), s = this.logarithmic ? t.pow(n) : n, s = a._formatLabel(s), s.length > r.length && (r = s);
            return r
        }
    }, {
        key: "getMinAndMaxLabelSize",
        value: function() {
            var e = this,
                i = e.context,
                a = i.$.container,
                t = document.createElement("span");
            t.className = e.labelClass, t.style.position = "absolute", t.style.visibility = "hidden", a.appendChild(t), t.innerHTML = e.minLabel;
            var l = t[e.dimension],
                n = t[i._settings.otherSize];
            t.innerHTML = e.maxLabel;
            var r = t[e.dimension],
                s = t[i._settings.otherSize];
            return a.removeChild(t), {
                minLabelSize: l,
                minLabelOtherSize: n,
                maxLabelSize: r,
                maxLabelOtherSize: s
            }
        }
    }]), e
}());
//# sourceMappingURL=jqxtickintervalhandler.js.map