var t;

(t => {
    function n(t) {
        return t !== null && t !== void 0 && t.toString() !== "";
    }
    t.defined = n;
    function e(t) {
        return n(t) && typeof t === "object";
    }
    t.definedObject = e;
    function r(t) {
        return n(t) && typeof t === "boolean";
    }
    t.definedBoolean = r;
    function o(t) {
        return n(t) && typeof t === "string";
    }
    t.definedString = o;
    function i(t) {
        return n(t) && typeof t === "function";
    }
    t.definedFunction = i;
    function f(t) {
        return n(t) && typeof t === "number";
    }
    t.definedNumber = f;
    function c(t) {
        return e(t) && t instanceof Array;
    }
    t.definedArray = c;
})(t || (t = {}));

var n;

(n => {
    function e(n, e) {
        return t.definedString(n) ? n : e;
    }
    n.getString = e;
    function r(n, e) {
        return t.definedBoolean(n) ? n : e;
    }
    n.getBoolean = r;
    function o(n, e) {
        return t.definedNumber(n) ? n : e;
    }
    n.getNumber = o;
    function i(n, e) {
        return t.definedFunction(n) ? n : e;
    }
    n.getFunction = i;
    function f(n, e) {
        return t.definedArray(n) ? n : e;
    }
    n.getArray = f;
    function c(n, e) {
        return t.definedObject(n) ? n : e;
    }
    n.getObject = c;
    function u(n, e) {
        let r = e;
        if (t.definedString(n)) {
            const t = n.toString().split(" ");
            if (t.length === 0) {
                n = e;
            } else {
                r = t;
            }
        } else {
            r = f(n, e);
        }
        return r;
    }
    n.getStringOrArray = u;
})(n || (n = {}));

var e;

(t => {
    let e;
    (t => {
        function e(t = null) {
            const e = n.getObject(t, {});
            e.safeMode = n.getBoolean(e.safeMode, true);
            return e;
        }
        t.get = e;
    })(e = t.Options || (t.Options = {}));
})(e || (e = {}));

var r;

(t => {
    function n(t) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = n;
})(r || (r = {}));

var o;

(t => {
    t.RINK_JS_ATTRIBUTE_NAME_SM = "data-rink-js-sm";
    t.RINK_JS_ATTRIBUTE_NAME_MD = "data-rink-js-md";
    t.RINK_JS_ATTRIBUTE_NAME_LG = "data-rink-js-lg";
    t.RINK_JS_ATTRIBUTE_NAME_XL = "data-rink-js-xl";
    t.RINK_JS_ATTRIBUTE_NAME_XXL = "data-rink-js-xxl";
})(o || (o = {}));

(() => {
    let n = {};
    const i = {};
    let f = 0;
    function c() {
        const t = [ "a" ];
        const n = t.length;
        let e = false;
        for (let r = 0; r < n; r++) {
            const n = document.getElementsByTagName(t[r]);
            const o = [].slice.call(n);
            const i = o.length;
            for (let t = 0; t < i; t++) {
                if (u(o[t])) {
                    e = true;
                }
            }
        }
        if (e) {
            window.addEventListener("resize", a);
            s();
        }
    }
    function u(n) {
        let e = false;
        const r = n.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_SM);
        const i = n.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_MD);
        const f = n.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_LG);
        const c = n.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XL);
        const u = n.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            d(576, n, r);
            e = true;
        }
        if (t.definedString(i)) {
            d(768, n, i);
            e = true;
        }
        if (t.definedString(f)) {
            d(992, n, f);
            e = true;
        }
        if (t.definedString(c)) {
            d(1200, n, c);
            e = true;
        }
        if (t.definedString(u)) {
            d(1400, n, u);
            e = true;
        }
        return e;
    }
    function d(t, n, e) {
        if (!Object.prototype.hasOwnProperty.call(i, t.toString())) {
            i[t.toString()] = [];
        }
        i[t.toString()].push({
            anchorTag: n,
            newTarget: e,
            originalTarget: n.getAttribute("target")
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
        for (const n in i) {
            if (Object.prototype.hasOwnProperty.call(i, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (e >= r) {
                    const e = i[n];
                    const r = e.length;
                    t.push(n);
                    for (let t = 0; t < r; t++) {
                        const n = e[t];
                        n.anchorTag.setAttribute("target", n.newTarget);
                    }
                }
            }
        }
        return t;
    }
    function l(t) {
        for (const n in i) {
            if (Object.prototype.hasOwnProperty.call(i, n)) {
                if (t.indexOf(n) === -1) {
                    const t = i[n];
                    const e = t.length;
                    for (let n = 0; n < e; n++) {
                        const e = t[n];
                        e.anchorTag.setAttribute("target", e.originalTarget);
                    }
                }
            }
        }
    }
    const T = {
        setConfiguration: r => {
            if (t.definedObject(r)) {
                const t = n;
                let o = false;
                for (const n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== r[n]) {
                        t[n] = r[n];
                        o = true;
                    }
                }
                if (o) {
                    n = e.Options.get(t);
                }
            }
            return T;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        n = e.Options.get();
        r.onContentLoaded(() => c());
        if (!t.defined(window.$rink)) {
            window.$rink = T;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map