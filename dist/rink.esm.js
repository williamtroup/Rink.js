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
    function i(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = i;
    function o(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = o;
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
    function i(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = i;
    function o(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = o;
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

var i;

(t => {
    t.RINK_JS_ATTRIBUTE_NAME_SM = "data-rink-js-sm";
    t.RINK_JS_ATTRIBUTE_NAME_MD = "data-rink-js-md";
    t.RINK_JS_ATTRIBUTE_NAME_LG = "data-rink-js-lg";
    t.RINK_JS_ATTRIBUTE_NAME_XL = "data-rink-js-xl";
    t.RINK_JS_ATTRIBUTE_NAME_XXL = "data-rink-js-xxl";
    t.RINK_JS_ATTRIBUTE_NAME_CUSTOM = "data-rink-js";
})(i || (i = {}));

(() => {
    let e = {};
    const o = {};
    let a = 0;
    function f() {
        let t = false;
        const e = document.getElementsByTagName("a");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (s(n[e])) {
                t = true;
            }
        }
        if (t) {
            window.addEventListener("resize", _);
            d();
        }
    }
    function s(e) {
        let n = false;
        const r = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_SM);
        const o = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_MD);
        const a = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_LG);
        const f = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XL);
        const s = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            u(576, e, r, i.RINK_JS_ATTRIBUTE_NAME_SM);
            n = true;
        }
        if (t.definedString(o)) {
            u(768, e, o, i.RINK_JS_ATTRIBUTE_NAME_MD);
            n = true;
        }
        if (t.definedString(a)) {
            u(992, e, a, i.RINK_JS_ATTRIBUTE_NAME_LG);
            n = true;
        }
        if (t.definedString(f)) {
            u(1200, e, f, i.RINK_JS_ATTRIBUTE_NAME_XL);
            n = true;
        }
        if (t.definedString(s)) {
            u(1400, e, s, i.RINK_JS_ATTRIBUTE_NAME_XXL);
            n = true;
        }
        if (!n) {
            c(e);
        }
        return n;
    }
    function c(e) {
        const n = e.attributes;
        const r = n.length;
        for (let o = 0; o < r; o++) {
            const r = n[o];
            if (r.name.startsWith(i.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const n = r.name.split("-");
                const i = n[n.length - 1];
                const o = r.value;
                if (t.definedString(o)) {
                    u(parseInt(i), e, o, r.name);
                }
            }
        }
    }
    function u(n, r, i, a) {
        if (!Object.prototype.hasOwnProperty.call(o, n.toString())) {
            o[n.toString()] = [];
        }
        let f = r.getAttribute("target");
        if (!t.definedString(f)) {
            f = e.defaultTarget;
        }
        o[n.toString()].push({
            anchorTag: r,
            newTarget: i,
            originalTarget: f
        });
        if (e.removeAttributes) {
            r.removeAttribute(a);
        }
    }
    function _() {
        if (a !== 0) {
            clearTimeout(a);
        }
        a = setTimeout(() => d(), e.responsiveDelay);
    }
    function d() {
        g(T());
    }
    function T() {
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
    function g(t) {
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
    const l = {
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
            return l;
        },
        getVersion: () => "1.1.0"
    };
    (() => {
        e = n.Options.get();
        r.onContentLoaded(() => f());
        if (!t.defined(window.$rink)) {
            window.$rink = l;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map