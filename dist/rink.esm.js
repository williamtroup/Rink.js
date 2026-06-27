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
    let s = {};
    let u = {};
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
                window.addEventListener(o.Event.RESIZE, p);
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
        const s = e.getAttribute(o.CustomAttribute.RINK_JS_LG);
        const u = e.getAttribute(o.CustomAttribute.RINK_JS_XL);
        const a = e.getAttribute(o.CustomAttribute.RINK_JS_XXL);
        if (t.definedString(r)) {
            b(576, e, r, o.CustomAttribute.RINK_JS_SM);
            n = true;
        }
        if (t.definedString(i)) {
            b(768, e, i, o.CustomAttribute.RINK_JS_MD);
            n = true;
        }
        if (t.definedString(s)) {
            b(992, e, s, o.CustomAttribute.RINK_JS_LG);
            n = true;
        }
        if (t.definedString(u)) {
            b(1200, e, u, o.CustomAttribute.RINK_JS_XL);
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
        for (let s = 0; s < i; s++) {
            const i = r[s];
            const u = i.name;
            if (u.startsWith(o.CustomAttribute.RINK_JS_CUSTOM)) {
                const r = u.split("-");
                const o = e.getNumber(parseInt(r[r.length - 1]), 0);
                const s = i.value;
                if (o > 0 && t.definedString(s)) {
                    b(o, n, s, u);
                } else {
                    S(n, u);
                }
            }
        }
    }
    function b(t, e, n, r) {
        if (!Object.prototype.hasOwnProperty.call(u, t.toString())) {
            u[t.toString()] = [];
        }
        u[t.toString()].push({
            anchorTag: e,
            newTarget: n,
            originalTarget: e.getAttribute(o.Attribute.TARGET)
        });
        S(e, r);
    }
    function S(t, e) {
        if (s.removeAttributes) {
            t.removeAttribute(e);
        }
    }
    function p() {
        if (c) {
            if (a !== 0) {
                clearTimeout(a);
            }
            a = setTimeout(() => m(), s.responsiveDelay);
        }
    }
    function m() {
        h(_());
    }
    function _() {
        const t = {
            screenWidths: [],
            anchorTags: []
        };
        const e = A();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(u, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (e >= r) {
                    const e = u[n];
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
    function h(e) {
        const n = A();
        const r = n.length;
        for (let o = 0; o < r; o++) {
            const r = n[o];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                if (e.screenWidths.indexOf(r) === -1) {
                    const n = u[r];
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
    function A() {
        return Object.keys(u).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const v = {
        start: function() {
            if (!c) {
                c = true;
                m();
            }
            return v;
        },
        stop: function() {
            c = false;
            return v;
        },
        fetch: function() {
            if (!s.removeAttributes) {
                u = {};
            }
            d();
            return v;
        },
        refresh: function() {
            if (c) {
                m();
            }
            return v;
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
            return v;
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
            window.$rink = v;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map