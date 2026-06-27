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
            n.enabled = e.getBoolean(n.enabled, true);
            n.observationMode = e.getBoolean(n.observationMode, true);
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

var i;

(e => {
    let n = null;
    function r(e, r) {
        if (e.observationMode) {
            if (!t.defined(n)) {
                n = new MutationObserver(() => r());
                const t = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                n.observe(document.body, t);
            }
        } else {
            n.disconnect();
            n = null;
        }
    }
    e.setup = r;
    function o(e) {
        if (e.observationMode && t.defined(n)) {
            n.disconnect();
            n = null;
        }
    }
    e.destroy = o;
})(i || (i = {}));

(() => {
    let s = {};
    let a = {};
    let u = 0;
    let c = true;
    let f = false;
    function d() {
        let t = false;
        const e = document.getElementsByTagName("a");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (l(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!f) {
                window.addEventListener("resize", _);
                f = true;
            }
            if (c) {
                A();
            }
        }
    }
    function l(e) {
        let n = false;
        const r = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_SM);
        const i = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_MD);
        const s = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_LG);
        const a = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XL);
        const u = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            g(576, e, r, o.RINK_JS_ATTRIBUTE_NAME_SM);
            n = true;
        }
        if (t.definedString(i)) {
            g(768, e, i, o.RINK_JS_ATTRIBUTE_NAME_MD);
            n = true;
        }
        if (t.definedString(s)) {
            g(992, e, s, o.RINK_JS_ATTRIBUTE_NAME_LG);
            n = true;
        }
        if (t.definedString(a)) {
            g(1200, e, a, o.RINK_JS_ATTRIBUTE_NAME_XL);
            n = true;
        }
        if (t.definedString(u)) {
            g(1400, e, u, o.RINK_JS_ATTRIBUTE_NAME_XXL);
            n = true;
        }
        T(e);
        return n;
    }
    function T(n) {
        const r = n.attributes;
        const i = r.length;
        for (let s = 0; s < i; s++) {
            const i = r[s];
            if (i.name.startsWith(o.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const r = i.name.split("-");
                const o = e.getNumber(r[r.length - 1], -1);
                const s = i.value;
                if (o > -1 && t.definedString(s)) {
                    g(o, n, s, i.name);
                }
            }
        }
    }
    function g(t, e, n, r) {
        if (!Object.prototype.hasOwnProperty.call(a, t.toString())) {
            a[t.toString()] = [];
        }
        a[t.toString()].push({
            anchorTag: e,
            newTarget: n,
            originalTarget: e.getAttribute("target")
        });
        if (s.removeAttributes) {
            e.removeAttribute(r);
        }
    }
    function _() {
        if (c) {
            if (u !== 0) {
                clearTimeout(u);
            }
            u = setTimeout(() => A(), s.responsiveDelay);
        }
    }
    function A() {
        N(b());
    }
    function b() {
        const t = {
            screenWidths: [],
            anchorTags: []
        };
        const e = S();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(a, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (e >= r) {
                    const e = a[n];
                    const r = e.length;
                    t.screenWidths.push(n);
                    for (let n = 0; n < r; n++) {
                        const r = e[n];
                        if (t.anchorTags.indexOf(r.anchorTag) === -1) {
                            t.anchorTags.push(r.anchorTag);
                            r.anchorTag.setAttribute("target", r.newTarget);
                        }
                    }
                }
            }
        }
        return t;
    }
    function N(e) {
        const n = S();
        const r = n.length;
        for (let o = 0; o < r; o++) {
            const r = n[o];
            if (Object.prototype.hasOwnProperty.call(a, r)) {
                if (e.screenWidths.indexOf(r) === -1) {
                    const n = a[r];
                    const o = n.length;
                    for (let r = 0; r < o; r++) {
                        const o = n[r];
                        if (e.anchorTags.indexOf(o.anchorTag) === -1) {
                            let e = o.originalTarget;
                            if (!t.definedString(e)) {
                                e = s.defaultTarget;
                            }
                            o.anchorTag.setAttribute("target", e);
                        }
                    }
                }
            }
        }
    }
    function S() {
        return Object.keys(a).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const E = {
        start: function() {
            if (!c) {
                c = true;
                A();
            }
            return E;
        },
        stop: function() {
            c = false;
            return E;
        },
        fetch: function() {
            if (!s.removeAttributes) {
                a = {};
            }
            d();
            return E;
        },
        refresh: function() {
            if (c) {
                A();
            }
            return E;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = s;
                let r = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        r = true;
                    }
                }
                if (r) {
                    s = n.Options.get(t);
                    c = s.enabled;
                    i.setup(s, () => d());
                }
            }
            return E;
        },
        getVersion: () => "1.3.0"
    };
    (() => {
        s = n.Options.get();
        c = s.enabled;
        r.onContentLoaded(() => {
            d();
            i.setup(s, () => d());
        });
        if (!t.defined(window.$rink)) {
            window.$rink = E;
        }
    })();
})();//# sourceMappingURL=rink.js.map