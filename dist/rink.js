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
    let e = {};
    let s = {};
    let a = 0;
    let c = true;
    function u() {
        let t = false;
        const e = document.getElementsByTagName("a");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (f(n[e])) {
                t = true;
            }
        }
        if (t) {
            window.addEventListener("resize", T);
            if (c) {
                g();
            }
        }
    }
    function f(e) {
        let n = false;
        const r = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_SM);
        const i = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_MD);
        const s = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_LG);
        const a = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XL);
        const c = e.getAttribute(o.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            l(576, e, r, o.RINK_JS_ATTRIBUTE_NAME_SM);
            n = true;
        }
        if (t.definedString(i)) {
            l(768, e, i, o.RINK_JS_ATTRIBUTE_NAME_MD);
            n = true;
        }
        if (t.definedString(s)) {
            l(992, e, s, o.RINK_JS_ATTRIBUTE_NAME_LG);
            n = true;
        }
        if (t.definedString(a)) {
            l(1200, e, a, o.RINK_JS_ATTRIBUTE_NAME_XL);
            n = true;
        }
        if (t.definedString(c)) {
            l(1400, e, c, o.RINK_JS_ATTRIBUTE_NAME_XXL);
            n = true;
        }
        d(e);
        return n;
    }
    function d(e) {
        const n = e.attributes;
        const r = n.length;
        for (let i = 0; i < r; i++) {
            const r = n[i];
            if (r.name.startsWith(o.RINK_JS_ATTRIBUTE_NAME_CUSTOM)) {
                const n = r.name.split("-");
                const o = n[n.length - 1];
                const i = r.value;
                if (t.definedNumber(parseInt(o)) && t.definedString(i)) {
                    l(parseInt(o), e, i, r.name);
                }
            }
        }
    }
    function l(t, n, r, o) {
        if (!Object.prototype.hasOwnProperty.call(s, t.toString())) {
            s[t.toString()] = [];
        }
        s[t.toString()].push({
            anchorTag: n,
            newTarget: r,
            originalTarget: n.getAttribute("target")
        });
        if (e.removeAttributes) {
            n.removeAttribute(o);
        }
    }
    function T() {
        if (c) {
            if (a !== 0) {
                clearTimeout(a);
            }
            a = setTimeout(() => g(), e.responsiveDelay);
        }
    }
    function g() {
        A(_());
    }
    function _() {
        const t = {
            screenWidths: [],
            anchorTags: []
        };
        const e = b();
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
                            r.anchorTag.setAttribute("target", r.newTarget);
                        }
                    }
                }
            }
        }
        return t;
    }
    function A(n) {
        const r = b();
        const o = r.length;
        for (let i = 0; i < o; i++) {
            const o = r[i];
            if (Object.prototype.hasOwnProperty.call(s, o)) {
                if (n.screenWidths.indexOf(o) === -1) {
                    const r = s[o];
                    const i = r.length;
                    for (let o = 0; o < i; o++) {
                        const i = r[o];
                        if (n.anchorTags.indexOf(i.anchorTag) === -1) {
                            let n = i.originalTarget;
                            if (!t.definedString(n)) {
                                n = e.defaultTarget;
                            }
                            i.anchorTag.setAttribute("target", n);
                        }
                    }
                }
            }
        }
    }
    function b() {
        return Object.keys(s).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const N = {
        start: function() {
            if (!c) {
                c = true;
                g();
            }
            return N;
        },
        stop: function() {
            c = false;
            return N;
        },
        fetch: function() {
            if (!e.removeAttributes) {
                s = {};
            }
            u();
            return N;
        },
        refresh: function() {
            if (c) {
                g();
            }
            return N;
        },
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
                    c = e.enabled;
                    i.setup(e, () => u());
                }
            }
            return N;
        },
        getVersion: () => "1.2.0"
    };
    (() => {
        e = n.Options.get();
        c = e.enabled;
        r.onContentLoaded(() => {
            u();
            i.setup(e, () => u());
        });
        if (!t.defined(window.$rink)) {
            window.$rink = N;
        }
    })();
})();//# sourceMappingURL=rink.js.map