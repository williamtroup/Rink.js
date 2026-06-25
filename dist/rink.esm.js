var n;

(n => {
    function e(n) {
        return n !== null && n !== void 0 && n.toString() !== "";
    }
    n.defined = e;
    function t(n) {
        return e(n) && typeof n === "object";
    }
    n.definedObject = t;
    function o(n) {
        return e(n) && typeof n === "boolean";
    }
    n.definedBoolean = o;
    function r(n) {
        return e(n) && typeof n === "string";
    }
    n.definedString = r;
    function i(n) {
        return e(n) && typeof n === "function";
    }
    n.definedFunction = i;
    function f(n) {
        return e(n) && typeof n === "number";
    }
    n.definedNumber = f;
    function d(n) {
        return t(n) && n instanceof Array;
    }
    n.definedArray = d;
})(n || (n = {}));

var e;

(e => {
    function t(e, t) {
        return n.definedString(e) ? e : t;
    }
    e.getString = t;
    function o(e, t) {
        return n.definedBoolean(e) ? e : t;
    }
    e.getBoolean = o;
    function r(e, t) {
        return n.definedNumber(e) ? e : t;
    }
    e.getNumber = r;
    function i(e, t) {
        return n.definedFunction(e) ? e : t;
    }
    e.getFunction = i;
    function f(e, t) {
        return n.definedArray(e) ? e : t;
    }
    e.getArray = f;
    function d(e, t) {
        return n.definedObject(e) ? e : t;
    }
    e.getObject = d;
    function u(e, t) {
        let o = t;
        if (n.definedString(e)) {
            const n = e.toString().split(" ");
            if (n.length === 0) {
                e = t;
            } else {
                o = n;
            }
        } else {
            o = f(e, t);
        }
        return o;
    }
    e.getStringOrArray = u;
})(e || (e = {}));

var t;

(n => {
    let t;
    (n => {
        function t(n = null) {
            const t = e.getObject(n, {});
            t.safeMode = e.getBoolean(t.safeMode, true);
            return t;
        }
        n.get = t;
    })(t = n.Options || (n.Options = {}));
})(t || (t = {}));

var o;

(n => {
    function e(n) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => n());
        } else {
            n();
        }
    }
    n.onContentLoaded = e;
})(o || (o = {}));

(() => {
    let e = {};
    function r() {
        const n = [ "a" ];
        const e = n.length;
        for (let t = 0; t < e; t++) {
            const e = document.getElementsByTagName(n[t]);
            const o = [].slice.call(e);
            const r = o.length;
            for (let n = 0; n < r; n++) {}
        }
    }
    const i = {
        setConfiguration: o => {
            if (n.definedObject(o)) {
                const n = e;
                let r = false;
                for (const e in o) {
                    if (Object.prototype.hasOwnProperty.call(o, e) && Object.prototype.hasOwnProperty.call(n, e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        r = true;
                    }
                }
                if (r) {
                    e = t.Options.get(n);
                }
            }
            return i;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        e = t.Options.get();
        o.onContentLoaded(() => r());
        if (!n.defined(window.$rink)) {
            window.$rink = i;
        }
    })();
})();//# sourceMappingURL=rink.esm.js.map