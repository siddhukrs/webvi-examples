"use strict";
! function(e) {
    e.BigNumber = function(e, r, t) {
        var i, n = this;
        if (e instanceof BigNumber) {
            for (i in {
                    precision: 0,
                    roundType: 0,
                    _s: 0,
                    _f: 0
                }) n[i] = e[i];
            return n._d = e._d.slice(), void(e._s && 1 === e._d.length && 0 === e._d[0] && (n._s = !1))
        }
        if (void 0 !== e && ("-0" === e && (e = "0"), new RegExp(/e/i).test(e))) {
            var s = e.toString().toLowerCase(),
                _ = s.indexOf("e"),
                o = new BigNumber(s.slice(0, _)),
                u = s.slice(_ + 2),
                h = s.slice(_ + 1, _ + 2),
                a = new BigNumber(10),
                f = a.pow(h + u);
            e = o.multiply(f).toString()
        }
        for (n.precision = isNaN(r = Math.abs(r)) ? BigNumber.defaultPrecision : r, n.roundType = isNaN(t = Math.abs(t)) ? BigNumber.defaultRoundType : t, n._s = "-" == (e += "").charAt(0), n._f = ((e = e.replace(/[^\d.]/g, "").split(".", 2))[0] = e[0].replace(/^0+/, "") || "0").length, i = (e = n._d = (e.join("") || "0").split("")).length; i; e[--i] = +e[i]);
        n.round()
    };
    var r = BigNumber,
        t = BigNumber.prototype;
    r.ROUND_HALF_EVEN = 1 + (r.ROUND_HALF_DOWN = 1 + (r.ROUND_HALF_UP = 1 + (r.ROUND_FLOOR = 1 + (r.ROUND_CEIL = 1 + (r.ROUND_DOWN = 1 + (r.ROUND_UP = 0)))))), r.defaultPrecision = 40, r.defaultRoundType = r.ROUND_HALF_UP, t.add = function(e) {
        if (this.isZero() && this._s && (this._s = !1), 0 === e || e.constructor === BigNumber && 1 === e._d.length && 0 === e._d[0]) return new BigNumber(this);
        if (this._s != (e = new BigNumber(e))._s) return e._s ^= 1, this.subtract(e);
        var r, t, i = new BigNumber(this),
            n = i._d,
            s = e._d,
            _ = i._f,
            o = e._f;
        for (e = Math.max(_, o), _ != o && ((o = _ - o) > 0 ? i._zeroes(s, o, 1) : i._zeroes(n, -o, 1)), r = (_ = n.length) == (o = s.length) ? n.length : ((o = _ - o) > 0 ? i._zeroes(s, o) : i._zeroes(n, -o)).length, t = 0; r; t = (n[--r] = n[r] + s[r] + t) / 10 >>> 0, n[r] %= 10);
        return t && ++e && n.unshift(t), i._f = e, i.round()
    }, t.subtract = function(e) {
        if (this.isZero() && this._s && (this._s = !1), 0 === e || e.constructor === BigNumber && 1 === e._d.length && 0 === e._d[0]) return new BigNumber(this);
        if (this._s != (e = new BigNumber(e))._s) return e._s ^= 1, this.add(e);
        var r, t, i = new BigNumber(this),
            n = i.abs().compare(e.abs()) + 1,
            s = n ? i : e,
            _ = n ? e : i,
            o = s._f,
            u = _._f,
            h = o;
        for (s = s._d, _ = _._d, o != u && ((u = o - u) > 0 ? i._zeroes(_, u, 1) : i._zeroes(s, -u, 1)), r = (o = s.length) == (u = _.length) ? s.length : ((u = o - u) > 0 ? i._zeroes(_, u) : i._zeroes(s, -u)).length; r;) {
            if (s[--r] < _[r]) {
                for (t = r; t && !s[--t]; s[t] = 9);
                --s[t], s[r] += 10
            }
            _[r] = s[r] - _[r]
        }
        return n || (i._s ^= 1), i._f = h, i._d = _, i.round()
    }, t.multiply = function(e) {
        var r, t, i, n = new BigNumber(this),
            s = n._d.length >= (e = new BigNumber(e))._d.length,
            _ = (s ? n : e)._d,
            o = (s ? e : n)._d,
            u = _.length,
            h = o.length,
            a = new BigNumber;
        for (r = h; r; s && i.unshift(s), a.set(a.add(new BigNumber(i.join("")))))
            for (i = new Array(h - --r).join("0").split(""), s = 0, t = u; t; s += _[--t] * o[r], i.unshift(s % 10), s = s / 10 >>> 0);
        return n._s = n._s != e._s, n._f = ((s = u + h - n._f - e._f) >= (t = (n._d = a._d).length) ? this._zeroes(n._d, s - t + 1, 1).length : t) - s, n.round()
    }, t.divide = function(e) {
        if ("0" == (e = new BigNumber(e))) throw new Error("Division by 0");
        if ("0" == this) return new BigNumber;
        var r, t, i, n = new BigNumber(this),
            s = n._d,
            _ = e._d,
            o = s.length - n._f,
            u = _.length - e._f,
            h = new BigNumber,
            a = 0,
            f = 1,
            g = 0,
            d = 0;
        for (h._s = n._s != e._s, h.precision = Math.max(n.precision, e.precision), h._f = +h._d.pop(), o != u && n._zeroes(o > u ? _ : s, Math.abs(o - u)), e._f = _.length, _ = e, _._s = !1, _ = _.round(), e = new BigNumber;
            "0" == s[0]; s.shift());
        e: do {
            for (i = g = 0, "0" == e && (e._d = [], e._f = 0); a < s.length && e.compare(_) == -1; ++a) {
                if (i = a + 1 == s.length, (!f && ++g > 1 || (d = i && "0" == e && "0" == s[a])) && (h._f == h._d.length && ++h._f, h._d.push(0)), "0" == s[a] && "0" == e || (e._d.push(s[a]), ++e._f), d) break e;
                if (i && e.compare(_) == -1 && (h._f == h._d.length && ++h._f, 1) || (i = 0))
                    for (; h._d.push(0), e._d.push(0), ++e._f, e.compare(_) == -1;);
            }
            if (f = 0, e.compare(_) == -1 && !(i = 0))
                for (; i ? h._d.push(0) : i = 1, e._d.push(0), ++e._f, e.compare(_) == -1;);
            var c;
            for (t = new BigNumber, r = 0; e.compare(c = t.add(_)) + 1 && ++r; t.set(c));
            e.set(e.subtract(t)), !i && h._f == h._d.length && ++h._f, h._d.push(r)
        } while ((a < s.length || "0" != e) && h._d.length - h._f <= h.precision);
        return h.round()
    }, t.mod = function(e) {
        var r = this.subtract(this.divide(e).intPart().multiply(e));
        return r.isZero() && r._s && (r._s = !r._s), r
    }, t.pow = function(e) {
        var r, t = new BigNumber(this);
        if (0 == (e = new BigNumber(e).intPart())) return t.set(1);
        for (r = Math.abs(e); --r; t.set(t.multiply(this)));
        return e < 0 ? t.set(new BigNumber(1).divide(t)) : t
    }, t.set = function(e) {
        return this.constructor(e), this
    }, t.compare = function(e) {
        var r, t, i, n = this,
            s = this._f,
            _ = new BigNumber(e),
            o = _._f,
            u = [-1, 1];
        if (n.isZero() && _.isZero()) return 0;
        if (n._s != _._s) return n._s ? -1 : 1;
        if (s != o) return u[s > o ^ n._s];
        for (s = (i = n._d).length, o = (_ = _._d).length, r = -1, t = Math.min(s, o); ++r < t;)
            if (i[r] != _[r]) return u[i[r] > _[r] ^ n._s];
        return s != o ? u[s > o ^ n._s] : 0
    }, t.negate = function() {
        var e = new BigNumber(this);
        return e._s ^= 1, e
    }, t.abs = function() {
        var e = new BigNumber(this);
        return e._s = 0, e
    }, t.intPart = function() {
        return new BigNumber((this._s ? "-" : "") + (this._d.slice(0, this._f).join("") || "0"))
    }, t.valueOf = t.toString = function(e, r) {
        function t(e) {
            var r, t, i = new BigNumber(2),
                s = [];
            t = void 0 === e ? n : e;
            do {
                r = t.mod(i), s.push(r.toString()), t = t.subtract(r).divide(i).intPart()
            } while (1 === t.compare(new BigNumber(0)));
            return s.reverse().join("")
        }
        var i, n = this,
            s = (n._s ? "-" : "") + (n._d.slice(0, n._f).join("") || "0") + (n._f != n._d.length ? "." + n._d.slice(n._f).join("") : "");
        if (void 0 === e && (e = 10), 10 === e) return s;
        if (this.compare(0) > -1) switch (e) {
            case 2:
                i = t();
                break;
            case 8:
                i = function(e) {
                    for (var r = ""; e.length % 3 != 0;) e = "0" + e;
                    for (var t = e.length / 3; t >= 1; t--) {
                        var i = e[3 * t - 3] + "" + e[3 * t - 2] + e[3 * t - 1];
                        r = parseInt(i, 2).toString(8) + "" + r
                    }
                    return r
                }(t());
                break;
            case 16:
                i = function(e) {
                    for (var r = ""; e.length % 4 != 0;) e = "0" + e;
                    for (var t = e.length / 4; t >= 1; t--) {
                        var i = e[4 * t - 4] + "" + e[4 * t - 3] + e[4 * t - 2] + e[4 * t - 1];
                        r = parseInt(i, 2).toString(16) + "" + r
                    }
                    return r
                }(t()).toUpperCase()
        } else {
            var _ = n.negate(),
                o = t(_);
            i = function(e, r, t) {
                var i = "";
                if (String.prototype.repeat) {
                    e = "0".repeat(t - e.length) + e
                }
                for (; e.length < t;) e = "0" + e;
                i = e.replace(/0/g, "a"), i = i.replace(/1/g, "b"), i = i.replace(/a/g, "1"), i = i.replace(/b/g, "0");
                for (var n = !0, s = "", _ = i.length - 1; _ >= 0; _--) {
                    var o, u = i.charAt(_);
                    "0" === u ? n === !0 ? (o = "1", n = !1) : o = "0" : o = n === !0 ? "0" : "1", s = o + "" + s
                }
                switch (r) {
                    case 2:
                        return s;
                    case 8:
                        var h, a;
                        switch (t) {
                            case 8:
                                h = 3, a = "0";
                                break;
                            case 16:
                                h = 6, a = "00";
                                break;
                            case 32:
                                h = 11, a = "0";
                                break;
                            case 64:
                                h = 22, a = "00"
                        }
                        s = a + s;
                        for (var f = "", g = h; g >= 1; g--) {
                            var d = s[3 * g - 3] + "" + s[3 * g - 2] + s[3 * g - 1];
                            f = parseInt(d, 2).toString(8) + "" + f
                        }
                        return f;
                    case 16:
                        var c;
                        switch (t) {
                            case 8:
                                c = 2;
                                break;
                            case 16:
                                c = 4;
                                break;
                            case 32:
                                c = 8;
                                break;
                            case 64:
                                c = 16
                        }
                        for (var l = "", p = c; p >= 1; p--) {
                            var b = s[4 * p - 4] + "" + s[4 * p - 3] + s[4 * p - 2] + s[4 * p - 1];
                            l = parseInt(b, 2).toString(16) + "" + l
                        }
                        return l.toUpperCase()
                }
            }(o, e, r)
        }
        return i
    }, t._zeroes = function(e, r, t) {
        var i = ["push", "unshift"][t || 0];
        for (++r; --r; e[i](0));
        return e
    }, t.round = function() {
        if ("_rounding" in this) return this;
        var e, r, t, i, n = BigNumber,
            s = this.roundType,
            _ = this._d;
        for (this._rounding = !0; this._f > 1 && !_[0]; --this._f, _.shift());
        for (e = this._f, r = this.precision + e, t = _[r]; _.length > e && !_[_.length - 1]; _.pop());
        return i = (this._s ? "-" : "") + (r - e ? "0." + this._zeroes([], r - e - 1).join("") : "") + 1, _.length > r && (t && s != n.DOWN && (s == n.UP || (s == n.CEIL ? !this._s : s == n.FLOOR ? this._s : s == n.HALF_UP ? t >= 5 : s == n.HALF_DOWN ? t > 5 : s == n.HALF_EVEN && (t >= 5 && 1 & _[r - 1]))) && this.add(i), _.splice(r, _.length - r)), delete this._rounding, this
    }, t.isZero = function() {
        return 1 === this._d.length && 0 === this._d[0]
    }
}(window);
//# sourceMappingURL=jqxmath.js.map