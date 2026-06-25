"use strict";

var t;

(t => {
    function e(t) {
        return t !== null && t !== void 0 && t.toString() !== "";
    }
    t.defined = e;
    function n(t) {
        return e(t) && typeof t === "object";
    }
    t.definedObject = n;
    function r(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = r;
    function i(t) {
        return e(t) && typeof t === "string";
    }
    t.definedString = i;
    function o(t) {
        return e(t) && typeof t === "function";
    }
    t.definedFunction = o;
    function f(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = f;
    function c(t) {
        return n(t) && t instanceof Array;
    }
    t.definedArray = c;
})(t || (t = {}));

var e;

(e => {
    function n(e, n) {
        return t.definedString(e) ? e : n;
    }
    e.getString = n;
    function r(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = r;
    function i(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = i;
    function o(e, n) {
        return t.definedFunction(e) ? e : n;
    }
    e.getFunction = o;
    function f(e, n) {
        return t.definedArray(e) ? e : n;
    }
    e.getArray = f;
    function c(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = c;
    function u(e, n) {
        let r = n;
        if (t.definedString(e)) {
            const t = e.toString().split(" ");
            if (t.length === 0) {
                e = n;
            } else {
                r = t;
            }
        } else {
            r = f(e, n);
        }
        return r;
    }
    e.getStringOrArray = u;
})(e || (e = {}));

var n;

(t => {
    let n;
    (t => {
        function n(t = null) {
            const n = e.getObject(t, {});
            n.safeMode = e.getBoolean(n.safeMode, true);
            return n;
        }
        t.get = n;
    })(n = t.Options || (t.Options = {}));
})(n || (n = {}));

var r;

(t => {
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(r || (r = {}));

var i;

(t => {
    t.RINK_JS_ATTRIBUTE_NAME_SM = "data-rink-js-sm";
    t.RINK_JS_ATTRIBUTE_NAME_MD = "data-rink-js-md";
    t.RINK_JS_ATTRIBUTE_NAME_LG = "data-rink-js-lg";
    t.RINK_JS_ATTRIBUTE_NAME_XL = "data-rink-js-xl";
    t.RINK_JS_ATTRIBUTE_NAME_XXL = "data-rink-js-xxl";
})(i || (i = {}));

(() => {
    let e = {};
    const o = {};
    let f = 0;
    function c() {
        const t = [ "a" ];
        const e = t.length;
        let n = false;
        for (let r = 0; r < e; r++) {
            const e = document.getElementsByTagName(t[r]);
            const i = [].slice.call(e);
            const o = i.length;
            for (let t = 0; t < o; t++) {
                if (u(i[t])) {
                    n = true;
                }
            }
        }
        if (n) {
            window.addEventListener("resize", a);
            s();
        }
    }
    function u(e) {
        let n = false;
        const r = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_SM);
        const o = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_MD);
        const f = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_LG);
        const c = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XL);
        const u = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            d(576, e, r);
            n = true;
        }
        if (t.definedString(o)) {
            d(768, e, o);
            n = true;
        }
        if (t.definedString(f)) {
            d(992, e, f);
            n = true;
        }
        if (t.definedString(c)) {
            d(1200, e, c);
            n = true;
        }
        if (t.definedString(u)) {
            d(1400, e, u);
            n = true;
        }
        return n;
    }
    function d(t, e, n) {
        if (!Object.prototype.hasOwnProperty.call(o, t.toString())) {
            o[t.toString()] = [];
        }
        o[t.toString()].push({
            anchorTag: e,
            newTarget: n,
            originalTarget: e.getAttribute("target")
        });
    }
    function a() {
        if (f !== 0) {
            clearTimeout(f);
        }
        f = setTimeout(() => s(), 250);
    }
    function s() {
        l(g());
    }
    function g() {
        const t = [];
        for (const e in o) {
            if (Object.prototype.hasOwnProperty.call(o, e)) {
                const n = window.innerWidth;
                const r = parseInt(e);
                if (n >= r) {
                    const n = o[e];
                    const r = n.length;
                    t.push(e);
                    for (let t = 0; t < r; t++) {
                        const e = n[t];
                        e.anchorTag.setAttribute("target", e.newTarget);
                    }
                }
            }
        }
        return t;
    }
    function l(t) {
        for (const e in o) {
            if (Object.prototype.hasOwnProperty.call(o, e)) {
                if (t.indexOf(e) === -1) {
                    const t = o[e];
                    const n = t.length;
                    for (let e = 0; e < n; e++) {
                        const n = t[e];
                        n.anchorTag.setAttribute("target", n.originalTarget);
                    }
                }
            }
        }
    }
    const T = {
        setConfiguration: r => {
            if (t.definedObject(r)) {
                const t = e;
                let i = false;
                for (const e in r) {
                    if (Object.prototype.hasOwnProperty.call(r, e) && Object.prototype.hasOwnProperty.call(t, e) && t[e] !== r[e]) {
                        t[e] = r[e];
                        i = true;
                    }
                }
                if (i) {
                    e = n.Options.get(t);
                }
            }
            return T;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        e = n.Options.get();
        r.onContentLoaded(() => c());
        if (!t.defined(window.$rink)) {
            window.$rink = T;
        }
    })();
})();//# sourceMappingURL=rink.js.map