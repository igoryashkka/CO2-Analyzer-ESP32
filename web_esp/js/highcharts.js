 (function() {
        function Jb(a) {
            return a && a.constructor == Array
        }

        function hb(a, b, c) {
            var d, e = "",
                f = c ? "print" : "",
                g = function(h) {
                    return W("style", {
                        type: "text/css",
                        media: h ? "print" : ""
                    }, null, ka.getElementsByTagName("HEAD")[0])
                };
            zb || (zb = g());
            for (d in b) e += kb(d) + ":" + b[d] + ";";
            if (xa) {
                b = ka.styleSheets;
                c && g(true);
                for (c = b.length - 1; c >= 0 && b[c].media != f;) c--;
                f = b[c];
                f.addRule(a, e)
            } else zb.appendChild(ka.createTextNode(a + " {" + e + "}\n"))
        }

        function I(a, b) {
            a || (a = {});
            for (var c in b) a[c] = b[c];
            return a
        }

        function Yb(a) {
            return La = Q(La,
                a)
        }

        function Wa(a, b) {
            var c = function() {};
            c.prototype = new a;
            I(c.prototype, b);
            return c
        }

        function Ab(a) {
            for (var b = [], c = a.length - 1; c >= 0; c--) b.push(a[c]);
            return b
        }

        function Kb(a, b) {
            if (typeof a == "string") return a;
            else if (a.linearGradient) {
                var c = b.createLinearGradient.apply(b, a.linearGradient);
                s(a.stops, function(d) {
                    c.addColorStop(d[0], d[1])
                });
                return c
            }
        }

        function W(a, b, c, d, e) {
            a = ka.createElement(a);
            b && I(a, b);
            e && ua(a, {
                padding: 0,
                border: "none",
                margin: 0
            });
            c && ua(a, c);
            d && d.appendChild(a);
            return a
        }

        function ua(a, b) {
            if (xa)
                if (b.opacity !==
                    ga) b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
            I(a.style, b)
        }

        function Zb(a, b, c, d) {
            a = a;
            var e = isNaN(b = Ba(b)) ? 2 : b;
            b = c === ga ? "." : c;
            d = d === ga ? "," : d;
            c = a < 0 ? "-" : "";
            var f = parseInt(a = Ba(+a || 0).toFixed(e)) + "",
                g = (g = f.length) > 3 ? g % 3 : 0;
            return c + (g ? f.substr(0, g) + d : "") + f.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (e ? b + Ba(a - f).toFixed(e).slice(2) : "")
        }

        function Lb(a, b, c) {
            function d(y) {
                return y.toString().replace(/^([0-9])$/, "0$1")
            }
            b = new Date(b * ya);
            var e = b.getUTCHours(),
                f = b.getUTCDay(),
                g = b.getUTCDate(),
                h = b.getUTCMonth(),
                i = b.getUTCFullYear(),
                k = La.lang,
                q = k.weekdays;
            k = k.months;
            b = {
                a: q[f].substr(0, 3),
                A: q[f],
                d: d(g),
                e: g,
                b: k[h].substr(0, 3),
                B: k[h],
                m: d(h + 1),
                y: i.toString().substr(2, 2),
                Y: i,
                H: d(e),
                I: d(e % 12 || 12),
                l: e % 12 || 12,
                M: d(b.getUTCMinutes()),
                p: e < 12 ? "AM" : "PM",
                P: e < 12 ? "am" : "pm",
                S: d(b.getUTCSeconds())
            };
            for (var m in b) a = a.replace("%" + m, b[m]);
            return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
        }

        function Mb(a) {
            for (var b = {
                    x: a.offsetLeft,
                    y: a.offsetTop
                }; a.offsetParent;) {
                a = a.offsetParent;
                b.x += a.offsetLeft;
                b.y += a.offsetTop;
                if (a != ka.body &&
                    a != ka.documentElement) {
                    b.x -= a.scrollLeft;
                    b.y -= a.scrollTop
                }
            }
            return b
        }

        function $b(a) {
            function b() {
                var p = {
                        line: Ca,
                        spline: Nb,
                        area: ac,
                        areaspline: bc,
                        column: Bb,
                        bar: cc,
                        pie: dc,
                        scatter: ec
                    },
                    j, u;
                s(a.series, function(L) {
                    j = p[L.type || n.defaultSeriesType];
                    u = new j;
                    u.init(v, L);
                    if (u.inverted) Qa = true;
                    Xa.push(u)
                })
            }

            function c() {
                var p = a.xAxis || {},
                    j = a.yAxis || {};
                Jb(p) || (p = [p]);
                s(p, function(u, L) {
                    u.index = L;
                    u.isX = true
                });
                Jb(j) || (j = [j]);
                s(j, function(u, L) {
                    u.index = L
                });
                Ma = p.concat(j);
                Ma = Ra(Ma, function(u) {
                    return new i(v, u)
                });
                s(Ma,
                    function(u) {
                        u.adjustTickAmount()
                    })
            }

            function d() {
                var p = true;
                for (var j in v.resources) v.resources[j] || (p = false);
                p && g()
            }

            function e(p) {
                v.toolbar.add("zoom", "Reset zoom", "Reset zoom level 1:1", function() {
                    Ga(v, "selection", {
                        resetSelection: true
                    }, e);
                    v.toolbar.remove("zoom")
                });
                db = null;
                if (p.resetSelection) s(Ma, function(j) {
                    j.reset()
                });
                else {
                    v.tracker.zoomX && s(p.xAxis, function(j) {
                        j.axis.setExtremes(j.min, j.max)
                    });
                    v.tracker.zoomY && s(p.yAxis, function(j) {
                        j.axis.setExtremes(j.min, j.max)
                    })
                }
                s(Ma, function(j) {
                    j.adjustTickAmount()
                });
                ib.hide();
                s(v.series, function(j) {
                    s(j.areas, function(u) {
                        u.parentNode && u.parentNode.removeChild(u)
                    });
                    j.translate();
                    j.createArea();
                    j.clear();
                    j.type == "spline" && j.getSplineData()
                });
                lb && s(Ma, function(j) {
                    j.render()
                });
                s(Xa, function(j) {
                    j.render()
                })
            }

            function f() {
                if (!v.titleLayer) {
                    var p = new ja("title-layer", Z, null, {
                        zIndex: 5
                    });
                    a.title && W("h2", {
                        className: "highcharts-title",
                        innerHTML: a.title.text
                    }, a.title.style, p.div);
                    a.subtitle && W("h3", {
                            className: "highcharts-subtitle",
                            innerHTML: a.subtitle.text
                        }, a.subtitle.style,
                        p.div);
                    v.titleLayer = p
                }
            }

            function g() {
                c();
                s(Xa, function(p) {
                    p.translate();
                    a.tooltip.enabled && p.options.enableMouseTracking !== false && p.createArea()
                });
                v.render = h;
                setTimeout(function() {
                    h();
                    Ga(v, "load")
                }, 0)
            }

            function h() {
                var p, j = a.labels,
                    u = a.credits;
                p = 2 * (n.borderWidth || 0) + (n.shadow ? 8 : 0);
                Ob.drawRect(p / 2, p / 2, X - p, la - p, n.borderColor, n.borderWidth, n.borderRadius, n.backgroundColor, n.shadow);
                Ob.drawRect(T, F, oa, ha, n.plotBorderColor, n.plotBorderWidth, null, n.plotBackgroundColor, n.plotShadow, mb);
                xa && hb(".highcharts-image-map", {
                    display: "none"
                }, "print");
                lb && s(Ma, function(L) {
                    L.render()
                });
                f();
                j.items && s(j.items, function() {
                    var L = I({
                        className: "highcharts-label"
                    }, this.attributes);
                    Cb.drawHtml(this.html, L, I(j.style, this.style))
                });
                for (p = 0; p < Xa.length; p++) Xa[p].render();
                v.legend = new y(v);
                if (!v.toolbar) v.toolbar = k(v);
                if (u.enabled && !v.credits) v.credits = W("a", {
                    href: u.href,
                    innerHTML: u.text
                }, I(u.style, {
                    zIndex: 8
                }), Z)
            }

            function i(p, j) {
                function u() {
                    j = Q(ia ? nb : Db, U ? ra ? fc : Pb : ra ? gc : hc, j)
                }

                function L() {
                    var o = [],
                        t;
                    s(Xa, function(z) {
                        t = false;
                        s(["xAxis",
                            "yAxis"
                        ], function(B) {
                            if ((B == "xAxis" && ia || B == "yAxis" && !ia) && (z.options[B] == j.index || z.options[B] === ga && j.index == 0)) {
                                z[B] = eb;
                                t = true
                            }
                        });
                        if (t) {
                            var w;
                            if (!ia) {
                                w = z.options.stacking;
                                ob = w == "percent";
                                if (w) {
                                    var D = o[z.type] || [];
                                    o[z.type] = D
                                }
                                if (ob) {
                                    Ha = 0;
                                    Ya = 99
                                }
                            }
                            if (z.isCartesian) {
                                lb = true;
                                s(z.data, function(B, M) {
                                    if (Ha === ga) {
                                        Ha = Ya = B[pb];
                                        if (!ia && /(area|column|bar)/.test(z.type)) {
                                            Ha = 0;
                                            Qb = true
                                        }
                                    }
                                    if (ia)
                                        if (B.x > Ya) Ya = B.x;
                                        else {
                                            if (B.x < Ha) Ha = B.x
                                        }
                                    else {
                                        if (w) D[M] = D[M] ? D[M] + B.y : B.y;
                                        M = D ? D[M] : B.y;
                                        if (!ob)
                                            if (M > Ya) Ya = M;
                                            else if (M < Ha) Ha =
                                            M;
                                        if (w) Sa[z.type][B.x] = {
                                            total: M,
                                            cum: M
                                        }
                                    }
                                })
                            }
                        }
                    })
                }

                function aa(o, t, z) {
                    var w = 1,
                        D = 0;
                    if (z) {
                        w *= -1;
                        D = qb
                    }
                    if (fb) {
                        w *= -1;
                        D -= w * qb
                    }
                    if (t) return (o - 0) / Za + ba;
                    return w * (o - ba) * Za + D
                }

                function C(o, t, z) {
                    if (z) {
                        var w, D, B;
                        w = aa(o);
                        o = D = w + rb;
                        w = B = la - w - rb;
                        if (U) {
                            w = F;
                            B = la - va
                        } else {
                            o = T;
                            D = X - pa
                        }
                        Rb.drawLine(o, w, D, B, t, z)
                    }
                }

                function N(o, t, z) {
                    var w = (t - o) * Za;
                    C(o + (t - o) / 2, z, w)
                }

                function O(o, t, z, w, D, B) {
                    var M, A, sa, K = j.labels;
                    if (t == "inside") D = -D;
                    if (ra) D = -D;
                    t = A = aa(o + $a) + rb;
                    M = sa = la - aa(o + $a) - rb;
                    if (U) {
                        M = la - va - (ra ? ha : 0) + Ta;
                        sa = M + D
                    } else {
                        t = T + (ra ? oa : 0) + Ta;
                        A = t - D
                    }
                    w && gb.drawLine(t, M, A, sa, z, w);
                    if (B && K.enabled)
                        if ((o = sb.call({
                                value: wa && wa[o] ? wa[o] : o
                            })) || o === 0) gb.addText(o, t + K.x - ($a && U ? $a * Za * (fb ? -1 : 1) : 0), M + K.y - ($a && !U ? $a * Za * (fb ? 1 : -1) : 0), K.style, K.rotation, K.align)
                }

                function P(o, t) {
                    var z;
                    jb = t ? 1 : ma.pow(10, Da(ma.log(o) / ma.LN10));
                    z = o / jb;
                    t || (t = [1, 2, 2.5, 5, 10]);
                    for (var w = 0; w < t.length; w++) {
                        o = t[w];
                        if (z <= (t[w] + (t[w + 1] || t[w])) / 2) break
                    }
                    o *= jb;
                    return o
                }

                function G() {
                    na = [];
                    for (var o = 1E3 / ya, t = 6E4 / ya, z = 36E5 / ya, w = 864E5 / ya, D = 6048E5 / ya, B = 2592E6 / ya, M = 31556952E3 / ya, A = [
                            ["second",
                                o, [1, 2, 5, 10, 15, 30]
                            ],
                            ["minute", t, [1, 2, 5, 10, 15, 30]],
                            ["hour", z, [1, 2, 3, 4, 6, 8, 12]],
                            ["day", w, [1, 2]],
                            ["week", D, [1, 2]],
                            ["month", B, [1, 2, 3, 4, 6]],
                            ["year", M, null]
                        ], sa = A[6], K = sa[1], R = sa[2], Ia = 0; Ia < A.length; Ia++) {
                        sa = A[Ia];
                        K = sa[1];
                        R = sa[2];
                        if (A[Ia + 1]) {
                            var ic = (K * R[R.length - 1] + A[Ia + 1][1]) / 2;
                            if (qa <= ic) break
                        }
                    }
                    if (K == M && qa < 5 * K) R = [1, 2, 5];
                    A = P(qa / K, R);
                    var ab;
                    R = new Date(ba * ya);
                    R.setUTCMilliseconds(0);
                    if (K >= o) R.setUTCSeconds(K >= t ? 0 : A * Da(R.getUTCSeconds() / A));
                    if (K >= t) R.setUTCMinutes(K >= z ? 0 : A * Da(R.getUTCMinutes() / A));
                    if (K >= z) R.setUTCHours(K >=
                        w ? 0 : A * Da(R.getUTCHours() / A));
                    if (K >= w) R.setUTCDate(K >= B ? 1 : A * Da(R.getUTCDate() / A));
                    if (K >= B) {
                        R.setUTCMonth(K >= M ? 0 : A * Da(R.getUTCMonth() / A));
                        ab = R.getUTCFullYear()
                    }
                    if (K >= M) {
                        ab -= ab % A;
                        R.setUTCFullYear(ab)
                    }
                    K == D && R.setUTCDate(R.getUTCDate() - R.getUTCDay() + j.startOfWeek);
                    Ia = 1;
                    o = R.getTime() / ya;
                    ab = R.getUTCFullYear();
                    t = R.getUTCMonth();
                    for (ba = o; o < ca && Ia < 100;) {
                        na.push(o);
                        if (K == M) o = Date.UTC(ab + Ia * A, 0) / ya;
                        else if (K == B) o = Date.UTC(ab, t + Ia * A) / ya;
                        else o += K * A;
                        Ia++
                    }
                    ca = o;
                    j.labels.formatter || (sb = function() {
                        return Lb(j.dateTimeLabelFormats[sa[0]],
                            this.value, 1)
                    })
                }

                function r() {
                    na = [];
                    ba = Da(ba / qa) * qa;
                    ca = ma.ceil(ca / qa) * qa;
                    for (var o = (jb < 1 ? 1 / jb : 1) * 10, t = ba; t <= ca; t += qa) na.push(H(t * o) / o);
                    if (wa) {
                        ba -= 0.5;
                        ca += 0.5
                    }
                    sb || (sb = function() {
                        return this.value
                    })
                }

                function J() {
                    if (!bb && !wa) {
                        var o = na.length,
                            t = db[pb];
                        if (o < t) {
                            for (; na.length < t;) na.push(na[na.length - 1] + qa);
                            Za *= (o - 1) / (t - 1)
                        }
                    }
                }

                function l() {
                    var o, t = j.min === null,
                        z = j.max === null;
                    if (ba === null) ba = t ? Ha : j.min;
                    if (ca === null) ca = z ? Ya : j.max;
                    if (!wa && !ob) {
                        o = ca - ba || 1;
                        if (t && Sb && (Ha < 0 || !Qb)) ba -= o * Sb;
                        if (z && Tb) ca += o * Tb
                    }
                    qa = wa ||
                        ba == ca ? 1 : j.tickInterval == "auto" ? (ca - ba) * j.tickPixelInterval / qb : j.tickInterval;
                    bb || (qa = P(qa));
                    tb = j.minorTickInterval == "auto" && qa ? qa / 5 : j.minorTickInterval;
                    bb ? G() : r();
                    Za = qb / (ca - ba || 1);
                    db || (db = {
                        x: 0,
                        y: 0
                    });
                    if (!bb && na.length > db[pb]) db[pb] = na.length;
                    if (!ia)
                        for (var w in Sa) s(Sa[w], function(D, B) {
                            D = D.total;
                            Sa[w][B] = {
                                total: D,
                                cum: D
                            }
                        })
                }

                function S(o, t) {
                    var z;
                    if (wa) {
                        if (o < 0) o = 0;
                        if (t > wa.length - 1) t = wa.length - 1
                    }
                    if (t - o > j.maxZoom) {
                        ba = o;
                        ca = t
                    } else {
                        z = (j.maxZoom - t + o) / 2;
                        ba = o - z;
                        ca = t + z
                    }
                    l()
                }

                function da() {
                    ba = ca = qa = tb = na = null;
                    l()
                }

                function za() {
                    var o = j.title,
                        t = j.alternateGridColor,
                        z = j.plotBands,
                        w = j.plotLines,
                        D = j.minorTickWidth,
                        B = j.lineWidth,
                        M;
                    gb.clear();
                    Rb.clear();
                    t && s(na, function(A, sa) {
                        if (sa % 2 == 0 && A < ca) N(A, na[sa + 1] !== ga ? na[sa + 1] : ca, t)
                    });
                    z && s(z, function(A) {
                        N(A.from, A.to, A.color)
                    });
                    if (tb && !wa)
                        for (z = ba; z <= ca; z += tb) {
                            C(z, j.minorGridLineColor, j.minorGridLineWidth);
                            D && O(z, j.minorTickPosition, j.minorTickColor, D, j.minorTickLength)
                        }
                    s(na, function(A) {
                        M = A + $a;
                        C(M, j.gridLineColor, j.gridLineWidth);
                        O(A, j.tickPosition, j.tickColor, j.tickWidth,
                            j.tickLength, !(A == ba && !j.showFirstLabel || A == ca && !j.showLastLabel))
                    });
                    w && s(w, function(A) {
                        C(A.value, A.color, A.width)
                    });
                    if (B) {
                        w = T + (ra ? oa : 0) + Ta;
                        D = la - va - (ra ? ha : 0) + Ta;
                        gb.drawLine(U ? T : w, U ? D : F, U ? X - pa : w, U ? D : la - va, j.lineColor, B)
                    }
                    if (o && o.enabled && o.text) {
                        B = U ? T : F;
                        w = U ? oa : ha;
                        B = {
                            low: B + (U ? 0 : w),
                            middle: B + w / 2,
                            high: B + (U ? w : 0)
                        } [o.align];
                        w = (U ? F + ha : T) + (U ? 1 : -1) * (ra ? -1 : 1) * o.margin - (xa ? parseInt(o.style.fontSize || o.style.font.replace(/^[a-z ]+/, "")) / 3 : 0);
                        gb.addText(o.text, U ? B : w + (ra ? oa : 0) + Ta, U ? w - (ra ? ha : 0) + Ta : B, o.style, o.rotation ||
                            0, {
                                low: "left",
                                middle: "center",
                                high: "right"
                            } [o.align])
                    }
                    gb.strokeText()
                }
                var ia = j.isX,
                    ra = j.opposite,
                    U = Qa ? !ia : ia,
                    Sa = {
                        bar: [],
                        column: [],
                        area: [],
                        areaspline: []
                    };
                u();
                var eb = this,
                    bb = j.type == "datetime",
                    Ta = j.offset || 0,
                    pb = ia ? "x" : "y",
                    qb = U ? oa : ha,
                    Za, rb = U ? T : va,
                    gb = new ja("axis-layer", Z, null, {
                        zIndex: 7
                    }),
                    Rb = new ja("grid-layer", Z, null, {
                        zIndex: 1
                    }),
                    Ha, Ya, ca = null,
                    ba = null,
                    Sb = j.minPadding,
                    Qb, ob, Tb = j.maxPadding,
                    qa, tb, jb, na, sb = j.labels.formatter,
                    wa = j.categories || ia && p.columnCount,
                    fb = j.reversed,
                    $a = wa && j.tickmarkPlacement == "between" ?
                    0.5 : 0;
                if (Qa && ia && fb === ga) fb = true;
                ra || (Ta *= -1);
                if (U) Ta *= -1;
                I(eb, {
                    addPlotLine: C,
                    adjustTickAmount: J,
                    categories: wa,
                    isXAxis: ia,
                    render: za,
                    translate: aa,
                    setExtremes: S,
                    reset: da,
                    reversed: fb,
                    stacks: Sa
                });
                L();
                l()
            }

            function k() {
                function p(aa, C, N, O) {
                    if (!L[aa]) {
                        C = W(Na, {
                            innerHTML: C,
                            title: N,
                            onclick: O
                        }, I(a.toolbar.itemStyle, {
                            zIndex: 1003
                        }), u.div);
                        L[aa] = C
                    }
                }

                function j(aa) {
                    L[aa].parentNode.removeChild(L[aa]);
                    L[aa] = null
                }
                var u, L = {};
                u = new ja("toolbar", Z, null, {
                    zIndex: 1004,
                    width: "auto",
                    height: "auto"
                });
                return {
                    add: p,
                    remove: j
                }
            }

            function q(p, j) {
                function u(l) {
                    l = l || Ja.event;
                    if (!l.target) l.target = l.srcElement;
                    if (!l.pageX) l.pageX = l.clientX + (ka.documentElement.scrollLeft || ka.body.scrollLeft);
                    if (!l.pageY) l.pageY = l.clientY + (ka.documentElement.scrollTop || ka.body.scrollTop);
                    return l
                }

                function L() {
                    Ea.onmousemove = function(l) {
                        l = u(l);
                        l.returnValue = false;
                        if (ub) {
                            if (r) {
                                var S = l.pageX - O - Oa.x - T;
                                ua(G, {
                                    width: Ba(S) + E,
                                    left: (S > 0 ? O : O + S) + E
                                })
                            }
                            if (J) {
                                l = l.pageY - P - Oa.y - F;
                                ua(G, {
                                    height: Ba(l) + E,
                                    top: (l > 0 ? P : P + l) + E
                                })
                            }
                        } else aa(l);
                        return false
                    };
                    Ea.onmousedown =
                        function(l) {
                            l = u(l);
                            if (lb && (r || J)) {
                                l.preventDefault && l.preventDefault();
                                ub = true;
                                O = l.pageX - Oa.x - T;
                                P = l.pageY - Oa.y - F;
                                G || (G = W(Na, null, {
                                    position: ta,
                                    border: "none",
                                    background: "#4572A7",
                                    opacity: 0.25,
                                    width: r ? 0 : oa + E,
                                    height: J ? 0 : ha + E
                                }));
                                Cb.div.appendChild(G)
                            }
                        };
                    Ea.onmouseup = function() {
                        var l;
                        if (G) {
                            var S = {
                                    xAxis: [],
                                    yAxis: []
                                },
                                da = G.offsetLeft,
                                za = G.offsetTop,
                                ia = G.offsetWidth,
                                ra = G.offsetHeight;
                            ub = false;
                            if (ia > 10 && ra > 10) {
                                s(Ma, function(U) {
                                    var Sa = U.translate,
                                        eb = U.isXAxis,
                                        bb = Qa ? !eb : eb;
                                    S[eb ? "xAxis" : "yAxis"].push({
                                        axis: U,
                                        min: Sa(bb ?
                                            da : ha - za - ra, true),
                                        max: Sa(bb ? da + ia : ha - za, true)
                                    })
                                });
                                Ga(p, "selection", S, e);
                                l = true
                            }
                            G.parentNode.removeChild(G);
                            G = null
                        }
                    };
                    Ea.onmouseout = function(l) {
                        l = l || Ja.event;
                        if ((l = l.relatedTarget || l.toElement) && l != Aa && l.tagName != "AREA") {
                            ib.hide();
                            if (p.hoverSeries) {
                                p.hoverSeries.setState();
                                N = p.hoverSeries = null
                            }
                        }
                    };
                    Ea.onclick = function(l) {
                        l = u(l);
                        l.cancelBubble = true;
                        if (N && l.target.tagName == "AREA") {
                            var S = N.plotX,
                                da = N.plotY;
                            I(N, {
                                pageX: Oa.x + T + (Qa ? oa - da : S),
                                pageY: Oa.y + F + (Qa ? ha - S : da)
                            });
                            Ga(p.hoverSeries, "click", I(l, {
                                point: N
                            }));
                            N.firePointEvent("click", l)
                        }
                    }
                }

                function aa(l) {
                    var S = p.hoverPoint,
                        da = p.hoverSeries;
                    if (da) {
                        S || (S = da.tooltipPoints[Qa ? l.pageY - Oa.y - F : l.pageX - Oa.x - T]);
                        if (S != N) {
                            N && N.firePointEvent("mouseOut");
                            S.firePointEvent("mouseOver");
                            ib.refresh(S, da);
                            N = S
                        }
                    }
                }

                function C() {
                    var l = "highchartsMap" + jc++;
                    p.imagemap = Ea = W("map", {
                        name: l,
                        id: l,
                        className: "highcharts-image-map"
                    }, null, Z);
                    Aa = W("img", {
                            useMap: "#" + l
                        }, {
                            width: oa + E,
                            height: ha + E,
                            left: T + E,
                            top: F + E,
                            opacity: 0,
                            border: "none",
                            position: ta,
                            clip: "rect(1px," + oa + "px," + ha + "px,1px)",
                            zIndex: 9
                        },
                        Ea);
                    if (!xa) Aa.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                }
                if (j.enabled) {
                    var N, O, P, G, r = /x/.test(p.options.chart.zoomType),
                        J = /y/.test(p.options.chart.zoomType);
                    C();
                    p.tooltip = ib = m(j);
                    this.zoomX = r;
                    this.zoomY = J;
                    L();
                    setInterval(function() {
                        Eb && Eb()
                    }, 32)
                }
            }

            function m(p) {
                function j(P, G) {
                    var r = P.tooltipPos,
                        J = p.borderColor || P.color || G.color || "#606060",
                        l = v.inverted,
                        S, da, za, ia = C.offsetHeight;
                    za = P.tooltipText;
                    aa = G;
                    S = r ? r[0] : l ? oa - P.plotY : P.plotX;
                    r = r ? r[1] : l ? ha - P.plotX : P.plotY;
                    if (S >= 0 && S <= oa && r >= 0 && r <= ha) da = true;
                    if (za === false || !da) L();
                    else {
                        C.innerHTML = za;
                        da = C.offsetWidth - N;
                        za = C.offsetHeight - N;
                        if (da > (O.w || 0) + 20 || da < (O.w || 0) - 20 || za > O.h || O.c != J || ia != C.offsetHeight) {
                            O.clear();
                            O.drawRect(N / 2, N / 2, da + 20, za, J, N, p.borderRadius, p.backgroundColor, p.shadow);
                            I(O, {
                                w: da,
                                h: za,
                                c: J
                            })
                        }
                        J = S - O.w + T - 35;
                        if ((l || J < 5) && S + T + O.w < X - 100) J = S + T + 15;
                        l = r - O.h + 10 + F;
                        if (l < 5) l = 5;
                        else if (l + O.h > la) l = la - O.h - 5;
                        u(H(J), H(l));
                        G.drawPointState(P, "hover");
                        Ka.style.visibility = Fb
                    }
                }

                function u(P, G) {
                    var r = Ka.style.visibility ==
                        Fa,
                        J = r ? P : (Ka.offsetLeft + P) / 2;
                    r = r ? G : (Ka.offsetTop + G) / 2;
                    ua(Ka, {
                        left: J + E,
                        top: r + E
                    });
                    Eb = Ba(P - J) > 1 || Ba(G - r) > 1 ? function() {
                        u(P, G)
                    } : null
                }

                function L() {
                    if (Ka) Ka.style.visibility = Fa;
                    aa && aa.drawPointState()
                }
                var aa, C, N = p.borderWidth,
                    O;
                Ka = W(Na, null, {
                    position: ta,
                    visibility: Fa,
                    overflow: Fa,
                    padding: "0 50px 5px 0",
                    zIndex: 8
                }, Z);
                O = new ja("tooltip-box", Ka, null, {
                    width: oa + E,
                    height: ha + E
                });
                C = W(Na, {
                    className: "highcharts-tooltip"
                }, I(p.style, {
                    position: Ub,
                    zIndex: 2
                }), Ka);
                return {
                    refresh: j,
                    hide: L
                }
            }
            var y = function(p) {
                if (!p.legend) {
                    var j,
                        u = p.options.legend,
                        L = u.layout,
                        aa = u.symbolWidth,
                        C, N = ".highcharts-legend li",
                        O = [],
                        P = new ja("legend", Z, null, {
                            zIndex: 7
                        });
                    if (u.enabled) {
                        this.dom = C = W(Na, {
                            className: "highcharts-legend highcharts-legend-" + L,
                            innerHTML: '<ul style="margin:0;padding:0"></ul>'
                        }, I({
                            position: ta,
                            zIndex: 7
                        }, u.style), Z);
                        hb(N, I(u.itemStyle, {
                            paddingLeft: aa + u.symbolPadding + E,
                            cssFloat: L == "horizontal" ? "left" : "none"
                        }));
                        hb(N + ":hover", u.itemHoverStyle);
                        hb(N + ".hidden", u.itemHiddenStyle);
                        hb(".highcharts-legend-horizontal li", {
                            "float": "left"
                        });
                        s(p.series, function(r) {
                            if (r.options.showInLegend) {
                                var J = r.options.legendType == "point" ? r.data : [r];
                                s(J, function(l) {
                                    l.simpleSymbol = /(bar|pie|area|column)/.test(r.type);
                                    l.legendItem = j = W("li", {
                                        innerHTML: u.labelFormatter.call(l),
                                        className: l.visible ? "" : Fa
                                    }, null, C.firstChild);
                                    Pa(j, "mouseover", function() {
                                        l.setState("hover")
                                    });
                                    Pa(j, "mouseout", function() {
                                        l.setState()
                                    });
                                    Pa(j, "click", function() {
                                        Ga(l, "legendItemClick", null, function() {
                                            l.setVisible()
                                        })
                                    });
                                    O.push(l)
                                })
                            }
                        });
                        if (u.borderWidth || u.backgroundColor) P.drawRect(C.offsetLeft,
                            C.offsetTop, C.offsetWidth, C.offsetHeight, u.borderColor, u.borderWidth, u.borderRadius, u.backgroundColor, u.shadow);
                        s(O, function(r) {
                            var J = r.legendItem,
                                l = C.offsetLeft + J.offsetLeft;
                            J = C.offsetTop + J.offsetTop + J.offsetHeight / 2;
                            !r.simpleSymbol && r.options && r.options.lineWidth && P.drawLine(l, J, l + aa, J, r.color, r.options.lineWidth);
                            if (r.simpleSymbol) P.drawRect(l, J - 6, 16, 12, null, 0, 2, r.color);
                            else r.options && r.options.marker && r.options.marker.enabled && r.drawMarker(P, l + aa / 2, J, r.options.marker)
                        });
                        if (Ea) {
                            var G = W("area", {
                                shape: "rect",
                                coords: [C.offsetLeft - T, C.offsetTop - F, C.offsetLeft + C.offsetWidth - T, C.offsetTop + C.offsetHeight - F].join(",")
                            }, null, Ea);
                            Ea.insertBefore(G, Ea.childNodes[0]);
                            G.onmouseover = function(r) {
                                r = r || Ja.event;
                                r = r.relatedTarget || r.fromElement;
                                if (r != C && !ub) {
                                    ib.hide();
                                    ua(C, {
                                        zIndex: 10
                                    })
                                }
                            };
                            C.onmouseout = G.onmouseout = function(r) {
                                r = r || Ja.event;
                                r = r.relatedTarget || r.toElement;
                                if (r == Aa || r.tagName == "AREA" && r != G) ua(C, {
                                    zIndex: 7
                                })
                            }
                        }
                    }
                }
            };
            nb = Q(nb, La.xAxis);
            Db = Q(Db, La.yAxis);
            La.xAxis = La.yAxis = null;
            a = Q(La, a);
            var n = a.chart,
                x = n.margin;
            if (typeof x == "number") x = [x, x, x, x];
            var V = n.renderTo,
                ea;
            if (typeof V == "string") {
                ea = V;
                V = ka.getElementById(V)
            }
            V.innerHTML = "";
            var X = n.width || V.offsetWidth || 400,
                la = n.height || V.offsetHeight || 300,
                Z = W(Na, {
                    className: "highcharts-container",
                    id: ea || "highcharts-" + Gb++
                }, I({
                    position: Ub,
                    overflow: Fa,
                    width: X + E,
                    height: la + E,
                    textAlign: "left"
                }, n.style), V);
            if (n.className) Z.className += " " + n.className;
            var v = this,
                Aa;
            V = n.events;
            var fa, F = x[0],
                pa = x[1],
                va = x[2],
                T = x[3],
                Ea, ib, ub, Ob = new ja("chart-background", Z),
                Cb, ha, oa,
                Oa = Mb(Z),
                lb, Ma = [],
                db, Xa = [],
                mb, Qa, Eb, Ka;
            vb = cb = 0;
            Pa(Ja, "resize", function() {
                var p = ka.getElementById(ea);
                if (p) Oa = Mb(p)
            });
            if (V)
                for (fa in V) Pa(v, fa, V[fa]);
            v.addLoading = function(p) {
                v.resources[p] = false
            };
            v.clearLoading = function(p) {
                v.resources[p] = true;
                d()
            };
            v.options = a;
            v.series = Xa;
            v.resources = {};
            v.inverted = Qa = a.chart.inverted;
            v.chartWidth = X;
            v.chartHeight = la;
            v.plotWidth = oa = X - T - pa;
            v.plotHeight = ha = la - F - va;
            v.plotLeft = T;
            v.plotTop = F;
            v.plotLayer = Cb = new ja("plot", Z, null, {
                position: ta,
                width: oa + E,
                height: ha + E,
                left: T + E,
                top: F + E,
                overflow: Fa,
                zIndex: 6
            });
            this.tracker = new q(v, a.tooltip);
            if (n.plotBackgroundImage) {
                v.addLoading("plotBack");
                mb = W("img");
                mb.onload = function() {
                    v.clearLoading("plotBack")
                };
                mb.src = n.plotBackgroundImage
            }
            b();
            d()
        }

        function Vb(a) {
            for (var b = [], c = [], d = 0; d < a.length; d++) {
                b[d] = a[d].plotX;
                c[d] = a[d].plotY
            }
            this.xdata = b;
            this.ydata = c;
            a = [];
            this.y2 = [];
            var e = c.length;
            this.n = e;
            this.y2[0] = 0;
            this.y2[e - 1] = 0;
            a[0] = 0;
            for (d = 1; d < e - 1; d++) {
                var f = b[d + 1] - b[d - 1];
                f = (b[d] - b[d - 1]) / f;
                var g = f * this.y2[d - 1] + 2;
                this.y2[d] = (f - 1) / g;
                a[d] =
                    (c[d + 1] - c[d]) / (b[d + 1] - b[d]) - (c[d] - c[d - 1]) / (b[d] - b[d - 1]);
                a[d] = (6 * a[d] / (b[d + 1] - b[d - 1]) - f * a[d - 1]) / g
            }
            for (b = e - 2; b >= 0; b--) this.y2[b] = this.y2[b] * this.y2[b + 1] + a[b]
        }
        var ga, ka = document,
            Ja = window,
            ma = Math,
            H = ma.round,
            Da = ma.floor,
            Ba = ma.abs,
            wb = ma.cos,
            xb = ma.sin,
            Y = navigator.userAgent,
            xa = /msie/i.test(Y) && !Ja.opera,
            kc = /AppleWebKit/.test(Y),
            zb, jc = 0,
            cb, vb, Wb = {},
            Gb = 0,
            ya = 1,
            Na = "div",
            ta = "absolute",
            Ub = "relative",
            Fa = "hidden",
            Fb = "visible",
            E = "px",
            s, Ra, Q, kb, Pa, Ga, yb, Hb;
        if (Ja.jQuery) {
            var Ua = jQuery;
            s = function(a, b) {
                for (var c = 0, d =
                        a.length; c < d; c++)
                    if (b.call(a[c], a[c], c, a) === false) return c
            };
            Ra = function(a, b) {
                for (var c = [], d = 0, e = a.length; d < e; d++) c[d] = b.call(a[d], a[d], d, a);
                return c
            };
            Q = function() {
                var a = arguments;
                return Ua.extend(true, null, a[0], a[1], a[2], a[3])
            };
            kb = function(a) {
                return a.replace(/([A-Z])/g, function(b, c) {
                    return "-" + c.toLowerCase()
                })
            };
            Pa = function(a, b, c) {
                Ua(a).bind(b, c)
            };
            Ga = function(a, b, c, d) {
                b = Ua.Event(b);
                I(b, c);
                Ua(a).trigger(b);
                d && !b.isDefaultPrevented() && d(b)
            };
            yb = function(a, b, c) {
                Ua(a).animate(b, c)
            };
            Hb = function(a, b) {
                Ua.get(a,
                    null, b)
            };
            Ua.extend(Ua.easing, {
                easeOutQuad: function(a, b, c, d, e) {
                    return -d * (b /= e) * (b - 2) + c
                }
            })
        } else if (Ja.MooTools) {
            s = function(a, b) {
                a.each(b)
            };
            Ra = function(a, b) {
                return a.map(b)
            };
            Q = function() {
                if (Ja.$merge) return $merge.apply(this, arguments)
            };
            kb = function(a) {
                return a.hyphenate()
            };
            Pa = function(a, b, c) {
                if (!a.addEvent)
                    if (a.nodeName) a = $(a);
                    else I(a, new Events);
                a.addEvent(b, c)
            };
            Ga = function(a, b, c, d) {
                b = new Event({
                    type: b,
                    target: a
                });
                b = I(b, c);
                b.preventDefault = function() {
                    d = null
                };
                a.fireEvent && a.fireEvent(b.type, b);
                d && d(b)
            };
            yb = function(a, b, c) {
                a = new Fx.Morph($(a), I(c, {
                    transition: Fx.Transitions.Quad.easeInOut
                }));
                a.start(b)
            };
            Hb = function(a, b) {
                (new Request({
                    url: a,
                    method: "get",
                    onSuccess: b
                })).send()
            }
        }
        Y = 'normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif';
        var Va = {
                enabled: true,
                align: "center",
                x: 0,
                y: 15,
                style: {
                    color: "#666",
                    font: Y.replace("12px", "11px")
                }
            },
            La = {
                colors: ["#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92"],
                symbols: ["circle", "diamond", "square",
                    "triangle", "triangle-down"
                ],
                lang: {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                chart: {
                    margin: [50, 50, 60, 80],
                    borderColor: "#4572A7",
                    borderRadius: 5,
                    defaultSeriesType: "line",
                    plotBorderColor: "#C0C0C0"
                },
                title: {
                    text: "Chart title",
                    style: {
                        textAlign: "center",
                        color: "#3E576F",
                        font: Y.replace("12px", "16px"),
                        margin: "10px 0 0 0"
                    }
                },
                subtitle: {
                    text: "",
                    style: {
                        textAlign: "center",
                        color: "#6D869F",
                        font: Y,
                        margin: 0
                    }
                },
                plotOptions: {
                    line: {
                        animation: true,
                        events: {},
                        lineWidth: 2,
                        shadow: true,
                        marker: {
                            enabled: true,
                            symbol: "auto",
                            lineWidth: 0,
                            radius: 4,
                            lineColor: "#FFFFFF",
                            fillColor: "auto",
                            states: {
                                hover: {}
                            }
                        },
                        point: {
                            events: {}
                        },
                        dataLabels: Q(Va, {
                            enabled: false,
                            y: -6,
                            formatter: function() {
                                return this.y
                            }
                        }),
                        showInLegend: true,
                        states: {
                            hover: {
                                lineWidth: 3,
                                marker: {}
                            }
                        }
                    }
                },
                labels: {
                    style: {
                        position: ta,
                        color: "#3E576F",
                        font: Y
                    }
                },
                legend: {
                    enabled: true,
                    layout: "horizontal",
                    labelFormatter: function() {
                        return this.name
                    },
                    borderColor: "#909090",
                    borderRadius: 5,
                    shadow: true,
                    style: {
                        bottom: "10px",
                        left: "80px",
                        padding: "5px"
                    },
                    itemStyle: {
                        listStyle: "none",
                        margin: "0 1em 0 0",
                        padding: 0,
                        font: Y,
                        cursor: "pointer",
                        color: "#3E576F"
                    },
                    itemHoverStyle: {
                        color: "#000"
                    },
                    itemHiddenStyle: {
                        color: "#CCC"
                    },
                    symbolWidth: 16,
                    symbolPadding: 5
                },
                tooltip: {
                    enabled: true,
                    formatter: function() {
                        return "<b>" + (this.point.name || this.series.name) + "</b><br/>X value: " + this.x + "<br/>Y value: " + this.y
                    },
                    backgroundColor: "rgba(255, 255, 255, .85)",
                    borderWidth: 2,
                    borderRadius: 5,
                    shadow: true,
                    style: {
                        color: "#333333",
                        fontSize: "9pt",
                        padding: "5px",
                        font: Y
                    }
                },
                toolbar: {
                    itemStyle: {
                        color: "#4572A7",
                        cursor: "pointer",
                        margin: "20px",
                        font: Y
                    }
                },
                credits: {
                    enabled: true,
                    text: "knu.com",
                    href: "***",
                    style: {
                        position: ta,
                        right: "50px",
                        bottom: "5px",
                        color: "#999",
                        textDecoration: "none",
                        font: Y.replace("12px", "10px")
                    }
                }
            },
            nb = {
                dateTimeLabelFormats: {
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                gridLineColor: "#C0C0C0",
                labels: Va,
                lineColor: "#C0D0E0",
                lineWidth: 1,
                max: null,
                min: null,
                maxZoom: 1,
                minorGridLineColor: "#E0E0E0",
                minorGridLineWidth: 1,
                minorTickColor: "#A0A0A0",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minorTickWidth: 1,
                showFirstLabel: true,
                showLastLabel: false,
                startOfWeek: 1,
                tickColor: "#C0D0E0",
                tickInterval: "auto",
                tickLength: 5,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                tickWidth: 1,
                title: {
                    enabled: false,
                    text: "X-values",
                    align: "middle",
                    margin: 35,
                    style: {
                        color: "#6D869F",
                        font: Y.replace("normal", "bold")
                    }
                },
                type: "linear"
            },
            Db = Q(nb, {
                gridLineWidth: 1,
                tickPixelInterval: 72,
                showLastLabel: true,
                labels: {
                    align: "right",
                    x: -8,
                    y: 3
                },
                lineWidth: 0,
                maxPadding: 0.05,
                minPadding: 0.05,
                tickWidth: 0,
                title: {
                    enabled: true,
                    margin: 40,
                    rotation: 270,
                    text: "Y-values"
                }
            }),
            hc = {
                labels: {
                    align: "right",
                    x: -8,
                    y: 3
                },
                title: {
                    rotation: 270
                }
            },
            gc = {
                labels: {
                    align: "left",
                    x: 8,
                    y: 3
                },
                title: {
                    rotation: 90
                }
            },
            Pb = {
                labels: {
                    align: "center",
                    x: 0,
                    y: 14
                },
                title: {
                    rotation: 0
                }
            },
            fc = Q(Pb, {
                labels: {
                    y: -5
                }
            });
        Y = La.plotOptions;
        Va = Y.line;
        Y.spline = Q(Va);
        Y.scatter = Q(Va, {
            lineWidth: 0,
            states: {
                hover: {
                    lineWidth: 0
                }
            }
        });
        Y.area = Q(Va, {
            fillColor: "auto"
        });
        Y.areaspline = Q(Y.area);
        Y.column = Q(Va, {
            borderColor: "#FFFFFF",
            borderWidth: 1,
            borderRadius: 0,
            groupPadding: 0.2,
            pointPadding: 0.1,
            states: {
                hover: {
                    brightness: 0.1,
                    shadow: false
                }
            }
        });
        Y.bar = Q(Y.column, {
            dataLabels: {
                align: "left",
                x: 5,
                y: 0
            }
        });
        Y.pie = Q(Va, {
            center: ["50%", "50%"],
            legendType: "point",
            size: "90%",
            slicedOffset: 10,
            states: {
                hover: {
                    brightness: 0.1,
                    shadow: false
                }
            }
        });
        var Ib = function(a) {
                function b(h) {
                    if (g = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(h)) f = [parseInt(g[1]), parseInt(g[2]), parseInt(g[3]), parseFloat(g[4])];
                    else if (g = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(h)) f = [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16), 1]
                }

                function c() {
                    return f ? "rgba(" + f.join(",") + ")" : a
                }

                function d(h) {
                    if (typeof h == "number" && h != 0)
                        for (var i = 0; i < 3; i++) {
                            f[i] += parseInt(h * 255);
                            if (f[i] < 0) f[i] = 0;
                            if (f[i] > 255) f[i] = 255
                        }
                    return this
                }

                function e(h) {
                    f[3] = h;
                    return this
                }
                var f = [],
                    g;
                b(a);
                return {
                    get: c,
                    brighten: d,
                    setOpacity: e
                }
            },
            ja = function(a, b, c, d) {
                var e = this,
                    f = b.style;
                c = I({
                    className: "highcharts-" + a
                }, c);
                d = I({
                    width: f.width,
                    height: f.height,
                    position: ta,
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    border: "none"
                }, d);
                a = W(Na, c, d, b);
                I(e, {
                    div: a,
                    width: parseInt(d.width),
                    height: parseInt(d.height)
                });
                e.svg = xa ? "" : '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + e.width + 'px" height="' + e.height + '">'
            };
        ja.prototype = {
            getCtx: function() {
                if (!this.ctx) {
                    var a = W("canvas", {
                        id: "highcharts-canvas-" + Gb++,
                        width: this.width,
                        height: this.height
                    }, {
                        position: ta
                    }, this.div);
                    if (xa) {
                        G_vmlCanvasManager.initElement(a);
                        a = ka.getElementById(a.id)
                    }
                    this.ctx = a.getContext("2d")
                }
                return this.ctx
            },
            getSvg: function() {
                if (!this.svgObject) {
                    var a = this,
                        b = a.div,
                        c = a.width;
                    a = a.height;
                    if (xa) {
                        if (!ka.namespaces.g_vml_) {
                            ka.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml");
                            ka.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}"
                        }
                        this.svgObject = W(Na, null, {
                            width: c + E,
                            height: a + E,
                            position: ta
                        }, b)
                    } else this.svgObject = W("object", {
                        width: c,
                        height: a,
                        type: "image/svg+xml"
                    }, {
                        position: ta,
                        left: 0,
                        top: 0
                    }, b)
                }
                return this.svgObject
            },
            drawLine: function(a, b, c, d, e, f) {
                var g = this.getCtx();
                if (a == c) a = c = H(a) + f % 2 / 2;
                if (b == d) b = d = H(b) + f % 2 / 2;
                g.lineWidth = f;
                g.lineCap = "round";
                g.beginPath();
                g.moveTo(a, b);
                g.strokeStyle = e;
                g.lineTo(c, d);
                g.closePath();
                g.stroke()
            },
            drawPolyLine: function(a, b, c, d, e) {
                var f = this.getCtx(),
                    g = [];
                if (d && c) {
                    s(a, function(h) {
                        g.push(h === ga ? h : h + 1)
                    });
                    for (d = 1; d <= 3; d++) this.drawPolyLine(g, "rgba(0, 0, 0, " + 0.05 * d + ")", 6 - 2 * d)
                }
                f.beginPath();
                for (d = 0; d < a.length; d +=
                    2) f[d == 0 ? "moveTo" : "lineTo"](a[d], a[d + 1]);
                I(f, {
                    lineWidth: c,
                    lineJoin: "round"
                });
                if (b && c) {
                    f.strokeStyle = b;
                    f.stroke()
                }
                if (e) {
                    f.fillStyle = Kb(e, f);
                    f.fill()
                }
            },
            drawRect: function(a, b, c, d, e, f, g, h, i, k) {
                function q() {
                    m.beginPath();
                    if (g) {
                        m.moveTo(a, b + g);
                        m.lineTo(a, b + d - g);
                        m.quadraticCurveTo(a, b + d, a + g, b + d);
                        m.lineTo(a + c - g, b + d);
                        m.quadraticCurveTo(a + c, b + d, a + c, b + d - g);
                        m.lineTo(a + c, b + g);
                        m.quadraticCurveTo(a + c, b, a + c - g, b);
                        m.lineTo(a + g, b);
                        m.quadraticCurveTo(a, b, a, b + g)
                    } else m.rect(a, b, c, d);
                    m.closePath()
                }
                var m = this.getCtx(),
                    y = (f || 0) % 2 / 2;
                a = H(a) + y;
                b = H(b) + y;
                c = H(c);
                d = H(d);
                if (i)
                    for (i = 1; i <= 3; i++) this.drawRect(a + 1, b + 1, c, d, "rgba(0, 0, 0, " + 0.05 * i + ")", 6 - 2 * i, g);
                k && m.drawImage(k, a, b, c, d);
                q();
                if (h) {
                    m.fillStyle = Kb(h, m);
                    m.fill();
                    Ja.G_vmlCanvasManager && q()
                }
                if (f) {
                    m.strokeStyle = e;
                    m.lineWidth = f;
                    m.stroke()
                }
            },
            drawSymbol: function(a, b, c, d, e, f, g) {
                var h = this.getCtx(),
                    i = /^url\((.*?)\)$/;
                h.beginPath();
                if (a == "square") {
                    a = 0.707 * d;
                    h.moveTo(b - a, c - a);
                    h.lineTo(b + a, c - a);
                    h.lineTo(b + a, c + a);
                    h.lineTo(b - a, c + a);
                    h.lineTo(b - a, c - a)
                } else if (a == "triangle") {
                    c++;
                    h.moveTo(b, c - 1.33 * d);
                    h.lineTo(b + d, c + 0.67 * d);
                    h.lineTo(b - d, c + 0.67 * d);
                    h.lineTo(b, c - 1.33 * d)
                } else if (a == "triangle-down") {
                    c--;
                    h.moveTo(b, c + 1.33 * d);
                    h.lineTo(b - d, c - 0.67 * d);
                    h.lineTo(b + d, c - 0.67 * d);
                    h.lineTo(b, c + 1.33 * d)
                } else if (a == "diamond") {
                    h.moveTo(b, c - d);
                    h.lineTo(b + d, c);
                    h.lineTo(b, c + d);
                    h.lineTo(b - d, c);
                    h.lineTo(b, c - d)
                } else i.test(a) ? W("img", {
                    onload: function() {
                        var k = this,
                            q = Wb[k.src] || [k.width, k.height];
                        ua(k, {
                            left: H(b - q[0] / 2) + E,
                            top: H(c - q[1] / 2) + E,
                            visibility: Fb
                        });
                        Wb[k.src] = q
                    },
                    src: a.match(i)[1]
                }, {
                    position: ta,
                    visibility: xa ?
                        Fb : Fa
                }, this.div) : h.arc(b, c, d, 0, 2 * ma.PI, true);
                if (g) {
                    h.fillStyle = g;
                    h.fill()
                }
                if (f && e) {
                    h.strokeStyle = f || "rgb(100, 100, 255)";
                    h.lineWidth = e || 2;
                    h.stroke()
                }
            },
            drawHtml: function(a, b, c) {
                W(Na, I(b, {
                    innerHTML: a
                }), I(c, {
                    position: ta
                }), this.div)
            },
            drawText: function() {
                this.addText.apply(this, arguments);
                this.strokeText()
            },
            addText: function(a, b, c, d, e, f) {
                if (a || a === 0) {
                    var g = this,
                        h, i = g.div,
                        k, q = "";
                    d = d || {};
                    var m = d.color || "#000000";
                    f = f || "left";
                    var y = parseInt(d.fontSize || d.font.replace(/^[a-z ]+/, ""));
                    for (var n in d) q += kb(n) +
                        ":" + d[n] + ";";
                    s(["MozTransform", "WebkitTransform", "transform"], function(X) {
                        if (X in i.style) k = X
                    });
                    if (!e || k) {
                        a = W("span", {
                            innerHTML: a
                        }, I(d, {
                            position: ta,
                            left: b + E,
                            whiteSpace: "nowrap",
                            bottom: H(g.height - c - y * 0.25) + E,
                            color: m
                        }), i);
                        q = a.offsetWidth;
                        if (f == "right") ua(a, {
                            left: b - q + E
                        });
                        else f == "center" && ua(a, {
                            left: H(b - q / 2) + E
                        });
                        if (e) {
                            f = {
                                left: 0,
                                center: 50,
                                right: 100
                            } [f];
                            a.style[k] = "rotate(" + e + "deg)";
                            a.style[k + "Origin"] = f + "% 100%"
                        }
                    } else if (xa) {
                        h = true;
                        d = (e || 0) * ma.PI * 2 / 360;
                        e = wb(d);
                        d = xb(d);
                        n = g.width;
                        y = y / 3 || 3;
                        var x = f == "left",
                            V = f == "right",
                            ea = x ? b : b - n * e;
                        b = V ? b : b + n * e;
                        x = x ? c : c - n * d;
                        c = V ? c : c + n * d;
                        ea += y * d;
                        b += y * d;
                        x -= y * e;
                        c -= y * e;
                        if (Ba(ea - b) < 0.1) ea += 0.1;
                        if (Ba(x - c) < 0.1) x += 0.1;
                        g.svg += '<g_vml_:line from="' + ea + ", " + x + '" to="' + b + ", " + c + '" stroked="false"><g_vml_:fill on="true" color="' + m + '"/><g_vml_:path textpathok="true"/><g_vml_:textpath on="true" string="' + a + '" style="v-text-align:' + f + ";" + q + '"/></g_vml_:line>'
                    } else {
                        h = true;
                        g.svg += '<g><text transform="translate(' + b + "," + c + ") rotate(" + (e || 0) + ')" style="fill:' + m + ";text-anchor:" + {
                            left: "start",
                            center: "middle",
                            right: "end"
                        } [f] + ";" + q.replace(/"/g, "'") + '">' + a + "</text></g>"
                    }
                    g.hasObject = h
                }
            },
            strokeText: function() {
                if (this.hasObject) {
                    var a = this.getSvg(),
                        b = this.svg;
                    if (xa) a.innerHTML = b;
                    else {
                        a.data = "data:image/svg+xml," + b + "</svg>";
                        kc && this.div.appendChild(a)
                    }
                }
            },
            clear: function() {
                var a = this,
                    b = this.div,
                    c = b.childNodes;
                a.ctx && a.ctx.clearRect(0, 0, a.width, a.height);
                if (a.svgObject) {
                    b.removeChild(a.svgObject);
                    a.svgObject = null
                }
                for (var d = c.length - 1; d >= 0; d--) {
                    a = c[d];
                    a.tagName == "SPAN" && b.removeChild(a)
                }
            },
            hide: function() {
                ua(this.div, {
                    display: "none"
                })
            },
            show: function() {
                ua(this.div, {
                    display: ""
                })
            }
        };
        var Xb = function(a, b, c) {
            this.series = a;
            var d;
            if (typeof b == "number" || b === null) {
                this.x = c;
                this.y = b
            } else if (typeof b == "object" && typeof b.length != "number") {
                for (d in b) this[d] = b[d];
                this.x = b.x === ga ? c : b.x;
                this.y = b.y;
                this.options = b
            } else if (typeof b[0] == "string") {
                this.name = b[0];
                this.x = c;
                this.y = b[1]
            } else if (typeof b[0] == "number") {
                this.x = b[0];
                this.y = b[1]
            }
            return this
        };
        Xb.prototype = {
            firePointEvent: function(a, b) {
                var c = this;
                if (c.series.options.point.events[a] ||
                    c.options && c.options.events && c.options.events[a]) this.importEvents();
                Ga(this, a, b)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = this,
                        b = Q(a.series.options.point, a.options);
                    b = b.events;
                    var c;
                    a.events = b;
                    for (c in b) Pa(a, c, b[c]);
                    this.hasImportedEvents = true
                }
            }
        };
        var Ca = function() {
            this.isCartesian = true;
            this.type = "line"
        };
        Ca.prototype = {
            init: function(a, b) {
                var c = this,
                    d, e = a.series.length;
                c.chart = a;
                b = c.setOptions(b);
                I(c, {
                    index: e,
                    options: b,
                    name: b.name || "Series " + (e + 1),
                    state: "",
                    visible: b.visible !== false
                });
                a = b.events;
                for (d in a) Pa(c, d, a[d]);
                c.getColor();
                c.getSymbol();
                c.getData(b)
            },
            getData: function(a) {
                var b = this,
                    c = b.chart,
                    d = "series" + Gb++;
                if (!a.data && a.dataURL) {
                    c.addLoading(d);
                    Hb(a.dataURL, function(e) {
                        b.dataLoaded(e);
                        c.clearLoading(d)
                    })
                } else b.dataLoaded(a.data)
            },
            dataLoaded: function(a) {
                var b = this,
                    c = b.chart,
                    d = b.options,
                    e = d.dataParser,
                    f = {},
                    g, h;
                if (d.dataURL && !e) e = function(q) {
                    return eval(q)
                };
                if (e) a = e.call(b, a);
                this.layerGroup = g = new ja("series-group", c.plotLayer.div, null, {
                    zIndex: 2
                });
                s(["", "hover"], function(q) {
                    f[q] =
                        new ja("state-" + q, g.div)
                });
                this.stateLayers = f;
                h = d.pointStart || 0;
                a = Ra(a, function(q) {
                    q = new Xb(b, q, h);
                    h += d.pointInterval || 1;
                    return q
                });
                b.data = a;
                var i = -1,
                    k = [];
                s(a, function(q, m) {
                    if (q.y === null) {
                        m > i + 1 && k.push(a.slice(i + 1, m));
                        i = m
                    } else m == a.length - 1 && k.push(a.slice(i + 1, m + 1))
                });
                this.segments = k
            },
            setOptions: function(a) {
                return Q(this.chart.options.plotOptions[this.type], a)
            },
            getColor: function() {
                var a = this.chart.options.colors;
                this.color = this.options.color || a[cb++] || "#0000ff";
                if (cb >= a.length) cb = 0
            },
            getSymbol: function() {
                var a =
                    this.chart.options.symbols,
                    b = this.options.marker.symbol || "auto";
                if (b == "auto") b = a[vb++];
                this.symbol = b;
                if (vb >= a.length) vb = 0
            },
            translate: function() {
                var a = this.chart,
                    b = this,
                    c = b.options.stacking,
                    d = b.xAxis.categories,
                    e = b.yAxis,
                    f = e.stacks[b.type];
                s(this.data, function(g) {
                    var h = g.x,
                        i = g.y,
                        k;
                    g.plotX = b.xAxis.translate(g.x);
                    if (c) {
                        k = f[h];
                        h = k.total;
                        k.cum = k = k.cum - i;
                        i = k + i;
                        if (c == "percent") {
                            k = h ? k * 100 / h : 0;
                            i = h ? i * 100 / h : 0;
                            g.percentage = h ? g.y * 100 / h : 0
                        }
                        g.yBottom = e.translate(k, 0, 1)
                    }
                    if (i !== null) g.plotY = e.translate(i, 0, 1);
                    g.clientX =
                        a.inverted ? a.plotHeight - g.plotX + a.plotTop : g.plotX + a.plotLeft;
                    g.category = d && d[g.x] !== ga ? d[g.x] : g.x
                });
                this.setTooltipPoints()
            },
            setTooltipPoints: function() {
                var a = this,
                    b = a.chart,
                    c = b.inverted,
                    d = [],
                    e = c ? b.plotHeight : b.plotWidth,
                    f, g, h = [];
                s(a.segments, function(i) {
                    d = d.concat(i)
                });
                if (a.xAxis.reversed) d = Ab(d);
                s(d, function(i, k) {
                    if (!a.tooltipPoints) i.tooltipText = b.options.tooltip.formatter.call({
                        series: a,
                        point: i,
                        x: i.category,
                        y: i.y,
                        percentage: i.percentage
                    });
                    f = d[k - 1] ? d[k - 1].high + 1 : 0;
                    for (g = i.high = d[k + 1] ? Da((i.plotX +
                            (d[k + 1] ? d[k + 1].plotX : e)) / 2) : e; f <= g;) h[c ? e - f++ : f++] = i
                });
                a.tooltipPoints = h
            },
            drawLine: function(a) {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e = c.animation && b.animate,
                    f = b.stateLayers[a],
                    g = c.lineColor || b.color,
                    h = c.fillColor == "auto" ? Ib(b.color).setOpacity(c.fillOpacity || 0.75).get() : c.fillColor,
                    i = d.inverted,
                    k = (i ? 0 : d.plotHeight) - b.yAxis.translate(0);
                if (a) c = Q(c, c.states[a]);
                e && b.animate(true);
                s(b.segments, function(q) {
                    var m = [],
                        y = [];
                    s(q, function(x) {
                        m.push(i ? d.plotWidth - x.plotY : x.plotX, i ? d.plotHeight - x.plotX : x.plotY)
                    });
                    if (/area/.test(b.type)) {
                        for (var n = 0; n < m.length; n++) y.push(m[n]);
                        if (c.stacking && b.type != "areaspline")
                            for (n = q.length - 1; n >= 0; n--) y.push(q[n].plotX, q[n].yBottom);
                        else y.push(i ? k : q[q.length - 1].plotX, i ? q[0].plotX : k, i ? k : q[0].plotX, i ? q[q.length - 1].plotX : k);
                        f.drawPolyLine(y, null, null, c.shadow, h)
                    }
                    c.lineWidth && f.drawPolyLine(m, g, c.lineWidth, c.shadow)
                });
                e && b.animate()
            },
            animate: function(a) {
                var b = this,
                    c = b.chart,
                    d = c.inverted,
                    e = b.layerGroup.div;
                if (b.visible)
                    if (a) ua(e, I({
                        overflow: Fa
                    }, d ? {
                        height: 0
                    } : {
                        width: 0
                    }));
                    else {
                        yb(e,
                            d ? {
                                height: c.plotHeight + E
                            } : {
                                width: c.plotWidth + E
                            }, {
                                duration: 1E3
                            });
                        this.animate = null
                    }
            },
            drawPoints: function(a) {
                var b = this,
                    c = b.stateLayers[a],
                    d = b.options,
                    e = d.marker,
                    f = b.data,
                    g = b.chart,
                    h = g.inverted;
                if (a) {
                    a = d.states[a].marker;
                    if (a.lineWidth === ga) a.lineWidth = e.lineWidth + 1;
                    if (a.radius === ga) a.radius = e.radius + 1;
                    e = Q(e, a)
                }
                e.enabled && s(f, function(i) {
                    if (i.plotY !== ga) b.drawMarker(c, h ? g.plotWidth - i.plotY : i.plotX, h ? g.plotHeight - i.plotX : i.plotY, Q(e, i.marker))
                })
            },
            drawMarker: function(a, b, c, d) {
                if (d.lineColor == "auto") d.lineColor =
                    this.color;
                if (d.fillColor == "auto") d.fillColor = this.color;
                if (d.symbol == "auto") d.symbol = this.symbol;
                a.drawSymbol(d.symbol, b, c, d.radius, d.lineWidth, d.lineColor, d.fillColor)
            },
            drawDataLabels: function() {
                if (this.options.dataLabels.enabled && !this.hasDrawnDataLabels) {
                    var a = this,
                        b, c, d = a.data,
                        e = a.options.dataLabels,
                        f, g, h = a.chart,
                        i = h.inverted,
                        k = a.type == "pie";
                    a.dataLabelsLayer = g = new ja("data-labels", a.layerGroup.div, null, {
                        zIndex: 1
                    });
                    e.style.color = e.color == "auto" ? a.color : e.color;
                    s(d, function(q) {
                        f = e.formatter.call({
                            x: q.x,
                            y: q.y,
                            series: a,
                            point: q
                        });
                        b = (i ? h.plotWidth - q.plotY : q.plotX) + e.x;
                        c = (i ? h.plotHeight - q.plotX : q.plotY) + e.y;
                        if (q.tooltipPos) {
                            b = q.tooltipPos[0] + e.x;
                            c = q.tooltipPos[1] + e.y
                        }
                        if (k) g = new ja("data-labels", q.layer.div, null, {
                            zIndex: 3
                        });
                        if (f) g[k ? "drawText" : "addText"](f, b, c, e.style, e.rotation, e.align)
                    });
                    k || g.strokeText();
                    a.hasDrawnDataLabels = true
                }
            },
            drawPointState: function(a, b) {
                var c = this.chart,
                    d = c.inverted,
                    e = c.singlePointLayer,
                    f = this.options;
                if (!e) e = c.singlePointLayer = new ja("single-point", c.plotLayer.div, null, {
                    zIndex: 3
                });
                e.clear();
                if (b) {
                    var g = f.states[b].marker;
                    b = f.marker.states[b];
                    if (b.radius === ga) b.radius = g.radius + 2;
                    if ((f = Q(f.marker, a.marker, g, b)) && f.enabled) this.drawMarker(e, d ? c.plotWidth - a.plotY : a.plotX, d ? c.plotHeight - a.plotX : a.plotY, f)
                }
            },
            render: function() {
                var a = this;
                a.drawDataLabels();
                for (var b in a.stateLayers) {
                    a.drawLine(b);
                    a.drawPoints(b);
                    b && a.stateLayers[b].hide()
                }
                a.visible || a.setVisible(false)
            },
            clear: function() {
                var a = this.stateLayers;
                for (var b in a) {
                    a[b].clear();
                    a[b].cleared = true
                }
                if (this.dataLabelsLayer) {
                    this.dataLabelsLayer.clear();
                    this.hasDrawnDataLabels = false
                }
            },
            setState: function(a) {
                a = a || "";
                if (this.state != a) {
                    var b = this,
                        c = b.stateLayers,
                        d = c[a];
                    c = c[b.state];
                    var e = b.singlePointLayer || b.chart.singlePointLayer;
                    if (b.state = a) d.show();
                    else {
                        c.hide();
                        e && e.clear()
                    }
                }
            },
            setVisible: function(a) {
                var b = this,
                    c = b.chart.imagemap,
                    d = b.layerGroup,
                    e = b.legendItem,
                    f = b.areas;
                (b.visible = a = a === ga ? !b.visible : a) ? d.show(): d.hide();
                if (e) e.className = a ? "" : Fa;
                f && s(f, function(g) {
                    a ? c.insertBefore(g, c.childNodes[1]) : c.removeChild(g)
                })
            },
            getAreaCoords: function() {
                var a =
                    this,
                    b = this.chart,
                    c = b.inverted,
                    d = b.plotWidth,
                    e = b.plotHeight,
                    f = 10,
                    g = [];
                s(a.splinedata || a.segments, function(h, i) {
                    if (a.xAxis.reversed) h = Ab(h);
                    var k = [],
                        q = [],
                        m = [];
                    s([q, m], function(y) {
                        for (var n = 0, x = 0, V, ea, X = [h[0]], la = y == q ? 1 : -1, Z, v, Aa, fa, F, pa, va; h[x];) {
                            if (h[x].plotX > h[n].plotX + f || x == h.length - 1) {
                                V = h[x];
                                ea = h.slice(n, x - 1);
                                s(ea, function(T) {
                                    if (la * T.plotY < la * V.plotY) V = T
                                });
                                if (H(h[n].plotX) < H(V.plotX) || h[x].plotX > h[n].plotX + f) X.push(V);
                                n = x
                            }
                            x++
                        }
                        X[X.length - 1] != h[h.length - 1] && X.push(h[h.length - 1]);
                        for (x = 0; x < X.length; x++)
                            if (x >
                                0) {
                                v = X[x].plotX;
                                Z = X[x].plotY;
                                n = X[x - 1].plotX;
                                ea = X[x - 1].plotY;
                                fa = v - X[x - 1].plotX;
                                pa = F = Z - X[x - 1].plotY;
                                Aa = -fa;
                                va = ma.sqrt(ma.pow(pa, 2) + ma.pow(Aa, 2));
                                if (x == 1) {
                                    n -= f / va * fa;
                                    ea -= f / va * F
                                } else if (x == X.length - 1) {
                                    v += f / va * fa;
                                    Z += f / va * F
                                }
                                fa = la * f / va;
                                n = H(n + fa * pa);
                                ea = H(ea + fa * Aa);
                                v = H(v + fa * pa);
                                Aa = H(Z + fa * Aa);
                                if (y[y.length - 1] && y[y.length - 1][0] > n)
                                    for (Z = false; !Z;) {
                                        F = y.pop();
                                        pa = y[y.length - 1];
                                        if (!pa) break;
                                        fa = (ea - Aa) / (n - v);
                                        F = (pa[1] - F[1]) / (pa[0] - F[0]);
                                        F = (-F * pa[0] + pa[1] + fa * n - ea) / (fa - F);
                                        fa = fa * (F - n) + ea;
                                        if (F > pa[0]) {
                                            y.push([H(F), H(fa),
                                                1
                                            ]);
                                            Z = true
                                        }
                                    } else isNaN(n) || y.push([n, ea]);
                                y[y.length - 1] && y[y.length - 1][0] < v && y.push([v, Aa])
                            }
                    });
                    for (i = 0; i < q.length; i++) k.push(c ? d - q[i][1] : q[i][0], c ? e - q[i][0] : q[i][1]);
                    for (i = m.length - 1; i >= 0; i--) k.push(c ? d - m[i][1] : m[i][0], c ? e - m[i][0] : m[i][1]);
                    k.length || k.push(H(h[0].plotX), H(h[0].plotY));
                    g.push([k.join(",")])
                });
                return g
            },
            createArea: function() {
                var a, b = this,
                    c = b.chart,
                    d = b.getAreaCoords(),
                    e = c.imagemap,
                    f = e.firstChild,
                    g = [],
                    h;
                s(d, function(i) {
                    h = /^[0-9]+,[0-9]+$/.test(i[0]);
                    a = W("area", {
                        shape: h ? "circle" : "poly",
                        chart: c,
                        coords: i[0] + (h ? ",10" : ""),
                        onmouseover: function() {
                            if (b.visible) {
                                var k = c.hoverSeries;
                                c.hoverPoint = i[1];
                                b.options.events.mouseOver && Ga(b, "mouseOver", {
                                    point: c.hoverPoint
                                });
                                k && k != b && k.setState();
                                !/(column|bar|pie)/.test(b.type) && e.childNodes[1] && e.insertBefore(this, e.childNodes[1]);
                                b.setState("hover");
                                c.hoverSeries = b
                            }
                        },
                        onmouseout: function() {
                            var k = c.hoverSeries;
                            k && k.options.events.mouseOut && Ga(k, "mouseOut")
                        }
                    });
                    if (b.options.cursor == "pointer") a.href = "javascript:;";
                    f ? e.insertBefore(a, f) : e.appendChild(a);
                    g.push(a)
                });
                b.areas = g
            }
        };
        var ac = Wa(Ca, {
                type: "area"
            }),
            Nb = Wa(Ca, {
                type: "spline",
                translate: function() {
                    var a = this;
                    Ca.prototype.translate.apply(a, arguments);
                    a.splinedata = a.getSplineData()
                },
                drawLine: function() {
                    var a = this,
                        b = a.segments;
                    a.segments = a.splinedata;
                    Ca.prototype.drawLine.apply(a, arguments);
                    a.segments = b
                },
                getSplineData: function() {
                    var a = this,
                        b = a.chart,
                        c = [],
                        d;
                    s(a.segments, function(e) {
                        if (a.xAxis.reversed) e = Ab(e);
                        var f = [],
                            g, h;
                        s(e, function(i, k) {
                            g = e[k + 2] || e[k + 1] || i;
                            h = e[k - 2] || e[k - 1] || i;
                            g.plotX > 0 && h.plotY <
                                b.plotWidth && f.push(i)
                        });
                        if (f.length > 1) d = H(ma.max(b.plotWidth, f[f.length - 1].clientX - f[0].clientX) / 3);
                        c.push(d ? (new Vb(f)).get(d) : [])
                    });
                    return a.splinedata = c
                }
            });
        Vb.prototype = {
            get: function(a) {
                a || (a = 50);
                var b = this.n;
                b = (this.xdata[b - 1] - this.xdata[0]) / (a - 1);
                var c = [],
                    d = [];
                c[0] = this.xdata[0];
                d[0] = this.ydata[0];
                for (var e = [{
                        plotX: c[0],
                        plotY: d[0]
                    }], f = 1; f < a; f++) {
                    c[f] = c[0] + f * b;
                    d[f] = this.interpolate(c[f]);
                    e[f] = {
                        plotX: c[f],
                        plotY: d[f]
                    }
                }
                return e
            },
            interpolate: function(a) {
                for (var b = this.n - 1, c = 0; b - c > 1;) {
                    var d = (b + c) /
                        2;
                    if (this.xdata[Da(d)] > a) b = d;
                    else c = d
                }
                b = Da(b);
                c = Da(c);
                d = this.xdata[b] - this.xdata[c];
                var e = (this.xdata[b] - a) / d;
                a = (a - this.xdata[c]) / d;
                return e * this.ydata[c] + a * this.ydata[b] + ((e * e * e - e) * this.y2[c] + (a * a * a - a) * this.y2[b]) * d * d / 6
            }
        };
        var bc = Wa(Nb, {
                type: "areaspline"
            }),
            Bb = Wa(Ca, {
                type: "column",
                init: function() {
                    Ca.prototype.init.apply(this, arguments);
                    var a = this.chart;
                    if (a.columnCount && !this.options.stacking) a.columnCount++;
                    else a.columnCount = 1;
                    this.columnNumber = a.columnCount
                },
                translate: function() {
                    Ca.prototype.translate.apply(this);
                    var a = this,
                        b = a.options,
                        c = a.data,
                        d = a.chart,
                        e = d.inverted,
                        f = d.plotWidth,
                        g = d.plotHeight,
                        h = Ba(c[1] ? c[1].plotX - c[0].plotX : e ? g : f),
                        i = h * b.groupPadding,
                        k = h - 2 * i;
                    k = k / d.columnCount;
                    b = k * b.pointPadding;
                    var q = k - 2 * b;
                    d = d.options.xAxis.reversed ? d.columnCount - a.columnNumber : a.columnNumber - 1;
                    var m = -(h / 2) + i + d * k + b,
                        y = a.yAxis.translate(0);
                    s(c, function(n) {
                        n.plotX += m;
                        n.w = q;
                        n.y0 = (e ? f : g) - y;
                        n.h = (n.yBottom || n.y0) - n.plotY
                    })
                },
                drawLine: function() {},
                getSymbol: function() {},
                drawPoints: function(a) {
                    var b = this,
                        c = b.options,
                        d = b.chart,
                        e = c.animation &&
                        b.animate,
                        f = d.inverted,
                        g = b.data,
                        h = b.stateLayers[a],
                        i;
                    e && this.animate(true);
                    s(g, function(k) {
                        i = k.h;
                        if (k.plotY !== ga) h.drawRect(f ? d.plotWidth - k.plotY - k.h : k.plotX, f ? d.plotHeight - k.plotX - k.w : k.h >= 0 ? k.plotY : k.plotY + k.h, f ? k.h : k.w, f ? k.w : Ba(k.h), c.borderColor, c.borderWidth, c.borderRadius, k.color || b.color, c.shadow)
                    });
                    e && b.animate()
                },
                drawPointState: function(a, b) {
                    var c = this,
                        d = c.chart,
                        e = c.options,
                        f = a ? a.options : null,
                        g = d.inverted,
                        h = c.singlePointLayer;
                    if (!h) h = c.singlePointLayer = new ja("single-point-layer", c.layerGroup.div);
                    h.clear();
                    if (b && e.states[b]) {
                        b = Q(e, e.states[b], f);
                        h.drawRect(g ? d.plotWidth - a.plotY - a.h : a.plotX, g ? d.plotHeight - a.plotX - a.w : a.plotY, g ? a.h : a.w, g ? a.w : a.h, b.borderColor, b.borderWidth, b.borderRadius, Ib(b.color || this.color).brighten(b.brightness).get(), b.shadow)
                    }
                },
                getAreaCoords: function() {
                    var a = [],
                        b = this.chart,
                        c = b.inverted;
                    s(this.data, function(d) {
                        var e = c ? b.plotWidth - d.plotY - d.h : d.plotX,
                            f = c ? b.plotHeight - d.plotX - d.w : d.plotY,
                            g = f + (c ? d.w : d.h),
                            h = e + (c ? d.h : d.w);
                        a.push([Ra([e, g, e, f, h, f, h, g], H).join(","), d])
                    });
                    return a
                },
                animate: function(a) {
                    var b = this,
                        c = b.chart,
                        d = c.inverted,
                        e = b.layerGroup.div;
                    if (a) e.style[d ? "left" : "top"] = (d ? -c.plotWidth : c.plotHeight) + E;
                    else {
                        yb(e, c.inverted ? {
                            left: 0
                        } : {
                            top: 0
                        });
                        b.animate = null
                    }
                }
            }),
            cc = Wa(Bb, {
                type: "bar",
                init: function(a) {
                    a.inverted = this.inverted = true;
                    Bb.prototype.init.apply(this, arguments)
                }
            }),
            ec = Wa(Ca, {
                type: "scatter",
                getAreaCoords: function() {
                    var a = this.data,
                        b = [];
                    s(a, function(c) {
                        b.push([
                            [H(c.plotX), H(c.plotY)].join(","), c
                        ])
                    });
                    return b
                }
            }),
            dc = Wa(Ca, {
                type: "pie",
                isCartesian: false,
                getColor: function() {},
                translate: function() {
                    var a = 0,
                        b = this,
                        c = -0.25,
                        d = b.options,
                        e = d.slicedOffset,
                        f = d.center,
                        g = b.chart,
                        h = b.data,
                        i = 2 * ma.PI,
                        k, q = g.options.colors;
                    f.push(d.size);
                    f = Ra(f, function(m, y) {
                        return /%$/.test(m) ? g["plot" + (y ? "Height" : "Width")] * parseInt(m) / 100 : m
                    });
                    s(h, function(m) {
                        a += m.y
                    });
                    s(h, function(m) {
                        k = a ? m.y / a : 0;
                        m.start = c * i;
                        c += k;
                        m.end = c * i;
                        m.percentage = k * 100;
                        m.center = [f[0], f[1]];
                        m.size = f[2];
                        var y = (m.end + m.start) / 2;
                        m.centerSliced = Ra([wb(y) * e + f[0], xb(y) * e + f[1]], H);
                        if (!m.color) m.color = q[cb++];
                        if (cb >= q.length) cb = 0;
                        if (m.visible ===
                            ga) m.visible = 1;
                        if (!m.layer) m.layer = new ja("pie", b.layerGroup.div);
                        m.setState = function(n) {
                            b.drawPointState(m, n)
                        };
                        m.setVisible = function(n) {
                            var x = (m.visible = n = n === ga ? !m.visible : n) ? "show" : "hide",
                                V = m.legendItem;
                            m.layer[x]();
                            if (V) V.className = n ? "" : Fa
                        }
                    });
                    this.setTooltipPoints()
                },
                render: function() {
                    this.pointsDrawn || this.drawPoints();
                    this.drawDataLabels()
                },
                drawPoints: function() {
                    var a = this;
                    s(this.data, function(b) {
                        a.drawPoint(b, b.layer.getCtx(), b.color)
                    });
                    a.pointsDrawn = true
                },
                getSymbol: function() {},
                drawPointState: function(a,
                    b) {
                    var c = this,
                        d = c.options,
                        e;
                    if (a) {
                        e = a.stateLayer;
                        if (!e) e = a.stateLayer = new ja("state-layer", a.layer.div);
                        e.clear();
                        if (b && c.options.states[b]) {
                            b = Q(d, d.states[b]);
                            this.drawPoint(a, e.getCtx(), b.color || a.color, b.brightness)
                        }
                    }
                    c.hoverPoint && c.hoverPoint.stateLayer.clear();
                    c.hoverPoint = a
                },
                drawPoint: function(a, b, c, d) {
                    var e = a.sliced ? a.centerSliced : a.center,
                        f = e[0];
                    e = e[1];
                    var g = a.size,
                        h = xa && a.percentage == 100 ? a.start : a.end;
                    if (a.y > 0) {
                        b.fillStyle = Ib(c).brighten(d).get(b);
                        b.beginPath();
                        b.moveTo(f, e);
                        b.arc(f, e, g /
                            2, a.start, h, false);
                        b.lineTo(f, e);
                        b.closePath();
                        b.fill()
                    }
                },
                getAreaCoords: function() {
                    var a = [];
                    s(this.data, function(b) {
                        for (var c = b.center[0], d = b.center[1], e = b.size / 2, f = b.start, g = b.end, h = [], i = f; i; i += 0.25) {
                            if (i >= g) i = g;
                            h = h.concat([c + wb(i) * e, d + xb(i) * e]);
                            if (i >= g) break
                        }
                        h = h.concat([c, d]);
                        b.tooltipPos = [c + 2 * wb((f + g) / 2) * e / 3, d + 2 * xb((f + g) / 2) * e / 3];
                        a.push([Ra(h, H).join(","), b])
                    });
                    return a
                }
            });
        Highcharts = {
            numberFormat: Zb,
            dateFormat: Lb,
            setOptions: Yb,
            Chart: $b
        }
    })();
