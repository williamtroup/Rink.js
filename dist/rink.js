"use strict";

var t = (t => {
    t["dash"] = "-";
    return t;
})(t || {});

var n;

(n => {
    function e(n) {
        return n !== null && n !== void 0 && n.toString() !== t.empty;
    }
    n.defined = e;
    function r(t) {
        return e(t) && typeof t === "object";
    }
    n.definedObject = r;
    function i(t) {
        return e(t) && typeof t === "boolean";
    }
    n.definedBoolean = i;
    function o(t) {
        return e(t) && typeof t === "string";
    }
    n.definedString = o;
    function f(t) {
        return e(t) && typeof t === "function";
    }
    n.definedFunction = f;
    function c(t) {
        return e(t) && typeof t === "number";
    }
    n.definedNumber = c;
    function a(t) {
        return r(t) && t instanceof Array;
    }
    n.definedArray = a;
})(n || (n = {}));

var e;

(e => {
    function r(t, e) {
        return n.definedString(t) ? t : e;
    }
    e.getString = r;
    function i(t, e) {
        return n.definedBoolean(t) ? t : e;
    }
    e.getBoolean = i;
    function o(t, e) {
        return n.definedNumber(t) ? t : e;
    }
    e.getNumber = o;
    function f(t, e) {
        return n.definedFunction(t) ? t : e;
    }
    e.getFunction = f;
    function c(t, e) {
        return n.definedArray(t) ? t : e;
    }
    e.getArray = c;
    function a(t, e) {
        return n.definedObject(t) ? t : e;
    }
    e.getObject = a;
    function s(e, r) {
        let i = r;
        if (n.definedString(e)) {
            const n = e.toString().split(t.space);
            if (n.length === 0) {
                e = r;
            } else {
                i = n;
            }
        } else {
            i = c(e, r);
        }
        return i;
    }
    e.getStringOrArray = s;
})(e || (e = {}));

var r;

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
})(r || (r = {}));

var i;

(t => {
    function n(t) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = n;
})(i || (i = {}));

var o;

(t => {
    t.RINK_JS_ATTRIBUTE_NAME_SM = "data-rink-js-sm";
    t.RINK_JS_ATTRIBUTE_NAME_MD = "data-rink-js-md";
    t.RINK_JS_ATTRIBUTE_NAME_LG = "data-rink-js-lg";
    t.RINK_JS_ATTRIBUTE_NAME_XL = "data-rink-js-xl";
    t.RINK_JS_ATTRIBUTE_NAME_XXL = "data-rink-js-xxl";
    t.RINK_JS_ATTRIBUTE_NAME_CUSTOM = "data-rink-js";
})(o || (o = {}));

(() => {
    let t = {};
    const e = {};
    let f = 0;
    function c() {
        const t = [ "a" ];
        const n = t.length;
        let e = false;
        for (let r = 0; r < n; r++) {
            const n = document.getElementsByTagName(t[r]);
            const i = [].slice.call(n);
            const o = i.length;
            for (let t = 0; t < o; t++) {
                if (a(i[t])) {
                    e = true;
                }
            }
        }
        if (e) {
            window.addEventListener("resize", d);
            g();
        }
    }
    function a(t) {
        let e = false;
        const r = t.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_SM);
        const i = t.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_MD);
        const f = t.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_LG);
        const c = t.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XL);
        const a = t.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (n.definedString(r)) {
            u(576, t, r);
            e = true;
        }
        if (n.definedString(i)) {
            u(768, t, i);
            e = true;
        }
        if (n.definedString(f)) {
            u(992, t, f);
            e = true;
        }
        if (n.definedString(c)) {
            u(1200, t, c);
            e = true;
        }
        if (n.definedString(a)) {
            u(1400, t, a);
            e = true;
        }
        if (!e) {
            s(t);
        }
        return e;
    }
    function s(t) {
        const e = t.attributes;
        const r = e.length;
        for (let i = 0; i < r; i++) {
            const r = e[i];
            if (r.name.startsWith(o.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const e = r.name.split("-");
                const i = e[e.length - 1];
                const o = r.value;
                if (n.definedString(o)) {
                    u(parseInt(i), t, o);
                }
            }
        }
    }
    function u(t, n, r) {
        if (!Object.prototype.hasOwnProperty.call(e, t.toString())) {
            e[t.toString()] = [];
        }
        e[t.toString()].push({
            anchorTag: n,
            newTarget: r,
            originalTarget: n.getAttribute("target")
        });
    }
    function d() {
        if (f !== 0) {
            clearTimeout(f);
        }
        f = setTimeout(() => g(), 250);
    }
    function g() {
        T(l());
    }
    function l() {
        const t = [];
        for (const n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
                const r = window.innerWidth;
                const i = parseInt(n);
                if (r >= i) {
                    const r = e[n];
                    const i = r.length;
                    t.push(n);
                    for (let t = 0; t < i; t++) {
                        const n = r[t];
                        n.anchorTag.setAttribute("target", n.newTarget);
                    }
                }
            }
        }
        return t;
    }
    function T(t) {
        for (const n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
                if (t.indexOf(n) === -1) {
                    const t = e[n];
                    const r = t.length;
                    for (let n = 0; n < r; n++) {
                        const e = t[n];
                        e.anchorTag.setAttribute("target", e.originalTarget);
                    }
                }
            }
        }
    }
    const _ = {
        setConfiguration: e => {
            if (n.definedObject(e)) {
                const n = t;
                let i = false;
                for (const t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t) && Object.prototype.hasOwnProperty.call(n, t) && n[t] !== e[t]) {
                        n[t] = e[t];
                        i = true;
                    }
                }
                if (i) {
                    t = r.Options.get(n);
                }
            }
            return _;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        t = r.Options.get();
        i.onContentLoaded(() => c());
        if (!n.defined(window.$rink)) {
            window.$rink = _;
        }
    })();
})();//# sourceMappingURL=rink.js.map