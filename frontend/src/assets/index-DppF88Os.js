(function() {
    const c = document.createElement("link").relList;
    if (c && c.supports && c.supports("modulepreload")) return;
    for (const f of document.querySelectorAll('link[rel="modulepreload"]')) u(f);
    new MutationObserver(f => {
        for (const p of f)
            if (p.type === "childList")
                for (const x of p.addedNodes) x.tagName === "LINK" && x.rel === "modulepreload" && u(x)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(f) {
        const p = {};
        return f.integrity && (p.integrity = f.integrity), f.referrerPolicy && (p.referrerPolicy = f.referrerPolicy), f.crossOrigin === "use-credentials" ? p.credentials = "include" : f.crossOrigin === "anonymous" ? p.credentials = "omit" : p.credentials = "same-origin", p
    }

    function u(f) {
        if (f.ep) return;
        f.ep = !0;
        const p = o(f);
        fetch(f.href, p)
    }
})();

function lp(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s
}
var Ko = {
        exports: {}
    },
    Yn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ym;

function np() {
    if (ym) return Yn;
    ym = 1;
    var s = Symbol.for("react.transitional.element"),
        c = Symbol.for("react.fragment");

    function o(u, f, p) {
        var x = null;
        if (p !== void 0 && (x = "" + p), f.key !== void 0 && (x = "" + f.key), "key" in f) {
            p = {};
            for (var v in f) v !== "key" && (p[v] = f[v])
        } else p = f;
        return f = p.ref, {
            $$typeof: s,
            type: u,
            key: x,
            ref: f !== void 0 ? f : null,
            props: p
        }
    }
    return Yn.Fragment = c, Yn.jsx = o, Yn.jsxs = o, Yn
}
var bm;

function ip() {
    return bm || (bm = 1, Ko.exports = np()), Ko.exports
}
var n = ip(),
    Jo = {
        exports: {}
    },
    ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vm;

function sp() {
    if (vm) return ue;
    vm = 1;
    var s = Symbol.for("react.transitional.element"),
        c = Symbol.for("react.portal"),
        o = Symbol.for("react.fragment"),
        u = Symbol.for("react.strict_mode"),
        f = Symbol.for("react.profiler"),
        p = Symbol.for("react.consumer"),
        x = Symbol.for("react.context"),
        v = Symbol.for("react.forward_ref"),
        m = Symbol.for("react.suspense"),
        g = Symbol.for("react.memo"),
        y = Symbol.for("react.lazy"),
        A = Symbol.iterator;

    function C(j) {
        return j === null || typeof j != "object" ? null : (j = A && j[A] || j["@@iterator"], typeof j == "function" ? j : null)
    }
    var G = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        },
        O = Object.assign,
        V = {};

    function E(j, Y, W) {
        this.props = j, this.context = Y, this.refs = V, this.updater = W || G
    }
    E.prototype.isReactComponent = {}, E.prototype.setState = function(j, Y) {
        if (typeof j != "object" && typeof j != "function" && j != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, j, Y, "setState")
    }, E.prototype.forceUpdate = function(j) {
        this.updater.enqueueForceUpdate(this, j, "forceUpdate")
    };

    function D() {}
    D.prototype = E.prototype;

    function L(j, Y, W) {
        this.props = j, this.context = Y, this.refs = V, this.updater = W || G
    }
    var q = L.prototype = new D;
    q.constructor = L, O(q, E.prototype), q.isPureReactComponent = !0;
    var X = Array.isArray,
        z = {
            H: null,
            A: null,
            T: null,
            S: null,
            V: null
        },
        K = Object.prototype.hasOwnProperty;

    function $(j, Y, W, J, le, ye) {
        return W = ye.ref, {
            $$typeof: s,
            type: j,
            key: Y,
            ref: W !== void 0 ? W : null,
            props: ye
        }
    }

    function P(j, Y) {
        return $(j.type, Y, void 0, void 0, void 0, j.props)
    }

    function re(j) {
        return typeof j == "object" && j !== null && j.$$typeof === s
    }

    function Q(j) {
        var Y = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + j.replace(/[=:]/g, function(W) {
            return Y[W]
        })
    }
    var te = /\/+/g;

    function me(j, Y) {
        return typeof j == "object" && j !== null && j.key != null ? Q("" + j.key) : Y.toString(36)
    }

    function je() {}

    function et(j) {
        switch (j.status) {
            case "fulfilled":
                return j.value;
            case "rejected":
                throw j.reason;
            default:
                switch (typeof j.status == "string" ? j.then(je, je) : (j.status = "pending", j.then(function(Y) {
                    j.status === "pending" && (j.status = "fulfilled", j.value = Y)
                }, function(Y) {
                    j.status === "pending" && (j.status = "rejected", j.reason = Y)
                })), j.status) {
                    case "fulfilled":
                        return j.value;
                    case "rejected":
                        throw j.reason
                }
        }
        throw j
    }

    function xe(j, Y, W, J, le) {
        var ye = typeof j;
        (ye === "undefined" || ye === "boolean") && (j = null);
        var ce = !1;
        if (j === null) ce = !0;
        else switch (ye) {
            case "bigint":
            case "string":
            case "number":
                ce = !0;
                break;
            case "object":
                switch (j.$$typeof) {
                    case s:
                    case c:
                        ce = !0;
                        break;
                    case y:
                        return ce = j._init, xe(ce(j._payload), Y, W, J, le)
                }
        }
        if (ce) return le = le(j), ce = J === "" ? "." + me(j, 0) : J, X(le) ? (W = "", ce != null && (W = ce.replace(te, "$&/") + "/"), xe(le, Y, W, "", function(oa) {
            return oa
        })) : le != null && (re(le) && (le = P(le, W + (le.key == null || j && j.key === le.key ? "" : ("" + le.key).replace(te, "$&/") + "/") + ce)), Y.push(le)), 1;
        ce = 0;
        var ot = J === "" ? "." : J + ":";
        if (X(j))
            for (var Ce = 0; Ce < j.length; Ce++) J = j[Ce], ye = ot + me(J, Ce), ce += xe(J, Y, W, ye, le);
        else if (Ce = C(j), typeof Ce == "function")
            for (j = Ce.call(j), Ce = 0; !(J = j.next()).done;) J = J.value, ye = ot + me(J, Ce++), ce += xe(J, Y, W, ye, le);
        else if (ye === "object") {
            if (typeof j.then == "function") return xe(et(j), Y, W, J, le);
            throw Y = String(j), Error("Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead.")
        }
        return ce
    }

    function R(j, Y, W) {
        if (j == null) return j;
        var J = [],
            le = 0;
        return xe(j, J, "", "", function(ye) {
            return Y.call(W, ye, le++)
        }), J
    }

    function Z(j) {
        if (j._status === -1) {
            var Y = j._result;
            Y = Y(), Y.then(function(W) {
                (j._status === 0 || j._status === -1) && (j._status = 1, j._result = W)
            }, function(W) {
                (j._status === 0 || j._status === -1) && (j._status = 2, j._result = W)
            }), j._status === -1 && (j._status = 0, j._result = Y)
        }
        if (j._status === 1) return j._result.default;
        throw j._result
    }
    var I = typeof reportError == "function" ? reportError : function(j) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var Y = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
                error: j
            });
            if (!window.dispatchEvent(Y)) return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", j);
            return
        }
        console.error(j)
    };

    function ke() {}
    return ue.Children = {
        map: R,
        forEach: function(j, Y, W) {
            R(j, function() {
                Y.apply(this, arguments)
            }, W)
        },
        count: function(j) {
            var Y = 0;
            return R(j, function() {
                Y++
            }), Y
        },
        toArray: function(j) {
            return R(j, function(Y) {
                return Y
            }) || []
        },
        only: function(j) {
            if (!re(j)) throw Error("React.Children.only expected to receive a single React element child.");
            return j
        }
    }, ue.Component = E, ue.Fragment = o, ue.Profiler = f, ue.PureComponent = L, ue.StrictMode = u, ue.Suspense = m, ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = z, ue.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(j) {
            return z.H.useMemoCache(j)
        }
    }, ue.cache = function(j) {
        return function() {
            return j.apply(null, arguments)
        }
    }, ue.cloneElement = function(j, Y, W) {
        if (j == null) throw Error("The argument must be a React element, but you passed " + j + ".");
        var J = O({}, j.props),
            le = j.key,
            ye = void 0;
        if (Y != null)
            for (ce in Y.ref !== void 0 && (ye = void 0), Y.key !== void 0 && (le = "" + Y.key), Y) !K.call(Y, ce) || ce === "key" || ce === "__self" || ce === "__source" || ce === "ref" && Y.ref === void 0 || (J[ce] = Y[ce]);
        var ce = arguments.length - 2;
        if (ce === 1) J.children = W;
        else if (1 < ce) {
            for (var ot = Array(ce), Ce = 0; Ce < ce; Ce++) ot[Ce] = arguments[Ce + 2];
            J.children = ot
        }
        return $(j.type, le, void 0, void 0, ye, J)
    }, ue.createContext = function(j) {
        return j = {
            $$typeof: x,
            _currentValue: j,
            _currentValue2: j,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, j.Provider = j, j.Consumer = {
            $$typeof: p,
            _context: j
        }, j
    }, ue.createElement = function(j, Y, W) {
        var J, le = {},
            ye = null;
        if (Y != null)
            for (J in Y.key !== void 0 && (ye = "" + Y.key), Y) K.call(Y, J) && J !== "key" && J !== "__self" && J !== "__source" && (le[J] = Y[J]);
        var ce = arguments.length - 2;
        if (ce === 1) le.children = W;
        else if (1 < ce) {
            for (var ot = Array(ce), Ce = 0; Ce < ce; Ce++) ot[Ce] = arguments[Ce + 2];
            le.children = ot
        }
        if (j && j.defaultProps)
            for (J in ce = j.defaultProps, ce) le[J] === void 0 && (le[J] = ce[J]);
        return $(j, ye, void 0, void 0, null, le)
    }, ue.createRef = function() {
        return {
            current: null
        }
    }, ue.forwardRef = function(j) {
        return {
            $$typeof: v,
            render: j
        }
    }, ue.isValidElement = re, ue.lazy = function(j) {
        return {
            $$typeof: y,
            _payload: {
                _status: -1,
                _result: j
            },
            _init: Z
        }
    }, ue.memo = function(j, Y) {
        return {
            $$typeof: g,
            type: j,
            compare: Y === void 0 ? null : Y
        }
    }, ue.startTransition = function(j) {
        var Y = z.T,
            W = {};
        z.T = W;
        try {
            var J = j(),
                le = z.S;
            le !== null && le(W, J), typeof J == "object" && J !== null && typeof J.then == "function" && J.then(ke, I)
        } catch (ye) {
            I(ye)
        } finally {
            z.T = Y
        }
    }, ue.unstable_useCacheRefresh = function() {
        return z.H.useCacheRefresh()
    }, ue.use = function(j) {
        return z.H.use(j)
    }, ue.useActionState = function(j, Y, W) {
        return z.H.useActionState(j, Y, W)
    }, ue.useCallback = function(j, Y) {
        return z.H.useCallback(j, Y)
    }, ue.useContext = function(j) {
        return z.H.useContext(j)
    }, ue.useDebugValue = function() {}, ue.useDeferredValue = function(j, Y) {
        return z.H.useDeferredValue(j, Y)
    }, ue.useEffect = function(j, Y, W) {
        var J = z.H;
        if (typeof W == "function") throw Error("useEffect CRUD overload is not enabled in this build of React.");
        return J.useEffect(j, Y)
    }, ue.useId = function() {
        return z.H.useId()
    }, ue.useImperativeHandle = function(j, Y, W) {
        return z.H.useImperativeHandle(j, Y, W)
    }, ue.useInsertionEffect = function(j, Y) {
        return z.H.useInsertionEffect(j, Y)
    }, ue.useLayoutEffect = function(j, Y) {
        return z.H.useLayoutEffect(j, Y)
    }, ue.useMemo = function(j, Y) {
        return z.H.useMemo(j, Y)
    }, ue.useOptimistic = function(j, Y) {
        return z.H.useOptimistic(j, Y)
    }, ue.useReducer = function(j, Y, W) {
        return z.H.useReducer(j, Y, W)
    }, ue.useRef = function(j) {
        return z.H.useRef(j)
    }, ue.useState = function(j) {
        return z.H.useState(j)
    }, ue.useSyncExternalStore = function(j, Y, W) {
        return z.H.useSyncExternalStore(j, Y, W)
    }, ue.useTransition = function() {
        return z.H.useTransition()
    }, ue.version = "19.1.0", ue
}
var jm;

function hc() {
    return jm || (jm = 1, Jo.exports = sp()), Jo.exports
}
var N = hc();
const oe = lp(N);
var Wo = {
        exports: {}
    },
    Xn = {},
    Fo = {
        exports: {}
    },
    Po = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nm;

function rp() {
    return Nm || (Nm = 1, function(s) {
        function c(R, Z) {
            var I = R.length;
            R.push(Z);
            e: for (; 0 < I;) {
                var ke = I - 1 >>> 1,
                    j = R[ke];
                if (0 < f(j, Z)) R[ke] = Z, R[I] = j, I = ke;
                else break e
            }
        }

        function o(R) {
            return R.length === 0 ? null : R[0]
        }

        function u(R) {
            if (R.length === 0) return null;
            var Z = R[0],
                I = R.pop();
            if (I !== Z) {
                R[0] = I;
                e: for (var ke = 0, j = R.length, Y = j >>> 1; ke < Y;) {
                    var W = 2 * (ke + 1) - 1,
                        J = R[W],
                        le = W + 1,
                        ye = R[le];
                    if (0 > f(J, I)) le < j && 0 > f(ye, J) ? (R[ke] = ye, R[le] = I, ke = le) : (R[ke] = J, R[W] = I, ke = W);
                    else if (le < j && 0 > f(ye, I)) R[ke] = ye, R[le] = I, ke = le;
                    else break e
                }
            }
            return Z
        }

        function f(R, Z) {
            var I = R.sortIndex - Z.sortIndex;
            return I !== 0 ? I : R.id - Z.id
        }
        if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
            var p = performance;
            s.unstable_now = function() {
                return p.now()
            }
        } else {
            var x = Date,
                v = x.now();
            s.unstable_now = function() {
                return x.now() - v
            }
        }
        var m = [],
            g = [],
            y = 1,
            A = null,
            C = 3,
            G = !1,
            O = !1,
            V = !1,
            E = !1,
            D = typeof setTimeout == "function" ? setTimeout : null,
            L = typeof clearTimeout == "function" ? clearTimeout : null,
            q = typeof setImmediate < "u" ? setImmediate : null;

        function X(R) {
            for (var Z = o(g); Z !== null;) {
                if (Z.callback === null) u(g);
                else if (Z.startTime <= R) u(g), Z.sortIndex = Z.expirationTime, c(m, Z);
                else break;
                Z = o(g)
            }
        }

        function z(R) {
            if (V = !1, X(R), !O)
                if (o(m) !== null) O = !0, K || (K = !0, me());
                else {
                    var Z = o(g);
                    Z !== null && xe(z, Z.startTime - R)
                }
        }
        var K = !1,
            $ = -1,
            P = 5,
            re = -1;

        function Q() {
            return E ? !0 : !(s.unstable_now() - re < P)
        }

        function te() {
            if (E = !1, K) {
                var R = s.unstable_now();
                re = R;
                var Z = !0;
                try {
                    e: {
                        O = !1,
                        V && (V = !1, L($), $ = -1),
                        G = !0;
                        var I = C;
                        try {
                            t: {
                                for (X(R), A = o(m); A !== null && !(A.expirationTime > R && Q());) {
                                    var ke = A.callback;
                                    if (typeof ke == "function") {
                                        A.callback = null, C = A.priorityLevel;
                                        var j = ke(A.expirationTime <= R);
                                        if (R = s.unstable_now(), typeof j == "function") {
                                            A.callback = j, X(R), Z = !0;
                                            break t
                                        }
                                        A === o(m) && u(m), X(R)
                                    } else u(m);
                                    A = o(m)
                                }
                                if (A !== null) Z = !0;
                                else {
                                    var Y = o(g);
                                    Y !== null && xe(z, Y.startTime - R), Z = !1
                                }
                            }
                            break e
                        }
                        finally {
                            A = null, C = I, G = !1
                        }
                        Z = void 0
                    }
                }
                finally {
                    Z ? me() : K = !1
                }
            }
        }
        var me;
        if (typeof q == "function") me = function() {
            q(te)
        };
        else if (typeof MessageChannel < "u") {
            var je = new MessageChannel,
                et = je.port2;
            je.port1.onmessage = te, me = function() {
                et.postMessage(null)
            }
        } else me = function() {
            D(te, 0)
        };

        function xe(R, Z) {
            $ = D(function() {
                R(s.unstable_now())
            }, Z)
        }
        s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(R) {
            R.callback = null
        }, s.unstable_forceFrameRate = function(R) {
            0 > R || 125 < R ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < R ? Math.floor(1e3 / R) : 5
        }, s.unstable_getCurrentPriorityLevel = function() {
            return C
        }, s.unstable_next = function(R) {
            switch (C) {
                case 1:
                case 2:
                case 3:
                    var Z = 3;
                    break;
                default:
                    Z = C
            }
            var I = C;
            C = Z;
            try {
                return R()
            } finally {
                C = I
            }
        }, s.unstable_requestPaint = function() {
            E = !0
        }, s.unstable_runWithPriority = function(R, Z) {
            switch (R) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    R = 3
            }
            var I = C;
            C = R;
            try {
                return Z()
            } finally {
                C = I
            }
        }, s.unstable_scheduleCallback = function(R, Z, I) {
            var ke = s.unstable_now();
            switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? ke + I : ke) : I = ke, R) {
                case 1:
                    var j = -1;
                    break;
                case 2:
                    j = 250;
                    break;
                case 5:
                    j = 1073741823;
                    break;
                case 4:
                    j = 1e4;
                    break;
                default:
                    j = 5e3
            }
            return j = I + j, R = {
                id: y++,
                callback: Z,
                priorityLevel: R,
                startTime: I,
                expirationTime: j,
                sortIndex: -1
            }, I > ke ? (R.sortIndex = I, c(g, R), o(m) === null && R === o(g) && (V ? (L($), $ = -1) : V = !0, xe(z, I - ke))) : (R.sortIndex = j, c(m, R), O || G || (O = !0, K || (K = !0, me()))), R
        }, s.unstable_shouldYield = Q, s.unstable_wrapCallback = function(R) {
            var Z = C;
            return function() {
                var I = C;
                C = Z;
                try {
                    return R.apply(this, arguments)
                } finally {
                    C = I
                }
            }
        }
    }(Po)), Po
}
var wm;

function op() {
    return wm || (wm = 1, Fo.exports = rp()), Fo.exports
}
var Io = {
        exports: {}
    },
    Ie = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;

function cp() {
    if (Em) return Ie;
    Em = 1;
    var s = hc();

    function c(m) {
        var g = "https://react.dev/errors/" + m;
        if (1 < arguments.length) {
            g += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var y = 2; y < arguments.length; y++) g += "&args[]=" + encodeURIComponent(arguments[y])
        }
        return "Minified React error #" + m + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function o() {}
    var u = {
            d: {
                f: o,
                r: function() {
                    throw Error(c(522))
                },
                D: o,
                C: o,
                L: o,
                m: o,
                X: o,
                S: o,
                M: o
            },
            p: 0,
            findDOMNode: null
        },
        f = Symbol.for("react.portal");

    function p(m, g, y) {
        var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: f,
            key: A == null ? null : "" + A,
            children: m,
            containerInfo: g,
            implementation: y
        }
    }
    var x = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    function v(m, g) {
        if (m === "font") return "";
        if (typeof g == "string") return g === "use-credentials" ? g : ""
    }
    return Ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, Ie.createPortal = function(m, g) {
        var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11) throw Error(c(299));
        return p(m, g, null, y)
    }, Ie.flushSync = function(m) {
        var g = x.T,
            y = u.p;
        try {
            if (x.T = null, u.p = 2, m) return m()
        } finally {
            x.T = g, u.p = y, u.d.f()
        }
    }, Ie.preconnect = function(m, g) {
        typeof m == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, u.d.C(m, g))
    }, Ie.prefetchDNS = function(m) {
        typeof m == "string" && u.d.D(m)
    }, Ie.preinit = function(m, g) {
        if (typeof m == "string" && g && typeof g.as == "string") {
            var y = g.as,
                A = v(y, g.crossOrigin),
                C = typeof g.integrity == "string" ? g.integrity : void 0,
                G = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
            y === "style" ? u.d.S(m, typeof g.precedence == "string" ? g.precedence : void 0, {
                crossOrigin: A,
                integrity: C,
                fetchPriority: G
            }) : y === "script" && u.d.X(m, {
                crossOrigin: A,
                integrity: C,
                fetchPriority: G,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0
            })
        }
    }, Ie.preinitModule = function(m, g) {
        if (typeof m == "string")
            if (typeof g == "object" && g !== null) {
                if (g.as == null || g.as === "script") {
                    var y = v(g.as, g.crossOrigin);
                    u.d.M(m, {
                        crossOrigin: y,
                        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                        nonce: typeof g.nonce == "string" ? g.nonce : void 0
                    })
                }
            } else g == null && u.d.M(m)
    }, Ie.preload = function(m, g) {
        if (typeof m == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
            var y = g.as,
                A = v(y, g.crossOrigin);
            u.d.L(m, y, {
                crossOrigin: A,
                integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0,
                type: typeof g.type == "string" ? g.type : void 0,
                fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
                referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
                imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
                imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
                media: typeof g.media == "string" ? g.media : void 0
            })
        }
    }, Ie.preloadModule = function(m, g) {
        if (typeof m == "string")
            if (g) {
                var y = v(g.as, g.crossOrigin);
                u.d.m(m, {
                    as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
                    crossOrigin: y,
                    integrity: typeof g.integrity == "string" ? g.integrity : void 0
                })
            } else u.d.m(m)
    }, Ie.requestFormReset = function(m) {
        u.d.r(m)
    }, Ie.unstable_batchedUpdates = function(m, g) {
        return m(g)
    }, Ie.useFormState = function(m, g, y) {
        return x.H.useFormState(m, g, y)
    }, Ie.useFormStatus = function() {
        return x.H.useHostTransitionStatus()
    }, Ie.version = "19.1.0", Ie
}
var Sm;

function up() {
    if (Sm) return Io.exports;
    Sm = 1;

    function s() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)
        } catch (c) {
            console.error(c)
        }
    }
    return s(), Io.exports = cp(), Io.exports
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _m;

function dp() {
    if (_m) return Xn;
    _m = 1;
    var s = op(),
        c = hc(),
        o = up();

    function u(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(arguments[a])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function f(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }

    function p(e) {
        var t = e,
            a = e;
        if (e.alternate)
            for (; t.return;) t = t.return;
        else {
            e = t;
            do t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return; while (e)
        }
        return t.tag === 3 ? a : null
    }

    function x(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
        }
        return null
    }

    function v(e) {
        if (p(e) !== e) throw Error(u(188))
    }

    function m(e) {
        var t = e.alternate;
        if (!t) {
            if (t = p(e), t === null) throw Error(u(188));
            return t !== e ? null : e
        }
        for (var a = e, l = t;;) {
            var i = a.return;
            if (i === null) break;
            var r = i.alternate;
            if (r === null) {
                if (l = i.return, l !== null) {
                    a = l;
                    continue
                }
                break
            }
            if (i.child === r.child) {
                for (r = i.child; r;) {
                    if (r === a) return v(i), e;
                    if (r === l) return v(i), t;
                    r = r.sibling
                }
                throw Error(u(188))
            }
            if (a.return !== l.return) a = i, l = r;
            else {
                for (var d = !1, h = i.child; h;) {
                    if (h === a) {
                        d = !0, a = i, l = r;
                        break
                    }
                    if (h === l) {
                        d = !0, l = i, a = r;
                        break
                    }
                    h = h.sibling
                }
                if (!d) {
                    for (h = r.child; h;) {
                        if (h === a) {
                            d = !0, a = r, l = i;
                            break
                        }
                        if (h === l) {
                            d = !0, l = r, a = i;
                            break
                        }
                        h = h.sibling
                    }
                    if (!d) throw Error(u(189))
                }
            }
            if (a.alternate !== l) throw Error(u(190))
        }
        if (a.tag !== 3) throw Error(u(188));
        return a.stateNode.current === a ? e : t
    }

    function g(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e;
        for (e = e.child; e !== null;) {
            if (t = g(e), t !== null) return t;
            e = e.sibling
        }
        return null
    }
    var y = Object.assign,
        A = Symbol.for("react.element"),
        C = Symbol.for("react.transitional.element"),
        G = Symbol.for("react.portal"),
        O = Symbol.for("react.fragment"),
        V = Symbol.for("react.strict_mode"),
        E = Symbol.for("react.profiler"),
        D = Symbol.for("react.provider"),
        L = Symbol.for("react.consumer"),
        q = Symbol.for("react.context"),
        X = Symbol.for("react.forward_ref"),
        z = Symbol.for("react.suspense"),
        K = Symbol.for("react.suspense_list"),
        $ = Symbol.for("react.memo"),
        P = Symbol.for("react.lazy"),
        re = Symbol.for("react.activity"),
        Q = Symbol.for("react.memo_cache_sentinel"),
        te = Symbol.iterator;

    function me(e) {
        return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null)
    }
    var je = Symbol.for("react.client.reference");

    function et(e) {
        if (e == null) return null;
        if (typeof e == "function") return e.$$typeof === je ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
            case O:
                return "Fragment";
            case E:
                return "Profiler";
            case V:
                return "StrictMode";
            case z:
                return "Suspense";
            case K:
                return "SuspenseList";
            case re:
                return "Activity"
        }
        if (typeof e == "object") switch (e.$$typeof) {
            case G:
                return "Portal";
            case q:
                return (e.displayName || "Context") + ".Provider";
            case L:
                return (e._context.displayName || "Context") + ".Consumer";
            case X:
                var t = e.render;
                return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case $:
                return t = e.displayName || null, t !== null ? t : et(e.type) || "Memo";
            case P:
                t = e._payload, e = e._init;
                try {
                    return et(e(t))
                } catch {}
        }
        return null
    }
    var xe = Array.isArray,
        R = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        Z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        I = {
            pending: !1,
            data: null,
            method: null,
            action: null
        },
        ke = [],
        j = -1;

    function Y(e) {
        return {
            current: e
        }
    }

    function W(e) {
        0 > j || (e.current = ke[j], ke[j] = null, j--)
    }

    function J(e, t) {
        j++, ke[j] = e.current, e.current = t
    }
    var le = Y(null),
        ye = Y(null),
        ce = Y(null),
        ot = Y(null);

    function Ce(e, t) {
        switch (J(ce, t), J(ye, e), J(le, null), t.nodeType) {
            case 9:
            case 11:
                e = (e = t.documentElement) && (e = e.namespaceURI) ? Zf(e) : 0;
                break;
            default:
                if (e = t.tagName, t = t.namespaceURI) t = Zf(t), e = $f(t, e);
                else switch (e) {
                    case "svg":
                        e = 1;
                        break;
                    case "math":
                        e = 2;
                        break;
                    default:
                        e = 0
                }
        }
        W(le), J(le, e)
    }

    function oa() {
        W(le), W(ye), W(ce)
    }

    function Rs(e) {
        e.memoizedState !== null && J(ot, e);
        var t = le.current,
            a = $f(t, e.type);
        t !== a && (J(ye, e), J(le, a))
    }

    function ti(e) {
        ye.current === e && (W(le), W(ye)), ot.current === e && (W(ot), qn._currentValue = I)
    }
    var Os = Object.prototype.hasOwnProperty,
        Ds = s.unstable_scheduleCallback,
        zs = s.unstable_cancelCallback,
        z0 = s.unstable_shouldYield,
        B0 = s.unstable_requestPaint,
        Ct = s.unstable_now,
        q0 = s.unstable_getCurrentPriorityLevel,
        Sc = s.unstable_ImmediatePriority,
        _c = s.unstable_UserBlockingPriority,
        ai = s.unstable_NormalPriority,
        U0 = s.unstable_LowPriority,
        Tc = s.unstable_IdlePriority,
        L0 = s.log,
        H0 = s.unstable_setDisableYieldValue,
        Vl = null,
        ct = null;

    function ca(e) {
        if (typeof L0 == "function" && H0(e), ct && typeof ct.setStrictMode == "function") try {
            ct.setStrictMode(Vl, e)
        } catch {}
    }
    var ut = Math.clz32 ? Math.clz32 : X0,
        G0 = Math.log,
        Y0 = Math.LN2;

    function X0(e) {
        return e >>>= 0, e === 0 ? 32 : 31 - (G0(e) / Y0 | 0) | 0
    }
    var li = 256,
        ni = 4194304;

    function za(e) {
        var t = e & 42;
        if (t !== 0) return t;
        switch (e & -e) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 4:
                return 4;
            case 8:
                return 8;
            case 16:
                return 16;
            case 32:
                return 32;
            case 64:
                return 64;
            case 128:
                return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return e & 4194048;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return e & 62914560;
            case 67108864:
                return 67108864;
            case 134217728:
                return 134217728;
            case 268435456:
                return 268435456;
            case 536870912:
                return 536870912;
            case 1073741824:
                return 0;
            default:
                return e
        }
    }

    function ii(e, t, a) {
        var l = e.pendingLanes;
        if (l === 0) return 0;
        var i = 0,
            r = e.suspendedLanes,
            d = e.pingedLanes;
        e = e.warmLanes;
        var h = l & 134217727;
        return h !== 0 ? (l = h & ~r, l !== 0 ? i = za(l) : (d &= h, d !== 0 ? i = za(d) : a || (a = h & ~e, a !== 0 && (i = za(a))))) : (h = l & ~r, h !== 0 ? i = za(h) : d !== 0 ? i = za(d) : a || (a = l & ~e, a !== 0 && (i = za(a)))), i === 0 ? 0 : t !== 0 && t !== i && (t & r) === 0 && (r = i & -i, a = t & -t, r >= a || r === 32 && (a & 4194048) !== 0) ? t : i
    }

    function Ql(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }

    function V0(e, t) {
        switch (e) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
                return t + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return t + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return -1;
            case 67108864:
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
                return -1;
            default:
                return -1
        }
    }

    function kc() {
        var e = li;
        return li <<= 1, (li & 4194048) === 0 && (li = 256), e
    }

    function Ac() {
        var e = ni;
        return ni <<= 1, (ni & 62914560) === 0 && (ni = 4194304), e
    }

    function Bs(e) {
        for (var t = [], a = 0; 31 > a; a++) t.push(e);
        return t
    }

    function Zl(e, t) {
        e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
    }

    function Q0(e, t, a, l, i, r) {
        var d = e.pendingLanes;
        e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
        var h = e.entanglements,
            b = e.expirationTimes,
            T = e.hiddenUpdates;
        for (a = d & ~a; 0 < a;) {
            var B = 31 - ut(a),
                H = 1 << B;
            h[B] = 0, b[B] = -1;
            var k = T[B];
            if (k !== null)
                for (T[B] = null, B = 0; B < k.length; B++) {
                    var M = k[B];
                    M !== null && (M.lane &= -536870913)
                }
            a &= ~H
        }
        l !== 0 && Mc(e, l, 0), r !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(d & ~t))
    }

    function Mc(e, t, a) {
        e.pendingLanes |= t, e.suspendedLanes &= ~t;
        var l = 31 - ut(t);
        e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 4194090
    }

    function Cc(e, t) {
        var a = e.entangledLanes |= t;
        for (e = e.entanglements; a;) {
            var l = 31 - ut(a),
                i = 1 << l;
            i & t | e[l] & t && (e[l] |= t), a &= ~i
        }
    }

    function qs(e) {
        switch (e) {
            case 2:
                e = 1;
                break;
            case 8:
                e = 4;
                break;
            case 32:
                e = 16;
                break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                e = 128;
                break;
            case 268435456:
                e = 134217728;
                break;
            default:
                e = 0
        }
        return e
    }

    function Us(e) {
        return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }

    function Rc() {
        var e = Z.p;
        return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : fm(e.type))
    }

    function Z0(e, t) {
        var a = Z.p;
        try {
            return Z.p = e, t()
        } finally {
            Z.p = a
        }
    }
    var ua = Math.random().toString(36).slice(2),
        Fe = "__reactFiber$" + ua,
        lt = "__reactProps$" + ua,
        al = "__reactContainer$" + ua,
        Ls = "__reactEvents$" + ua,
        $0 = "__reactListeners$" + ua,
        K0 = "__reactHandles$" + ua,
        Oc = "__reactResources$" + ua,
        $l = "__reactMarker$" + ua;

    function Hs(e) {
        delete e[Fe], delete e[lt], delete e[Ls], delete e[$0], delete e[K0]
    }

    function ll(e) {
        var t = e[Fe];
        if (t) return t;
        for (var a = e.parentNode; a;) {
            if (t = a[al] || a[Fe]) {
                if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
                    for (e = Ff(e); e !== null;) {
                        if (a = e[Fe]) return a;
                        e = Ff(e)
                    }
                return t
            }
            e = a, a = e.parentNode
        }
        return null
    }

    function nl(e) {
        if (e = e[Fe] || e[al]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3) return e
        }
        return null
    }

    function Kl(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
        throw Error(u(33))
    }

    function il(e) {
        var t = e[Oc];
        return t || (t = e[Oc] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }), t
    }

    function Ve(e) {
        e[$l] = !0
    }
    var Dc = new Set,
        zc = {};

    function Ba(e, t) {
        sl(e, t), sl(e + "Capture", t)
    }

    function sl(e, t) {
        for (zc[e] = t, e = 0; e < t.length; e++) Dc.add(t[e])
    }
    var J0 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
        Bc = {},
        qc = {};

    function W0(e) {
        return Os.call(qc, e) ? !0 : Os.call(Bc, e) ? !1 : J0.test(e) ? qc[e] = !0 : (Bc[e] = !0, !1)
    }

    function si(e, t, a) {
        if (W0(t))
            if (a === null) e.removeAttribute(t);
            else {
                switch (typeof a) {
                    case "undefined":
                    case "function":
                    case "symbol":
                        e.removeAttribute(t);
                        return;
                    case "boolean":
                        var l = t.toLowerCase().slice(0, 5);
                        if (l !== "data-" && l !== "aria-") {
                            e.removeAttribute(t);
                            return
                        }
                }
                e.setAttribute(t, "" + a)
            }
    }

    function ri(e, t, a) {
        if (a === null) e.removeAttribute(t);
        else {
            switch (typeof a) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(t);
                    return
            }
            e.setAttribute(t, "" + a)
        }
    }

    function Lt(e, t, a, l) {
        if (l === null) e.removeAttribute(a);
        else {
            switch (typeof l) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(a);
                    return
            }
            e.setAttributeNS(t, a, "" + l)
        }
    }
    var Gs, Uc;

    function rl(e) {
        if (Gs === void 0) try {
            throw Error()
        } catch (a) {
            var t = a.stack.trim().match(/\n( *(at )?)/);
            Gs = t && t[1] || "", Uc = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : ""
        }
        return `
` + Gs + e + Uc
    }
    var Ys = !1;

    function Xs(e, t) {
        if (!e || Ys) return "";
        Ys = !0;
        var a = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var l = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var H = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(H.prototype, "props", {
                                    set: function() {
                                        throw Error()
                                    }
                                }), typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(H, [])
                                } catch (M) {
                                    var k = M
                                }
                                Reflect.construct(e, [], H)
                            } else {
                                try {
                                    H.call()
                                } catch (M) {
                                    k = M
                                }
                                e.call(H.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (M) {
                                k = M
                            }(H = e()) && typeof H.catch == "function" && H.catch(function() {})
                        }
                    } catch (M) {
                        if (M && k && typeof M.stack == "string") return [M.stack, k.stack]
                    }
                    return [null, null]
                }
            };
            l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var i = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
            i && i.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var r = l.DetermineComponentFrameRoot(),
                d = r[0],
                h = r[1];
            if (d && h) {
                var b = d.split(`
`),
                    T = h.split(`
`);
                for (i = l = 0; l < b.length && !b[l].includes("DetermineComponentFrameRoot");) l++;
                for (; i < T.length && !T[i].includes("DetermineComponentFrameRoot");) i++;
                if (l === b.length || i === T.length)
                    for (l = b.length - 1, i = T.length - 1; 1 <= l && 0 <= i && b[l] !== T[i];) i--;
                for (; 1 <= l && 0 <= i; l--, i--)
                    if (b[l] !== T[i]) {
                        if (l !== 1 || i !== 1)
                            do
                                if (l--, i--, 0 > i || b[l] !== T[i]) {
                                    var B = `
` + b[l].replace(" at new ", " at ");
                                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B
                                }
                        while (1 <= l && 0 <= i);
                        break
                    }
            }
        } finally {
            Ys = !1, Error.prepareStackTrace = a
        }
        return (a = e ? e.displayName || e.name : "") ? rl(a) : ""
    }

    function F0(e) {
        switch (e.tag) {
            case 26:
            case 27:
            case 5:
                return rl(e.type);
            case 16:
                return rl("Lazy");
            case 13:
                return rl("Suspense");
            case 19:
                return rl("SuspenseList");
            case 0:
            case 15:
                return Xs(e.type, !1);
            case 11:
                return Xs(e.type.render, !1);
            case 1:
                return Xs(e.type, !0);
            case 31:
                return rl("Activity");
            default:
                return ""
        }
    }

    function Lc(e) {
        try {
            var t = "";
            do t += F0(e), e = e.return; while (e);
            return t
        } catch (a) {
            return `
Error generating stack: ` + a.message + `
` + a.stack
        }
    }

    function yt(e) {
        switch (typeof e) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return e;
            case "object":
                return e;
            default:
                return ""
        }
    }

    function Hc(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }

    function P0(e) {
        var t = Hc(e) ? "checked" : "value",
            a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            l = "" + e[t];
        if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
            var i = a.get,
                r = a.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return i.call(this)
                },
                set: function(d) {
                    l = "" + d, r.call(this, d)
                }
            }), Object.defineProperty(e, t, {
                enumerable: a.enumerable
            }), {
                getValue: function() {
                    return l
                },
                setValue: function(d) {
                    l = "" + d
                },
                stopTracking: function() {
                    e._valueTracker = null, delete e[t]
                }
            }
        }
    }

    function oi(e) {
        e._valueTracker || (e._valueTracker = P0(e))
    }

    function Gc(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var a = t.getValue(),
            l = "";
        return e && (l = Hc(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1
    }

    function ci(e) {
        if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var I0 = /[\n"\\]/g;

    function bt(e) {
        return e.replace(I0, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }

    function Vs(e, t, a, l, i, r, d, h) {
        e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Qs(e, d, yt(t)) : a != null ? Qs(e, d, yt(a)) : l != null && e.removeAttribute("value"), i == null && r != null && (e.defaultChecked = !!r), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + yt(h) : e.removeAttribute("name")
    }

    function Yc(e, t, a, l, i, r, d, h) {
        if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || a != null) {
            if (!(r !== "submit" && r !== "reset" || t != null)) return;
            a = a != null ? "" + yt(a) : "", t = t != null ? "" + yt(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t
        }
        l = l ? ? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = h ? e.checked : !!l, e.defaultChecked = !!l, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d)
    }

    function Qs(e, t, a) {
        t === "number" && ci(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a)
    }

    function ol(e, t, a, l) {
        if (e = e.options, t) {
            t = {};
            for (var i = 0; i < a.length; i++) t["$" + a[i]] = !0;
            for (a = 0; a < e.length; a++) i = t.hasOwnProperty("$" + e[a].value), e[a].selected !== i && (e[a].selected = i), i && l && (e[a].defaultSelected = !0)
        } else {
            for (a = "" + yt(a), t = null, i = 0; i < e.length; i++) {
                if (e[i].value === a) {
                    e[i].selected = !0, l && (e[i].defaultSelected = !0);
                    return
                }
                t !== null || e[i].disabled || (t = e[i])
            }
            t !== null && (t.selected = !0)
        }
    }

    function Xc(e, t, a) {
        if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), a == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = a != null ? "" + yt(a) : ""
    }

    function Vc(e, t, a, l) {
        if (t == null) {
            if (l != null) {
                if (a != null) throw Error(u(92));
                if (xe(l)) {
                    if (1 < l.length) throw Error(u(93));
                    l = l[0]
                }
                a = l
            }
            a == null && (a = ""), t = a
        }
        a = yt(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l)
    }

    function cl(e, t) {
        if (t) {
            var a = e.firstChild;
            if (a && a === e.lastChild && a.nodeType === 3) {
                a.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var eh = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));

    function Qc(e, t, a) {
        var l = t.indexOf("--") === 0;
        a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || eh.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px"
    }

    function Zc(e, t, a) {
        if (t != null && typeof t != "object") throw Error(u(62));
        if (e = e.style, a != null) {
            for (var l in a) !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
            for (var i in t) l = t[i], t.hasOwnProperty(i) && a[i] !== l && Qc(e, i, l)
        } else
            for (var r in t) t.hasOwnProperty(r) && Qc(e, r, t[r])
    }

    function Zs(e) {
        if (e.indexOf("-") === -1) return !1;
        switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0
        }
    }
    var th = new Map([
            ["acceptCharset", "accept-charset"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
            ["crossOrigin", "crossorigin"],
            ["accentHeight", "accent-height"],
            ["alignmentBaseline", "alignment-baseline"],
            ["arabicForm", "arabic-form"],
            ["baselineShift", "baseline-shift"],
            ["capHeight", "cap-height"],
            ["clipPath", "clip-path"],
            ["clipRule", "clip-rule"],
            ["colorInterpolation", "color-interpolation"],
            ["colorInterpolationFilters", "color-interpolation-filters"],
            ["colorProfile", "color-profile"],
            ["colorRendering", "color-rendering"],
            ["dominantBaseline", "dominant-baseline"],
            ["enableBackground", "enable-background"],
            ["fillOpacity", "fill-opacity"],
            ["fillRule", "fill-rule"],
            ["floodColor", "flood-color"],
            ["floodOpacity", "flood-opacity"],
            ["fontFamily", "font-family"],
            ["fontSize", "font-size"],
            ["fontSizeAdjust", "font-size-adjust"],
            ["fontStretch", "font-stretch"],
            ["fontStyle", "font-style"],
            ["fontVariant", "font-variant"],
            ["fontWeight", "font-weight"],
            ["glyphName", "glyph-name"],
            ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
            ["glyphOrientationVertical", "glyph-orientation-vertical"],
            ["horizAdvX", "horiz-adv-x"],
            ["horizOriginX", "horiz-origin-x"],
            ["imageRendering", "image-rendering"],
            ["letterSpacing", "letter-spacing"],
            ["lightingColor", "lighting-color"],
            ["markerEnd", "marker-end"],
            ["markerMid", "marker-mid"],
            ["markerStart", "marker-start"],
            ["overlinePosition", "overline-position"],
            ["overlineThickness", "overline-thickness"],
            ["paintOrder", "paint-order"],
            ["panose-1", "panose-1"],
            ["pointerEvents", "pointer-events"],
            ["renderingIntent", "rendering-intent"],
            ["shapeRendering", "shape-rendering"],
            ["stopColor", "stop-color"],
            ["stopOpacity", "stop-opacity"],
            ["strikethroughPosition", "strikethrough-position"],
            ["strikethroughThickness", "strikethrough-thickness"],
            ["strokeDasharray", "stroke-dasharray"],
            ["strokeDashoffset", "stroke-dashoffset"],
            ["strokeLinecap", "stroke-linecap"],
            ["strokeLinejoin", "stroke-linejoin"],
            ["strokeMiterlimit", "stroke-miterlimit"],
            ["strokeOpacity", "stroke-opacity"],
            ["strokeWidth", "stroke-width"],
            ["textAnchor", "text-anchor"],
            ["textDecoration", "text-decoration"],
            ["textRendering", "text-rendering"],
            ["transformOrigin", "transform-origin"],
            ["underlinePosition", "underline-position"],
            ["underlineThickness", "underline-thickness"],
            ["unicodeBidi", "unicode-bidi"],
            ["unicodeRange", "unicode-range"],
            ["unitsPerEm", "units-per-em"],
            ["vAlphabetic", "v-alphabetic"],
            ["vHanging", "v-hanging"],
            ["vIdeographic", "v-ideographic"],
            ["vMathematical", "v-mathematical"],
            ["vectorEffect", "vector-effect"],
            ["vertAdvY", "vert-adv-y"],
            ["vertOriginX", "vert-origin-x"],
            ["vertOriginY", "vert-origin-y"],
            ["wordSpacing", "word-spacing"],
            ["writingMode", "writing-mode"],
            ["xmlnsXlink", "xmlns:xlink"],
            ["xHeight", "x-height"]
        ]),
        ah = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

    function ui(e) {
        return ah.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    var $s = null;

    function Ks(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
    }
    var ul = null,
        dl = null;

    function $c(e) {
        var t = nl(e);
        if (t && (e = t.stateNode)) {
            var a = e[lt] || null;
            e: switch (e = t.stateNode, t.type) {
                case "input":
                    if (Vs(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
                        for (a = e; a.parentNode;) a = a.parentNode;
                        for (a = a.querySelectorAll('input[name="' + bt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                            var l = a[t];
                            if (l !== e && l.form === e.form) {
                                var i = l[lt] || null;
                                if (!i) throw Error(u(90));
                                Vs(l, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name)
                            }
                        }
                        for (t = 0; t < a.length; t++) l = a[t], l.form === e.form && Gc(l)
                    }
                    break e;
                case "textarea":
                    Xc(e, a.value, a.defaultValue);
                    break e;
                case "select":
                    t = a.value, t != null && ol(e, !!a.multiple, t, !1)
            }
        }
    }
    var Js = !1;

    function Kc(e, t, a) {
        if (Js) return e(t, a);
        Js = !0;
        try {
            var l = e(t);
            return l
        } finally {
            if (Js = !1, (ul !== null || dl !== null) && (Ji(), ul && (t = ul, e = dl, dl = ul = null, $c(t), e)))
                for (t = 0; t < e.length; t++) $c(e[t])
        }
    }

    function Jl(e, t) {
        var a = e.stateNode;
        if (a === null) return null;
        var l = a[lt] || null;
        if (l === null) return null;
        a = l[t];
        e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
                break e;
            default:
                e = !1
        }
        if (e) return null;
        if (a && typeof a != "function") throw Error(u(231, t, typeof a));
        return a
    }
    var Ht = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
        Ws = !1;
    if (Ht) try {
        var Wl = {};
        Object.defineProperty(Wl, "passive", {
            get: function() {
                Ws = !0
            }
        }), window.addEventListener("test", Wl, Wl), window.removeEventListener("test", Wl, Wl)
    } catch {
        Ws = !1
    }
    var da = null,
        Fs = null,
        di = null;

    function Jc() {
        if (di) return di;
        var e, t = Fs,
            a = t.length,
            l, i = "value" in da ? da.value : da.textContent,
            r = i.length;
        for (e = 0; e < a && t[e] === i[e]; e++);
        var d = a - e;
        for (l = 1; l <= d && t[a - l] === i[r - l]; l++);
        return di = i.slice(e, 1 < l ? 1 - l : void 0)
    }

    function fi(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
    }

    function mi() {
        return !0
    }

    function Wc() {
        return !1
    }

    function nt(e) {
        function t(a, l, i, r, d) {
            this._reactName = a, this._targetInst = i, this.type = l, this.nativeEvent = r, this.target = d, this.currentTarget = null;
            for (var h in e) e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(r) : r[h]);
            return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? mi : Wc, this.isPropagationStopped = Wc, this
        }
        return y(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var a = this.nativeEvent;
                a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = mi)
            },
            stopPropagation: function() {
                var a = this.nativeEvent;
                a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = mi)
            },
            persist: function() {},
            isPersistent: mi
        }), t
    }
    var qa = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: 0,
            isTrusted: 0
        },
        hi = nt(qa),
        Fl = y({}, qa, {
            view: 0,
            detail: 0
        }),
        lh = nt(Fl),
        Ps, Is, Pl, gi = y({}, Fl, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: tr,
            button: 0,
            buttons: 0,
            relatedTarget: function(e) {
                return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
            },
            movementX: function(e) {
                return "movementX" in e ? e.movementX : (e !== Pl && (Pl && e.type === "mousemove" ? (Ps = e.screenX - Pl.screenX, Is = e.screenY - Pl.screenY) : Is = Ps = 0, Pl = e), Ps)
            },
            movementY: function(e) {
                return "movementY" in e ? e.movementY : Is
            }
        }),
        Fc = nt(gi),
        nh = y({}, gi, {
            dataTransfer: 0
        }),
        ih = nt(nh),
        sh = y({}, Fl, {
            relatedTarget: 0
        }),
        er = nt(sh),
        rh = y({}, qa, {
            animationName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        oh = nt(rh),
        ch = y({}, qa, {
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }),
        uh = nt(ch),
        dh = y({}, qa, {
            data: 0
        }),
        Pc = nt(dh),
        fh = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        },
        mh = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        },
        hh = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };

    function gh(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = hh[e]) ? !!t[e] : !1
    }

    function tr() {
        return gh
    }
    var ph = y({}, Fl, {
            key: function(e) {
                if (e.key) {
                    var t = fh[e.key] || e.key;
                    if (t !== "Unidentified") return t
                }
                return e.type === "keypress" ? (e = fi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mh[e.keyCode] || "Unidentified" : ""
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: tr,
            charCode: function(e) {
                return e.type === "keypress" ? fi(e) : 0
            },
            keyCode: function(e) {
                return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            },
            which: function(e) {
                return e.type === "keypress" ? fi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            }
        }),
        xh = nt(ph),
        yh = y({}, gi, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0
        }),
        Ic = nt(yh),
        bh = y({}, Fl, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: tr
        }),
        vh = nt(bh),
        jh = y({}, qa, {
            propertyName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        Nh = nt(jh),
        wh = y({}, gi, {
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: 0,
            deltaMode: 0
        }),
        Eh = nt(wh),
        Sh = y({}, qa, {
            newState: 0,
            oldState: 0
        }),
        _h = nt(Sh),
        Th = [9, 13, 27, 32],
        ar = Ht && "CompositionEvent" in window,
        Il = null;
    Ht && "documentMode" in document && (Il = document.documentMode);
    var kh = Ht && "TextEvent" in window && !Il,
        eu = Ht && (!ar || Il && 8 < Il && 11 >= Il),
        tu = " ",
        au = !1;

    function lu(e, t) {
        switch (e) {
            case "keyup":
                return Th.indexOf(t.keyCode) !== -1;
            case "keydown":
                return t.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1
        }
    }

    function nu(e) {
        return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
    }
    var fl = !1;

    function Ah(e, t) {
        switch (e) {
            case "compositionend":
                return nu(t);
            case "keypress":
                return t.which !== 32 ? null : (au = !0, tu);
            case "textInput":
                return e = t.data, e === tu && au ? null : e;
            default:
                return null
        }
    }

    function Mh(e, t) {
        if (fl) return e === "compositionend" || !ar && lu(e, t) ? (e = Jc(), di = Fs = da = null, fl = !1, e) : null;
        switch (e) {
            case "paste":
                return null;
            case "keypress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t.char && 1 < t.char.length) return t.char;
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "compositionend":
                return eu && t.locale !== "ko" ? null : t.data;
            default:
                return null
        }
    }
    var Ch = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };

    function iu(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Ch[e.type] : t === "textarea"
    }

    function su(e, t, a, l) {
        ul ? dl ? dl.push(l) : dl = [l] : ul = l, t = ts(t, "onChange"), 0 < t.length && (a = new hi("onChange", "change", null, a, l), e.push({
            event: a,
            listeners: t
        }))
    }
    var en = null,
        tn = null;

    function Rh(e) {
        Gf(e, 0)
    }

    function pi(e) {
        var t = Kl(e);
        if (Gc(t)) return e
    }

    function ru(e, t) {
        if (e === "change") return t
    }
    var ou = !1;
    if (Ht) {
        var lr;
        if (Ht) {
            var nr = "oninput" in document;
            if (!nr) {
                var cu = document.createElement("div");
                cu.setAttribute("oninput", "return;"), nr = typeof cu.oninput == "function"
            }
            lr = nr
        } else lr = !1;
        ou = lr && (!document.documentMode || 9 < document.documentMode)
    }

    function uu() {
        en && (en.detachEvent("onpropertychange", du), tn = en = null)
    }

    function du(e) {
        if (e.propertyName === "value" && pi(tn)) {
            var t = [];
            su(t, tn, e, Ks(e)), Kc(Rh, t)
        }
    }

    function Oh(e, t, a) {
        e === "focusin" ? (uu(), en = t, tn = a, en.attachEvent("onpropertychange", du)) : e === "focusout" && uu()
    }

    function Dh(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown") return pi(tn)
    }

    function zh(e, t) {
        if (e === "click") return pi(t)
    }

    function Bh(e, t) {
        if (e === "input" || e === "change") return pi(t)
    }

    function qh(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var dt = typeof Object.is == "function" ? Object.is : qh;

    function an(e, t) {
        if (dt(e, t)) return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
        var a = Object.keys(e),
            l = Object.keys(t);
        if (a.length !== l.length) return !1;
        for (l = 0; l < a.length; l++) {
            var i = a[l];
            if (!Os.call(t, i) || !dt(e[i], t[i])) return !1
        }
        return !0
    }

    function fu(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function mu(e, t) {
        var a = fu(e);
        e = 0;
        for (var l; a;) {
            if (a.nodeType === 3) {
                if (l = e + a.textContent.length, e <= t && l >= t) return {
                    node: a,
                    offset: t - e
                };
                e = l
            }
            e: {
                for (; a;) {
                    if (a.nextSibling) {
                        a = a.nextSibling;
                        break e
                    }
                    a = a.parentNode
                }
                a = void 0
            }
            a = fu(a)
        }
    }

    function hu(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? hu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }

    function gu(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = ci(e.document); t instanceof e.HTMLIFrameElement;) {
            try {
                var a = typeof t.contentWindow.location.href == "string"
            } catch {
                a = !1
            }
            if (a) e = t.contentWindow;
            else break;
            t = ci(e.document)
        }
        return t
    }

    function ir(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var Uh = Ht && "documentMode" in document && 11 >= document.documentMode,
        ml = null,
        sr = null,
        ln = null,
        rr = !1;

    function pu(e, t, a) {
        var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
        rr || ml == null || ml !== ci(l) || (l = ml, "selectionStart" in l && ir(l) ? l = {
            start: l.selectionStart,
            end: l.selectionEnd
        } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset
        }), ln && an(ln, l) || (ln = l, l = ts(sr, "onSelect"), 0 < l.length && (t = new hi("onSelect", "select", null, t, a), e.push({
            event: t,
            listeners: l
        }), t.target = ml)))
    }

    function Ua(e, t) {
        var a = {};
        return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a
    }
    var hl = {
            animationend: Ua("Animation", "AnimationEnd"),
            animationiteration: Ua("Animation", "AnimationIteration"),
            animationstart: Ua("Animation", "AnimationStart"),
            transitionrun: Ua("Transition", "TransitionRun"),
            transitionstart: Ua("Transition", "TransitionStart"),
            transitioncancel: Ua("Transition", "TransitionCancel"),
            transitionend: Ua("Transition", "TransitionEnd")
        },
        or = {},
        xu = {};
    Ht && (xu = document.createElement("div").style, "AnimationEvent" in window || (delete hl.animationend.animation, delete hl.animationiteration.animation, delete hl.animationstart.animation), "TransitionEvent" in window || delete hl.transitionend.transition);

    function La(e) {
        if (or[e]) return or[e];
        if (!hl[e]) return e;
        var t = hl[e],
            a;
        for (a in t)
            if (t.hasOwnProperty(a) && a in xu) return or[e] = t[a];
        return e
    }
    var yu = La("animationend"),
        bu = La("animationiteration"),
        vu = La("animationstart"),
        Lh = La("transitionrun"),
        Hh = La("transitionstart"),
        Gh = La("transitioncancel"),
        ju = La("transitionend"),
        Nu = new Map,
        cr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    cr.push("scrollEnd");

    function Tt(e, t) {
        Nu.set(e, t), Ba(t, [e])
    }
    var wu = new WeakMap;

    function vt(e, t) {
        if (typeof e == "object" && e !== null) {
            var a = wu.get(e);
            return a !== void 0 ? a : (t = {
                value: e,
                source: t,
                stack: Lc(t)
            }, wu.set(e, t), t)
        }
        return {
            value: e,
            source: t,
            stack: Lc(t)
        }
    }
    var jt = [],
        gl = 0,
        ur = 0;

    function xi() {
        for (var e = gl, t = ur = gl = 0; t < e;) {
            var a = jt[t];
            jt[t++] = null;
            var l = jt[t];
            jt[t++] = null;
            var i = jt[t];
            jt[t++] = null;
            var r = jt[t];
            if (jt[t++] = null, l !== null && i !== null) {
                var d = l.pending;
                d === null ? i.next = i : (i.next = d.next, d.next = i), l.pending = i
            }
            r !== 0 && Eu(a, i, r)
        }
    }

    function yi(e, t, a, l) {
        jt[gl++] = e, jt[gl++] = t, jt[gl++] = a, jt[gl++] = l, ur |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l)
    }

    function dr(e, t, a, l) {
        return yi(e, t, a, l), bi(e)
    }

    function pl(e, t) {
        return yi(e, null, null, t), bi(e)
    }

    function Eu(e, t, a) {
        e.lanes |= a;
        var l = e.alternate;
        l !== null && (l.lanes |= a);
        for (var i = !1, r = e.return; r !== null;) r.childLanes |= a, l = r.alternate, l !== null && (l.childLanes |= a), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (i = !0)), e = r, r = r.return;
        return e.tag === 3 ? (r = e.stateNode, i && t !== null && (i = 31 - ut(a), e = r.hiddenUpdates, l = e[i], l === null ? e[i] = [t] : l.push(t), t.lane = a | 536870912), r) : null
    }

    function bi(e) {
        if (50 < An) throw An = 0, yo = null, Error(u(185));
        for (var t = e.return; t !== null;) e = t, t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var xl = {};

    function Yh(e, t, a, l) {
        this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
    }

    function ft(e, t, a, l) {
        return new Yh(e, t, a, l)
    }

    function fr(e) {
        return e = e.prototype, !(!e || !e.isReactComponent)
    }

    function Gt(e, t) {
        var a = e.alternate;
        return a === null ? (a = ft(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a
    }

    function Su(e, t) {
        e.flags &= 65011714;
        var a = e.alternate;
        return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }), e
    }

    function vi(e, t, a, l, i, r) {
        var d = 0;
        if (l = e, typeof e == "function") fr(e) && (d = 1);
        else if (typeof e == "string") d = Vg(e, a, le.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else e: switch (e) {
            case re:
                return e = ft(31, a, t, i), e.elementType = re, e.lanes = r, e;
            case O:
                return Ha(a.children, i, r, t);
            case V:
                d = 8, i |= 24;
                break;
            case E:
                return e = ft(12, a, t, i | 2), e.elementType = E, e.lanes = r, e;
            case z:
                return e = ft(13, a, t, i), e.elementType = z, e.lanes = r, e;
            case K:
                return e = ft(19, a, t, i), e.elementType = K, e.lanes = r, e;
            default:
                if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                    case D:
                    case q:
                        d = 10;
                        break e;
                    case L:
                        d = 9;
                        break e;
                    case X:
                        d = 11;
                        break e;
                    case $:
                        d = 14;
                        break e;
                    case P:
                        d = 16, l = null;
                        break e
                }
                d = 29, a = Error(u(130, e === null ? "null" : typeof e, "")), l = null
        }
        return t = ft(d, a, t, i), t.elementType = e, t.type = l, t.lanes = r, t
    }

    function Ha(e, t, a, l) {
        return e = ft(7, e, l, t), e.lanes = a, e
    }

    function mr(e, t, a) {
        return e = ft(6, e, null, t), e.lanes = a, e
    }

    function hr(e, t, a) {
        return t = ft(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }
    var yl = [],
        bl = 0,
        ji = null,
        Ni = 0,
        Nt = [],
        wt = 0,
        Ga = null,
        Yt = 1,
        Xt = "";

    function Ya(e, t) {
        yl[bl++] = Ni, yl[bl++] = ji, ji = e, Ni = t
    }

    function _u(e, t, a) {
        Nt[wt++] = Yt, Nt[wt++] = Xt, Nt[wt++] = Ga, Ga = e;
        var l = Yt;
        e = Xt;
        var i = 32 - ut(l) - 1;
        l &= ~(1 << i), a += 1;
        var r = 32 - ut(t) + i;
        if (30 < r) {
            var d = i - i % 5;
            r = (l & (1 << d) - 1).toString(32), l >>= d, i -= d, Yt = 1 << 32 - ut(t) + i | a << i | l, Xt = r + e
        } else Yt = 1 << r | a << i | l, Xt = e
    }

    function gr(e) {
        e.return !== null && (Ya(e, 1), _u(e, 1, 0))
    }

    function pr(e) {
        for (; e === ji;) ji = yl[--bl], yl[bl] = null, Ni = yl[--bl], yl[bl] = null;
        for (; e === Ga;) Ga = Nt[--wt], Nt[wt] = null, Xt = Nt[--wt], Nt[wt] = null, Yt = Nt[--wt], Nt[wt] = null
    }
    var tt = null,
        ze = null,
        ve = !1,
        Xa = null,
        Rt = !1,
        xr = Error(u(519));

    function Va(e) {
        var t = Error(u(418, ""));
        throw rn(vt(t, e)), xr
    }

    function Tu(e) {
        var t = e.stateNode,
            a = e.type,
            l = e.memoizedProps;
        switch (t[Fe] = e, t[lt] = l, a) {
            case "dialog":
                ge("cancel", t), ge("close", t);
                break;
            case "iframe":
            case "object":
            case "embed":
                ge("load", t);
                break;
            case "video":
            case "audio":
                for (a = 0; a < Cn.length; a++) ge(Cn[a], t);
                break;
            case "source":
                ge("error", t);
                break;
            case "img":
            case "image":
            case "link":
                ge("error", t), ge("load", t);
                break;
            case "details":
                ge("toggle", t);
                break;
            case "input":
                ge("invalid", t), Yc(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0), oi(t);
                break;
            case "select":
                ge("invalid", t);
                break;
            case "textarea":
                ge("invalid", t), Vc(t, l.value, l.defaultValue, l.children), oi(t)
        }
        a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || Qf(t.textContent, a) ? (l.popover != null && (ge("beforetoggle", t), ge("toggle", t)), l.onScroll != null && ge("scroll", t), l.onScrollEnd != null && ge("scrollend", t), l.onClick != null && (t.onclick = as), t = !0) : t = !1, t || Va(e)
    }

    function ku(e) {
        for (tt = e.return; tt;) switch (tt.tag) {
            case 5:
            case 13:
                Rt = !1;
                return;
            case 27:
            case 3:
                Rt = !0;
                return;
            default:
                tt = tt.return
        }
    }

    function nn(e) {
        if (e !== tt) return !1;
        if (!ve) return ku(e), ve = !0, !1;
        var t = e.tag,
            a;
        if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Do(e.type, e.memoizedProps)), a = !a), a && ze && Va(e), ku(e), t === 13) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
            e: {
                for (e = e.nextSibling, t = 0; e;) {
                    if (e.nodeType === 8)
                        if (a = e.data, a === "/$") {
                            if (t === 0) {
                                ze = At(e.nextSibling);
                                break e
                            }
                            t--
                        } else a !== "$" && a !== "$!" && a !== "$?" || t++;
                    e = e.nextSibling
                }
                ze = null
            }
        } else t === 27 ? (t = ze, Ta(e.type) ? (e = Uo, Uo = null, ze = e) : ze = t) : ze = tt ? At(e.stateNode.nextSibling) : null;
        return !0
    }

    function sn() {
        ze = tt = null, ve = !1
    }

    function Au() {
        var e = Xa;
        return e !== null && (rt === null ? rt = e : rt.push.apply(rt, e), Xa = null), e
    }

    function rn(e) {
        Xa === null ? Xa = [e] : Xa.push(e)
    }
    var yr = Y(null),
        Qa = null,
        Vt = null;

    function fa(e, t, a) {
        J(yr, t._currentValue), t._currentValue = a
    }

    function Qt(e) {
        e._currentValue = yr.current, W(yr)
    }

    function br(e, t, a) {
        for (; e !== null;) {
            var l = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
            e = e.return
        }
    }

    function vr(e, t, a, l) {
        var i = e.child;
        for (i !== null && (i.return = e); i !== null;) {
            var r = i.dependencies;
            if (r !== null) {
                var d = i.child;
                r = r.firstContext;
                e: for (; r !== null;) {
                    var h = r;
                    r = i;
                    for (var b = 0; b < t.length; b++)
                        if (h.context === t[b]) {
                            r.lanes |= a, h = r.alternate, h !== null && (h.lanes |= a), br(r.return, a, e), l || (d = null);
                            break e
                        }
                    r = h.next
                }
            } else if (i.tag === 18) {
                if (d = i.return, d === null) throw Error(u(341));
                d.lanes |= a, r = d.alternate, r !== null && (r.lanes |= a), br(d, a, e), d = null
            } else d = i.child;
            if (d !== null) d.return = i;
            else
                for (d = i; d !== null;) {
                    if (d === e) {
                        d = null;
                        break
                    }
                    if (i = d.sibling, i !== null) {
                        i.return = d.return, d = i;
                        break
                    }
                    d = d.return
                }
            i = d
        }
    }

    function on(e, t, a, l) {
        e = null;
        for (var i = t, r = !1; i !== null;) {
            if (!r) {
                if ((i.flags & 524288) !== 0) r = !0;
                else if ((i.flags & 262144) !== 0) break
            }
            if (i.tag === 10) {
                var d = i.alternate;
                if (d === null) throw Error(u(387));
                if (d = d.memoizedProps, d !== null) {
                    var h = i.type;
                    dt(i.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h])
                }
            } else if (i === ot.current) {
                if (d = i.alternate, d === null) throw Error(u(387));
                d.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(qn) : e = [qn])
            }
            i = i.return
        }
        e !== null && vr(t, e, a, l), t.flags |= 262144
    }

    function wi(e) {
        for (e = e.firstContext; e !== null;) {
            if (!dt(e.context._currentValue, e.memoizedValue)) return !0;
            e = e.next
        }
        return !1
    }

    function Za(e) {
        Qa = e, Vt = null, e = e.dependencies, e !== null && (e.firstContext = null)
    }

    function Pe(e) {
        return Mu(Qa, e)
    }

    function Ei(e, t) {
        return Qa === null && Za(e), Mu(e, t)
    }

    function Mu(e, t) {
        var a = t._currentValue;
        if (t = {
                context: t,
                memoizedValue: a,
                next: null
            }, Vt === null) {
            if (e === null) throw Error(u(308));
            Vt = t, e.dependencies = {
                lanes: 0,
                firstContext: t
            }, e.flags |= 524288
        } else Vt = Vt.next = t;
        return a
    }
    var Xh = typeof AbortController < "u" ? AbortController : function() {
            var e = [],
                t = this.signal = {
                    aborted: !1,
                    addEventListener: function(a, l) {
                        e.push(l)
                    }
                };
            this.abort = function() {
                t.aborted = !0, e.forEach(function(a) {
                    return a()
                })
            }
        },
        Vh = s.unstable_scheduleCallback,
        Qh = s.unstable_NormalPriority,
        Ge = {
            $$typeof: q,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0
        };

    function jr() {
        return {
            controller: new Xh,
            data: new Map,
            refCount: 0
        }
    }

    function cn(e) {
        e.refCount--, e.refCount === 0 && Vh(Qh, function() {
            e.controller.abort()
        })
    }
    var un = null,
        Nr = 0,
        vl = 0,
        jl = null;

    function Zh(e, t) {
        if (un === null) {
            var a = un = [];
            Nr = 0, vl = So(), jl = {
                status: "pending",
                value: void 0,
                then: function(l) {
                    a.push(l)
                }
            }
        }
        return Nr++, t.then(Cu, Cu), t
    }

    function Cu() {
        if (--Nr === 0 && un !== null) {
            jl !== null && (jl.status = "fulfilled");
            var e = un;
            un = null, vl = 0, jl = null;
            for (var t = 0; t < e.length; t++)(0, e[t])()
        }
    }

    function $h(e, t) {
        var a = [],
            l = {
                status: "pending",
                value: null,
                reason: null,
                then: function(i) {
                    a.push(i)
                }
            };
        return e.then(function() {
            l.status = "fulfilled", l.value = t;
            for (var i = 0; i < a.length; i++)(0, a[i])(t)
        }, function(i) {
            for (l.status = "rejected", l.reason = i, i = 0; i < a.length; i++)(0, a[i])(void 0)
        }), l
    }
    var Ru = R.S;
    R.S = function(e, t) {
        typeof t == "object" && t !== null && typeof t.then == "function" && Zh(e, t), Ru !== null && Ru(e, t)
    };
    var $a = Y(null);

    function wr() {
        var e = $a.current;
        return e !== null ? e : Me.pooledCache
    }

    function Si(e, t) {
        t === null ? J($a, $a.current) : J($a, t.pool)
    }

    function Ou() {
        var e = wr();
        return e === null ? null : {
            parent: Ge._currentValue,
            pool: e
        }
    }
    var dn = Error(u(460)),
        Du = Error(u(474)),
        _i = Error(u(542)),
        Er = {
            then: function() {}
        };

    function zu(e) {
        return e = e.status, e === "fulfilled" || e === "rejected"
    }

    function Ti() {}

    function Bu(e, t, a) {
        switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(Ti, Ti), t = a), t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason, Uu(e), e;
            default:
                if (typeof t.status == "string") t.then(Ti, Ti);
                else {
                    if (e = Me, e !== null && 100 < e.shellSuspendCounter) throw Error(u(482));
                    e = t, e.status = "pending", e.then(function(l) {
                        if (t.status === "pending") {
                            var i = t;
                            i.status = "fulfilled", i.value = l
                        }
                    }, function(l) {
                        if (t.status === "pending") {
                            var i = t;
                            i.status = "rejected", i.reason = l
                        }
                    })
                }
                switch (t.status) {
                    case "fulfilled":
                        return t.value;
                    case "rejected":
                        throw e = t.reason, Uu(e), e
                }
                throw fn = t, dn
        }
    }
    var fn = null;

    function qu() {
        if (fn === null) throw Error(u(459));
        var e = fn;
        return fn = null, e
    }

    function Uu(e) {
        if (e === dn || e === _i) throw Error(u(483))
    }
    var ma = !1;

    function Sr(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }

    function _r(e, t) {
        e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }

    function ha(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }

    function ga(e, t, a) {
        var l = e.updateQueue;
        if (l === null) return null;
        if (l = l.shared, (Ne & 2) !== 0) {
            var i = l.pending;
            return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, t = bi(e), Eu(e, null, a), t
        }
        return yi(e, l, t, a), bi(e)
    }

    function mn(e, t, a) {
        if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
            var l = t.lanes;
            l &= e.pendingLanes, a |= l, t.lanes = a, Cc(e, a)
        }
    }

    function Tr(e, t) {
        var a = e.updateQueue,
            l = e.alternate;
        if (l !== null && (l = l.updateQueue, a === l)) {
            var i = null,
                r = null;
            if (a = a.firstBaseUpdate, a !== null) {
                do {
                    var d = {
                        lane: a.lane,
                        tag: a.tag,
                        payload: a.payload,
                        callback: null,
                        next: null
                    };
                    r === null ? i = r = d : r = r.next = d, a = a.next
                } while (a !== null);
                r === null ? i = r = t : r = r.next = t
            } else i = r = t;
            a = {
                baseState: l.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: r,
                shared: l.shared,
                callbacks: l.callbacks
            }, e.updateQueue = a;
            return
        }
        e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t
    }
    var kr = !1;

    function hn() {
        if (kr) {
            var e = jl;
            if (e !== null) throw e
        }
    }

    function gn(e, t, a, l) {
        kr = !1;
        var i = e.updateQueue;
        ma = !1;
        var r = i.firstBaseUpdate,
            d = i.lastBaseUpdate,
            h = i.shared.pending;
        if (h !== null) {
            i.shared.pending = null;
            var b = h,
                T = b.next;
            b.next = null, d === null ? r = T : d.next = T, d = b;
            var B = e.alternate;
            B !== null && (B = B.updateQueue, h = B.lastBaseUpdate, h !== d && (h === null ? B.firstBaseUpdate = T : h.next = T, B.lastBaseUpdate = b))
        }
        if (r !== null) {
            var H = i.baseState;
            d = 0, B = T = b = null, h = r;
            do {
                var k = h.lane & -536870913,
                    M = k !== h.lane;
                if (M ? (pe & k) === k : (l & k) === k) {
                    k !== 0 && k === vl && (kr = !0), B !== null && (B = B.next = {
                        lane: 0,
                        tag: h.tag,
                        payload: h.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var se = e,
                            ne = h;k = t;
                        var _e = a;
                        switch (ne.tag) {
                            case 1:
                                if (se = ne.payload, typeof se == "function") {
                                    H = se.call(_e, H, k);
                                    break e
                                }
                                H = se;
                                break e;
                            case 3:
                                se.flags = se.flags & -65537 | 128;
                            case 0:
                                if (se = ne.payload, k = typeof se == "function" ? se.call(_e, H, k) : se, k == null) break e;
                                H = y({}, H, k);
                                break e;
                            case 2:
                                ma = !0
                        }
                    }
                    k = h.callback, k !== null && (e.flags |= 64, M && (e.flags |= 8192), M = i.callbacks, M === null ? i.callbacks = [k] : M.push(k))
                } else M = {
                    lane: k,
                    tag: h.tag,
                    payload: h.payload,
                    callback: h.callback,
                    next: null
                }, B === null ? (T = B = M, b = H) : B = B.next = M, d |= k;
                if (h = h.next, h === null) {
                    if (h = i.shared.pending, h === null) break;
                    M = h, h = M.next, M.next = null, i.lastBaseUpdate = M, i.shared.pending = null
                }
            } while (!0);
            B === null && (b = H), i.baseState = b, i.firstBaseUpdate = T, i.lastBaseUpdate = B, r === null && (i.shared.lanes = 0), wa |= d, e.lanes = d, e.memoizedState = H
        }
    }

    function Lu(e, t) {
        if (typeof e != "function") throw Error(u(191, e));
        e.call(t)
    }

    function Hu(e, t) {
        var a = e.callbacks;
        if (a !== null)
            for (e.callbacks = null, e = 0; e < a.length; e++) Lu(a[e], t)
    }
    var Nl = Y(null),
        ki = Y(0);

    function Gu(e, t) {
        e = Pt, J(ki, e), J(Nl, t), Pt = e | t.baseLanes
    }

    function Ar() {
        J(ki, Pt), J(Nl, Nl.current)
    }

    function Mr() {
        Pt = ki.current, W(Nl), W(ki)
    }
    var pa = 0,
        de = null,
        Ee = null,
        Le = null,
        Ai = !1,
        wl = !1,
        Ka = !1,
        Mi = 0,
        pn = 0,
        El = null,
        Kh = 0;

    function qe() {
        throw Error(u(321))
    }

    function Cr(e, t) {
        if (t === null) return !1;
        for (var a = 0; a < t.length && a < e.length; a++)
            if (!dt(e[a], t[a])) return !1;
        return !0
    }

    function Rr(e, t, a, l, i, r) {
        return pa = r, de = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, R.H = e === null || e.memoizedState === null ? Ed : Sd, Ka = !1, r = a(l, i), Ka = !1, wl && (r = Xu(t, a, l, i)), Yu(e), r
    }

    function Yu(e) {
        R.H = Bi;
        var t = Ee !== null && Ee.next !== null;
        if (pa = 0, Le = Ee = de = null, Ai = !1, pn = 0, El = null, t) throw Error(u(300));
        e === null || Qe || (e = e.dependencies, e !== null && wi(e) && (Qe = !0))
    }

    function Xu(e, t, a, l) {
        de = e;
        var i = 0;
        do {
            if (wl && (El = null), pn = 0, wl = !1, 25 <= i) throw Error(u(301));
            if (i += 1, Le = Ee = null, e.updateQueue != null) {
                var r = e.updateQueue;
                r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0)
            }
            R.H = tg, r = t(a, l)
        } while (wl);
        return r
    }

    function Jh() {
        var e = R.H,
            t = e.useState()[0];
        return t = typeof t.then == "function" ? xn(t) : t, e = e.useState()[0], (Ee !== null ? Ee.memoizedState : null) !== e && (de.flags |= 1024), t
    }

    function Or() {
        var e = Mi !== 0;
        return Mi = 0, e
    }

    function Dr(e, t, a) {
        t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a
    }

    function zr(e) {
        if (Ai) {
            for (e = e.memoizedState; e !== null;) {
                var t = e.queue;
                t !== null && (t.pending = null), e = e.next
            }
            Ai = !1
        }
        pa = 0, Le = Ee = de = null, wl = !1, pn = Mi = 0, El = null
    }

    function it() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return Le === null ? de.memoizedState = Le = e : Le = Le.next = e, Le
    }

    function He() {
        if (Ee === null) {
            var e = de.alternate;
            e = e !== null ? e.memoizedState : null
        } else e = Ee.next;
        var t = Le === null ? de.memoizedState : Le.next;
        if (t !== null) Le = t, Ee = e;
        else {
            if (e === null) throw de.alternate === null ? Error(u(467)) : Error(u(310));
            Ee = e, e = {
                memoizedState: Ee.memoizedState,
                baseState: Ee.baseState,
                baseQueue: Ee.baseQueue,
                queue: Ee.queue,
                next: null
            }, Le === null ? de.memoizedState = Le = e : Le = Le.next = e
        }
        return Le
    }

    function Br() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }

    function xn(e) {
        var t = pn;
        return pn += 1, El === null && (El = []), e = Bu(El, e, t), t = de, (Le === null ? t.memoizedState : Le.next) === null && (t = t.alternate, R.H = t === null || t.memoizedState === null ? Ed : Sd), e
    }

    function Ci(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function") return xn(e);
            if (e.$$typeof === q) return Pe(e)
        }
        throw Error(u(438, String(e)))
    }

    function qr(e) {
        var t = null,
            a = de.updateQueue;
        if (a !== null && (t = a.memoCache), t == null) {
            var l = de.alternate;
            l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
                data: l.data.map(function(i) {
                    return i.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
                data: [],
                index: 0
            }), a === null && (a = Br(), de.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
            for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = Q;
        return t.index++, a
    }

    function Zt(e, t) {
        return typeof t == "function" ? t(e) : t
    }

    function Ri(e) {
        var t = He();
        return Ur(t, Ee, e)
    }

    function Ur(e, t, a) {
        var l = e.queue;
        if (l === null) throw Error(u(311));
        l.lastRenderedReducer = a;
        var i = e.baseQueue,
            r = l.pending;
        if (r !== null) {
            if (i !== null) {
                var d = i.next;
                i.next = r.next, r.next = d
            }
            t.baseQueue = i = r, l.pending = null
        }
        if (r = e.baseState, i === null) e.memoizedState = r;
        else {
            t = i.next;
            var h = d = null,
                b = null,
                T = t,
                B = !1;
            do {
                var H = T.lane & -536870913;
                if (H !== T.lane ? (pe & H) === H : (pa & H) === H) {
                    var k = T.revertLane;
                    if (k === 0) b !== null && (b = b.next = {
                        lane: 0,
                        revertLane: 0,
                        action: T.action,
                        hasEagerState: T.hasEagerState,
                        eagerState: T.eagerState,
                        next: null
                    }), H === vl && (B = !0);
                    else if ((pa & k) === k) {
                        T = T.next, k === vl && (B = !0);
                        continue
                    } else H = {
                        lane: 0,
                        revertLane: T.revertLane,
                        action: T.action,
                        hasEagerState: T.hasEagerState,
                        eagerState: T.eagerState,
                        next: null
                    }, b === null ? (h = b = H, d = r) : b = b.next = H, de.lanes |= k, wa |= k;
                    H = T.action, Ka && a(r, H), r = T.hasEagerState ? T.eagerState : a(r, H)
                } else k = {
                    lane: H,
                    revertLane: T.revertLane,
                    action: T.action,
                    hasEagerState: T.hasEagerState,
                    eagerState: T.eagerState,
                    next: null
                }, b === null ? (h = b = k, d = r) : b = b.next = k, de.lanes |= H, wa |= H;
                T = T.next
            } while (T !== null && T !== t);
            if (b === null ? d = r : b.next = h, !dt(r, e.memoizedState) && (Qe = !0, B && (a = jl, a !== null))) throw a;
            e.memoizedState = r, e.baseState = d, e.baseQueue = b, l.lastRenderedState = r
        }
        return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch]
    }

    function Lr(e) {
        var t = He(),
            a = t.queue;
        if (a === null) throw Error(u(311));
        a.lastRenderedReducer = e;
        var l = a.dispatch,
            i = a.pending,
            r = t.memoizedState;
        if (i !== null) {
            a.pending = null;
            var d = i = i.next;
            do r = e(r, d.action), d = d.next; while (d !== i);
            dt(r, t.memoizedState) || (Qe = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), a.lastRenderedState = r
        }
        return [r, l]
    }

    function Vu(e, t, a) {
        var l = de,
            i = He(),
            r = ve;
        if (r) {
            if (a === void 0) throw Error(u(407));
            a = a()
        } else a = t();
        var d = !dt((Ee || i).memoizedState, a);
        d && (i.memoizedState = a, Qe = !0), i = i.queue;
        var h = $u.bind(null, l, i, e);
        if (yn(2048, 8, h, [e]), i.getSnapshot !== t || d || Le !== null && Le.memoizedState.tag & 1) {
            if (l.flags |= 2048, Sl(9, Oi(), Zu.bind(null, l, i, a, t), null), Me === null) throw Error(u(349));
            r || (pa & 124) !== 0 || Qu(l, t, a)
        }
        return a
    }

    function Qu(e, t, a) {
        e.flags |= 16384, e = {
            getSnapshot: t,
            value: a
        }, t = de.updateQueue, t === null ? (t = Br(), de.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e))
    }

    function Zu(e, t, a, l) {
        t.value = a, t.getSnapshot = l, Ku(t) && Ju(e)
    }

    function $u(e, t, a) {
        return a(function() {
            Ku(t) && Ju(e)
        })
    }

    function Ku(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var a = t();
            return !dt(e, a)
        } catch {
            return !0
        }
    }

    function Ju(e) {
        var t = pl(e, 2);
        t !== null && xt(t, e, 2)
    }

    function Hr(e) {
        var t = it();
        if (typeof e == "function") {
            var a = e;
            if (e = a(), Ka) {
                ca(!0);
                try {
                    a()
                } finally {
                    ca(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e, t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Zt,
            lastRenderedState: e
        }, t
    }

    function Wu(e, t, a, l) {
        return e.baseState = a, Ur(e, Ee, typeof l == "function" ? l : Zt)
    }

    function Wh(e, t, a, l, i) {
        if (zi(e)) throw Error(u(485));
        if (e = t.action, e !== null) {
            var r = {
                payload: i,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(d) {
                    r.listeners.push(d)
                }
            };
            R.T !== null ? a(!0) : r.isTransition = !1, l(r), a = t.pending, a === null ? (r.next = t.pending = r, Fu(t, r)) : (r.next = a.next, t.pending = a.next = r)
        }
    }

    function Fu(e, t) {
        var a = t.action,
            l = t.payload,
            i = e.state;
        if (t.isTransition) {
            var r = R.T,
                d = {};
            R.T = d;
            try {
                var h = a(i, l),
                    b = R.S;
                b !== null && b(d, h), Pu(e, t, h)
            } catch (T) {
                Gr(e, t, T)
            } finally {
                R.T = r
            }
        } else try {
            r = a(i, l), Pu(e, t, r)
        } catch (T) {
            Gr(e, t, T)
        }
    }

    function Pu(e, t, a) {
        a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(l) {
            Iu(e, t, l)
        }, function(l) {
            return Gr(e, t, l)
        }) : Iu(e, t, a)
    }

    function Iu(e, t, a) {
        t.status = "fulfilled", t.value = a, ed(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Fu(e, a)))
    }

    function Gr(e, t, a) {
        var l = e.pending;
        if (e.pending = null, l !== null) {
            l = l.next;
            do t.status = "rejected", t.reason = a, ed(t), t = t.next; while (t !== l)
        }
        e.action = null
    }

    function ed(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)(0, e[t])()
    }

    function td(e, t) {
        return t
    }

    function ad(e, t) {
        if (ve) {
            var a = Me.formState;
            if (a !== null) {
                e: {
                    var l = de;
                    if (ve) {
                        if (ze) {
                            t: {
                                for (var i = ze, r = Rt; i.nodeType !== 8;) {
                                    if (!r) {
                                        i = null;
                                        break t
                                    }
                                    if (i = At(i.nextSibling), i === null) {
                                        i = null;
                                        break t
                                    }
                                }
                                r = i.data,
                                i = r === "F!" || r === "F" ? i : null
                            }
                            if (i) {
                                ze = At(i.nextSibling), l = i.data === "F!";
                                break e
                            }
                        }
                        Va(l)
                    }
                    l = !1
                }
                l && (t = a[0])
            }
        }
        return a = it(), a.memoizedState = a.baseState = t, l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: td,
            lastRenderedState: t
        }, a.queue = l, a = jd.bind(null, de, l), l.dispatch = a, l = Hr(!1), r = Zr.bind(null, de, !1, l.queue), l = it(), i = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        }, l.queue = i, a = Wh.bind(null, de, i, r, a), i.dispatch = a, l.memoizedState = e, [t, a, !1]
    }

    function ld(e) {
        var t = He();
        return nd(t, Ee, e)
    }

    function nd(e, t, a) {
        if (t = Ur(e, t, td)[0], e = Ri(Zt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
            var l = xn(t)
        } catch (d) {
            throw d === dn ? _i : d
        } else l = t;
        t = He();
        var i = t.queue,
            r = i.dispatch;
        return a !== t.memoizedState && (de.flags |= 2048, Sl(9, Oi(), Fh.bind(null, i, a), null)), [l, r, e]
    }

    function Fh(e, t) {
        e.action = t
    }

    function id(e) {
        var t = He(),
            a = Ee;
        if (a !== null) return nd(t, a, e);
        He(), t = t.memoizedState, a = He();
        var l = a.queue.dispatch;
        return a.memoizedState = e, [t, l, !1]
    }

    function Sl(e, t, a, l) {
        return e = {
            tag: e,
            create: a,
            deps: l,
            inst: t,
            next: null
        }, t = de.updateQueue, t === null && (t = Br(), de.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e
    }

    function Oi() {
        return {
            destroy: void 0,
            resource: void 0
        }
    }

    function sd() {
        return He().memoizedState
    }

    function Di(e, t, a, l) {
        var i = it();
        l = l === void 0 ? null : l, de.flags |= e, i.memoizedState = Sl(1 | t, Oi(), a, l)
    }

    function yn(e, t, a, l) {
        var i = He();
        l = l === void 0 ? null : l;
        var r = i.memoizedState.inst;
        Ee !== null && l !== null && Cr(l, Ee.memoizedState.deps) ? i.memoizedState = Sl(t, r, a, l) : (de.flags |= e, i.memoizedState = Sl(1 | t, r, a, l))
    }

    function rd(e, t) {
        Di(8390656, 8, e, t)
    }

    function od(e, t) {
        yn(2048, 8, e, t)
    }

    function cd(e, t) {
        return yn(4, 2, e, t)
    }

    function ud(e, t) {
        return yn(4, 4, e, t)
    }

    function dd(e, t) {
        if (typeof t == "function") {
            e = e();
            var a = t(e);
            return function() {
                typeof a == "function" ? a() : t(null)
            }
        }
        if (t != null) return e = e(), t.current = e,
            function() {
                t.current = null
            }
    }

    function fd(e, t, a) {
        a = a != null ? a.concat([e]) : null, yn(4, 4, dd.bind(null, t, e), a)
    }

    function Yr() {}

    function md(e, t) {
        var a = He();
        t = t === void 0 ? null : t;
        var l = a.memoizedState;
        return t !== null && Cr(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e)
    }

    function hd(e, t) {
        var a = He();
        t = t === void 0 ? null : t;
        var l = a.memoizedState;
        if (t !== null && Cr(t, l[1])) return l[0];
        if (l = e(), Ka) {
            ca(!0);
            try {
                e()
            } finally {
                ca(!1)
            }
        }
        return a.memoizedState = [l, t], l
    }

    function Xr(e, t, a) {
        return a === void 0 || (pa & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = yf(), de.lanes |= e, wa |= e, a)
    }

    function gd(e, t, a, l) {
        return dt(a, t) ? a : Nl.current !== null ? (e = Xr(e, a, l), dt(e, t) || (Qe = !0), e) : (pa & 42) === 0 ? (Qe = !0, e.memoizedState = a) : (e = yf(), de.lanes |= e, wa |= e, t)
    }

    function pd(e, t, a, l, i) {
        var r = Z.p;
        Z.p = r !== 0 && 8 > r ? r : 8;
        var d = R.T,
            h = {};
        R.T = h, Zr(e, !1, t, a);
        try {
            var b = i(),
                T = R.S;
            if (T !== null && T(h, b), b !== null && typeof b == "object" && typeof b.then == "function") {
                var B = $h(b, l);
                bn(e, t, B, pt(e))
            } else bn(e, t, l, pt(e))
        } catch (H) {
            bn(e, t, {
                then: function() {},
                status: "rejected",
                reason: H
            }, pt())
        } finally {
            Z.p = r, R.T = d
        }
    }

    function Ph() {}

    function Vr(e, t, a, l) {
        if (e.tag !== 5) throw Error(u(476));
        var i = xd(e).queue;
        pd(e, i, t, I, a === null ? Ph : function() {
            return yd(e), a(l)
        })
    }

    function xd(e) {
        var t = e.memoizedState;
        if (t !== null) return t;
        t = {
            memoizedState: I,
            baseState: I,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Zt,
                lastRenderedState: I
            },
            next: null
        };
        var a = {};
        return t.next = {
            memoizedState: a,
            baseState: a,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Zt,
                lastRenderedState: a
            },
            next: null
        }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
    }

    function yd(e) {
        var t = xd(e).next.queue;
        bn(e, t, {}, pt())
    }

    function Qr() {
        return Pe(qn)
    }

    function bd() {
        return He().memoizedState
    }

    function vd() {
        return He().memoizedState
    }

    function Ih(e) {
        for (var t = e.return; t !== null;) {
            switch (t.tag) {
                case 24:
                case 3:
                    var a = pt();
                    e = ha(a);
                    var l = ga(t, e, a);
                    l !== null && (xt(l, t, a), mn(l, t, a)), t = {
                        cache: jr()
                    }, e.payload = t;
                    return
            }
            t = t.return
        }
    }

    function eg(e, t, a) {
        var l = pt();
        a = {
            lane: l,
            revertLane: 0,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, zi(e) ? Nd(t, a) : (a = dr(e, t, a, l), a !== null && (xt(a, e, l), wd(a, t, l)))
    }

    function jd(e, t, a) {
        var l = pt();
        bn(e, t, a, l)
    }

    function bn(e, t, a, l) {
        var i = {
            lane: l,
            revertLane: 0,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (zi(e)) Nd(t, i);
        else {
            var r = e.alternate;
            if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null)) try {
                var d = t.lastRenderedState,
                    h = r(d, a);
                if (i.hasEagerState = !0, i.eagerState = h, dt(h, d)) return yi(e, t, i, 0), Me === null && xi(), !1
            } catch {} finally {}
            if (a = dr(e, t, i, l), a !== null) return xt(a, e, l), wd(a, t, l), !0
        }
        return !1
    }

    function Zr(e, t, a, l) {
        if (l = {
                lane: 2,
                revertLane: So(),
                action: l,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, zi(e)) {
            if (t) throw Error(u(479))
        } else t = dr(e, a, l, 2), t !== null && xt(t, e, 2)
    }

    function zi(e) {
        var t = e.alternate;
        return e === de || t !== null && t === de
    }

    function Nd(e, t) {
        wl = Ai = !0;
        var a = e.pending;
        a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t
    }

    function wd(e, t, a) {
        if ((a & 4194048) !== 0) {
            var l = t.lanes;
            l &= e.pendingLanes, a |= l, t.lanes = a, Cc(e, a)
        }
    }
    var Bi = {
            readContext: Pe,
            use: Ci,
            useCallback: qe,
            useContext: qe,
            useEffect: qe,
            useImperativeHandle: qe,
            useLayoutEffect: qe,
            useInsertionEffect: qe,
            useMemo: qe,
            useReducer: qe,
            useRef: qe,
            useState: qe,
            useDebugValue: qe,
            useDeferredValue: qe,
            useTransition: qe,
            useSyncExternalStore: qe,
            useId: qe,
            useHostTransitionStatus: qe,
            useFormState: qe,
            useActionState: qe,
            useOptimistic: qe,
            useMemoCache: qe,
            useCacheRefresh: qe
        },
        Ed = {
            readContext: Pe,
            use: Ci,
            useCallback: function(e, t) {
                return it().memoizedState = [e, t === void 0 ? null : t], e
            },
            useContext: Pe,
            useEffect: rd,
            useImperativeHandle: function(e, t, a) {
                a = a != null ? a.concat([e]) : null, Di(4194308, 4, dd.bind(null, t, e), a)
            },
            useLayoutEffect: function(e, t) {
                return Di(4194308, 4, e, t)
            },
            useInsertionEffect: function(e, t) {
                Di(4, 2, e, t)
            },
            useMemo: function(e, t) {
                var a = it();
                t = t === void 0 ? null : t;
                var l = e();
                if (Ka) {
                    ca(!0);
                    try {
                        e()
                    } finally {
                        ca(!1)
                    }
                }
                return a.memoizedState = [l, t], l
            },
            useReducer: function(e, t, a) {
                var l = it();
                if (a !== void 0) {
                    var i = a(t);
                    if (Ka) {
                        ca(!0);
                        try {
                            a(t)
                        } finally {
                            ca(!1)
                        }
                    }
                } else i = t;
                return l.memoizedState = l.baseState = i, e = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: i
                }, l.queue = e, e = e.dispatch = eg.bind(null, de, e), [l.memoizedState, e]
            },
            useRef: function(e) {
                var t = it();
                return e = {
                    current: e
                }, t.memoizedState = e
            },
            useState: function(e) {
                e = Hr(e);
                var t = e.queue,
                    a = jd.bind(null, de, t);
                return t.dispatch = a, [e.memoizedState, a]
            },
            useDebugValue: Yr,
            useDeferredValue: function(e, t) {
                var a = it();
                return Xr(a, e, t)
            },
            useTransition: function() {
                var e = Hr(!1);
                return e = pd.bind(null, de, e.queue, !0, !1), it().memoizedState = e, [!1, e]
            },
            useSyncExternalStore: function(e, t, a) {
                var l = de,
                    i = it();
                if (ve) {
                    if (a === void 0) throw Error(u(407));
                    a = a()
                } else {
                    if (a = t(), Me === null) throw Error(u(349));
                    (pe & 124) !== 0 || Qu(l, t, a)
                }
                i.memoizedState = a;
                var r = {
                    value: a,
                    getSnapshot: t
                };
                return i.queue = r, rd($u.bind(null, l, r, e), [e]), l.flags |= 2048, Sl(9, Oi(), Zu.bind(null, l, r, a, t), null), a
            },
            useId: function() {
                var e = it(),
                    t = Me.identifierPrefix;
                if (ve) {
                    var a = Xt,
                        l = Yt;
                    a = (l & ~(1 << 32 - ut(l) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = Mi++, 0 < a && (t += "H" + a.toString(32)), t += "»"
                } else a = Kh++, t = "«" + t + "r" + a.toString(32) + "»";
                return e.memoizedState = t
            },
            useHostTransitionStatus: Qr,
            useFormState: ad,
            useActionState: ad,
            useOptimistic: function(e) {
                var t = it();
                t.memoizedState = t.baseState = e;
                var a = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null
                };
                return t.queue = a, t = Zr.bind(null, de, !0, a), a.dispatch = t, [e, t]
            },
            useMemoCache: qr,
            useCacheRefresh: function() {
                return it().memoizedState = Ih.bind(null, de)
            }
        },
        Sd = {
            readContext: Pe,
            use: Ci,
            useCallback: md,
            useContext: Pe,
            useEffect: od,
            useImperativeHandle: fd,
            useInsertionEffect: cd,
            useLayoutEffect: ud,
            useMemo: hd,
            useReducer: Ri,
            useRef: sd,
            useState: function() {
                return Ri(Zt)
            },
            useDebugValue: Yr,
            useDeferredValue: function(e, t) {
                var a = He();
                return gd(a, Ee.memoizedState, e, t)
            },
            useTransition: function() {
                var e = Ri(Zt)[0],
                    t = He().memoizedState;
                return [typeof e == "boolean" ? e : xn(e), t]
            },
            useSyncExternalStore: Vu,
            useId: bd,
            useHostTransitionStatus: Qr,
            useFormState: ld,
            useActionState: ld,
            useOptimistic: function(e, t) {
                var a = He();
                return Wu(a, Ee, e, t)
            },
            useMemoCache: qr,
            useCacheRefresh: vd
        },
        tg = {
            readContext: Pe,
            use: Ci,
            useCallback: md,
            useContext: Pe,
            useEffect: od,
            useImperativeHandle: fd,
            useInsertionEffect: cd,
            useLayoutEffect: ud,
            useMemo: hd,
            useReducer: Lr,
            useRef: sd,
            useState: function() {
                return Lr(Zt)
            },
            useDebugValue: Yr,
            useDeferredValue: function(e, t) {
                var a = He();
                return Ee === null ? Xr(a, e, t) : gd(a, Ee.memoizedState, e, t)
            },
            useTransition: function() {
                var e = Lr(Zt)[0],
                    t = He().memoizedState;
                return [typeof e == "boolean" ? e : xn(e), t]
            },
            useSyncExternalStore: Vu,
            useId: bd,
            useHostTransitionStatus: Qr,
            useFormState: id,
            useActionState: id,
            useOptimistic: function(e, t) {
                var a = He();
                return Ee !== null ? Wu(a, Ee, e, t) : (a.baseState = e, [e, a.queue.dispatch])
            },
            useMemoCache: qr,
            useCacheRefresh: vd
        },
        _l = null,
        vn = 0;

    function qi(e) {
        var t = vn;
        return vn += 1, _l === null && (_l = []), Bu(_l, e, t)
    }

    function jn(e, t) {
        t = t.props.ref, e.ref = t !== void 0 ? t : null
    }

    function Ui(e, t) {
        throw t.$$typeof === A ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }

    function _d(e) {
        var t = e._init;
        return t(e._payload)
    }

    function Td(e) {
        function t(S, w) {
            if (e) {
                var _ = S.deletions;
                _ === null ? (S.deletions = [w], S.flags |= 16) : _.push(w)
            }
        }

        function a(S, w) {
            if (!e) return null;
            for (; w !== null;) t(S, w), w = w.sibling;
            return null
        }

        function l(S) {
            for (var w = new Map; S !== null;) S.key !== null ? w.set(S.key, S) : w.set(S.index, S), S = S.sibling;
            return w
        }

        function i(S, w) {
            return S = Gt(S, w), S.index = 0, S.sibling = null, S
        }

        function r(S, w, _) {
            return S.index = _, e ? (_ = S.alternate, _ !== null ? (_ = _.index, _ < w ? (S.flags |= 67108866, w) : _) : (S.flags |= 67108866, w)) : (S.flags |= 1048576, w)
        }

        function d(S) {
            return e && S.alternate === null && (S.flags |= 67108866), S
        }

        function h(S, w, _, U) {
            return w === null || w.tag !== 6 ? (w = mr(_, S.mode, U), w.return = S, w) : (w = i(w, _), w.return = S, w)
        }

        function b(S, w, _, U) {
            var F = _.type;
            return F === O ? B(S, w, _.props.children, U, _.key) : w !== null && (w.elementType === F || typeof F == "object" && F !== null && F.$$typeof === P && _d(F) === w.type) ? (w = i(w, _.props), jn(w, _), w.return = S, w) : (w = vi(_.type, _.key, _.props, null, S.mode, U), jn(w, _), w.return = S, w)
        }

        function T(S, w, _, U) {
            return w === null || w.tag !== 4 || w.stateNode.containerInfo !== _.containerInfo || w.stateNode.implementation !== _.implementation ? (w = hr(_, S.mode, U), w.return = S, w) : (w = i(w, _.children || []), w.return = S, w)
        }

        function B(S, w, _, U, F) {
            return w === null || w.tag !== 7 ? (w = Ha(_, S.mode, U, F), w.return = S, w) : (w = i(w, _), w.return = S, w)
        }

        function H(S, w, _) {
            if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint") return w = mr("" + w, S.mode, _), w.return = S, w;
            if (typeof w == "object" && w !== null) {
                switch (w.$$typeof) {
                    case C:
                        return _ = vi(w.type, w.key, w.props, null, S.mode, _), jn(_, w), _.return = S, _;
                    case G:
                        return w = hr(w, S.mode, _), w.return = S, w;
                    case P:
                        var U = w._init;
                        return w = U(w._payload), H(S, w, _)
                }
                if (xe(w) || me(w)) return w = Ha(w, S.mode, _, null), w.return = S, w;
                if (typeof w.then == "function") return H(S, qi(w), _);
                if (w.$$typeof === q) return H(S, Ei(S, w), _);
                Ui(S, w)
            }
            return null
        }

        function k(S, w, _, U) {
            var F = w !== null ? w.key : null;
            if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint") return F !== null ? null : h(S, w, "" + _, U);
            if (typeof _ == "object" && _ !== null) {
                switch (_.$$typeof) {
                    case C:
                        return _.key === F ? b(S, w, _, U) : null;
                    case G:
                        return _.key === F ? T(S, w, _, U) : null;
                    case P:
                        return F = _._init, _ = F(_._payload), k(S, w, _, U)
                }
                if (xe(_) || me(_)) return F !== null ? null : B(S, w, _, U, null);
                if (typeof _.then == "function") return k(S, w, qi(_), U);
                if (_.$$typeof === q) return k(S, w, Ei(S, _), U);
                Ui(S, _)
            }
            return null
        }

        function M(S, w, _, U, F) {
            if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint") return S = S.get(_) || null, h(w, S, "" + U, F);
            if (typeof U == "object" && U !== null) {
                switch (U.$$typeof) {
                    case C:
                        return S = S.get(U.key === null ? _ : U.key) || null, b(w, S, U, F);
                    case G:
                        return S = S.get(U.key === null ? _ : U.key) || null, T(w, S, U, F);
                    case P:
                        var fe = U._init;
                        return U = fe(U._payload), M(S, w, _, U, F)
                }
                if (xe(U) || me(U)) return S = S.get(_) || null, B(w, S, U, F, null);
                if (typeof U.then == "function") return M(S, w, _, qi(U), F);
                if (U.$$typeof === q) return M(S, w, _, Ei(w, U), F);
                Ui(w, U)
            }
            return null
        }

        function se(S, w, _, U) {
            for (var F = null, fe = null, ee = w, ie = w = 0, $e = null; ee !== null && ie < _.length; ie++) {
                ee.index > ie ? ($e = ee, ee = null) : $e = ee.sibling;
                var be = k(S, ee, _[ie], U);
                if (be === null) {
                    ee === null && (ee = $e);
                    break
                }
                e && ee && be.alternate === null && t(S, ee), w = r(be, w, ie), fe === null ? F = be : fe.sibling = be, fe = be, ee = $e
            }
            if (ie === _.length) return a(S, ee), ve && Ya(S, ie), F;
            if (ee === null) {
                for (; ie < _.length; ie++) ee = H(S, _[ie], U), ee !== null && (w = r(ee, w, ie), fe === null ? F = ee : fe.sibling = ee, fe = ee);
                return ve && Ya(S, ie), F
            }
            for (ee = l(ee); ie < _.length; ie++) $e = M(ee, S, ie, _[ie], U), $e !== null && (e && $e.alternate !== null && ee.delete($e.key === null ? ie : $e.key), w = r($e, w, ie), fe === null ? F = $e : fe.sibling = $e, fe = $e);
            return e && ee.forEach(function(Ra) {
                return t(S, Ra)
            }), ve && Ya(S, ie), F
        }

        function ne(S, w, _, U) {
            if (_ == null) throw Error(u(151));
            for (var F = null, fe = null, ee = w, ie = w = 0, $e = null, be = _.next(); ee !== null && !be.done; ie++, be = _.next()) {
                ee.index > ie ? ($e = ee, ee = null) : $e = ee.sibling;
                var Ra = k(S, ee, be.value, U);
                if (Ra === null) {
                    ee === null && (ee = $e);
                    break
                }
                e && ee && Ra.alternate === null && t(S, ee), w = r(Ra, w, ie), fe === null ? F = Ra : fe.sibling = Ra, fe = Ra, ee = $e
            }
            if (be.done) return a(S, ee), ve && Ya(S, ie), F;
            if (ee === null) {
                for (; !be.done; ie++, be = _.next()) be = H(S, be.value, U), be !== null && (w = r(be, w, ie), fe === null ? F = be : fe.sibling = be, fe = be);
                return ve && Ya(S, ie), F
            }
            for (ee = l(ee); !be.done; ie++, be = _.next()) be = M(ee, S, ie, be.value, U), be !== null && (e && be.alternate !== null && ee.delete(be.key === null ? ie : be.key), w = r(be, w, ie), fe === null ? F = be : fe.sibling = be, fe = be);
            return e && ee.forEach(function(ap) {
                return t(S, ap)
            }), ve && Ya(S, ie), F
        }

        function _e(S, w, _, U) {
            if (typeof _ == "object" && _ !== null && _.type === O && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
                switch (_.$$typeof) {
                    case C:
                        e: {
                            for (var F = _.key; w !== null;) {
                                if (w.key === F) {
                                    if (F = _.type, F === O) {
                                        if (w.tag === 7) {
                                            a(S, w.sibling), U = i(w, _.props.children), U.return = S, S = U;
                                            break e
                                        }
                                    } else if (w.elementType === F || typeof F == "object" && F !== null && F.$$typeof === P && _d(F) === w.type) {
                                        a(S, w.sibling), U = i(w, _.props), jn(U, _), U.return = S, S = U;
                                        break e
                                    }
                                    a(S, w);
                                    break
                                } else t(S, w);
                                w = w.sibling
                            }
                            _.type === O ? (U = Ha(_.props.children, S.mode, U, _.key), U.return = S, S = U) : (U = vi(_.type, _.key, _.props, null, S.mode, U), jn(U, _), U.return = S, S = U)
                        }
                        return d(S);
                    case G:
                        e: {
                            for (F = _.key; w !== null;) {
                                if (w.key === F)
                                    if (w.tag === 4 && w.stateNode.containerInfo === _.containerInfo && w.stateNode.implementation === _.implementation) {
                                        a(S, w.sibling), U = i(w, _.children || []), U.return = S, S = U;
                                        break e
                                    } else {
                                        a(S, w);
                                        break
                                    }
                                else t(S, w);
                                w = w.sibling
                            }
                            U = hr(_, S.mode, U),
                            U.return = S,
                            S = U
                        }
                        return d(S);
                    case P:
                        return F = _._init, _ = F(_._payload), _e(S, w, _, U)
                }
                if (xe(_)) return se(S, w, _, U);
                if (me(_)) {
                    if (F = me(_), typeof F != "function") throw Error(u(150));
                    return _ = F.call(_), ne(S, w, _, U)
                }
                if (typeof _.then == "function") return _e(S, w, qi(_), U);
                if (_.$$typeof === q) return _e(S, w, Ei(S, _), U);
                Ui(S, _)
            }
            return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, w !== null && w.tag === 6 ? (a(S, w.sibling), U = i(w, _), U.return = S, S = U) : (a(S, w), U = mr(_, S.mode, U), U.return = S, S = U), d(S)) : a(S, w)
        }
        return function(S, w, _, U) {
            try {
                vn = 0;
                var F = _e(S, w, _, U);
                return _l = null, F
            } catch (ee) {
                if (ee === dn || ee === _i) throw ee;
                var fe = ft(29, ee, null, S.mode);
                return fe.lanes = U, fe.return = S, fe
            } finally {}
        }
    }
    var Tl = Td(!0),
        kd = Td(!1),
        Et = Y(null),
        Ot = null;

    function xa(e) {
        var t = e.alternate;
        J(Ye, Ye.current & 1), J(Et, e), Ot === null && (t === null || Nl.current !== null || t.memoizedState !== null) && (Ot = e)
    }

    function Ad(e) {
        if (e.tag === 22) {
            if (J(Ye, Ye.current), J(Et, e), Ot === null) {
                var t = e.alternate;
                t !== null && t.memoizedState !== null && (Ot = e)
            }
        } else ya()
    }

    function ya() {
        J(Ye, Ye.current), J(Et, Et.current)
    }

    function $t(e) {
        W(Et), Ot === e && (Ot = null), W(Ye)
    }
    var Ye = Y(0);

    function Li(e) {
        for (var t = e; t !== null;) {
            if (t.tag === 13) {
                var a = t.memoizedState;
                if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || qo(a))) return t
            } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
                if ((t.flags & 128) !== 0) return t
            } else if (t.child !== null) {
                t.child.return = t, t = t.child;
                continue
            }
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return null;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
        return null
    }

    function $r(e, t, a, l) {
        t = e.memoizedState, a = a(l, t), a = a == null ? t : y({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a)
    }
    var Kr = {
        enqueueSetState: function(e, t, a) {
            e = e._reactInternals;
            var l = pt(),
                i = ha(l);
            i.payload = t, a != null && (i.callback = a), t = ga(e, i, l), t !== null && (xt(t, e, l), mn(t, e, l))
        },
        enqueueReplaceState: function(e, t, a) {
            e = e._reactInternals;
            var l = pt(),
                i = ha(l);
            i.tag = 1, i.payload = t, a != null && (i.callback = a), t = ga(e, i, l), t !== null && (xt(t, e, l), mn(t, e, l))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var a = pt(),
                l = ha(a);
            l.tag = 2, t != null && (l.callback = t), t = ga(e, l, a), t !== null && (xt(t, e, a), mn(t, e, a))
        }
    };

    function Md(e, t, a, l, i, r, d) {
        return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, r, d) : t.prototype && t.prototype.isPureReactComponent ? !an(a, l) || !an(i, r) : !0
    }

    function Cd(e, t, a, l) {
        e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && Kr.enqueueReplaceState(t, t.state, null)
    }

    function Ja(e, t) {
        var a = t;
        if ("ref" in t) {
            a = {};
            for (var l in t) l !== "ref" && (a[l] = t[l])
        }
        if (e = e.defaultProps) {
            a === t && (a = y({}, a));
            for (var i in e) a[i] === void 0 && (a[i] = e[i])
        }
        return a
    }
    var Hi = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t)) return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    };

    function Rd(e) {
        Hi(e)
    }

    function Od(e) {
        console.error(e)
    }

    function Dd(e) {
        Hi(e)
    }

    function Gi(e, t) {
        try {
            var a = e.onUncaughtError;
            a(t.value, {
                componentStack: t.stack
            })
        } catch (l) {
            setTimeout(function() {
                throw l
            })
        }
    }

    function zd(e, t, a) {
        try {
            var l = e.onCaughtError;
            l(a.value, {
                componentStack: a.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (i) {
            setTimeout(function() {
                throw i
            })
        }
    }

    function Jr(e, t, a) {
        return a = ha(a), a.tag = 3, a.payload = {
            element: null
        }, a.callback = function() {
            Gi(e, t)
        }, a
    }

    function Bd(e) {
        return e = ha(e), e.tag = 3, e
    }

    function qd(e, t, a, l) {
        var i = a.type.getDerivedStateFromError;
        if (typeof i == "function") {
            var r = l.value;
            e.payload = function() {
                return i(r)
            }, e.callback = function() {
                zd(t, a, l)
            }
        }
        var d = a.stateNode;
        d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
            zd(t, a, l), typeof i != "function" && (Ea === null ? Ea = new Set([this]) : Ea.add(this));
            var h = l.stack;
            this.componentDidCatch(l.value, {
                componentStack: h !== null ? h : ""
            })
        })
    }

    function ag(e, t, a, l, i) {
        if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
            if (t = a.alternate, t !== null && on(t, a, i, !0), a = Et.current, a !== null) {
                switch (a.tag) {
                    case 13:
                        return Ot === null ? vo() : a.alternate === null && Be === 0 && (Be = 3), a.flags &= -257, a.flags |= 65536, a.lanes = i, l === Er ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = new Set([l]) : t.add(l), No(e, l, i)), !1;
                    case 22:
                        return a.flags |= 65536, l === Er ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([l])
                        }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = new Set([l]) : a.add(l)), No(e, l, i)), !1
                }
                throw Error(u(435, a.tag))
            }
            return No(e, l, i), vo(), !1
        }
        if (ve) return t = Et.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== xr && (e = Error(u(422), {
            cause: l
        }), rn(vt(e, a)))) : (l !== xr && (t = Error(u(423), {
            cause: l
        }), rn(vt(t, a))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = vt(l, a), i = Jr(e.stateNode, l, i), Tr(e, i), Be !== 4 && (Be = 2)), !1;
        var r = Error(u(520), {
            cause: l
        });
        if (r = vt(r, a), kn === null ? kn = [r] : kn.push(r), Be !== 4 && (Be = 2), t === null) return !0;
        l = vt(l, a), a = t;
        do {
            switch (a.tag) {
                case 3:
                    return a.flags |= 65536, e = i & -i, a.lanes |= e, e = Jr(a.stateNode, l, e), Tr(a, e), !1;
                case 1:
                    if (t = a.type, r = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Ea === null || !Ea.has(r)))) return a.flags |= 65536, i &= -i, a.lanes |= i, i = Bd(i), qd(i, e, a, l), Tr(a, i), !1
            }
            a = a.return
        } while (a !== null);
        return !1
    }
    var Ud = Error(u(461)),
        Qe = !1;

    function Ke(e, t, a, l) {
        t.child = e === null ? kd(t, null, a, l) : Tl(t, e.child, a, l)
    }

    function Ld(e, t, a, l, i) {
        a = a.render;
        var r = t.ref;
        if ("ref" in l) {
            var d = {};
            for (var h in l) h !== "ref" && (d[h] = l[h])
        } else d = l;
        return Za(t), l = Rr(e, t, a, d, r, i), h = Or(), e !== null && !Qe ? (Dr(e, t, i), Kt(e, t, i)) : (ve && h && gr(t), t.flags |= 1, Ke(e, t, l, i), t.child)
    }

    function Hd(e, t, a, l, i) {
        if (e === null) {
            var r = a.type;
            return typeof r == "function" && !fr(r) && r.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = r, Gd(e, t, r, l, i)) : (e = vi(a.type, null, l, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
        }
        if (r = e.child, !lo(e, i)) {
            var d = r.memoizedProps;
            if (a = a.compare, a = a !== null ? a : an, a(d, l) && e.ref === t.ref) return Kt(e, t, i)
        }
        return t.flags |= 1, e = Gt(r, l), e.ref = t.ref, e.return = t, t.child = e
    }

    function Gd(e, t, a, l, i) {
        if (e !== null) {
            var r = e.memoizedProps;
            if (an(r, l) && e.ref === t.ref)
                if (Qe = !1, t.pendingProps = l = r, lo(e, i))(e.flags & 131072) !== 0 && (Qe = !0);
                else return t.lanes = e.lanes, Kt(e, t, i)
        }
        return Wr(e, t, a, l, i)
    }

    function Yd(e, t, a) {
        var l = t.pendingProps,
            i = l.children,
            r = e !== null ? e.memoizedState : null;
        if (l.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (l = r !== null ? r.baseLanes | a : a, e !== null) {
                    for (i = t.child = e.child, r = 0; i !== null;) r = r | i.lanes | i.childLanes, i = i.sibling;
                    t.childLanes = r & ~l
                } else t.childLanes = 0, t.child = null;
                return Xd(e, t, l, a)
            }
            if ((a & 536870912) !== 0) t.memoizedState = {
                baseLanes: 0,
                cachePool: null
            }, e !== null && Si(t, r !== null ? r.cachePool : null), r !== null ? Gu(t, r) : Ar(), Ad(t);
            else return t.lanes = t.childLanes = 536870912, Xd(e, t, r !== null ? r.baseLanes | a : a, a)
        } else r !== null ? (Si(t, r.cachePool), Gu(t, r), ya(), t.memoizedState = null) : (e !== null && Si(t, null), Ar(), ya());
        return Ke(e, t, i, a), t.child
    }

    function Xd(e, t, a, l) {
        var i = wr();
        return i = i === null ? null : {
            parent: Ge._currentValue,
            pool: i
        }, t.memoizedState = {
            baseLanes: a,
            cachePool: i
        }, e !== null && Si(t, null), Ar(), Ad(t), e !== null && on(e, t, l, !0), null
    }

    function Yi(e, t) {
        var a = t.ref;
        if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof a != "function" && typeof a != "object") throw Error(u(284));
            (e === null || e.ref !== a) && (t.flags |= 4194816)
        }
    }

    function Wr(e, t, a, l, i) {
        return Za(t), a = Rr(e, t, a, l, void 0, i), l = Or(), e !== null && !Qe ? (Dr(e, t, i), Kt(e, t, i)) : (ve && l && gr(t), t.flags |= 1, Ke(e, t, a, i), t.child)
    }

    function Vd(e, t, a, l, i, r) {
        return Za(t), t.updateQueue = null, a = Xu(t, l, a, i), Yu(e), l = Or(), e !== null && !Qe ? (Dr(e, t, r), Kt(e, t, r)) : (ve && l && gr(t), t.flags |= 1, Ke(e, t, a, r), t.child)
    }

    function Qd(e, t, a, l, i) {
        if (Za(t), t.stateNode === null) {
            var r = xl,
                d = a.contextType;
            typeof d == "object" && d !== null && (r = Pe(d)), r = new a(l, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Kr, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = l, r.state = t.memoizedState, r.refs = {}, Sr(t), d = a.contextType, r.context = typeof d == "object" && d !== null ? Pe(d) : xl, r.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && ($r(t, a, d, l), r.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (d = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), d !== r.state && Kr.enqueueReplaceState(r, r.state, null), gn(t, l, r, i), hn(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !0
        } else if (e === null) {
            r = t.stateNode;
            var h = t.memoizedProps,
                b = Ja(a, h);
            r.props = b;
            var T = r.context,
                B = a.contextType;
            d = xl, typeof B == "object" && B !== null && (d = Pe(B));
            var H = a.getDerivedStateFromProps;
            B = typeof H == "function" || typeof r.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, B || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (h || T !== d) && Cd(t, r, l, d), ma = !1;
            var k = t.memoizedState;
            r.state = k, gn(t, l, r, i), hn(), T = t.memoizedState, h || k !== T || ma ? (typeof H == "function" && ($r(t, a, H, l), T = t.memoizedState), (b = ma || Md(t, a, b, l, k, T, d)) ? (B || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = T), r.props = l, r.state = T, r.context = d, l = b) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !1)
        } else {
            r = t.stateNode, _r(e, t), d = t.memoizedProps, B = Ja(a, d), r.props = B, H = t.pendingProps, k = r.context, T = a.contextType, b = xl, typeof T == "object" && T !== null && (b = Pe(T)), h = a.getDerivedStateFromProps, (T = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (d !== H || k !== b) && Cd(t, r, l, b), ma = !1, k = t.memoizedState, r.state = k, gn(t, l, r, i), hn();
            var M = t.memoizedState;
            d !== H || k !== M || ma || e !== null && e.dependencies !== null && wi(e.dependencies) ? (typeof h == "function" && ($r(t, a, h, l), M = t.memoizedState), (B = ma || Md(t, a, B, l, k, M, b) || e !== null && e.dependencies !== null && wi(e.dependencies)) ? (T || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(l, M, b), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(l, M, b)), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = M), r.props = l, r.state = M, r.context = b, l = B) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), l = !1)
        }
        return r = l, Yi(e, t), l = (t.flags & 128) !== 0, r || l ? (r = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && l ? (t.child = Tl(t, e.child, null, i), t.child = Tl(t, null, a, i)) : Ke(e, t, a, i), t.memoizedState = r.state, e = t.child) : e = Kt(e, t, i), e
    }

    function Zd(e, t, a, l) {
        return sn(), t.flags |= 256, Ke(e, t, a, l), t.child
    }
    var Fr = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };

    function Pr(e) {
        return {
            baseLanes: e,
            cachePool: Ou()
        }
    }

    function Ir(e, t, a) {
        return e = e !== null ? e.childLanes & ~a : 0, t && (e |= St), e
    }

    function $d(e, t, a) {
        var l = t.pendingProps,
            i = !1,
            r = (t.flags & 128) !== 0,
            d;
        if ((d = r) || (d = e !== null && e.memoizedState === null ? !1 : (Ye.current & 2) !== 0), d && (i = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
            if (ve) {
                if (i ? xa(t) : ya(), ve) {
                    var h = ze,
                        b;
                    if (b = h) {
                        e: {
                            for (b = h, h = Rt; b.nodeType !== 8;) {
                                if (!h) {
                                    h = null;
                                    break e
                                }
                                if (b = At(b.nextSibling), b === null) {
                                    h = null;
                                    break e
                                }
                            }
                            h = b
                        }
                        h !== null ? (t.memoizedState = {
                            dehydrated: h,
                            treeContext: Ga !== null ? {
                                id: Yt,
                                overflow: Xt
                            } : null,
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, b = ft(18, null, null, 0), b.stateNode = h, b.return = t, t.child = b, tt = t, ze = null, b = !0) : b = !1
                    }
                    b || Va(t)
                }
                if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null)) return qo(h) ? t.lanes = 32 : t.lanes = 536870912, null;
                $t(t)
            }
            return h = l.children, l = l.fallback, i ? (ya(), i = t.mode, h = Xi({
                mode: "hidden",
                children: h
            }, i), l = Ha(l, i, a, null), h.return = t, l.return = t, h.sibling = l, t.child = h, i = t.child, i.memoizedState = Pr(a), i.childLanes = Ir(e, d, a), t.memoizedState = Fr, l) : (xa(t), eo(t, h))
        }
        if (b = e.memoizedState, b !== null && (h = b.dehydrated, h !== null)) {
            if (r) t.flags & 256 ? (xa(t), t.flags &= -257, t = to(e, t, a)) : t.memoizedState !== null ? (ya(), t.child = e.child, t.flags |= 128, t = null) : (ya(), i = l.fallback, h = t.mode, l = Xi({
                mode: "visible",
                children: l.children
            }, h), i = Ha(i, h, a, null), i.flags |= 2, l.return = t, i.return = t, l.sibling = i, t.child = l, Tl(t, e.child, null, a), l = t.child, l.memoizedState = Pr(a), l.childLanes = Ir(e, d, a), t.memoizedState = Fr, t = i);
            else if (xa(t), qo(h)) {
                if (d = h.nextSibling && h.nextSibling.dataset, d) var T = d.dgst;
                d = T, l = Error(u(419)), l.stack = "", l.digest = d, rn({
                    value: l,
                    source: null,
                    stack: null
                }), t = to(e, t, a)
            } else if (Qe || on(e, t, a, !1), d = (a & e.childLanes) !== 0, Qe || d) {
                if (d = Me, d !== null && (l = a & -a, l = (l & 42) !== 0 ? 1 : qs(l), l = (l & (d.suspendedLanes | a)) !== 0 ? 0 : l, l !== 0 && l !== b.retryLane)) throw b.retryLane = l, pl(e, l), xt(d, e, l), Ud;
                h.data === "$?" || vo(), t = to(e, t, a)
            } else h.data === "$?" ? (t.flags |= 192, t.child = e.child, t = null) : (e = b.treeContext, ze = At(h.nextSibling), tt = t, ve = !0, Xa = null, Rt = !1, e !== null && (Nt[wt++] = Yt, Nt[wt++] = Xt, Nt[wt++] = Ga, Yt = e.id, Xt = e.overflow, Ga = t), t = eo(t, l.children), t.flags |= 4096);
            return t
        }
        return i ? (ya(), i = l.fallback, h = t.mode, b = e.child, T = b.sibling, l = Gt(b, {
            mode: "hidden",
            children: l.children
        }), l.subtreeFlags = b.subtreeFlags & 65011712, T !== null ? i = Gt(T, i) : (i = Ha(i, h, a, null), i.flags |= 2), i.return = t, l.return = t, l.sibling = i, t.child = l, l = i, i = t.child, h = e.child.memoizedState, h === null ? h = Pr(a) : (b = h.cachePool, b !== null ? (T = Ge._currentValue, b = b.parent !== T ? {
            parent: T,
            pool: T
        } : b) : b = Ou(), h = {
            baseLanes: h.baseLanes | a,
            cachePool: b
        }), i.memoizedState = h, i.childLanes = Ir(e, d, a), t.memoizedState = Fr, l) : (xa(t), a = e.child, e = a.sibling, a = Gt(a, {
            mode: "visible",
            children: l.children
        }), a.return = t, a.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = a, t.memoizedState = null, a)
    }

    function eo(e, t) {
        return t = Xi({
            mode: "visible",
            children: t
        }, e.mode), t.return = e, e.child = t
    }

    function Xi(e, t) {
        return e = ft(22, e, null, t), e.lanes = 0, e.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }, e
    }

    function to(e, t, a) {
        return Tl(t, e.child, null, a), e = eo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
    }

    function Kd(e, t, a) {
        e.lanes |= t;
        var l = e.alternate;
        l !== null && (l.lanes |= t), br(e.return, t, a)
    }

    function ao(e, t, a, l, i) {
        var r = e.memoizedState;
        r === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: a,
            tailMode: i
        } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = l, r.tail = a, r.tailMode = i)
    }

    function Jd(e, t, a) {
        var l = t.pendingProps,
            i = l.revealOrder,
            r = l.tail;
        if (Ke(e, t, l.children, a), l = Ye.current, (l & 2) !== 0) l = l & 1 | 2, t.flags |= 128;
        else {
            if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
                if (e.tag === 13) e.memoizedState !== null && Kd(e, a, t);
                else if (e.tag === 19) Kd(e, a, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue
                }
                if (e === t) break e;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return
                }
                e.sibling.return = e.return, e = e.sibling
            }
            l &= 1
        }
        switch (J(Ye, l), i) {
            case "forwards":
                for (a = t.child, i = null; a !== null;) e = a.alternate, e !== null && Li(e) === null && (i = a), a = a.sibling;
                a = i, a === null ? (i = t.child, t.child = null) : (i = a.sibling, a.sibling = null), ao(t, !1, i, a, r);
                break;
            case "backwards":
                for (a = null, i = t.child, t.child = null; i !== null;) {
                    if (e = i.alternate, e !== null && Li(e) === null) {
                        t.child = i;
                        break
                    }
                    e = i.sibling, i.sibling = a, a = i, i = e
                }
                ao(t, !0, a, null, r);
                break;
            case "together":
                ao(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null
        }
        return t.child
    }

    function Kt(e, t, a) {
        if (e !== null && (t.dependencies = e.dependencies), wa |= t.lanes, (a & t.childLanes) === 0)
            if (e !== null) {
                if (on(e, t, a, !1), (a & t.childLanes) === 0) return null
            } else return null;
        if (e !== null && t.child !== e.child) throw Error(u(153));
        if (t.child !== null) {
            for (e = t.child, a = Gt(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null;) e = e.sibling, a = a.sibling = Gt(e, e.pendingProps), a.return = t;
            a.sibling = null
        }
        return t.child
    }

    function lo(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && wi(e)))
    }

    function lg(e, t, a) {
        switch (t.tag) {
            case 3:
                Ce(t, t.stateNode.containerInfo), fa(t, Ge, e.memoizedState.cache), sn();
                break;
            case 27:
            case 5:
                Rs(t);
                break;
            case 4:
                Ce(t, t.stateNode.containerInfo);
                break;
            case 10:
                fa(t, t.type, t.memoizedProps.value);
                break;
            case 13:
                var l = t.memoizedState;
                if (l !== null) return l.dehydrated !== null ? (xa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? $d(e, t, a) : (xa(t), e = Kt(e, t, a), e !== null ? e.sibling : null);
                xa(t);
                break;
            case 19:
                var i = (e.flags & 128) !== 0;
                if (l = (a & t.childLanes) !== 0, l || (on(e, t, a, !1), l = (a & t.childLanes) !== 0), i) {
                    if (l) return Jd(e, t, a);
                    t.flags |= 128
                }
                if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), J(Ye, Ye.current), l) break;
                return null;
            case 22:
            case 23:
                return t.lanes = 0, Yd(e, t, a);
            case 24:
                fa(t, Ge, e.memoizedState.cache)
        }
        return Kt(e, t, a)
    }

    function Wd(e, t, a) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps) Qe = !0;
            else {
                if (!lo(e, a) && (t.flags & 128) === 0) return Qe = !1, lg(e, t, a);
                Qe = (e.flags & 131072) !== 0
            }
        else Qe = !1, ve && (t.flags & 1048576) !== 0 && _u(t, Ni, t.index);
        switch (t.lanes = 0, t.tag) {
            case 16:
                e: {
                    e = t.pendingProps;
                    var l = t.elementType,
                        i = l._init;
                    if (l = i(l._payload), t.type = l, typeof l == "function") fr(l) ? (e = Ja(l, e), t.tag = 1, t = Qd(null, t, l, e, a)) : (t.tag = 0, t = Wr(null, t, l, e, a));
                    else {
                        if (l != null) {
                            if (i = l.$$typeof, i === X) {
                                t.tag = 11, t = Ld(null, t, l, e, a);
                                break e
                            } else if (i === $) {
                                t.tag = 14, t = Hd(null, t, l, e, a);
                                break e
                            }
                        }
                        throw t = et(l) || l, Error(u(306, t, ""))
                    }
                }
                return t;
            case 0:
                return Wr(e, t, t.type, t.pendingProps, a);
            case 1:
                return l = t.type, i = Ja(l, t.pendingProps), Qd(e, t, l, i, a);
            case 3:
                e: {
                    if (Ce(t, t.stateNode.containerInfo), e === null) throw Error(u(387));l = t.pendingProps;
                    var r = t.memoizedState;i = r.element,
                    _r(e, t),
                    gn(t, l, null, a);
                    var d = t.memoizedState;
                    if (l = d.cache, fa(t, Ge, l), l !== r.cache && vr(t, [Ge], a, !0), hn(), l = d.element, r.isDehydrated)
                        if (r = {
                                element: l,
                                isDehydrated: !1,
                                cache: d.cache
                            }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
                            t = Zd(e, t, l, a);
                            break e
                        } else if (l !== i) {
                        i = vt(Error(u(424)), t), rn(i), t = Zd(e, t, l, a);
                        break e
                    } else {
                        switch (e = t.stateNode.containerInfo, e.nodeType) {
                            case 9:
                                e = e.body;
                                break;
                            default:
                                e = e.nodeName === "HTML" ? e.ownerDocument.body : e
                        }
                        for (ze = At(e.firstChild), tt = t, ve = !0, Xa = null, Rt = !0, a = kd(t, null, l, a), t.child = a; a;) a.flags = a.flags & -3 | 4096, a = a.sibling
                    } else {
                        if (sn(), l === i) {
                            t = Kt(e, t, a);
                            break e
                        }
                        Ke(e, t, l, a)
                    }
                    t = t.child
                }
                return t;
            case 26:
                return Yi(e, t), e === null ? (a = tm(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : ve || (a = t.type, e = t.pendingProps, l = ls(ce.current).createElement(a), l[Fe] = t, l[lt] = e, We(l, a, e), Ve(l), t.stateNode = l) : t.memoizedState = tm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
            case 27:
                return Rs(t), e === null && ve && (l = t.stateNode = Pf(t.type, t.pendingProps, ce.current), tt = t, Rt = !0, i = ze, Ta(t.type) ? (Uo = i, ze = At(l.firstChild)) : ze = i), Ke(e, t, t.pendingProps.children, a), Yi(e, t), e === null && (t.flags |= 4194304), t.child;
            case 5:
                return e === null && ve && ((i = l = ze) && (l = Cg(l, t.type, t.pendingProps, Rt), l !== null ? (t.stateNode = l, tt = t, ze = At(l.firstChild), Rt = !1, i = !0) : i = !1), i || Va(t)), Rs(t), i = t.type, r = t.pendingProps, d = e !== null ? e.memoizedProps : null, l = r.children, Do(i, r) ? l = null : d !== null && Do(i, d) && (t.flags |= 32), t.memoizedState !== null && (i = Rr(e, t, Jh, null, null, a), qn._currentValue = i), Yi(e, t), Ke(e, t, l, a), t.child;
            case 6:
                return e === null && ve && ((e = a = ze) && (a = Rg(a, t.pendingProps, Rt), a !== null ? (t.stateNode = a, tt = t, ze = null, e = !0) : e = !1), e || Va(t)), null;
            case 13:
                return $d(e, t, a);
            case 4:
                return Ce(t, t.stateNode.containerInfo), l = t.pendingProps, e === null ? t.child = Tl(t, null, l, a) : Ke(e, t, l, a), t.child;
            case 11:
                return Ld(e, t, t.type, t.pendingProps, a);
            case 7:
                return Ke(e, t, t.pendingProps, a), t.child;
            case 8:
                return Ke(e, t, t.pendingProps.children, a), t.child;
            case 12:
                return Ke(e, t, t.pendingProps.children, a), t.child;
            case 10:
                return l = t.pendingProps, fa(t, t.type, l.value), Ke(e, t, l.children, a), t.child;
            case 9:
                return i = t.type._context, l = t.pendingProps.children, Za(t), i = Pe(i), l = l(i), t.flags |= 1, Ke(e, t, l, a), t.child;
            case 14:
                return Hd(e, t, t.type, t.pendingProps, a);
            case 15:
                return Gd(e, t, t.type, t.pendingProps, a);
            case 19:
                return Jd(e, t, a);
            case 31:
                return l = t.pendingProps, a = t.mode, l = {
                    mode: l.mode,
                    children: l.children
                }, e === null ? (a = Xi(l, a), a.ref = t.ref, t.child = a, a.return = t, t = a) : (a = Gt(e.child, l), a.ref = t.ref, t.child = a, a.return = t, t = a), t;
            case 22:
                return Yd(e, t, a);
            case 24:
                return Za(t), l = Pe(Ge), e === null ? (i = wr(), i === null && (i = Me, r = jr(), i.pooledCache = r, r.refCount++, r !== null && (i.pooledCacheLanes |= a), i = r), t.memoizedState = {
                    parent: l,
                    cache: i
                }, Sr(t), fa(t, Ge, i)) : ((e.lanes & a) !== 0 && (_r(e, t), gn(t, null, null, a), hn()), i = e.memoizedState, r = t.memoizedState, i.parent !== l ? (i = {
                    parent: l,
                    cache: l
                }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), fa(t, Ge, l)) : (l = r.cache, fa(t, Ge, l), l !== i.cache && vr(t, [Ge], a, !0))), Ke(e, t, t.pendingProps.children, a), t.child;
            case 29:
                throw t.pendingProps
        }
        throw Error(u(156, t.tag))
    }

    function Jt(e) {
        e.flags |= 4
    }

    function Fd(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
        else if (e.flags |= 16777216, !sm(t)) {
            if (t = Et.current, t !== null && ((pe & 4194048) === pe ? Ot !== null : (pe & 62914560) !== pe && (pe & 536870912) === 0 || t !== Ot)) throw fn = Er, Du;
            e.flags |= 8192
        }
    }

    function Vi(e, t) {
        t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ac() : 536870912, e.lanes |= t, Cl |= t)
    }

    function Nn(e, t) {
        if (!ve) switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var a = null; t !== null;) t.alternate !== null && (a = t), t = t.sibling;
                a === null ? e.tail = null : a.sibling = null;
                break;
            case "collapsed":
                a = e.tail;
                for (var l = null; a !== null;) a.alternate !== null && (l = a), a = a.sibling;
                l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null
        }
    }

    function Oe(e) {
        var t = e.alternate !== null && e.alternate.child === e.child,
            a = 0,
            l = 0;
        if (t)
            for (var i = e.child; i !== null;) a |= i.lanes | i.childLanes, l |= i.subtreeFlags & 65011712, l |= i.flags & 65011712, i.return = e, i = i.sibling;
        else
            for (i = e.child; i !== null;) a |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = e, i = i.sibling;
        return e.subtreeFlags |= l, e.childLanes = a, t
    }

    function ng(e, t, a) {
        var l = t.pendingProps;
        switch (pr(t), t.tag) {
            case 31:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return Oe(t), null;
            case 1:
                return Oe(t), null;
            case 3:
                return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Qt(Ge), oa(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (nn(t) ? Jt(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Au())), Oe(t), null;
            case 26:
                return a = t.memoizedState, e === null ? (Jt(t), a !== null ? (Oe(t), Fd(t, a)) : (Oe(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (Jt(t), Oe(t), Fd(t, a)) : (Oe(t), t.flags &= -16777217) : (e.memoizedProps !== l && Jt(t), Oe(t), t.flags &= -16777217), null;
            case 27:
                ti(t), a = ce.current;
                var i = t.type;
                if (e !== null && t.stateNode != null) e.memoizedProps !== l && Jt(t);
                else {
                    if (!l) {
                        if (t.stateNode === null) throw Error(u(166));
                        return Oe(t), null
                    }
                    e = le.current, nn(t) ? Tu(t) : (e = Pf(i, l, a), t.stateNode = e, Jt(t))
                }
                return Oe(t), null;
            case 5:
                if (ti(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== l && Jt(t);
                else {
                    if (!l) {
                        if (t.stateNode === null) throw Error(u(166));
                        return Oe(t), null
                    }
                    if (e = le.current, nn(t)) Tu(t);
                    else {
                        switch (i = ls(ce.current), e) {
                            case 1:
                                e = i.createElementNS("http://www.w3.org/2000/svg", a);
                                break;
                            case 2:
                                e = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                                break;
                            default:
                                switch (a) {
                                    case "svg":
                                        e = i.createElementNS("http://www.w3.org/2000/svg", a);
                                        break;
                                    case "math":
                                        e = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                                        break;
                                    case "script":
                                        e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                                        break;
                                    case "select":
                                        e = typeof l.is == "string" ? i.createElement("select", {
                                            is: l.is
                                        }) : i.createElement("select"), l.multiple ? e.multiple = !0 : l.size && (e.size = l.size);
                                        break;
                                    default:
                                        e = typeof l.is == "string" ? i.createElement(a, {
                                            is: l.is
                                        }) : i.createElement(a)
                                }
                        }
                        e[Fe] = t, e[lt] = l;
                        e: for (i = t.child; i !== null;) {
                            if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
                            else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                                i.child.return = i, i = i.child;
                                continue
                            }
                            if (i === t) break e;
                            for (; i.sibling === null;) {
                                if (i.return === null || i.return === t) break e;
                                i = i.return
                            }
                            i.sibling.return = i.return, i = i.sibling
                        }
                        t.stateNode = e;
                        e: switch (We(e, a, l), a) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                e = !!l.autoFocus;
                                break e;
                            case "img":
                                e = !0;
                                break e;
                            default:
                                e = !1
                        }
                        e && Jt(t)
                    }
                }
                return Oe(t), t.flags &= -16777217, null;
            case 6:
                if (e && t.stateNode != null) e.memoizedProps !== l && Jt(t);
                else {
                    if (typeof l != "string" && t.stateNode === null) throw Error(u(166));
                    if (e = ce.current, nn(t)) {
                        if (e = t.stateNode, a = t.memoizedProps, l = null, i = tt, i !== null) switch (i.tag) {
                            case 27:
                            case 5:
                                l = i.memoizedProps
                        }
                        e[Fe] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || Qf(e.nodeValue, a)), e || Va(t)
                    } else e = ls(e).createTextNode(l), e[Fe] = t, t.stateNode = e
                }
                return Oe(t), null;
            case 13:
                if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                    if (i = nn(t), l !== null && l.dehydrated !== null) {
                        if (e === null) {
                            if (!i) throw Error(u(318));
                            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(u(317));
                            i[Fe] = t
                        } else sn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                        Oe(t), i = !1
                    } else i = Au(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
                    if (!i) return t.flags & 256 ? ($t(t), t) : ($t(t), null)
                }
                if ($t(t), (t.flags & 128) !== 0) return t.lanes = a, t;
                if (a = l !== null, e = e !== null && e.memoizedState !== null, a) {
                    l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool);
                    var r = null;
                    l.memoizedState !== null && l.memoizedState.cachePool !== null && (r = l.memoizedState.cachePool.pool), r !== i && (l.flags |= 2048)
                }
                return a !== e && a && (t.child.flags |= 8192), Vi(t, t.updateQueue), Oe(t), null;
            case 4:
                return oa(), e === null && Ao(t.stateNode.containerInfo), Oe(t), null;
            case 10:
                return Qt(t.type), Oe(t), null;
            case 19:
                if (W(Ye), i = t.memoizedState, i === null) return Oe(t), null;
                if (l = (t.flags & 128) !== 0, r = i.rendering, r === null)
                    if (l) Nn(i, !1);
                    else {
                        if (Be !== 0 || e !== null && (e.flags & 128) !== 0)
                            for (e = t.child; e !== null;) {
                                if (r = Li(e), r !== null) {
                                    for (t.flags |= 128, Nn(i, !1), e = r.updateQueue, t.updateQueue = e, Vi(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null;) Su(a, e), a = a.sibling;
                                    return J(Ye, Ye.current & 1 | 2), t.child
                                }
                                e = e.sibling
                            }
                        i.tail !== null && Ct() > $i && (t.flags |= 128, l = !0, Nn(i, !1), t.lanes = 4194304)
                    }
                else {
                    if (!l)
                        if (e = Li(r), e !== null) {
                            if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, Vi(t, e), Nn(i, !0), i.tail === null && i.tailMode === "hidden" && !r.alternate && !ve) return Oe(t), null
                        } else 2 * Ct() - i.renderingStartTime > $i && a !== 536870912 && (t.flags |= 128, l = !0, Nn(i, !1), t.lanes = 4194304);
                    i.isBackwards ? (r.sibling = t.child, t.child = r) : (e = i.last, e !== null ? e.sibling = r : t.child = r, i.last = r)
                }
                return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Ct(), t.sibling = null, e = Ye.current, J(Ye, l ? e & 1 | 2 : e & 1), t) : (Oe(t), null);
            case 22:
            case 23:
                return $t(t), Mr(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oe(t), a = t.updateQueue, a !== null && Vi(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && W($a), null;
            case 24:
                return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Qt(Ge), Oe(t), null;
            case 25:
                return null;
            case 30:
                return null
        }
        throw Error(u(156, t.tag))
    }

    function ig(e, t) {
        switch (pr(t), t.tag) {
            case 1:
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 3:
                return Qt(Ge), oa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
            case 26:
            case 27:
            case 5:
                return ti(t), null;
            case 13:
                if ($t(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                    if (t.alternate === null) throw Error(u(340));
                    sn()
                }
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 19:
                return W(Ye), null;
            case 4:
                return oa(), null;
            case 10:
                return Qt(t.type), null;
            case 22:
            case 23:
                return $t(t), Mr(), e !== null && W($a), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 24:
                return Qt(Ge), null;
            case 25:
                return null;
            default:
                return null
        }
    }

    function Pd(e, t) {
        switch (pr(t), t.tag) {
            case 3:
                Qt(Ge), oa();
                break;
            case 26:
            case 27:
            case 5:
                ti(t);
                break;
            case 4:
                oa();
                break;
            case 13:
                $t(t);
                break;
            case 19:
                W(Ye);
                break;
            case 10:
                Qt(t.type);
                break;
            case 22:
            case 23:
                $t(t), Mr(), e !== null && W($a);
                break;
            case 24:
                Qt(Ge)
        }
    }

    function wn(e, t) {
        try {
            var a = t.updateQueue,
                l = a !== null ? a.lastEffect : null;
            if (l !== null) {
                var i = l.next;
                a = i;
                do {
                    if ((a.tag & e) === e) {
                        l = void 0;
                        var r = a.create,
                            d = a.inst;
                        l = r(), d.destroy = l
                    }
                    a = a.next
                } while (a !== i)
            }
        } catch (h) {
            Ae(t, t.return, h)
        }
    }

    function ba(e, t, a) {
        try {
            var l = t.updateQueue,
                i = l !== null ? l.lastEffect : null;
            if (i !== null) {
                var r = i.next;
                l = r;
                do {
                    if ((l.tag & e) === e) {
                        var d = l.inst,
                            h = d.destroy;
                        if (h !== void 0) {
                            d.destroy = void 0, i = t;
                            var b = a,
                                T = h;
                            try {
                                T()
                            } catch (B) {
                                Ae(i, b, B)
                            }
                        }
                    }
                    l = l.next
                } while (l !== r)
            }
        } catch (B) {
            Ae(t, t.return, B)
        }
    }

    function Id(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var a = e.stateNode;
            try {
                Hu(t, a)
            } catch (l) {
                Ae(e, e.return, l)
            }
        }
    }

    function ef(e, t, a) {
        a.props = Ja(e.type, e.memoizedProps), a.state = e.memoizedState;
        try {
            a.componentWillUnmount()
        } catch (l) {
            Ae(e, t, l)
        }
    }

    function En(e, t) {
        try {
            var a = e.ref;
            if (a !== null) {
                switch (e.tag) {
                    case 26:
                    case 27:
                    case 5:
                        var l = e.stateNode;
                        break;
                    case 30:
                        l = e.stateNode;
                        break;
                    default:
                        l = e.stateNode
                }
                typeof a == "function" ? e.refCleanup = a(l) : a.current = l
            }
        } catch (i) {
            Ae(e, t, i)
        }
    }

    function Dt(e, t) {
        var a = e.ref,
            l = e.refCleanup;
        if (a !== null)
            if (typeof l == "function") try {
                l()
            } catch (i) {
                Ae(e, t, i)
            } finally {
                e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
            } else if (typeof a == "function") try {
                a(null)
            } catch (i) {
                Ae(e, t, i)
            } else a.current = null
    }

    function tf(e) {
        var t = e.type,
            a = e.memoizedProps,
            l = e.stateNode;
        try {
            e: switch (t) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                    a.autoFocus && l.focus();
                    break e;
                case "img":
                    a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet)
            }
        }
        catch (i) {
            Ae(e, e.return, i)
        }
    }

    function no(e, t, a) {
        try {
            var l = e.stateNode;
            _g(l, e.type, a, t), l[lt] = t
        } catch (i) {
            Ae(e, e.return, i)
        }
    }

    function af(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ta(e.type) || e.tag === 4
    }

    function io(e) {
        e: for (;;) {
            for (; e.sibling === null;) {
                if (e.return === null || af(e.return)) return null;
                e = e.return
            }
            for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
                if (e.tag === 27 && Ta(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
                e.child.return = e, e = e.child
            }
            if (!(e.flags & 2)) return e.stateNode
        }
    }

    function so(e, t, a) {
        var l = e.tag;
        if (l === 5 || l === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = as));
        else if (l !== 4 && (l === 27 && Ta(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
            for (so(e, t, a), e = e.sibling; e !== null;) so(e, t, a), e = e.sibling
    }

    function Qi(e, t, a) {
        var l = e.tag;
        if (l === 5 || l === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
        else if (l !== 4 && (l === 27 && Ta(e.type) && (a = e.stateNode), e = e.child, e !== null))
            for (Qi(e, t, a), e = e.sibling; e !== null;) Qi(e, t, a), e = e.sibling
    }

    function lf(e) {
        var t = e.stateNode,
            a = e.memoizedProps;
        try {
            for (var l = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
            We(t, l, a), t[Fe] = e, t[lt] = a
        } catch (r) {
            Ae(e, e.return, r)
        }
    }
    var Wt = !1,
        Ue = !1,
        ro = !1,
        nf = typeof WeakSet == "function" ? WeakSet : Set,
        Ze = null;

    function sg(e, t) {
        if (e = e.containerInfo, Ro = cs, e = gu(e), ir(e)) {
            if ("selectionStart" in e) var a = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
            else e: {
                a = (a = e.ownerDocument) && a.defaultView || window;
                var l = a.getSelection && a.getSelection();
                if (l && l.rangeCount !== 0) {
                    a = l.anchorNode;
                    var i = l.anchorOffset,
                        r = l.focusNode;
                    l = l.focusOffset;
                    try {
                        a.nodeType, r.nodeType
                    } catch {
                        a = null;
                        break e
                    }
                    var d = 0,
                        h = -1,
                        b = -1,
                        T = 0,
                        B = 0,
                        H = e,
                        k = null;
                    t: for (;;) {
                        for (var M; H !== a || i !== 0 && H.nodeType !== 3 || (h = d + i), H !== r || l !== 0 && H.nodeType !== 3 || (b = d + l), H.nodeType === 3 && (d += H.nodeValue.length), (M = H.firstChild) !== null;) k = H, H = M;
                        for (;;) {
                            if (H === e) break t;
                            if (k === a && ++T === i && (h = d), k === r && ++B === l && (b = d), (M = H.nextSibling) !== null) break;
                            H = k, k = H.parentNode
                        }
                        H = M
                    }
                    a = h === -1 || b === -1 ? null : {
                        start: h,
                        end: b
                    }
                } else a = null
            }
            a = a || {
                start: 0,
                end: 0
            }
        } else a = null;
        for (Oo = {
                focusedElem: e,
                selectionRange: a
            }, cs = !1, Ze = t; Ze !== null;)
            if (t = Ze, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null) e.return = t, Ze = e;
            else
                for (; Ze !== null;) {
                    switch (t = Ze, r = t.alternate, e = t.flags, t.tag) {
                        case 0:
                            break;
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if ((e & 1024) !== 0 && r !== null) {
                                e = void 0, a = t, i = r.memoizedProps, r = r.memoizedState, l = a.stateNode;
                                try {
                                    var se = Ja(a.type, i, a.elementType === a.type);
                                    e = l.getSnapshotBeforeUpdate(se, r), l.__reactInternalSnapshotBeforeUpdate = e
                                } catch (ne) {
                                    Ae(a, a.return, ne)
                                }
                            }
                            break;
                        case 3:
                            if ((e & 1024) !== 0) {
                                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Bo(e);
                                else if (a === 1) switch (e.nodeName) {
                                    case "HEAD":
                                    case "HTML":
                                    case "BODY":
                                        Bo(e);
                                        break;
                                    default:
                                        e.textContent = ""
                                }
                            }
                            break;
                        case 5:
                        case 26:
                        case 27:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            if ((e & 1024) !== 0) throw Error(u(163))
                    }
                    if (e = t.sibling, e !== null) {
                        e.return = t.return, Ze = e;
                        break
                    }
                    Ze = t.return
                }
    }

    function sf(e, t, a) {
        var l = a.flags;
        switch (a.tag) {
            case 0:
            case 11:
            case 15:
                va(e, a), l & 4 && wn(5, a);
                break;
            case 1:
                if (va(e, a), l & 4)
                    if (e = a.stateNode, t === null) try {
                        e.componentDidMount()
                    } catch (d) {
                        Ae(a, a.return, d)
                    } else {
                        var i = Ja(a.type, t.memoizedProps);
                        t = t.memoizedState;
                        try {
                            e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                        } catch (d) {
                            Ae(a, a.return, d)
                        }
                    }
                l & 64 && Id(a), l & 512 && En(a, a.return);
                break;
            case 3:
                if (va(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
                    if (t = null, a.child !== null) switch (a.child.tag) {
                        case 27:
                        case 5:
                            t = a.child.stateNode;
                            break;
                        case 1:
                            t = a.child.stateNode
                    }
                    try {
                        Hu(e, t)
                    } catch (d) {
                        Ae(a, a.return, d)
                    }
                }
                break;
            case 27:
                t === null && l & 4 && lf(a);
            case 26:
            case 5:
                va(e, a), t === null && l & 4 && tf(a), l & 512 && En(a, a.return);
                break;
            case 12:
                va(e, a);
                break;
            case 13:
                va(e, a), l & 4 && cf(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = gg.bind(null, a), Og(e, a))));
                break;
            case 22:
                if (l = a.memoizedState !== null || Wt, !l) {
                    t = t !== null && t.memoizedState !== null || Ue, i = Wt;
                    var r = Ue;
                    Wt = l, (Ue = t) && !r ? ja(e, a, (a.subtreeFlags & 8772) !== 0) : va(e, a), Wt = i, Ue = r
                }
                break;
            case 30:
                break;
            default:
                va(e, a)
        }
    }

    function rf(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null, rf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Hs(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
    }
    var Re = null,
        st = !1;

    function Ft(e, t, a) {
        for (a = a.child; a !== null;) of (e, t, a), a = a.sibling
    }

    function of (e, t, a) {
        if (ct && typeof ct.onCommitFiberUnmount == "function") try {
            ct.onCommitFiberUnmount(Vl, a)
        } catch {}
        switch (a.tag) {
            case 26:
                Ue || Dt(a, t), Ft(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
                break;
            case 27:
                Ue || Dt(a, t);
                var l = Re,
                    i = st;
                Ta(a.type) && (Re = a.stateNode, st = !1), Ft(e, t, a), On(a.stateNode), Re = l, st = i;
                break;
            case 5:
                Ue || Dt(a, t);
            case 6:
                if (l = Re, i = st, Re = null, Ft(e, t, a), Re = l, st = i, Re !== null)
                    if (st) try {
                        (Re.nodeType === 9 ? Re.body : Re.nodeName === "HTML" ? Re.ownerDocument.body : Re).removeChild(a.stateNode)
                    } catch (r) {
                        Ae(a, t, r)
                    } else try {
                        Re.removeChild(a.stateNode)
                    } catch (r) {
                        Ae(a, t, r)
                    }
                break;
            case 18:
                Re !== null && (st ? (e = Re, Wf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), Gn(e)) : Wf(Re, a.stateNode));
                break;
            case 4:
                l = Re, i = st, Re = a.stateNode.containerInfo, st = !0, Ft(e, t, a), Re = l, st = i;
                break;
            case 0:
            case 11:
            case 14:
            case 15:
                Ue || ba(2, a, t), Ue || ba(4, a, t), Ft(e, t, a);
                break;
            case 1:
                Ue || (Dt(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && ef(a, t, l)), Ft(e, t, a);
                break;
            case 21:
                Ft(e, t, a);
                break;
            case 22:
                Ue = (l = Ue) || a.memoizedState !== null, Ft(e, t, a), Ue = l;
                break;
            default:
                Ft(e, t, a)
        }
    }

    function cf(e, t) {
        if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
            Gn(e)
        } catch (a) {
            Ae(t, t.return, a)
        }
    }

    function rg(e) {
        switch (e.tag) {
            case 13:
            case 19:
                var t = e.stateNode;
                return t === null && (t = e.stateNode = new nf), t;
            case 22:
                return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nf), t;
            default:
                throw Error(u(435, e.tag))
        }
    }

    function oo(e, t) {
        var a = rg(e);
        t.forEach(function(l) {
            var i = pg.bind(null, e, l);
            a.has(l) || (a.add(l), l.then(i, i))
        })
    }

    function mt(e, t) {
        var a = t.deletions;
        if (a !== null)
            for (var l = 0; l < a.length; l++) {
                var i = a[l],
                    r = e,
                    d = t,
                    h = d;
                e: for (; h !== null;) {
                    switch (h.tag) {
                        case 27:
                            if (Ta(h.type)) {
                                Re = h.stateNode, st = !1;
                                break e
                            }
                            break;
                        case 5:
                            Re = h.stateNode, st = !1;
                            break e;
                        case 3:
                        case 4:
                            Re = h.stateNode.containerInfo, st = !0;
                            break e
                    }
                    h = h.return
                }
                if (Re === null) throw Error(u(160)); of (r, d, i), Re = null, st = !1, r = i.alternate, r !== null && (r.return = null), i.return = null
            }
        if (t.subtreeFlags & 13878)
            for (t = t.child; t !== null;) uf(t, e), t = t.sibling
    }
    var kt = null;

    function uf(e, t) {
        var a = e.alternate,
            l = e.flags;
        switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                mt(t, e), ht(e), l & 4 && (ba(3, e, e.return), wn(3, e), ba(5, e, e.return));
                break;
            case 1:
                mt(t, e), ht(e), l & 512 && (Ue || a === null || Dt(a, a.return)), l & 64 && Wt && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
                break;
            case 26:
                var i = kt;
                if (mt(t, e), ht(e), l & 512 && (Ue || a === null || Dt(a, a.return)), l & 4) {
                    var r = a !== null ? a.memoizedState : null;
                    if (l = e.memoizedState, a === null)
                        if (l === null)
                            if (e.stateNode === null) {
                                e: {
                                    l = e.type,
                                    a = e.memoizedProps,
                                    i = i.ownerDocument || i;t: switch (l) {
                                        case "title":
                                            r = i.getElementsByTagName("title")[0], (!r || r[$l] || r[Fe] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = i.createElement(l), i.head.insertBefore(r, i.querySelector("head > title"))), We(r, l, a), r[Fe] = e, Ve(r), l = r;
                                            break e;
                                        case "link":
                                            var d = nm("link", "href", i).get(l + (a.href || ""));
                                            if (d) {
                                                for (var h = 0; h < d.length; h++)
                                                    if (r = d[h], r.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && r.getAttribute("rel") === (a.rel == null ? null : a.rel) && r.getAttribute("title") === (a.title == null ? null : a.title) && r.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                                                        d.splice(h, 1);
                                                        break t
                                                    }
                                            }
                                            r = i.createElement(l), We(r, l, a), i.head.appendChild(r);
                                            break;
                                        case "meta":
                                            if (d = nm("meta", "content", i).get(l + (a.content || ""))) {
                                                for (h = 0; h < d.length; h++)
                                                    if (r = d[h], r.getAttribute("content") === (a.content == null ? null : "" + a.content) && r.getAttribute("name") === (a.name == null ? null : a.name) && r.getAttribute("property") === (a.property == null ? null : a.property) && r.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && r.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                                                        d.splice(h, 1);
                                                        break t
                                                    }
                                            }
                                            r = i.createElement(l), We(r, l, a), i.head.appendChild(r);
                                            break;
                                        default:
                                            throw Error(u(468, l))
                                    }
                                    r[Fe] = e,
                                    Ve(r),
                                    l = r
                                }
                                e.stateNode = l
                            }
                    else im(i, e.type, e.stateNode);
                    else e.stateNode = lm(i, l, e.memoizedProps);
                    else r !== l ? (r === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : r.count--, l === null ? im(i, e.type, e.stateNode) : lm(i, l, e.memoizedProps)) : l === null && e.stateNode !== null && no(e, e.memoizedProps, a.memoizedProps)
                }
                break;
            case 27:
                mt(t, e), ht(e), l & 512 && (Ue || a === null || Dt(a, a.return)), a !== null && l & 4 && no(e, e.memoizedProps, a.memoizedProps);
                break;
            case 5:
                if (mt(t, e), ht(e), l & 512 && (Ue || a === null || Dt(a, a.return)), e.flags & 32) {
                    i = e.stateNode;
                    try {
                        cl(i, "")
                    } catch (M) {
                        Ae(e, e.return, M)
                    }
                }
                l & 4 && e.stateNode != null && (i = e.memoizedProps, no(e, i, a !== null ? a.memoizedProps : i)), l & 1024 && (ro = !0);
                break;
            case 6:
                if (mt(t, e), ht(e), l & 4) {
                    if (e.stateNode === null) throw Error(u(162));
                    l = e.memoizedProps, a = e.stateNode;
                    try {
                        a.nodeValue = l
                    } catch (M) {
                        Ae(e, e.return, M)
                    }
                }
                break;
            case 3:
                if (ss = null, i = kt, kt = ns(t.containerInfo), mt(t, e), kt = i, ht(e), l & 4 && a !== null && a.memoizedState.isDehydrated) try {
                    Gn(t.containerInfo)
                } catch (M) {
                    Ae(e, e.return, M)
                }
                ro && (ro = !1, df(e));
                break;
            case 4:
                l = kt, kt = ns(e.stateNode.containerInfo), mt(t, e), ht(e), kt = l;
                break;
            case 12:
                mt(t, e), ht(e);
                break;
            case 13:
                mt(t, e), ht(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (go = Ct()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, oo(e, l)));
                break;
            case 22:
                i = e.memoizedState !== null;
                var b = a !== null && a.memoizedState !== null,
                    T = Wt,
                    B = Ue;
                if (Wt = T || i, Ue = B || b, mt(t, e), Ue = B, Wt = T, ht(e), l & 8192) e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (a === null || b || Wt || Ue || Wa(e)), a = null, t = e;;) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (a === null) {
                            b = a = t;
                            try {
                                if (r = b.stateNode, i) d = r.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                                else {
                                    h = b.stateNode;
                                    var H = b.memoizedProps.style,
                                        k = H != null && H.hasOwnProperty("display") ? H.display : null;
                                    h.style.display = k == null || typeof k == "boolean" ? "" : ("" + k).trim()
                                }
                            } catch (M) {
                                Ae(b, b.return, M)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (a === null) {
                            b = t;
                            try {
                                b.stateNode.nodeValue = i ? "" : b.memoizedProps
                            } catch (M) {
                                Ae(b, b.return, M)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t, t = t.child;
                        continue
                    }
                    if (t === e) break e;
                    for (; t.sibling === null;) {
                        if (t.return === null || t.return === e) break e;
                        a === t && (a = null), t = t.return
                    }
                    a === t && (a = null), t.sibling.return = t.return, t = t.sibling
                }
                l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, oo(e, a))));
                break;
            case 19:
                mt(t, e), ht(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, oo(e, l)));
                break;
            case 30:
                break;
            case 21:
                break;
            default:
                mt(t, e), ht(e)
        }
    }

    function ht(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var a, l = e.return; l !== null;) {
                    if (af(l)) {
                        a = l;
                        break
                    }
                    l = l.return
                }
                if (a == null) throw Error(u(160));
                switch (a.tag) {
                    case 27:
                        var i = a.stateNode,
                            r = io(e);
                        Qi(e, r, i);
                        break;
                    case 5:
                        var d = a.stateNode;
                        a.flags & 32 && (cl(d, ""), a.flags &= -33);
                        var h = io(e);
                        Qi(e, h, d);
                        break;
                    case 3:
                    case 4:
                        var b = a.stateNode.containerInfo,
                            T = io(e);
                        so(e, T, b);
                        break;
                    default:
                        throw Error(u(161))
                }
            } catch (B) {
                Ae(e, e.return, B)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }

    function df(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null;) {
                var t = e;
                df(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
            }
    }

    function va(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null;) sf(e, t.alternate, t), t = t.sibling
    }

    function Wa(e) {
        for (e = e.child; e !== null;) {
            var t = e;
            switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    ba(4, t, t.return), Wa(t);
                    break;
                case 1:
                    Dt(t, t.return);
                    var a = t.stateNode;
                    typeof a.componentWillUnmount == "function" && ef(t, t.return, a), Wa(t);
                    break;
                case 27:
                    On(t.stateNode);
                case 26:
                case 5:
                    Dt(t, t.return), Wa(t);
                    break;
                case 22:
                    t.memoizedState === null && Wa(t);
                    break;
                case 30:
                    Wa(t);
                    break;
                default:
                    Wa(t)
            }
            e = e.sibling
        }
    }

    function ja(e, t, a) {
        for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
            var l = t.alternate,
                i = e,
                r = t,
                d = r.flags;
            switch (r.tag) {
                case 0:
                case 11:
                case 15:
                    ja(i, r, a), wn(4, r);
                    break;
                case 1:
                    if (ja(i, r, a), l = r, i = l.stateNode, typeof i.componentDidMount == "function") try {
                        i.componentDidMount()
                    } catch (T) {
                        Ae(l, l.return, T)
                    }
                    if (l = r, i = l.updateQueue, i !== null) {
                        var h = l.stateNode;
                        try {
                            var b = i.shared.hiddenCallbacks;
                            if (b !== null)
                                for (i.shared.hiddenCallbacks = null, i = 0; i < b.length; i++) Lu(b[i], h)
                        } catch (T) {
                            Ae(l, l.return, T)
                        }
                    }
                    a && d & 64 && Id(r), En(r, r.return);
                    break;
                case 27:
                    lf(r);
                case 26:
                case 5:
                    ja(i, r, a), a && l === null && d & 4 && tf(r), En(r, r.return);
                    break;
                case 12:
                    ja(i, r, a);
                    break;
                case 13:
                    ja(i, r, a), a && d & 4 && cf(i, r);
                    break;
                case 22:
                    r.memoizedState === null && ja(i, r, a), En(r, r.return);
                    break;
                case 30:
                    break;
                default:
                    ja(i, r, a)
            }
            t = t.sibling
        }
    }

    function co(e, t) {
        var a = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && cn(a))
    }

    function uo(e, t) {
        e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && cn(e))
    }

    function zt(e, t, a, l) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) ff(e, t, a, l), t = t.sibling
    }

    function ff(e, t, a, l) {
        var i = t.flags;
        switch (t.tag) {
            case 0:
            case 11:
            case 15:
                zt(e, t, a, l), i & 2048 && wn(9, t);
                break;
            case 1:
                zt(e, t, a, l);
                break;
            case 3:
                zt(e, t, a, l), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && cn(e)));
                break;
            case 12:
                if (i & 2048) {
                    zt(e, t, a, l), e = t.stateNode;
                    try {
                        var r = t.memoizedProps,
                            d = r.id,
                            h = r.onPostCommit;
                        typeof h == "function" && h(d, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                    } catch (b) {
                        Ae(t, t.return, b)
                    }
                } else zt(e, t, a, l);
                break;
            case 13:
                zt(e, t, a, l);
                break;
            case 23:
                break;
            case 22:
                r = t.stateNode, d = t.alternate, t.memoizedState !== null ? r._visibility & 2 ? zt(e, t, a, l) : Sn(e, t) : r._visibility & 2 ? zt(e, t, a, l) : (r._visibility |= 2, kl(e, t, a, l, (t.subtreeFlags & 10256) !== 0)), i & 2048 && co(d, t);
                break;
            case 24:
                zt(e, t, a, l), i & 2048 && uo(t.alternate, t);
                break;
            default:
                zt(e, t, a, l)
        }
    }

    function kl(e, t, a, l, i) {
        for (i = i && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null;) {
            var r = e,
                d = t,
                h = a,
                b = l,
                T = d.flags;
            switch (d.tag) {
                case 0:
                case 11:
                case 15:
                    kl(r, d, h, b, i), wn(8, d);
                    break;
                case 23:
                    break;
                case 22:
                    var B = d.stateNode;
                    d.memoizedState !== null ? B._visibility & 2 ? kl(r, d, h, b, i) : Sn(r, d) : (B._visibility |= 2, kl(r, d, h, b, i)), i && T & 2048 && co(d.alternate, d);
                    break;
                case 24:
                    kl(r, d, h, b, i), i && T & 2048 && uo(d.alternate, d);
                    break;
                default:
                    kl(r, d, h, b, i)
            }
            t = t.sibling
        }
    }

    function Sn(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) {
                var a = e,
                    l = t,
                    i = l.flags;
                switch (l.tag) {
                    case 22:
                        Sn(a, l), i & 2048 && co(l.alternate, l);
                        break;
                    case 24:
                        Sn(a, l), i & 2048 && uo(l.alternate, l);
                        break;
                    default:
                        Sn(a, l)
                }
                t = t.sibling
            }
    }
    var _n = 8192;

    function Al(e) {
        if (e.subtreeFlags & _n)
            for (e = e.child; e !== null;) mf(e), e = e.sibling
    }

    function mf(e) {
        switch (e.tag) {
            case 26:
                Al(e), e.flags & _n && e.memoizedState !== null && Zg(kt, e.memoizedState, e.memoizedProps);
                break;
            case 5:
                Al(e);
                break;
            case 3:
            case 4:
                var t = kt;
                kt = ns(e.stateNode.containerInfo), Al(e), kt = t;
                break;
            case 22:
                e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = _n, _n = 16777216, Al(e), _n = t) : Al(e));
                break;
            default:
                Al(e)
        }
    }

    function hf(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child, e !== null)) {
            t.child = null;
            do t = e.sibling, e.sibling = null, e = t; while (e !== null)
        }
    }

    function Tn(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var a = 0; a < t.length; a++) {
                    var l = t[a];
                    Ze = l, pf(l, e)
                }
            hf(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null;) gf(e), e = e.sibling
    }

    function gf(e) {
        switch (e.tag) {
            case 0:
            case 11:
            case 15:
                Tn(e), e.flags & 2048 && ba(9, e, e.return);
                break;
            case 3:
                Tn(e);
                break;
            case 12:
                Tn(e);
                break;
            case 22:
                var t = e.stateNode;
                e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Zi(e)) : Tn(e);
                break;
            default:
                Tn(e)
        }
    }

    function Zi(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var a = 0; a < t.length; a++) {
                    var l = t[a];
                    Ze = l, pf(l, e)
                }
            hf(e)
        }
        for (e = e.child; e !== null;) {
            switch (t = e, t.tag) {
                case 0:
                case 11:
                case 15:
                    ba(8, t, t.return), Zi(t);
                    break;
                case 22:
                    a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Zi(t));
                    break;
                default:
                    Zi(t)
            }
            e = e.sibling
        }
    }

    function pf(e, t) {
        for (; Ze !== null;) {
            var a = Ze;
            switch (a.tag) {
                case 0:
                case 11:
                case 15:
                    ba(8, a, t);
                    break;
                case 23:
                case 22:
                    if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
                        var l = a.memoizedState.cachePool.pool;
                        l != null && l.refCount++
                    }
                    break;
                case 24:
                    cn(a.memoizedState.cache)
            }
            if (l = a.child, l !== null) l.return = a, Ze = l;
            else e: for (a = e; Ze !== null;) {
                l = Ze;
                var i = l.sibling,
                    r = l.return;
                if (rf(l), l === a) {
                    Ze = null;
                    break e
                }
                if (i !== null) {
                    i.return = r, Ze = i;
                    break e
                }
                Ze = r
            }
        }
    }
    var og = {
            getCacheForType: function(e) {
                var t = Pe(Ge),
                    a = t.data.get(e);
                return a === void 0 && (a = e(), t.data.set(e, a)), a
            }
        },
        cg = typeof WeakMap == "function" ? WeakMap : Map,
        Ne = 0,
        Me = null,
        he = null,
        pe = 0,
        we = 0,
        gt = null,
        Na = !1,
        Ml = !1,
        fo = !1,
        Pt = 0,
        Be = 0,
        wa = 0,
        Fa = 0,
        mo = 0,
        St = 0,
        Cl = 0,
        kn = null,
        rt = null,
        ho = !1,
        go = 0,
        $i = 1 / 0,
        Ki = null,
        Ea = null,
        Je = 0,
        Sa = null,
        Rl = null,
        Ol = 0,
        po = 0,
        xo = null,
        xf = null,
        An = 0,
        yo = null;

    function pt() {
        if ((Ne & 2) !== 0 && pe !== 0) return pe & -pe;
        if (R.T !== null) {
            var e = vl;
            return e !== 0 ? e : So()
        }
        return Rc()
    }

    function yf() {
        St === 0 && (St = (pe & 536870912) === 0 || ve ? kc() : 536870912);
        var e = Et.current;
        return e !== null && (e.flags |= 32), St
    }

    function xt(e, t, a) {
        (e === Me && (we === 2 || we === 9) || e.cancelPendingCommit !== null) && (Dl(e, 0), _a(e, pe, St, !1)), Zl(e, a), ((Ne & 2) === 0 || e !== Me) && (e === Me && ((Ne & 2) === 0 && (Fa |= a), Be === 4 && _a(e, pe, St, !1)), Bt(e))
    }

    function bf(e, t, a) {
        if ((Ne & 6) !== 0) throw Error(u(327));
        var l = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Ql(e, t),
            i = l ? fg(e, t) : jo(e, t, !0),
            r = l;
        do {
            if (i === 0) {
                Ml && !l && _a(e, t, 0, !1);
                break
            } else {
                if (a = e.current.alternate, r && !ug(a)) {
                    i = jo(e, t, !1), r = !1;
                    continue
                }
                if (i === 2) {
                    if (r = t, e.errorRecoveryDisabledLanes & r) var d = 0;
                    else d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
                    if (d !== 0) {
                        t = d;
                        e: {
                            var h = e;i = kn;
                            var b = h.current.memoizedState.isDehydrated;
                            if (b && (Dl(h, d).flags |= 256), d = jo(h, d, !1), d !== 2) {
                                if (fo && !b) {
                                    h.errorRecoveryDisabledLanes |= r, Fa |= r, i = 4;
                                    break e
                                }
                                r = rt, rt = i, r !== null && (rt === null ? rt = r : rt.push.apply(rt, r))
                            }
                            i = d
                        }
                        if (r = !1, i !== 2) continue
                    }
                }
                if (i === 1) {
                    Dl(e, 0), _a(e, t, 0, !0);
                    break
                }
                e: {
                    switch (l = e, r = i, r) {
                        case 0:
                        case 1:
                            throw Error(u(345));
                        case 4:
                            if ((t & 4194048) !== t) break;
                        case 6:
                            _a(l, t, St, !Na);
                            break e;
                        case 2:
                            rt = null;
                            break;
                        case 3:
                        case 5:
                            break;
                        default:
                            throw Error(u(329))
                    }
                    if ((t & 62914560) === t && (i = go + 300 - Ct(), 10 < i)) {
                        if (_a(l, t, St, !Na), ii(l, 0, !0) !== 0) break e;
                        l.timeoutHandle = Kf(vf.bind(null, l, a, rt, Ki, ho, t, St, Fa, Cl, Na, r, 2, -0, 0), i);
                        break e
                    }
                    vf(l, a, rt, Ki, ho, t, St, Fa, Cl, Na, r, 0, -0, 0)
                }
            }
            break
        } while (!0);
        Bt(e)
    }

    function vf(e, t, a, l, i, r, d, h, b, T, B, H, k, M) {
        if (e.timeoutHandle = -1, H = t.subtreeFlags, (H & 8192 || (H & 16785408) === 16785408) && (Bn = {
                stylesheets: null,
                count: 0,
                unsuspend: Qg
            }, mf(t), H = $g(), H !== null)) {
            e.cancelPendingCommit = H(Tf.bind(null, e, t, r, a, l, i, d, h, b, B, 1, k, M)), _a(e, r, d, !T);
            return
        }
        Tf(e, t, r, a, l, i, d, h, b)
    }

    function ug(e) {
        for (var t = e;;) {
            var a = t.tag;
            if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
                for (var l = 0; l < a.length; l++) {
                    var i = a[l],
                        r = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!dt(r(), i)) return !1
                    } catch {
                        return !1
                    }
                }
            if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
            else {
                if (t === e) break;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e) return !0;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
        }
        return !0
    }

    function _a(e, t, a, l) {
        t &= ~mo, t &= ~Fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
        for (var i = t; 0 < i;) {
            var r = 31 - ut(i),
                d = 1 << r;
            l[r] = -1, i &= ~d
        }
        a !== 0 && Mc(e, a, t)
    }

    function Ji() {
        return (Ne & 6) === 0 ? (Mn(0), !1) : !0
    }

    function bo() {
        if (he !== null) {
            if (we === 0) var e = he.return;
            else e = he, Vt = Qa = null, zr(e), _l = null, vn = 0, e = he;
            for (; e !== null;) Pd(e.alternate, e), e = e.return;
            he = null
        }
    }

    function Dl(e, t) {
        var a = e.timeoutHandle;
        a !== -1 && (e.timeoutHandle = -1, kg(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), bo(), Me = e, he = a = Gt(e.current, null), pe = t, we = 0, gt = null, Na = !1, Ml = Ql(e, t), fo = !1, Cl = St = mo = Fa = wa = Be = 0, rt = kn = null, ho = !1, (t & 8) !== 0 && (t |= t & 32);
        var l = e.entangledLanes;
        if (l !== 0)
            for (e = e.entanglements, l &= t; 0 < l;) {
                var i = 31 - ut(l),
                    r = 1 << i;
                t |= e[i], l &= ~r
            }
        return Pt = t, xi(), a
    }

    function jf(e, t) {
        de = null, R.H = Bi, t === dn || t === _i ? (t = qu(), we = 3) : t === Du ? (t = qu(), we = 4) : we = t === Ud ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, gt = t, he === null && (Be = 1, Gi(e, vt(t, e.current)))
    }

    function Nf() {
        var e = R.H;
        return R.H = Bi, e === null ? Bi : e
    }

    function wf() {
        var e = R.A;
        return R.A = og, e
    }

    function vo() {
        Be = 4, Na || (pe & 4194048) !== pe && Et.current !== null || (Ml = !0), (wa & 134217727) === 0 && (Fa & 134217727) === 0 || Me === null || _a(Me, pe, St, !1)
    }

    function jo(e, t, a) {
        var l = Ne;
        Ne |= 2;
        var i = Nf(),
            r = wf();
        (Me !== e || pe !== t) && (Ki = null, Dl(e, t)), t = !1;
        var d = Be;
        e: do try {
                if (we !== 0 && he !== null) {
                    var h = he,
                        b = gt;
                    switch (we) {
                        case 8:
                            bo(), d = 6;
                            break e;
                        case 3:
                        case 2:
                        case 9:
                        case 6:
                            Et.current === null && (t = !0);
                            var T = we;
                            if (we = 0, gt = null, zl(e, h, b, T), a && Ml) {
                                d = 0;
                                break e
                            }
                            break;
                        default:
                            T = we, we = 0, gt = null, zl(e, h, b, T)
                    }
                }
                dg(), d = Be;
                break
            } catch (B) {
                jf(e, B)
            }
            while (!0);
            return t && e.shellSuspendCounter++, Vt = Qa = null, Ne = l, R.H = i, R.A = r, he === null && (Me = null, pe = 0, xi()), d
    }

    function dg() {
        for (; he !== null;) Ef(he)
    }

    function fg(e, t) {
        var a = Ne;
        Ne |= 2;
        var l = Nf(),
            i = wf();
        Me !== e || pe !== t ? (Ki = null, $i = Ct() + 500, Dl(e, t)) : Ml = Ql(e, t);
        e: do try {
                if (we !== 0 && he !== null) {
                    t = he;
                    var r = gt;
                    t: switch (we) {
                        case 1:
                            we = 0, gt = null, zl(e, t, r, 1);
                            break;
                        case 2:
                        case 9:
                            if (zu(r)) {
                                we = 0, gt = null, Sf(t);
                                break
                            }
                            t = function() {
                                we !== 2 && we !== 9 || Me !== e || (we = 7), Bt(e)
                            }, r.then(t, t);
                            break e;
                        case 3:
                            we = 7;
                            break e;
                        case 4:
                            we = 5;
                            break e;
                        case 7:
                            zu(r) ? (we = 0, gt = null, Sf(t)) : (we = 0, gt = null, zl(e, t, r, 7));
                            break;
                        case 5:
                            var d = null;
                            switch (he.tag) {
                                case 26:
                                    d = he.memoizedState;
                                case 5:
                                case 27:
                                    var h = he;
                                    if (!d || sm(d)) {
                                        we = 0, gt = null;
                                        var b = h.sibling;
                                        if (b !== null) he = b;
                                        else {
                                            var T = h.return;
                                            T !== null ? (he = T, Wi(T)) : he = null
                                        }
                                        break t
                                    }
                            }
                            we = 0, gt = null, zl(e, t, r, 5);
                            break;
                        case 6:
                            we = 0, gt = null, zl(e, t, r, 6);
                            break;
                        case 8:
                            bo(), Be = 6;
                            break e;
                        default:
                            throw Error(u(462))
                    }
                }
                mg();
                break
            } catch (B) {
                jf(e, B)
            }
            while (!0);
            return Vt = Qa = null, R.H = l, R.A = i, Ne = a, he !== null ? 0 : (Me = null, pe = 0, xi(), Be)
    }

    function mg() {
        for (; he !== null && !z0();) Ef(he)
    }

    function Ef(e) {
        var t = Wd(e.alternate, e, Pt);
        e.memoizedProps = e.pendingProps, t === null ? Wi(e) : he = t
    }

    function Sf(e) {
        var t = e,
            a = t.alternate;
        switch (t.tag) {
            case 15:
            case 0:
                t = Vd(a, t, t.pendingProps, t.type, void 0, pe);
                break;
            case 11:
                t = Vd(a, t, t.pendingProps, t.type.render, t.ref, pe);
                break;
            case 5:
                zr(t);
            default:
                Pd(a, t), t = he = Su(t, Pt), t = Wd(a, t, Pt)
        }
        e.memoizedProps = e.pendingProps, t === null ? Wi(e) : he = t
    }

    function zl(e, t, a, l) {
        Vt = Qa = null, zr(t), _l = null, vn = 0;
        var i = t.return;
        try {
            if (ag(e, i, t, a, pe)) {
                Be = 1, Gi(e, vt(a, e.current)), he = null;
                return
            }
        } catch (r) {
            if (i !== null) throw he = i, r;
            Be = 1, Gi(e, vt(a, e.current)), he = null;
            return
        }
        t.flags & 32768 ? (ve || l === 1 ? e = !0 : Ml || (pe & 536870912) !== 0 ? e = !1 : (Na = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Et.current, l !== null && l.tag === 13 && (l.flags |= 16384))), _f(t, e)) : Wi(t)
    }

    function Wi(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                _f(t, Na);
                return
            }
            e = t.return;
            var a = ng(t.alternate, t, Pt);
            if (a !== null) {
                he = a;
                return
            }
            if (t = t.sibling, t !== null) {
                he = t;
                return
            }
            he = t = e
        } while (t !== null);
        Be === 0 && (Be = 5)
    }

    function _f(e, t) {
        do {
            var a = ig(e.alternate, e);
            if (a !== null) {
                a.flags &= 32767, he = a;
                return
            }
            if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
                he = e;
                return
            }
            he = e = a
        } while (e !== null);
        Be = 6, he = null
    }

    function Tf(e, t, a, l, i, r, d, h, b) {
        e.cancelPendingCommit = null;
        do Fi(); while (Je !== 0);
        if ((Ne & 6) !== 0) throw Error(u(327));
        if (t !== null) {
            if (t === e.current) throw Error(u(177));
            if (r = t.lanes | t.childLanes, r |= ur, Q0(e, a, r, d, h, b), e === Me && (he = Me = null, pe = 0), Rl = t, Sa = e, Ol = a, po = r, xo = i, xf = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, xg(ai, function() {
                    return Rf(), null
                })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
                l = R.T, R.T = null, i = Z.p, Z.p = 2, d = Ne, Ne |= 4;
                try {
                    sg(e, t, a)
                } finally {
                    Ne = d, Z.p = i, R.T = l
                }
            }
            Je = 1, kf(), Af(), Mf()
        }
    }

    function kf() {
        if (Je === 1) {
            Je = 0;
            var e = Sa,
                t = Rl,
                a = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || a) {
                a = R.T, R.T = null;
                var l = Z.p;
                Z.p = 2;
                var i = Ne;
                Ne |= 4;
                try {
                    uf(t, e);
                    var r = Oo,
                        d = gu(e.containerInfo),
                        h = r.focusedElem,
                        b = r.selectionRange;
                    if (d !== h && h && h.ownerDocument && hu(h.ownerDocument.documentElement, h)) {
                        if (b !== null && ir(h)) {
                            var T = b.start,
                                B = b.end;
                            if (B === void 0 && (B = T), "selectionStart" in h) h.selectionStart = T, h.selectionEnd = Math.min(B, h.value.length);
                            else {
                                var H = h.ownerDocument || document,
                                    k = H && H.defaultView || window;
                                if (k.getSelection) {
                                    var M = k.getSelection(),
                                        se = h.textContent.length,
                                        ne = Math.min(b.start, se),
                                        _e = b.end === void 0 ? ne : Math.min(b.end, se);
                                    !M.extend && ne > _e && (d = _e, _e = ne, ne = d);
                                    var S = mu(h, ne),
                                        w = mu(h, _e);
                                    if (S && w && (M.rangeCount !== 1 || M.anchorNode !== S.node || M.anchorOffset !== S.offset || M.focusNode !== w.node || M.focusOffset !== w.offset)) {
                                        var _ = H.createRange();
                                        _.setStart(S.node, S.offset), M.removeAllRanges(), ne > _e ? (M.addRange(_), M.extend(w.node, w.offset)) : (_.setEnd(w.node, w.offset), M.addRange(_))
                                    }
                                }
                            }
                        }
                        for (H = [], M = h; M = M.parentNode;) M.nodeType === 1 && H.push({
                            element: M,
                            left: M.scrollLeft,
                            top: M.scrollTop
                        });
                        for (typeof h.focus == "function" && h.focus(), h = 0; h < H.length; h++) {
                            var U = H[h];
                            U.element.scrollLeft = U.left, U.element.scrollTop = U.top
                        }
                    }
                    cs = !!Ro, Oo = Ro = null
                } finally {
                    Ne = i, Z.p = l, R.T = a
                }
            }
            e.current = t, Je = 2
        }
    }

    function Af() {
        if (Je === 2) {
            Je = 0;
            var e = Sa,
                t = Rl,
                a = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || a) {
                a = R.T, R.T = null;
                var l = Z.p;
                Z.p = 2;
                var i = Ne;
                Ne |= 4;
                try {
                    sf(e, t.alternate, t)
                } finally {
                    Ne = i, Z.p = l, R.T = a
                }
            }
            Je = 3
        }
    }

    function Mf() {
        if (Je === 4 || Je === 3) {
            Je = 0, B0();
            var e = Sa,
                t = Rl,
                a = Ol,
                l = xf;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Je = 5 : (Je = 0, Rl = Sa = null, Cf(e, e.pendingLanes));
            var i = e.pendingLanes;
            if (i === 0 && (Ea = null), Us(a), t = t.stateNode, ct && typeof ct.onCommitFiberRoot == "function") try {
                ct.onCommitFiberRoot(Vl, t, void 0, (t.current.flags & 128) === 128)
            } catch {}
            if (l !== null) {
                t = R.T, i = Z.p, Z.p = 2, R.T = null;
                try {
                    for (var r = e.onRecoverableError, d = 0; d < l.length; d++) {
                        var h = l[d];
                        r(h.value, {
                            componentStack: h.stack
                        })
                    }
                } finally {
                    R.T = t, Z.p = i
                }
            }(Ol & 3) !== 0 && Fi(), Bt(e), i = e.pendingLanes, (a & 4194090) !== 0 && (i & 42) !== 0 ? e === yo ? An++ : (An = 0, yo = e) : An = 0, Mn(0)
        }
    }

    function Cf(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, cn(t)))
    }

    function Fi(e) {
        return kf(), Af(), Mf(), Rf()
    }

    function Rf() {
        if (Je !== 5) return !1;
        var e = Sa,
            t = po;
        po = 0;
        var a = Us(Ol),
            l = R.T,
            i = Z.p;
        try {
            Z.p = 32 > a ? 32 : a, R.T = null, a = xo, xo = null;
            var r = Sa,
                d = Ol;
            if (Je = 0, Rl = Sa = null, Ol = 0, (Ne & 6) !== 0) throw Error(u(331));
            var h = Ne;
            if (Ne |= 4, gf(r.current), ff(r, r.current, d, a), Ne = h, Mn(0, !1), ct && typeof ct.onPostCommitFiberRoot == "function") try {
                ct.onPostCommitFiberRoot(Vl, r)
            } catch {}
            return !0
        } finally {
            Z.p = i, R.T = l, Cf(e, t)
        }
    }

    function Of(e, t, a) {
        t = vt(a, t), t = Jr(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (Zl(e, 2), Bt(e))
    }

    function Ae(e, t, a) {
        if (e.tag === 3) Of(e, e, a);
        else
            for (; t !== null;) {
                if (t.tag === 3) {
                    Of(t, e, a);
                    break
                } else if (t.tag === 1) {
                    var l = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ea === null || !Ea.has(l))) {
                        e = vt(a, e), a = Bd(2), l = ga(t, a, 2), l !== null && (qd(a, l, t, e), Zl(l, 2), Bt(l));
                        break
                    }
                }
                t = t.return
            }
    }

    function No(e, t, a) {
        var l = e.pingCache;
        if (l === null) {
            l = e.pingCache = new cg;
            var i = new Set;
            l.set(t, i)
        } else i = l.get(t), i === void 0 && (i = new Set, l.set(t, i));
        i.has(a) || (fo = !0, i.add(a), e = hg.bind(null, e, t, a), t.then(e, e))
    }

    function hg(e, t, a) {
        var l = e.pingCache;
        l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Me === e && (pe & a) === a && (Be === 4 || Be === 3 && (pe & 62914560) === pe && 300 > Ct() - go ? (Ne & 2) === 0 && Dl(e, 0) : mo |= a, Cl === pe && (Cl = 0)), Bt(e)
    }

    function Df(e, t) {
        t === 0 && (t = Ac()), e = pl(e, t), e !== null && (Zl(e, t), Bt(e))
    }

    function gg(e) {
        var t = e.memoizedState,
            a = 0;
        t !== null && (a = t.retryLane), Df(e, a)
    }

    function pg(e, t) {
        var a = 0;
        switch (e.tag) {
            case 13:
                var l = e.stateNode,
                    i = e.memoizedState;
                i !== null && (a = i.retryLane);
                break;
            case 19:
                l = e.stateNode;
                break;
            case 22:
                l = e.stateNode._retryCache;
                break;
            default:
                throw Error(u(314))
        }
        l !== null && l.delete(t), Df(e, a)
    }

    function xg(e, t) {
        return Ds(e, t)
    }
    var Pi = null,
        Bl = null,
        wo = !1,
        Ii = !1,
        Eo = !1,
        Pa = 0;

    function Bt(e) {
        e !== Bl && e.next === null && (Bl === null ? Pi = Bl = e : Bl = Bl.next = e), Ii = !0, wo || (wo = !0, bg())
    }

    function Mn(e, t) {
        if (!Eo && Ii) {
            Eo = !0;
            do
                for (var a = !1, l = Pi; l !== null;) {
                    if (e !== 0) {
                        var i = l.pendingLanes;
                        if (i === 0) var r = 0;
                        else {
                            var d = l.suspendedLanes,
                                h = l.pingedLanes;
                            r = (1 << 31 - ut(42 | e) + 1) - 1, r &= i & ~(d & ~h), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0
                        }
                        r !== 0 && (a = !0, Uf(l, r))
                    } else r = pe, r = ii(l, l === Me ? r : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), (r & 3) === 0 || Ql(l, r) || (a = !0, Uf(l, r));
                    l = l.next
                }
            while (a);
            Eo = !1
        }
    }

    function yg() {
        zf()
    }

    function zf() {
        Ii = wo = !1;
        var e = 0;
        Pa !== 0 && (Tg() && (e = Pa), Pa = 0);
        for (var t = Ct(), a = null, l = Pi; l !== null;) {
            var i = l.next,
                r = Bf(l, t);
            r === 0 ? (l.next = null, a === null ? Pi = i : a.next = i, i === null && (Bl = a)) : (a = l, (e !== 0 || (r & 3) !== 0) && (Ii = !0)), l = i
        }
        Mn(e)
    }

    function Bf(e, t) {
        for (var a = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r;) {
            var d = 31 - ut(r),
                h = 1 << d,
                b = i[d];
            b === -1 ? ((h & a) === 0 || (h & l) !== 0) && (i[d] = V0(h, t)) : b <= t && (e.expiredLanes |= h), r &= ~h
        }
        if (t = Me, a = pe, a = ii(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), l = e.callbackNode, a === 0 || e === t && (we === 2 || we === 9) || e.cancelPendingCommit !== null) return l !== null && l !== null && zs(l), e.callbackNode = null, e.callbackPriority = 0;
        if ((a & 3) === 0 || Ql(e, a)) {
            if (t = a & -a, t === e.callbackPriority) return t;
            switch (l !== null && zs(l), Us(a)) {
                case 2:
                case 8:
                    a = _c;
                    break;
                case 32:
                    a = ai;
                    break;
                case 268435456:
                    a = Tc;
                    break;
                default:
                    a = ai
            }
            return l = qf.bind(null, e), a = Ds(a, l), e.callbackPriority = t, e.callbackNode = a, t
        }
        return l !== null && l !== null && zs(l), e.callbackPriority = 2, e.callbackNode = null, 2
    }

    function qf(e, t) {
        if (Je !== 0 && Je !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
        var a = e.callbackNode;
        if (Fi() && e.callbackNode !== a) return null;
        var l = pe;
        return l = ii(e, e === Me ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), l === 0 ? null : (bf(e, l, t), Bf(e, Ct()), e.callbackNode != null && e.callbackNode === a ? qf.bind(null, e) : null)
    }

    function Uf(e, t) {
        if (Fi()) return null;
        bf(e, t, !0)
    }

    function bg() {
        Ag(function() {
            (Ne & 6) !== 0 ? Ds(Sc, yg) : zf()
        })
    }

    function So() {
        return Pa === 0 && (Pa = kc()), Pa
    }

    function Lf(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ui("" + e)
    }

    function Hf(e, t) {
        var a = t.ownerDocument.createElement("input");
        return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e
    }

    function vg(e, t, a, l, i) {
        if (t === "submit" && a && a.stateNode === i) {
            var r = Lf((i[lt] || null).action),
                d = l.submitter;
            d && (t = (t = d[lt] || null) ? Lf(t.formAction) : d.getAttribute("formAction"), t !== null && (r = t, d = null));
            var h = new hi("action", "action", null, l, i);
            e.push({
                event: h,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (l.defaultPrevented) {
                            if (Pa !== 0) {
                                var b = d ? Hf(i, d) : new FormData(i);
                                Vr(a, {
                                    pending: !0,
                                    data: b,
                                    method: i.method,
                                    action: r
                                }, null, b)
                            }
                        } else typeof r == "function" && (h.preventDefault(), b = d ? Hf(i, d) : new FormData(i), Vr(a, {
                            pending: !0,
                            data: b,
                            method: i.method,
                            action: r
                        }, r, b))
                    },
                    currentTarget: i
                }]
            })
        }
    }
    for (var _o = 0; _o < cr.length; _o++) {
        var To = cr[_o],
            jg = To.toLowerCase(),
            Ng = To[0].toUpperCase() + To.slice(1);
        Tt(jg, "on" + Ng)
    }
    Tt(yu, "onAnimationEnd"), Tt(bu, "onAnimationIteration"), Tt(vu, "onAnimationStart"), Tt("dblclick", "onDoubleClick"), Tt("focusin", "onFocus"), Tt("focusout", "onBlur"), Tt(Lh, "onTransitionRun"), Tt(Hh, "onTransitionStart"), Tt(Gh, "onTransitionCancel"), Tt(ju, "onTransitionEnd"), sl("onMouseEnter", ["mouseout", "mouseover"]), sl("onMouseLeave", ["mouseout", "mouseover"]), sl("onPointerEnter", ["pointerout", "pointerover"]), sl("onPointerLeave", ["pointerout", "pointerover"]), Ba("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ba("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ba("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ba("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ba("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ba("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
        wg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cn));

    function Gf(e, t) {
        t = (t & 4) !== 0;
        for (var a = 0; a < e.length; a++) {
            var l = e[a],
                i = l.event;
            l = l.listeners;
            e: {
                var r = void 0;
                if (t)
                    for (var d = l.length - 1; 0 <= d; d--) {
                        var h = l[d],
                            b = h.instance,
                            T = h.currentTarget;
                        if (h = h.listener, b !== r && i.isPropagationStopped()) break e;
                        r = h, i.currentTarget = T;
                        try {
                            r(i)
                        } catch (B) {
                            Hi(B)
                        }
                        i.currentTarget = null, r = b
                    } else
                        for (d = 0; d < l.length; d++) {
                            if (h = l[d], b = h.instance, T = h.currentTarget, h = h.listener, b !== r && i.isPropagationStopped()) break e;
                            r = h, i.currentTarget = T;
                            try {
                                r(i)
                            } catch (B) {
                                Hi(B)
                            }
                            i.currentTarget = null, r = b
                        }
            }
        }
    }

    function ge(e, t) {
        var a = t[Ls];
        a === void 0 && (a = t[Ls] = new Set);
        var l = e + "__bubble";
        a.has(l) || (Yf(t, e, 2, !1), a.add(l))
    }

    function ko(e, t, a) {
        var l = 0;
        t && (l |= 4), Yf(a, e, l, t)
    }
    var es = "_reactListening" + Math.random().toString(36).slice(2);

    function Ao(e) {
        if (!e[es]) {
            e[es] = !0, Dc.forEach(function(a) {
                a !== "selectionchange" && (wg.has(a) || ko(a, !1, e), ko(a, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[es] || (t[es] = !0, ko("selectionchange", !1, t))
        }
    }

    function Yf(e, t, a, l) {
        switch (fm(t)) {
            case 2:
                var i = Wg;
                break;
            case 8:
                i = Fg;
                break;
            default:
                i = Xo
        }
        a = i.bind(null, t, a, e), i = void 0, !Ws || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, a, {
            capture: !0,
            passive: i
        }) : e.addEventListener(t, a, !0) : i !== void 0 ? e.addEventListener(t, a, {
            passive: i
        }) : e.addEventListener(t, a, !1)
    }

    function Mo(e, t, a, l, i) {
        var r = l;
        if ((t & 1) === 0 && (t & 2) === 0 && l !== null) e: for (;;) {
            if (l === null) return;
            var d = l.tag;
            if (d === 3 || d === 4) {
                var h = l.stateNode.containerInfo;
                if (h === i) break;
                if (d === 4)
                    for (d = l.return; d !== null;) {
                        var b = d.tag;
                        if ((b === 3 || b === 4) && d.stateNode.containerInfo === i) return;
                        d = d.return
                    }
                for (; h !== null;) {
                    if (d = ll(h), d === null) return;
                    if (b = d.tag, b === 5 || b === 6 || b === 26 || b === 27) {
                        l = r = d;
                        continue e
                    }
                    h = h.parentNode
                }
            }
            l = l.return
        }
        Kc(function() {
            var T = r,
                B = Ks(a),
                H = [];
            e: {
                var k = Nu.get(e);
                if (k !== void 0) {
                    var M = hi,
                        se = e;
                    switch (e) {
                        case "keypress":
                            if (fi(a) === 0) break e;
                        case "keydown":
                        case "keyup":
                            M = xh;
                            break;
                        case "focusin":
                            se = "focus", M = er;
                            break;
                        case "focusout":
                            se = "blur", M = er;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            M = er;
                            break;
                        case "click":
                            if (a.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            M = Fc;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            M = ih;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            M = vh;
                            break;
                        case yu:
                        case bu:
                        case vu:
                            M = oh;
                            break;
                        case ju:
                            M = Nh;
                            break;
                        case "scroll":
                        case "scrollend":
                            M = lh;
                            break;
                        case "wheel":
                            M = Eh;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            M = uh;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            M = Ic;
                            break;
                        case "toggle":
                        case "beforetoggle":
                            M = _h
                    }
                    var ne = (t & 4) !== 0,
                        _e = !ne && (e === "scroll" || e === "scrollend"),
                        S = ne ? k !== null ? k + "Capture" : null : k;
                    ne = [];
                    for (var w = T, _; w !== null;) {
                        var U = w;
                        if (_ = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || _ === null || S === null || (U = Jl(w, S), U != null && ne.push(Rn(w, U, _))), _e) break;
                        w = w.return
                    }
                    0 < ne.length && (k = new M(k, se, null, a, B), H.push({
                        event: k,
                        listeners: ne
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (k = e === "mouseover" || e === "pointerover", M = e === "mouseout" || e === "pointerout", k && a !== $s && (se = a.relatedTarget || a.fromElement) && (ll(se) || se[al])) break e;
                    if ((M || k) && (k = B.window === B ? B : (k = B.ownerDocument) ? k.defaultView || k.parentWindow : window, M ? (se = a.relatedTarget || a.toElement, M = T, se = se ? ll(se) : null, se !== null && (_e = p(se), ne = se.tag, se !== _e || ne !== 5 && ne !== 27 && ne !== 6) && (se = null)) : (M = null, se = T), M !== se)) {
                        if (ne = Fc, U = "onMouseLeave", S = "onMouseEnter", w = "mouse", (e === "pointerout" || e === "pointerover") && (ne = Ic, U = "onPointerLeave", S = "onPointerEnter", w = "pointer"), _e = M == null ? k : Kl(M), _ = se == null ? k : Kl(se), k = new ne(U, w + "leave", M, a, B), k.target = _e, k.relatedTarget = _, U = null, ll(B) === T && (ne = new ne(S, w + "enter", se, a, B), ne.target = _, ne.relatedTarget = _e, U = ne), _e = U, M && se) t: {
                            for (ne = M, S = se, w = 0, _ = ne; _; _ = ql(_)) w++;
                            for (_ = 0, U = S; U; U = ql(U)) _++;
                            for (; 0 < w - _;) ne = ql(ne),
                            w--;
                            for (; 0 < _ - w;) S = ql(S),
                            _--;
                            for (; w--;) {
                                if (ne === S || S !== null && ne === S.alternate) break t;
                                ne = ql(ne), S = ql(S)
                            }
                            ne = null
                        }
                        else ne = null;
                        M !== null && Xf(H, k, M, ne, !1), se !== null && _e !== null && Xf(H, _e, se, ne, !0)
                    }
                }
                e: {
                    if (k = T ? Kl(T) : window, M = k.nodeName && k.nodeName.toLowerCase(), M === "select" || M === "input" && k.type === "file") var F = ru;
                    else if (iu(k))
                        if (ou) F = Bh;
                        else {
                            F = Dh;
                            var fe = Oh
                        }
                    else M = k.nodeName,
                    !M || M.toLowerCase() !== "input" || k.type !== "checkbox" && k.type !== "radio" ? T && Zs(T.elementType) && (F = ru) : F = zh;
                    if (F && (F = F(e, T))) {
                        su(H, F, a, B);
                        break e
                    }
                    fe && fe(e, k, T),
                    e === "focusout" && T && k.type === "number" && T.memoizedProps.value != null && Qs(k, "number", k.value)
                }
                switch (fe = T ? Kl(T) : window, e) {
                    case "focusin":
                        (iu(fe) || fe.contentEditable === "true") && (ml = fe, sr = T, ln = null);
                        break;
                    case "focusout":
                        ln = sr = ml = null;
                        break;
                    case "mousedown":
                        rr = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        rr = !1, pu(H, a, B);
                        break;
                    case "selectionchange":
                        if (Uh) break;
                    case "keydown":
                    case "keyup":
                        pu(H, a, B)
                }
                var ee;
                if (ar) e: {
                    switch (e) {
                        case "compositionstart":
                            var ie = "onCompositionStart";
                            break e;
                        case "compositionend":
                            ie = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            ie = "onCompositionUpdate";
                            break e
                    }
                    ie = void 0
                }
                else fl ? lu(e, a) && (ie = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ie = "onCompositionStart");ie && (eu && a.locale !== "ko" && (fl || ie !== "onCompositionStart" ? ie === "onCompositionEnd" && fl && (ee = Jc()) : (da = B, Fs = "value" in da ? da.value : da.textContent, fl = !0)), fe = ts(T, ie), 0 < fe.length && (ie = new Pc(ie, e, null, a, B), H.push({
                    event: ie,
                    listeners: fe
                }), ee ? ie.data = ee : (ee = nu(a), ee !== null && (ie.data = ee)))),
                (ee = kh ? Ah(e, a) : Mh(e, a)) && (ie = ts(T, "onBeforeInput"), 0 < ie.length && (fe = new Pc("onBeforeInput", "beforeinput", null, a, B), H.push({
                    event: fe,
                    listeners: ie
                }), fe.data = ee)),
                vg(H, e, T, a, B)
            }
            Gf(H, t)
        })
    }

    function Rn(e, t, a) {
        return {
            instance: e,
            listener: t,
            currentTarget: a
        }
    }

    function ts(e, t) {
        for (var a = t + "Capture", l = []; e !== null;) {
            var i = e,
                r = i.stateNode;
            if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || r === null || (i = Jl(e, a), i != null && l.unshift(Rn(e, i, r)), i = Jl(e, t), i != null && l.push(Rn(e, i, r))), e.tag === 3) return l;
            e = e.return
        }
        return []
    }

    function ql(e) {
        if (e === null) return null;
        do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }

    function Xf(e, t, a, l, i) {
        for (var r = t._reactName, d = []; a !== null && a !== l;) {
            var h = a,
                b = h.alternate,
                T = h.stateNode;
            if (h = h.tag, b !== null && b === l) break;
            h !== 5 && h !== 26 && h !== 27 || T === null || (b = T, i ? (T = Jl(a, r), T != null && d.unshift(Rn(a, T, b))) : i || (T = Jl(a, r), T != null && d.push(Rn(a, T, b)))), a = a.return
        }
        d.length !== 0 && e.push({
            event: t,
            listeners: d
        })
    }
    var Eg = /\r\n?/g,
        Sg = /\u0000|\uFFFD/g;

    function Vf(e) {
        return (typeof e == "string" ? e : "" + e).replace(Eg, `
`).replace(Sg, "")
    }

    function Qf(e, t) {
        return t = Vf(t), Vf(e) === t
    }

    function as() {}

    function Se(e, t, a, l, i, r) {
        switch (a) {
            case "children":
                typeof l == "string" ? t === "body" || t === "textarea" && l === "" || cl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && cl(e, "" + l);
                break;
            case "className":
                ri(e, "class", l);
                break;
            case "tabIndex":
                ri(e, "tabindex", l);
                break;
            case "dir":
            case "role":
            case "viewBox":
            case "width":
            case "height":
                ri(e, a, l);
                break;
            case "style":
                Zc(e, l, r);
                break;
            case "data":
                if (t !== "object") {
                    ri(e, "data", l);
                    break
                }
            case "src":
            case "href":
                if (l === "" && (t !== "a" || a !== "href")) {
                    e.removeAttribute(a);
                    break
                }
                if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
                    e.removeAttribute(a);
                    break
                }
                l = ui("" + l), e.setAttribute(a, l);
                break;
            case "action":
            case "formAction":
                if (typeof l == "function") {
                    e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                    break
                } else typeof r == "function" && (a === "formAction" ? (t !== "input" && Se(e, t, "name", i.name, i, null), Se(e, t, "formEncType", i.formEncType, i, null), Se(e, t, "formMethod", i.formMethod, i, null), Se(e, t, "formTarget", i.formTarget, i, null)) : (Se(e, t, "encType", i.encType, i, null), Se(e, t, "method", i.method, i, null), Se(e, t, "target", i.target, i, null)));
                if (l == null || typeof l == "symbol" || typeof l == "boolean") {
                    e.removeAttribute(a);
                    break
                }
                l = ui("" + l), e.setAttribute(a, l);
                break;
            case "onClick":
                l != null && (e.onclick = as);
                break;
            case "onScroll":
                l != null && ge("scroll", e);
                break;
            case "onScrollEnd":
                l != null && ge("scrollend", e);
                break;
            case "dangerouslySetInnerHTML":
                if (l != null) {
                    if (typeof l != "object" || !("__html" in l)) throw Error(u(61));
                    if (a = l.__html, a != null) {
                        if (i.children != null) throw Error(u(60));
                        e.innerHTML = a
                    }
                }
                break;
            case "multiple":
                e.multiple = l && typeof l != "function" && typeof l != "symbol";
                break;
            case "muted":
                e.muted = l && typeof l != "function" && typeof l != "symbol";
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "ref":
                break;
            case "autoFocus":
                break;
            case "xlinkHref":
                if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
                    e.removeAttribute("xlink:href");
                    break
                }
                a = ui("" + l), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
                break;
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
                l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
                break;
            case "inert":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
                l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
                break;
            case "capture":
            case "download":
                l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
                break;
            case "cols":
            case "rows":
            case "size":
            case "span":
                l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
                break;
            case "rowSpan":
            case "start":
                l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
                break;
            case "popover":
                ge("beforetoggle", e), ge("toggle", e), si(e, "popover", l);
                break;
            case "xlinkActuate":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
                break;
            case "xlinkArcrole":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
                break;
            case "xlinkRole":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
                break;
            case "xlinkShow":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
                break;
            case "xlinkTitle":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
                break;
            case "xlinkType":
                Lt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
                break;
            case "xmlBase":
                Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
                break;
            case "xmlLang":
                Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
                break;
            case "xmlSpace":
                Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
                break;
            case "is":
                si(e, "is", l);
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = th.get(a) || a, si(e, a, l))
        }
    }

    function Co(e, t, a, l, i, r) {
        switch (a) {
            case "style":
                Zc(e, l, r);
                break;
            case "dangerouslySetInnerHTML":
                if (l != null) {
                    if (typeof l != "object" || !("__html" in l)) throw Error(u(61));
                    if (a = l.__html, a != null) {
                        if (i.children != null) throw Error(u(60));
                        e.innerHTML = a
                    }
                }
                break;
            case "children":
                typeof l == "string" ? cl(e, l) : (typeof l == "number" || typeof l == "bigint") && cl(e, "" + l);
                break;
            case "onScroll":
                l != null && ge("scroll", e);
                break;
            case "onScrollEnd":
                l != null && ge("scrollend", e);
                break;
            case "onClick":
                l != null && (e.onclick = as);
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "innerHTML":
            case "ref":
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                if (!zc.hasOwnProperty(a)) e: {
                    if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), t = a.slice(2, i ? a.length - 7 : void 0), r = e[lt] || null, r = r != null ? r[a] : null, typeof r == "function" && e.removeEventListener(t, r, i), typeof l == "function")) {
                        typeof r != "function" && r !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, l, i);
                        break e
                    }
                    a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : si(e, a, l)
                }
        }
    }

    function We(e, t, a) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "img":
                ge("error", e), ge("load", e);
                var l = !1,
                    i = !1,
                    r;
                for (r in a)
                    if (a.hasOwnProperty(r)) {
                        var d = a[r];
                        if (d != null) switch (r) {
                            case "src":
                                l = !0;
                                break;
                            case "srcSet":
                                i = !0;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                throw Error(u(137, t));
                            default:
                                Se(e, t, r, d, a, null)
                        }
                    }
                i && Se(e, t, "srcSet", a.srcSet, a, null), l && Se(e, t, "src", a.src, a, null);
                return;
            case "input":
                ge("invalid", e);
                var h = r = d = i = null,
                    b = null,
                    T = null;
                for (l in a)
                    if (a.hasOwnProperty(l)) {
                        var B = a[l];
                        if (B != null) switch (l) {
                            case "name":
                                i = B;
                                break;
                            case "type":
                                d = B;
                                break;
                            case "checked":
                                b = B;
                                break;
                            case "defaultChecked":
                                T = B;
                                break;
                            case "value":
                                r = B;
                                break;
                            case "defaultValue":
                                h = B;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                if (B != null) throw Error(u(137, t));
                                break;
                            default:
                                Se(e, t, l, B, a, null)
                        }
                    }
                Yc(e, r, h, b, T, d, i, !1), oi(e);
                return;
            case "select":
                ge("invalid", e), l = d = r = null;
                for (i in a)
                    if (a.hasOwnProperty(i) && (h = a[i], h != null)) switch (i) {
                        case "value":
                            r = h;
                            break;
                        case "defaultValue":
                            d = h;
                            break;
                        case "multiple":
                            l = h;
                        default:
                            Se(e, t, i, h, a, null)
                    }
                t = r, a = d, e.multiple = !!l, t != null ? ol(e, !!l, t, !1) : a != null && ol(e, !!l, a, !0);
                return;
            case "textarea":
                ge("invalid", e), r = i = l = null;
                for (d in a)
                    if (a.hasOwnProperty(d) && (h = a[d], h != null)) switch (d) {
                        case "value":
                            l = h;
                            break;
                        case "defaultValue":
                            i = h;
                            break;
                        case "children":
                            r = h;
                            break;
                        case "dangerouslySetInnerHTML":
                            if (h != null) throw Error(u(91));
                            break;
                        default:
                            Se(e, t, d, h, a, null)
                    }
                Vc(e, l, i, r), oi(e);
                return;
            case "option":
                for (b in a)
                    if (a.hasOwnProperty(b) && (l = a[b], l != null)) switch (b) {
                        case "selected":
                            e.selected = l && typeof l != "function" && typeof l != "symbol";
                            break;
                        default:
                            Se(e, t, b, l, a, null)
                    }
                return;
            case "dialog":
                ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
                break;
            case "iframe":
            case "object":
                ge("load", e);
                break;
            case "video":
            case "audio":
                for (l = 0; l < Cn.length; l++) ge(Cn[l], e);
                break;
            case "image":
                ge("error", e), ge("load", e);
                break;
            case "details":
                ge("toggle", e);
                break;
            case "embed":
            case "source":
            case "link":
                ge("error", e), ge("load", e);
            case "area":
            case "base":
            case "br":
            case "col":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "track":
            case "wbr":
            case "menuitem":
                for (T in a)
                    if (a.hasOwnProperty(T) && (l = a[T], l != null)) switch (T) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(u(137, t));
                        default:
                            Se(e, t, T, l, a, null)
                    }
                return;
            default:
                if (Zs(t)) {
                    for (B in a) a.hasOwnProperty(B) && (l = a[B], l !== void 0 && Co(e, t, B, l, a, void 0));
                    return
                }
        }
        for (h in a) a.hasOwnProperty(h) && (l = a[h], l != null && Se(e, t, h, l, a, null))
    }

    function _g(e, t, a, l) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "input":
                var i = null,
                    r = null,
                    d = null,
                    h = null,
                    b = null,
                    T = null,
                    B = null;
                for (M in a) {
                    var H = a[M];
                    if (a.hasOwnProperty(M) && H != null) switch (M) {
                        case "checked":
                            break;
                        case "value":
                            break;
                        case "defaultValue":
                            b = H;
                        default:
                            l.hasOwnProperty(M) || Se(e, t, M, null, l, H)
                    }
                }
                for (var k in l) {
                    var M = l[k];
                    if (H = a[k], l.hasOwnProperty(k) && (M != null || H != null)) switch (k) {
                        case "type":
                            r = M;
                            break;
                        case "name":
                            i = M;
                            break;
                        case "checked":
                            T = M;
                            break;
                        case "defaultChecked":
                            B = M;
                            break;
                        case "value":
                            d = M;
                            break;
                        case "defaultValue":
                            h = M;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (M != null) throw Error(u(137, t));
                            break;
                        default:
                            M !== H && Se(e, t, k, M, l, H)
                    }
                }
                Vs(e, d, h, b, T, B, r, i);
                return;
            case "select":
                M = d = h = k = null;
                for (r in a)
                    if (b = a[r], a.hasOwnProperty(r) && b != null) switch (r) {
                        case "value":
                            break;
                        case "multiple":
                            M = b;
                        default:
                            l.hasOwnProperty(r) || Se(e, t, r, null, l, b)
                    }
                for (i in l)
                    if (r = l[i], b = a[i], l.hasOwnProperty(i) && (r != null || b != null)) switch (i) {
                        case "value":
                            k = r;
                            break;
                        case "defaultValue":
                            h = r;
                            break;
                        case "multiple":
                            d = r;
                        default:
                            r !== b && Se(e, t, i, r, l, b)
                    }
                t = h, a = d, l = M, k != null ? ol(e, !!a, k, !1) : !!l != !!a && (t != null ? ol(e, !!a, t, !0) : ol(e, !!a, a ? [] : "", !1));
                return;
            case "textarea":
                M = k = null;
                for (h in a)
                    if (i = a[h], a.hasOwnProperty(h) && i != null && !l.hasOwnProperty(h)) switch (h) {
                        case "value":
                            break;
                        case "children":
                            break;
                        default:
                            Se(e, t, h, null, l, i)
                    }
                for (d in l)
                    if (i = l[d], r = a[d], l.hasOwnProperty(d) && (i != null || r != null)) switch (d) {
                        case "value":
                            k = i;
                            break;
                        case "defaultValue":
                            M = i;
                            break;
                        case "children":
                            break;
                        case "dangerouslySetInnerHTML":
                            if (i != null) throw Error(u(91));
                            break;
                        default:
                            i !== r && Se(e, t, d, i, l, r)
                    }
                Xc(e, k, M);
                return;
            case "option":
                for (var se in a)
                    if (k = a[se], a.hasOwnProperty(se) && k != null && !l.hasOwnProperty(se)) switch (se) {
                        case "selected":
                            e.selected = !1;
                            break;
                        default:
                            Se(e, t, se, null, l, k)
                    }
                for (b in l)
                    if (k = l[b], M = a[b], l.hasOwnProperty(b) && k !== M && (k != null || M != null)) switch (b) {
                        case "selected":
                            e.selected = k && typeof k != "function" && typeof k != "symbol";
                            break;
                        default:
                            Se(e, t, b, k, l, M)
                    }
                return;
            case "img":
            case "link":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
            case "menuitem":
                for (var ne in a) k = a[ne], a.hasOwnProperty(ne) && k != null && !l.hasOwnProperty(ne) && Se(e, t, ne, null, l, k);
                for (T in l)
                    if (k = l[T], M = a[T], l.hasOwnProperty(T) && k !== M && (k != null || M != null)) switch (T) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (k != null) throw Error(u(137, t));
                            break;
                        default:
                            Se(e, t, T, k, l, M)
                    }
                return;
            default:
                if (Zs(t)) {
                    for (var _e in a) k = a[_e], a.hasOwnProperty(_e) && k !== void 0 && !l.hasOwnProperty(_e) && Co(e, t, _e, void 0, l, k);
                    for (B in l) k = l[B], M = a[B], !l.hasOwnProperty(B) || k === M || k === void 0 && M === void 0 || Co(e, t, B, k, l, M);
                    return
                }
        }
        for (var S in a) k = a[S], a.hasOwnProperty(S) && k != null && !l.hasOwnProperty(S) && Se(e, t, S, null, l, k);
        for (H in l) k = l[H], M = a[H], !l.hasOwnProperty(H) || k === M || k == null && M == null || Se(e, t, H, k, l, M)
    }
    var Ro = null,
        Oo = null;

    function ls(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }

    function Zf(e) {
        switch (e) {
            case "http://www.w3.org/2000/svg":
                return 1;
            case "http://www.w3.org/1998/Math/MathML":
                return 2;
            default:
                return 0
        }
    }

    function $f(e, t) {
        if (e === 0) switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
        }
        return e === 1 && t === "foreignObject" ? 0 : e
    }

    function Do(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var zo = null;

    function Tg() {
        var e = window.event;
        return e && e.type === "popstate" ? e === zo ? !1 : (zo = e, !0) : (zo = null, !1)
    }
    var Kf = typeof setTimeout == "function" ? setTimeout : void 0,
        kg = typeof clearTimeout == "function" ? clearTimeout : void 0,
        Jf = typeof Promise == "function" ? Promise : void 0,
        Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jf < "u" ? function(e) {
            return Jf.resolve(null).then(e).catch(Mg)
        } : Kf;

    function Mg(e) {
        setTimeout(function() {
            throw e
        })
    }

    function Ta(e) {
        return e === "head"
    }

    function Wf(e, t) {
        var a = t,
            l = 0,
            i = 0;
        do {
            var r = a.nextSibling;
            if (e.removeChild(a), r && r.nodeType === 8)
                if (a = r.data, a === "/$") {
                    if (0 < l && 8 > l) {
                        a = l;
                        var d = e.ownerDocument;
                        if (a & 1 && On(d.documentElement), a & 2 && On(d.body), a & 4)
                            for (a = d.head, On(a), d = a.firstChild; d;) {
                                var h = d.nextSibling,
                                    b = d.nodeName;
                                d[$l] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = h
                            }
                    }
                    if (i === 0) {
                        e.removeChild(r), Gn(t);
                        return
                    }
                    i--
                } else a === "$" || a === "$?" || a === "$!" ? i++ : l = a.charCodeAt(0) - 48;
            else l = 0;
            a = r
        } while (a);
        Gn(t)
    }

    function Bo(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
            var a = t;
            switch (t = t.nextSibling, a.nodeName) {
                case "HTML":
                case "HEAD":
                case "BODY":
                    Bo(a), Hs(a);
                    continue;
                case "SCRIPT":
                case "STYLE":
                    continue;
                case "LINK":
                    if (a.rel.toLowerCase() === "stylesheet") continue
            }
            e.removeChild(a)
        }
    }

    function Cg(e, t, a, l) {
        for (; e.nodeType === 1;) {
            var i = a;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
            } else if (l) {
                if (!e[$l]) switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop")) break;
                        return e;
                    case "link":
                        if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence")) break;
                        if (r !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence")) break;
                        return e;
                    case "script":
                        if (r = e.getAttribute("src"), (r !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
                        return e;
                    default:
                        return e
                }
            } else if (t === "input" && e.type === "hidden") {
                var r = i.name == null ? null : "" + i.name;
                if (i.type === "hidden" && e.getAttribute("name") === r) return e
            } else return e;
            if (e = At(e.nextSibling), e === null) break
        }
        return null
    }

    function Rg(e, t, a) {
        if (t === "") return null;
        for (; e.nodeType !== 3;)
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = At(e.nextSibling), e === null)) return null;
        return e
    }

    function qo(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete"
    }

    function Og(e, t) {
        var a = e.ownerDocument;
        if (e.data !== "$?" || a.readyState === "complete") t();
        else {
            var l = function() {
                t(), a.removeEventListener("DOMContentLoaded", l)
            };
            a.addEventListener("DOMContentLoaded", l), e._reactRetry = l
        }
    }

    function At(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3) break;
            if (t === 8) {
                if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F") break;
                if (t === "/$") return null
            }
        }
        return e
    }
    var Uo = null;

    function Ff(e) {
        e = e.previousSibling;
        for (var t = 0; e;) {
            if (e.nodeType === 8) {
                var a = e.data;
                if (a === "$" || a === "$!" || a === "$?") {
                    if (t === 0) return e;
                    t--
                } else a === "/$" && t++
            }
            e = e.previousSibling
        }
        return null
    }

    function Pf(e, t, a) {
        switch (t = ls(a), e) {
            case "html":
                if (e = t.documentElement, !e) throw Error(u(452));
                return e;
            case "head":
                if (e = t.head, !e) throw Error(u(453));
                return e;
            case "body":
                if (e = t.body, !e) throw Error(u(454));
                return e;
            default:
                throw Error(u(451))
        }
    }

    function On(e) {
        for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
        Hs(e)
    }
    var _t = new Map,
        If = new Set;

    function ns(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var It = Z.d;
    Z.d = {
        f: Dg,
        r: zg,
        D: Bg,
        C: qg,
        L: Ug,
        m: Lg,
        X: Gg,
        S: Hg,
        M: Yg
    };

    function Dg() {
        var e = It.f(),
            t = Ji();
        return e || t
    }

    function zg(e) {
        var t = nl(e);
        t !== null && t.tag === 5 && t.type === "form" ? yd(t) : It.r(e)
    }
    var Ul = typeof document > "u" ? null : document;

    function em(e, t, a) {
        var l = Ul;
        if (l && typeof t == "string" && t) {
            var i = bt(t);
            i = 'link[rel="' + e + '"][href="' + i + '"]', typeof a == "string" && (i += '[crossorigin="' + a + '"]'), If.has(i) || (If.add(i), e = {
                rel: e,
                crossOrigin: a,
                href: t
            }, l.querySelector(i) === null && (t = l.createElement("link"), We(t, "link", e), Ve(t), l.head.appendChild(t)))
        }
    }

    function Bg(e) {
        It.D(e), em("dns-prefetch", e, null)
    }

    function qg(e, t) {
        It.C(e, t), em("preconnect", e, t)
    }

    function Ug(e, t, a) {
        It.L(e, t, a);
        var l = Ul;
        if (l && e && t) {
            var i = 'link[rel="preload"][as="' + bt(t) + '"]';
            t === "image" && a && a.imageSrcSet ? (i += '[imagesrcset="' + bt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (i += '[imagesizes="' + bt(a.imageSizes) + '"]')) : i += '[href="' + bt(e) + '"]';
            var r = i;
            switch (t) {
                case "style":
                    r = Ll(e);
                    break;
                case "script":
                    r = Hl(e)
            }
            _t.has(r) || (e = y({
                rel: "preload",
                href: t === "image" && a && a.imageSrcSet ? void 0 : e,
                as: t
            }, a), _t.set(r, e), l.querySelector(i) !== null || t === "style" && l.querySelector(Dn(r)) || t === "script" && l.querySelector(zn(r)) || (t = l.createElement("link"), We(t, "link", e), Ve(t), l.head.appendChild(t)))
        }
    }

    function Lg(e, t) {
        It.m(e, t);
        var a = Ul;
        if (a && e) {
            var l = t && typeof t.as == "string" ? t.as : "script",
                i = 'link[rel="modulepreload"][as="' + bt(l) + '"][href="' + bt(e) + '"]',
                r = i;
            switch (l) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    r = Hl(e)
            }
            if (!_t.has(r) && (e = y({
                    rel: "modulepreload",
                    href: e
                }, t), _t.set(r, e), a.querySelector(i) === null)) {
                switch (l) {
                    case "audioworklet":
                    case "paintworklet":
                    case "serviceworker":
                    case "sharedworker":
                    case "worker":
                    case "script":
                        if (a.querySelector(zn(r))) return
                }
                l = a.createElement("link"), We(l, "link", e), Ve(l), a.head.appendChild(l)
            }
        }
    }

    function Hg(e, t, a) {
        It.S(e, t, a);
        var l = Ul;
        if (l && e) {
            var i = il(l).hoistableStyles,
                r = Ll(e);
            t = t || "default";
            var d = i.get(r);
            if (!d) {
                var h = {
                    loading: 0,
                    preload: null
                };
                if (d = l.querySelector(Dn(r))) h.loading = 5;
                else {
                    e = y({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, a), (a = _t.get(r)) && Lo(e, a);
                    var b = d = l.createElement("link");
                    Ve(b), We(b, "link", e), b._p = new Promise(function(T, B) {
                        b.onload = T, b.onerror = B
                    }), b.addEventListener("load", function() {
                        h.loading |= 1
                    }), b.addEventListener("error", function() {
                        h.loading |= 2
                    }), h.loading |= 4, is(d, t, l)
                }
                d = {
                    type: "stylesheet",
                    instance: d,
                    count: 1,
                    state: h
                }, i.set(r, d)
            }
        }
    }

    function Gg(e, t) {
        It.X(e, t);
        var a = Ul;
        if (a && e) {
            var l = il(a).hoistableScripts,
                i = Hl(e),
                r = l.get(i);
            r || (r = a.querySelector(zn(i)), r || (e = y({
                src: e,
                async: !0
            }, t), (t = _t.get(i)) && Ho(e, t), r = a.createElement("script"), Ve(r), We(r, "link", e), a.head.appendChild(r)), r = {
                type: "script",
                instance: r,
                count: 1,
                state: null
            }, l.set(i, r))
        }
    }

    function Yg(e, t) {
        It.M(e, t);
        var a = Ul;
        if (a && e) {
            var l = il(a).hoistableScripts,
                i = Hl(e),
                r = l.get(i);
            r || (r = a.querySelector(zn(i)), r || (e = y({
                src: e,
                async: !0,
                type: "module"
            }, t), (t = _t.get(i)) && Ho(e, t), r = a.createElement("script"), Ve(r), We(r, "link", e), a.head.appendChild(r)), r = {
                type: "script",
                instance: r,
                count: 1,
                state: null
            }, l.set(i, r))
        }
    }

    function tm(e, t, a, l) {
        var i = (i = ce.current) ? ns(i) : null;
        if (!i) throw Error(u(446));
        switch (e) {
            case "meta":
            case "title":
                return null;
            case "style":
                return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Ll(a.href), a = il(i).hoistableStyles, l = a.get(t), l || (l = {
                    type: "style",
                    instance: null,
                    count: 0,
                    state: null
                }, a.set(t, l)), l) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            case "link":
                if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
                    e = Ll(a.href);
                    var r = il(i).hoistableStyles,
                        d = r.get(e);
                    if (d || (i = i.ownerDocument || i, d = {
                            type: "stylesheet",
                            instance: null,
                            count: 0,
                            state: {
                                loading: 0,
                                preload: null
                            }
                        }, r.set(e, d), (r = i.querySelector(Dn(e))) && !r._p && (d.instance = r, d.state.loading = 5), _t.has(e) || (a = {
                            rel: "preload",
                            as: "style",
                            href: a.href,
                            crossOrigin: a.crossOrigin,
                            integrity: a.integrity,
                            media: a.media,
                            hrefLang: a.hrefLang,
                            referrerPolicy: a.referrerPolicy
                        }, _t.set(e, a), r || Xg(i, e, a, d.state))), t && l === null) throw Error(u(528, ""));
                    return d
                }
                if (t && l !== null) throw Error(u(529, ""));
                return null;
            case "script":
                return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Hl(a), a = il(i).hoistableScripts, l = a.get(t), l || (l = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null
                }, a.set(t, l)), l) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            default:
                throw Error(u(444, e))
        }
    }

    function Ll(e) {
        return 'href="' + bt(e) + '"'
    }

    function Dn(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }

    function am(e) {
        return y({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }

    function Xg(e, t, a, l) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
            return l.loading |= 1
        }), t.addEventListener("error", function() {
            return l.loading |= 2
        }), We(t, "link", a), Ve(t), e.head.appendChild(t))
    }

    function Hl(e) {
        return '[src="' + bt(e) + '"]'
    }

    function zn(e) {
        return "script[async]" + e
    }

    function lm(e, t, a) {
        if (t.count++, t.instance === null) switch (t.type) {
            case "style":
                var l = e.querySelector('style[data-href~="' + bt(a.href) + '"]');
                if (l) return t.instance = l, Ve(l), l;
                var i = y({}, a, {
                    "data-href": a.href,
                    "data-precedence": a.precedence,
                    href: null,
                    precedence: null
                });
                return l = (e.ownerDocument || e).createElement("style"), Ve(l), We(l, "style", i), is(l, a.precedence, e), t.instance = l;
            case "stylesheet":
                i = Ll(a.href);
                var r = e.querySelector(Dn(i));
                if (r) return t.state.loading |= 4, t.instance = r, Ve(r), r;
                l = am(a), (i = _t.get(i)) && Lo(l, i), r = (e.ownerDocument || e).createElement("link"), Ve(r);
                var d = r;
                return d._p = new Promise(function(h, b) {
                    d.onload = h, d.onerror = b
                }), We(r, "link", l), t.state.loading |= 4, is(r, a.precedence, e), t.instance = r;
            case "script":
                return r = Hl(a.src), (i = e.querySelector(zn(r))) ? (t.instance = i, Ve(i), i) : (l = a, (i = _t.get(r)) && (l = y({}, a), Ho(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ve(i), We(i, "link", l), e.head.appendChild(i), t.instance = i);
            case "void":
                return null;
            default:
                throw Error(u(443, t.type))
        } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, is(l, a.precedence, e));
        return t.instance
    }

    function is(e, t, a) {
        for (var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = l.length ? l[l.length - 1] : null, r = i, d = 0; d < l.length; d++) {
            var h = l[d];
            if (h.dataset.precedence === t) r = h;
            else if (r !== i) break
        }
        r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild))
    }

    function Lo(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title)
    }

    function Ho(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity)
    }
    var ss = null;

    function nm(e, t, a) {
        if (ss === null) {
            var l = new Map,
                i = ss = new Map;
            i.set(a, l)
        } else i = ss, l = i.get(a), l || (l = new Map, i.set(a, l));
        if (l.has(e)) return l;
        for (l.set(e, null), a = a.getElementsByTagName(e), i = 0; i < a.length; i++) {
            var r = a[i];
            if (!(r[$l] || r[Fe] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
                var d = r.getAttribute(t) || "";
                d = e + d;
                var h = l.get(d);
                h ? h.push(r) : l.set(d, [r])
            }
        }
        return l
    }

    function im(e, t, a) {
        e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null)
    }

    function Vg(e, t, a) {
        if (a === 1 || t.itemProp != null) return !1;
        switch (e) {
            case "meta":
            case "title":
                return !0;
            case "style":
                if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
                return !0;
            case "link":
                if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
                switch (t.rel) {
                    case "stylesheet":
                        return e = t.disabled, typeof t.precedence == "string" && e == null;
                    default:
                        return !0
                }
            case "script":
                if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0
        }
        return !1
    }

    function sm(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    var Bn = null;

    function Qg() {}

    function Zg(e, t, a) {
        if (Bn === null) throw Error(u(475));
        var l = Bn;
        if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & 4) === 0) {
            if (t.instance === null) {
                var i = Ll(a.href),
                    r = e.querySelector(Dn(i));
                if (r) {
                    e = r._p, e !== null && typeof e == "object" && typeof e.then == "function" && (l.count++, l = rs.bind(l), e.then(l, l)), t.state.loading |= 4, t.instance = r, Ve(r);
                    return
                }
                r = e.ownerDocument || e, a = am(a), (i = _t.get(i)) && Lo(a, i), r = r.createElement("link"), Ve(r);
                var d = r;
                d._p = new Promise(function(h, b) {
                    d.onload = h, d.onerror = b
                }), We(r, "link", a), t.instance = r
            }
            l.stylesheets === null && (l.stylesheets = new Map), l.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (l.count++, t = rs.bind(l), e.addEventListener("load", t), e.addEventListener("error", t))
        }
    }

    function $g() {
        if (Bn === null) throw Error(u(475));
        var e = Bn;
        return e.stylesheets && e.count === 0 && Go(e, e.stylesheets), 0 < e.count ? function(t) {
            var a = setTimeout(function() {
                if (e.stylesheets && Go(e, e.stylesheets), e.unsuspend) {
                    var l = e.unsuspend;
                    e.unsuspend = null, l()
                }
            }, 6e4);
            return e.unsuspend = t,
                function() {
                    e.unsuspend = null, clearTimeout(a)
                }
        } : null
    }

    function rs() {
        if (this.count--, this.count === 0) {
            if (this.stylesheets) Go(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null, e()
            }
        }
    }
    var os = null;

    function Go(e, t) {
        e.stylesheets = null, e.unsuspend !== null && (e.count++, os = new Map, t.forEach(Kg, e), os = null, rs.call(e))
    }

    function Kg(e, t) {
        if (!(t.state.loading & 4)) {
            var a = os.get(e);
            if (a) var l = a.get(null);
            else {
                a = new Map, os.set(e, a);
                for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), r = 0; r < i.length; r++) {
                    var d = i[r];
                    (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), l = d)
                }
                l && a.set(null, l)
            }
            i = t.instance, d = i.getAttribute("data-precedence"), r = a.get(d) || l, r === l && a.set(null, i), a.set(d, i), this.count++, l = rs.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), r ? r.parentNode.insertBefore(i, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4
        }
    }
    var qn = {
        $$typeof: q,
        Provider: null,
        Consumer: null,
        _currentValue: I,
        _currentValue2: I,
        _threadCount: 0
    };

    function Jg(e, t, a, l, i, r, d, h) {
        this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Bs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bs(0), this.hiddenUpdates = Bs(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = r, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = new Map
    }

    function rm(e, t, a, l, i, r, d, h, b, T, B, H) {
        return e = new Jg(e, t, a, d, h, b, T, H), t = 1, r === !0 && (t |= 24), r = ft(3, null, null, t), e.current = r, r.stateNode = e, t = jr(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
            element: l,
            isDehydrated: a,
            cache: t
        }, Sr(r), e
    }

    function om(e) {
        return e ? (e = xl, e) : xl
    }

    function cm(e, t, a, l, i, r) {
        i = om(i), l.context === null ? l.context = i : l.pendingContext = i, l = ha(t), l.payload = {
            element: a
        }, r = r === void 0 ? null : r, r !== null && (l.callback = r), a = ga(e, l, t), a !== null && (xt(a, e, t), mn(a, e, t))
    }

    function um(e, t) {
        if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
            var a = e.retryLane;
            e.retryLane = a !== 0 && a < t ? a : t
        }
    }

    function Yo(e, t) {
        um(e, t), (e = e.alternate) && um(e, t)
    }

    function dm(e) {
        if (e.tag === 13) {
            var t = pl(e, 67108864);
            t !== null && xt(t, e, 67108864), Yo(e, 67108864)
        }
    }
    var cs = !0;

    function Wg(e, t, a, l) {
        var i = R.T;
        R.T = null;
        var r = Z.p;
        try {
            Z.p = 2, Xo(e, t, a, l)
        } finally {
            Z.p = r, R.T = i
        }
    }

    function Fg(e, t, a, l) {
        var i = R.T;
        R.T = null;
        var r = Z.p;
        try {
            Z.p = 8, Xo(e, t, a, l)
        } finally {
            Z.p = r, R.T = i
        }
    }

    function Xo(e, t, a, l) {
        if (cs) {
            var i = Vo(l);
            if (i === null) Mo(e, t, l, us, a), mm(e, l);
            else if (Ig(i, e, t, a, l)) l.stopPropagation();
            else if (mm(e, l), t & 4 && -1 < Pg.indexOf(e)) {
                for (; i !== null;) {
                    var r = nl(i);
                    if (r !== null) switch (r.tag) {
                        case 3:
                            if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                                var d = za(r.pendingLanes);
                                if (d !== 0) {
                                    var h = r;
                                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; d;) {
                                        var b = 1 << 31 - ut(d);
                                        h.entanglements[1] |= b, d &= ~b
                                    }
                                    Bt(r), (Ne & 6) === 0 && ($i = Ct() + 500, Mn(0))
                                }
                            }
                            break;
                        case 13:
                            h = pl(r, 2), h !== null && xt(h, r, 2), Ji(), Yo(r, 2)
                    }
                    if (r = Vo(l), r === null && Mo(e, t, l, us, a), r === i) break;
                    i = r
                }
                i !== null && l.stopPropagation()
            } else Mo(e, t, l, null, a)
        }
    }

    function Vo(e) {
        return e = Ks(e), Qo(e)
    }
    var us = null;

    function Qo(e) {
        if (us = null, e = ll(e), e !== null) {
            var t = p(e);
            if (t === null) e = null;
            else {
                var a = t.tag;
                if (a === 13) {
                    if (e = x(t), e !== null) return e;
                    e = null
                } else if (a === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else t !== e && (e = null)
            }
        }
        return us = e, null
    }

    function fm(e) {
        switch (e) {
            case "beforetoggle":
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "toggle":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
                return 2;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
                return 8;
            case "message":
                switch (q0()) {
                    case Sc:
                        return 2;
                    case _c:
                        return 8;
                    case ai:
                    case U0:
                        return 32;
                    case Tc:
                        return 268435456;
                    default:
                        return 32
                }
            default:
                return 32
        }
    }
    var Zo = !1,
        ka = null,
        Aa = null,
        Ma = null,
        Un = new Map,
        Ln = new Map,
        Ca = [],
        Pg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");

    function mm(e, t) {
        switch (e) {
            case "focusin":
            case "focusout":
                ka = null;
                break;
            case "dragenter":
            case "dragleave":
                Aa = null;
                break;
            case "mouseover":
            case "mouseout":
                Ma = null;
                break;
            case "pointerover":
            case "pointerout":
                Un.delete(t.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                Ln.delete(t.pointerId)
        }
    }

    function Hn(e, t, a, l, i, r) {
        return e === null || e.nativeEvent !== r ? (e = {
            blockedOn: t,
            domEventName: a,
            eventSystemFlags: l,
            nativeEvent: r,
            targetContainers: [i]
        }, t !== null && (t = nl(t), t !== null && dm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
    }

    function Ig(e, t, a, l, i) {
        switch (t) {
            case "focusin":
                return ka = Hn(ka, e, t, a, l, i), !0;
            case "dragenter":
                return Aa = Hn(Aa, e, t, a, l, i), !0;
            case "mouseover":
                return Ma = Hn(Ma, e, t, a, l, i), !0;
            case "pointerover":
                var r = i.pointerId;
                return Un.set(r, Hn(Un.get(r) || null, e, t, a, l, i)), !0;
            case "gotpointercapture":
                return r = i.pointerId, Ln.set(r, Hn(Ln.get(r) || null, e, t, a, l, i)), !0
        }
        return !1
    }

    function hm(e) {
        var t = ll(e.target);
        if (t !== null) {
            var a = p(t);
            if (a !== null) {
                if (t = a.tag, t === 13) {
                    if (t = x(a), t !== null) {
                        e.blockedOn = t, Z0(e.priority, function() {
                            if (a.tag === 13) {
                                var l = pt();
                                l = qs(l);
                                var i = pl(a, l);
                                i !== null && xt(i, a, l), Yo(a, l)
                            }
                        });
                        return
                    }
                } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }

    function ds(e) {
        if (e.blockedOn !== null) return !1;
        for (var t = e.targetContainers; 0 < t.length;) {
            var a = Vo(e.nativeEvent);
            if (a === null) {
                a = e.nativeEvent;
                var l = new a.constructor(a.type, a);
                $s = l, a.target.dispatchEvent(l), $s = null
            } else return t = nl(a), t !== null && dm(t), e.blockedOn = a, !1;
            t.shift()
        }
        return !0
    }

    function gm(e, t, a) {
        ds(e) && a.delete(t)
    }

    function ep() {
        Zo = !1, ka !== null && ds(ka) && (ka = null), Aa !== null && ds(Aa) && (Aa = null), Ma !== null && ds(Ma) && (Ma = null), Un.forEach(gm), Ln.forEach(gm)
    }

    function fs(e, t) {
        e.blockedOn === t && (e.blockedOn = null, Zo || (Zo = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, ep)))
    }
    var ms = null;

    function pm(e) {
        ms !== e && (ms = e, s.unstable_scheduleCallback(s.unstable_NormalPriority, function() {
            ms === e && (ms = null);
            for (var t = 0; t < e.length; t += 3) {
                var a = e[t],
                    l = e[t + 1],
                    i = e[t + 2];
                if (typeof l != "function") {
                    if (Qo(l || a) === null) continue;
                    break
                }
                var r = nl(a);
                r !== null && (e.splice(t, 3), t -= 3, Vr(r, {
                    pending: !0,
                    data: i,
                    method: a.method,
                    action: l
                }, l, i))
            }
        }))
    }

    function Gn(e) {
        function t(b) {
            return fs(b, e)
        }
        ka !== null && fs(ka, e), Aa !== null && fs(Aa, e), Ma !== null && fs(Ma, e), Un.forEach(t), Ln.forEach(t);
        for (var a = 0; a < Ca.length; a++) {
            var l = Ca[a];
            l.blockedOn === e && (l.blockedOn = null)
        }
        for (; 0 < Ca.length && (a = Ca[0], a.blockedOn === null);) hm(a), a.blockedOn === null && Ca.shift();
        if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
            for (l = 0; l < a.length; l += 3) {
                var i = a[l],
                    r = a[l + 1],
                    d = i[lt] || null;
                if (typeof r == "function") d || pm(a);
                else if (d) {
                    var h = null;
                    if (r && r.hasAttribute("formAction")) {
                        if (i = r, d = r[lt] || null) h = d.formAction;
                        else if (Qo(i) !== null) continue
                    } else h = d.action;
                    typeof h == "function" ? a[l + 1] = h : (a.splice(l, 3), l -= 3), pm(a)
                }
            }
    }

    function $o(e) {
        this._internalRoot = e
    }
    hs.prototype.render = $o.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null) throw Error(u(409));
        var a = t.current,
            l = pt();
        cm(a, l, e, t, null, null)
    }, hs.prototype.unmount = $o.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            cm(e.current, 2, null, e, null, null), Ji(), t[al] = null
        }
    };

    function hs(e) {
        this._internalRoot = e
    }
    hs.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = Rc();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var a = 0; a < Ca.length && t !== 0 && t < Ca[a].priority; a++);
            Ca.splice(a, 0, e), a === 0 && hm(e)
        }
    };
    var xm = c.version;
    if (xm !== "19.1.0") throw Error(u(527, xm, "19.1.0"));
    Z.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
        return e = m(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e
    };
    var tp = {
        bundleType: 0,
        version: "19.1.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: R,
        reconcilerVersion: "19.1.0"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var gs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!gs.isDisabled && gs.supportsFiber) try {
            Vl = gs.inject(tp), ct = gs
        } catch {}
    }
    return Xn.createRoot = function(e, t) {
        if (!f(e)) throw Error(u(299));
        var a = !1,
            l = "",
            i = Rd,
            r = Od,
            d = Dd,
            h = null;
        return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = rm(e, 1, !1, null, null, a, l, i, r, d, h, null), e[al] = t.current, Ao(e), new $o(t)
    }, Xn.hydrateRoot = function(e, t, a) {
        if (!f(e)) throw Error(u(299));
        var l = !1,
            i = "",
            r = Rd,
            d = Od,
            h = Dd,
            b = null,
            T = null;
        return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), a.onUncaughtError !== void 0 && (r = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (b = a.unstable_transitionCallbacks), a.formState !== void 0 && (T = a.formState)), t = rm(e, 1, !0, t, a ? ? null, l, i, r, d, h, b, T), t.context = om(null), a = t.current, l = pt(), l = qs(l), i = ha(l), i.callback = null, ga(a, i, l), a = l, t.current.lanes = a, Zl(t, a), Bt(t), e[al] = t.current, Ao(e), new hs(t)
    }, Xn.version = "19.1.0", Xn
}
var Tm;

function fp() {
    if (Tm) return Wo.exports;
    Tm = 1;

    function s() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)
        } catch (c) {
            console.error(c)
        }
    }
    return s(), Wo.exports = dp(), Wo.exports
}
var mp = fp(),
    Vn = {},
    km;

function hp() {
    if (km) return Vn;
    km = 1, Object.defineProperty(Vn, "__esModule", {
        value: !0
    }), Vn.parse = x, Vn.serialize = g;
    const s = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
        c = /^[\u0021-\u003A\u003C-\u007E]*$/,
        o = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        u = /^[\u0020-\u003A\u003D-\u007E]*$/,
        f = Object.prototype.toString,
        p = (() => {
            const C = function() {};
            return C.prototype = Object.create(null), C
        })();

    function x(C, G) {
        const O = new p,
            V = C.length;
        if (V < 2) return O;
        const E = (G == null ? void 0 : G.decode) || y;
        let D = 0;
        do {
            const L = C.indexOf("=", D);
            if (L === -1) break;
            const q = C.indexOf(";", D),
                X = q === -1 ? V : q;
            if (L > X) {
                D = C.lastIndexOf(";", L - 1) + 1;
                continue
            }
            const z = v(C, D, L),
                K = m(C, L, z),
                $ = C.slice(z, K);
            if (O[$] === void 0) {
                let P = v(C, L + 1, X),
                    re = m(C, X, P);
                const Q = E(C.slice(P, re));
                O[$] = Q
            }
            D = X + 1
        } while (D < V);
        return O
    }

    function v(C, G, O) {
        do {
            const V = C.charCodeAt(G);
            if (V !== 32 && V !== 9) return G
        } while (++G < O);
        return O
    }

    function m(C, G, O) {
        for (; G > O;) {
            const V = C.charCodeAt(--G);
            if (V !== 32 && V !== 9) return G + 1
        }
        return O
    }

    function g(C, G, O) {
        const V = (O == null ? void 0 : O.encode) || encodeURIComponent;
        if (!s.test(C)) throw new TypeError(`argument name is invalid: ${C}`);
        const E = V(G);
        if (!c.test(E)) throw new TypeError(`argument val is invalid: ${G}`);
        let D = C + "=" + E;
        if (!O) return D;
        if (O.maxAge !== void 0) {
            if (!Number.isInteger(O.maxAge)) throw new TypeError(`option maxAge is invalid: ${O.maxAge}`);
            D += "; Max-Age=" + O.maxAge
        }
        if (O.domain) {
            if (!o.test(O.domain)) throw new TypeError(`option domain is invalid: ${O.domain}`);
            D += "; Domain=" + O.domain
        }
        if (O.path) {
            if (!u.test(O.path)) throw new TypeError(`option path is invalid: ${O.path}`);
            D += "; Path=" + O.path
        }
        if (O.expires) {
            if (!A(O.expires) || !Number.isFinite(O.expires.valueOf())) throw new TypeError(`option expires is invalid: ${O.expires}`);
            D += "; Expires=" + O.expires.toUTCString()
        }
        if (O.httpOnly && (D += "; HttpOnly"), O.secure && (D += "; Secure"), O.partitioned && (D += "; Partitioned"), O.priority) switch (typeof O.priority == "string" ? O.priority.toLowerCase() : void 0) {
            case "low":
                D += "; Priority=Low";
                break;
            case "medium":
                D += "; Priority=Medium";
                break;
            case "high":
                D += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${O.priority}`)
        }
        if (O.sameSite) switch (typeof O.sameSite == "string" ? O.sameSite.toLowerCase() : O.sameSite) {
            case !0:
            case "strict":
                D += "; SameSite=Strict";
                break;
            case "lax":
                D += "; SameSite=Lax";
                break;
            case "none":
                D += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${O.sameSite}`)
        }
        return D
    }

    function y(C) {
        if (C.indexOf("%") === -1) return C;
        try {
            return decodeURIComponent(C)
        } catch {
            return C
        }
    }

    function A(C) {
        return f.call(C) === "[object Date]"
    }
    return Vn
}
hp();
/**
 * react-router v7.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Am = "popstate";

function gp(s = {}) {
    function c(u, f) {
        let {
            pathname: p,
            search: x,
            hash: v
        } = u.location;
        return lc("", {
            pathname: p,
            search: x,
            hash: v
        }, f.state && f.state.usr || null, f.state && f.state.key || "default")
    }

    function o(u, f) {
        return typeof f == "string" ? f : Zn(f)
    }
    return xp(c, o, null, s)
}

function De(s, c) {
    if (s === !1 || s === null || typeof s > "u") throw new Error(c)
}

function qt(s, c) {
    if (!s) {
        typeof console < "u" && console.warn(c);
        try {
            throw new Error(c)
        } catch {}
    }
}

function pp() {
    return Math.random().toString(36).substring(2, 10)
}

function Mm(s, c) {
    return {
        usr: s.state,
        key: s.key,
        idx: c
    }
}

function lc(s, c, o = null, u) {
    return {
        pathname: typeof s == "string" ? s : s.pathname,
        search: "",
        hash: "",
        ...typeof c == "string" ? Yl(c) : c,
        state: o,
        key: c && c.key || u || pp()
    }
}

function Zn({
    pathname: s = "/",
    search: c = "",
    hash: o = ""
}) {
    return c && c !== "?" && (s += c.charAt(0) === "?" ? c : "?" + c), o && o !== "#" && (s += o.charAt(0) === "#" ? o : "#" + o), s
}

function Yl(s) {
    let c = {};
    if (s) {
        let o = s.indexOf("#");
        o >= 0 && (c.hash = s.substring(o), s = s.substring(0, o));
        let u = s.indexOf("?");
        u >= 0 && (c.search = s.substring(u), s = s.substring(0, u)), s && (c.pathname = s)
    }
    return c
}

function xp(s, c, o, u = {}) {
    let {
        window: f = document.defaultView,
        v5Compat: p = !1
    } = u, x = f.history, v = "POP", m = null, g = y();
    g == null && (g = 0, x.replaceState({ ...x.state,
        idx: g
    }, ""));

    function y() {
        return (x.state || {
            idx: null
        }).idx
    }

    function A() {
        v = "POP";
        let E = y(),
            D = E == null ? null : E - g;
        g = E, m && m({
            action: v,
            location: V.location,
            delta: D
        })
    }

    function C(E, D) {
        v = "PUSH";
        let L = lc(V.location, E, D);
        g = y() + 1;
        let q = Mm(L, g),
            X = V.createHref(L);
        try {
            x.pushState(q, "", X)
        } catch (z) {
            if (z instanceof DOMException && z.name === "DataCloneError") throw z;
            f.location.assign(X)
        }
        p && m && m({
            action: v,
            location: V.location,
            delta: 1
        })
    }

    function G(E, D) {
        v = "REPLACE";
        let L = lc(V.location, E, D);
        g = y();
        let q = Mm(L, g),
            X = V.createHref(L);
        x.replaceState(q, "", X), p && m && m({
            action: v,
            location: V.location,
            delta: 0
        })
    }

    function O(E) {
        let D = f.location.origin !== "null" ? f.location.origin : f.location.href,
            L = typeof E == "string" ? E : Zn(E);
        return L = L.replace(/ $/, "%20"), De(D, `No window.location.(origin|href) available to create URL for href: ${L}`), new URL(L, D)
    }
    let V = {
        get action() {
            return v
        },
        get location() {
            return s(f, x)
        },
        listen(E) {
            if (m) throw new Error("A history only accepts one active listener");
            return f.addEventListener(Am, A), m = E, () => {
                f.removeEventListener(Am, A), m = null
            }
        },
        createHref(E) {
            return c(f, E)
        },
        createURL: O,
        encodeLocation(E) {
            let D = O(E);
            return {
                pathname: D.pathname,
                search: D.search,
                hash: D.hash
            }
        },
        push: C,
        replace: G,
        go(E) {
            return x.go(E)
        }
    };
    return V
}

function $m(s, c, o = "/") {
    return yp(s, c, o, !1)
}

function yp(s, c, o, u) {
    let f = typeof c == "string" ? Yl(c) : c,
        p = na(f.pathname || "/", o);
    if (p == null) return null;
    let x = Km(s);
    bp(x);
    let v = null;
    for (let m = 0; v == null && m < x.length; ++m) {
        let g = Mp(p);
        v = kp(x[m], g, u)
    }
    return v
}

function Km(s, c = [], o = [], u = "") {
    let f = (p, x, v) => {
        let m = {
            relativePath: v === void 0 ? p.path || "" : v,
            caseSensitive: p.caseSensitive === !0,
            childrenIndex: x,
            route: p
        };
        m.relativePath.startsWith("/") && (De(m.relativePath.startsWith(u), `Absolute route path "${m.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), m.relativePath = m.relativePath.slice(u.length));
        let g = la([u, m.relativePath]),
            y = o.concat(m);
        p.children && p.children.length > 0 && (De(p.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${g}".`), Km(p.children, c, y, g)), !(p.path == null && !p.index) && c.push({
            path: g,
            score: _p(g, p.index),
            routesMeta: y
        })
    };
    return s.forEach((p, x) => {
        var v;
        if (p.path === "" || !((v = p.path) != null && v.includes("?"))) f(p, x);
        else
            for (let m of Jm(p.path)) f(p, x, m)
    }), c
}

function Jm(s) {
    let c = s.split("/");
    if (c.length === 0) return [];
    let [o, ...u] = c, f = o.endsWith("?"), p = o.replace(/\?$/, "");
    if (u.length === 0) return f ? [p, ""] : [p];
    let x = Jm(u.join("/")),
        v = [];
    return v.push(...x.map(m => m === "" ? p : [p, m].join("/"))), f && v.push(...x), v.map(m => s.startsWith("/") && m === "" ? "/" : m)
}

function bp(s) {
    s.sort((c, o) => c.score !== o.score ? o.score - c.score : Tp(c.routesMeta.map(u => u.childrenIndex), o.routesMeta.map(u => u.childrenIndex)))
}
var vp = /^:[\w-]+$/,
    jp = 3,
    Np = 2,
    wp = 1,
    Ep = 10,
    Sp = -2,
    Cm = s => s === "*";

function _p(s, c) {
    let o = s.split("/"),
        u = o.length;
    return o.some(Cm) && (u += Sp), c && (u += Np), o.filter(f => !Cm(f)).reduce((f, p) => f + (vp.test(p) ? jp : p === "" ? wp : Ep), u)
}

function Tp(s, c) {
    return s.length === c.length && s.slice(0, -1).every((u, f) => u === c[f]) ? s[s.length - 1] - c[c.length - 1] : 0
}

function kp(s, c, o = !1) {
    let {
        routesMeta: u
    } = s, f = {}, p = "/", x = [];
    for (let v = 0; v < u.length; ++v) {
        let m = u[v],
            g = v === u.length - 1,
            y = p === "/" ? c : c.slice(p.length) || "/",
            A = js({
                path: m.relativePath,
                caseSensitive: m.caseSensitive,
                end: g
            }, y),
            C = m.route;
        if (!A && g && o && !u[u.length - 1].route.index && (A = js({
                path: m.relativePath,
                caseSensitive: m.caseSensitive,
                end: !1
            }, y)), !A) return null;
        Object.assign(f, A.params), x.push({
            params: f,
            pathname: la([p, A.pathname]),
            pathnameBase: Dp(la([p, A.pathnameBase])),
            route: C
        }), A.pathnameBase !== "/" && (p = la([p, A.pathnameBase]))
    }
    return x
}

function js(s, c) {
    typeof s == "string" && (s = {
        path: s,
        caseSensitive: !1,
        end: !0
    });
    let [o, u] = Ap(s.path, s.caseSensitive, s.end), f = c.match(o);
    if (!f) return null;
    let p = f[0],
        x = p.replace(/(.)\/+$/, "$1"),
        v = f.slice(1);
    return {
        params: u.reduce((g, {
            paramName: y,
            isOptional: A
        }, C) => {
            if (y === "*") {
                let O = v[C] || "";
                x = p.slice(0, p.length - O.length).replace(/(.)\/+$/, "$1")
            }
            const G = v[C];
            return A && !G ? g[y] = void 0 : g[y] = (G || "").replace(/%2F/g, "/"), g
        }, {}),
        pathname: p,
        pathnameBase: x,
        pattern: s
    }
}

function Ap(s, c = !1, o = !0) {
    qt(s === "*" || !s.endsWith("*") || s.endsWith("/*"), `Route path "${s}" will be treated as if it were "${s.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/,"/*")}".`);
    let u = [],
        f = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (x, v, m) => (u.push({
            paramName: v,
            isOptional: m != null
        }), m ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return s.endsWith("*") ? (u.push({
        paramName: "*"
    }), f += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? f += "\\/*$" : s !== "" && s !== "/" && (f += "(?:(?=\\/|$))"), [new RegExp(f, c ? void 0 : "i"), u]
}

function Mp(s) {
    try {
        return s.split("/").map(c => decodeURIComponent(c).replace(/\//g, "%2F")).join("/")
    } catch (c) {
        return qt(!1, `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`), s
    }
}

function na(s, c) {
    if (c === "/") return s;
    if (!s.toLowerCase().startsWith(c.toLowerCase())) return null;
    let o = c.endsWith("/") ? c.length - 1 : c.length,
        u = s.charAt(o);
    return u && u !== "/" ? null : s.slice(o) || "/"
}

function Cp(s, c = "/") {
    let {
        pathname: o,
        search: u = "",
        hash: f = ""
    } = typeof s == "string" ? Yl(s) : s;
    return {
        pathname: o ? o.startsWith("/") ? o : Rp(o, c) : c,
        search: zp(u),
        hash: Bp(f)
    }
}

function Rp(s, c) {
    let o = c.replace(/\/+$/, "").split("/");
    return s.split("/").forEach(f => {
        f === ".." ? o.length > 1 && o.pop() : f !== "." && o.push(f)
    }), o.length > 1 ? o.join("/") : "/"
}

function ec(s, c, o, u) {
    return `Cannot include a '${s}' character in a manually specified \`to.${c}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}

function Op(s) {
    return s.filter((c, o) => o === 0 || c.route.path && c.route.path.length > 0)
}

function Wm(s) {
    let c = Op(s);
    return c.map((o, u) => u === c.length - 1 ? o.pathname : o.pathnameBase)
}

function Fm(s, c, o, u = !1) {
    let f;
    typeof s == "string" ? f = Yl(s) : (f = { ...s
    }, De(!f.pathname || !f.pathname.includes("?"), ec("?", "pathname", "search", f)), De(!f.pathname || !f.pathname.includes("#"), ec("#", "pathname", "hash", f)), De(!f.search || !f.search.includes("#"), ec("#", "search", "hash", f)));
    let p = s === "" || f.pathname === "",
        x = p ? "/" : f.pathname,
        v;
    if (x == null) v = o;
    else {
        let A = c.length - 1;
        if (!u && x.startsWith("..")) {
            let C = x.split("/");
            for (; C[0] === "..";) C.shift(), A -= 1;
            f.pathname = C.join("/")
        }
        v = A >= 0 ? c[A] : "/"
    }
    let m = Cp(f, v),
        g = x && x !== "/" && x.endsWith("/"),
        y = (p || x === ".") && o.endsWith("/");
    return !m.pathname.endsWith("/") && (g || y) && (m.pathname += "/"), m
}
var la = s => s.join("/").replace(/\/\/+/g, "/"),
    Dp = s => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
    zp = s => !s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s,
    Bp = s => !s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s;

function qp(s) {
    return s != null && typeof s.status == "number" && typeof s.statusText == "string" && typeof s.internal == "boolean" && "data" in s
}
var Pm = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Pm);
var Up = ["GET", ...Pm];
new Set(Up);
var Xl = N.createContext(null);
Xl.displayName = "DataRouter";
var Es = N.createContext(null);
Es.displayName = "DataRouterState";
var Im = N.createContext({
    isTransitioning: !1
});
Im.displayName = "ViewTransition";
var Lp = N.createContext(new Map);
Lp.displayName = "Fetchers";
var Hp = N.createContext(null);
Hp.displayName = "Await";
var Ut = N.createContext(null);
Ut.displayName = "Navigation";
var Jn = N.createContext(null);
Jn.displayName = "Location";
var sa = N.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
sa.displayName = "Route";
var gc = N.createContext(null);
gc.displayName = "RouteError";

function Gp(s, {
    relative: c
} = {}) {
    De(Wn(), "useHref() may be used only in the context of a <Router> component.");
    let {
        basename: o,
        navigator: u
    } = N.useContext(Ut), {
        hash: f,
        pathname: p,
        search: x
    } = Fn(s, {
        relative: c
    }), v = p;
    return o !== "/" && (v = p === "/" ? o : la([o, p])), u.createHref({
        pathname: v,
        search: x,
        hash: f
    })
}

function Wn() {
    return N.useContext(Jn) != null
}

function ra() {
    return De(Wn(), "useLocation() may be used only in the context of a <Router> component."), N.useContext(Jn).location
}
var e0 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";

function t0(s) {
    N.useContext(Ut).static || N.useLayoutEffect(s)
}

function Yp() {
    let {
        isDataRoute: s
    } = N.useContext(sa);
    return s ? tx() : Xp()
}

function Xp() {
    De(Wn(), "useNavigate() may be used only in the context of a <Router> component.");
    let s = N.useContext(Xl),
        {
            basename: c,
            navigator: o
        } = N.useContext(Ut),
        {
            matches: u
        } = N.useContext(sa),
        {
            pathname: f
        } = ra(),
        p = JSON.stringify(Wm(u)),
        x = N.useRef(!1);
    return t0(() => {
        x.current = !0
    }), N.useCallback((m, g = {}) => {
        if (qt(x.current, e0), !x.current) return;
        if (typeof m == "number") {
            o.go(m);
            return
        }
        let y = Fm(m, JSON.parse(p), f, g.relative === "path");
        s == null && c !== "/" && (y.pathname = y.pathname === "/" ? c : la([c, y.pathname])), (g.replace ? o.replace : o.push)(y, g.state, g)
    }, [c, o, p, f, s])
}
N.createContext(null);

function Fn(s, {
    relative: c
} = {}) {
    let {
        matches: o
    } = N.useContext(sa), {
        pathname: u
    } = ra(), f = JSON.stringify(Wm(o));
    return N.useMemo(() => Fm(s, JSON.parse(f), u, c === "path"), [s, f, u, c])
}

function Vp(s, c) {
    return a0(s, c)
}

function a0(s, c, o, u) {
    var L;
    De(Wn(), "useRoutes() may be used only in the context of a <Router> component.");
    let {
        navigator: f,
        static: p
    } = N.useContext(Ut), {
        matches: x
    } = N.useContext(sa), v = x[x.length - 1], m = v ? v.params : {}, g = v ? v.pathname : "/", y = v ? v.pathnameBase : "/", A = v && v.route; {
        let q = A && A.path || "";
        l0(g, !A || q.endsWith("*") || q.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${q}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${q}"> to <Route path="${q==="/"?"*":`${q}/*`}">.`)
    }
    let C = ra(),
        G;
    if (c) {
        let q = typeof c == "string" ? Yl(c) : c;
        De(y === "/" || ((L = q.pathname) == null ? void 0 : L.startsWith(y)), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${y}" but pathname "${q.pathname}" was given in the \`location\` prop.`), G = q
    } else G = C;
    let O = G.pathname || "/",
        V = O;
    if (y !== "/") {
        let q = y.replace(/^\//, "").split("/");
        V = "/" + O.replace(/^\//, "").split("/").slice(q.length).join("/")
    }
    let E = !p && o && o.matches && o.matches.length > 0 ? o.matches : $m(s, {
        pathname: V
    });
    qt(A || E != null, `No routes matched location "${G.pathname}${G.search}${G.hash}" `), qt(E == null || E[E.length - 1].route.element !== void 0 || E[E.length - 1].route.Component !== void 0 || E[E.length - 1].route.lazy !== void 0, `Matched leaf route at location "${G.pathname}${G.search}${G.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
    let D = Jp(E && E.map(q => Object.assign({}, q, {
        params: Object.assign({}, m, q.params),
        pathname: la([y, f.encodeLocation ? f.encodeLocation(q.pathname).pathname : q.pathname]),
        pathnameBase: q.pathnameBase === "/" ? y : la([y, f.encodeLocation ? f.encodeLocation(q.pathnameBase).pathname : q.pathnameBase])
    })), x, o, u);
    return c && D ? N.createElement(Jn.Provider, {
        value: {
            location: {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
                ...G
            },
            navigationType: "POP"
        }
    }, D) : D
}

function Qp() {
    let s = ex(),
        c = qp(s) ? `${s.status} ${s.statusText}` : s instanceof Error ? s.message : JSON.stringify(s),
        o = s instanceof Error ? s.stack : null,
        u = "rgba(200,200,200, 0.5)",
        f = {
            padding: "0.5rem",
            backgroundColor: u
        },
        p = {
            padding: "2px 4px",
            backgroundColor: u
        },
        x = null;
    return console.error("Error handled by React Router default ErrorBoundary:", s), x = N.createElement(N.Fragment, null, N.createElement("p", null, "💿 Hey developer 👋"), N.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", N.createElement("code", {
        style: p
    }, "ErrorBoundary"), " or", " ", N.createElement("code", {
        style: p
    }, "errorElement"), " prop on your route.")), N.createElement(N.Fragment, null, N.createElement("h2", null, "Unexpected Application Error!"), N.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, c), o ? N.createElement("pre", {
        style: f
    }, o) : null, x)
}
var Zp = N.createElement(Qp, null),
    $p = class extends N.Component {
        constructor(s) {
            super(s), this.state = {
                location: s.location,
                revalidation: s.revalidation,
                error: s.error
            }
        }
        static getDerivedStateFromError(s) {
            return {
                error: s
            }
        }
        static getDerivedStateFromProps(s, c) {
            return c.location !== s.location || c.revalidation !== "idle" && s.revalidation === "idle" ? {
                error: s.error,
                location: s.location,
                revalidation: s.revalidation
            } : {
                error: s.error !== void 0 ? s.error : c.error,
                location: c.location,
                revalidation: s.revalidation || c.revalidation
            }
        }
        componentDidCatch(s, c) {
            console.error("React Router caught the following error during render", s, c)
        }
        render() {
            return this.state.error !== void 0 ? N.createElement(sa.Provider, {
                value: this.props.routeContext
            }, N.createElement(gc.Provider, {
                value: this.state.error,
                children: this.props.component
            })) : this.props.children
        }
    };

function Kp({
    routeContext: s,
    match: c,
    children: o
}) {
    let u = N.useContext(Xl);
    return u && u.static && u.staticContext && (c.route.errorElement || c.route.ErrorBoundary) && (u.staticContext._deepestRenderedBoundaryId = c.route.id), N.createElement(sa.Provider, {
        value: s
    }, o)
}

function Jp(s, c = [], o = null, u = null) {
    if (s == null) {
        if (!o) return null;
        if (o.errors) s = o.matches;
        else if (c.length === 0 && !o.initialized && o.matches.length > 0) s = o.matches;
        else return null
    }
    let f = s,
        p = o == null ? void 0 : o.errors;
    if (p != null) {
        let m = f.findIndex(g => g.route.id && (p == null ? void 0 : p[g.route.id]) !== void 0);
        De(m >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(p).join(",")}`), f = f.slice(0, Math.min(f.length, m + 1))
    }
    let x = !1,
        v = -1;
    if (o)
        for (let m = 0; m < f.length; m++) {
            let g = f[m];
            if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (v = m), g.route.id) {
                let {
                    loaderData: y,
                    errors: A
                } = o, C = g.route.loader && !y.hasOwnProperty(g.route.id) && (!A || A[g.route.id] === void 0);
                if (g.route.lazy || C) {
                    x = !0, v >= 0 ? f = f.slice(0, v + 1) : f = [f[0]];
                    break
                }
            }
        }
    return f.reduceRight((m, g, y) => {
        let A, C = !1,
            G = null,
            O = null;
        o && (A = p && g.route.id ? p[g.route.id] : void 0, G = g.route.errorElement || Zp, x && (v < 0 && y === 0 ? (l0("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), C = !0, O = null) : v === y && (C = !0, O = g.route.hydrateFallbackElement || null)));
        let V = c.concat(f.slice(0, y + 1)),
            E = () => {
                let D;
                return A ? D = G : C ? D = O : g.route.Component ? D = N.createElement(g.route.Component, null) : g.route.element ? D = g.route.element : D = m, N.createElement(Kp, {
                    match: g,
                    routeContext: {
                        outlet: m,
                        matches: V,
                        isDataRoute: o != null
                    },
                    children: D
                })
            };
        return o && (g.route.ErrorBoundary || g.route.errorElement || y === 0) ? N.createElement($p, {
            location: o.location,
            revalidation: o.revalidation,
            component: G,
            error: A,
            children: E(),
            routeContext: {
                outlet: null,
                matches: V,
                isDataRoute: !0
            }
        }) : E()
    }, null)
}

function pc(s) {
    return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function Wp(s) {
    let c = N.useContext(Xl);
    return De(c, pc(s)), c
}

function Fp(s) {
    let c = N.useContext(Es);
    return De(c, pc(s)), c
}

function Pp(s) {
    let c = N.useContext(sa);
    return De(c, pc(s)), c
}

function xc(s) {
    let c = Pp(s),
        o = c.matches[c.matches.length - 1];
    return De(o.route.id, `${s} can only be used on routes that contain a unique "id"`), o.route.id
}

function Ip() {
    return xc("useRouteId")
}

function ex() {
    var u;
    let s = N.useContext(gc),
        c = Fp("useRouteError"),
        o = xc("useRouteError");
    return s !== void 0 ? s : (u = c.errors) == null ? void 0 : u[o]
}

function tx() {
    let {
        router: s
    } = Wp("useNavigate"), c = xc("useNavigate"), o = N.useRef(!1);
    return t0(() => {
        o.current = !0
    }), N.useCallback(async (f, p = {}) => {
        qt(o.current, e0), o.current && (typeof f == "number" ? s.navigate(f) : await s.navigate(f, {
            fromRouteId: c,
            ...p
        }))
    }, [s, c])
}
var Rm = {};

function l0(s, c, o) {
    !c && !Rm[s] && (Rm[s] = !0, qt(!1, o))
}
N.memo(ax);

function ax({
    routes: s,
    future: c,
    state: o
}) {
    return a0(s, void 0, o, c)
}

function Mt(s) {
    De(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")
}

function lx({
    basename: s = "/",
    children: c = null,
    location: o,
    navigationType: u = "POP",
    navigator: f,
    static: p = !1
}) {
    De(!Wn(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let x = s.replace(/^\/*/, "/"),
        v = N.useMemo(() => ({
            basename: x,
            navigator: f,
            static: p,
            future: {}
        }), [x, f, p]);
    typeof o == "string" && (o = Yl(o));
    let {
        pathname: m = "/",
        search: g = "",
        hash: y = "",
        state: A = null,
        key: C = "default"
    } = o, G = N.useMemo(() => {
        let O = na(m, x);
        return O == null ? null : {
            location: {
                pathname: O,
                search: g,
                hash: y,
                state: A,
                key: C
            },
            navigationType: u
        }
    }, [x, m, g, y, A, C, u]);
    return qt(G != null, `<Router basename="${x}"> is not able to match the URL "${m}${g}${y}" because it does not start with the basename, so the <Router> won't render anything.`), G == null ? null : N.createElement(Ut.Provider, {
        value: v
    }, N.createElement(Jn.Provider, {
        children: c,
        value: G
    }))
}

function nx({
    children: s,
    location: c
}) {
    return Vp(nc(s), c)
}

function nc(s, c = []) {
    let o = [];
    return N.Children.forEach(s, (u, f) => {
        if (!N.isValidElement(u)) return;
        let p = [...c, f];
        if (u.type === N.Fragment) {
            o.push.apply(o, nc(u.props.children, p));
            return
        }
        De(u.type === Mt, `[${typeof u.type=="string"?u.type:u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), De(!u.props.index || !u.props.children, "An index route cannot have child routes.");
        let x = {
            id: u.props.id || p.join("-"),
            caseSensitive: u.props.caseSensitive,
            element: u.props.element,
            Component: u.props.Component,
            index: u.props.index,
            path: u.props.path,
            loader: u.props.loader,
            action: u.props.action,
            hydrateFallbackElement: u.props.hydrateFallbackElement,
            HydrateFallback: u.props.HydrateFallback,
            errorElement: u.props.errorElement,
            ErrorBoundary: u.props.ErrorBoundary,
            hasErrorBoundary: u.props.hasErrorBoundary === !0 || u.props.ErrorBoundary != null || u.props.errorElement != null,
            shouldRevalidate: u.props.shouldRevalidate,
            handle: u.props.handle,
            lazy: u.props.lazy
        };
        u.props.children && (x.children = nc(u.props.children, p)), o.push(x)
    }), o
}
var xs = "get",
    ys = "application/x-www-form-urlencoded";

function Ss(s) {
    return s != null && typeof s.tagName == "string"
}

function ix(s) {
    return Ss(s) && s.tagName.toLowerCase() === "button"
}

function sx(s) {
    return Ss(s) && s.tagName.toLowerCase() === "form"
}

function rx(s) {
    return Ss(s) && s.tagName.toLowerCase() === "input"
}

function ox(s) {
    return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey)
}

function cx(s, c) {
    return s.button === 0 && (!c || c === "_self") && !ox(s)
}
var ps = null;

function ux() {
    if (ps === null) try {
        new FormData(document.createElement("form"), 0), ps = !1
    } catch {
        ps = !0
    }
    return ps
}
var dx = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);

function tc(s) {
    return s != null && !dx.has(s) ? (qt(!1, `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ys}"`), null) : s
}

function fx(s, c) {
    let o, u, f, p, x;
    if (sx(s)) {
        let v = s.getAttribute("action");
        u = v ? na(v, c) : null, o = s.getAttribute("method") || xs, f = tc(s.getAttribute("enctype")) || ys, p = new FormData(s)
    } else if (ix(s) || rx(s) && (s.type === "submit" || s.type === "image")) {
        let v = s.form;
        if (v == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let m = s.getAttribute("formaction") || v.getAttribute("action");
        if (u = m ? na(m, c) : null, o = s.getAttribute("formmethod") || v.getAttribute("method") || xs, f = tc(s.getAttribute("formenctype")) || tc(v.getAttribute("enctype")) || ys, p = new FormData(v, s), !ux()) {
            let {
                name: g,
                type: y,
                value: A
            } = s;
            if (y === "image") {
                let C = g ? `${g}.` : "";
                p.append(`${C}x`, "0"), p.append(`${C}y`, "0")
            } else g && p.append(g, A)
        }
    } else {
        if (Ss(s)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        o = xs, u = null, f = ys, x = s
    }
    return p && f === "text/plain" && (x = p, p = void 0), {
        action: u,
        method: o.toLowerCase(),
        encType: f,
        formData: p,
        body: x
    }
}

function yc(s, c) {
    if (s === !1 || s === null || typeof s > "u") throw new Error(c)
}
async function mx(s, c) {
    if (s.id in c) return c[s.id];
    try {
        let o = await
        import (s.module);
        return c[s.id] = o, o
    } catch (o) {
        return console.error(`Error loading route module \`${s.module}\`, reloading page...`), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {})
    }
}

function hx(s) {
    return s == null ? !1 : s.href == null ? s.rel === "preload" && typeof s.imageSrcSet == "string" && typeof s.imageSizes == "string" : typeof s.rel == "string" && typeof s.href == "string"
}
async function gx(s, c, o) {
    let u = await Promise.all(s.map(async f => {
        let p = c.routes[f.route.id];
        if (p) {
            let x = await mx(p, o);
            return x.links ? x.links() : []
        }
        return []
    }));
    return bx(u.flat(1).filter(hx).filter(f => f.rel === "stylesheet" || f.rel === "preload").map(f => f.rel === "stylesheet" ? { ...f,
        rel: "prefetch",
        as: "style"
    } : { ...f,
        rel: "prefetch"
    }))
}

function Om(s, c, o, u, f, p) {
    let x = (m, g) => o[g] ? m.route.id !== o[g].route.id : !0,
        v = (m, g) => {
            var y;
            return o[g].pathname !== m.pathname || ((y = o[g].route.path) == null ? void 0 : y.endsWith("*")) && o[g].params["*"] !== m.params["*"]
        };
    return p === "assets" ? c.filter((m, g) => x(m, g) || v(m, g)) : p === "data" ? c.filter((m, g) => {
        var A;
        let y = u.routes[m.route.id];
        if (!y || !y.hasLoader) return !1;
        if (x(m, g) || v(m, g)) return !0;
        if (m.route.shouldRevalidate) {
            let C = m.route.shouldRevalidate({
                currentUrl: new URL(f.pathname + f.search + f.hash, window.origin),
                currentParams: ((A = o[0]) == null ? void 0 : A.params) || {},
                nextUrl: new URL(s, window.origin),
                nextParams: m.params,
                defaultShouldRevalidate: !0
            });
            if (typeof C == "boolean") return C
        }
        return !0
    }) : []
}

function px(s, c, {
    includeHydrateFallback: o
} = {}) {
    return xx(s.map(u => {
        let f = c.routes[u.route.id];
        if (!f) return [];
        let p = [f.module];
        return f.clientActionModule && (p = p.concat(f.clientActionModule)), f.clientLoaderModule && (p = p.concat(f.clientLoaderModule)), o && f.hydrateFallbackModule && (p = p.concat(f.hydrateFallbackModule)), f.imports && (p = p.concat(f.imports)), p
    }).flat(1))
}

function xx(s) {
    return [...new Set(s)]
}

function yx(s) {
    let c = {},
        o = Object.keys(s).sort();
    for (let u of o) c[u] = s[u];
    return c
}

function bx(s, c) {
    let o = new Set;
    return new Set(c), s.reduce((u, f) => {
        let p = JSON.stringify(yx(f));
        return o.has(p) || (o.add(p), u.push({
            key: p,
            link: f
        })), u
    }, [])
}

function vx(s, c) {
    let o = typeof s == "string" ? new URL(s, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : s;
    return o.pathname === "/" ? o.pathname = "_root.data" : c && na(o.pathname, c) === "/" ? o.pathname = `${c.replace(/\/$/,"")}/_root.data` : o.pathname = `${o.pathname.replace(/\/$/,"")}.data`, o
}

function n0() {
    let s = N.useContext(Xl);
    return yc(s, "You must render this element inside a <DataRouterContext.Provider> element"), s
}

function jx() {
    let s = N.useContext(Es);
    return yc(s, "You must render this element inside a <DataRouterStateContext.Provider> element"), s
}
var bc = N.createContext(void 0);
bc.displayName = "FrameworkContext";

function i0() {
    let s = N.useContext(bc);
    return yc(s, "You must render this element inside a <HydratedRouter> element"), s
}

function Nx(s, c) {
    let o = N.useContext(bc),
        [u, f] = N.useState(!1),
        [p, x] = N.useState(!1),
        {
            onFocus: v,
            onBlur: m,
            onMouseEnter: g,
            onMouseLeave: y,
            onTouchStart: A
        } = c,
        C = N.useRef(null);
    N.useEffect(() => {
        if (s === "render" && x(!0), s === "viewport") {
            let V = D => {
                    D.forEach(L => {
                        x(L.isIntersecting)
                    })
                },
                E = new IntersectionObserver(V, {
                    threshold: .5
                });
            return C.current && E.observe(C.current), () => {
                E.disconnect()
            }
        }
    }, [s]), N.useEffect(() => {
        if (u) {
            let V = setTimeout(() => {
                x(!0)
            }, 100);
            return () => {
                clearTimeout(V)
            }
        }
    }, [u]);
    let G = () => {
            f(!0)
        },
        O = () => {
            f(!1), x(!1)
        };
    return o ? s !== "intent" ? [p, C, {}] : [p, C, {
        onFocus: Qn(v, G),
        onBlur: Qn(m, O),
        onMouseEnter: Qn(g, G),
        onMouseLeave: Qn(y, O),
        onTouchStart: Qn(A, G)
    }] : [!1, C, {}]
}

function Qn(s, c) {
    return o => {
        s && s(o), o.defaultPrevented || c(o)
    }
}

function wx({
    page: s,
    ...c
}) {
    let {
        router: o
    } = n0(), u = N.useMemo(() => $m(o.routes, s, o.basename), [o.routes, s, o.basename]);
    return u ? N.createElement(Sx, {
        page: s,
        matches: u,
        ...c
    }) : null
}

function Ex(s) {
    let {
        manifest: c,
        routeModules: o
    } = i0(), [u, f] = N.useState([]);
    return N.useEffect(() => {
        let p = !1;
        return gx(s, c, o).then(x => {
            p || f(x)
        }), () => {
            p = !0
        }
    }, [s, c, o]), u
}

function Sx({
    page: s,
    matches: c,
    ...o
}) {
    let u = ra(),
        {
            manifest: f,
            routeModules: p
        } = i0(),
        {
            basename: x
        } = n0(),
        {
            loaderData: v,
            matches: m
        } = jx(),
        g = N.useMemo(() => Om(s, c, m, f, u, "data"), [s, c, m, f, u]),
        y = N.useMemo(() => Om(s, c, m, f, u, "assets"), [s, c, m, f, u]),
        A = N.useMemo(() => {
            if (s === u.pathname + u.search + u.hash) return [];
            let O = new Set,
                V = !1;
            if (c.forEach(D => {
                    var q;
                    let L = f.routes[D.route.id];
                    !L || !L.hasLoader || (!g.some(X => X.route.id === D.route.id) && D.route.id in v && ((q = p[D.route.id]) != null && q.shouldRevalidate) || L.hasClientLoader ? V = !0 : O.add(D.route.id))
                }), O.size === 0) return [];
            let E = vx(s, x);
            return V && O.size > 0 && E.searchParams.set("_routes", c.filter(D => O.has(D.route.id)).map(D => D.route.id).join(",")), [E.pathname + E.search]
        }, [x, v, u, f, g, c, s, p]),
        C = N.useMemo(() => px(y, f), [y, f]),
        G = Ex(y);
    return N.createElement(N.Fragment, null, A.map(O => N.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...o
    })), C.map(O => N.createElement("link", {
        key: O,
        rel: "modulepreload",
        href: O,
        ...o
    })), G.map(({
        key: O,
        link: V
    }) => N.createElement("link", {
        key: O,
        ...V
    })))
}

function _x(...s) {
    return c => {
        s.forEach(o => {
            typeof o == "function" ? o(c) : o != null && (o.current = c)
        })
    }
}
var s0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    s0 && (window.__reactRouterVersion = "7.4.1")
} catch {}

function Tx({
    basename: s,
    children: c,
    window: o
}) {
    let u = N.useRef();
    u.current == null && (u.current = gp({
        window: o,
        v5Compat: !0
    }));
    let f = u.current,
        [p, x] = N.useState({
            action: f.action,
            location: f.location
        }),
        v = N.useCallback(m => {
            N.startTransition(() => x(m))
        }, [x]);
    return N.useLayoutEffect(() => f.listen(v), [f, v]), N.createElement(lx, {
        basename: s,
        children: c,
        location: p.location,
        navigationType: p.action,
        navigator: f
    })
}
var r0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    aa = N.forwardRef(function({
        onClick: c,
        discover: o = "render",
        prefetch: u = "none",
        relative: f,
        reloadDocument: p,
        replace: x,
        state: v,
        target: m,
        to: g,
        preventScrollReset: y,
        viewTransition: A,
        ...C
    }, G) {
        let {
            basename: O
        } = N.useContext(Ut), V = typeof g == "string" && r0.test(g), E, D = !1;
        if (typeof g == "string" && V && (E = g, s0)) try {
            let re = new URL(window.location.href),
                Q = g.startsWith("//") ? new URL(re.protocol + g) : new URL(g),
                te = na(Q.pathname, O);
            Q.origin === re.origin && te != null ? g = te + Q.search + Q.hash : D = !0
        } catch {
            qt(!1, `<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
        let L = Gp(g, {
                relative: f
            }),
            [q, X, z] = Nx(u, C),
            K = Cx(g, {
                replace: x,
                state: v,
                target: m,
                preventScrollReset: y,
                relative: f,
                viewTransition: A
            });

        function $(re) {
            c && c(re), re.defaultPrevented || K(re)
        }
        let P = N.createElement("a", { ...C,
            ...z,
            href: E || L,
            onClick: D || p ? c : $,
            ref: _x(G, X),
            target: m,
            "data-discover": !V && o === "render" ? "true" : void 0
        });
        return q && !V ? N.createElement(N.Fragment, null, P, N.createElement(wx, {
            page: L
        })) : P
    });
aa.displayName = "Link";
var kx = N.forwardRef(function({
    "aria-current": c = "page",
    caseSensitive: o = !1,
    className: u = "",
    end: f = !1,
    style: p,
    to: x,
    viewTransition: v,
    children: m,
    ...g
}, y) {
    let A = Fn(x, {
            relative: g.relative
        }),
        C = ra(),
        G = N.useContext(Es),
        {
            navigator: O,
            basename: V
        } = N.useContext(Ut),
        E = G != null && Bx(A) && v === !0,
        D = O.encodeLocation ? O.encodeLocation(A).pathname : A.pathname,
        L = C.pathname,
        q = G && G.navigation && G.navigation.location ? G.navigation.location.pathname : null;
    o || (L = L.toLowerCase(), q = q ? q.toLowerCase() : null, D = D.toLowerCase()), q && V && (q = na(q, V) || q);
    const X = D !== "/" && D.endsWith("/") ? D.length - 1 : D.length;
    let z = L === D || !f && L.startsWith(D) && L.charAt(X) === "/",
        K = q != null && (q === D || !f && q.startsWith(D) && q.charAt(D.length) === "/"),
        $ = {
            isActive: z,
            isPending: K,
            isTransitioning: E
        },
        P = z ? c : void 0,
        re;
    typeof u == "function" ? re = u($) : re = [u, z ? "active" : null, K ? "pending" : null, E ? "transitioning" : null].filter(Boolean).join(" ");
    let Q = typeof p == "function" ? p($) : p;
    return N.createElement(aa, { ...g,
        "aria-current": P,
        className: re,
        ref: y,
        style: Q,
        to: x,
        viewTransition: v
    }, typeof m == "function" ? m($) : m)
});
kx.displayName = "NavLink";
var Ax = N.forwardRef(({
    discover: s = "render",
    fetcherKey: c,
    navigate: o,
    reloadDocument: u,
    replace: f,
    state: p,
    method: x = xs,
    action: v,
    onSubmit: m,
    relative: g,
    preventScrollReset: y,
    viewTransition: A,
    ...C
}, G) => {
    let O = Dx(),
        V = zx(v, {
            relative: g
        }),
        E = x.toLowerCase() === "get" ? "get" : "post",
        D = typeof v == "string" && r0.test(v),
        L = q => {
            if (m && m(q), q.defaultPrevented) return;
            q.preventDefault();
            let X = q.nativeEvent.submitter,
                z = (X == null ? void 0 : X.getAttribute("formmethod")) || x;
            O(X || q.currentTarget, {
                fetcherKey: c,
                method: z,
                navigate: o,
                replace: f,
                state: p,
                relative: g,
                preventScrollReset: y,
                viewTransition: A
            })
        };
    return N.createElement("form", {
        ref: G,
        method: E,
        action: V,
        onSubmit: u ? m : L,
        ...C,
        "data-discover": !D && s === "render" ? "true" : void 0
    })
});
Ax.displayName = "Form";

function Mx(s) {
    return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function o0(s) {
    let c = N.useContext(Xl);
    return De(c, Mx(s)), c
}

function Cx(s, {
    target: c,
    replace: o,
    state: u,
    preventScrollReset: f,
    relative: p,
    viewTransition: x
} = {}) {
    let v = Yp(),
        m = ra(),
        g = Fn(s, {
            relative: p
        });
    return N.useCallback(y => {
        if (cx(y, c)) {
            y.preventDefault();
            let A = o !== void 0 ? o : Zn(m) === Zn(g);
            v(s, {
                replace: A,
                state: u,
                preventScrollReset: f,
                relative: p,
                viewTransition: x
            })
        }
    }, [m, v, g, o, u, c, s, f, p, x])
}
var Rx = 0,
    Ox = () => `__${String(++Rx)}__`;

function Dx() {
    let {
        router: s
    } = o0("useSubmit"), {
        basename: c
    } = N.useContext(Ut), o = Ip();
    return N.useCallback(async (u, f = {}) => {
        let {
            action: p,
            method: x,
            encType: v,
            formData: m,
            body: g
        } = fx(u, c);
        if (f.navigate === !1) {
            let y = f.fetcherKey || Ox();
            await s.fetch(y, o, f.action || p, {
                preventScrollReset: f.preventScrollReset,
                formData: m,
                body: g,
                formMethod: f.method || x,
                formEncType: f.encType || v,
                flushSync: f.flushSync
            })
        } else await s.navigate(f.action || p, {
            preventScrollReset: f.preventScrollReset,
            formData: m,
            body: g,
            formMethod: f.method || x,
            formEncType: f.encType || v,
            replace: f.replace,
            state: f.state,
            fromRouteId: o,
            flushSync: f.flushSync,
            viewTransition: f.viewTransition
        })
    }, [s, c, o])
}

function zx(s, {
    relative: c
} = {}) {
    let {
        basename: o
    } = N.useContext(Ut), u = N.useContext(sa);
    De(u, "useFormAction must be used inside a RouteContext");
    let [f] = u.matches.slice(-1), p = { ...Fn(s || ".", {
            relative: c
        })
    }, x = ra();
    if (s == null) {
        p.search = x.search;
        let v = new URLSearchParams(p.search),
            m = v.getAll("index");
        if (m.some(y => y === "")) {
            v.delete("index"), m.filter(A => A).forEach(A => v.append("index", A));
            let y = v.toString();
            p.search = y ? `?${y}` : ""
        }
    }
    return (!s || s === ".") && f.route.index && (p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (p.pathname = p.pathname === "/" ? o : la([o, p.pathname])), Zn(p)
}

function Bx(s, c = {}) {
    let o = N.useContext(Im);
    De(o != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {
        basename: u
    } = o0("useViewTransitionState"), f = Fn(s, {
        relative: c.relative
    });
    if (!o.isTransitioning) return !1;
    let p = na(o.currentLocation.pathname, u) || o.currentLocation.pathname,
        x = na(o.nextLocation.pathname, u) || o.nextLocation.pathname;
    return js(f.pathname, x) != null || js(f.pathname, p) != null
}
new TextEncoder;
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qx = s => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    Ux = s => s.replace(/^([A-Z])|[\s-_]+(\w)/g, (c, o, u) => u ? u.toUpperCase() : o.toLowerCase()),
    Dm = s => {
        const c = Ux(s);
        return c.charAt(0).toUpperCase() + c.slice(1)
    },
    c0 = (...s) => s.filter((c, o, u) => !!c && c.trim() !== "" && u.indexOf(c) === o).join(" ").trim();
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Lx = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hx = N.forwardRef(({
    color: s = "currentColor",
    size: c = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: u,
    className: f = "",
    children: p,
    iconNode: x,
    ...v
}, m) => N.createElement("svg", {
    ref: m,
    ...Lx,
    width: c,
    height: c,
    stroke: s,
    strokeWidth: u ? Number(o) * 24 / Number(c) : o,
    className: c0("lucide", f),
    ...v
}, [...x.map(([g, y]) => N.createElement(g, y)), ...Array.isArray(p) ? p : [p]]));
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = (s, c) => {
    const o = N.forwardRef(({
        className: u,
        ...f
    }, p) => N.createElement(Hx, {
        ref: p,
        iconNode: c,
        className: c0(`lucide-${qx(Dm(s))}`, `lucide-${s}`, u),
        ...f
    }));
    return o.displayName = Dm(s), o
};
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gx = [
        ["path", {
            d: "M5 12h14",
            key: "1ays0h"
        }],
        ["path", {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }]
    ],
    u0 = ae("arrow-right", Gx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yx = [
        ["path", {
            d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
            key: "1yiouv"
        }],
        ["circle", {
            cx: "12",
            cy: "8",
            r: "6",
            key: "1vp47v"
        }]
    ],
    ic = ae("award", Yx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xx = [
        ["path", {
            d: "M4.5 3h15",
            key: "c7n0jr"
        }],
        ["path", {
            d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3",
            key: "m1uhx7"
        }],
        ["path", {
            d: "M6 14h12",
            key: "4cwo0f"
        }]
    ],
    Vx = ae("beaker", Xx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qx = [
        ["path", {
            d: "M12 7v14",
            key: "1akyts"
        }],
        ["path", {
            d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
            key: "ruj8y"
        }]
    ],
    Zx = ae("book-open", Qx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $x = [
        ["path", {
            d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
            key: "k3hazp"
        }]
    ],
    Kx = ae("book", $x);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jx = [
        ["path", {
            d: "M12 8V4H8",
            key: "hb8ula"
        }],
        ["rect", {
            width: "16",
            height: "12",
            x: "4",
            y: "8",
            rx: "2",
            key: "enze0r"
        }],
        ["path", {
            d: "M2 14h2",
            key: "vft8re"
        }],
        ["path", {
            d: "M20 14h2",
            key: "4cs60a"
        }],
        ["path", {
            d: "M15 13v2",
            key: "1xurst"
        }],
        ["path", {
            d: "M9 13v2",
            key: "rq6x2g"
        }]
    ],
    sc = ae("bot", Jx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wx = [
        ["path", {
            d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
            key: "l5xja"
        }],
        ["path", {
            d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
            key: "ep3f8r"
        }],
        ["path", {
            d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",
            key: "1p4c4q"
        }],
        ["path", {
            d: "M17.599 6.5a3 3 0 0 0 .399-1.375",
            key: "tmeiqw"
        }],
        ["path", {
            d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
            key: "105sqy"
        }],
        ["path", {
            d: "M3.477 10.896a4 4 0 0 1 .585-.396",
            key: "ql3yin"
        }],
        ["path", {
            d: "M19.938 10.5a4 4 0 0 1 .585.396",
            key: "1qfode"
        }],
        ["path", {
            d: "M6 18a4 4 0 0 1-1.967-.516",
            key: "2e4loj"
        }],
        ["path", {
            d: "M19.967 17.484A4 4 0 0 1 18 18",
            key: "159ez6"
        }]
    ],
    vc = ae("brain", Wx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fx = [
        ["path", {
            d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
            key: "jecpp"
        }],
        ["rect", {
            width: "20",
            height: "14",
            x: "2",
            y: "6",
            rx: "2",
            key: "i6l2r4"
        }]
    ],
    Px = ae("briefcase", Fx);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ix = [
        ["path", {
            d: "M8 2v4",
            key: "1cmpym"
        }],
        ["path", {
            d: "M16 2v4",
            key: "4m81vk"
        }],
        ["rect", {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }],
        ["path", {
            d: "M3 10h18",
            key: "8toen8"
        }]
    ],
    jc = ae("calendar", Ix);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ey = [
        ["line", {
            x1: "12",
            x2: "12",
            y1: "20",
            y2: "10",
            key: "1vz5eb"
        }],
        ["line", {
            x1: "18",
            x2: "18",
            y1: "20",
            y2: "4",
            key: "cun8e5"
        }],
        ["line", {
            x1: "6",
            x2: "6",
            y1: "20",
            y2: "16",
            key: "hq0ia6"
        }]
    ],
    ty = ae("chart-no-axes-column-increasing", ey);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ay = [
        ["path", {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }]
    ],
    ly = ae("check", ay);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ny = [
        ["path", {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }]
    ],
    ta = ae("chevron-down", ny);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iy = [
        ["path", {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }]
    ],
    d0 = ae("chevron-left", iy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sy = [
        ["path", {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }]
    ],
    f0 = ae("chevron-right", sy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ry = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["line", {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }],
        ["line", {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }]
    ],
    ea = ae("circle-alert", ry);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oy = [
        ["path", {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }],
        ["path", {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }]
    ],
    Xe = ae("circle-check-big", oy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cy = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["path", {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }]
    ],
    m0 = ae("circle-check", cy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uy = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["path", {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }],
        ["path", {
            d: "m9 9 6 6",
            key: "z0biqf"
        }]
    ],
    Oa = ae("circle-x", uy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dy = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["polyline", {
            points: "12 6 12 12 16 14",
            key: "68esgv"
        }]
    ],
    el = ae("clock", dy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fy = [
        ["path", {
            d: "m18 16 4-4-4-4",
            key: "1inbqp"
        }],
        ["path", {
            d: "m6 8-4 4 4 4",
            key: "15zrgr"
        }],
        ["path", {
            d: "m14.5 4-5 16",
            key: "e7oirm"
        }]
    ],
    zm = ae("code-xml", fy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const my = [
        ["rect", {
            width: "16",
            height: "16",
            x: "4",
            y: "4",
            rx: "2",
            key: "14l7u7"
        }],
        ["rect", {
            width: "6",
            height: "6",
            x: "9",
            y: "9",
            rx: "1",
            key: "5aljv4"
        }],
        ["path", {
            d: "M15 2v2",
            key: "13l42r"
        }],
        ["path", {
            d: "M15 20v2",
            key: "15mkzm"
        }],
        ["path", {
            d: "M2 15h2",
            key: "1gxd5l"
        }],
        ["path", {
            d: "M2 9h2",
            key: "1bbxkp"
        }],
        ["path", {
            d: "M20 15h2",
            key: "19e6y8"
        }],
        ["path", {
            d: "M20 9h2",
            key: "19tzq7"
        }],
        ["path", {
            d: "M9 2v2",
            key: "165o2o"
        }],
        ["path", {
            d: "M9 20v2",
            key: "i2bqo8"
        }]
    ],
    Gl = ae("cpu", my);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hy = [
        ["ellipse", {
            cx: "12",
            cy: "5",
            rx: "9",
            ry: "3",
            key: "msslwz"
        }],
        ["path", {
            d: "M3 5V19A9 3 0 0 0 21 19V5",
            key: "1wlel7"
        }],
        ["path", {
            d: "M3 12A9 3 0 0 0 21 12",
            key: "mv7ke4"
        }]
    ],
    gy = ae("database", hy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = [
        ["line", {
            x1: "12",
            x2: "12",
            y1: "2",
            y2: "22",
            key: "7eqyqh"
        }],
        ["path", {
            d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            key: "1b0p4s"
        }]
    ],
    xy = ae("dollar-sign", py);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yy = [
        ["path", {
            d: "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
            key: "159hny"
        }],
        ["path", {
            d: "M17 18h1",
            key: "uldtlt"
        }],
        ["path", {
            d: "M12 18h1",
            key: "s9uhes"
        }],
        ["path", {
            d: "M7 18h1",
            key: "1neino"
        }]
    ],
    by = ae("factory", yy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vy = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["path", {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl"
        }],
        ["path", {
            d: "M2 12h20",
            key: "9i4pu4"
        }]
    ],
    Nc = ae("globe", vy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jy = [
        ["path", {
            d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
            key: "j76jl0"
        }],
        ["path", {
            d: "M22 10v6",
            key: "1lu8f3"
        }],
        ["path", {
            d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
            key: "1r8lef"
        }]
    ],
    bs = ae("graduation-cap", jy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ny = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["path", {
            d: "M12 16v-4",
            key: "1dtifu"
        }],
        ["path", {
            d: "M12 8h.01",
            key: "e9boi3"
        }]
    ],
    wy = ae("info", Ny);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = [
        ["path", {
            d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
            key: "nnexq3"
        }],
        ["path", {
            d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
            key: "mt58a7"
        }]
    ],
    h0 = ae("leaf", Ey);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sy = [
        ["path", {
            d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
            key: "1gvzjb"
        }],
        ["path", {
            d: "M9 18h6",
            key: "x1upvd"
        }],
        ["path", {
            d: "M10 22h4",
            key: "ceow96"
        }]
    ],
    wc = ae("lightbulb", Sy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = [
        ["rect", {
            width: "20",
            height: "16",
            x: "2",
            y: "4",
            rx: "2",
            key: "18n3k1"
        }],
        ["path", {
            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
            key: "1ocrg3"
        }]
    ],
    vs = ae("mail", _y);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ty = [
        ["path", {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }],
        ["circle", {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }]
    ],
    Ec = ae("map-pin", Ty);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ky = [
        ["line", {
            x1: "4",
            x2: "20",
            y1: "12",
            y2: "12",
            key: "1e0a9i"
        }],
        ["line", {
            x1: "4",
            x2: "20",
            y1: "6",
            y2: "6",
            key: "1owob3"
        }],
        ["line", {
            x1: "4",
            x2: "20",
            y1: "18",
            y2: "18",
            key: "yk5zj1"
        }]
    ],
    Ay = ae("menu", ky);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const My = [
        ["path", {
            d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
            key: "131961"
        }],
        ["path", {
            d: "M19 10v2a7 7 0 0 1-14 0v-2",
            key: "1vc78b"
        }],
        ["line", {
            x1: "12",
            x2: "12",
            y1: "19",
            y2: "22",
            key: "x3vr5v"
        }]
    ],
    Cy = ae("mic", My);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ry = [
        ["path", {
            d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
            key: "a7tn18"
        }]
    ],
    Oy = ae("moon", Ry);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
        ["path", {
            d: "M2 6h4",
            key: "aawbzj"
        }],
        ["path", {
            d: "M2 10h4",
            key: "l0bgd4"
        }],
        ["path", {
            d: "M2 14h4",
            key: "1gsvsf"
        }],
        ["path", {
            d: "M2 18h4",
            key: "1bu2t1"
        }],
        ["rect", {
            width: "16",
            height: "20",
            x: "4",
            y: "2",
            rx: "2",
            key: "1nb95v"
        }],
        ["path", {
            d: "M16 2v20",
            key: "rotuqe"
        }]
    ],
    zy = ae("notebook", Dy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = [
        ["path", {
            d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
            key: "nt11vn"
        }],
        ["path", {
            d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
            key: "15qc1e"
        }],
        ["path", {
            d: "m2.3 2.3 7.286 7.286",
            key: "1wuzzi"
        }],
        ["circle", {
            cx: "11",
            cy: "11",
            r: "2",
            key: "xmgehs"
        }]
    ],
    qy = ae("pen-tool", By);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = [
        ["path", {
            d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
            key: "foiqr5"
        }]
    ],
    g0 = ae("phone", Uy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ly = [
        ["polygon", {
            points: "6 3 20 12 6 21 6 3",
            key: "1oa8hb"
        }]
    ],
    Hy = ae("play", Ly);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = [
        ["path", {
            d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
            key: "x6z5xu"
        }],
        ["path", {
            d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
            key: "1x4zh5"
        }],
        ["path", {
            d: "m14 16-3 3 3 3",
            key: "f6jyew"
        }],
        ["path", {
            d: "M8.293 13.596 7.196 9.5 3.1 10.598",
            key: "wf1obh"
        }],
        ["path", {
            d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
            key: "9tzpgr"
        }],
        ["path", {
            d: "m13.378 9.633 4.096 1.098 1.097-4.096",
            key: "1oe83g"
        }]
    ],
    Yy = ae("recycle", Gy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xy = [
        ["path", {
            d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
            key: "m3kijz"
        }],
        ["path", {
            d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
            key: "1fmvmk"
        }],
        ["path", {
            d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
            key: "1f8sc4"
        }],
        ["path", {
            d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
            key: "qeys4"
        }]
    ],
    p0 = ae("rocket", Xy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vy = [
        ["path", {
            d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
            key: "1ffxy3"
        }],
        ["path", {
            d: "m21.854 2.147-10.94 10.939",
            key: "12cjpa"
        }]
    ],
    Qy = ae("send", Vy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zy = [
        ["path", {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
            key: "1qme2f"
        }],
        ["circle", {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }]
    ],
    $y = ae("settings", Zy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = [
        ["path", {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }]
    ],
    Jy = ae("shield", Ky);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wy = [
        ["line", {
            x1: "4",
            x2: "4",
            y1: "21",
            y2: "14",
            key: "1p332r"
        }],
        ["line", {
            x1: "4",
            x2: "4",
            y1: "10",
            y2: "3",
            key: "gb41h5"
        }],
        ["line", {
            x1: "12",
            x2: "12",
            y1: "21",
            y2: "12",
            key: "hf2csr"
        }],
        ["line", {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "3",
            key: "1kfi7u"
        }],
        ["line", {
            x1: "20",
            x2: "20",
            y1: "21",
            y2: "16",
            key: "1lhrwl"
        }],
        ["line", {
            x1: "20",
            x2: "20",
            y1: "12",
            y2: "3",
            key: "16vvfq"
        }],
        ["line", {
            x1: "2",
            x2: "6",
            y1: "14",
            y2: "14",
            key: "1uebub"
        }],
        ["line", {
            x1: "10",
            x2: "14",
            y1: "8",
            y2: "8",
            key: "1yglbp"
        }],
        ["line", {
            x1: "18",
            x2: "22",
            y1: "16",
            y2: "16",
            key: "1jxqpz"
        }]
    ],
    Bm = ae("sliders-vertical", Wy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fy = [
        ["path", {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }]
    ],
    rc = ae("star", Fy);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Py = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "4",
            key: "4exip2"
        }],
        ["path", {
            d: "M12 2v2",
            key: "tus03m"
        }],
        ["path", {
            d: "M12 20v2",
            key: "1lh1kg"
        }],
        ["path", {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }],
        ["path", {
            d: "m17.66 17.66 1.41 1.41",
            key: "ptbguv"
        }],
        ["path", {
            d: "M2 12h2",
            key: "1t8f8n"
        }],
        ["path", {
            d: "M20 12h2",
            key: "1q8mjw"
        }],
        ["path", {
            d: "m6.34 17.66-1.41 1.41",
            key: "1m8zz5"
        }],
        ["path", {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }]
    ],
    Iy = ae("sun", Py);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eb = [
        ["path", {
            d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
            key: "17jzev"
        }]
    ],
    tb = ae("thermometer", eb);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ab = [
        ["path", {
            d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
            key: "975kel"
        }],
        ["circle", {
            cx: "12",
            cy: "7",
            r: "4",
            key: "17ys0d"
        }]
    ],
    qm = ae("user", ab);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lb = [
        ["path", {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }],
        ["circle", {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }],
        ["path", {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }],
        ["path", {
            d: "M16 3.13a4 4 0 0 1 0 7.75",
            key: "1da9ce"
        }]
    ],
    _s = ae("users", lb);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nb = [
        ["path", {
            d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
            key: "cbrjhi"
        }]
    ],
    oc = ae("wrench", nb);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ib = [
        ["path", {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }],
        ["path", {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }]
    ],
    Ts = ae("x", ib);
/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sb = [
        ["path", {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }]
    ],
    rb = ae("zap", sb);

function ob() {
    return n.jsx("div", {
        className: "p-2 rounded-lg bg-purple-900",
        children: n.jsx(Oy, {
            className: "h-5 w-5 text-purple-200"
        })
    })
}
const $n = "/assets/ethronics-CWA0oynF.png",
    Um = [{
        title: "Home",
        href: "/"
    }, {
        title: "Academics",
        href: "/academics"
    }, {
        title: "Research & Development",
        href: "/research-development"
    }, {
        title: "Manufacturing",
        href: "/manufacturing"
    }],
    Lm = [{
        title: "Contact",
        href: "/contact"
    }, {
        title: "Library",
        href: "#"
    }, {
        title: "News & Events",
        href: "#"
    }, {
        title: "Blog",
        href: "#"
    }, {
        title: "About Us",
        href: "/about"
    }];

function cb() {
    const [s, c] = N.useState(!1), [o, u] = N.useState(!1), f = ra(), p = x => f.pathname === x;
    return N.useEffect(() => {
        const x = () => {
            u(window.scrollY > 20)
        };
        return window.addEventListener("scroll", x), () => window.removeEventListener("scroll", x)
    }, []), n.jsx("nav", {
        className: `fixed w-full z-50 transition-all duration-300 ${o||s?"bg-gray-900/90 backdrop-blur-md shadow-lg":"bg-transparent"}`,
        children: n.jsxs("div", {
            className: "mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-[1800px] 2xl:mx-auto",
            children: [n.jsxs("div", {
                className: "hidden md:flex flex-col py-4 relative",
                children: [n.jsx("div", {
                    className: "absolute left-4 top-1/2 -translate-y-1/2",
                    children: n.jsx(aa, {
                        to: "/",
                        className: "text-xl lg:text-2xl font-bold text-white",
                        children: n.jsxs("div", {
                            className: "flex items-center space-x-2",
                            children: [n.jsx("img", {
                                src: $n,
                                alt: "Ethronics Logo",
                                className: "h-8 w-auto lg:h-10 xl:h-12"
                            }), n.jsx("span", {
                                className: "hidden sm:inline",
                                children: "Ethronics"
                            })]
                        })
                    })
                }), n.jsxs("div", {
                    className: "ml-32 lg:ml-40 xl:ml-48",
                    children: [n.jsx("div", {
                        className: "flex justify-end items-center space-x-6 lg:space-x-8 xl:space-x-10 h-10",
                        children: Um.map(x => n.jsx(aa, {
                            to: x.href,
                            className: `text-sm lg:text-base font-medium ${p(x.href)?"text-purple-400":"text-gray-200 hover:text-purple-400"} transition-colors duration-200`,
                            children: x.title
                        }, x.href))
                    }), n.jsx("div", {
                        className: `flex justify-end space-x-4 lg:space-x-6 xl:space-x-8 h-10 border-t pt-2 transition-colors duration-300 ${o?"border-gray-700":"border-white/10"}`,
                        children: Lm.map(x => n.jsx(aa, {
                            to: x.href,
                            className: `text-xs lg:text-sm ${p(x.href)?"text-purple-400":"text-gray-400 hover:text-purple-400"} transition-colors duration-200`,
                            children: x.title
                        }, x.href))
                    })]
                })]
            }), n.jsxs("div", {
                className: "md:hidden flex justify-between items-center h-16",
                children: [n.jsx(aa, {
                    to: "/",
                    className: "text-xl font-bold text-white",
                    children: n.jsxs("div", {
                        className: "flex items-end space-x-2",
                        children: [n.jsx("img", {
                            src: $n,
                            alt: "Ethronics Logo",
                            className: "h-8 w-auto"
                        }), n.jsx("span", {
                            children: "Ethronics"
                        })]
                    })
                }), n.jsx("button", {
                    onClick: () => c(!s),
                    className: "text-gray-200 p-2",
                    "aria-label": s ? "Close menu" : "Open menu",
                    children: s ? n.jsx(Ts, {
                        className: "h-6 w-6"
                    }) : n.jsx(Ay, {
                        className: "h-6 w-6"
                    })
                })]
            }), n.jsxs("div", {
                className: `md:hidden bg-gray-900 transition-all duration-300 ease-in-out ${s?"max-h-[500px] opacity-100":"max-h-0 opacity-0 overflow-hidden"}`,
                children: [n.jsx("div", {
                    className: "px-2 pt-2 pb-3 space-y-1 border-b border-gray-700",
                    children: Um.map(x => n.jsx(aa, {
                        to: x.href,
                        className: `block px-3 py-2 text-base font-medium ${p(x.href)?"text-purple-400":"text-gray-200 hover:text-purple-400"} transition-colors duration-200`,
                        onClick: () => c(!1),
                        children: x.title
                    }, x.href))
                }), n.jsxs("div", {
                    className: "px-2 pt-3 pb-4 space-y-1",
                    children: [Lm.map(x => n.jsx(aa, {
                        to: x.href,
                        className: `block px-3 py-2 text-sm ${p(x.href)?"text-purple-400":"text-gray-400 hover:text-purple-400"} transition-colors duration-200`,
                        onClick: () => c(!1),
                        children: x.title
                    }, x.href)), n.jsx("div", {
                        className: "px-3 py-2",
                        children: n.jsx(ob, {})
                    })]
                })]
            })]
        })
    })
}
const ub = [{
        title: "Home",
        href: "/"
    }, {
        title: "Academics",
        href: "/academics"
    }, {
        title: "Research & Development",
        href: "/research"
    }, {
        title: "Manufacturing",
        href: "/manufacturing"
    }],
    db = [{
        title: "About Us",
        href: "/about"
    }, {
        title: "Careers",
        href: "#"
    }, {
        title: "News",
        href: "#"
    }, {
        title: "Contact",
        href: "/contact"
    }],
    fb = [{
        title: "Blog",
        href: "#"
    }, {
        title: "Resources",
        href: "#"
    }, {
        title: "Support",
        href: "#"
    }, {
        title: "FAQ",
        href: "#"
    }];

function mb() {
    return n.jsx("footer", {
        className: "bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12",
            children: [n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8",
                children: [n.jsxs("div", {
                    className: "space-y-4",
                    children: [n.jsxs("a", {
                        href: "/",
                        className: "flex items-center space-x-2",
                        children: [n.jsx("img", {
                            src: $n,
                            alt: "Ethronics Logo",
                            className: "h-8 sm:h-10 w-auto"
                        }), n.jsx("span", {
                            className: "text-lg sm:text-xl font-bold text-gray-900 dark:text-white",
                            children: "Ethronics"
                        })]
                    }), n.jsx("p", {
                        className: "text-gray-600 dark:text-gray-400 text-sm",
                        children: "Innovating the future through technology and education."
                    })]
                }), n.jsxs("div", {
                    children: [n.jsx("h3", {
                        className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4",
                        children: "Navigation"
                    }), n.jsx("ul", {
                        className: "space-y-2",
                        children: ub.map(s => n.jsx("li", {
                            children: n.jsx("a", {
                                href: s.href,
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm",
                                children: s.title
                            })
                        }, s.href))
                    })]
                }), n.jsxs("div", {
                    children: [n.jsx("h3", {
                        className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4",
                        children: "Company"
                    }), n.jsx("ul", {
                        className: "space-y-2",
                        children: db.map(s => n.jsx("li", {
                            children: n.jsx("a", {
                                href: s.href,
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm",
                                children: s.title
                            })
                        }, s.href))
                    })]
                }), n.jsxs("div", {
                    children: [n.jsx("h3", {
                        className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4",
                        children: "Resources"
                    }), n.jsx("ul", {
                        className: "space-y-2",
                        children: fb.map(s => n.jsx("li", {
                            children: n.jsx("a", {
                                href: s.href,
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm",
                                children: s.title
                            })
                        }, s.href))
                    })]
                })]
            }), n.jsx("div", {
                className: "mt-8 pt-8 border-t border-gray-200 dark:border-gray-800",
                children: n.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8",
                    children: [n.jsxs("div", {
                        children: [n.jsx("h3", {
                            className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4",
                            children: "Contact Us"
                        }), n.jsxs("ul", {
                            className: "space-y-2 text-gray-600 dark:text-gray-400 text-sm",
                            children: [n.jsx("li", {
                                children: "Email: contact@ethronics.org"
                            }), n.jsx("li", {
                                children: "Phone: (251) 978-467-467"
                            }), n.jsx("li", {
                                children: "Address: 9th floor AMG, Mebrat hail, Adama"
                            })]
                        })]
                    }), n.jsxs("div", {
                        children: [n.jsx("h3", {
                            className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4",
                            children: "Follow Us"
                        }), n.jsxs("div", {
                            className: "flex space-x-4",
                            children: [n.jsx("a", {
                                href: "#",
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400",
                                children: n.jsx("svg", {
                                    className: "w-5 sm:w-6 h-5 sm:h-6",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                    })
                                })
                            }), n.jsx("a", {
                                href: "https://et.linkedin.com/company/ethronics",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400",
                                children: n.jsx("svg", {
                                    className: "w-5 sm:w-6 h-5 sm:h-6",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                    })
                                })
                            }), n.jsx("a", {
                                href: "https://github.com/ethronics",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400",
                                children: n.jsx("svg", {
                                    className: "w-5 sm:w-6 h-5 sm:h-6",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        d: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.304-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.241 2.872.118 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                                    })
                                })
                            })]
                        })]
                    })]
                })
            }), n.jsx("div", {
                className: "mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center",
                children: n.jsxs("p", {
                    className: "text-gray-600 dark:text-gray-400 text-sm",
                    children: ["© ", new Date().getFullYear(), " Ethronics. All rights reserved."]
                })
            })]
        })
    })
}
const Pn = ({
    title: s,
    description: c,
    buttons: o,
    bgGradient: u = "from-blue-900/90 via-gray-900/80 to-blue-900/90"
}) => n.jsx("section", {
    className: `py-16 bg-gradient-to-br ${u} text-white`,
    children: n.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [n.jsx("h2", {
            className: "text-3xl md:text-4xl font-bold mb-6",
            children: s
        }), n.jsx("p", {
            className: "text-lg text-purple-100 mb-8 max-w-3xl mx-auto",
            children: c
        }), n.jsx("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: o.map((f, p) => n.jsx("a", {
                href: f.href,
                onClick: f.onClick,
                className: `px-8 py-4 rounded-lg font-semibold transition-colors ${f.primary?"bg-white text-purple-600 hover:bg-purple-50":"bg-purple-700 text-white hover:bg-purple-800"}`,
                children: f.text
            }, p))
        })]
    })
});
oe.createElement(p0, {
    className: "h-6 w-6"
}), oe.createElement(Nc, {
    className: "h-6 w-6"
}), oe.createElement(_s, {
    className: "h-6 w-6"
});
const x0 = [{
        icon: oe.createElement(zy, {
            className: "h-8 w-8"
        }),
        title: "Robotics",
        description: "Developing advanced automation systems to enhance manufacturing efficiency and precision."
    }, {
        icon: oe.createElement(vc, {
            className: "h-8 w-8"
        }),
        title: "AI & ML",
        description: "Creating solutions in speech recognition, computer vision, and automation for real-world impact."
    }, {
        icon: oe.createElement(Jy, {
            className: "h-8 w-8"
        }),
        title: "Cybersecurity",
        description: "Building secure digital frameworks to protect data and systems in an interconnected world."
    }, {
        icon: oe.createElement(Gl, {
            className: "h-8 w-8"
        }),
        title: "Quantum Computing",
        description: "Exploring next-generation processing power to solve complex global problems."
    }, {
        icon: oe.createElement(gy, {
            className: "h-8 w-8"
        }),
        title: "Blockchain",
        description: "Innovating secure, transparent transaction systems for industries worldwide."
    }],
    hb = [{
        title: "Academic Institutions",
        description: "Collaborating with universities to advance tech education and research."
    }, {
        title: "Industry Leaders",
        description: "Partnering with tech giants for real-world applications and innovation."
    }, {
        title: "Local Innovators",
        description: "Working with Ethiopia’s brightest minds to solve local and global challenges."
    }],
    gb = N.memo(({
        feature: s,
        index: c,
        activeIndex: o,
        setActiveIndex: u,
        isMobile: f
    }) => {
        const p = o === c,
            [x, v] = N.useState(!1);
        N.useEffect(() => {
            const y = A => {
                A.key === "Escape" && (u(null), v(!1))
            };
            return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y)
        }, [u]);
        const m = () => {
                u(p ? null : c), p || v(!1)
            },
            g = y => {
                y.stopPropagation(), console.log(`Clicked Learn More for ${s.title}`)
            };
        return n.jsxs(n.Fragment, {
            children: [n.jsxs("div", {
                className: `ethronics-feature-card relative p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 group ${p?"border-4 border-gradient-to-r from-purple-600 to-indigo-600 scale-105 shadow-lg z-10":"hover:border-4 hover:border-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br dark:hover:from-purple-900/50 dark:hover:to-indigo-900/50"}`,
                tabIndex: 0,
                role: "button",
                "aria-label": `Feature: ${s.title}, hover or click for more details`,
                "aria-describedby": `feature-desc-${c}`,
                "aria-expanded": p,
                "aria-controls": `feature-modal-${c}`,
                "aria-selected": p,
                onMouseEnter: () => !f && (v(!0), u(c)),
                onMouseLeave: () => !f && v(!1),
                onFocus: () => !f && u(c),
                onBlur: () => !f && !x && u(null),
                onClick: f ? m : void 0,
                children: [n.jsx("div", {
                    className: "relative mb-3 mx-auto w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full text-white group-hover:animate-pulse",
                    children: oe.cloneElement(s.icon)
                }), n.jsx("h3", {
                    className: "text-base font-bold text-gray-900 dark:text-white mb-2 text-center animate-fade-in",
                    children: s.title
                }), n.jsxs("p", {
                    id: `feature-desc-${c}`,
                    className: "text-sm text-gray-600 dark:text-gray-300 truncate animate-fade-in",
                    children: [s.shortDescription || s.description, "..."]
                })]
            }), n.jsx("div", {
                id: `feature-modal-${c}`,
                className: `fixed top-0 left-0 z-[100] w-full max-w-full h-full lg:max-w-lg lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-2xl lg:h-auto pointer-events-auto transition-all duration-500 ease-out ${p&&(x||f)?"translate-x-0 opacity-100":"translate-x-full opacity-0 lg:translate-x-0 lg:translate-y-full"} backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-t-4 lg:border-4 border-purple-600 shadow-2xl`,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": `Details for ${s.title}`,
                tabIndex: -1,
                onMouseEnter: () => v(!0),
                onMouseLeave: () => {
                    v(!1), f || u(null)
                },
                children: n.jsxs("div", {
                    className: "p-6 sm:p-8 max-w-full pointer-events-auto",
                    children: [n.jsxs("div", {
                        className: "flex items-center mb-6",
                        children: [n.jsx("div", {
                            className: "mr-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full text-white animate-pulse",
                            children: oe.cloneElement(s.icon)
                        }), n.jsx("h4", {
                            className: "text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600",
                            children: s.title
                        }), n.jsx("button", {
                            onClick: () => {
                                u(null), v(!1)
                            },
                            className: "ml-auto p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-purple-500 hover:text-white transition-colors duration-200",
                            "aria-label": "Close modal",
                            children: n.jsx(Ts, {
                                className: "h-6 w-6"
                            })
                        })]
                    }), n.jsx("p", {
                        className: "text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed",
                        children: s.details || `${s.description} Our team is dedicated to advancing this field with innovative solutions tailored to global challenges.`
                    }), n.jsx("a", {
                        href: s.link || `/research/${c}`,
                        className: "inline-block px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400",
                        "aria-label": `Learn more about ${s.title}`,
                        tabIndex: 0,
                        onClick: g,
                        "data-clickable": "true",
                        children: "Learn More"
                    })]
                })
            })]
        })
    }),
    pb = () => {
        const s = N.useRef(null),
            [c, o] = N.useState(null),
            [u, f] = N.useState(!1);
        return N.useEffect(() => {
            const p = () => {
                f(window.innerWidth <= 640 || /Mobi|Android/i.test(navigator.userAgent))
            };
            return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p)
        }, []), N.useEffect(() => {
            const p = new IntersectionObserver(v => {
                    v.forEach(m => {
                        m.isIntersecting && (m.target.querySelectorAll(".ethronics-feature-card").forEach((y, A) => {
                            y.classList.add("ethronics-fade-up"), y.style.animationDelay = `${A*.15}s`
                        }), p.unobserve(m.target))
                    })
                }, {
                    threshold: .2
                }),
                x = s.current;
            return x && p.observe(x), () => {
                x && p.unobserve(x)
            }
        }, []), n.jsxs("section", {
            ref: s,
            className: "py-10 sm:py-12 bg-gray-50 dark:bg-gray-900 max-w-full overflow-x-hidden",
            role: "region",
            "aria-label": "Research and Innovation features",
            children: [n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-10 sm:mb-12",
                    children: [n.jsx("h2", {
                        className: "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                        children: n.jsx("span", {
                            className: "bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-500",
                            children: "Research & Innovation"
                        })
                    }), n.jsx("p", {
                        className: "text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                        children: "At Ethronics, we’re pushing the boundaries of technology through groundbreaking research and development. Our focus spans robotics, AI, cybersecurity, quantum computing, and blockchain—innovations designed to solve real-world problems with Ethiopian ingenuity."
                    })]
                }), n.jsx("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-full",
                    children: x0.map((p, x) => n.jsx(gb, {
                        feature: p,
                        index: x,
                        activeIndex: c,
                        setActiveIndex: o,
                        isMobile: u
                    }, x))
                })]
            }), n.jsx("style", {
                children: `
        @keyframes ethronics-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ethronics-fade-up {
          animation: ethronics-fade-up 0.6s ease-out forwards;
        }
        @keyframes modal-icon-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: modal-icon-pulse 2s infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `
            })]
        })
    },
    xb = "/assets/memorandum-BW4Tf9jE.jpg",
    yb = "/assets/agreed_memorandum-BI6NHFfY.jpg",
    bb = "/assets/joe_conference-3IZA4Mw3.jpg",
    vb = "/assets/CEO-IzCm-iny.jpg",
    jb = "/assets/joe_presentation-qDcMLdVA.png",
    Nb = "/assets/highschool_certificate-ClogWnnI.jpg",
    wb = "/assets/kids_certificate-H-BCaQps.jpg",
    Eb = () => {
        const s = [{
                title: "Memorandum with Arsi University",
                description: "Ethronics signed a memorandum of understanding with Arsi University to collaborate on innovative research and educational programs. This partnership aims to foster advancements in technology and education, bringing together academic expertise and industry innovation to create impactful solutions. Through this collaboration, we are committed to developing new curricula, conducting joint research projects, and providing students with hands-on opportunities to engage with cutting-edge technologies like robotics and AI.",
                images: [xb, yb],
                category: "education"
            }, {
                title: "Robotics in AI: Redefining Human Potential",
                description: "Our CEO presented groundbreaking insights on how robotics in AI is reshaping the future and redefining human potential at the conference. The presentation highlighted the integration of intelligent systems into everyday life, exploring how these technologies can enhance productivity, creativity, and problem-solving across industries. The discussion also covered the ethical implications and the need for inclusive innovation to ensure these advancements benefit society as a whole.",
                images: [vb, "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80"],
                category: "education"
            }, {
                title: "Artificial Perception: Exploring the Senses of Sight and Perception",
                description: "Our CTO shared innovative research on artificial perception, delving into the senses of sight and perception at the conference. This research explores how machines can mimic human sensory capabilities, with a focus on visual processing and cognitive understanding. The presentation included detailed case studies, technical demonstrations, and future applications in fields like autonomous systems, healthcare, and urban planning, showcasing Ethiopia’s growing role in global tech innovation.",
                images: [bb, jb],
                category: "research"
            }, {
                title: "Empowering Future Innovators, summer camp",
                description: "Ethronics is committed to empowering future innovators through hands-on education and training. We believe in nurturing creativity, critical thinking, and problem-solving skills in students. Our programs are designed to inspire the next generation of leaders in technology, equipping them with the knowledge and tools they need to thrive in a rapidly evolving world. By fostering a culture of innovation and collaboration, we aim to create a brighter future for Ethiopia and beyond.",
                images: [Nb, wb],
                category: "education"
            }],
            [c, o] = N.useState(null),
            [u, f] = N.useState(0),
            [p, x] = N.useState(!1),
            v = 320,
            m = Math.floor(window.innerWidth / v) || 1,
            g = () => {
                f(A => Math.min(A + v, 0))
            },
            y = () => {
                const A = -(s.length - m) * v;
                f(C => Math.max(C - v, A))
            };
        return n.jsxs("section", {
            className: "py-20 bg-white dark:bg-gray-800",
            children: [n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-16",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                        children: "Our Journey in Pictures"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                        children: "Explore the moments that define Ethronics—where education inspires, research innovates, and manufacturing transforms."
                    })]
                }), n.jsx("div", {
                    className: "hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8",
                    children: s.map((A, C) => n.jsxs("div", {
                        className: "relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer",
                        onClick: () => o(A),
                        children: [n.jsxs("div", {
                            className: "relative grid grid-cols-2 gap-1 p-2 h-64 overflow-hidden group",
                            children: [A.images.map((G, O) => n.jsxs("div", {
                                className: "relative",
                                children: [n.jsx("img", {
                                    src: G,
                                    alt: `${A.title} - ${O+1}`,
                                    className: "w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                                }), n.jsx("div", {
                                    className: "absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2",
                                    children: n.jsx("p", {
                                        className: "text-xs text-white text-center line-clamp-3",
                                        children: A.description
                                    })
                                })]
                            }, O)), n.jsx("span", {
                                className: "absolute top-2 right-2 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10",
                                children: A.category.charAt(0).toUpperCase() + A.category.slice(1)
                            })]
                        }), n.jsx("div", {
                            className: "p-4",
                            children: n.jsx("h3", {
                                className: "text-lg font-semibold text-gray-900 dark:text-white",
                                children: A.title
                            })
                        })]
                    }, C))
                }), n.jsxs("div", {
                    className: "md:hidden relative",
                    children: [n.jsx("button", {
                        onClick: g,
                        className: "absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 disabled:opacity-50",
                        disabled: u === 0,
                        children: n.jsx(d0, {
                            className: "h-6 w-6"
                        })
                    }), n.jsx("div", {
                        className: "overflow-x-hidden",
                        children: n.jsx("div", {
                            className: "flex gap-4 transition-transform duration-300 ease-in-out",
                            style: {
                                transform: `translateX(${u}px)`
                            },
                            children: s.map((A, C) => n.jsxs("div", {
                                className: "w-80 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg",
                                onClick: () => o(A),
                                children: [n.jsx("div", {
                                    className: "grid grid-cols-2 gap-1 p-2 h-56 overflow-hidden hover:text-underline",
                                    children: A.images.map((G, O) => n.jsx("img", {
                                        src: G,
                                        alt: `${A.title} - ${O+1}`,
                                        className: "w-full h-full object-cover rounded-md"
                                    }, O))
                                }), n.jsxs("div", {
                                    className: "p-4 relative",
                                    children: [n.jsx("h3", {
                                        className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
                                        children: A.title
                                    }), n.jsx("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-300 line-clamp-3",
                                        children: A.description
                                    }), n.jsx("span", {
                                        className: "absolute top-2 right-2 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full",
                                        children: A.category.charAt(0).toUpperCase() + A.category.slice(1)
                                    })]
                                })]
                            }, C))
                        })
                    }), n.jsx("button", {
                        onClick: y,
                        className: "absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 disabled:opacity-50",
                        disabled: u <= -(s.length - m) * v,
                        children: n.jsx(f0, {
                            className: "h-6 w-6"
                        })
                    })]
                })]
            }), c && n.jsx("div", {
                className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4",
                onClick: () => o(null),
                children: n.jsxs("div", {
                    className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto",
                    onClick: A => A.stopPropagation(),
                    children: [n.jsx("button", {
                        className: "absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                        onClick: () => o(null),
                        children: n.jsx(Ts, {
                            className: "w-6 h-6"
                        })
                    }), n.jsx("h3", {
                        className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
                        children: c.title
                    }), n.jsx("div", {
                        className: "grid grid-cols-2 gap-2 mb-4",
                        children: c.images.map((A, C) => n.jsx("img", {
                            src: A,
                            alt: `${c.title} - ${C+1}`,
                            className: "w-full h-40 object-cover rounded-lg"
                        }, C))
                    }), n.jsxs("div", {
                        className: "mb-4",
                        children: [n.jsx("p", {
                            className: `text-gray-600 dark:text-gray-300 transition-all duration-300 ${p?"max-h-none":"max-h-20 overflow-hidden"}`,
                            children: c.description
                        }), c.description.length > 150 && n.jsx("button", {
                            onClick: () => x(!p),
                            className: "mt-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-right float-right",
                            children: p ? "Show Less" : "Show More"
                        })]
                    }), n.jsx("span", {
                        className: "inline-block bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full",
                        children: c.category.charAt(0).toUpperCase() + c.category.slice(1)
                    })]
                })
            })]
        })
    };

function ks({
    slides: s,
    buttons: c = [],
    className: o = ""
}) {
    const [u, f] = N.useState(0), [p, x] = N.useState(!0);
    N.useEffect(() => {
        if (!p) return;
        const g = setInterval(() => {
            f(y => (y + 1) % s.length)
        }, 6e3);
        return () => clearInterval(g)
    }, [s.length, p]);
    const v = N.useCallback(() => {
            f(g => (g + 1) % s.length), x(!1)
        }, [s.length]),
        m = N.useCallback(() => {
            f(g => (g - 1 + s.length) % s.length), x(!1)
        }, [s.length]);
    return n.jsxs("div", {
        className: `relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black ${o}`,
        children: [n.jsxs("div", {
            className: "absolute inset-0 z-0",
            children: [n.jsx("div", {
                className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",
                style: {
                    maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)"
                }
            }), n.jsx("div", {
                className: "absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-blob mix-blend-screen"
            }), n.jsx("div", {
                className: "absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-screen"
            }), n.jsx("div", {
                className: "absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[128px] animate-blob animation-delay-4000 mix-blend-screen"
            })]
        }), n.jsxs("div", {
            className: "relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            children: [n.jsxs("div", {
                className: "flex flex-col justify-center space-y-8",
                children: [n.jsxs("div", {
                    className: "space-y-6",
                    children: [n.jsxs("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit animate-fade-in",
                        children: [n.jsx("span", {
                            className: "flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"
                        }), n.jsx("span", {
                            className: "text-xs font-medium text-cyan-100 tracking-wide uppercase",
                            children: "New Collection"
                        })]
                    }), n.jsx("h1", {
                        className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 leading-[1.1] animate-fade-in-up",
                        children: s[u].title
                    }), n.jsx("p", {
                        className: "text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed animate-fade-in-up animation-delay-100",
                        children: s[u].description
                    })]
                }), c.length > 0 && n.jsx("div", {
                    className: "flex flex-wrap gap-4 animate-fade-in-up animation-delay-200",
                    children: c.map((g, y) => n.jsxs("a", {
                        href: g.href,
                        className: `group relative px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${g.primary?"bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]":"bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md"}`,
                        children: [g.text, g.primary && n.jsx(u0, {
                            className: "w-4 h-4 transition-transform group-hover:translate-x-1"
                        })]
                    }, y))
                }), n.jsx("div", {
                    className: "flex items-center gap-4 pt-8 animate-fade-in-up animation-delay-300",
                    children: s.map((g, y) => n.jsx("button", {
                        onClick: () => {
                            f(y), x(!1)
                        },
                        className: "group relative h-1 flex-1 max-w-[60px] bg-white/10 rounded-full overflow-hidden transition-all hover:bg-white/20",
                        "aria-label": `Go to slide ${y+1}`,
                        children: n.jsx("div", {
                            className: `absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ease-out ${y===u?"w-full opacity-100":"w-0 opacity-0"}`
                        })
                    }, y))
                })]
            }), n.jsx("div", {
                className: "relative flex justify-center lg:justify-end items-center perspective-1000",
                children: n.jsxs("div", {
                    className: "relative w-full max-w-lg aspect-square lg:aspect-[4/5] flex items-center justify-center",
                    children: [n.jsx("div", {
                        className: `absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[80px] transition-opacity duration-700 ${p?"opacity-100":"opacity-50"}`
                    }), s.map((g, y) => n.jsx("img", {
                        src: g.image,
                        alt: "",
                        className: `absolute w-full h-full object-contain transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${y===u?"opacity-100 translate-y-0 scale-100 rotate-0 blur-0":"opacity-0 translate-y-12 scale-95 rotate-3 blur-sm"} animate-float`,
                        style: {
                            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))"
                        }
                    }, y))]
                })
            })]
        }), n.jsxs("div", {
            className: "absolute bottom-8 right-8 flex gap-2 z-20",
            children: [n.jsx("button", {
                onClick: m,
                className: "p-3 rounded-full border border-white/10 bg-black/20 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95",
                "aria-label": "Previous slide",
                children: n.jsx(d0, {
                    className: "w-5 h-5"
                })
            }), n.jsx("button", {
                onClick: v,
                className: "p-3 rounded-full border border-white/10 bg-black/20 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95",
                "aria-label": "Next slide",
                children: n.jsx(f0, {
                    className: "w-5 h-5"
                })
            })]
        }), n.jsx("style", {
            children: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
      `
        })]
    })
}
const Sb = () => n.jsx("section", {
        className: "mb-16 bg-gray-50 dark:bg-gray-900",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsxs("div", {
                className: "text-center mb-16",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                    children: "Our Partnerships"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                    children: "Collaboration drives our success. Ethronics is forging powerful partnerships with academic institutions, industry leaders, and local innovators to amplify our impact and bring transformative technology to life."
                })]
            }), n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                children: hb.map((s, c) => n.jsxs("div", {
                    className: "bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all",
                    children: [n.jsx("h3", {
                        className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
                        children: s.title
                    }), n.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-300",
                        children: s.description
                    })]
                }, c))
            })]
        })
    }),
    _b = "/assets/tvet-BNPvddQq.jpg",
    Tb = "/assets/undergrad-DPtNxD2n.jpg",
    kb = "/assets/postgrad-CcZrrGEe.jpg",
    Ab = "/assets/training-xgzfTKXW.jpg",
    Mb = "/assets/bootcamp-4gbqmUw9.jpg",
    Cb = "/assets/ai-curriculum-DbYJIUnh.jpg",
    Rb = "/assets/mentor-Cib0Zqml.jpg",
    Ob = "/assets/scholarship-BmBDMus7.jpg",
    y0 = "/assets/smart-gate-BuGtJWux.jpg",
    ac = {
        education: [{
            title: "Robotics Bootcamp",
            description: "Dive into automation with hands-on robotics skills.",
            image: Mb,
            action: {
                text: "Join Now",
                href: "/contact"
            }
        }, {
            title: "AI Curriculum",
            description: "Learn machine learning and data science.",
            image: Cb,
            action: {
                text: "Explore Courses",
                href: "/academics/#programs"
            }
        }, {
            title: "Student Mentorship",
            description: "Get guidance from industry experts.",
            image: Rb,
            action: {
                text: "Apply for Mentorship",
                href: "/contact"
            }
        }, {
            title: "Tech Scholarships",
            description: "Funding for tech education.",
            image: Ob,
            action: {
                text: "Apply Now",
                href: "/contact"
            }
        }, {
            title: "TVET Programs",
            description: "Practical skills in robotics and AI.",
            image: _b,
            action: {
                text: "Learn More",
                href: "/academics"
            }
        }, {
            title: "Undergraduate Programs",
            description: "Foundation in tech and innovation.",
            image: Tb,
            action: {
                text: "Explore Programs",
                href: "/academics"
            }
        }, {
            title: "Postgraduate Studies",
            description: "Advance your tech expertise.",
            image: kb,
            action: {
                text: "Apply Now",
                href: "/academics"
            }
        }, {
            title: "Professional Training",
            description: "Upskill in AI and robotics.",
            image: Ab,
            action: {
                text: "Get Trained",
                href: "/academics"
            }
        }],
        manufacturing: [{
            title: "Gate Barrier Tech",
            description: "Automated access control for security.",
            image: y0,
            action: {
                text: "Request Demo",
                href: "/contact"
            }
        }, {
            title: "Smart Factory Systems",
            description: "IoT-enabled manufacturing solutions.",
            image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Learn More",
                href: "/manufacturing"
            }
        }],
        globalTech: [{
            title: "Blockchain Platforms",
            description: "Secure transaction systems.",
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Discover More",
                href: "/contact"
            }
        }, {
            title: "AI Traffic Control",
            description: "Optimize urban traffic flow.",
            image: "https://images.unsplash.com/photo-1584649525122-8d6895492a5d?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Learn How",
                href: "/contact"
            }
        }, {
            title: "Quantum Research",
            description: "Next-gen computing solutions.",
            image: "https://images.unsplash.com/photo-1591306208574-969f12f1ebfe?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Join Research",
                href: "/contact"
            }
        }, {
            title: "Cybersecurity Innovations",
            description: "Advanced data protection.",
            image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Explore Solutions",
                href: "/contact"
            }
        }, {
            title: "Global Tech Partnerships",
            description: "Collaborate for innovation.",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=60",
            action: {
                text: "Partner With Us",
                href: "/contact"
            }
        }]
    },
    Db = [{
        title: "Education",
        key: "education",
        solutions: ac.education,
        description: "Empowering Ethiopia’s youth with cutting-edge skills in robotics, AI, and technology to lead globally."
    }, {
        title: "Research & Development",
        key: "globalTech",
        solutions: ac.globalTech,
        description: "Developing scalable technologies from Ethiopia to address global challenges."
    }, {
        title: "Manufacturing",
        key: "manufacturing",
        solutions: ac.manufacturing,
        description: "Revolutionizing production with smart, IoT-driven solutions for Ethiopia’s industrial future."
    }],
    zb = () => {
        const s = ({
                solution: o
            }) => n.jsxs("div", {
                className: "w-72 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 snap-start",
                children: [n.jsx("img", {
                    src: o.image,
                    alt: o.title,
                    className: "w-full h-48 object-cover rounded-t-xl"
                }), n.jsxs("div", {
                    className: "p-6",
                    children: [n.jsx("h4", {
                        className: "text-xl font-semibold text-gray-900 dark:text-white mb-3",
                        children: o.title
                    }), n.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed",
                        children: o.description
                    }), n.jsx("a", {
                        href: o.action.href,
                        className: "inline-block px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm font-medium",
                        children: o.action.text
                    })]
                })]
            }),
            c = ({
                section: o
            }) => {
                const u = N.useRef(null),
                    [f, p] = N.useState(!1),
                    [x, v] = N.useState(0),
                    [m, g] = N.useState(0),
                    [y, A] = N.useState(0),
                    C = 288,
                    G = 1,
                    O = K => {
                        if (u.current) {
                            const $ = K * C;
                            u.current.scrollTo({
                                left: $,
                                behavior: "smooth"
                            }), g($), A(K)
                        }
                    },
                    V = () => {
                        if (u.current) {
                            const K = u.current.scrollLeft,
                                $ = Math.round(K / C);
                            A($), g(K)
                        }
                    },
                    E = () => {
                        const K = Math.max(y - 1, 0);
                        O(K)
                    },
                    D = () => {
                        const K = Math.min(y + 1, o.solutions.length - G);
                        O(K)
                    },
                    L = K => {
                        p(!0), v(K.touches[0].pageX - m)
                    },
                    q = K => {
                        if (!f) return;
                        const P = (K.touches[0].pageX - x) * 2;
                        u.current && (u.current.scrollLeft = m - P)
                    },
                    X = () => {
                        p(!1), u.current && (g(u.current.scrollLeft), V())
                    };
                N.useEffect(() => {
                    const K = u.current;
                    if (K) return K.addEventListener("scroll", V), () => K.removeEventListener("scroll", V)
                }, []);
                const z = (y + G) / o.solutions.length * 100;
                return n.jsxs("div", {
                    className: "mb-12",
                    children: [n.jsxs("div", {
                        className: "px-4 sm:px-6 lg:px-8 mb-6",
                        children: [n.jsx("h3", {
                            className: "text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2",
                            children: o.title
                        }), n.jsxs("div", {
                            className: "flex justify-between items-center",
                            children: [n.jsx("p", {
                                className: "text-base text-gray-600 dark:text-gray-300 max-w-2xl",
                                children: o.description
                            }), n.jsxs("div", {
                                className: "flex gap-2",
                                children: [n.jsx("button", {
                                    onClick: E,
                                    disabled: y === 0,
                                    className: "p-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50",
                                    "aria-label": "Previous solution",
                                    children: n.jsx("svg", {
                                        className: "h-5 w-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: n.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M15 19l-7-7 7-7"
                                        })
                                    })
                                }), n.jsx("button", {
                                    onClick: D,
                                    disabled: y >= o.solutions.length - G,
                                    className: "p-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50",
                                    "aria-label": "Next solution",
                                    children: n.jsx("svg", {
                                        className: "h-5 w-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: n.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M9 5l7 7-7 7"
                                        })
                                    })
                                })]
                            })]
                        })]
                    }), n.jsx("div", {
                        ref: u,
                        className: "flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-8 no-scrollbar",
                        onTouchStart: L,
                        onTouchMove: q,
                        onTouchEnd: X,
                        children: o.solutions.map((K, $) => n.jsx(s, {
                            solution: K
                        }, $))
                    }), n.jsx("div", {
                        className: "flex justify-center mt-4 px-4 sm:px-6 lg:px-8",
                        children: n.jsx("div", {
                            className: "w-full max-w-md h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden",
                            children: n.jsx("div", {
                                className: "h-full bg-purple-600 transition-all duration-300",
                                style: {
                                    width: `${z}%`
                                }
                            })
                        })
                    })]
                })
            };
        return n.jsx("section", {
            className: "py-16 bg-gray-50 dark:bg-gray-900",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-16",
                    children: [n.jsxs("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                        children: [n.jsx("span", {
                            className: "bg-clip-text text-transparent bg-purple-600",
                            children: "Solutions"
                        }), " ", "We’re Building"]
                    }), n.jsx("p", {
                        className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                        children: "Ethronics is pioneering transformative solutions across education, manufacturing, and global technology, rooted in Ethiopian innovation for worldwide impact."
                    })]
                }), Db.map(o => n.jsx(c, {
                    section: o
                }, o.key))]
            })
        })
    },
    Bb = "/assets/Robot-replace-D--cWneY.jpg",
    qb = [{
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block mb-2 sm:mb-3 lg:mb-4 text-white",
                children: "A technology that is"
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-400 to-purple-400 mb-2 sm:mb-3 lg:mb-4",
                children: "taught, researched, made, and perfected"
            }), n.jsx("span", {
                className: "block text-white",
                children: "in Ethiopia and Applied worldwide"
            })]
        }),
        description: "Empowering the next generation of innovators and leaders through cutting-edge education, research, and manufacturing excellence.",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80 1920w, https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80 3840w"
    }, {
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block mb-2 sm:mb-3 lg:mb-4 text-white",
                children: "Pioneering the Future of"
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-400 to-purple-400 mb-2 sm:mb-3 lg:mb-4",
                children: "Technology Education"
            }), n.jsx("span", {
                className: "block text-white",
                children: "in Africa"
            })]
        }),
        description: "Join us in shaping tomorrow's technological landscape through innovative learning and hands-on experience.",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80 1920w, https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80 3840w"
    }, {
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block mb-2 sm:mb-3 lg:mb-4 text-white",
                children: "Building Tomorrow's"
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-400 to-purple-400 mb-2 sm:mb-3 lg:mb-4",
                children: "Technology Leaders"
            }), n.jsx("span", {
                className: "block text-white",
                children: "Today"
            })]
        }),
        description: "Experience world-class education and research opportunities in robotics, AI, and advanced manufacturing.",
        image: Bb
    }],
    Ub = [{
        text: "Join Summer Training",
        href: "/register#register",
        primary: !0
    }, {
        text: "Explore Programs",
        href: "/academics",
        primary: !1
    }, {
        text: "View Research",
        href: "/research-development",
        primary: !1
    }],
    Lb = ({
        onNavigate: s
    }) => {
        const [c, o] = N.useState(!1), [u, f] = N.useState(!1);
        return N.useEffect(() => {
            const p = () => {
                o(!0), f(!0), setTimeout(() => f(!1), 500), setTimeout(() => o(!1), 4e3)
            };
            p();
            const x = setInterval(p, 6e3);
            return () => clearInterval(x)
        }, []), n.jsxs("div", {
            className: `fixed top-1/2 right-0 transform -translate-y-1/2 w-80 sm:w-64 bg-gradient-to-br from-blue-900/95 to-indigo-900/95 text-white p-6 sm:p-4 rounded-l-2xl shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-500 z-50 ${c?"translate-x-0 opacity-100":"translate-x-full opacity-0"}`,
            role: "alert",
            "aria-label": "Summer Robotics Training Promotion",
            children: [u && n.jsx("div", {
                className: "absolute top-0 left-0 w-full h-full pointer-events-none",
                children: [...Array(10)].map((p, x) => n.jsx("div", {
                    className: "absolute w-2 h-2 rounded-full",
                    style: {
                        background: x % 2 === 0 ? "#00f7ff" : "#a855f7",
                        top: "50%",
                        left: "50%",
                        animation: "explode 0.5s ease-out forwards",
                        transform: `translate(${(Math.random()-.5)*50}px, ${(Math.random()-.5)*50}px)`
                    }
                }, x))
            }), n.jsx("h3", {
                className: "text-xl sm:text-lg font-extrabold text-cyan-100 mb-2 animate-pulse",
                children: "Join the Robotic Engineering and AI Training!"
            }), n.jsx("p", {
                className: "text-sm sm:text-xs text-cyan-200 mb-4",
                children: "Build robots and code the future in our Summer Training for 4th-12th graders!"
            }), n.jsx("a", {
                href: "/register#register",
                onClick: s,
                className: "block px-4 py-2 text-center font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 transition-all duration-300",
                "aria-label": "Register for Summer Robotics Training",
                children: "Register Now"
            })]
        })
    };

function Hb() {
    N.useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const s = () => {
        window.location.href = "/register#register"
    };
    return n.jsxs("div", {
        className: "min-h-screen bg-gray-50 dark:bg-gray-900 max-w-full overflow-x-hidden",
        children: [n.jsx(Lb, {
            onNavigate: s
        }), n.jsx(ks, {
            slides: qb,
            buttons: Ub,
            className: "w-full max-w-full overflow-x-hidden"
        }), n.jsx(pb, {}), n.jsx(zb, {}), n.jsx(Sb, {}), n.jsx(Eb, {}), n.jsx(Pn, {
            title: "Join the Robotics Revolution",
            description: "Ready to build robots and code the future? Sign up for our Summer Robotics & Autonomous Systems Training for 4th-12th graders. Or explore other ways to engage with Ethronics’ cutting-edge programs and research.",
            buttons: [{
                text: "Register for Summer Training",
                href: "/register#register",
                primary: !0
            }, {
                text: "Explore Opportunities",
                href: "/academics"
            }]
        }), n.jsx("style", {
            children: `
        @keyframes pop-in {
          0% {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }
        @keyframes pop-out {
          0% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
        }
        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(${(Math.random()-.5)*100}px, ${(Math.random()-.5)*100}px) scale(0);
          }
        }
      `
        })]
    })
}
const Gb = "/assets/smart-bin-BzFnntvB.jpg",
    Yb = "/assets/smart-traffic-CeahBQGV.jpg";

function Xb({
    targetProgress: s,
    isVisible: c
}) {
    const [o, u] = N.useState(0), [f, p] = N.useState(!1);
    return N.useEffect(() => {
        if (c) {
            u(0), p(!1);
            const x = s / 100,
                v = setInterval(() => {
                    u(m => m < s ? Math.min(m + x, s) : (p(!0), clearInterval(v), m))
                }, 20);
            return () => clearInterval(v)
        }
    }, [c, s]), n.jsxs("div", {
        className: "w-full",
        children: [n.jsx("div", {
            className: "bg-gray-700 rounded-full h-2.5",
            children: n.jsx("div", {
                className: "bg-purple-600 h-2.5 rounded-full transition-all duration-200",
                style: {
                    width: `${o}%`
                }
            })
        }), f && n.jsxs("p", {
            className: "text-white mt-1 text-center",
            children: [s, "% Complete"]
        })]
    })
}
const Vb = [{
    name: "Smart Gate",
    description: "IoT security system.",
    image: y0,
    progress: 90
}, {
    name: "Smart Bin",
    description: "IoT waste management system.",
    image: Gb,
    progress: 45
}, {
    name: "Smart Traffic",
    description: "IoT traffic lighting system.",
    image: Yb,
    progress: 70
}];

function Qb() {
    const [s, c] = N.useState(null);
    return n.jsx("section", {
        className: "py-8 bg-gray-900",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsx("h2", {
                className: "text-3xl font-bold text-white text-center mb-12",
                children: "Our Products"
            }), n.jsxs("p", {
                className: "text-lg text-center mb-8 dark:text-gray-400",
                children: [n.jsx("span", {
                    className: "dark:text-gray-500"
                }), "Explore our", " ", n.jsx("span", {
                    className: "text-purple-500 font-semibold dark:text-purple-400",
                    children: "innovative products"
                }), " ", "designed to make life smarter and more efficient. These are the projects we are currently undertaking, but if you have something specific in mind, our engineers are ready to", " ", n.jsx("span", {
                    className: "text-purple-500 font-semibold dark:text-purple-400",
                    children: "bring your vision to life"
                }), "."]
            }), n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                children: Vb.map((o, u) => n.jsxs("div", {
                    className: "group relative overflow-hidden rounded-lg",
                    onMouseEnter: () => c(u),
                    onMouseLeave: () => c(null),
                    children: [n.jsx("img", {
                        src: o.image,
                        alt: o.name,
                        className: "w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    }), n.jsxs("div", {
                        className: "absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        children: [n.jsx("h3", {
                            className: "text-xl font-semibold text-white",
                            children: o.name
                        }), o.progress !== void 0 ? n.jsxs("div", {
                            className: "text-center",
                            children: [n.jsx("p", {
                                className: "text-gray-300",
                                children: "In Development"
                            }), n.jsx("div", {
                                className: "mt-2",
                                children: n.jsx(Xb, {
                                    targetProgress: o.progress,
                                    isVisible: s === u
                                })
                            })]
                        }) : n.jsxs("div", {
                            className: "flex flex-col gap-2",
                            children: [n.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [n.jsx(Xe, {
                                    className: "text-green-400 h-5 w-5"
                                }), n.jsx("p", {
                                    className: "w-full text-gray-300 line-clamp-2 leading-normal",
                                    children: o.description
                                })]
                            }), n.jsx("a", {
                                href: "/contact",
                                className: "inline-block px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors",
                                children: "Reach Out"
                            })]
                        })]
                    })]
                }, u))
            })]
        })
    })
}
const Zb = [{
    icon: n.jsx(h0, {
        className: "h-10 w-10"
    }),
    title: "Eco-Friendly Materials",
    description: "Using sustainable resources."
}, {
    icon: n.jsx(Yy, {
        className: "h-10 w-10"
    }),
    title: "Waste Reduction",
    description: "Efficient processes to minimize waste."
}, {
    icon: n.jsx(Iy, {
        className: "h-10 w-10"
    }),
    title: "Renewable Energy",
    description: "Solar-powered facilities."
}];

function $b() {
    return n.jsxs("section", {
        className: "relative h-auto py-12 px-4 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900",
        children: [n.jsx("div", {
            className: "absolute inset-0 bg-gray-900 bg-opacity-70"
        }), n.jsxs("div", {
            className: "relative z-10 text-center",
            children: [n.jsx("h2", {
                className: "text-3xl  font-bold text-white mb-4 sm:mb-6",
                children: "Committed to Sustainability"
            }), n.jsx("p", {
                className: "text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto",
                children: "Eco-friendly practices that protect our planet and ensure a better future."
            }), n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto",
                children: Zb.map((s, c) => n.jsxs("div", {
                    className: "bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300",
                    children: [n.jsx("div", {
                        className: "flex items-center justify-center text-green-400 mb-3 sm:mb-4",
                        children: s.icon
                    }), n.jsx("h3", {
                        className: "text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2",
                        children: s.title
                    }), n.jsx("p", {
                        className: "text-sm text-gray-300",
                        children: s.description
                    })]
                }, c))
            })]
        })]
    })
}
const Kb = [{
        icon: n.jsx($y, {
            className: "h-6 w-6"
        }),
        title: "Local Innovation",
        description: "Developing solutions tailored for Ethiopian markets",
        details: ["Ethiopian-designed automation systems", "Locally optimized production methods", "Market-specific adaptations"]
    }, {
        icon: n.jsx(qy, {
            className: "h-6 w-6"
        }),
        title: "Precision Work",
        description: "Quality manufacturing with growing capabilities",
        details: ["Computer-aided design", "Modern assembly techniques", "Quality testing facilities"]
    }, {
        icon: n.jsx(_s, {
            className: "h-6 w-6"
        }),
        title: "Local Talent",
        description: "Creating opportunities for Ethiopian engineers and technicians",
        details: ["Technical training programs", "University partnerships", "Skills development initiatives"]
    }, {
        icon: n.jsx(h0, {
            className: "h-6 w-6"
        }),
        title: "Sustainable Practice",
        description: "Environmentally conscious manufacturing processes",
        details: ["Renewable energy usage", "Waste reduction programs", "Local material sourcing"]
    }, {
        icon: n.jsx(wc, {
            className: "h-6 w-6"
        }),
        title: "Innovation Hub",
        description: "Fostering technological advancement in Ethiopia",
        details: ["R&D hub", "Prototype development", "Technology adaptation"]
    }],
    Jb = [{
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block",
                children: "Manufacturing "
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400",
                children: "Excellence"
            }), n.jsx("span", {
                className: "block",
                children: "from Ethiopia"
            })]
        }),
        description: "Delivering world-class products through innovative manufacturing techniques.",
        image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFudWZhY3R1cmV8ZW58MHx8MHx8fDA%3D"
    }, {
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block",
                children: "Innovating "
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400",
                children: "Manufacturing"
            }), n.jsx("span", {
                className: "block",
                children: "in Ethiopia"
            })]
        }),
        description: "Transforming local manufacturing through cutting-edge technology and skilled workforce.",
        image: "https://images.unsplash.com/photo-1640517526259-8e5aacbebf71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FyZWhvdXNlJTIwZHJvbmVzfGVufDB8fDB8fHww"
    }, {
        title: n.jsxs(n.Fragment, {
            children: [n.jsx("span", {
                className: "block",
                children: "Pioneering "
            }), n.jsx("span", {
                className: "block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400",
                children: "Smart Production"
            }), n.jsx("span", {
                className: "block",
                children: "in Africa"
            })]
        }),
        description: "Harnessing automation and technology for scalable, efficient manufacturing.",
        image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFudWZhY3R1cmV8ZW58MHx8MHx8fDA%3D"
    }],
    Wb = [{
        text: "Discover Capabilities",
        href: "#capabilities",
        primary: !0
    }];

function Fb() {
    return N.useEffect(() => {
        window.scrollTo(0, 0)
    }, []), n.jsxs("div", {
        className: "min-h-screen bg-gray-50 dark:bg-gray-900 ",
        children: [n.jsx(ks, {
            slides: Jb,
            buttons: Wb
        }), n.jsxs("div", {
            className: "bg-gray-900 p-24",
            children: [n.jsx("h2", {
                className: "text-3xl font-bold text-center text-white mb-12",
                children: "Why Choose Our Manufacturing?"
            }), n.jsx("p", {
                className: "text-lg text-gray-400 text-center mb-8",
                children: "Our manufacturing facility combines cutting-edge technology, local expertise, and sustainable practices to deliver exceptional products tailored for the Ethiopian market and beyond."
            }), n.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                children: Kb.map((s, c) => n.jsxs("div", {
                    className: "group bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden",
                    children: [n.jsx("div", {
                        className: "h-2 bg-gradient-to-r from-purple-500 to-indigo-500"
                    }), n.jsxs("div", {
                        className: "p-6",
                        children: [n.jsxs("div", {
                            className: "flex items-center mb-4",
                            children: [n.jsx("div", {
                                className: "p-2 bg-purple-100 dark:bg-purple-900 rounded-lg",
                                children: s.icon
                            }), n.jsx("h3", {
                                className: "ml-3 text-xl font-semibold text-gray-900 dark:text-white",
                                children: s.title
                            })]
                        }), n.jsx("p", {
                            className: "text-gray-600 dark:text-gray-300 mb-4",
                            children: s.description
                        }), n.jsx("ul", {
                            className: "space-y-2",
                            children: s.details.map((o, u) => n.jsxs("li", {
                                className: "flex items-center text-sm text-gray-600 dark:text-gray-300",
                                children: [n.jsx("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"
                                }), o]
                            }, u))
                        })]
                    })]
                }, c))
            })]
        }), n.jsx(Qb, {}), n.jsx($b, {}), n.jsx(Pn, {
            title: "Ready to Innovate?",
            description: "Contact us to explore our manufacturing solutions.",
            buttons: [{
                text: "Get in Touch",
                href: "/contact",
                primary: !0
            }]
        })]
    })
}
const Pb = [{
        icon: n.jsx(ic, {
            className: "h-6 w-6"
        }),
        title: "Excellence in Education",
        description: "Our curriculum is designed by global experts to meet international standards while addressing Ethiopia’s unique needs."
    }, {
        icon: n.jsx(Ec, {
            className: "h-6 w-6"
        }),
        title: "Strategic Location",
        description: "Our campus is positioned to connect you to Ethiopia’s growing tech ecosystem."
    }, {
        icon: n.jsx(Nc, {
            className: "h-6 w-6"
        }),
        title: "Global Perspective",
        description: "Partnerships with leading universities worldwide bring a global outlook to your education."
    }, {
        icon: n.jsx(Px, {
            className: "h-6 w-6"
        }),
        title: "Career Readiness",
        description: "Our programs equip you with skills that employers and innovators demand."
    }],
    Ib = () => n.jsx("section", {
        className: "py-16 bg-gray-50 dark:bg-gray-900",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsxs("div", {
                className: "text-center mb-16",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                    children: "Why Choose Us?"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                    children: "At the heart of Ethiopia’s technological renaissance, we’re crafting an institution that doesn’t just educate but inspires. Here’s why we stand out:"
                })]
            }), n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
                children: Pb.map((s, c) => n.jsxs("div", {
                    className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all",
                    children: [n.jsx("div", {
                        className: "flex justify-center mb-4",
                        children: n.jsx("div", {
                            className: "p-3 bg-purple-100 dark:bg-purple-900 rounded-lg",
                            children: s.icon
                        })
                    }), n.jsx("h3", {
                        className: "text-lg font-semibold text-gray-900 dark:text-white text-center mb-2",
                        children: s.title
                    }), n.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-300 text-center",
                        children: s.description
                    })]
                }, c))
            })]
        })
    }),
    e1 = [{
        step: "Step 1: Join the Waitlist",
        description: "Sign up now to secure your spot and receive updates on our launch."
    }, {
        step: "Step 2: Prepare Your Application",
        description: "Submit your records and statement of purpose once we’re accredited."
    }, {
        step: "Step 3: Start Your Journey",
        description: "Join a pioneering community dedicated to advancing Ethiopia’s tech landscape."
    }],
    t1 = () => n.jsx("section", {
        className: "py-20 bg-white dark:bg-gray-800",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsxs("div", {
                className: "text-center mb-16",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                    children: "Admissions Process"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                    children: "We’re preparing to welcome our first cohort of students as soon as accreditation is complete. Here’s how you can join us:"
                })]
            }), n.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                children: e1.map((s, c) => n.jsxs("div", {
                    className: "bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg",
                    children: [n.jsx("div", {
                        className: "flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4 mx-auto",
                        children: n.jsx("span", {
                            className: "text-lg font-bold",
                            children: c + 1
                        })
                    }), n.jsx("h3", {
                        className: "text-lg font-semibold text-gray-900 dark:text-white text-center mb-2",
                        children: s.step
                    }), n.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-300 text-center",
                        children: s.description
                    })]
                }, c))
            })]
        })
    }),
    a1 = "/assets/fuculty-research-D2lsO2cy.jpg",
    l1 = () => n.jsx("section", {
        className: "py-20 bg-gray-50 dark:bg-gray-900",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsxs("div", {
                className: "text-center mb-16",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                    children: "Faculty & Research"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                    children: "Our faculty and research initiatives are poised to set new benchmarks in technological education and innovation."
                })]
            }), n.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                children: [n.jsxs("div", {
                    children: [n.jsx("h3", {
                        className: "text-2xl font-semibold text-gray-900 dark:text-white mb-4",
                        children: "World-Class Faculty"
                    }), n.jsx("p", {
                        className: "text-md text-gray-600 dark:text-gray-300 mb-6",
                        children: "We’re assembling a team of distinguished educators and industry leaders from Ethiopia and around the world."
                    }), n.jsx("h3", {
                        className: "text-2xl font-semibold text-gray-900 dark:text-white mb-4",
                        children: "Cutting-Edge Research"
                    }), n.jsx("p", {
                        className: "text-md text-gray-600 dark:text-gray-300",
                        children: "Our research programs will tackle pressing challenges in Ethiopia and beyond, from smart manufacturing to autonomous systems."
                    })]
                }), n.jsxs("div", {
                    className: "relative h-96 rounded-xl overflow-hidden shadow-lg",
                    children: [n.jsx("img", {
                        src: a1,
                        alt: "Faculty & Research",
                        className: "w-full h-full object-cover"
                    }), n.jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-6",
                        children: n.jsx("p", {
                            className: "text-white text-lg font-semibold",
                            children: "Research That Transforms Lives"
                        })
                    })]
                })]
            })]
        })
    }),
    n1 = "/assets/vision-Y6fbRv_y.jpg",
    i1 = () => n.jsx("section", {
        className: "py-16 bg-white dark:bg-gray-800",
        children: n.jsx("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: n.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                children: [n.jsxs("div", {
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6",
                        children: "Our Vision for Ethiopia’s Tech Future"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-600 dark:text-gray-300 mb-6",
                        children: "We envision a future where Ethiopia leads Africa’s technological revolution, powered by a generation of skilled innovators. Our institution is being built to make this vision a reality."
                    }), n.jsx("p", {
                        className: "text-lg text-gray-600 dark:text-gray-300",
                        children: "From practical TVET programs to PhD research, our comprehensive approach ensures every student finds their path to success. Join us as we pioneer a new era of education in Ethiopia."
                    })]
                }), n.jsxs("div", {
                    className: "relative h-96 rounded-xl overflow-hidden shadow-lg",
                    children: [n.jsx("img", {
                        src: n1,
                        alt: "Our Vision",
                        className: "w-full h-full object-cover"
                    }), n.jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-6",
                        children: n.jsx("p", {
                            className: "text-white text-lg font-semibold",
                            children: "Empowering Ethiopia’s Next Innovators"
                        })
                    })]
                })]
            })
        })
    }),
    s1 = [{
        level: "TVET",
        icon: oe.createElement(Kx, {
            className: "w-8 h-8"
        }),
        description: "Practical, skills-based training for technical careers",
        programs: [{
            name: "Building Electrical Installation",
            duration: "1 year",
            description: "Comprehensive training in electrical wiring for buildings",
            highlights: ["Residential Wiring", "Safety Standards", "System Maintenance"],
            details: {
                overview: "This program provides hands-on training in electrical installation for residential and commercial buildings, focusing on safety standards and system maintenance.",
                outcomes: ["Install and maintain electrical systems in buildings.", "Ensure compliance with safety regulations.", "Prepare for roles in construction and maintenance."],
                ctaText: "Build a solid foundation in electrical installation—enroll now!"
            }
        }, {
            name: "Electrical/Electronic Equipment Servicing",
            duration: "1-2 years",
            description: "Training in servicing and maintaining electrical/electronic equipment",
            highlights: ["Equipment Diagnostics", "Repair Techniques", "Preventive Maintenance"],
            details: {
                overview: "Learn to diagnose, repair, and maintain electrical and electronic equipment. This program prepares you for roles in servicing and technical support.",
                outcomes: ["Diagnose and repair electrical/electronic equipment.", "Perform preventive maintenance to extend equipment life.", "Work in industries requiring technical servicing expertise."],
                ctaText: "Start your journey in equipment servicing today!"
            }
        }, {
            name: "Industrial Electrical/Electronic Control Technology",
            duration: "1-2 years",
            description: "Hands-on training in industrial control systems",
            highlights: ["PLC Programming", "Control Systems", "Automation Basics"],
            details: {
                overview: "This program equips you with the skills to work with industrial electrical and electronic control systems, including PLC programming and automation technologies.",
                outcomes: ["Master industrial control technologies.", "Work with PLCs and automation systems.", "Secure roles in manufacturing and industrial support."],
                ctaText: "Ready to excel in industrial control technology? Join today!"
            }
        }, {
            name: "Solar PV System Installation and Maintenance",
            duration: "1 year",
            description: "Training in solar photovoltaic systems",
            highlights: ["Solar Panel Installation", "System Design", "Maintenance Techniques"],
            details: {
                overview: "Learn to install and maintain solar PV systems, focusing on renewable energy solutions for residential and commercial applications.",
                outcomes: ["Install and maintain solar PV systems.", "Design efficient solar energy systems.", "Contribute to the renewable energy sector."],
                ctaText: "Join the solar energy revolution—enroll now!"
            }
        }, {
            name: "Fiber Optics Networking",
            duration: "6 months",
            description: "Specialized training in fiber optics technology",
            highlights: ["Fiber Optic Installation", "Network Design", "Testing & Troubleshooting"],
            details: {
                overview: "This program provides training in fiber optics networking, including installation, design, and troubleshooting of fiber optic systems.",
                outcomes: ["Install and maintain fiber optic networks.", "Design and troubleshoot fiber optic systems.", "Prepare for roles in telecommunications and networking."],
                ctaText: "Advance your career in fiber optics—enroll today!"
            }
        }, {
            name: "Electrical Power System Technology",
            duration: "1-2 years",
            description: "Training in electrical power systems and technologies",
            highlights: ["Power Distribution", "System Analysis", "Grid Maintenance"],
            details: {
                overview: "This program focuses on electrical power systems, including power distribution, system analysis, and grid maintenance, preparing you for roles in the energy sector.",
                outcomes: ["Work with electrical power distribution systems.", "Analyze and maintain power grids.", "Contribute to the development of energy infrastructure."],
                ctaText: "Shape the future of energy—join our program today!"
            }
        }]
    }, {
        level: "Undergraduate",
        icon: oe.createElement(bs, {
            className: "w-8 h-8"
        }),
        description: "Four-year programs building tech foundations",
        programs: [{
            name: "Computer Science & Engineering",
            duration: "4 years",
            description: "Software, AI, and systems development",
            highlights: ["AI & Machine Learning", "Software Engineering", "Network Security"],
            details: {
                overview: "Dive into the world of computer science with a program designed to make you a versatile tech innovator. You’ll explore artificial intelligence, software development, and network security, gaining the skills to create solutions that transform industries.",
                outcomes: ["Develop cutting-edge software and AI applications.", "Understand and secure complex network systems.", "Launch a career as a software engineer or AI specialist."],
                ctaText: "Shape the digital future—join our waitlist now!"
            }
        }, {
            name: "Information Systems",
            duration: "4 years",
            description: "Bridging business and technology",
            highlights: ["Database Management", "Business Analytics", "IT Project Management"],
            details: {
                overview: "This program focuses on the intersection of business and technology, equipping you with the skills to manage and analyze information systems effectively.",
                outcomes: ["Design and manage enterprise-level information systems.", "Analyze data to drive business decisions.", "Lead IT projects in diverse industries."],
                ctaText: "Transform businesses with technology—enroll today!"
            }
        }]
    }, {
        level: "Postgrad",
        icon: oe.createElement(vc, {
            className: "w-8 h-8"
        }),
        description: "Advanced specialization and research in technology",
        programs: [{
            name: "MSc in Artificial Intelligence",
            duration: "2 years",
            description: "Cutting-edge AI and data science",
            highlights: ["Deep Learning", "NLP", "AI Ethics"],
            details: {
                overview: "Take your expertise to the next level with our MSc in AI. This program delves into advanced topics like deep learning and natural language processing, preparing you to lead in AI research and application while considering ethical implications.",
                outcomes: ["Design and implement advanced AI models.", "Contribute to ethical AI development.", "Pursue leadership roles in tech innovation."],
                ctaText: "Become an AI pioneer—sign up for updates!"
            }
        }, {
            name: "MSc in Data Science",
            duration: "2 years",
            description: "Advanced data analysis and visualization",
            highlights: ["Big Data", "Predictive Analytics", "Data Visualization"],
            details: {
                overview: "Master the art of data science with a program that focuses on big data, predictive analytics, and visualization techniques. Prepare for a career in data-driven decision-making.",
                outcomes: ["Analyze and interpret complex datasets.", "Develop predictive models for business insights.", "Visualize data to communicate findings effectively."],
                ctaText: "Lead the data revolution—apply now!"
            }
        }, {
            name: "PhD in Robotics & AI",
            duration: "4 years",
            description: "Advanced robotics and AI research",
            highlights: ["Autonomous Systems", "Human-Robot Interaction", "AI Algorithms"],
            details: {
                overview: "Push the boundaries of technology with a PhD in Robotics & AI. This research-focused program lets you explore autonomous systems and human-robot collaboration, positioning you as a thought leader in Ethiopia’s tech revolution.",
                outcomes: ["Conduct groundbreaking research in robotics and AI.", "Influence industry and academic advancements.", "Lead innovation in Ethiopia and beyond."],
                ctaText: "Ready to redefine tech? Join our research community!"
            }
        }, {
            name: "PhD in Cybersecurity",
            duration: "4 years",
            description: "Advanced research in securing digital systems",
            highlights: ["Cryptography", "Network Security", "Cyber Threat Analysis"],
            details: {
                overview: "This program focuses on advanced research in cybersecurity, equipping you to tackle emerging threats and secure digital infrastructures.",
                outcomes: ["Develop innovative solutions to cybersecurity challenges.", "Lead research in cryptography and threat analysis.", "Shape the future of secure digital systems."],
                ctaText: "Secure the digital world—join our PhD program!"
            }
        }]
    }, {
        level: "Professional Training",
        icon: oe.createElement(Vx, {
            className: "w-8 h-8"
        }),
        description: "Short-term, intensive training for career advancement",
        programs: [{
            name: "Project Management Professional (PMP)",
            duration: "3 months",
            description: "Comprehensive training for project management certification",
            highlights: ["Project Planning", "Risk Management", "Agile Methodologies"],
            details: {
                overview: "This program prepares you for the PMP certification with in-depth training in project planning, risk management, and agile methodologies. Gain the skills to lead projects successfully.",
                outcomes: ["Earn the globally recognized PMP certification.", "Master project management tools and techniques.", "Advance your career in project management."],
                ctaText: "Take the next step in your career—enroll in PMP training today!"
            }
        }, {
            name: "Certified Data Analyst",
            duration: "4 months",
            description: "Hands-on training in data analysis and visualization",
            highlights: ["Excel & SQL", "Data Cleaning", "Visualization with Power BI"],
            details: {
                overview: "Learn the essential skills for data analysis, including data cleaning, SQL, and visualization tools like Power BI. This program is designed for professionals looking to enhance their analytical capabilities.",
                outcomes: ["Analyze and interpret data effectively.", "Create compelling visualizations to communicate insights.", "Prepare for roles in data analysis and business intelligence."],
                ctaText: "Boost your data skills—join the Certified Data Analyst program today!"
            }
        }, {
            name: "Digital Marketing Specialist",
            duration: "2 months",
            description: "Master digital marketing strategies and tools",
            highlights: ["SEO & SEM", "Social Media Marketing", "Email Campaigns"],
            details: {
                overview: "This program provides practical training in digital marketing, covering SEO, SEM, social media, and email campaigns. Learn to create impactful marketing strategies for the digital age.",
                outcomes: ["Develop and execute effective digital marketing campaigns.", "Optimize websites for search engines and manage ad campaigns.", "Enhance brand presence on social media platforms."],
                ctaText: "Become a digital marketing expert—enroll now!"
            }
        }, {
            name: "Cybersecurity Essentials",
            duration: "3 months",
            description: "Foundational training in cybersecurity principles",
            highlights: ["Threat Analysis", "Network Security Basics", "Incident Response"],
            details: {
                overview: "This program introduces you to the fundamentals of cybersecurity, including threat analysis, network security, and incident response. Gain the skills to protect digital assets and respond to security incidents.",
                outcomes: ["Understand the basics of cybersecurity threats and defenses.", "Implement foundational network security measures.", "Prepare for entry-level roles in cybersecurity."],
                ctaText: "Secure your future in cybersecurity—enroll today!"
            }
        }]
    }],
    r1 = "/assets/robotics-CYJTEPQh.jpg",
    o1 = "/assets/empowering-CbMCth_1.jpg";

function b0(s) {
    var c, o, u = "";
    if (typeof s == "string" || typeof s == "number") u += s;
    else if (typeof s == "object")
        if (Array.isArray(s)) {
            var f = s.length;
            for (c = 0; c < f; c++) s[c] && (o = b0(s[c])) && (u && (u += " "), u += o)
        } else
            for (o in s) s[o] && (u && (u += " "), u += o);
    return u
}

function Ia() {
    for (var s, c, o = 0, u = "", f = arguments.length; o < f; o++)(s = arguments[o]) && (c = b0(s)) && (u && (u += " "), u += c);
    return u
}

function c1(s) {
    if (typeof document > "u") return;
    let c = document.head || document.getElementsByTagName("head")[0],
        o = document.createElement("style");
    o.type = "text/css", c.firstChild ? c.insertBefore(o, c.firstChild) : c.appendChild(o), o.styleSheet ? o.styleSheet.cssText = s : o.appendChild(document.createTextNode(s))
}
c1(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var In = s => typeof s == "number" && !isNaN(s),
    tl = s => typeof s == "string",
    ia = s => typeof s == "function",
    u1 = s => tl(s) || In(s),
    cc = s => tl(s) || ia(s) ? s : null,
    d1 = (s, c) => s === !1 || In(s) && s > 0 ? s : c,
    uc = s => N.isValidElement(s) || tl(s) || ia(s) || In(s);

function f1(s, c, o = 300) {
    let {
        scrollHeight: u,
        style: f
    } = s;
    requestAnimationFrame(() => {
        f.minHeight = "initial", f.height = u + "px", f.transition = `all ${o}ms`, requestAnimationFrame(() => {
            f.height = "0", f.padding = "0", f.margin = "0", setTimeout(c, o)
        })
    })
}

function m1({
    enter: s,
    exit: c,
    appendPosition: o = !1,
    collapse: u = !0,
    collapseDuration: f = 300
}) {
    return function({
        children: p,
        position: x,
        preventExitTransition: v,
        done: m,
        nodeRef: g,
        isIn: y,
        playToast: A
    }) {
        let C = o ? `${s}--${x}` : s,
            G = o ? `${c}--${x}` : c,
            O = N.useRef(0);
        return N.useLayoutEffect(() => {
            let V = g.current,
                E = C.split(" "),
                D = L => {
                    L.target === g.current && (A(), V.removeEventListener("animationend", D), V.removeEventListener("animationcancel", D), O.current === 0 && L.type !== "animationcancel" && V.classList.remove(...E))
                };
            V.classList.add(...E), V.addEventListener("animationend", D), V.addEventListener("animationcancel", D)
        }, []), N.useEffect(() => {
            let V = g.current,
                E = () => {
                    V.removeEventListener("animationend", E), u ? f1(V, m, f) : m()
                };
            y || (v ? E() : (O.current = 1, V.className += ` ${G}`, V.addEventListener("animationend", E)))
        }, [y]), oe.createElement(oe.Fragment, null, p)
    }
}

function Hm(s, c) {
    return {
        content: v0(s.content, s.props),
        containerId: s.props.containerId,
        id: s.props.toastId,
        theme: s.props.theme,
        type: s.props.type,
        data: s.props.data || {},
        isLoading: s.props.isLoading,
        icon: s.props.icon,
        reason: s.removalReason,
        status: c
    }
}

function v0(s, c, o = !1) {
    return N.isValidElement(s) && !tl(s.type) ? N.cloneElement(s, {
        closeToast: c.closeToast,
        toastProps: c,
        data: c.data,
        isPaused: o
    }) : ia(s) ? s({
        closeToast: c.closeToast,
        toastProps: c,
        data: c.data,
        isPaused: o
    }) : s
}

function h1({
    closeToast: s,
    theme: c,
    ariaLabel: o = "close"
}) {
    return oe.createElement("button", {
        className: `Toastify__close-button Toastify__close-button--${c}`,
        type: "button",
        onClick: u => {
            u.stopPropagation(), s(!0)
        },
        "aria-label": o
    }, oe.createElement("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 14 16"
    }, oe.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    })))
}

function g1({
    delay: s,
    isRunning: c,
    closeToast: o,
    type: u = "default",
    hide: f,
    className: p,
    controlledProgress: x,
    progress: v,
    rtl: m,
    isIn: g,
    theme: y
}) {
    let A = f || x && v === 0,
        C = {
            animationDuration: `${s}ms`,
            animationPlayState: c ? "running" : "paused"
        };
    x && (C.transform = `scaleX(${v})`);
    let G = Ia("Toastify__progress-bar", x ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${y}`, `Toastify__progress-bar--${u}`, {
            "Toastify__progress-bar--rtl": m
        }),
        O = ia(p) ? p({
            rtl: m,
            type: u,
            defaultClassName: G
        }) : Ia(G, p),
        V = {
            [x && v >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: x && v < 1 ? null : () => {
                g && o()
            }
        };
    return oe.createElement("div", {
        className: "Toastify__progress-bar--wrp",
        "data-hidden": A
    }, oe.createElement("div", {
        className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${y} Toastify__progress-bar--${u}`
    }), oe.createElement("div", {
        role: "progressbar",
        "aria-hidden": A ? "true" : "false",
        "aria-label": "notification timer",
        className: O,
        style: C,
        ...V
    }))
}
var p1 = 1,
    j0 = () => `${p1++}`;

function x1(s, c, o) {
    let u = 1,
        f = 0,
        p = [],
        x = [],
        v = c,
        m = new Map,
        g = new Set,
        y = L => (g.add(L), () => g.delete(L)),
        A = () => {
            x = Array.from(m.values()), g.forEach(L => L())
        },
        C = ({
            containerId: L,
            toastId: q,
            updateId: X
        }) => {
            let z = L ? L !== s : s !== 1,
                K = m.has(q) && X == null;
            return z || K
        },
        G = (L, q) => {
            m.forEach(X => {
                var z;
                (q == null || q === X.props.toastId) && ((z = X.toggle) == null || z.call(X, L))
            })
        },
        O = L => {
            var q, X;
            (X = (q = L.props) == null ? void 0 : q.onClose) == null || X.call(q, L.removalReason), L.isActive = !1
        },
        V = L => {
            if (L == null) m.forEach(O);
            else {
                let q = m.get(L);
                q && O(q)
            }
            A()
        },
        E = () => {
            f -= p.length, p = []
        },
        D = L => {
            var q, X;
            let {
                toastId: z,
                updateId: K
            } = L.props, $ = K == null;
            L.staleId && m.delete(L.staleId), L.isActive = !0, m.set(z, L), A(), o(Hm(L, $ ? "added" : "updated")), $ && ((X = (q = L.props).onOpen) == null || X.call(q))
        };
    return {
        id: s,
        props: v,
        observe: y,
        toggle: G,
        removeToast: V,
        toasts: m,
        clearQueue: E,
        buildToast: (L, q) => {
            if (C(q)) return;
            let {
                toastId: X,
                updateId: z,
                data: K,
                staleId: $,
                delay: P
            } = q, re = z == null;
            re && f++;
            let Q = { ...v,
                style: v.toastStyle,
                key: u++,
                ...Object.fromEntries(Object.entries(q).filter(([me, je]) => je != null)),
                toastId: X,
                updateId: z,
                data: K,
                isIn: !1,
                className: cc(q.className || v.toastClassName),
                progressClassName: cc(q.progressClassName || v.progressClassName),
                autoClose: q.isLoading ? !1 : d1(q.autoClose, v.autoClose),
                closeToast(me) {
                    m.get(X).removalReason = me, V(X)
                },
                deleteToast() {
                    let me = m.get(X);
                    if (me != null) {
                        if (o(Hm(me, "removed")), m.delete(X), f--, f < 0 && (f = 0), p.length > 0) {
                            D(p.shift());
                            return
                        }
                        A()
                    }
                }
            };
            Q.closeButton = v.closeButton, q.closeButton === !1 || uc(q.closeButton) ? Q.closeButton = q.closeButton : q.closeButton === !0 && (Q.closeButton = uc(v.closeButton) ? v.closeButton : !0);
            let te = {
                content: L,
                props: Q,
                staleId: $
            };
            v.limit && v.limit > 0 && f > v.limit && re ? p.push(te) : In(P) ? setTimeout(() => {
                D(te)
            }, P) : D(te)
        },
        setProps(L) {
            v = L
        },
        setToggle: (L, q) => {
            let X = m.get(L);
            X && (X.toggle = q)
        },
        isToastActive: L => {
            var q;
            return (q = m.get(L)) == null ? void 0 : q.isActive
        },
        getSnapshot: () => x
    }
}
var at = new Map,
    Kn = [],
    dc = new Set,
    y1 = s => dc.forEach(c => c(s)),
    N0 = () => at.size > 0;

function b1() {
    Kn.forEach(s => E0(s.content, s.options)), Kn = []
}
var v1 = (s, {
    containerId: c
}) => {
    var o;
    return (o = at.get(c || 1)) == null ? void 0 : o.toasts.get(s)
};

function w0(s, c) {
    var o;
    if (c) return !!((o = at.get(c)) != null && o.isToastActive(s));
    let u = !1;
    return at.forEach(f => {
        f.isToastActive(s) && (u = !0)
    }), u
}

function j1(s) {
    if (!N0()) {
        Kn = Kn.filter(c => s != null && c.options.toastId !== s);
        return
    }
    if (s == null || u1(s)) at.forEach(c => {
        c.removeToast(s)
    });
    else if (s && ("containerId" in s || "id" in s)) {
        let c = at.get(s.containerId);
        c ? c.removeToast(s.id) : at.forEach(o => {
            o.removeToast(s.id)
        })
    }
}
var N1 = (s = {}) => {
    at.forEach(c => {
        c.props.limit && (!s.containerId || c.id === s.containerId) && c.clearQueue()
    })
};

function E0(s, c) {
    uc(s) && (N0() || Kn.push({
        content: s,
        options: c
    }), at.forEach(o => {
        o.buildToast(s, c)
    }))
}

function w1(s) {
    var c;
    (c = at.get(s.containerId || 1)) == null || c.setToggle(s.id, s.fn)
}

function S0(s, c) {
    at.forEach(o => {
        (c == null || !(c != null && c.containerId) || (c == null ? void 0 : c.containerId) === o.id) && o.toggle(s, c == null ? void 0 : c.id)
    })
}

function E1(s) {
    let c = s.containerId || 1;
    return {
        subscribe(o) {
            let u = x1(c, s, y1);
            at.set(c, u);
            let f = u.observe(o);
            return b1(), () => {
                f(), at.delete(c)
            }
        },
        setProps(o) {
            var u;
            (u = at.get(c)) == null || u.setProps(o)
        },
        getSnapshot() {
            var o;
            return (o = at.get(c)) == null ? void 0 : o.getSnapshot()
        }
    }
}

function S1(s) {
    return dc.add(s), () => {
        dc.delete(s)
    }
}

function _1(s) {
    return s && (tl(s.toastId) || In(s.toastId)) ? s.toastId : j0()
}

function ei(s, c) {
    return E0(s, c), c.toastId
}

function As(s, c) {
    return { ...c,
        type: c && c.type || s,
        toastId: _1(c)
    }
}

function Ms(s) {
    return (c, o) => ei(c, As(s, o))
}

function Te(s, c) {
    return ei(s, As("default", c))
}
Te.loading = (s, c) => ei(s, As("default", {
    isLoading: !0,
    autoClose: !1,
    closeOnClick: !1,
    closeButton: !1,
    draggable: !1,
    ...c
}));

function T1(s, {
    pending: c,
    error: o,
    success: u
}, f) {
    let p;
    c && (p = tl(c) ? Te.loading(c, f) : Te.loading(c.render, { ...f,
        ...c
    }));
    let x = {
            isLoading: null,
            autoClose: null,
            closeOnClick: null,
            closeButton: null,
            draggable: null
        },
        v = (g, y, A) => {
            if (y == null) {
                Te.dismiss(p);
                return
            }
            let C = {
                    type: g,
                    ...x,
                    ...f,
                    data: A
                },
                G = tl(y) ? {
                    render: y
                } : y;
            return p ? Te.update(p, { ...C,
                ...G
            }) : Te(G.render, { ...C,
                ...G
            }), A
        },
        m = ia(s) ? s() : s;
    return m.then(g => v("success", u, g)).catch(g => v("error", o, g)), m
}
Te.promise = T1;
Te.success = Ms("success");
Te.info = Ms("info");
Te.error = Ms("error");
Te.warning = Ms("warning");
Te.warn = Te.warning;
Te.dark = (s, c) => ei(s, As("default", {
    theme: "dark",
    ...c
}));

function k1(s) {
    j1(s)
}
Te.dismiss = k1;
Te.clearWaitingQueue = N1;
Te.isActive = w0;
Te.update = (s, c = {}) => {
    let o = v1(s, c);
    if (o) {
        let {
            props: u,
            content: f
        } = o, p = {
            delay: 100,
            ...u,
            ...c,
            toastId: c.toastId || s,
            updateId: j0()
        };
        p.toastId !== s && (p.staleId = s);
        let x = p.render || f;
        delete p.render, ei(x, p)
    }
};
Te.done = s => {
    Te.update(s, {
        progress: 1
    })
};
Te.onChange = S1;
Te.play = s => S0(!0, s);
Te.pause = s => S0(!1, s);

function A1(s) {
    var c;
    let {
        subscribe: o,
        getSnapshot: u,
        setProps: f
    } = N.useRef(E1(s)).current;
    f(s);
    let p = (c = N.useSyncExternalStore(o, u, u)) == null ? void 0 : c.slice();

    function x(v) {
        if (!p) return [];
        let m = new Map;
        return s.newestOnTop && p.reverse(), p.forEach(g => {
            let {
                position: y
            } = g.props;
            m.has(y) || m.set(y, []), m.get(y).push(g)
        }), Array.from(m, g => v(g[0], g[1]))
    }
    return {
        getToastToRender: x,
        isToastActive: w0,
        count: p == null ? void 0 : p.length
    }
}

function M1(s) {
    let [c, o] = N.useState(!1), [u, f] = N.useState(!1), p = N.useRef(null), x = N.useRef({
        start: 0,
        delta: 0,
        removalDistance: 0,
        canCloseOnClick: !0,
        canDrag: !1,
        didMove: !1
    }).current, {
        autoClose: v,
        pauseOnHover: m,
        closeToast: g,
        onClick: y,
        closeOnClick: A
    } = s;
    w1({
        id: s.toastId,
        containerId: s.containerId,
        fn: o
    }), N.useEffect(() => {
        if (s.pauseOnFocusLoss) return C(), () => {
            G()
        }
    }, [s.pauseOnFocusLoss]);

    function C() {
        document.hasFocus() || D(), window.addEventListener("focus", E), window.addEventListener("blur", D)
    }

    function G() {
        window.removeEventListener("focus", E), window.removeEventListener("blur", D)
    }

    function O($) {
        if (s.draggable === !0 || s.draggable === $.pointerType) {
            L();
            let P = p.current;
            x.canCloseOnClick = !0, x.canDrag = !0, P.style.transition = "none", s.draggableDirection === "x" ? (x.start = $.clientX, x.removalDistance = P.offsetWidth * (s.draggablePercent / 100)) : (x.start = $.clientY, x.removalDistance = P.offsetHeight * (s.draggablePercent === 80 ? s.draggablePercent * 1.5 : s.draggablePercent) / 100)
        }
    }

    function V($) {
        let {
            top: P,
            bottom: re,
            left: Q,
            right: te
        } = p.current.getBoundingClientRect();
        $.nativeEvent.type !== "touchend" && s.pauseOnHover && $.clientX >= Q && $.clientX <= te && $.clientY >= P && $.clientY <= re ? D() : E()
    }

    function E() {
        o(!0)
    }

    function D() {
        o(!1)
    }

    function L() {
        x.didMove = !1, document.addEventListener("pointermove", X), document.addEventListener("pointerup", z)
    }

    function q() {
        document.removeEventListener("pointermove", X), document.removeEventListener("pointerup", z)
    }

    function X($) {
        let P = p.current;
        if (x.canDrag && P) {
            x.didMove = !0, c && D(), s.draggableDirection === "x" ? x.delta = $.clientX - x.start : x.delta = $.clientY - x.start, x.start !== $.clientX && (x.canCloseOnClick = !1);
            let re = s.draggableDirection === "x" ? `${x.delta}px, var(--y)` : `0, calc(${x.delta}px + var(--y))`;
            P.style.transform = `translate3d(${re},0)`, P.style.opacity = `${1-Math.abs(x.delta/x.removalDistance)}`
        }
    }

    function z() {
        q();
        let $ = p.current;
        if (x.canDrag && x.didMove && $) {
            if (x.canDrag = !1, Math.abs(x.delta) > x.removalDistance) {
                f(!0), s.closeToast(!0), s.collapseAll();
                return
            }
            $.style.transition = "transform 0.2s, opacity 0.2s", $.style.removeProperty("transform"), $.style.removeProperty("opacity")
        }
    }
    let K = {
        onPointerDown: O,
        onPointerUp: V
    };
    return v && m && (K.onMouseEnter = D, s.stacked || (K.onMouseLeave = E)), A && (K.onClick = $ => {
        y && y($), x.canCloseOnClick && g(!0)
    }), {
        playToast: E,
        pauseToast: D,
        isRunning: c,
        preventExitTransition: u,
        toastRef: p,
        eventHandlers: K
    }
}
var C1 = typeof window < "u" ? N.useLayoutEffect : N.useEffect,
    Cs = ({
        theme: s,
        type: c,
        isLoading: o,
        ...u
    }) => oe.createElement("svg", {
        viewBox: "0 0 24 24",
        width: "100%",
        height: "100%",
        fill: s === "colored" ? "currentColor" : `var(--toastify-icon-color-${c})`,
        ...u
    });

function R1(s) {
    return oe.createElement(Cs, { ...s
    }, oe.createElement("path", {
        d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
    }))
}

function O1(s) {
    return oe.createElement(Cs, { ...s
    }, oe.createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
    }))
}

function D1(s) {
    return oe.createElement(Cs, { ...s
    }, oe.createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
    }))
}

function z1(s) {
    return oe.createElement(Cs, { ...s
    }, oe.createElement("path", {
        d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
    }))
}

function B1() {
    return oe.createElement("div", {
        className: "Toastify__spinner"
    })
}
var fc = {
        info: O1,
        warning: R1,
        success: D1,
        error: z1,
        spinner: B1
    },
    q1 = s => s in fc;

function U1({
    theme: s,
    type: c,
    isLoading: o,
    icon: u
}) {
    let f = null,
        p = {
            theme: s,
            type: c
        };
    return u === !1 || (ia(u) ? f = u({ ...p,
        isLoading: o
    }) : N.isValidElement(u) ? f = N.cloneElement(u, p) : o ? f = fc.spinner() : q1(c) && (f = fc[c](p))), f
}
var L1 = s => {
        let {
            isRunning: c,
            preventExitTransition: o,
            toastRef: u,
            eventHandlers: f,
            playToast: p
        } = M1(s), {
            closeButton: x,
            children: v,
            autoClose: m,
            onClick: g,
            type: y,
            hideProgressBar: A,
            closeToast: C,
            transition: G,
            position: O,
            className: V,
            style: E,
            progressClassName: D,
            updateId: L,
            role: q,
            progress: X,
            rtl: z,
            toastId: K,
            deleteToast: $,
            isIn: P,
            isLoading: re,
            closeOnClick: Q,
            theme: te,
            ariaLabel: me
        } = s, je = Ia("Toastify__toast", `Toastify__toast-theme--${te}`, `Toastify__toast--${y}`, {
            "Toastify__toast--rtl": z
        }, {
            "Toastify__toast--close-on-click": Q
        }), et = ia(V) ? V({
            rtl: z,
            position: O,
            type: y,
            defaultClassName: je
        }) : Ia(je, V), xe = U1(s), R = !!X || !m, Z = {
            closeToast: C,
            type: y,
            theme: te
        }, I = null;
        return x === !1 || (ia(x) ? I = x(Z) : N.isValidElement(x) ? I = N.cloneElement(x, Z) : I = h1(Z)), oe.createElement(G, {
            isIn: P,
            done: $,
            position: O,
            preventExitTransition: o,
            nodeRef: u,
            playToast: p
        }, oe.createElement("div", {
            id: K,
            tabIndex: 0,
            onClick: g,
            "data-in": P,
            className: et,
            ...f,
            style: E,
            ref: u,
            ...P && {
                role: q,
                "aria-label": me
            }
        }, xe != null && oe.createElement("div", {
            className: Ia("Toastify__toast-icon", {
                "Toastify--animate-icon Toastify__zoom-enter": !re
            })
        }, xe), v0(v, s, !c), I, !s.customProgressBar && oe.createElement(g1, { ...L && !R ? {
                key: `p-${L}`
            } : {},
            rtl: z,
            theme: te,
            delay: m,
            isRunning: c,
            isIn: P,
            closeToast: C,
            hide: A,
            type: y,
            className: D,
            controlledProgress: R,
            progress: X || 0
        })))
    },
    H1 = (s, c = !1) => ({
        enter: `Toastify--animate Toastify__${s}-enter`,
        exit: `Toastify--animate Toastify__${s}-exit`,
        appendPosition: c
    }),
    G1 = m1(H1("bounce", !0)),
    Y1 = {
        position: "top-right",
        transition: G1,
        autoClose: 5e3,
        closeButton: !0,
        pauseOnHover: !0,
        pauseOnFocusLoss: !0,
        draggable: "touch",
        draggablePercent: 80,
        draggableDirection: "x",
        role: "alert",
        theme: "light",
        "aria-label": "Notifications Alt+T",
        hotKeys: s => s.altKey && s.code === "KeyT"
    };

function X1(s) {
    let c = { ...Y1,
            ...s
        },
        o = s.stacked,
        [u, f] = N.useState(!0),
        p = N.useRef(null),
        {
            getToastToRender: x,
            isToastActive: v,
            count: m
        } = A1(c),
        {
            className: g,
            style: y,
            rtl: A,
            containerId: C,
            hotKeys: G
        } = c;

    function O(E) {
        let D = Ia("Toastify__toast-container", `Toastify__toast-container--${E}`, {
            "Toastify__toast-container--rtl": A
        });
        return ia(g) ? g({
            position: E,
            rtl: A,
            defaultClassName: D
        }) : Ia(D, cc(g))
    }

    function V() {
        o && (f(!0), Te.play())
    }
    return C1(() => {
        var E;
        if (o) {
            let D = p.current.querySelectorAll('[data-in="true"]'),
                L = 12,
                q = (E = c.position) == null ? void 0 : E.includes("top"),
                X = 0,
                z = 0;
            Array.from(D).reverse().forEach((K, $) => {
                let P = K;
                P.classList.add("Toastify__toast--stacked"), $ > 0 && (P.dataset.collapsed = `${u}`), P.dataset.pos || (P.dataset.pos = q ? "top" : "bot");
                let re = X * (u ? .2 : 1) + (u ? 0 : L * $);
                P.style.setProperty("--y", `${q?re:re*-1}px`), P.style.setProperty("--g", `${L}`), P.style.setProperty("--s", `${1-(u?z:0)}`), X += P.offsetHeight, z += .025
            })
        }
    }, [u, m, o]), N.useEffect(() => {
        function E(D) {
            var L;
            let q = p.current;
            G(D) && ((L = q.querySelector('[tabIndex="0"]')) == null || L.focus(), f(!1), Te.pause()), D.key === "Escape" && (document.activeElement === q || q != null && q.contains(document.activeElement)) && (f(!0), Te.play())
        }
        return document.addEventListener("keydown", E), () => {
            document.removeEventListener("keydown", E)
        }
    }, [G]), oe.createElement("section", {
        ref: p,
        className: "Toastify",
        id: C,
        onMouseEnter: () => {
            o && (f(!1), Te.pause())
        },
        onMouseLeave: V,
        "aria-live": "polite",
        "aria-atomic": "false",
        "aria-relevant": "additions text",
        "aria-label": c["aria-label"]
    }, x((E, D) => {
        let L = D.length ? { ...y
        } : { ...y,
            pointerEvents: "none"
        };
        return oe.createElement("div", {
            tabIndex: -1,
            className: O(E),
            "data-stacked": o,
            style: L,
            key: `c-${E}`
        }, D.map(({
            content: q,
            props: X
        }) => oe.createElement(L1, { ...X,
            stacked: o,
            collapseAll: V,
            isIn: v(X.toastId, X.containerId),
            key: `t-${X.key}`
        }, q)))
    }))
}
const V1 = ({
        program: s,
        onClose: c
    }) => {
        N.useEffect(() => {
            const u = f => {
                f.key === "Escape" && c()
            };
            return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u)
        }, [c]);
        const o = u => {
            u.preventDefault(), Te.info("Get ready! We'll soon launch this program for you to explore. Stay tuned!", {
                position: "top-right",
                autoClose: 3e3,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                style: {
                    background: "linear-gradient(to right, #4b0082, #00b7ea)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)"
                },
                progressClassName: "custom-toast-progress"
            }), c()
        };
        return n.jsx("div", {
            className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 animate-fade-in",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": `Details for ${s.name}`,
            tabIndex: -1,
            children: n.jsxs("div", {
                className: "w-full max-w-lg bg-gradient-to-b from-gray-900 to-indigo-950 rounded-2xl border-2 border-gradient-to-r shadow-[0_0_20px_rgba(80,200,255,0.5)] p-6 m-4 animate-slide-up",
                children: [n.jsxs("div", {
                    className: "flex items-center mb-6",
                    children: [n.jsx("div", {
                        className: "mr-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white animate-pulse",
                        children: n.jsx(rc, {
                            className: "h-6 w-6"
                        })
                    }), n.jsx("h4", {
                        className: "text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500",
                        children: s.name
                    }), n.jsx("button", {
                        onClick: c,
                        className: "ml-auto p-2 rounded-full bg-gray-800/50 text-white hover:bg-cyan-500 hover:text-gray-900 transition-colors duration-200",
                        "aria-label": "Close modal",
                        children: n.jsx(Ts, {
                            className: "h-6 w-6"
                        })
                    })]
                }), n.jsxs("div", {
                    className: "flex items-center text-sm text-cyan-400 mb-4",
                    children: [n.jsx(el, {
                        className: "w-4 h-4 mr-2"
                    }), s.duration]
                }), n.jsx("p", {
                    className: "text-base text-gray-200 mb-6 leading-relaxed",
                    children: s.description
                }), n.jsxs("div", {
                    className: "mb-6",
                    children: [n.jsx("h5", {
                        className: "font-semibold text-white mb-2 text-sm",
                        children: "Key Highlights"
                    }), n.jsx("ul", {
                        className: "space-y-2",
                        children: s.highlights.map((u, f) => n.jsxs("li", {
                            className: "flex items-center text-xs text-gray-300",
                            children: [n.jsx(rc, {
                                className: "w-3 h-3 mr-2 text-cyan-500"
                            }), u]
                        }, f))
                    })]
                }), n.jsx("button", {
                    onClick: o,
                    className: "inline-block px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400",
                    "aria-label": `Explore ${s.name}`,
                    children: "Explore Program"
                })]
            })
        })
    },
    Q1 = ({
        programs: s
    }) => {
        const c = N.useRef(null),
            [o, u] = N.useState(0),
            [f, p] = N.useState(null),
            [x, v] = N.useState(!0);
        N.useEffect(() => {
            const g = setTimeout(() => {
                v(!1)
            }, 3e3);
            return () => clearTimeout(g)
        }, []), N.useEffect(() => {
            const g = new IntersectionObserver(A => {
                    A.forEach(C => {
                        C.isIntersecting && C.target.querySelectorAll(".program-card").forEach((O, V) => {
                            O.classList.add("animate-slide-in"), O.style.animationDelay = `${V*.1}s`
                        })
                    })
                }, {
                    threshold: .2
                }),
                y = c.current;
            return y && g.observe(y), () => {
                y && g.unobserve(y)
            }
        }, [o]);
        const m = g => {
            u(o === g ? null : g)
        };
        return n.jsxs("section", {
            ref: c,
            id: "programs",
            className: "py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden",
            role: "region",
            "aria-label": "Explore Our Programs",
            children: [n.jsx(X1, {}), n.jsxs("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [n.jsx("div", {
                    className: "w-1 h-1 bg-white/50 rounded-full absolute top-10 left-20 animate-twinkle"
                }), n.jsx("div", {
                    className: "w-1 h-1 bg-white/50 rounded-full absolute top-40 right-30 animate-twinkle delay-200"
                }), n.jsx("div", {
                    className: "w-1 h-1 bg-white/50 rounded-full absolute bottom-20 left-40 animate-twinkle delay-400"
                })]
            }), n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-16",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4",
                        children: "Explore Our Programs"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-300 max-w-3xl mx-auto",
                        children: "Embark on a journey of innovation with programs designed to ignite your potential."
                    })]
                }), n.jsx("div", {
                    className: "space-y-6",
                    children: s.map((g, y) => n.jsxs("div", {
                        className: "bg-gray-800/30 rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        children: [n.jsxs("button", {
                            className: `w-full p-4 flex items-center justify-between text-left transition-all duration-500 ${o===y?"bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shadow-[0_0_15px_rgba(80,200,255,0.3)]":"hover:bg-gray-700/50"}`,
                            onClick: () => m(y),
                            "aria-expanded": o === y,
                            "aria-controls": `level-programs-${y}`,
                            "aria-label": `Toggle ${g.level} programs`,
                            children: [n.jsxs("div", {
                                className: "flex items-center",
                                children: [n.jsx("div", {
                                    className: "w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white mr-4 animate-pulse",
                                    children: oe.cloneElement(g.icon, {
                                        className: "h-6 w-6"
                                    })
                                }), n.jsxs("div", {
                                    children: [n.jsxs("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: [g.level, " Programs"]
                                    }), n.jsx("p", {
                                        className: "text-sm text-gray-400",
                                        children: g.description
                                    })]
                                })]
                            }), n.jsx(ta, {
                                className: `w-6 h-6 text-cyan-400 transition-transform duration-300 ${o===y?"rotate-180":""}`
                            })]
                        }), n.jsx("div", {
                            id: `level-programs-${y}`,
                            className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 transition-all duration-500 ease-in-out ${o===y?"max-h-[1000px] opacity-100":"max-h-0 opacity-0 overflow-hidden"}`,
                            children: g.programs.map((A, C) => n.jsxs("div", {
                                className: "program-card bg-gray-800/50 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(80,200,255,0.5)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400 group relative",
                                role: "button",
                                tabIndex: 0,
                                "aria-label": `Learn more about ${A.name}`,
                                "aria-describedby": `program-desc-${y}-${C}`,
                                onClick: () => p(A),
                                onKeyDown: G => G.key === "Enter" && p(A),
                                children: [n.jsx("div", {
                                    className: "h-1 bg-gradient-to-r from-purple-500 to-cyan-500"
                                }), n.jsxs("div", {
                                    className: "p-4",
                                    children: [n.jsxs("div", {
                                        className: "flex items-center mb-2",
                                        children: [n.jsx("div", {
                                            className: "w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white group-hover:animate-pulse mr-3",
                                            children: n.jsx(rc, {
                                                className: "h-4 w-4"
                                            })
                                        }), n.jsx("h4", {
                                            className: "text-base font-semibold text-white",
                                            children: A.name
                                        })]
                                    }), n.jsxs("div", {
                                        className: "flex items-center text-xs text-cyan-400 mb-2",
                                        children: [n.jsx(el, {
                                            className: "w-3 h-3 mr-2"
                                        }), A.duration]
                                    }), n.jsx("p", {
                                        id: `program-desc-${y}-${C}`,
                                        className: "text-xs text-gray-400 truncate",
                                        children: A.description
                                    }), x && C === 0 && y === 0 && n.jsx("span", {
                                        className: "absolute top-2 right-2 text-xs text-cyan-400 bg-gray-900/80 px-2 py-1 rounded animate-pulse",
                                        children: "Click to explore"
                                    })]
                                })]
                            }, C))
                        })]
                    }, y))
                })]
            }), f && n.jsx(V1, {
                program: f,
                onClose: () => p(null)
            }), n.jsx("style", {
                children: `
      .custom-toast-progress {
    background: #a855f7 !important; /* Purple progress bar */
    height: 4px;
  }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
      `
            })]
        })
    },
    Z1 = () => {
        const s = [{
                title: n.jsxs(n.Fragment, {
                    children: [n.jsx("span", {
                        className: "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400",
                        children: "Learn, Cre"
                    }), n.jsx("span", {
                        className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-red-400",
                        children: "ate, Inspire"
                    })]
                }),
                description: "Discover a transformative educational journey where learning fuels creativity and inspiration drives innovation. Join us to shape the future of technology in Ethiopia.",
                image: "https://images.unsplash.com/photo-1572310608276-9134d42f127f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaCUyMGlubm92YXRpb258ZW58MHx8MHx8fDA%3D"
            }, {
                title: "Where Innovation Meets Opportunity",
                description: "Imagine a place where cutting-edge technology education empowers Ethiopia’s next generation of leaders. That’s our vision, and we’re building it now—join us as we turn ambition into action.",
                image: r1
            }, {
                title: "Empowering Tomorrow's Innovators Today",
                description: "At Ethronics, we’re not just teaching technology—we’re creating it. Explore opportunities in robotics, artificial intelligence, and advanced manufacturing, designed to transform Ethiopia into a hub of innovation.",
                image: o1
            }],
            c = [{
                text: "Join Waitlist",
                href: "/contact",
                primary: !0
            }, {
                text: "Explore Programs",
                href: "#programs"
            }];
        return N.useEffect(() => {
            window.scrollTo(0, 0)
        }, []), n.jsxs("div", {
            className: "min-h-screen bg-gray-50 dark:bg-gray-900",
            children: [n.jsx(ks, {
                slides: s,
                buttons: c
            }), n.jsx(Ib, {}), n.jsx(i1, {}), n.jsx(Q1, {
                programs: s1
            }), n.jsx(t1, {}), n.jsx(l1, {}), n.jsx(Pn, {
                title: "Ready to Shape Ethiopia’s Technological Destiny?",
                description: "We’re building a movement. Accreditation is underway, and soon, we’ll open our doors to students ready to lead Ethiopia into a new era of innovation.",
                buttons: [{
                    text: "Join Waitlist",
                    href: "/contact",
                    primary: !0
                }, {
                    text: "Contact Us",
                    href: "/contact"
                }]
            })]
        })
    },
    Gm = [{
        question: "Need your manufacturing automated?",
        solution: "We’ve got it—robotics and AI to make it smooth.",
        details: "We use smart machines and computer programs to do hard work fast. Your factory can make more products with less effort. Our team builds solutions that fit your needs.",
        icon: n.jsx(sc, {
            className: "w-10 h-10 text-purple-600 dark:text-purple-400"
        })
    }, {
        question: "Want to grow your production?",
        solution: "We’ve got it—tech to push your limits.",
        details: "Our technology helps your business make more. We find ways to improve your machines and processes. You can sell more and grow bigger with our help.",
        icon: n.jsx(ty, {
            className: "w-10 h-10 text-purple-600 dark:text-purple-400"
        })
    }, {
        question: "Got an idea that needs a spark?",
        solution: "We’ve got it—a team to back you up.",
        details: "Do you have a new plan? We can make it real. Our experts work with you to build your idea step by step. Together, we turn thoughts into action.",
        icon: n.jsx(wc, {
            className: "w-10 h-10 text-purple-600 dark:text-purple-400"
        })
    }, {
        question: "Facing a tough problem?",
        solution: "We’ve got it—smart fixes, fast.",
        details: "Problems can stop your work. We find answers quickly. Our team uses simple, clever ideas to solve big issues. You can trust us to keep things moving.",
        icon: n.jsx(oc, {
            className: "w-10 h-10 text-purple-600 dark:text-purple-400"
        })
    }, {
        question: "Ready to launch something big?",
        solution: "We’ve got it—let’s take off together.",
        details: "Big projects need strong support. We bring tools and people to start your dream. From planning to finish, we work as your partner for success.",
        icon: n.jsx(p0, {
            className: "w-10 h-10 text-purple-600 dark:text-purple-400"
        })
    }],
    $1 = ({
        question: s,
        solution: c,
        details: o,
        icon: u,
        isReversed: f = !1
    }) => n.jsxs("div", {
        className: `flex flex-col ${f?"md:flex-row-reverse":"md:flex-row"} items-center gap-6 md:gap-10 py-8 md:py-12 max-w-3xl mx-auto`,
        children: [n.jsx("div", {
            className: "flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-full p-4",
            children: u
        }), n.jsxs("div", {
            className: "text-center md:text-left",
            children: [n.jsx("h3", {
                className: "text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2",
                children: s
            }), n.jsx("p", {
                className: "text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium mb-2",
                children: c
            }), n.jsx("p", {
                className: "text-gray-600 dark:text-gray-300 text-sm md:text-base",
                children: o
            })]
        })]
    }),
    K1 = () => n.jsx("section", {
        className: "py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden",
        children: n.jsxs("div", {
            className: "relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [n.jsxs("div", {
                className: "text-center mb-12",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3",
                    children: "Whatever You Need, We’ve Got It"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto",
                    children: "We help with your challenges. Big dreams or small fixes, our team has the technology and skills to make it happen."
                })]
            }), n.jsx("div", {
                className: "relative",
                children: Gm.map((s, c) => n.jsxs("div", {
                    children: [n.jsx($1, {
                        question: s.question,
                        solution: s.solution,
                        details: s.details,
                        icon: s.icon,
                        isReversed: c % 2 !== 0
                    }), c < Gm.length - 1 && n.jsx("div", {
                        className: "relative my-4",
                        children: n.jsx("svg", {
                            className: "w-full h-8 text-purple-200 dark:text-purple-900",
                            fill: "none",
                            viewBox: "0 0 1440 40",
                            preserveAspectRatio: "none",
                            children: n.jsx("path", {
                                d: "M0 20 Q 360 40, 720 20 T 1440 20",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                opacity: "0.5"
                            })
                        })
                    })]
                }, c))
            }), n.jsxs("div", {
                className: "text-center mt-12",
                children: [n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 mb-4",
                    children: "Do you have another need? We want to hear it. Let’s work together."
                }), n.jsx("a", {
                    href: "/contact",
                    className: "inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium",
                    children: "Let’s Chat"
                })]
            })]
        })
    }),
    J1 = [{
        title: "Pioneering Research from Ethiopia",
        description: "Ethronics is driving technological breakthroughs in robotics, AI, cybersecurity, quantum computing, and blockchain. Our R&D efforts blend local ingenuity with global ambition, creating solutions that redefine industries.",
        image: "https://images.unsplash.com/photo-1716436329475-4c55d05383bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGlubm92YXRpb258ZW58MHx8MHx8fDA%3D"
    }, {
        title: "Innovating for a Smarter Future",
        description: "From adaptive robotics to quantum research, we’re exploring the frontiers of technology to solve real-world challenges—starting in Ethiopia and impacting the world.",
        image: "https://images.unsplash.com/photo-1591306208574-969f12f1ebfe?auto=format&fit=crop&w=2070&q=80"
    }],
    W1 = [{
        text: "Join Our Research",
        href: "/contact",
        primary: !0
    }, {
        text: "Contact Us",
        href: "/contact"
    }],
    F1 = () => (N.useEffect(() => {
        window.scrollTo(0, 0)
    }, []), n.jsxs("div", {
        className: "min-h-screen bg-gray-50 dark:bg-gray-900",
        children: [n.jsx(ks, {
            slides: J1,
            buttons: W1
        }), n.jsx("section", {
            className: "py-20 bg-gray-50 dark:bg-gray-800",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-16",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                        children: "Our Research Focus"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                        children: "At Ethronics, our R&D team is pushing the boundaries of technology across five key areas. Each domain reflects our commitment to solving global challenges with Ethiopian innovation at the core."
                    })]
                }), n.jsx("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: x0.map((s, c) => n.jsxs("div", {
                        className: "bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow",
                        children: [n.jsx("div", {
                            className: "flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4 mx-auto text-purple-600 dark:text-purple-400",
                            children: s.icon
                        }), n.jsx("h3", {
                            className: "text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center",
                            children: s.title
                        }), n.jsx("p", {
                            className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed",
                            children: s.description
                        })]
                    }, c))
                })]
            })
        }), n.jsx(K1, {}), n.jsx("section", {
            className: "py-16 bg-gray-50 dark:bg-gray-800",
            children: n.jsxs("div", {
                className: "max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
                    children: "Collaborate With Us"
                }), n.jsx("p", {
                    className: "text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto",
                    children: "Ethronics welcomes partnerships with researchers, institutions, and industry leaders. Whether you’re a student, academic, or professional, join us in advancing technology from Ethiopia to the world."
                }), n.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto",
                    children: [n.jsxs("div", {
                        className: "bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg",
                        children: [n.jsx("h3", {
                            className: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
                            children: "For Researchers"
                        }), n.jsx("p", {
                            className: "text-gray-600 dark:text-gray-300 mb-4 text-sm",
                            children: "Contribute to groundbreaking projects in AI, quantum computing, and more. Share your expertise and innovate with us."
                        }), n.jsx("a", {
                            href: "/contact",
                            className: "inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium",
                            children: "Get Involved"
                        })]
                    }), n.jsxs("div", {
                        className: "bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg",
                        children: [n.jsx("h3", {
                            className: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
                            children: "For Partners"
                        }), n.jsx("p", {
                            className: "text-gray-600 dark:text-gray-300 mb-4 text-sm",
                            children: "Collaborate with Ethronics to co-develop solutions, fund research, or bring our innovations to market."
                        }), n.jsx("a", {
                            href: "/contact",
                            className: "inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium",
                            children: "Contact Us"
                        })]
                    })]
                })]
            })
        }), n.jsx(Pn, {
            title: "Ready to Push the Boundaries of Research?",
            description: "Join us in creating the future. At Ethronics, we’re solving big problems with smart technology. Work with our team to explore robotics, AI, and more—starting from Ethiopia.",
            buttons: [{
                text: "Join Our Research",
                href: "/contact",
                primary: !0
            }, {
                text: "Contact Us",
                href: "/contact"
            }]
        })]
    })),
    Ym = [{
        value: "general",
        label: "General Inquiry",
        info: "Have a question or suggestion? We’re here to assist with any inquiries you might have."
    }, {
        value: "waiting-list",
        label: "Join Waiting List",
        info: "Sign up to be notified about upcoming programs and opportunities at Ethronics."
    }, {
        value: "careers",
        label: "Careers",
        info: "Interested in joining our team? Submit your resume and let’s explore opportunities together.",
        action: {
            text: "Upload Resume",
            href: "/careers/upload"
        }
    }, {
        value: "research",
        label: "Research Collaboration",
        info: "Propose a research project or join our ongoing initiatives. Let’s innovate together!"
    }, {
        value: "internships",
        label: "Internships",
        info: "Apply for an internship to gain hands-on experience with cutting-edge technology."
    }, {
        value: "partnerships",
        label: "Partnerships",
        info: "Explore collaboration opportunities with Ethronics for mutual growth and impact."
    }, {
        value: "support",
        label: "Technical/Support",
        info: "Need help with our systems or services? Our support team is ready to assist."
    }],
    P1 = ({
        onSubmitSuccess: s
    }) => {
        const [c, o] = N.useState({
            name: "",
            email: "",
            message: "",
            category: "general"
        }), u = async v => {
            v.preventDefault();
            try {
                const m = await fetch("http://192.168.1.5:8000/api/contact/submit/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(c)
                });
                m.ok ? (s(), o({
                    name: "",
                    email: "",
                    message: "",
                    category: "general"
                })) : console.error("Submission failed:", await m.text())
            } catch (m) {
                console.error("Error:", m)
            }
        }, f = v => {
            const {
                name: m,
                value: g
            } = v.target;
            o(y => ({ ...y,
                [m]: g
            }))
        }, p = v => {
            o(m => ({ ...m,
                category: v
            }))
        }, x = Ym.find(v => v.value === c.category);
        return n.jsxs("div", {
            className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",
            children: [n.jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 dark:text-white mb-6",
                children: "Send Us a Message"
            }), n.jsxs("div", {
                className: "mb-6",
                children: [n.jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Category"
                }), n.jsx("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: Ym.map(v => n.jsxs("label", {
                        className: `flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${c.category===v.value?"border-purple-600 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300":"border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`,
                        children: [n.jsx("input", {
                            type: "radio",
                            name: "category",
                            value: v.value,
                            checked: c.category === v.value,
                            onChange: () => p(v.value),
                            className: "hidden"
                        }), n.jsx("span", {
                            className: "text-sm font-medium",
                            children: v.label
                        })]
                    }, v.value))
                }), n.jsxs("div", {
                    className: "mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg",
                    children: [n.jsx("h3", {
                        className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
                        children: x == null ? void 0 : x.label
                    }), n.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-300",
                        children: x == null ? void 0 : x.info
                    }), (x == null ? void 0 : x.action) && n.jsx("a", {
                        href: x.action.href,
                        className: "mt-3 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm",
                        children: x.action.text
                    })]
                })]
            }), n.jsxs("form", {
                onSubmit: u,
                className: "space-y-6",
                children: [n.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [n.jsxs("div", {
                        children: [n.jsx("label", {
                            htmlFor: "name",
                            className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                            children: "Your Name"
                        }), n.jsx("input", {
                            type: "text",
                            id: "name",
                            name: "name",
                            value: c.name,
                            onChange: f,
                            className: "w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white",
                            required: !0
                        })]
                    }), n.jsxs("div", {
                        children: [n.jsx("label", {
                            htmlFor: "email",
                            className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                            children: "Email Address"
                        }), n.jsx("input", {
                            type: "email",
                            id: "email",
                            name: "email",
                            value: c.email,
                            onChange: f,
                            className: "w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white",
                            required: !0
                        })]
                    })]
                }), n.jsxs("div", {
                    children: [n.jsx("label", {
                        htmlFor: "message",
                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                        children: "Message"
                    }), n.jsx("textarea", {
                        id: "message",
                        name: "message",
                        value: c.message,
                        onChange: f,
                        rows: 6,
                        className: "w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white",
                        required: !0
                    })]
                }), n.jsxs("button", {
                    type: "submit",
                    className: "inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition-colors",
                    children: [n.jsx(Qy, {
                        className: "w-5 h-5 mr-2"
                    }), "Send Message"]
                })]
            })]
        })
    },
    I1 = () => n.jsx("div", {
        className: "relative bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-blue-900/90 py-24",
        children: n.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
            children: [n.jsx("h1", {
                className: "text-4xl md:text-5xl font-bold text-white mb-4",
                children: "Get in Touch"
            }), n.jsx("p", {
                className: "text-lg md:text-xl text-white/90 max-w-3xl mx-auto",
                children: "Whether you’re interested in joining our programs, exploring career opportunities, or collaborating on groundbreaking research, we’re here to connect with you."
            })]
        })
    });
var _0 = {
        color: void 0,
        size: void 0,
        className: void 0,
        style: void 0,
        attr: void 0
    },
    Xm = oe.createContext && oe.createContext(_0),
    ev = ["attr", "size", "title"];

function tv(s, c) {
    if (s == null) return {};
    var o = av(s, c),
        u, f;
    if (Object.getOwnPropertySymbols) {
        var p = Object.getOwnPropertySymbols(s);
        for (f = 0; f < p.length; f++) u = p[f], !(c.indexOf(u) >= 0) && Object.prototype.propertyIsEnumerable.call(s, u) && (o[u] = s[u])
    }
    return o
}

function av(s, c) {
    if (s == null) return {};
    var o = {};
    for (var u in s)
        if (Object.prototype.hasOwnProperty.call(s, u)) {
            if (c.indexOf(u) >= 0) continue;
            o[u] = s[u]
        }
    return o
}

function Ns() {
    return Ns = Object.assign ? Object.assign.bind() : function(s) {
        for (var c = 1; c < arguments.length; c++) {
            var o = arguments[c];
            for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (s[u] = o[u])
        }
        return s
    }, Ns.apply(this, arguments)
}

function Vm(s, c) {
    var o = Object.keys(s);
    if (Object.getOwnPropertySymbols) {
        var u = Object.getOwnPropertySymbols(s);
        c && (u = u.filter(function(f) {
            return Object.getOwnPropertyDescriptor(s, f).enumerable
        })), o.push.apply(o, u)
    }
    return o
}

function ws(s) {
    for (var c = 1; c < arguments.length; c++) {
        var o = arguments[c] != null ? arguments[c] : {};
        c % 2 ? Vm(Object(o), !0).forEach(function(u) {
            lv(s, u, o[u])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(o)) : Vm(Object(o)).forEach(function(u) {
            Object.defineProperty(s, u, Object.getOwnPropertyDescriptor(o, u))
        })
    }
    return s
}

function lv(s, c, o) {
    return c = nv(c), c in s ? Object.defineProperty(s, c, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : s[c] = o, s
}

function nv(s) {
    var c = iv(s, "string");
    return typeof c == "symbol" ? c : c + ""
}

function iv(s, c) {
    if (typeof s != "object" || !s) return s;
    var o = s[Symbol.toPrimitive];
    if (o !== void 0) {
        var u = o.call(s, c);
        if (typeof u != "object") return u;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (c === "string" ? String : Number)(s)
}

function T0(s) {
    return s && s.map((c, o) => oe.createElement(c.tag, ws({
        key: o
    }, c.attr), T0(c.child)))
}

function k0(s) {
    return c => oe.createElement(sv, Ns({
        attr: ws({}, s.attr)
    }, c), T0(s.child))
}

function sv(s) {
    var c = o => {
        var {
            attr: u,
            size: f,
            title: p
        } = s, x = tv(s, ev), v = f || o.size || "1em", m;
        return o.className && (m = o.className), s.className && (m = (m ? m + " " : "") + s.className), oe.createElement("svg", Ns({
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "0"
        }, o.attr, u, x, {
            className: m,
            style: ws(ws({
                color: s.color || o.color
            }, o.style), s.style),
            height: v,
            width: v,
            xmlns: "http://www.w3.org/2000/svg"
        }), p && oe.createElement("title", null, p), s.children)
    };
    return Xm !== void 0 ? oe.createElement(Xm.Consumer, null, o => c(o)) : c(_0)
}

function rv(s) {
    return k0({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
            },
            child: []
        }]
    })(s)
}
const ov = () => {
        const s = [{
            Icon: rv,
            href: "https://et.linkedin.com/company/ethronics"
        }];
        return n.jsxs(n.Fragment, {
            children: [n.jsxs("div", {
                className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",
                children: [n.jsx("h2", {
                    className: "text-2xl font-semibold text-gray-900 dark:text-white mb-6",
                    children: "Contact Details"
                }), n.jsxs("div", {
                    className: "space-y-6",
                    children: [n.jsxs("div", {
                        className: "flex items-start space-x-3",
                        children: [n.jsx(vs, {
                            className: "w-5 h-5 text-purple-600 mt-1"
                        }), n.jsxs("div", {
                            children: [n.jsx("p", {
                                className: "font-medium text-gray-900 dark:text-gray-200",
                                children: "Email"
                            }), n.jsx("a", {
                                href: "mailto:contact@ethronics.org",
                                className: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
                                children: "contact@ethronics.org"
                            })]
                        })]
                    }), n.jsxs("div", {
                        className: "flex items-start space-x-3",
                        children: [n.jsx(g0, {
                            className: "w-5 h-5 text-purple-600 mt-1"
                        }), n.jsxs("div", {
                            children: [n.jsx("p", {
                                className: "font-medium text-gray-900 dark:text-gray-200",
                                children: "Phone"
                            }), n.jsx("a", {
                                href: "tel:+251978467467",
                                className: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
                                children: "+(251) 978-467-467"
                            })]
                        })]
                    })]
                })]
            }), n.jsxs("div", {
                className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",
                children: [n.jsx("h3", {
                    className: "text-xl font-semibold text-gray-900 dark:text-white mb-4",
                    children: "Follow Us"
                }), n.jsx("div", {
                    className: "flex space-x-4",
                    children: s.map(({
                        Icon: c,
                        href: o
                    }, u) => n.jsx("a", {
                        href: o,
                        className: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors",
                        children: n.jsx(c, {
                            className: "w-6 h-6"
                        })
                    }, u))
                })]
            })]
        })
    },
    cv = () => n.jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",
        children: [n.jsxs("h3", {
            className: "text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center",
            children: [n.jsx(Ec, {
                className: "w-5 h-5 text-purple-600 mr-2"
            }), "Our Location"]
        }), n.jsxs("p", {
            className: "text-gray-600 dark:text-gray-300 mb-4",
            children: ["Mebrat, AMG Mall, 9th Floor", n.jsx("br", {}), "Adama, Ethiopia"]
        }), n.jsx("div", {
            className: "relative h-64 w-full rounded-lg overflow-hidden",
            children: n.jsx("iframe", {
                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5104963168656!2d39.267508675060384!3d8.546809291496546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1fbf6d421b13%3A0x104c602ab0c730b1!2sEthronics%20-%20Institute%20of%20Robotics%20and%20Autonomous%20Systems%20(IRAS)!5e0!3m2!1sen!2set!4v1744915902755!5m2!1sen!2set",
                width: "100%",
                height: "100%",
                style: {
                    border: 0
                },
                allowFullScreen: !0,
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade"
            })
        })]
    }),
    uv = () => {
        const [s, c] = N.useState(!1);
        N.useEffect(() => {
            window.scrollTo(0, 0)
        }, []);
        const o = () => {
            c(!0), setTimeout(() => c(!1), 3e3)
        };
        return n.jsxs("div", {
            className: "min-h-screen bg-gray-50 dark:bg-gray-900 py-16",
            children: [n.jsx(I1, {}), n.jsx("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16",
                children: n.jsxs("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                    children: [n.jsxs("div", {
                        className: "lg:col-span-1 space-y-8",
                        children: [n.jsx(ov, {}), n.jsx(cv, {})]
                    }), n.jsx("div", {
                        className: "lg:col-span-2",
                        children: n.jsx(P1, {
                            onSubmitSuccess: o
                        })
                    })]
                })
            }), s && n.jsx("div", {
                className: "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in",
                children: "Message sent successfully!"
            })]
        })
    },
    dv = ({
        name: s,
        quote: c,
        bio: o,
        position: u,
        image: f,
        linkdin: p
    }) => {
        const [x, v] = N.useState(!1), m = () => {
            v(!0)
        }, g = () => {
            v(!1)
        };
        return n.jsxs(n.Fragment, {
            children: [n.jsxs("div", {
                className: "bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm mx-auto md:mx-0 flex flex-col items-center transform transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group",
                onClick: m,
                children: [n.jsxs("div", {
                    className: "relative mb-6",
                    children: [n.jsx("img", {
                        src: f,
                        alt: `${s}`,
                        className: "w-28 h-28 rounded-full object-cover border-4 border-purple-400 transition-transform duration-300 group-hover:scale-105"
                    }), n.jsx("div", {
                        className: "absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    })]
                }), n.jsx("h3", {
                    className: "text-xl md:text-2xl font-bold text-white mb-1 text-center",
                    children: s
                }), n.jsxs("p", {
                    className: "text-md md:text-lg text-purple-300 font-medium mb-3 text-center tracking-wide italic",
                    children: ['"', c, '"']
                }), n.jsx("p", {
                    className: "text-gray-300 text-sm md:text-base mb-4 text-center leading-relaxed line-clamp-3",
                    children: o
                }), n.jsx("div", {
                    className: "text-sm text-gray-400 text-center",
                    children: n.jsxs("p", {
                        children: [n.jsx("strong", {
                            className: "font-semibold text-gray-200",
                            children: "Position:"
                        }), " ", u]
                    })
                })]
            }), x && n.jsx("div", {
                className: "fixed inset-0 backdrop-blur-md bg-gray-900 bg-opacity-30 flex items-center justify-center z-50",
                onClick: g,
                children: n.jsx("div", {
                    className: "bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 transform transition-all animate-fade-in",
                    onClick: y => y.stopPropagation(),
                    children: n.jsxs("div", {
                        className: "flex flex-col items-center",
                        children: [n.jsx("img", {
                            src: f,
                            alt: `${s}`,
                            className: "w-32 h-32 rounded-full object-cover border-4 border-purple-400 mb-4"
                        }), n.jsx("h3", {
                            className: "text-2xl font-bold text-white mb-2",
                            children: s
                        }), n.jsxs("p", {
                            className: "text-lg text-purple-300 mb-4 italic",
                            children: ['"', c, '"']
                        }), n.jsx("p", {
                            className: "text-gray-300 text-base mb-4 text-center",
                            children: o
                        }), n.jsxs("div", {
                            className: "text-sm text-gray-400 space-y-2 w-full",
                            children: [n.jsxs("p", {
                                children: [n.jsx("strong", {
                                    className: "font-semibold text-gray-200",
                                    children: "Position:"
                                }), " ", u]
                            }), p && n.jsxs("a", {
                                href: p,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "mt-4 flex items-center text-purple-400 hover:text-purple-300",
                                children: [n.jsx("svg", {
                                    className: "w-5 sm:w-6 h-5 sm:h-6 mr-2",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                    })
                                }), "LinkedIn Profile"]
                            })]
                        }), n.jsx("button", {
                            onClick: g,
                            className: "mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium",
                            children: "Close"
                        })]
                    })
                })
            })]
        })
    },
    fv = ({
        title: s,
        description: c,
        icon: o,
        details: u
    }) => n.jsxs("div", {
        className: "relative flex flex-col md:flex-row items-center gap-8 py-8 max-w-4xl mx-auto",
        children: [n.jsx("div", {
            className: "flex-shrink-0",
            children: n.jsx("div", {
                className: "bg-purple-100 dark:bg-purple-900 rounded-full p-4",
                children: o
            })
        }), n.jsxs("div", {
            className: "text-center md:text-left",
            children: [n.jsx("h3", {
                className: "text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2",
                children: s
            }), n.jsx("p", {
                className: "text-lg text-purple-600 dark:text-purple-400 font-medium mb-4",
                children: c
            }), n.jsx("p", {
                className: "text-gray-600 dark:text-gray-300 text-base",
                children: u
            })]
        })]
    }),
    mv = [{
        title: "Academics",
        description: "Training Ethiopia’s next tech leaders.",
        icon: n.jsx(Zx, {
            className: "w-12 h-12 text-purple-400"
        }),
        details: "We’re building a place to learn about new technologies like AI and robotics. Our programs will teach students skills for the future. Soon, we’ll welcome young minds to shape Ethiopia’s tech story."
    }, {
        title: "Research & Development",
        description: "Pushing the limits of what’s possible.",
        icon: n.jsx(vc, {
            className: "w-12 h-12 text-purple-400"
        }),
        details: "Our team explores emerging tech—quantum computing, blockchain, and more. We create solutions to solve big problems. From Ethiopia, we will be leading the world in innovation."
    }, {
        title: "Manufacturing",
        description: "Building smarter, stronger industries.",
        icon: n.jsx(by, {
            className: "w-12 h-12 text-purple-400"
        }),
        details: "We are developing a state-of-the-art manufacturing site that will use advanced technologies like robotics and AI. This facility will enhance production capabilities, support local industries, and position Ethiopia as a global competitor in manufacturing."
    }],
    hv = [{
        name: "Dr. Firew Abera",
        quote: "Technology is the bridge to a future where Ethiopia leads with innovation.",
        bio: "As the Founder and CEO of Ethronics, Dr. Firew Abera drives the vision for Ethiopia's technological advancement, focusing on innovation and leadership in emerging technologies.",
        position: "Founder and CEO at Ethronics",
        linkdin: "https://www.linkedin.com/in/firewaberadotcom/?originalSubdomain=uk",
        image: "https://media.licdn.com/dms/image/v2/C4E03AQGPzRVxDz9QcA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1550190961230?e=1749081600&v=beta&t=COWIMYBAa8vj4IIcsLz90tf0V6SOkIxd6YVcVGUvzF4"
    }, {
        name: "Eng. Yohannes Melese",
        quote: "Life is about solving problems; technology makes it possible at scale.",
        bio: "As the Chief Technology Officer at Ethronics, Eng. Yohannes Melese leads AI and electronics engineering initiatives, creating innovative solutions to drive progress.",
        position: "Chief Technology Officer at Ethronics",
        linkdin: "https://www.linkedin.com/in/yohannes-melese/",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQGTfUmjQIUI5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722396285182?e=1749081600&v=beta&t=jFQS1fsPx1TDFzVXlJsWorscp8TOfKlQk8h-rFCDKbc"
    }],
    gv = () => (N.useEffect(() => {
        window.scrollTo(0, 0)
    }, []), n.jsxs("div", {
        className: "min-h-screen bg-gray-900 py-24",
        children: [n.jsx("section", {
            className: "py-20 bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-gray-900",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                children: [n.jsx("h1", {
                    className: "text-4xl md:text-5xl font-bold text-white mb-6",
                    children: "About Ethronics"
                }), n.jsx("p", {
                    className: "text-lg md:text-xl text-gray-300 max-w-3xl mx-auto",
                    children: "Ethronics is dedicated to advancing Ethiopia. We aim to take bold steps in academics, research, and manufacturing, leveraging technology to drive progress and unlock new possibilities."
                })]
            })
        }), n.jsx("section", {
            className: "py-16 bg-gray-800",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                children: [n.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-white mb-8",
                    children: "Our Purpose"
                }), n.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto",
                    children: [n.jsxs("div", {
                        children: [n.jsx("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "Mission"
                        }), n.jsx("p", {
                            className: "text-gray-300 text-base",
                            children: "To empower Ethiopia with technology. We teach, innovate, and build to solve problems and create opportunities."
                        })]
                    }), n.jsxs("div", {
                        children: [n.jsx("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "Vision"
                        }), n.jsx("p", {
                            className: "text-gray-300 text-base",
                            children: "To make Ethiopia among global leaders in emerging tech. We see a future where our ideas shape the world."
                        })]
                    })]
                })]
            })
        }), n.jsx("section", {
            className: "py-16 bg-gray-900",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-12",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold text-white mb-4",
                        children: "Meet Our Leaders"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-300 max-w-2xl mx-auto",
                        children: "Our leaders bring experience and passion to Ethronics. They guide us in building a tech future for Ethiopia."
                    })]
                }), n.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                    children: hv.map((s, c) => n.jsx(dv, {
                        name: s.name,
                        quote: s.quote,
                        bio: s.bio,
                        position: s.position,
                        achievements: s.achievements || [],
                        techHighlight: s.techHighlight || "",
                        linkdin: s.linkdin,
                        image: s.image
                    }, c))
                })]
            })
        }), n.jsx("section", {
            className: "py-16 bg-gray-800 relative",
            children: n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [n.jsxs("div", {
                    className: "text-center mb-12",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold text-white mb-4",
                        children: "Our Three Fronts"
                    }), n.jsx("p", {
                        className: "text-lg text-gray-300 max-w-2xl mx-auto",
                        children: "We work on education, new ideas, and strong industries. Together, these fronts build a future powered by technology."
                    })]
                }), n.jsx("div", {
                    className: "relative",
                    children: mv.map((s, c) => n.jsx(fv, {
                        title: s.title,
                        description: s.description,
                        icon: s.icon,
                        details: s.details,
                        index: c
                    }, c))
                })]
            })
        }), n.jsx(Pn, {
            title: "Join Our Journey",
            description: "Ethronics is more than a company—it’s a mission. Be part of our work in academics, research, and manufacturing. Let’s create the future together.",
            buttons: [{
                text: "Get Involved",
                href: "/contact",
                primary: !0
            }, {
                text: "Learn More",
                href: "/about"
            }]
        })]
    })),
    pv = () => n.jsxs("div", {
        className: "flex flex-col items-center justify-center min-h-screen text-center",
        children: [n.jsx("h1", {
            className: "text-4xl font-bold",
            children: "404 - Page Not Found"
        }), n.jsx("p", {
            className: "mt-4",
            children: "The page you're looking for doesn't exist."
        }), n.jsx(aa, {
            to: "/",
            className: "mt-6 text-blue-500 hover:underline",
            children: "Go back to Home"
        })]
    });

function xv(s) {
    return k0({
        attr: {
            fill: "currentColor",
            viewBox: "0 0 16 16"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"
            },
            child: []
        }]
    })(s)
}
const mc = ({
        children: s,
        className: c = "",
        variant: o = "primary",
        size: u = "md",
        fullWidth: f = !1,
        ...p
    }) => {
        const x = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
            v = {
                primary: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600",
                secondary: "bg-gray-800 text-white hover:bg-gray-700",
                outline: "bg-transparent border border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
            },
            m = {
                sm: "text-sm px-3 py-1.5",
                md: "text-base px-4 py-2",
                lg: "text-lg px-6 py-3"
            },
            g = f ? "w-full" : "";
        return n.jsx("button", {
            className: `${x} ${v[o]} ${m[u]} ${g} ${c}`,
            ...p,
            children: s
        })
    },
    yv = () => {
        const [s, c] = N.useState(null), o = [{
            src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Vuc29yc3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Sensors and Electronics"
        }, {
            src: "https://images.unsplash.com/photo-1596839808531-218de5fbc3b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlbnNvcnN8ZW58MHx8MHx8fDA%3D",
            alt: "Project Prototyping"
        }, {
            src: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Arduino"
        }];
        return n.jsxs("section", {
            className: "relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden",
            children: [n.jsx("style", {
                children: `
          @keyframes shuffle-left {
            0% { transform: translateX(0px) rotate(0deg); z-index: 1; }
            33% { transform: translateX(30px) rotate(15deg) translateY(40px); z-index: 1; }
            66% { transform: translateX(-30px) rotate(-15deg) translateY(40px); z-index: 1; }
            100% { transform: translateX(-30px) rotate(-15deg) translateY(40px); z-index: 1; }
          }
          @keyframes shuffle-center {
            0% { transform: translateX(0px) rotate(0deg); z-index: 2; }
            33% { transform: translateX(-30px) rotate(-15deg) translateY(40px); z-index: 1; }
            66% { transform: translateX(30px) rotate(15deg) translateY(40px); z-index: 1; }
            100% { transform: translateX(0px) rotate(0deg); z-index: 2; }
          }
          @keyframes shuffle-right {
            0% { transform: translateX(0px) rotate(0deg); z-index: 1; }
            33% { transform: translateX(-30px) rotate(-15deg) translateY(40px); z-index: 1; }
            66% { transform: translateX(30px) rotate(15deg) translateY(40px); z-index: 1; }
            100% { transform: translateX(30px) rotate(15deg) translateY(40px); z-index: 1; }
          }
          .animate-shuffle-left {
            animation: shuffle-left 1.5s ease-in-out;
          }
          .animate-shuffle-center {
            animation: shuffle-center 1.5s ease-in-out;
          }
          .animate-shuffle-right {
            animation: shuffle-right 1.5s ease-in-out;
          }
        `
            }), n.jsxs("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [n.jsx("div", {
                    className: "absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-3xl"
                }), n.jsx("div", {
                    className: "absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-cyan-900/20 rounded-full blur-3xl"
                })]
            }), n.jsx("div", {
                className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhhcmR3YXJlfGVufDB8fDB8fHww')] bg-repeat opacity-5"
            }), n.jsxs("div", {
                className: "container mx-auto px-4 md:px-6 relative",
                children: [n.jsxs("div", {
                    className: "max-w-7xl mx-auto mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center",
                    children: [n.jsxs("div", {
                        className: "text-center lg:text-left",
                        children: [n.jsxs("h1", {
                            className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
                            children: [n.jsx("span", {
                                className: "block",
                                children: "Start Building "
                            }), n.jsx("span", {
                                className: "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500",
                                children: "Your Own Robots!"
                            })]
                        }), n.jsx("p", {
                            className: "text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed",
                            children: "Learn to build robots and code with hands-on Arduino projects. Discover engineering and technology in a fun, creative way—no experience needed!"
                        }), n.jsxs("div", {
                            className: "flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4",
                            children: [n.jsxs(mc, {
                                onClick: () => {
                                    var u;
                                    return (u = document.getElementById("register")) == null ? void 0 : u.scrollIntoView({
                                        behavior: "smooth"
                                    })
                                },
                                className: "w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-3",
                                children: ["Register Now ", n.jsx(u0, {
                                    className: "ml-2 h-5 w-5"
                                })]
                            }), n.jsx(mc, {
                                onClick: () => {
                                    var u;
                                    return (u = document.getElementById("courses")) == null ? void 0 : u.scrollIntoView({
                                        behavior: "smooth"
                                    })
                                },
                                className: "w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-lg px-8 py-3",
                                children: "Explore Courses"
                            })]
                        })]
                    }), n.jsx("div", {
                        className: "flex justify-center relative h-[400px] md:h-[500px]",
                        children: n.jsx("div", {
                            className: "flex items-center justify-center",
                            children: o.map((u, f) => n.jsxs("div", {
                                className: `
                    absolute w-64 md:w-80 h-80 md:h-96 bg-gray-800/80 rounded-xl overflow-hidden 
                    shadow-[0_0_15px_rgba(80,200,255,0.5)] border-2 border-gradient-to-r from-purple-500 to-cyan-500 
                    transition-transform duration-300 cursor-pointer
                    ${s===f||!s&&f===1?"scale-110 -translate-y-6 z-20":"hover:scale-110 hover:-translate-y-6 hover:z-20"}
                    ${f===0?"animate-shuffle-left":f===1?"animate-shuffle-center":"animate-shuffle-right"}
                  `,
                                style: {
                                    transform: `
                      translateX(${(f-1)*30}px)
                      rotate(${f===0?"-15deg":f===2?"15deg":"0deg"})
                      ${f!==1?"translateY(40px)":""}
                    `,
                                    zIndex: s === f ? 20 : f === 1 ? 2 : 1
                                },
                                onClick: () => c(f),
                                children: [n.jsx("img", {
                                    src: u.src,
                                    alt: u.alt,
                                    className: "w-full h-full object-contain"
                                }), n.jsx("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                }), n.jsx("div", {
                                    className: "absolute bottom-4 left-4 text-white",
                                    children: n.jsx("p", {
                                        className: "text-sm font-semibold",
                                        children: u.alt
                                    })
                                })]
                            }, f))
                        })
                    })]
                }), n.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12",
                    children: [n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all",
                        children: n.jsxs("div", {
                            className: "flex items-start mb-4",
                            children: [n.jsx(jc, {
                                className: "h-6 w-6 text-purple-400 mr-3 mt-1 shrink-0"
                            }), n.jsxs("div", {
                                className: "flex-1",
                                children: [n.jsx("h3", {
                                    className: "text-xl font-semibold mb-4 text-purple-300",
                                    children: "Class Schedule"
                                }), n.jsxs("div", {
                                    className: "space-y-4 text-gray-200",
                                    children: [n.jsxs("div", {
                                        children: [n.jsx("p", {
                                            className: "text-sm text-gray-400 mb-2",
                                            children: "Registration Period"
                                        }), n.jsxs("div", {
                                            className: "space-y-1",
                                            children: [n.jsxs("p", {
                                                children: [n.jsx("span", {
                                                    className: "text-cyan-400 font-medium",
                                                    children: "Start:"
                                                }), " Monday 19th January 2026"]
                                            }), n.jsxs("p", {
                                                children: [n.jsx("span", {
                                                    className: "text-cyan-400 font-medium",
                                                    children: "End:"
                                                }), " Friday 30th January 2026"]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        className: "border-t border-gray-700 pt-4",
                                        children: [n.jsxs("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [n.jsx(m0, {
                                                className: "h-5 w-5 text-green-400 shrink-0"
                                            }), n.jsx("p", {
                                                className: "font-medium",
                                                children: "Class Start: Monday 2nd February 2026"
                                            })]
                                        }), n.jsxs("div", {
                                            className: "mt-4 space-y-3",
                                            children: [n.jsxs("div", {
                                                children: [n.jsx("p", {
                                                    className: "text-sm font-medium text-purple-300 mb-1",
                                                    children: "Online Sessions"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-gray-300",
                                                    children: "3 sessions per week • 45-60 minutes each"
                                                })]
                                            }), n.jsxs("div", {
                                                children: [n.jsx("p", {
                                                    className: "text-sm font-medium text-purple-300 mb-1",
                                                    children: "Face-to-face Sessions"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-gray-300",
                                                    children: "1 session every 3 weeks • Hands-on help & teamwork"
                                                })]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        className: "border-t border-gray-700 pt-4",
                                        children: [n.jsxs("p", {
                                            className: "text-sm font-medium text-yellow-300 mb-3 flex items-center gap-2",
                                            children: [n.jsx(el, {
                                                className: "h-4 w-4"
                                            }), "After school schedule (6PM - 7PM)"]
                                        }), n.jsxs("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [n.jsxs("div", {
                                                className: "bg-gray-700/50 rounded-lg p-3",
                                                children: [n.jsx("p", {
                                                    className: "text-xs text-gray-400 mb-1",
                                                    children: "Ages 10-13"
                                                }), n.jsx("p", {
                                                    className: "text-sm font-medium mb-1",
                                                    children: "Tue, Thu, Sat"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-purple-300 font-medium",
                                                    children: "6PM - 7PM"
                                                })]
                                            }), n.jsxs("div", {
                                                className: "bg-gray-700/50 rounded-lg p-3",
                                                children: [n.jsx("p", {
                                                    className: "text-xs text-gray-400 mb-1",
                                                    children: "Ages 14-16"
                                                }), n.jsx("p", {
                                                    className: "text-sm font-medium mb-1",
                                                    children: "Mon, Wed, Fri"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-purple-300 font-medium",
                                                    children: "6PM - 7PM"
                                                })]
                                            })]
                                        })]
                                    })]
                                })]
                            })]
                        })
                    }), n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all",
                        children: n.jsxs("div", {
                            className: "flex items-start",
                            children: [n.jsx(_s, {
                                className: "h-10 w-10 text-cyan-500 mr-4"
                            }), n.jsxs("div", {
                                children: [n.jsx("h3", {
                                    className: "font-semibold text-xl mb-2",
                                    children: "Age Group"
                                }), n.jsx("p", {
                                    className: "text-gray-300",
                                    children: "Designed for young innovators aged 10-16 years old. No prior experience required - just bring curiosity and creativity!"
                                }), n.jsxs("div", {
                                    className: "flex items-center mt-3 bg-cyan-900/30 rounded-lg px-3 py-2 border border-cyan-600/40 shadow-sm",
                                    children: [n.jsx(xv, {
                                        className: "h-6 w-6 text-yellow-400 mr-2 animate-bounce"
                                    }), n.jsx("span", {
                                        className: "text-cyan-200 text-sm font-medium",
                                        children: "Children slightly outside this age range are welcome to attend for a diagnostic assessment."
                                    })]
                                })]
                            })]
                        })
                    }), n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all",
                        children: n.jsxs("div", {
                            className: "flex items-start",
                            children: [n.jsx(ic, {
                                className: "h-10 w-10 text-purple-500 mr-4"
                            }), n.jsxs("div", {
                                children: [n.jsx("h3", {
                                    className: "font-semibold text-xl mb-2",
                                    children: "Certification"
                                }), n.jsx("p", {
                                    className: "text-gray-300",
                                    children: "Students receive an official Arduino Explorers certificate upon course completion. Perfect for school portfolios and future STEM applications."
                                }), n.jsxs("div", {
                                    className: "flex items-center mt-3 bg-purple-900/30 rounded-lg px-3 py-2 border border-purple-700/40 shadow-sm",
                                    children: [n.jsx(ic, {
                                        className: "h-5 w-5 text-yellow-300 mr-2 animate-bounce"
                                    }), n.jsx("span", {
                                        className: "text-purple-100 text-sm font-medium",
                                        children: "Earn digital badges and showcase your achievements!"
                                    })]
                                })]
                            })]
                        })
                    })]
                })]
            })]
        })
    },
    Qm = ({
        project: s
    }) => {
        const c = o => o.includes("Beginner") ? "from-green-500 to-emerald-500" : o.includes("Intermediate") ? "from-cyan-500 to-blue-500" : o.includes("Advanced") ? "from-purple-500 to-indigo-500" : "from-gray-500 to-gray-600";
        return n.jsxs("div", {
            className: "bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group overflow-hidden",
            children: [n.jsxs("div", {
                className: "p-6",
                children: [n.jsxs("div", {
                    className: "flex items-center space-x-3 mb-4",
                    children: [n.jsx("div", {
                        className: "bg-gray-700/60 p-3 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform",
                        children: s.icon
                    }), n.jsx("h3", {
                        className: "font-semibold text-xl",
                        children: s.title
                    })]
                }), n.jsx("p", {
                    className: "text-gray-300 mb-6 line-clamp-3",
                    children: s.description
                }), n.jsxs("div", {
                    className: "flex flex-wrap gap-2 mb-4",
                    children: [n.jsx("span", {
                        className: `text-xs font-medium px-2.5 py-0.5 rounded-full bg-gradient-to-r ${c(s.difficulty)}`,
                        children: s.difficulty
                    }), n.jsx("span", {
                        className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-700 text-gray-300",
                        children: s.duration
                    })]
                }), n.jsxs("div", {
                    className: "mt-4",
                    children: [n.jsx("h4", {
                        className: "text-sm font-medium text-gray-400 mb-2",
                        children: "Skills learned:"
                    }), n.jsx("div", {
                        className: "flex flex-wrap gap-2",
                        children: s.skills.map((o, u) => n.jsx("span", {
                            className: "text-xs px-2 py-1 rounded bg-gray-700/60 text-gray-300",
                            children: o
                        }, u))
                    })]
                })]
            }), n.jsx("div", {
                className: "border-t border-gray-700 p-4 bg-gray-800/80",
                children: n.jsx("button", {
                    className: "text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium",
                    children: "Learn more →"
                })
            })]
        })
    },
    bv = () => {
        const s = [{
                id: 1,
                title: "Traffic Light Controller",
                icon: n.jsx(wc, {
                    className: "h-6 w-6"
                }),
                description: "Learn to program LED sequences simulating traffic lights. Introduction to basic circuits and conditional logic.",
                difficulty: "Beginner",
                duration: "2 sessions",
                skills: ["LED control", "Conditional logic", "Basic circuits"]
            }, {
                id: 2,
                title: "LED Control with Potentiometer",
                icon: n.jsx(Bm, {
                    className: "h-6 w-6"
                }),
                description: "Control LED brightness using analog input from a potentiometer. Explore variables and analog reading.",
                difficulty: "Beginner",
                duration: "2 sessions",
                skills: ["LED", "Analog input", "Variables", "PWM output"]
            }, {
                id: 3,
                title: "Motion Sensor Alarm",
                icon: n.jsx(rb, {
                    className: "h-6 w-6"
                }),
                description: "Build an alarm system using PIR motion sensors. Learn about digital inputs and creating alert systems.",
                difficulty: "Beginner-Intermediate",
                duration: "3 sessions",
                skills: ["Sensor integration", "Digital I/O", "Piezo speakers"]
            }, {
                id: 4,
                title: "Temperature Monitor & Control",
                icon: n.jsx(tb, {
                    className: "h-6 w-6"
                }),
                description: "Measure temperature using a sensor and control a fan or LED based on the reading. Learn about analog sensors and conditional actions.",
                difficulty: "Beginner",
                duration: "2 sessions",
                skills: ["Analog sensors", "If statements", "Output control"]
            }, {
                id: 5,
                title: "Gravity Meter (Accelerometer Basics)",
                icon: n.jsx(Bm, {
                    className: "h-6 w-6 rotate-90"
                }),
                description: "Use an accelerometer to detect tilt and orientation. Visualize gravity direction with LEDs.",
                difficulty: "Beginner-Intermediate",
                duration: "3 sessions",
                skills: ["Accelerometer", "Data visualization", "Sensor reading"]
            }, {
                id: 6,
                title: "Simple Digital Dice",
                icon: n.jsx(Gl, {
                    className: "h-6 w-6"
                }),
                description: "Create an electronic dice using push buttons and LEDs. Practice random number generation and user input.",
                difficulty: "Beginner",
                duration: "1 session",
                skills: ["Random numbers", "Button input", "LED output"]
            }],
            c = [{
                id: 4,
                title: "Line Following Robot",
                icon: n.jsx(sc, {
                    className: "h-6 w-6"
                }),
                description: "Build a robot that can follow a line using IR sensors. Introduction to motors and advanced sensor usage.",
                difficulty: "Intermediate",
                duration: "4 sessions",
                skills: ["Motor control", "IR sensors", "PID algorithm basics"]
            }, {
                id: 6,
                title: "Obstacle Avoidant Robot",
                icon: n.jsx(sc, {
                    className: "h-6 w-6"
                }),
                description: "Design and program a robot that uses ultrasonic sensors to detect and avoid obstacles autonomously.",
                difficulty: "Intermediate",
                duration: "4 sessions",
                skills: ["Ultrasonic sensors", "Autonomous navigation", "Motor control"]
            }, {
                id: 7,
                title: "Advanced Robotics Challenge",
                icon: n.jsx(Gl, {
                    className: "h-6 w-6"
                }),
                description: "Build a complex robot that can navigate mazes, avoid obstacles, and complete challenges. Capstone project.",
                difficulty: "Advanced",
                duration: "6 sessions",
                skills: ["Multiple sensors", "Complex logic", "Mechanical design"]
            }];
        return n.jsxs("section", {
            id: "courses",
            className: "py-20 relative",
            children: [n.jsxs("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [n.jsx("div", {
                    className: "absolute top-1/3 right-0 w-1/3 h-1/3 bg-cyan-900/20 rounded-full blur-3xl"
                }), n.jsx("div", {
                    className: "absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-purple-900/20 rounded-full blur-3xl"
                })]
            }), n.jsxs("div", {
                className: "container mx-auto px-4 md:px-6 relative",
                children: [n.jsxs("div", {
                    className: "max-w-3xl mx-auto text-center mb-16",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold mb-6",
                        children: n.jsx("span", {
                            className: "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500",
                            children: "Exciting Robotics Projects"
                        })
                    }), n.jsx("p", {
                        className: "text-lg text-gray-200",
                        children: "Our curriculum is designed to make learning electronics and programming fun through hands-on projects. Students progress from simple LED circuits to building complete robots!"
                    })]
                }), n.jsxs("div", {
                    className: "bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-8 mb-16 border border-gray-700",
                    children: [n.jsx("h3", {
                        className: "text-2xl font-semibold mb-4",
                        children: "Introduction to Arduino"
                    }), n.jsx("p", {
                        className: "text-gray-200 mb-6",
                        children: "Every student begins with the fundamentals, learning about electronics, circuits, and the Arduino platform. Our patient instructors ensure even complete beginners feel comfortable with technology concepts."
                    }), n.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",
                        children: [n.jsxs("div", {
                            className: "bg-gray-800/60 rounded-lg p-4 border border-gray-700",
                            children: [n.jsx("h4", {
                                className: "font-medium text-lg mb-2 text-cyan-400",
                                children: "Arduino Basics"
                            }), n.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Learn about the Arduino platform, setup, and programming environment."
                            })]
                        }), n.jsxs("div", {
                            className: "bg-gray-800/60 rounded-lg p-4 border border-gray-700",
                            children: [n.jsx("h4", {
                                className: "font-medium text-lg mb-2 text-purple-400",
                                children: "Electronics Fundamentals"
                            }), n.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Understand circuits, components, and safe electronics handling."
                            })]
                        }), n.jsxs("div", {
                            className: "bg-gray-800/60 rounded-lg p-4 border border-gray-700",
                            children: [n.jsx("h4", {
                                className: "font-medium text-lg mb-2 text-cyan-400",
                                children: "Programming Concepts"
                            }), n.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Introduction to C/C++ programming with Arduino's simplified framework."
                            })]
                        })]
                    })]
                }), n.jsxs("div", {
                    className: "mb-16",
                    children: [n.jsxs("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [n.jsx("h3", {
                            className: "text-2xl font-semibold",
                            children: "Beginner-Friendly Projects"
                        }), n.jsxs("div", {
                            className: "flex gap-2",
                            children: [n.jsx("button", {
                                className: "bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg transition-opacity opacity-70 hover:opacity-100",
                                "aria-label": "Scroll left",
                                type: "button",
                                onClick: () => {
                                    const o = document.getElementById("beginner-projects-scroll");
                                    o && o.scrollBy({
                                        left: -o.offsetWidth * .8,
                                        behavior: "smooth"
                                    })
                                },
                                children: n.jsx("svg", {
                                    className: "h-6 w-6 text-cyan-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M15 19l-7-7 7-7"
                                    })
                                })
                            }), n.jsx("button", {
                                className: "bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg transition-opacity opacity-70 hover:opacity-100",
                                "aria-label": "Scroll right",
                                type: "button",
                                onClick: () => {
                                    const o = document.getElementById("beginner-projects-scroll");
                                    o && o.scrollBy({
                                        left: o.offsetWidth * .8,
                                        behavior: "smooth"
                                    })
                                },
                                children: n.jsx("svg", {
                                    className: "h-6 w-6 text-cyan-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    viewBox: "0 0 24 24",
                                    children: n.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M9 5l7 7-7 7"
                                    })
                                })
                            })]
                        })]
                    }), n.jsxs("div", {
                        className: "relative",
                        children: [n.jsx("div", {
                            className: "pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-900/90 to-transparent z-10"
                        }), n.jsx("div", {
                            className: "pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-900/90 to-transparent z-10"
                        }), n.jsxs("div", {
                            className: "flex gap-4 overflow-x-auto px-1 pt-4",
                            style: {
                                scrollSnapType: "x mandatory",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none"
                            },
                            id: "beginner-projects-scroll",
                            children: [n.jsx("style", {
                                children: `
                  #beginner-projects-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `
                            }), s.map(o => n.jsx("div", {
                                className: "min-w-[85vw] max-w-xs sm:min-w-[320px] flex-shrink-0 scroll-snap-align-start",
                                children: n.jsx(Qm, {
                                    project: o
                                })
                            }, o.id))]
                        })]
                    }), n.jsx("div", {
                        className: "flex justify-center mt-2",
                        children: n.jsxs("span", {
                            className: "flex items-center gap-1 text-cyan-400 text-xs animate-pulse",
                            children: [n.jsx("svg", {
                                className: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                viewBox: "0 0 24 24",
                                children: n.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M9 5l7 7-7 7"
                                })
                            }), "Scroll for more", n.jsx("svg", {
                                className: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                viewBox: "0 0 24 24",
                                children: n.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M15 19l-7-7 7-7"
                                })
                            })]
                        })
                    })]
                }), n.jsx("h3", {
                    className: "text-2xl font-semibold mb-8",
                    children: "Intermediate & Advanced Challenges"
                }), n.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
                    children: c.map(o => n.jsx(Qm, {
                        project: o
                    }, o.id))
                }), n.jsxs("div", {
                    className: "bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl p-8 mt-16 border border-gray-700 text-center",
                    children: [n.jsx("h3", {
                        className: "text-2xl font-semibold mb-4",
                        children: "Course Certification"
                    }), n.jsx("p", {
                        className: "text-gray-200 max-w-3xl mx-auto",
                        children: "Upon completing the core curriculum, students receive an official Arduino Explorers certification. This certificate validates their skills in electronics, programming, and problem-solving - perfect for school portfolios and future STEM applications."
                    })]
                })]
            })]
        })
    },
    vv = ({
        video: s
    }) => {
        const [c, o] = N.useState(!1);
        return n.jsxs("div", {
            className: "bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group",
            children: [n.jsx("div", {
                className: "relative aspect-video",
                children: c ? n.jsx("iframe", {
                    src: `${s.embedUrl}?autoplay=1`,
                    title: s.title,
                    className: "w-full h-full",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowFullScreen: !0
                }) : n.jsxs(n.Fragment, {
                    children: [n.jsx("img", {
                        src: s.thumbnail,
                        alt: s.title,
                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }), n.jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"
                    }), n.jsx("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: n.jsx("button", {
                            onClick: () => o(!0),
                            className: "bg-purple-500/90 hover:bg-purple-500 text-white rounded-full p-4 transition-transform transform group-hover:scale-110",
                            children: n.jsx(Hy, {
                                className: "h-6 w-6 fill-current"
                            })
                        })
                    }), n.jsxs("div", {
                        className: "absolute bottom-3 right-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded flex items-center",
                        children: [n.jsx(el, {
                            className: "h-3 w-3 mr-1"
                        }), s.duration]
                    })]
                })
            }), n.jsxs("div", {
                className: "p-4",
                children: [n.jsx("h3", {
                    className: "font-semibold text-lg mb-2",
                    children: s.title
                }), n.jsx("p", {
                    className: "text-gray-300 text-sm",
                    children: s.description
                })]
            })]
        })
    },
    A0 = ({
        title: s,
        description: c,
        videos: o,
        projects: u,
        ctaText: f = "Inspired to create? Join our next workshop and start your own project!",
        ctaLink: p = "#register",
        titleColor: x = "from-purple-500 to-cyan-500",
        descriptionColor: v = "text-gray-200"
    }) => {
        const [m, g] = N.useState("videos");
        return n.jsxs("section", {
            id: "gallery",
            className: "py-20 relative",
            children: [n.jsxs("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [n.jsx("div", {
                    className: "absolute top-0 right-1/4 w-1/3 h-1/3 bg-purple-900/20 rounded-full blur-3xl"
                }), n.jsx("div", {
                    className: "absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-cyan-900/20 rounded-full blur-3xl"
                })]
            }), n.jsxs("div", {
                className: "container mx-auto px-4 md:px-6 relative",
                children: [n.jsxs("div", {
                    className: "max-w-3xl mx-auto text-center mb-12",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold mb-6",
                        children: n.jsx("span", {
                            className: `bg-clip-text text-transparent bg-gradient-to-r ${x}`,
                            children: s
                        })
                    }), n.jsx("p", {
                        className: `text-lg ${v}`,
                        children: c
                    })]
                }), n.jsx("div", {
                    className: "flex justify-center mb-12",
                    children: n.jsxs("div", {
                        className: "inline-flex bg-gray-800 rounded-lg p-1",
                        children: [n.jsx("button", {
                            onClick: () => g("videos"),
                            className: `px-6 py-2 rounded-md transition-colors ${m==="videos"?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white":"text-gray-300 hover:text-white"}`,
                            children: "Training Videos"
                        }), n.jsx("button", {
                            onClick: () => g("projects"),
                            className: `px-6 py-2 rounded-md transition-colors ${m==="projects"?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white":"text-gray-300 hover:text-white"}`,
                            children: "Student Projects"
                        })]
                    })
                }), m === "videos" && n.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: o.map(y => n.jsx(vv, {
                        video: y
                    }, y.id))
                }), m === "projects" && n.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                    children: u.map(y => n.jsxs("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all group",
                        children: [n.jsxs("div", {
                            className: "relative h-64",
                            children: [n.jsx("img", {
                                src: y.image,
                                alt: y.title,
                                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            }), n.jsx("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"
                            }), n.jsxs("div", {
                                className: "absolute bottom-0 left-0 right-0 p-6",
                                children: [n.jsx("h3", {
                                    className: "text-xl font-semibold text-white",
                                    children: y.title
                                }), n.jsx("p", {
                                    className: "text-cyan-400 text-sm",
                                    children: y.student
                                })]
                            })]
                        }), n.jsx("div", {
                            className: "p-6",
                            children: n.jsx("p", {
                                className: "text-gray-200",
                                children: y.description
                            })
                        })]
                    }, y.id))
                }), n.jsx("div", {
                    className: "text-center mt-12",
                    children: n.jsx("a", {
                        href: p,
                        className: "inline-block text-cyan-400 text-lg underline hover:text-cyan-300 transition-colors",
                        children: f
                    })
                })]
            })]
        })
    },
    M0 = () => {
        const s = {
                name: "Explorer Package",
                description: "Our most popular option with the best value",
                duration: "12-36 weeks (16 sessions)",
                features: ["Comprehensive component kit", "Digital course materials", "Certificate of completion"]
            },
            c = 50,
            o = 20,
            u = 2,
            f = 12,
            p = ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds", "Edinburgh", "Bristol", "Cardiff", "Belfast", "Newcastle upon Tyne", "Sheffield", "Leicester", "Coventry", "Bradford", "Nottingham", "Kingston upon Hull", "Plymouth", "Stoke-on-Trent", "Wolverhampton", "Derby", "Southampton", "Portsmouth", "Brighton", "Reading", "Northampton", "Luton", "Bolton", "Bournemouth", "Norwich", "Swindon", "Southend-on-Sea", "Middlesbrough", "Peterborough", "Cambridge", "Oxford", "Ipswich", "York", "Exeter", "Bath", "Canterbury", "Durham", "Lincoln", "Chester", "Stirling", "Aberdeen", "Dundee", "Inverness", "Perth", "Swansea", "Newport", "Other"],
            [x, v] = N.useState({
                childName: "",
                childAge: "",
                city: "",
                customCity: "",
                parentName: "",
                email: "",
                phone: "",
                agreeTerms: !1,
                numberOfWeeks: 2
            }),
            [m, g] = N.useState({}),
            [y, A] = N.useState({}),
            [C, G] = N.useState(!1),
            O = N.useRef(null),
            V = () => c + o * x.numberOfWeeks,
            E = (X, z) => {
                switch (X) {
                    case "childName":
                        return !z || !z.trim() ? "Student name is required" : z.trim().length < 2 ? "Name must be at least 2 characters" : z.trim().length > 50 ? "Name must be less than 50 characters" : /^[a-zA-Z\s'-]+$/.test(z.trim()) ? "" : "Name can only contain letters, spaces, hyphens, and apostrophes";
                    case "childAge":
                        if (!z || !z.toString().trim()) return "Student age is required";
                        const K = parseInt(z);
                        return isNaN(K) ? "Age must be a valid number" : K < 9 ? "Age must be 9 years or older" : K > 18 ? "Age must be 18 years or younger" : "";
                    case "city":
                        if (!z || !z.trim()) return "City selection is required";
                        if (z.trim() === "Other") {
                            if (!x.customCity || !x.customCity.trim()) return "Please enter your city name";
                            if (x.customCity.trim().length < 2) return "City name must be at least 2 characters";
                            if (x.customCity.trim().length > 50) return "City name must be less than 50 characters"
                        } else if (!p.includes(z.trim())) return "Please select a valid city";
                        return "";
                    case "customCity":
                        if (x.city === "Other") {
                            if (!z || !z.trim()) return "Please enter your city name";
                            if (z.trim().length < 2) return "City name must be at least 2 characters";
                            if (z.trim().length > 50) return "City name must be less than 50 characters"
                        }
                        return "";
                    case "parentName":
                        return !z || !z.trim() ? "Parent/guardian name is required" : z.trim().length < 2 ? "Name must be at least 2 characters" : z.trim().length > 50 ? "Name must be less than 50 characters" : /^[a-zA-Z\s'-]+$/.test(z.trim()) ? "" : "Name can only contain letters, spaces, hyphens, and apostrophes";
                    case "email":
                        return !z || !z.trim() ? "Email address is required" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(z.trim()) ? z.trim().length > 100 ? "Email address is too long" : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(z.trim()) ? "" : "Please enter a valid email address format" : "Please enter a valid email address";
                    case "phone":
                        if (!z || !z.trim()) return "Phone number is required";
                        const P = z.replace(/[\s\-\(\)]/g, "");
                        return /^(\+44|0)[1-9]\d{8,9}$/.test(P) ? P.length < 10 || P.length > 13 ? "Phone number must be between 10 and 13 digits" : "" : "Please enter a valid UK phone number (e.g., 07123456789 or +447123456789)";
                    case "numberOfWeeks":
                        const re = parseInt(z);
                        return isNaN(re) ? `Number of weeks must be between ${u} and ${f}` : re < u || re > f ? `Number of weeks must be between ${u} and ${f}` : "";
                    case "agreeTerms":
                        return z ? "" : "You must agree to the terms and conditions to continue";
                    default:
                        return ""
                }
            },
            D = X => {
                const {
                    name: z,
                    value: K,
                    type: $
                } = X.target, P = X.target.checked, re = $ === "checkbox" ? P : $ === "number" ? parseInt(K) || 0 : K, Q = { ...x,
                    [z]: re
                };
                if (z === "city" && K !== "Other" && (Q.customCity = ""), v(Q), y[z]) {
                    let te = "";
                    z === "city" && K === "Other" ? !Q.customCity || !Q.customCity.trim() ? te = "Please enter your city name" : Q.customCity.trim().length < 2 ? te = "City name must be at least 2 characters" : Q.customCity.trim().length > 50 && (te = "City name must be less than 50 characters") : te = E(z, re), g({ ...m,
                        [z]: te
                    })
                }
                if (z === "city" && (y.customCity || K === "Other")) {
                    const te = E("customCity", Q.customCity);
                    g({ ...m,
                        customCity: te
                    })
                }
                z === "customCity" && Q.city === "Other" && y.city && (!Q.customCity || !Q.customCity.trim() ? g({ ...m,
                    city: "Please enter your city name"
                }) : Q.customCity.trim().length < 2 ? g({ ...m,
                    city: "City name must be at least 2 characters"
                }) : Q.customCity.trim().length > 50 ? g({ ...m,
                    city: "City name must be less than 50 characters"
                }) : g({ ...m,
                    city: ""
                }))
            },
            L = X => {
                const {
                    name: z,
                    type: K
                } = X.target, $ = K === "checkbox" ? X.target.checked : X.target.value;
                A({ ...y,
                    [z]: !0
                });
                const P = E(z, $);
                g({ ...m,
                    [z]: P
                })
            },
            q = X => {
                X.preventDefault(), X.stopPropagation();
                const z = ["childName", "childAge", "city", "parentName", "email", "phone", "numberOfWeeks", "agreeTerms"];
                x.city === "Other" && z.push("customCity");
                const K = {};
                z.forEach(xe => {
                    K[xe] = !0
                }), A(K);
                const $ = {};
                if (z.forEach(xe => {
                        const R = E(xe, x[xe]);
                        R && ($[xe] = R)
                    }), g($), !(Object.keys($).length === 0)) {
                    setTimeout(() => {
                        const xe = Object.keys($);
                        if (xe.length > 0) {
                            const R = xe[0],
                                Z = document.querySelector(`[name="${R}"]`);
                            Z && (Z.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            }), setTimeout(() => {
                                Z.focus()
                            }, 300))
                        }
                    }, 100);
                    return
                }
                const re = V(),
                    Q = x.childName.trim(),
                    te = x.city === "Other" ? x.customCity.trim() : x.city.trim(),
                    je = `Robotics Training - ${`${Q}, ${te}`}`,
                    et = `https://monzo.me/firewbiruu/${re}?d=${encodeURIComponent(je)}&h=LkuIIN`;
                G(!0);
                try {
                    window.location.href = et, setTimeout(() => {
                        window.location.href.includes("monzo.me") || window.location.assign(et)
                    }, 100)
                } catch (xe) {
                    console.error("Redirect error:", xe), window.location.replace(et)
                }
            };
        return n.jsxs("section", {
            id: "register",
            className: "py-20 relative",
            children: [n.jsxs("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [n.jsx("div", {
                    className: "absolute top-1/3 left-0 w-1/3 h-1/3 bg-purple-900/20 rounded-full blur-3xl"
                }), n.jsx("div", {
                    className: "absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-cyan-900/20 rounded-full blur-3xl"
                })]
            }), n.jsxs("div", {
                className: "container mx-auto px-4 md:px-6 relative",
                children: [n.jsxs("div", {
                    className: "max-w-3xl mx-auto text-center mb-12",
                    children: [n.jsx("h2", {
                        className: "text-3xl md:text-4xl font-bold mb-4",
                        children: n.jsx("span", {
                            className: "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500",
                            children: "Register for Robotics Training"
                        })
                    }), n.jsx("p", {
                        className: "text-lg text-gray-200",
                        children: "Join our community of young innovators and start building amazing robotics projects!"
                    })]
                }), n.jsxs("div", {
                    className: "max-w-6xl mx-auto mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700",
                        children: n.jsxs("div", {
                            className: "flex items-start mb-4",
                            children: [n.jsx(jc, {
                                className: "h-6 w-6 text-purple-400 mr-3 mt-1 shrink-0"
                            }), n.jsxs("div", {
                                className: "flex-1",
                                children: [n.jsx("h3", {
                                    className: "text-xl font-semibold mb-4 text-purple-300",
                                    children: "Registration & Schedule"
                                }), n.jsxs("div", {
                                    className: "space-y-4 text-gray-200",
                                    children: [n.jsxs("div", {
                                        children: [n.jsx("p", {
                                            className: "text-sm text-gray-400 mb-2",
                                            children: "Registration Period"
                                        }), n.jsxs("div", {
                                            className: "space-y-1",
                                            children: [n.jsxs("p", {
                                                children: [n.jsx("span", {
                                                    className: "text-cyan-400 font-medium",
                                                    children: "Start:"
                                                }), " Monday 19th January 2026"]
                                            }), n.jsxs("p", {
                                                children: [n.jsx("span", {
                                                    className: "text-cyan-400 font-medium",
                                                    children: "End:"
                                                }), " Friday 30th January 2026"]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        className: "border-t border-gray-700 pt-4",
                                        children: [n.jsxs("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [n.jsx(m0, {
                                                className: "h-5 w-5 text-green-400 shrink-0"
                                            }), n.jsx("p", {
                                                className: "font-medium",
                                                children: "Class Start: Monday 2nd February 2026"
                                            })]
                                        }), n.jsxs("div", {
                                            className: "mt-4 space-y-3",
                                            children: [n.jsxs("div", {
                                                children: [n.jsx("p", {
                                                    className: "text-sm font-medium text-purple-300 mb-1",
                                                    children: "Online Sessions"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-gray-300",
                                                    children: "3 sessions per week • 45-60 minutes each"
                                                })]
                                            }), n.jsxs("div", {
                                                children: [n.jsx("p", {
                                                    className: "text-sm font-medium text-purple-300 mb-1",
                                                    children: "Face-to-face Sessions"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-gray-300",
                                                    children: "1 session every 3 weeks • Hands-on help & teamwork"
                                                })]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        className: "border-t border-gray-700 pt-4",
                                        children: [n.jsxs("p", {
                                            className: "text-sm font-medium text-yellow-300 mb-3 flex items-center gap-2",
                                            children: [n.jsx(el, {
                                                className: "h-4 w-4"
                                            }), "After school schedule (6PM - 7PM)"]
                                        }), n.jsxs("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [n.jsxs("div", {
                                                className: "bg-gray-700/50 rounded-lg p-3",
                                                children: [n.jsx("p", {
                                                    className: "text-xs text-gray-400 mb-1",
                                                    children: "Ages 10-13"
                                                }), n.jsx("p", {
                                                    className: "text-sm font-medium mb-1",
                                                    children: "Tue, Thu, Sat"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-purple-300 font-medium",
                                                    children: "6PM - 7PM"
                                                })]
                                            }), n.jsxs("div", {
                                                className: "bg-gray-700/50 rounded-lg p-3",
                                                children: [n.jsx("p", {
                                                    className: "text-xs text-gray-400 mb-1",
                                                    children: "Ages 14-16"
                                                }), n.jsx("p", {
                                                    className: "text-sm font-medium mb-1",
                                                    children: "Mon, Wed, Fri"
                                                }), n.jsx("p", {
                                                    className: "text-sm text-purple-300 font-medium",
                                                    children: "6PM - 7PM"
                                                })]
                                            })]
                                        })]
                                    })]
                                })]
                            })]
                        })
                    }), n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700",
                        children: n.jsxs("div", {
                            className: "flex items-start mb-4",
                            children: [n.jsx(oc, {
                                className: "h-6 w-6 text-cyan-400 mr-3 mt-1 shrink-0"
                            }), n.jsxs("div", {
                                className: "flex-1",
                                children: [n.jsx("h3", {
                                    className: "text-xl font-semibold mb-4 text-cyan-300",
                                    children: "What Students Will Learn"
                                }), n.jsxs("ul", {
                                    className: "space-y-2.5 text-gray-200 text-sm",
                                    children: [n.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [n.jsx(Xe, {
                                            className: "h-4 w-4 text-green-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "How electronic devices work"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [n.jsx(Xe, {
                                            className: "h-4 w-4 text-green-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Programming microcontrollers (Arduino)"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [n.jsx(Xe, {
                                            className: "h-4 w-4 text-green-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Sensor integration (sound, light, distance, movement)"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [n.jsx(Xe, {
                                            className: "h-4 w-4 text-green-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Motor control and robotics"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [n.jsx(Xe, {
                                            className: "h-4 w-4 text-green-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Problem-solving and presentation skills"
                                        })]
                                    })]
                                })]
                            })]
                        })
                    })]
                }), n.jsx("div", {
                    className: "max-w-6xl mx-auto mb-12",
                    children: n.jsx("div", {
                        className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700",
                        children: n.jsxs("div", {
                            className: "flex items-start mb-4",
                            children: [n.jsx(oc, {
                                className: "h-6 w-6 text-purple-400 mr-3 mt-1 shrink-0"
                            }), n.jsxs("div", {
                                className: "flex-1",
                                children: [n.jsx("h3", {
                                    className: "text-2xl font-semibold mb-4 text-purple-300",
                                    children: "What Will They Build?"
                                }), n.jsx("p", {
                                    className: "text-gray-200 mb-4",
                                    children: "By the end of the course, every student will design and demonstrate a mini robotics project, such as:"
                                }), n.jsxs("ul", {
                                    className: "space-y-3 text-gray-200 mb-6",
                                    children: [n.jsxs("li", {
                                        className: "flex items-start gap-3",
                                        children: [n.jsx(Xe, {
                                            className: "h-5 w-5 text-cyan-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Smart traffic lights"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-3",
                                        children: [n.jsx(Xe, {
                                            className: "h-5 w-5 text-cyan-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Automatic doors"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-3",
                                        children: [n.jsx(Xe, {
                                            className: "h-5 w-5 text-cyan-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Obstacle-avoiding robots"
                                        })]
                                    }), n.jsxs("li", {
                                        className: "flex items-start gap-3",
                                        children: [n.jsx(Xe, {
                                            className: "h-5 w-5 text-cyan-400 shrink-0 mt-0.5"
                                        }), n.jsx("span", {
                                            children: "Smart alarms or bins"
                                        })]
                                    })]
                                }), n.jsxs("div", {
                                    className: "flex items-start gap-3 mt-4 p-4 bg-purple-900/20 rounded-lg border border-purple-700/40",
                                    children: [n.jsx(Cy, {
                                        className: "h-5 w-5 text-purple-300 shrink-0 mt-0.5"
                                    }), n.jsx("p", {
                                        className: "text-gray-200",
                                        children: "Students will present their project at the final session."
                                    })]
                                })]
                            })]
                        })
                    })
                }), n.jsx("div", {
                    className: "max-w-5xl mx-auto",
                    children: n.jsxs("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [n.jsx("div", {
                            className: "lg:col-span-1",
                            children: n.jsx("div", {
                                className: "sticky top-24",
                                children: n.jsxs("div", {
                                    className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500 ring-1 ring-purple-500/50",
                                    children: [n.jsx("div", {
                                        className: "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold py-1 px-4 rounded-full",
                                        children: "Special Offer"
                                    }), n.jsxs("div", {
                                        className: "mb-4",
                                        children: [n.jsx("h3", {
                                            className: "text-xl font-semibold mb-1",
                                            children: s.name
                                        }), n.jsx("p", {
                                            className: "text-gray-300 text-sm",
                                            children: s.description
                                        })]
                                    }), n.jsxs("div", {
                                        className: "mb-6",
                                        children: [n.jsxs("div", {
                                            className: "flex items-baseline flex-wrap gap-2",
                                            children: [n.jsxs("span", {
                                                className: "text-3xl font-bold",
                                                children: ["£", o]
                                            }), n.jsx("span", {
                                                className: "text-red-400 text-xl line-through",
                                                children: "£75"
                                            }), n.jsx("span", {
                                                className: "text-gray-400 text-lg",
                                                children: "per week"
                                            })]
                                        }), n.jsx("p", {
                                            className: "text-gray-400 text-sm mt-2",
                                            children: s.duration
                                        })]
                                    }), n.jsx("ul", {
                                        className: "space-y-2 mb-6",
                                        children: s.features.map((X, z) => n.jsxs("li", {
                                            className: "flex items-start",
                                            children: [n.jsx(ly, {
                                                className: "h-5 w-5 text-cyan-400 mr-2 shrink-0 mt-0.5"
                                            }), n.jsx("span", {
                                                className: "text-gray-200 text-sm",
                                                children: X
                                            })]
                                        }, z))
                                    }), n.jsx("div", {
                                        className: "bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-lg p-4 border border-gray-600",
                                        children: n.jsxs("div", {
                                            className: "space-y-2 text-sm",
                                            children: [n.jsxs("div", {
                                                className: "flex justify-between",
                                                children: [n.jsx("span", {
                                                    className: "text-gray-300",
                                                    children: "Registration fee:"
                                                }), n.jsxs("span", {
                                                    children: ["£", c]
                                                })]
                                            }), n.jsxs("div", {
                                                className: "flex justify-between",
                                                children: [n.jsxs("span", {
                                                    className: "text-gray-300",
                                                    children: ["Weekly fee (", x.numberOfWeeks, " weeks):"]
                                                }), n.jsxs("span", {
                                                    children: ["£", o * x.numberOfWeeks]
                                                })]
                                            }), n.jsx("div", {
                                                className: "border-t border-gray-600 mt-3 pt-3",
                                                children: n.jsxs("div", {
                                                    className: "flex justify-between items-center text-lg font-semibold",
                                                    children: [n.jsx("span", {
                                                        children: "Total:"
                                                    }), n.jsxs("span", {
                                                        className: "text-purple-400",
                                                        children: ["£", V()]
                                                    })]
                                                })
                                            })]
                                        })
                                    })]
                                })
                            })
                        }), n.jsx("div", {
                            className: "lg:col-span-2",
                            children: n.jsxs("form", {
                                ref: O,
                                onSubmit: q,
                                className: "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700",
                                children: [n.jsx("h3", {
                                    className: "text-2xl font-semibold mb-6",
                                    children: "Registration Form"
                                }), n.jsxs("div", {
                                    className: "space-y-6",
                                    children: [n.jsxs("div", {
                                        children: [n.jsxs("h4", {
                                            className: "text-lg font-medium mb-4 text-cyan-400 flex items-center gap-2",
                                            children: [n.jsx(_s, {
                                                className: "h-5 w-5"
                                            }), "Student Details"]
                                        }), n.jsxs("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [n.jsxs("div", {
                                                children: [n.jsx("label", {
                                                    htmlFor: "childName",
                                                    className: "block text-sm font-medium text-gray-300 mb-1",
                                                    children: "Student Name*"
                                                }), n.jsxs("div", {
                                                    className: "relative",
                                                    children: [n.jsx("input", {
                                                        type: "text",
                                                        id: "childName",
                                                        name: "childName",
                                                        value: x.childName,
                                                        onChange: D,
                                                        onBlur: L,
                                                        className: `w-full bg-gray-700 border ${m.childName?"border-red-500 pr-10":y.childName&&!m.childName?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.childName?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                        placeholder: "Full name"
                                                    }), y.childName && n.jsx("div", {
                                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                        children: m.childName ? n.jsx(Oa, {
                                                            className: "h-5 w-5 text-red-500"
                                                        }) : n.jsx(Xe, {
                                                            className: "h-5 w-5 text-green-500"
                                                        })
                                                    })]
                                                }), m.childName && n.jsxs("p", {
                                                    className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                    children: [n.jsx(ea, {
                                                        className: "h-4 w-4"
                                                    }), " ", m.childName]
                                                })]
                                            }), n.jsxs("div", {
                                                children: [n.jsx("label", {
                                                    htmlFor: "childAge",
                                                    className: "block text-sm font-medium text-gray-300 mb-1",
                                                    children: "Student Age* (9-18)"
                                                }), n.jsxs("div", {
                                                    className: "relative",
                                                    children: [n.jsx("input", {
                                                        type: "number",
                                                        id: "childAge",
                                                        name: "childAge",
                                                        min: "9",
                                                        max: "18",
                                                        value: x.childAge,
                                                        onChange: D,
                                                        onBlur: L,
                                                        className: `w-full bg-gray-700 border ${m.childAge?"border-red-500 pr-10":y.childAge&&!m.childAge?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.childAge?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                        placeholder: "Age"
                                                    }), y.childAge && n.jsx("div", {
                                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                        children: m.childAge ? n.jsx(Oa, {
                                                            className: "h-5 w-5 text-red-500"
                                                        }) : n.jsx(Xe, {
                                                            className: "h-5 w-5 text-green-500"
                                                        })
                                                    })]
                                                }), m.childAge && n.jsxs("p", {
                                                    className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                    children: [n.jsx(ea, {
                                                        className: "h-4 w-4"
                                                    }), " ", m.childAge]
                                                })]
                                            }), n.jsxs("div", {
                                                className: "md:col-span-2",
                                                children: [n.jsx("label", {
                                                    htmlFor: "city",
                                                    className: "block text-sm font-medium text-gray-300 mb-1",
                                                    children: "City* (UK)"
                                                }), n.jsxs("div", {
                                                    className: "relative",
                                                    children: [n.jsxs("select", {
                                                        id: "city",
                                                        name: "city",
                                                        value: x.city,
                                                        onChange: D,
                                                        onBlur: L,
                                                        className: `w-full bg-gray-700 border ${m.city?"border-red-500 pr-10":y.city&&!m.city?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.city?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors appearance-none cursor-pointer`,
                                                        required: !0,
                                                        children: [n.jsx("option", {
                                                            value: "",
                                                            children: "Select a city"
                                                        }), p.map(X => n.jsx("option", {
                                                            value: X,
                                                            children: X
                                                        }, X))]
                                                    }), n.jsx(ta, {
                                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                                                    }), y.city && n.jsx("div", {
                                                        className: "absolute right-10 top-1/2 transform -translate-y-1/2",
                                                        children: m.city ? n.jsx(Oa, {
                                                            className: "h-5 w-5 text-red-500"
                                                        }) : n.jsx(Xe, {
                                                            className: "h-5 w-5 text-green-500"
                                                        })
                                                    })]
                                                }), m.city && n.jsxs("p", {
                                                    className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                    children: [n.jsx(ea, {
                                                        className: "h-4 w-4"
                                                    }), " ", m.city]
                                                }), x.city === "Other" && n.jsxs("div", {
                                                    className: "mt-4",
                                                    children: [n.jsx("label", {
                                                        htmlFor: "customCity",
                                                        className: "block text-sm font-medium text-gray-300 mb-1",
                                                        children: "Please specify your city*"
                                                    }), n.jsxs("div", {
                                                        className: "relative",
                                                        children: [n.jsx("input", {
                                                            type: "text",
                                                            id: "customCity",
                                                            name: "customCity",
                                                            value: x.customCity,
                                                            onChange: D,
                                                            onBlur: L,
                                                            className: `w-full bg-gray-700 border ${m.customCity?"border-red-500 pr-10":y.customCity&&!m.customCity?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.customCity?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                            placeholder: "Enter your city name"
                                                        }), y.customCity && n.jsx("div", {
                                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                            children: m.customCity ? n.jsx(Oa, {
                                                                className: "h-5 w-5 text-red-500"
                                                            }) : n.jsx(Xe, {
                                                                className: "h-5 w-5 text-green-500"
                                                            })
                                                        })]
                                                    }), m.customCity && n.jsxs("p", {
                                                        className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                        children: [n.jsx(ea, {
                                                            className: "h-4 w-4"
                                                        }), " ", m.customCity]
                                                    })]
                                                })]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        children: [n.jsx("h4", {
                                            className: "text-lg font-medium mb-4 text-purple-400",
                                            children: "Parent/Guardian Details"
                                        }), n.jsxs("div", {
                                            className: "space-y-4",
                                            children: [n.jsxs("div", {
                                                children: [n.jsx("label", {
                                                    htmlFor: "parentName",
                                                    className: "block text-sm font-medium text-gray-300 mb-1",
                                                    children: "Parent/Guardian Name*"
                                                }), n.jsxs("div", {
                                                    className: "relative",
                                                    children: [n.jsx("input", {
                                                        type: "text",
                                                        id: "parentName",
                                                        name: "parentName",
                                                        value: x.parentName,
                                                        onChange: D,
                                                        onBlur: L,
                                                        className: `w-full bg-gray-700 border ${m.parentName?"border-red-500 pr-10":y.parentName&&!m.parentName?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.parentName?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                        placeholder: "Full name"
                                                    }), y.parentName && n.jsx("div", {
                                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                        children: m.parentName ? n.jsx(Oa, {
                                                            className: "h-5 w-5 text-red-500"
                                                        }) : n.jsx(Xe, {
                                                            className: "h-5 w-5 text-green-500"
                                                        })
                                                    })]
                                                }), m.parentName && n.jsxs("p", {
                                                    className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                    children: [n.jsx(ea, {
                                                        className: "h-4 w-4"
                                                    }), " ", m.parentName]
                                                })]
                                            }), n.jsxs("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [n.jsxs("div", {
                                                    children: [n.jsx("label", {
                                                        htmlFor: "email",
                                                        className: "block text-sm font-medium text-gray-300 mb-1",
                                                        children: "Email Address*"
                                                    }), n.jsxs("div", {
                                                        className: "relative",
                                                        children: [n.jsx("input", {
                                                            type: "email",
                                                            id: "email",
                                                            name: "email",
                                                            value: x.email,
                                                            onChange: D,
                                                            onBlur: L,
                                                            className: `w-full bg-gray-700 border ${m.email?"border-red-500 pr-10":y.email&&!m.email?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.email?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                            placeholder: "email@example.com"
                                                        }), y.email && n.jsx("div", {
                                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                            children: m.email ? n.jsx(Oa, {
                                                                className: "h-5 w-5 text-red-500"
                                                            }) : n.jsx(Xe, {
                                                                className: "h-5 w-5 text-green-500"
                                                            })
                                                        })]
                                                    }), m.email && n.jsxs("p", {
                                                        className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                        children: [n.jsx(ea, {
                                                            className: "h-4 w-4"
                                                        }), " ", m.email]
                                                    })]
                                                }), n.jsxs("div", {
                                                    children: [n.jsx("label", {
                                                        htmlFor: "phone",
                                                        className: "block text-sm font-medium text-gray-300 mb-1",
                                                        children: "Phone Number*"
                                                    }), n.jsxs("div", {
                                                        className: "relative",
                                                        children: [n.jsx("input", {
                                                            type: "tel",
                                                            id: "phone",
                                                            name: "phone",
                                                            value: x.phone,
                                                            onChange: D,
                                                            onBlur: L,
                                                            className: `w-full bg-gray-700 border ${m.phone?"border-red-500 pr-10":y.phone&&!m.phone?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.phone?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`,
                                                            placeholder: "07123456789 or +447123456789"
                                                        }), y.phone && n.jsx("div", {
                                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                            children: m.phone ? n.jsx(Oa, {
                                                                className: "h-5 w-5 text-red-500"
                                                            }) : n.jsx(Xe, {
                                                                className: "h-5 w-5 text-green-500"
                                                            })
                                                        })]
                                                    }), m.phone && n.jsxs("p", {
                                                        className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                        children: [n.jsx(ea, {
                                                            className: "h-4 w-4"
                                                        }), " ", m.phone]
                                                    }), !y.phone && n.jsx("p", {
                                                        className: "mt-1 text-xs text-gray-400",
                                                        children: "UK format: 07123456789 or +447123456789"
                                                    })]
                                                })]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        children: [n.jsxs("h4", {
                                            className: "text-lg font-medium mb-4 text-purple-400 flex items-center gap-2",
                                            children: [n.jsx(el, {
                                                className: "h-5 w-5"
                                            }), "Course Duration"]
                                        }), n.jsxs("div", {
                                            children: [n.jsxs("label", {
                                                htmlFor: "numberOfWeeks",
                                                className: "block text-sm font-medium text-gray-300 mb-1",
                                                children: ["Number of Weeks* (", u, "-", f, " weeks)"]
                                            }), n.jsxs("div", {
                                                className: "relative",
                                                children: [n.jsx("input", {
                                                    type: "number",
                                                    id: "numberOfWeeks",
                                                    name: "numberOfWeeks",
                                                    min: u,
                                                    max: f,
                                                    value: x.numberOfWeeks,
                                                    onChange: D,
                                                    onBlur: L,
                                                    className: `w-full bg-gray-700 border ${m.numberOfWeeks?"border-red-500 pr-10":y.numberOfWeeks&&!m.numberOfWeeks?"border-green-500 pr-10":"border-gray-600"} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${m.numberOfWeeks?"focus:ring-red-500":"focus:ring-purple-500"} transition-colors`
                                                }), y.numberOfWeeks && n.jsx("div", {
                                                    className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                                    children: m.numberOfWeeks ? n.jsx(Oa, {
                                                        className: "h-5 w-5 text-red-500"
                                                    }) : n.jsx(Xe, {
                                                        className: "h-5 w-5 text-green-500"
                                                    })
                                                })]
                                            }), m.numberOfWeeks && n.jsxs("p", {
                                                className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                children: [n.jsx(ea, {
                                                    className: "h-4 w-4"
                                                }), " ", m.numberOfWeeks]
                                            })]
                                        })]
                                    }), n.jsxs("div", {
                                        className: "pt-4 border-t border-gray-700",
                                        children: [n.jsxs("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [n.jsx(xy, {
                                                className: "h-5 w-5 text-purple-400"
                                            }), n.jsx("h4", {
                                                className: "text-lg font-medium text-purple-400",
                                                children: "Payment Information"
                                            })]
                                        }), n.jsxs("div", {
                                            className: "bg-blue-900/20 border border-blue-700/40 rounded-lg p-4 mb-3",
                                            children: [n.jsxs("p", {
                                                className: "text-sm text-gray-200 mb-2",
                                                children: [n.jsx(wy, {
                                                    className: "h-4 w-4 inline mr-1"
                                                }), "You'll pay a one-time registration fee of £", c, " plus weekly fees for ", x.numberOfWeeks, " weeks."]
                                            }), n.jsx("p", {
                                                className: "text-sm text-gray-300",
                                                children: "Upon submitting, you'll be redirected to Monzo to complete secure payment."
                                            })]
                                        })]
                                    }), n.jsx("div", {
                                        className: "pt-4",
                                        children: n.jsxs("div", {
                                            className: `flex items-start p-3 rounded-lg border ${m.agreeTerms?"border-red-500 bg-red-500/10":x.agreeTerms?"border-green-500 bg-green-500/10":"border-gray-700"} transition-colors`,
                                            children: [n.jsx("div", {
                                                className: "flex items-center h-5",
                                                children: n.jsx("input", {
                                                    id: "agreeTerms",
                                                    name: "agreeTerms",
                                                    type: "checkbox",
                                                    checked: x.agreeTerms,
                                                    onChange: D,
                                                    onBlur: L,
                                                    className: "h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
                                                })
                                            }), n.jsxs("div", {
                                                className: "ml-3 flex-1",
                                                children: [n.jsxs("label", {
                                                    htmlFor: "agreeTerms",
                                                    className: `text-sm cursor-pointer ${m.agreeTerms?"text-red-400":"text-gray-300"}`,
                                                    children: ["I agree to the ", n.jsx("a", {
                                                        href: "#",
                                                        className: "text-cyan-400 hover:text-cyan-300 underline",
                                                        children: "Terms of Service"
                                                    }), " and ", n.jsx("a", {
                                                        href: "#",
                                                        className: "text-cyan-400 hover:text-cyan-300 underline",
                                                        children: "Privacy Policy"
                                                    })]
                                                }), m.agreeTerms && n.jsxs("p", {
                                                    className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                                    children: [n.jsx(ea, {
                                                        className: "h-4 w-4"
                                                    }), " ", m.agreeTerms]
                                                })]
                                            })]
                                        })
                                    }), n.jsx("div", {
                                        className: "mt-6",
                                        children: n.jsx(mc, {
                                            type: "submit",
                                            className: "w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-3 text-lg font-semibold",
                                            disabled: C,
                                            children: C ? "Processing..." : `Complete Registration - Pay £${V()}`
                                        })
                                    })]
                                })]
                            })
                        })]
                    })
                }), n.jsxs("div", {
                    className: "max-w-3xl mx-auto mt-20",
                    children: [n.jsx("h3", {
                        className: "text-2xl font-semibold mb-8 text-center",
                        children: "Frequently Asked Questions"
                    }), n.jsxs("div", {
                        className: "space-y-4",
                        children: [n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "Do students need to bring their own equipment?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "No, all necessary equipment and components are provided during the sessions. Students will receive their own Arduino board and component kit to take home at the end of the course."
                            })]
                        }), n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "What if I miss a session?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "If you miss a session, you can join a catch-up class or get the materials and instructions to finish the project at home. Our team is always happy to help if you have questions."
                            })]
                        }), n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "Is there a refund policy?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "Yes, we offer a full refund if cancelled at least 7 days before the course start date. A 50% refund is available if cancelled at least 48 hours before the start date. Unfortunately, we cannot offer refunds after the course has begun."
                            })]
                        }), n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "Can parents stay during the sessions?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "Parents are welcome to stay for the first session to see how things work. After that, we encourage independence, but provide a comfortable waiting area with WiFi for parents who prefer to stay. We also have specific parent showcase days throughout the course."
                            })]
                        }), n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "What is the class size?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "We keep our class sizes small, typically 8-12 students per group, to ensure everyone receives individual attention and support."
                            })]
                        }), n.jsxs("details", {
                            className: "group bg-gray-800/60 rounded-lg",
                            children: [n.jsxs("summary", {
                                className: "flex justify-between items-center font-medium cursor-pointer p-4",
                                children: [n.jsx("span", {
                                    children: "Is prior experience required?"
                                }), n.jsx(ta, {
                                    className: "h-5 w-5 text-cyan-400 group-open:rotate-180 transition-transform"
                                })]
                            }), n.jsx("div", {
                                className: "p-4 pt-0 text-gray-300",
                                children: "No prior experience is required. Our courses are designed for complete beginners as well as those with some experience."
                            })]
                        })]
                    })]
                })]
            })]
        })
    },
    C0 = "/assets/collisionAvoidanceRobot-BYuvirTD.png",
    R0 = "/assets/PIDLineFollower-DOXPVROd.png",
    O0 = "/assets/smartGate-Dl9kzV0D.png",
    D0 = "/assets/smartBin-B8YDpJJb.png",
    Zm = [{
        id: "hero",
        name: "Home",
        description: "Welcome to the main section"
    }, {
        id: "overview",
        name: "Course Overview",
        description: "Explore our course details"
    }, {
        id: "gallery",
        name: "Gallery",
        description: "View our media collection"
    }, {
        id: "registration",
        name: "Registration",
        description: "Sign up for the course"
    }],
    jv = [{
        id: 1,
        title: "Introduction to Arduino Lessons",
        thumbnail: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D",
        embedUrl: "https://www.youtube.com/watch?v=7esocofURpM",
        duration: "12:45",
        description: "A beginner's guide to setting up your Arduino and understanding the basics."
    }, {
        id: 2,
        title: "Creating LED Patterns",
        thumbnail: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg",
        embedUrl: "https://www.youtube.com/embed/W-ViHnLSGIU",
        duration: "8:32",
        description: "Learn to program different LED patterns and sequences with Arduino."
    }, {
        id: 3,
        title: "Collision Avoidance Robot",
        thumbnail: "https://media.istockphoto.com/id/1169970943/photo/robot-back-to-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=gmwGEQhj-BXMvaRh3msoB-Nq2zQNgcGYssUfkUXtCZM=",
        embedUrl: "https://www.youtube.com/embed/QIw0uKusuek",
        duration: "15:21",
        description: "Follow along as we build a simple robot that can move and sense its environment."
    }],
    Nv = [{
        id: 1,
        title: "Collision Avoidance Robot",
        image: C0,
        student: "Yeron & Yabsira",
        description: "A robot that avoids obstacles using ultrasonic sensors."
    }, {
        id: 2,
        title: "PID Line Follower",
        image: R0,
        student: "Nahom & Yisak",
        description: "A robot that follows a line using PID control and infrared sensors."
    }, {
        id: 3,
        title: "Smart Gate",
        image: O0,
        student: "Anavia, Ayda & Nimona",
        description: "A vision-based gate that opens only for vehicles on the whitelist by reading the plate."
    }, {
        id: 4,
        title: "Smart Bin",
        image: D0,
        student: "",
        description: "The bin opens automatically when a person approaches to throw garbage."
    }],
    wv = () => {
        const [s, c] = N.useState(null);
        return n.jsxs("div", {
            className: "min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white",
            children: [n.jsx("nav", {
                "aria-label": "Main Navigation",
                className: "fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-sm shadow-lg",
                children: n.jsx("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: n.jsxs("div", {
                        className: "flex items-center justify-between h-16",
                        children: [n.jsxs("a", {
                            href: "#hero",
                            className: "flex items-center space-x-3 focus:outline-none",
                            children: [n.jsx("img", {
                                src: $n,
                                alt: "Ethronics Logo",
                                className: "h-8 w-8"
                            }), n.jsx("span", {
                                className: "text-xl font-bold text-indigo-300",
                                children: "Ethronics"
                            })]
                        }), n.jsx("ul", {
                            className: "flex space-x-4",
                            children: Zm.map(o => n.jsx("li", {
                                className: "relative",
                                children: n.jsxs("a", {
                                    href: `#${o.id}`,
                                    className: "text-sm font-semibold text-white hover:text-indigo-300 focus:text-indigo-300 transition-colors duration-200 py-2 px-3 rounded-md",
                                    onMouseEnter: () => c(o.id),
                                    onMouseLeave: () => c(null),
                                    onFocus: () => c(o.id),
                                    onBlur: () => c(null),
                                    tabIndex: 0,
                                    children: [o.name, s === o.id && n.jsx("div", {
                                        className: "absolute top-full left-0 mt-2 p-2 bg-gray-700/95 rounded-md text-xs w-52 shadow-lg z-10 animate-fade-in",
                                        children: o.description
                                    })]
                                })
                            }, o.id))
                        })]
                    })
                })
            }), n.jsxs("div", {
                className: "pt-2",
                children: [n.jsx("section", {
                    id: "hero",
                    children: n.jsx(yv, {})
                }), n.jsx("section", {
                    id: "overview",
                    children: n.jsx(bv, {})
                }), n.jsx("section", {
                    id: "gallery",
                    children: n.jsx(A0, {
                        title: "See Our Learning in Action",
                        description: "Watch our training videos and explore amazing projects created by our students. These projects showcase the skills they've developed through our program.",
                        videos: jv,
                        projects: Nv
                    })
                }), n.jsx("section", {
                    id: "registration",
                    children: n.jsx(M0, {})
                })]
            }), n.jsx("footer", {
                className: "bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 py-8",
                children: n.jsxs("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [n.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left",
                        children: [n.jsxs("div", {
                            children: [n.jsxs("a", {
                                href: "#hero",
                                className: "flex items-center justify-center md:justify-start space-x-3 mb-4 focus:outline-none",
                                children: [n.jsx("img", {
                                    src: $n,
                                    alt: "Ethronics Logo",
                                    className: "h-8 w-8"
                                }), n.jsx("span", {
                                    className: "text-xl font-bold text-indigo-300",
                                    children: "Ethronics"
                                })]
                            }), n.jsx("p", {
                                className: "text-gray-400 text-sm",
                                children: "Empowering young innovators through Arduino robotics education."
                            })]
                        }), n.jsxs("div", {
                            children: [n.jsx("h3", {
                                className: "text-lg font-semibold text-indigo-300 mb-4",
                                children: "Quick Links"
                            }), n.jsx("ul", {
                                className: "space-y-2",
                                children: Zm.map(o => n.jsx("li", {
                                    children: n.jsx("a", {
                                        href: `#${o.id}`,
                                        className: "text-gray-300 hover:text-indigo-300 transition-colors duration-200 text-sm",
                                        children: o.name
                                    })
                                }, o.id))
                            })]
                        }), n.jsxs("div", {
                            children: [n.jsx("h3", {
                                className: "text-lg font-semibold text-indigo-300 mb-4",
                                children: "Contact Us"
                            }), n.jsxs("ul", {
                                className: "space-y-2 text-gray-400 text-sm",
                                children: [n.jsx("li", {
                                    children: n.jsx("a", {
                                        href: "mailto:contact@ethronics.org",
                                        className: "hover:text-indigo-300 transition-colors duration-200",
                                        children: "contact@ethronics.org"
                                    })
                                }), n.jsx("li", {
                                    children: n.jsx("a", {
                                        href: "tel:+44-20-1234-5678",
                                        className: "hover:text-indigo-300 transition-colors duration-200",
                                        children: "+44 791 660 2969"
                                    })
                                })]
                            })]
                        })]
                    }), n.jsx("div", {
                        className: "mt-8 pt-8 border-t border-gray-700 text-center",
                        children: n.jsxs("p", {
                            className: "text-gray-400 text-sm",
                            children: ["© ", new Date().getFullYear(), " Ethronics. All rights reserved.", " ", n.jsx("a", {
                                href: "#terms",
                                className: "text-indigo-300 hover:text-indigo-400",
                                children: "Terms of Service"
                            }), " ", "|", " ", n.jsx("a", {
                                href: "#privacy",
                                className: "text-indigo-300 hover:text-indigo-400",
                                children: "Privacy Policy"
                            })]
                        })
                    })]
                })
            })]
        })
    },
    Ev = "/assets/robotis-summer-camp-DNLsgYck.png",
    Sv = {
        en: {
            heroTitle: "Summer Robotic Engineering and AI Training",
            heroDescription: "Join our 8-week training (July 2 - September 4, 2017/18) for grades 4-12. Build robots, learn to code, and have fun with cool projects. No experience needed—start your STEM adventure!",
            heroButton: "Register Now",
            objectiveTitle: "Discover the Fun of Robotics",
            objectiveDescription: "Get ready for an awesome summer training where you’ll build robots, code fun projects, and make new friends. Learn cool stuff and create things you’ll love to show off!",
            objectivePoint1: "Build Robots: Create your own robots with fun tools and see them move!",
            objectivePoint2: "Learn to Code: Use Python and Arduino to make your robots do cool things.",
            objectivePoint3: "Make Smart Projects: Build projects that use sensors to act on their own.",
            objectivePoint4: "Have Fun Creating: Work on exciting challenges and show off your ideas.",
            highlightsTitle: "Training Highlights",
            roboticsTitle: "Robotics",
            roboticsDescription: "Build and program robots with fun tools. Learn how to make them move and work.",
            codingTitle: "Coding",
            codingDescription: "Learn Python and Arduino coding. Make your robots do awesome things.",
            autonomousTitle: "Smart Projects",
            autonomousDescription: "Use sensors to create projects that move and think on their own.",
            faqTitle: "Frequently Asked Questions",
            faqQuestion1: "What will I learn at training?",
            faqAnswer1: "You’ll learn to build and program robots, code with Python and Arduino, and make cool projects that move and sense things!",
            faqQuestion2: "Do I need to know coding or robotics already?",
            faqAnswer2: "Nope! Our training is for beginners and kids with some experience. We’ll teach you everything you need to know.",
            faqQuestion3: "What should I bring to training?",
            faqAnswer3: "Just bring a water bottle, a snack, and your excitement! We provide all the robots, computers, and tools.",
            ctaButton: "Register Now",
            formTitleStudent: "Student Information",
            formTitleGuardian: "Parent/Guardian Information",
            studentName: "Student Name",
            studentAge: "Student Age",
            studentGender: "Student Gender",
            grade: "Grade Level",
            studentEmail: "Student Email",
            school: "School Name",
            experience: "Robotics Experience",
            session: "Preferred Session",
            guardianName: "Parent/Guardian Name",
            guardianEmail: "Parent/Guardian Email",
            emergency: "Emergency Contact Number",
            nextButton: "Next: Guardian Info",
            backButton: "Back",
            submitButton: "Submit Registration",
            submitting: "Submitting...",
            selectGrade: "Select Grade",
            selectExperience: "Select Experience",
            selectSession: "Select Session",
            placeholderName: "Enter full name",
            placeholderEmail: "Enter email",
            placeholderSchool: "Enter school name",
            placeholderGuardianEmail: "Enter email address",
            placeholderEmergency: "Enter phone number",
            errorStudentName: "Student Name is required.",
            errorGrade: "Grade Level is required.",
            errorSchool: "School Name is required.",
            errorStudentAge: "Student Age is required and must be between 6 and 25.",
            errorStudentGender: "Student Gender is required.",
            errorStudentEmail: "Student Email is required.",
            errorExperience: "Robotics Experience is required.",
            errorSession: "Preferred Session is required.",
            errorGuardianName: "Parent/Guardian Name is required.",
            errorGuardianEmail: "Parent/Guardian Email is required.",
            errorEmergency: "Emergency Contact Number is required.",
            apiError: "Failed to submit registration. Please try again.",
            successMessage: "Thank you for registering! We’ll send you a test invitation and results by email or text.",
            languageToggle: "EN",
            step1: "Step 1: Student Info",
            step2: "Step 2: Guardian Info",
            referralCode: "Referral Code",
            referralCodeInfo: "This referral code was applied from the link you used.",
            registrationTitle: "Registration for Summer Training",
            registrationDescription: "Please fill out the form below to register for our Summer Robotics & AI Training. We look forward to seeing you!",
            galleryTitle: "See Our Learning in Action",
            galleryDescription: "Watch our training videos and explore amazing projects created by our students. These projects showcase the skills they've developed through our program."
        },
        am: {
            heroTitle: "የክረምት ሮቦቲክ ምህንድስና እና AI ስልጠና",
            heroDescription: "የ8 ሳምንት ስልጠናችንን (ከሐምሌ 2 - መስከረም 4፣ 2017/18 ዓ.ም) ለ4ኛ-12ኛ ክፍል ተማሪዎች ይቀላቀሉ። ሮቦቶችን ይገንቡ፣ ኮድ ይማሩ፣ እና አስደሳች ፕሮጀክቶችን ይሰሩ። ልምድ አያስፈልግም—የስቴም ጀብዱዎን ይጀምሩ!",
            heroButton: "ይመዝገቡ",
            objectiveTitle: "የሮቦቲክስን ደስታ ያግኙ",
            objectiveDescription: "ለአስደሳች የበጋ ስልጠና ይዘጋጁ፣ ሮቦቶችን ይገንቡ፣ አስደሳች ፕሮጀክቶችን ይኮዱ፣ እና አዳዲስ ጓደኞችን ይፍጠሩ። አሪፍ ነገሮችን ይማሩ እና ለማሳየት የሚወዷቸውን ነገሮች ይፍጠሩ!",
            objectivePoint1: "ሮቦቶችን ይገንቡ፡ በአስደሳች መሣሪያዎች የራስዎን ሮቦቶች ይፍጠሩ እና እንዲንቀሳቀሱ ይመልከቱ!",
            objectivePoint2: "ኮድ መማር፡ ፓይቶን እና አርዱዪኖ ተጠቅመው ሮቦቶችዎ አሪፍ ነገሮች እንዲያደርጉ ያድርጉ።",
            objectivePoint3: "ብልህ ፕሮጀክቶችን ይስሩ፡ በራሳቸው የሚሰሩ ፕሮጀክቶችን በዳሳሾች ይገንቡ።",
            objectivePoint4: "በመፍጠር ይደሰቱ፡ በአስደሳች ተግዳሮቶች ላይ ይሰሩ እና ሀሳቦችዎን ያሳዩ።",
            highlightsTitle: "የስልጠና ድምቀቶች",
            roboticsTitle: "ሮቦቲክስ",
            roboticsDescription: "ሮቦቶችን በመገንባት እና በመፈጠር አስደሳች መሣሪያዎችን ተጠቀም። እንዴት እንደሚንቀሳቀሱ እና እንደሚሰሩ ይማሩ።",
            codingTitle: "ኮዲንግ",
            codingDescription: "ፓይቶን እና አርዱዪኖ ኮዲንግ ይማሩ። ሮቦቶችዎ አስደናቂ ነገሮች እንዲያደርጉ ያድርጉ።",
            autonomousTitle: "አስደናቂ ፕሮጀክቶች",
            autonomousDescription: "ዳሳሾችን ተጠቅመው በራሳቸው የሚንቀሳቀሱ እና የሚያስቡ ፕሮጀክቶችን ይፍጠሩ።",
            faqTitle: "ተደጋጋሚ ጥያቄዎች",
            faqQuestion1: "በስልጠናው ምን እማራለሁ?",
            faqAnswer1: "ሮቦቶችን መገንባትና መፈጠር፣ በፓይቶን እና አርዱዪኖ መኮድ፣ እና የሚንቀሳቀሱ እና የሚያስቡ አሪፍ ፕሮጀክቶችን መስራት ትማራለህ!",
            faqQuestion2: "ኮዲንግ ወይም ሮቦቲክስ መማር አለብኝ?",
            faqAnswer2: "አይደለም! ካምፓችን ለጀማሪዎች እና ለተማሪዎች ተስማሚ ነው። የሚያስፈልግህን ሁሉ እንድትማር እንረዳለን።",
            faqQuestion3: "ወደ ስልጠና ምን መውሰድ አለብኝ?",
            faqAnswer3: "የውሃ ጠርሙስ፣ መክሰስ፣ እና ደስታህን ብቻ አምጣ! ሮቦቶች፣ ኮምፒውተሮች፣ እና መሣሪያዎች ሁሉ እኛ እናቀርባለን።",
            ctaButton: "አሁን ይመዝገቡ",
            formTitleStudent: "የተማሪ መረጃ",
            formTitleGuardian: "የወላጅ/ተጠንቃቂ መረጃ",
            studentName: "የተማሪ ስም",
            studentAge: "የተማሪ ዕድሜ",
            studentGender: "የተማሪ ጾታ",
            grade: "የክፍል ደረጃ",
            studentEmail: "የተማሪ ኢሜል",
            school: "የትምህርት ቤት ስም",
            experience: "የሮቦቲክስ ልምድ",
            session: "ተመራጭ ክፍለ ጊዜ",
            guardianName: "የወላጅ/ተጠንቃቂ ስም",
            guardianEmail: "የወላጅ/ተጠንቃቂ ኢሜል",
            emergency: "የድንገተኛ ግንኙነት ቁጥር",
            nextButton: "ቀጣይ፡ የወላጅ መረጃ",
            backButton: "ተመለስ",
            submitButton: "ምዝገባን አስገባ",
            submitting: "በመላክ ላይ...",
            selectGrade: "ክፍል ይምረጡ",
            selectExperience: "ልምድ ይምረጡ",
            selectSession: "ክፍለ ጊዜ ይምረጡ",
            placeholderName: "ሙሉ ስም ያስገቡ",
            placeholderEmail: "ኢሜል ያስገቡ",
            placeholderSchool: "የትምህርት ቤት ስም ያስገቡ",
            placeholderGuardianEmail: "የኢሜል አድራሻ ያስገቡ",
            placeholderEmergency: "ስልክ ቁጥር ያስገቡ",
            errorStudentName: "የተማሪ ስም ያስፈልጋል።",
            errorStudentAge: "የተማሪ ዕድሜ ያስፈልጋል እና 6 እስከ 25 መካከል መሆን አለበት።",
            errorStudentGender: "የተማሪ ጾታ ያስፈልጋል።",
            errorStudentEmail: "የተማሪ ኢሜል ያስፈልጋል።",
            errorGrade: "የክፍል ደረጃ ያስፈልጋል።",
            errorSchool: "የትምህርት ቤት ስም ያስፈልጋል።",
            errorExperience: "የሮቦቲክስ ልምድ ያስፈልጋል።",
            errorSession: "ተመራጭ ክፍለ ጊዜ ያስፈልጋል።",
            errorGuardianName: "የወላጅ/ተጠንቃቂ ስም ያስፈልጋል።",
            errorGuardianEmail: "የወላጅ/ተጠንቃቂ ኢሜል ያሸፈልጋል።",
            errorEmergency: "የድንገተኛ ግንኙነት ቁጥር ያስፈልጋል።",
            apiError: "ምዝገባን ለማስገባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
            successMessage: "ለመመዝገብ እናመሰግናለን! የሙከራ ግብዣ እና ውጤቶች በኢሜል ወይም በጽሑፍ መልእክት ይላካሉ።",
            languageToggle: "AM",
            step1: "ደረጃ 1፡ የተማሪ መረጃ",
            step2: "ደረጃ 2፡ የወላጅ መረጃ",
            referralCode: "ሪፈራል ኮድ",
            referralCodeInfo: "ይህ ሪፈራል ኮድ ከእርስዎ ተጠቅመውበት ከሆነው ሊንክ ተተግብሯል።",
            registrationTitle: "የክረምት ስልጠና ምዝገባ",
            registrationDescription: "ለክረምት ሮቦቲክስ እና AI ስልጠና ለመመዝገብ እባክዎን ከዚህ በታች ያለውን ቅጽ ይሙሉ። እርስዎን ለማየት በጉጉት እንጠባበቃለን!",
            galleryTitle: "ትምህርታችንን በተግባር ይመልከቱ",
            galleryDescription: "የስልጠና ቪዲዎቻችንን ይመልከቱ እና ተማሪዎቻችን የፈጠሩትን አስደናቂ ፕሮጀክቶች ያስሱ። እነዚህ ፕሮጀክቶች በፕሮግራማችን ውስጥ ያዳበሩትን ችሎታዎች ያሳያሉ።"
        },
        om: {
            heroTitle: "Injinariingii Roobootii Gannaa fi Leenjii AI",
            heroDescription: "Kaampii barnoota torban 8 (Adoolessa 2 - Fulbaana 4, 2017/18) kutaa 4-12f. Robootota ijaaraa, koodii baradhaa, fi hojii ajaa’ibaa waliin bashannanaa. Muuxannoo hin barbaachisu—jalqaba STEM keessan eegalaa!",
            heroButton: "Galmaa'aa",
            objectiveTitle: "Gammachuu Roobootiksii Baradhaa",
            objectiveDescription: "Kaampii barnoota ganna ajaa'ibaa irratti qophaa’aa, robootota ijaaraa, hojii bashannansiisaa koodii, fi hiriyoota haaraa argadhaa. Barnoota ajaa'ibaa baradhaa fi wantoota agarsiisuuf jaallattan uumaa!",
            objectivePoint1: "Robootota Ijaaraa: Meeshaalee bashannansiisaa fayyadamuun robootota keessan ijaaraa fi akka socho’an ilaalaa!",
            objectivePoint2: "Koodii Baradhaa: Phaayitoonii fi Arduino fayyadamuun robootota keessan hojii ajaa'ibaa akka hojjetan godhaa.",
            objectivePoint3: "Hojii Ogeessa Uumaa: Hojii sensaroota fayyadamuun ofiin hojjetan ijaaraa.",
            objectivePoint4: "Uumuu Bashannanaa: Qormaata bashannansiisaa irratti hojjedhaa fi yaada keessan agarsiisaa.",
            highlightsTitle: "Ibsaa Kaampii",
            roboticsTitle: "Robootiksii",
            roboticsDescription: "Meeshaalee bashannansiisaa fayyadamuun robootota ijaaraa fi akka socho’an baradhaa.",
            codingTitle: "Koodii",
            codingDescription: "Phaayitoonii fi Arduino fayyadamuun koodii baradhaa. Robootota keessan hojii ajaa'ibaa akka hojjetan godhaa.",
            autonomousTitle: "Hojii Ogeessa",
            autonomousDescription: "Sensaroota fayyadamuun hojii ofiin socho’an fi yaadan uumaa.",
            faqTitle: "Gaaffilee Barbaachisoo",
            faqQuestion1: "Kaampii irratti maal baradha?",
            faqAnswer1: "Robootota ijaaraa fi koodii Phaayitoonii fi Arduino fayyadamuun hojii ajaa'ibaa hojjechuu baratta!",
            faqQuestion2: "Muuxannoo duraan qabaachuu barbaachisa?",
            faqAnswer2: "Hin barbaachisu! Kaampiin keenya kan jalqabaa fi kan muuxannoo xiqqoo qabuuf qophaa'e.",
            faqQuestion3: "Kaampii irratti maal fiduu qaba?",
            faqAnswer3: "Qaruuraa bishaanii, midhaan xiqqoo, fi gammachuu keessan qofa fidaa! Meeshaalee hundumaa nuti dhiyeessina.",
            ctaButton: "Amma Galmaa'aa",
            formTitleStudent: "Odeeffannoo Barataa",
            formTitleGuardian: "Odeeffannoo Maatii",
            studentName: "Maqaa Barataa",
            studentAge: "Umurii Barataa",
            studentGender: "Koorniyaa Barataa",
            grade: "Kutaa Barnootaa",
            studentEmail: "Imeelii Barataa ",
            school: "Maqaa Mana Barumsaa",
            experience: "Muuxannoo Robootiksii",
            session: "Yeroo Filatamaa",
            guardianName: "Maqaa Maatii",
            guardianEmail: "Imeelii Maatii",
            emergency: "Lakkoofsa Bilbila Ariifachiisaa",
            nextButton: "Itti Fufi: Odeeffannoo Maatii",
            backButton: "Deebi'i",
            submitButton: "Galmee Ergaa",
            submitting: "Ergaa Jira...",
            selectGrade: "Kutaa Filadhaa",
            selectExperience: "Muuxannoo Filadhaa",
            selectSession: "Yeroo Filadhaa",
            placeholderName: "Maqaa guutuu galchaa",
            placeholderEmail: "Imeelii galchaa ",
            placeholderSchool: "Maqaa mana barumsaa galchaa",
            placeholderGuardianEmail: "Imeelii galchaa",
            placeholderEmergency: "Lakkoofsa bilbila galchaa",
            errorStudentName: "Maqaan Barataa barbaachisa.",
            errorStudentGender: "Koorniyaa Barataa barbaachisa.",
            errorStudentEmail: "Imeelii Barataa barbaachisa.",
            errorGrade: "Kutaan Barnootaa barbaachisa.",
            errorSchool: "Maqaan Mana Barumsaa barbaachisa.",
            errorExperience: "Muuxannoo Robootiksii barbaachisa.",
            errorSession: "Yeroo Filatamaa barbaachisa.",
            errorGuardianName: "Maqaan Maatii barbaachisa.",
            errorGuardianEmail: "Imeelii Maatii barbaachisa.",
            errorEmergency: "Lakkoofsi Bilbila Ariifachiisaa barbaachisa.",
            errorStudentAge: "Umuriin Barattootaa kan barbaachisu yoo ta’u, 6 hanga 25 gidduutti ta’uu qaba.",
            apiError: "Galmeen hin milkoofne. Mee irra deebi'aa.",
            successMessage: "Galmee keessan galatoomaa! Imeelii ykn ergaa gabaabaa keessanitti deebii ni ergina.",
            languageToggle: "OM",
            step1: "Kutaa 1: Odeeffannoo Barataa",
            step2: "Kutaa 2: Odeeffannoo Maatii",
            referralCode: "Koodii Reeffaraalaa",
            referralCodeInfo: "Koodiin reeffaraalaa kun liinkii ati fayyadamte irraa kan argame.",
            registrationTitle: "Galmee Leenjii Gannaa",
            registrationDescription: "Leenjii Robotics & AI Gannaa keenyaaf galmaa'uuf unka armaan gadii guutaa. Isin arguuf hawwii guddaan eegganna!",
            galleryTitle: "Barnoota Keenya Gocha Keessatti Ilaalaa",
            galleryDescription: "Viidiyoo barbaachisoo keenya ilaalaa fi proojektoota barattoota keenyaan uumaman kan ajaa’ibsiisoo ta’an saagaa. Proojektoonni kun dandeettii barattoonni keenya prograama keenya keessatti dagaagsan argisiisu."
        }
    },
    _v = () => {
        const [s, c] = N.useState(1), [o, u] = N.useState("en"), [f, p] = N.useState({
            studentName: "",
            studentAge: 0,
            studentGender: "",
            grade: "",
            school: "",
            experience: "",
            session: "",
            guardianName: "",
            guardianEmail: "",
            emergency: ""
        }), x = [{
            id: 1,
            title: "Introduction to Arduino Lessons",
            thumbnail: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D",
            embedUrl: "https://www.youtube.com/watch?v=7esocofURpM",
            duration: "12:45",
            description: "A beginner's guide to setting up your Arduino and understanding the basics."
        }, {
            id: 2,
            title: "Creating LED Patterns",
            thumbnail: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg",
            embedUrl: "https://www.youtube.com/embed/W-ViHnLSGIU",
            duration: "8:32",
            description: "Learn to program different LED patterns and sequences with Arduino."
        }, {
            id: 3,
            title: "Collision Avoidance Robot",
            thumbnail: "https://media.istockphoto.com/id/1169970943/photo/robot-back-to-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=gmwGEQhj-BXMvaRh3msoB-Nq2zQNgcGYssUfkUXtCZM=",
            embedUrl: "https://www.youtube.com/embed/QIw0uKusuek",
            duration: "15:21",
            description: "Follow along as we build a simple robot that can move and sense its environment."
        }], v = [{
            id: 1,
            title: "Collision Avoidance Robot",
            image: C0,
            student: "Yeron & Yabsira",
            description: "A robot that avoids obstacles using ultrasonic sensors."
        }, {
            id: 2,
            title: "PID Line Follower",
            image: R0,
            student: "Nahom & Yisak",
            description: "A robot that follows a line using PID control and infrared sensors."
        }, {
            id: 3,
            title: "Smart Gate",
            image: O0,
            student: "Anavia, Ayda & Nimona",
            description: "A vision-based gate that opens only for vehicles on the whitelist by reading the plate."
        }, {
            id: 4,
            title: "Smart Bin",
            image: D0,
            student: "",
            description: "The bin opens automatically when a person approaches to throw garbage."
        }], [m, g] = N.useState({}), [y, A] = N.useState(!1), [C, G] = N.useState(null), [O, V] = N.useState(null), E = Sv[o], D = () => {
            const Q = {};
            return f.studentName.trim() || (Q.studentName = E.errorStudentName), (!f.studentAge || f.studentAge < 6 || f.studentAge > 25) && (Q.studentAge = E.errorStudentAge), f.studentGender || (Q.studentGender = E.errorStudentGender), f.grade || (Q.grade = E.errorGrade), f.school.trim() || (Q.school = E.errorSchool), f.experience || (Q.experience = E.errorExperience), f.studentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.studentEmail) && (Q.studentEmail = E.errorStudentEmail), Q
        }, L = () => {
            const Q = {};
            return f.guardianName.trim() || (Q.guardianName = E.errorGuardianName), (!f.guardianEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.guardianEmail)) && (Q.guardianEmail = E.errorGuardianEmail), (!f.emergency.trim() || !/^\+?\d{9,15}$/.test(f.emergency)) && (Q.emergency = E.errorEmergency), Q
        }, q = async Q => {
            Q.preventDefault(), console.log("Form submitted, formData:", f);
            const te = L();
            if (Object.keys(te).length > 0) {
                console.log("Validation errors:", te), g(te);
                return
            }
            A(!0), G(null);
            const me = "https://summer-registration.onrender.com`";
            console.log("API URL:", me), console.log("Payload:", JSON.stringify(f, null, 2));
            try {
                const je = await fetch(`${me}/api/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(f)
                });
                if (console.log("Response status:", je.status), !je.ok) {
                    let xe = E.apiError;
                    try {
                        const R = await je.json();
                        if (console.log("Server response error:", R), R.errors) {
                            const Z = {};
                            R.errors.forEach(I => {
                                Z[I.param] = I.msg
                            }), g(Z);
                            return
                        } else R.message && (xe = R.message)
                    } catch (R) {
                        console.error("Failed to parse error response:", R)
                    }
                    throw new Error(xe)
                }
                const et = await je.json();
                console.log("Response data:", et), c(3), p({
                    studentName: "",
                    studentAge: 0,
                    studentGender: "",
                    grade: "",
                    studentEmail: "",
                    school: "",
                    experience: "",
                    session: "",
                    guardianName: "",
                    guardianEmail: "",
                    emergency: ""
                }), g({})
            } catch (je) {
                console.error("Fetch error:", je), G(je.message === "Failed to fetch" ? "Cannot connect to server. Please try again later." : je.message || E.apiError)
            } finally {
                A(!1)
            }
        }, X = Q => {
            const {
                id: te,
                value: me
            } = Q.target;
            if (te === "studentAge") {
                const je = parseInt(me);
                p({ ...f,
                    [te]: isNaN(je) ? 0 : je
                }), isNaN(je) || je < 6 || je > 25 ? g({ ...m,
                    studentAge: E.errorStudentAge
                }) : g({ ...m,
                    studentAge: ""
                })
            } else te === "studentEmail" || te === "guardianEmail" ? (p({ ...f,
                [te]: me
            }), me && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(me) ? g({ ...m,
                [te]: E[te === "studentEmail" ? "errorStudentEmail" : "errorGuardianEmail"]
            }) : g({ ...m,
                [te]: ""
            })) : te === "emergency" ? (p({ ...f,
                [te]: me
            }), me && !/^\+?\d{9,15}$/.test(me) ? g({ ...m,
                emergency: E.errorEmergency
            }) : g({ ...m,
                emergency: ""
            })) : (p({ ...f,
                [te]: me
            }), g({ ...m,
                [te]: ""
            }));
            G(null)
        }, z = () => {
            u(Q => Q === "en" ? "am" : Q === "am" ? "om" : "en")
        }, K = () => {
            const Q = D();
            if (Object.keys(Q).length > 0) {
                g(Q);
                return
            }
            c(2), g({})
        }, $ = () => {
            c(s - 1), g({}), G(null)
        }, P = () => {
            c(1), p({
                studentName: "",
                studentAge: 0,
                studentGender: "",
                grade: "",
                studentEmail: "",
                school: "",
                experience: "",
                session: "",
                guardianName: "",
                guardianEmail: "",
                emergency: ""
            }), g({}), G(null)
        }, re = Q => {
            V(O === Q ? null : Q)
        };
        return n.jsxs("section", {
            className: `py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden ${o==="am"?"font-noto-ethiopic":"font-sans"}`,
            role: "region",
            "aria-label": E.heroTitle,
            children: [n.jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative",
                children: [n.jsxs("div", {
                    className: "flex flex-col lg:flex-row items-center mb-16 md:mb-20",
                    children: [n.jsxs("div", {
                        className: "lg:w-1/2 mb-10 lg:mb-0 animate-fade-in",
                        children: [n.jsx("h2", {
                            className: "text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight",
                            children: E.heroTitle
                        }), n.jsx("p", {
                            className: "text-lg sm:text-xl md:text-2xl text-cyan-200 mb-8 max-w-lg",
                            children: E.heroDescription
                        }), n.jsx("a", {
                            href: "#register",
                            className: "inline-block px-8 py-4 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                            "aria-label": E.heroButton,
                            children: E.heroButton
                        })]
                    }), n.jsx("div", {
                        className: "lg:w-1/2",
                        children: n.jsx("img", {
                            src: Ev,
                            alt: "Robotics training in action",
                            className: "w-full h-72 sm:h-96 lg:h-[28rem] object-cover rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in delay-100"
                        })
                    })]
                }), n.jsx("div", {
                    className: "mb-16 md:mb-20 py-12 bg-gradient-to-r from-purple-800/30 to-transparent rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.5)] text-center relative",
                    style: {
                        backgroundImage: "linear-gradient(to right, rgba(107, 33, 168, 0.3), transparent), url('/assets/robotics-bg.jpg')",
                        backgroundPosition: "right center",
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed"
                    },
                    children: n.jsxs("div", {
                        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:pl-8 text-left",
                        children: [n.jsx("h3", {
                            className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in",
                            children: E.objectiveTitle
                        }), n.jsx("p", {
                            className: "text-base sm:text-lg md:text-xl text-cyan-200 mb-8 max-w-2xl animate-fade-in delay-200",
                            children: E.objectiveDescription
                        }), n.jsx("ul", {
                            className: "space-y-4 max-w-2xl",
                            role: "list",
                            "aria-label": "training Objectives",
                            children: [1, 2, 3, 4].map(Q => n.jsxs("li", {
                                className: "flex items-start text-cyan-200 hover:text-white transition-all duration-200 animate-fade-in relative z-10",
                                style: {
                                    animationDelay: `${300+Q*100}ms`
                                },
                                children: [n.jsx("svg", {
                                    className: "w-6 h-6 mr-3 text-purple-200 flex-shrink-0 mt-1",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: n.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M5 13l4 4L19 7"
                                    })
                                }), n.jsx("span", {
                                    className: "text-sm sm:text-base",
                                    children: E[`objectivePoint${Q}`]
                                })]
                            }, Q))
                        })]
                    })
                }), n.jsxs("div", {
                    className: "mb-16 md:mb-20",
                    children: [n.jsx("h3", {
                        className: "text-3xl sm:text-3xl md:text-4xl font-extrabold text-white mb-10 text-center",
                        children: E.highlightsTitle
                    }), n.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: [n.jsxs("div", {
                            className: "bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-200",
                            children: [n.jsxs("div", {
                                className: "flex items-center mb-6",
                                children: [n.jsx(bs, {
                                    className: "w-10 h-10 text-cyan-200 mr-4"
                                }), n.jsx("h4", {
                                    className: "text-2xl font-semibold text-cyan-200",
                                    children: E.roboticsTitle
                                })]
                            }), n.jsx("p", {
                                className: "text-base text-cyan-200",
                                children: E.roboticsDescription
                            })]
                        }), n.jsxs("div", {
                            className: "bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-300",
                            children: [n.jsxs("div", {
                                className: "flex items-center mb-6",
                                children: [n.jsx(zm, {
                                    className: "w-10 h-10 text-cyan-200 mr-4"
                                }), n.jsx("h4", {
                                    className: "text-2xl font-semibold text-cyan-200",
                                    children: E.codingTitle
                                })]
                            }), n.jsx("p", {
                                className: "text-base text-cyan-200",
                                children: E.codingDescription
                            })]
                        }), n.jsxs("div", {
                            className: "bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-400",
                            children: [n.jsxs("div", {
                                className: "flex items-center mb-6",
                                children: [n.jsx(Gl, {
                                    className: "w-10 h-10 text-cyan-200 mr-4"
                                }), n.jsx("h4", {
                                    className: "text-2xl font-semibold text-cyan-200",
                                    children: E.autonomousTitle
                                })]
                            }), n.jsx("p", {
                                className: "text-base text-cyan-200",
                                children: E.autonomousDescription
                            })]
                        })]
                    })]
                }), n.jsx("div", {
                    className: "fixed bottom-1 right-6 z-20 md:hidden",
                    children: n.jsx("a", {
                        href: "#register",
                        className: "inline-block px-6 py-2 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_20px_rgba(34,211,238,0.9)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                        "aria-label": E.ctaButton,
                        children: E.ctaButton
                    })
                }), n.jsx("section", {
                    id: "gallery",
                    children: n.jsx(A0, {
                        title: E.galleryTitle,
                        description: E.galleryDescription,
                        videos: x,
                        projects: v,
                        titleColor: "text-3xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 text-center",
                        descriptionColor: "text-lg sm:text-xl md:text-2xl text-cyan-600 mb-8"
                    })
                }), n.jsxs("div", {
                    className: "max-w-3xl mx-auto text-center mb-6 px-4",
                    children: [n.jsx("h2", {
                        className: "text-2xl sm:text-3xl font-bold mb-3",
                        children: n.jsx("span", {
                            className: "text-2xl sm:text-3xl font-extrabold text-white",
                            children: E.registrationTitle
                        })
                    }), n.jsx("p", {
                        className: "text-base sm:text-lg text-gray-200",
                        children: E.registrationDescription
                    })]
                }), n.jsxs("div", {
                    id: "register",
                    className: "max-w-3xl mx-auto bg-gray-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-[0_0_10px_rgba(34,211,238,0.3)]",
                    children: [n.jsx("div", {
                        className: "flex justify-center overflow-x-auto mb-4",
                        children: n.jsxs("div", {
                            className: "flex items-center space-x-3 min-w-[280px]",
                            children: [n.jsxs("div", {
                                className: `flex items-center ${s===1?"text-cyan-200":"text-gray-400"}`,
                                children: [n.jsx("span", {
                                    className: `w-7 h-7 flex items-center justify-center rounded-full text-xs ${s>=1?"bg-purple-500":"bg-gray-600"}`,
                                    children: "1"
                                }), n.jsx("span", {
                                    className: "ml-2 text-xs font-medium",
                                    children: E.step1
                                })]
                            }), n.jsx("div", {
                                className: `w-8 h-1 ${s>=2?"bg-purple-500":"bg-gray-600"}`
                            }), n.jsxs("div", {
                                className: `flex items-center ${s===2?"text-cyan-200":"text-gray-400"}`,
                                children: [n.jsx("span", {
                                    className: `w-7 h-7 flex items-center justify-center rounded-full text-xs ${s>=2?"bg-purple-500":"bg-gray-600"}`,
                                    children: "2"
                                }), n.jsx("span", {
                                    className: "ml-2 text-xs font-medium",
                                    children: E.step2
                                })]
                            }), n.jsx("div", {
                                className: `w-8 h-1 ${s>=3?"bg-purple-500":"bg-gray-600"}`
                            }), n.jsxs("div", {
                                className: `flex items-center ${s===3?"text-cyan-200":"text-gray-400"}`,
                                children: [n.jsx("span", {
                                    className: `w-7 h-7 flex items-center justify-center rounded-full text-xs ${s>=3?"bg-purple-500":"bg-gray-600"}`,
                                    children: "3"
                                }), n.jsx("span", {
                                    className: "ml-2 text-xs font-medium",
                                    children: o === "en" ? "Next Steps" : o === "am" ? "ቀጣይ ደረጃዎች" : "Sadarkaawwan ittaanu"
                                })]
                            })]
                        })
                    }), n.jsx("h3", {
                        className: "text-lg sm:text-xl font-extrabold text-white mb-4 text-center",
                        children: s === 1 ? E.formTitleStudent : s === 2 ? E.formTitleGuardian : o === "en" ? "Registration Successful!" : o === "am" ? "ምዝገባ ተሳክቷል!" : "Galmeen milkaa’e!"
                    }), C && n.jsx("div", {
                        className: "mb-4 p-2 bg-red-900/50 text-red-200 rounded-lg text-xs text-center",
                        children: C
                    }), s === 3 ? n.jsxs("div", {
                        className: "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-purple-900/80 backdrop-blur-lg p-6 sm:p-10 rounded-2xl border-2 border-cyan-400 shadow-[0_8px_32px_rgba(34,211,238,0.25)] animate-fade-in",
                        children: [n.jsxs("div", {
                            className: "flex flex-col items-center justify-center mb-6",
                            children: [n.jsx(Xe, {
                                className: "w-10 h-10 text-green-400 mb-2 drop-shadow-lg"
                            }), n.jsx("h4", {
                                className: "text-2xl font-bold text-cyan-100 text-center drop-shadow",
                                children: o === "en" ? `Congratulations, ${f.studentName}!` : o === "am" ? `እንኳን ደስ ያለዎት, ${f.studentName}!` : `Baga gammade, ${f.studentName}!`
                            }), n.jsx("p", {
                                className: "text-base text-cyan-200 mt-2 text-center max-w-xl",
                                children: o === "en" ? "Registration complete! Follow these steps to secure your spot." : o === "am" ? "ምዝገባዎ ተጠናቋል! ቦታዎን ለመጠበቅ እነዚህን ደረጃዎች ይከተሉ።" : "Galmeen xumurame! Bakka keessan eeguuf sadarkaawwanan hordofaa."
                            })]
                        }), n.jsx("div", {
                            className: "mb-6 p-4 bg-cyan-900/30 border-l-4 border-yellow-400 rounded-lg text-cyan-100 text-sm sm:text-base",
                            children: o === "en" ? n.jsxs(n.Fragment, {
                                children: [n.jsx("b", {
                                    children: "Important:"
                                }), " Please pay the ", n.jsx("b", {
                                    children: "200 ETB"
                                }), " pre-registration fee to the following CBE account: ", n.jsx("b", {
                                    children: "1000535286942"
                                }), " (FIREW ABERA BIRU).", n.jsx("br", {}), "After payment, send the transaction screenshot to our ", n.jsx("a", {
                                    href: "https://t.me/YohannesEthronics",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "underline hover:text-cyan-300",
                                    children: "Telegram"
                                }), " account.", n.jsx("br", {}), "You will receive your official receipt from Ethronics on the exam day."]
                            }) : o === "am" ? n.jsxs(n.Fragment, {
                                children: [n.jsx("b", {
                                    children: "አስፈላጊ:"
                                }), " ", n.jsx("b", {
                                    children: "200 ብር"
                                }), " የቅድመ-ምዝገባ ክፍያዎን ወደዚህ የCBE መለያ ቁጥር ይክፈሉ፡ ", n.jsx("b", {
                                    children: "1000535286942"
                                }), " (FIREW ABERA BIRU)።", n.jsx("br", {}), "ክፍያውን ካከናወኑ በኋላ የግብይት ስክሪንሾትን ወደ ", n.jsx("a", {
                                    href: "https://t.me/YohannesEthronics",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "underline hover:text-cyan-300",
                                    children: "Telegram"
                                }), " አካውንታችን ይላኩ።", n.jsx("br", {}), "የኢትሮኒክስ ደረሰኙን በፈተናው ቀን ያገኛሉ።"]
                            }) : n.jsxs(n.Fragment, {
                                children: [n.jsx("b", {
                                    children: "Murteessaa:"
                                }), " Kaffaltii ", n.jsx("b", {
                                    children: "200 Qarshii"
                                }), " pre-registration gara lakkoofsa CBE kanaatti raawwachiisaa: ", n.jsx("b", {
                                    children: "1000535286942"
                                }), " (FIREW ABERA BIRU).", n.jsx("br", {}), "Erga kaffaltanii booda, suuraa ragaa tajaajila ", n.jsx("a", {
                                    href: "https://t.me/YohannesEthronics",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "underline hover:text-cyan-300",
                                    children: "Telegram"
                                }), " keenya irratti nuuf ergaa.", n.jsx("br", {})]
                            })
                        }), n.jsxs("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4",
                            children: [n.jsxs("div", {
                                className: "flex items-start gap-3",
                                children: [n.jsx(Ec, {
                                    className: "w-6 h-6 text-purple-300 mt-1 flex-shrink-0"
                                }), n.jsxs("div", {
                                    children: [n.jsx("h5", {
                                        className: "text-base font-semibold text-white mb-1",
                                        children: o === "en" ? "Registration Fee" : o === "am" ? "የምዝገባ ክፍያ" : "Kaffaltii galmee"
                                    }), n.jsx("div", {
                                        className: "text-sm text-cyan-200 space-y-1",
                                        children: o === "en" ? n.jsxs(n.Fragment, {
                                            children: [n.jsxs("span", {
                                                children: ["Pay ", n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "200 ETB"
                                                }), " (non-refundable pre-registration fee) at ", n.jsx("span", {
                                                    className: "font-semibold text-white",
                                                    children: "Ethronics Robotics, AMG 9th Floor, Mebrat Hail, Adama, Ethiopia"
                                                }), ". Mon–Sat, 9 AM–5 PM."]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: [n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "1,000 ETB"
                                                }), " registration fee is paid after passing the diagnostic exam."]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: ["Monthly fee: ", n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "6,800 ETB"
                                                }), "."]
                                            })]
                                        }) : o === "am" ? n.jsxs(n.Fragment, {
                                            children: [n.jsxs("span", {
                                                children: [n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "200 ብር"
                                                }), " (የቅድመ-ምዝገባ ክፍያ፣ ተመላሽ የማይደረግ) በ", n.jsx("span", {
                                                    className: "font-semibold text-white",
                                                    children: "Ethronics Robotics, AMG 9ኛ ፎቅ, መብራት ኃይል, አዳማ"
                                                }), " ይክፈሉ። ሰኞ–ቅዳሜ፣ 3፡00–11፡00 ሰዓት።"]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: [n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "1,000 ብር"
                                                }), " የምዝገባ ክፍያ ከማጣሪያ ፈተና በኋላ ይክፈላል።"]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: ["ወርሃዊ ክፍያ፡ ", n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "6,800 ብር"
                                                }), "።"]
                                            })]
                                        }) : n.jsxs(n.Fragment, {
                                            children: [n.jsxs("span", {
                                                children: [n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "200 Qarshii"
                                                }), " (pre-registration, hin deebi’amne) ", n.jsx("span", {
                                                    className: "font-semibold text-white",
                                                    children: "Ethronics Robotics, AMG 9ffaa, Mebrat Hail, Adama, Itoophiyaa"
                                                }), " keessatti kaffalaa. Wiixii–Ji’oolii, 3:00–11:00."]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: [n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "1,000 Qarshii"
                                                }), " galmee booda, maqa filannoo darbanii booda kaffalama."]
                                            }), n.jsx("br", {}), n.jsxs("span", {
                                                children: ["Kaffaltii ji’aa: ", n.jsx("b", {
                                                    className: "text-purple-200",
                                                    children: "6,800 Qarshii"
                                                }), "."]
                                            })]
                                        })
                                    })]
                                })]
                            }), n.jsxs("div", {
                                className: "flex items-start gap-3",
                                children: [n.jsx(el, {
                                    className: "w-6 h-6 text-purple-300 mt-1 flex-shrink-0"
                                }), n.jsxs("div", {
                                    children: [n.jsx("h5", {
                                        className: "text-base font-semibold text-white mb-1",
                                        children: o === "en" ? "Session Preference" : o === "am" ? "የስልጠና ሰዓት ምርጫ" : "Filannoo Sa’aatii"
                                    }), n.jsx("p", {
                                        className: "text-sm text-cyan-200",
                                        children: o === "en" ? "Your session choice is subject to change based on majority vote." : o === "am" ? "የመረጡት የስልጠና ሰዓት በብዙሃኑ ድምፅ መሰረት ሊለወጥ ይችላል።" : "Filannoon sa’aatii keessan sagantaa dhaabbataa irratti hundaa’ee jijjiiramuu danda’a."
                                    })]
                                })]
                            }), n.jsxs("div", {
                                className: "flex items-start gap-3",
                                children: [n.jsx(jc, {
                                    className: "w-6 h-6 text-purple-300 mt-1 flex-shrink-0"
                                }), n.jsxs("div", {
                                    children: [n.jsx("h5", {
                                        className: "text-base font-semibold text-white mb-1",
                                        children: o === "en" ? "Payment Deadline" : o === "am" ? "የክፍያ ገደብ" : "Baka kaffaltii"
                                    }), n.jsx("p", {
                                        className: "text-sm text-cyan-200",
                                        children: o === "en" ? "Complete payment before the diagnostic exam, June 30 – July 4, 2017 E.C." : o === "am" ? "ክፍያዎን ከሰኔ 30– ሀምሌ 4፣ 2017 ዓ.ም ማጣሪያ ፈተና በፊት ይጠንቀቁ።" : "Kaffaltii Waxabajjii 30– Adoolessa 4, 2017 A.L.I. dura xumuraa."
                                    })]
                                })]
                            }), n.jsxs("div", {
                                className: "flex items-start gap-3",
                                children: [n.jsx(Gl, {
                                    className: "w-6 h-6 text-purple-300 mt-1 flex-shrink-0"
                                }), n.jsxs("div", {
                                    children: [n.jsx("h5", {
                                        className: "text-base font-semibold text-white mb-1",
                                        children: o === "en" ? "Diagnostic Exam" : o === "am" ? "ማጣሪያ ፈተና" : "Roomii Filannoo"
                                    }), n.jsx("p", {
                                        className: "text-sm text-cyan-200",
                                        children: o === "en" ? "Post-payment, take the diagnostic exam to secure final admission." : o === "am" ? "ክፍያ በኋላ፣ የመጨረሻ ተቀባይነት ለማግኘት ማጣሪያ ፈተና ይውሰዱ።" : "Kaffaltii booda, bakka itti galuuf roomii filannoo fudhachaa."
                                    })]
                                })]
                            }), n.jsxs("div", {
                                className: "flex items-start gap-3 md:col-span-2",
                                children: [n.jsx(vs, {
                                    className: "w-6 h-6 text-purple-300 mt-1 flex-shrink-0"
                                }), n.jsxs("div", {
                                    children: [n.jsx("h5", {
                                        className: "text-base font-semibold text-white mb-1",
                                        children: o === "en" ? "Contact Us" : o === "am" ? "ያግኙን" : "Nu qunnamaa"
                                    }), n.jsxs("p", {
                                        className: "text-sm text-cyan-200",
                                        children: [o === "en" ? "Call " : o === "am" ? "ለጥያቄ " : "Gaaffii yoo qabaattan ", n.jsx("a", {
                                            href: "tel:0978467467",
                                            className: "underline hover:text-cyan-300 transition",
                                            children: "0978467467"
                                        }), "/", n.jsx("a", {
                                            href: "tel:0955414045",
                                            className: "underline hover:text-cyan-300 transition",
                                            children: "0955414045"
                                        }), o === "en" ? " for inquiries." : o === "am" ? " ይደውሉ።" : " bilbilaa."]
                                    })]
                                })]
                            })]
                        }), n.jsxs("div", {
                            className: "mt-6 flex flex-col sm:flex-row justify-center gap-3",
                            children: [n.jsx("button", {
                                onClick: P,
                                className: "px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base",
                                "aria-label": o === "en" ? "Start Over to register another student" : o === "am" ? "እንደገና ጀምር" : "Irra deebi’aa",
                                children: o === "en" ? "Register Another Student" : o === "am" ? "ሌላ ተማሪ መመዝገብ" : "Barataa biraa galchaa"
                            }), n.jsx("a", {
                                href: "mailto:info@ethronics.com",
                                className: "px-6 py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base",
                                "aria-label": "Contact us for inquiries",
                                children: o === "en" ? "Contact Us" : o === "am" ? "ያግኙን" : "Nu qunnamaa"
                            })]
                        })]
                    }) : n.jsxs("form", {
                        onSubmit: q,
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [s === 1 && n.jsxs(n.Fragment, {
                            children: [n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "studentName",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(qm, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.studentName]
                                }), n.jsx("input", {
                                    type: "text",
                                    id: "studentName",
                                    value: f.studentName,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.studentName?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.studentName,
                                    "aria-describedby": m.studentName ? "studentName-error" : void 0,
                                    placeholder: E.placeholderName
                                }), m.studentName && n.jsx("p", {
                                    id: "studentName-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.studentName
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "studentAge",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx("span", {
                                        className: "w-5 h-5 mr-2 flex items-center justify-center",
                                        children: n.jsxs("svg", {
                                            width: "20",
                                            height: "20",
                                            fill: "none",
                                            stroke: "currentColor",
                                            children: [n.jsx("circle", {
                                                cx: "10",
                                                cy: "10",
                                                r: "9",
                                                strokeWidth: "2"
                                            }), n.jsx("path", {
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                d: "M10 6v4l2 2"
                                            })]
                                        })
                                    }), E.studentAge]
                                }), n.jsx("input", {
                                    type: "number",
                                    id: "studentAge",
                                    value: f.studentAge || "",
                                    onChange: X,
                                    min: 6,
                                    max: 25,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.studentAge?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    placeholder: E.studentAge,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.studentAge,
                                    "aria-describedby": m.studentAge ? "studentAge-error" : void 0
                                }), m.studentAge && n.jsx("p", {
                                    id: "studentAge-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.studentAge
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "studentGender",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx("span", {
                                        className: "w-5 h-5 mr-2 flex items-center justify-center",
                                        children: n.jsxs("svg", {
                                            width: "20",
                                            height: "20",
                                            fill: "none",
                                            stroke: "currentColor",
                                            children: [n.jsx("circle", {
                                                cx: "10",
                                                cy: "10",
                                                r: "9",
                                                strokeWidth: "2"
                                            }), n.jsx("path", {
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                d: "M10 14v-4m0 0V6m0 4h4m-4 0H6"
                                            })]
                                        })
                                    }), E.studentGender]
                                }), n.jsxs("select", {
                                    id: "studentGender",
                                    value: f.studentGender || "",
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.studentGender?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.studentGender,
                                    "aria-describedby": m.studentGender ? "studentGender-error" : void 0,
                                    children: [n.jsx("option", {
                                        value: "",
                                        children: E.studentGender
                                    }), n.jsx("option", {
                                        value: "male",
                                        children: o === "en" ? "Male" : o === "am" ? "ወንድ" : "Dhiira"
                                    }), n.jsx("option", {
                                        value: "female",
                                        children: o === "en" ? "Female" : o === "am" ? "ሴት" : "Dhala"
                                    })]
                                }), m.studentGender && n.jsx("p", {
                                    id: "studentGender-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.studentGender
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "grade",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(bs, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.grade]
                                }), n.jsxs("select", {
                                    id: "grade",
                                    value: f.grade,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.grade?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.grade,
                                    "aria-describedby": m.grade ? "grade-error" : void 0,
                                    children: [n.jsx("option", {
                                        value: "",
                                        children: E.selectGrade
                                    }), [...Array(9)].map((Q, te) => n.jsx("option", {
                                        value: te + 4,
                                        children: o === "en" ? `${te+4}th Grade` : o === "am" ? `${te+4}ኛ ክፍል` : `Kutaa ${te+4}`
                                    }, te))]
                                }), m.grade && n.jsx("p", {
                                    id: "grade-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.grade
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "studentEmail",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(vs, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.studentEmail, n.jsxs("span", {
                                        className: "ml-2 text-xs text-cyan-300 font-normal",
                                        children: ["(", o === "en" ? "parent's email OK" : o === "am" ? "የወላጅ ኢሜይል መጠቀም ይቻላል" : "Email maatii fayyadamuu dandeessa", ")"]
                                    })]
                                }), n.jsx("input", {
                                    type: "email",
                                    id: "studentEmail",
                                    value: f.studentEmail,
                                    onChange: X,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.studentEmail?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    placeholder: E.placeholderEmail,
                                    "aria-describedby": m.studentEmail ? "studentEmail-error" : void 0
                                }), m.studentEmail && n.jsx("p", {
                                    id: "studentEmail-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.studentEmail
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "school",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(bs, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.school]
                                }), n.jsx("input", {
                                    type: "text",
                                    id: "school",
                                    value: f.school,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.school?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.school,
                                    "aria-describedby": m.school ? "school-error" : void 0,
                                    placeholder: E.placeholderSchool
                                }), m.school && n.jsx("p", {
                                    id: "school-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.school
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "experience",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(zm, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.experience]
                                }), n.jsxs("select", {
                                    id: "experience",
                                    value: f.experience,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.experience?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.experience,
                                    "aria-describedby": m.experience ? "experience-error" : void 0,
                                    children: [n.jsx("option", {
                                        value: "",
                                        children: E.selectExperience
                                    }), n.jsx("option", {
                                        value: "none",
                                        children: o === "en" ? "None" : o === "am" ? "ምንም" : "Hin qabaanne"
                                    }), n.jsx("option", {
                                        value: "beginner",
                                        children: o === "en" ? "Beginner" : o === "am" ? "ጀማሪ" : "Jalqabaa"
                                    }), n.jsx("option", {
                                        value: "intermediate",
                                        children: o === "en" ? "Intermediate" : o === "am" ? "መካከለኛ" : "Giddugaleessaa"
                                    }), n.jsx("option", {
                                        value: "advanced",
                                        children: o === "en" ? "Advanced" : o === "am" ? "ከፍተኛ" : "Ol’aanaa"
                                    })]
                                }), m.experience && n.jsx("p", {
                                    id: "experience-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.experience
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "session",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(Gl, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.session]
                                }), n.jsxs("select", {
                                    id: "session",
                                    value: f.session,
                                    onChange: X,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.session?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-describedby": m.session ? "session-error" : void 0,
                                    children: [n.jsx("option", {
                                        value: "full-day",
                                        children: o === "en" ? "Adaptable" : o === "am" ? "መላመድ የሚችል" : "Jijjiiramaa"
                                    }), n.jsx("option", {
                                        value: "morning",
                                        children: o === "en" ? "Morning (9 AM - 12 PM)" : o === "am" ? "ጠዋት (3፡00-6፡00)" : "Ganama (3:00-6:00)"
                                    }), n.jsx("option", {
                                        value: "afternoon",
                                        children: o === "en" ? "Afternoon (1 PM - 4 PM)" : o === "am" ? "ከሰአት (7፡00-10፡00)" : "Galgalaa (7:00-10:00)"
                                    })]
                                }), m.session && n.jsx("p", {
                                    id: "session-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.session
                                })]
                            }), n.jsx("div", {
                                className: "md:col-span-2 flex justify-end gap-2",
                                children: n.jsx("button", {
                                    type: "button",
                                    onClick: K,
                                    disabled: y,
                                    className: "px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base",
                                    "aria-label": E.nextButton,
                                    children: E.nextButton
                                })
                            })]
                        }), s === 2 && n.jsxs(n.Fragment, {
                            children: [n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "guardianName",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(qm, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.guardianName]
                                }), n.jsx("input", {
                                    type: "text",
                                    id: "guardianName",
                                    value: f.guardianName,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.guardianName?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.guardianName,
                                    "aria-describedby": m.guardianName ? "guardianName-error" : void 0,
                                    placeholder: E.placeholderName
                                }), m.guardianName && n.jsx("p", {
                                    id: "guardianName-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.guardianName
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "guardianEmail",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(vs, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.guardianEmail]
                                }), n.jsx("input", {
                                    type: "email",
                                    id: "guardianEmail",
                                    value: f.guardianEmail,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.guardianEmail?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.guardianEmail,
                                    "aria-describedby": m.guardianEmail ? "guardianEmail-error" : void 0,
                                    placeholder: E.placeholderGuardianEmail
                                }), m.guardianEmail && n.jsx("p", {
                                    id: "guardianEmail-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.guardianEmail
                                })]
                            }), n.jsxs("div", {
                                children: [n.jsxs("label", {
                                    htmlFor: "emergency",
                                    className: "flex items-center text-cyan-200 mb-2 font-semibold text-sm sm:text-base",
                                    children: [n.jsx(g0, {
                                        className: "w-5 h-5 mr-2"
                                    }), E.emergency]
                                }), n.jsx("input", {
                                    type: "tel",
                                    id: "emergency",
                                    value: f.emergency,
                                    onChange: X,
                                    required: !0,
                                    className: `w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white border ${m.emergency?"border-red-500":"border-gray-600"} focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`,
                                    "aria-required": "true",
                                    "aria-invalid": !!m.emergency,
                                    "aria-describedby": m.emergency ? "emergency-error" : void 0,
                                    placeholder: E.placeholderEmergency
                                }), m.emergency && n.jsx("p", {
                                    id: "emergency-error",
                                    className: "text-red-200 text-xs mt-1",
                                    children: m.emergency
                                })]
                            }), n.jsxs("div", {
                                className: "md:col-span-2 flex flex-col sm:flex-row justify-between gap-2",
                                children: [n.jsx("button", {
                                    type: "button",
                                    onClick: $,
                                    disabled: y,
                                    className: "px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base",
                                    "aria-label": E.backButton,
                                    children: E.backButton
                                }), n.jsx("button", {
                                    type: "submit",
                                    disabled: y,
                                    className: "px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base",
                                    "aria-label": E.submitButton,
                                    children: y ? E.submitting : E.submitButton
                                })]
                            })]
                        })]
                    })]
                }), n.jsxs("div", {
                    className: "mb-16 md:mb-20 py-16",
                    children: [n.jsx("h3", {
                        className: "text-3xl sm:text-3xl md:text-4xl font-extrabold text-white mb-10 text-center animate-fade-in",
                        children: E.faqTitle
                    }), n.jsx("div", {
                        className: "max-w-3xl mx-auto space-y-4",
                        children: [1, 2, 3].map(Q => n.jsxs("div", {
                            className: "bg-gray-800/60 backdrop-blur-md rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in",
                            style: {
                                animationDelay: `${200+Q*100}ms`
                            },
                            children: [n.jsxs("button", {
                                onClick: () => re(Q),
                                className: "w-full flex justify-between items-center px-6 py-4 text-left text-cyan-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                                "aria-expanded": O === Q,
                                "aria-controls": `faq-answer-${Q}`,
                                children: [n.jsx("span", {
                                    className: "text-base sm:text-lg font-semibold",
                                    children: E[`faqQuestion${Q}`]
                                }), n.jsx(ta, {
                                    className: `w-6 h-6 transition-transform duration-200 ${O===Q?"transform rotate-180":""}`
                                })]
                            }), n.jsx("div", {
                                id: `faq-answer-${Q}`,
                                className: `overflow-hidden transition-all duration-300 ${O===Q?"max-h-96 px-6 py-4":"max-h-0"}`,
                                children: n.jsx("p", {
                                    className: "text-sm sm:text-base text-cyan-200",
                                    children: E[`faqAnswer${Q}`]
                                })
                            })]
                        }, Q))
                    }), n.jsx("div", {
                        className: "fixed bottom-6 right-6 z-20",
                        children: n.jsxs("div", {
                            className: "flex flex-col items-end space-y-4",
                            children: [n.jsxs("button", {
                                onClick: z,
                                className: "flex items-center px-4 py-2 rounded-xl bg-gray-800 text-cyan-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] focus:outline-none focus:ring-2 focus:ring-cyan-400",
                                "aria-label": `Switch to ${o==="en"?"Amharic":o==="am"?"Oromo":"English"}`,
                                children: [n.jsx(Nc, {
                                    className: "w-5 h-5 mr-2"
                                }), E.languageToggle]
                            }), n.jsx("a", {
                                href: "mailto:info@ethronics.com",
                                className: "hidden md:block px-6 py-3 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_20px_rgba(34,211,238,0.9)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                                "aria-label": "Contact us for inquiries",
                                children: "Contact Us"
                            })]
                        })
                    })]
                }), n.jsx("div", {
                    className: "mb-16 md:mb-20 py-12 bg-gradient-to-r from-purple-800/60 to-transparent rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.5)] text-center relative overflow-hidden",
                    children: n.jsxs("div", {
                        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:pl-8 text-left",
                        children: [n.jsx("h3", {
                            className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in",
                            children: "Hurry! Limited Spots Available"
                        }), n.jsx("p", {
                            className: "text-base sm:text-lg md:text-xl text-cyan-200 mb-8 max-w-2xl animate-fade-in delay-200",
                            children: "Don’t miss out on this exciting opportunity to join our Summer Robotics & Coding training. Spots are filling up fast, so register now to secure your place!"
                        }), n.jsx("a", {
                            href: "#register",
                            className: "inline-block px-8 py-4 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                            "aria-label": "Register now to secure your spot",
                            children: "Register Now"
                        })]
                    })
                })]
            }), n.jsx("style", {
                children: `
        @font-face {
          font-family: 'Noto Sans Ethiopic';
          src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;700;800&display=swap');
        }
        .font-noto-ethiopic {
          font-family: 'Noto Sans Ethiopic', sans-serif;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        @media (max-width: 640px) {
          .max-w-4xl {
            max-width: 100%;
          }
          .px-4 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .py-20 {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          .text-4xl {
            font-size: 2.25rem;
          }
          .text-5xl {
            font-size: 2.5rem;
          }
          .max-w-3xl {
            max-width: 100%;
          }
          .text-left {
            text-align: center;
          }
        }
      `
            })]
        })
    },
    Da = ({
        children: s
    }) => {
        const o = ra().pathname.startsWith("/uk");
        return n.jsxs("div", {
            className: "App flex flex-col min-h-screen",
            children: [!o && n.jsx(cb, {}), n.jsx("main", {
                className: "flex-grow",
                children: s
            }), !o && n.jsx(mb, {})]
        })
    };

function Tv() {
    return n.jsx(Tx, {
        children: n.jsxs(nx, {
            children: [n.jsx(Mt, {
                path: "/",
                element: n.jsx(Da, {
                    children: n.jsx(Hb, {})
                })
            }), n.jsx(Mt, {
                path: "/manufacturing",
                element: n.jsx(Da, {
                    children: n.jsx(Fb, {})
                })
            }), n.jsx(Mt, {
                path: "/academics",
                element: n.jsx(Da, {
                    children: n.jsx(Z1, {})
                })
            }), n.jsx(Mt, {
                path: "/contact",
                element: n.jsx(Da, {
                    children: n.jsx(uv, {})
                })
            }), n.jsx(Mt, {
                path: "/about",
                element: n.jsx(Da, {
                    children: n.jsx(gv, {})
                })
            }), n.jsx(Mt, {
                path: "/register",
                element: n.jsx(Da, {
                    children: n.jsx(_v, {})
                })
            }), n.jsx(Mt, {
                path: "/research-development",
                element: n.jsx(Da, {
                    children: n.jsx(F1, {})
                })
            }), n.jsx(Mt, {
                path: "/uk",
                element: n.jsx(wv, {})
            }), n.jsx(Mt, {
                path: "/uk/register",
                element: n.jsx(M0, {})
            }), n.jsx(Mt, {
                path: "*",
                element: n.jsx(Da, {
                    children: n.jsx(pv, {})
                })
            })]
        })
    })
}
mp.createRoot(document.getElementById("root")).render(n.jsx(N.StrictMode, {
    children: n.jsx(Tv, {})
}));