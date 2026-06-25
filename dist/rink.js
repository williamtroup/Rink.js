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
        return e(t) && typeof t === "string";
    }
    t.definedString = r;
    function i(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = i;
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
})(e || (e = {}));

var n;

(t => {
    let n;
    (t => {
        function n(t = null) {
            const n = e.getObject(t, {});
            n.responsiveDelay = e.getNumber(n.responsiveDelay, 250);
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
    let s = 0;
    function c() {
        const t = [ "a" ];
        const e = t.length;
        let n = false;
        for (let r = 0; r < e; r++) {
            const e = document.getElementsByTagName(t[r]);
            const i = [].slice.call(e);
            const o = i.length;
            for (let t = 0; t < o; t++) {
                if (a(i[t])) {
                    n = true;
                }
            }
        }
        if (n) {
            window.addEventListener("resize", d);
            g();
        }
    }
    function a(e) {
        let n = false;
        const r = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_SM);
        const o = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_MD);
        const s = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_LG);
        const c = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XL);
        const a = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            u(576, e, r);
            n = true;
        }
        if (t.definedString(o)) {
            u(768, e, o);
            n = true;
        }
        if (t.definedString(s)) {
            u(992, e, s);
            n = true;
        }
        if (t.definedString(c)) {
            u(1200, e, c);
            n = true;
        }
        if (t.definedString(a)) {
            u(1400, e, a);
            n = true;
        }
        if (!n) {
            f(e);
        }
        return n;
    }
    function f(e) {
        const n = e.attributes;
        const r = n.length;
        for (let o = 0; o < r; o++) {
            const r = n[o];
            if (r.name.startsWith(i.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const n = r.name.split("-");
                const i = n[n.length - 1];
                const o = r.value;
                if (t.definedString(o)) {
                    u(parseInt(i), e, o);
                }
            }
        }
    }
    function u(t, e, n) {
        if (!Object.prototype.hasOwnProperty.call(o, t.toString())) {
            o[t.toString()] = [];
        }
        o[t.toString()].push({
            anchorTag: e,
            newTarget: n,
            originalTarget: e.getAttribute("target")
        });
    }
    function d() {
        if (s !== 0) {
            clearTimeout(s);
        }
        s = setTimeout(() => g(), e.responsiveDelay);
    }
    function g() {
        T(l());
    }
    function l() {
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
    function T(t) {
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
    const _ = {
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
            return _;
        },
        getVersion: () => "1.1.0"
    };
    (() => {
        e = n.Options.get();
        r.onContentLoaded(() => c());
        if (!t.defined(window.$rink)) {
            window.$rink = _;
        }
    })();
})();//# sourceMappingURL=rink.js.map