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
            n.defaultTarget = e.getString(n.defaultTarget, "_self");
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
    function a() {
        const t = [ "a" ];
        const e = t.length;
        let n = false;
        for (let r = 0; r < e; r++) {
            const e = document.getElementsByTagName(t[r]);
            const i = [].slice.call(e);
            const o = i.length;
            for (let t = 0; t < o; t++) {
                if (f(i[t])) {
                    n = true;
                }
            }
        }
        if (n) {
            window.addEventListener("resize", u);
            g();
        }
    }
    function f(e) {
        let n = false;
        const r = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_SM);
        const o = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_MD);
        const s = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_LG);
        const a = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XL);
        const f = e.getAttribute(i.RINK_JS_ATTRIBUTE_NAME_XXL);
        if (t.definedString(r)) {
            d(576, e, r);
            n = true;
        }
        if (t.definedString(o)) {
            d(768, e, o);
            n = true;
        }
        if (t.definedString(s)) {
            d(992, e, s);
            n = true;
        }
        if (t.definedString(a)) {
            d(1200, e, a);
            n = true;
        }
        if (t.definedString(f)) {
            d(1400, e, f);
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
                    d(parseInt(i), e, o);
                }
            }
        }
    }
    function d(n, r, i) {
        if (!Object.prototype.hasOwnProperty.call(o, n.toString())) {
            o[n.toString()] = [];
        }
        let s = r.getAttribute("target");
        if (!t.definedString(s)) {
            s = e.defaultTarget;
        }
        o[n.toString()].push({
            anchorTag: r,
            newTarget: i,
            originalTarget: s
        });
    }
    function u() {
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
        r.onContentLoaded(() => a());
        if (!t.defined(window.$rink)) {
            window.$rink = _;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map