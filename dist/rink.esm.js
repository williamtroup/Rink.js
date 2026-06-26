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
        return e(t) && typeof t === "string";
    }
    t.definedString = r;
    function o(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = o;
    function i(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = i;
})(t || (t = {}));

var e;

(e => {
    function n(e, n) {
        return t.definedString(e) ? e : n;
    }
    e.getString = n;
    function r(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = r;
    function o(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = o;
    function i(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = i;
})(e || (e = {}));

var n;

(t => {
    let n;
    (t => {
        function n(t = null) {
            const n = e.getObject(t, {});
            n.responsiveDelay = e.getNumber(n.responsiveDelay, 250);
            n.defaultTarget = e.getString(n.defaultTarget, "_self");
            n.removeAttributes = e.getBoolean(n.removeAttributes, true);
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
    let e = {};
    const i = {};
    let s = 0;
    function a() {
        let t = false;
        const e = document.getElementsByTagName("a");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (c(n[e])) {
                t = true;
            }
        }
        if (t) {
            window.addEventListener("resize", d);
            _();
        }
    }
    function c(e) {
        let n = false;
        const r = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_SM);
        const i = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_MD);
        const s = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_LG);
        const a = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XL);
        const c = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            u(576, e, r, o.RINK_JS_ATTRIBUTE_NAME_SM);
            n = true;
        }
        if (t.definedString(i)) {
            u(768, e, i, o.RINK_JS_ATTRIBUTE_NAME_MD);
            n = true;
        }
        if (t.definedString(s)) {
            u(992, e, s, o.RINK_JS_ATTRIBUTE_NAME_LG);
            n = true;
        }
        if (t.definedString(a)) {
            u(1200, e, a, o.RINK_JS_ATTRIBUTE_NAME_XL);
            n = true;
        }
        if (t.definedString(c)) {
            u(1400, e, c, o.RINK_JS_ATTRIBUTE_NAME_XXL);
            n = true;
        }
        f(e);
        return n;
    }
    function f(e) {
        const n = e.attributes;
        const r = n.length;
        for (let i = 0; i < r; i++) {
            const r = n[i];
            if (r.name.startsWith(o.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const n = r.name.split("-");
                const o = n[n.length - 1];
                const i = r.value;
                if (t.definedNumber(parseInt(o)) && t.definedString(i)) {
                    u(parseInt(o), e, i, r.name);
                }
            }
        }
    }
    function u(n, r, o, s) {
        if (!Object.prototype.hasOwnProperty.call(i, n.toString())) {
            i[n.toString()] = [];
        }
        let a = r.getAttribute("target");
        if (!t.definedString(a)) {
            a = e.defaultTarget;
        }
        i[n.toString()].push({
            anchorTag: r,
            newTarget: o,
            originalTarget: a
        });
        if (e.removeAttributes) {
            r.removeAttribute(s);
        }
    }
    function d() {
        if (s !== 0) {
            clearTimeout(s);
        }
        s = setTimeout(() => _(), e.responsiveDelay);
    }
    function _() {
        l(T());
    }
    function T() {
        const t = [];
        const e = g();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
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
        const e = g();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
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
    function g() {
        return Object.keys(i).sort((t, e) => t.toLowerCase().localeCompare(e.toLowerCase()));
    }
    const A = {
        setConfiguration: r => {
            if (t.definedObject(r)) {
                const t = e;
                let o = false;
                for (const e in r) {
                    if (Object.prototype.hasOwnProperty.call(r, e) && Object.prototype.hasOwnProperty.call(t, e) && t[e] !== r[e]) {
                        t[e] = r[e];
                        o = true;
                    }
                }
                if (o) {
                    e = n.Options.get(t);
                }
            }
            return A;
        },
        getVersion: () => "1.1.0"
    };
    (() => {
        e = n.Options.get();
        r.onContentLoaded(() => a());
        if (!t.defined(window.$rink)) {
            window.$rink = A;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map