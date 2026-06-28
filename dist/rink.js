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
    let e;
    (t => {
        t.RINK_JS_SM = "data-rink-js-sm";
        t.RINK_JS_MD = "data-rink-js-md";
        t.RINK_JS_LG = "data-rink-js-lg";
        t.RINK_JS_XL = "data-rink-js-xl";
        t.RINK_JS_XXL = "data-rink-js-xxl";
        t.RINK_JS_CUSTOM = "data-rink-js";
    })(e = t.CustomAttribute || (t.CustomAttribute = {}));
    let n;
    (t => {
        t.TARGET = "target";
    })(n = t.Attribute || (t.Attribute = {}));
    let r;
    (t => {
        t.RESIZE = "resize";
    })(r = t.Event || (t.Event = {}));
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
    let u = {};
    let s = {};
    let a = 0;
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
                window.addEventListener(o.Event.RESIZE, A);
                f = true;
            }
            if (c) {
                m();
            }
        }
    }
    function l(e) {
        let n = false;
        const r = e.getAttribute(o.CustomAttribute.RINK_JS_SM);
        const i = e.getAttribute(o.CustomAttribute.RINK_JS_MD);
        const u = e.getAttribute(o.CustomAttribute.RINK_JS_LG);
        const s = e.getAttribute(o.CustomAttribute.RINK_JS_XL);
        const a = e.getAttribute(o.CustomAttribute.RINK_JS_XXL);
        if (t.definedString(r)) {
            b(576, e, r, o.CustomAttribute.RINK_JS_SM);
            n = true;
        }
        if (t.definedString(i)) {
            b(768, e, i, o.CustomAttribute.RINK_JS_MD);
            n = true;
        }
        if (t.definedString(u)) {
            b(992, e, u, o.CustomAttribute.RINK_JS_LG);
            n = true;
        }
        if (t.definedString(s)) {
            b(1200, e, s, o.CustomAttribute.RINK_JS_XL);
            n = true;
        }
        if (t.definedString(a)) {
            b(1400, e, a, o.CustomAttribute.RINK_JS_XXL);
            n = true;
        }
        g(e);
        return n;
    }
    function g(n) {
        const r = n.attributes;
        const i = r.length;
        for (let u = 0; u < i; u++) {
            const i = r[u];
            const s = i.name;
            if (s.startsWith(o.CustomAttribute.RINK_JS_CUSTOM)) {
                const r = s.split("-");
                const o = e.getNumber(parseInt(r[r.length - 1]), 0);
                const u = i.value;
                if (o > 0 && t.definedString(u)) {
                    b(o, n, u, s);
                } else {
                    S(n, s);
                }
            }
        }
    }
    function b(t, e, n, r) {
        if (!Object.prototype.hasOwnProperty.call(s, t.toString())) {
            s[t.toString()] = [];
        }
        s[t.toString()].push({
            anchorTag: e,
            newTarget: n,
            originalTarget: e.getAttribute(o.Attribute.TARGET)
        });
        S(e, r);
    }
    function S(t, e) {
        if (u.removeAttributes) {
            t.removeAttribute(e);
        }
    }
    function A() {
        if (c) {
            if (a !== 0) {
                clearTimeout(a);
            }
            a = setTimeout(() => m(), u.responsiveDelay);
        }
    }
    function m() {
        _(p());
    }
    function p() {
        const t = {
            screenWidths: [],
            anchorTags: []
        };
        const e = h();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(s, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (e >= r) {
                    const e = s[n];
                    const r = e.length;
                    t.screenWidths.push(n);
                    for (let n = 0; n < r; n++) {
                        const r = e[n];
                        if (t.anchorTags.indexOf(r.anchorTag) === -1) {
                            t.anchorTags.push(r.anchorTag);
                            r.anchorTag.setAttribute(o.Attribute.TARGET, r.newTarget);
                        }
                    }
                }
            }
        }
        return t;
    }
    function _(e) {
        const n = h();
        const r = n.length;
        for (let i = 0; i < r; i++) {
            const r = n[i];
            if (Object.prototype.hasOwnProperty.call(s, r)) {
                if (e.screenWidths.indexOf(r) === -1) {
                    const n = s[r];
                    const i = n.length;
                    for (let r = 0; r < i; r++) {
                        const i = n[r];
                        if (e.anchorTags.indexOf(i.anchorTag) === -1) {
                            let e = i.originalTarget;
                            if (!t.definedString(e)) {
                                e = u.defaultTarget;
                            }
                            if (t.definedString(e)) {
                                i.anchorTag.setAttribute(o.Attribute.TARGET, e);
                            } else {
                                i.anchorTag.removeAttribute(o.Attribute.TARGET);
                            }
                        }
                    }
                }
            }
        }
    }
    function h() {
        return Object.keys(s).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const T = {
        start: function() {
            if (!c) {
                c = true;
                m();
            }
            return T;
        },
        stop: function() {
            c = false;
            return T;
        },
        fetch: function() {
            if (!u.removeAttributes) {
                s = {};
            }
            d();
            return T;
        },
        refresh: function() {
            if (c) {
                m();
            }
            return T;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = u;
                let r = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        r = true;
                    }
                }
                if (r) {
                    u = n.Options.get(t);
                    c = u.enabled;
                    i.setup(u, () => d());
                }
            }
            return T;
        },
        getVersion: () => "1.3.0"
    };
    (() => {
        u = n.Options.get();
        c = u.enabled;
        r.onContentLoaded(() => {
            d();
            i.setup(u, () => d());
        });
        if (!t.defined(window.$rink)) {
            window.$rink = T;
        }
    })();
})();//# sourceMappingURL=rink.js.map