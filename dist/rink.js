"use strict";

var e;

(e => {
    function n(e) {
        return e !== null && e !== void 0 && e.toString() !== "";
    }
    e.defined = n;
    function t(e) {
        return n(e) && typeof e === "object";
    }
    e.definedObject = t;
    function o(e) {
        return n(e) && typeof e === "boolean";
    }
    e.definedBoolean = o;
    function r(e) {
        return n(e) && typeof e === "string";
    }
    e.definedString = r;
    function i(e) {
        return n(e) && typeof e === "function";
    }
    e.definedFunction = i;
    function d(e) {
        return n(e) && typeof e === "number";
    }
    e.definedNumber = d;
    function f(e) {
        return t(e) && e instanceof Array;
    }
    e.definedArray = f;
})(e || (e = {}));

var n;

(n => {
    function t(n, t) {
        return e.definedString(n) ? n : t;
    }
    n.getString = t;
    function o(n, t) {
        return e.definedBoolean(n) ? n : t;
    }
    n.getBoolean = o;
    function r(n, t) {
        return e.definedNumber(n) ? n : t;
    }
    n.getNumber = r;
    function i(n, t) {
        return e.definedFunction(n) ? n : t;
    }
    n.getFunction = i;
    function d(n, t) {
        return e.definedArray(n) ? n : t;
    }
    n.getArray = d;
    function f(n, t) {
        return e.definedObject(n) ? n : t;
    }
    n.getObject = f;
    function u(n, t) {
        let o = t;
        if (e.definedString(n)) {
            const e = n.toString().split(" ");
            if (e.length === 0) {
                n = t;
            } else {
                o = e;
            }
        } else {
            o = d(n, t);
        }
        return o;
    }
    n.getStringOrArray = u;
})(n || (n = {}));

var t;

(e => {
    let t;
    (e => {
        function t(e = null) {
            const t = n.getObject(e, {});
            t.safeMode = n.getBoolean(t.safeMode, true);
            t.domElementTypes = n.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.formattingNodeTypes = n.getStringOrArray(t.formattingNodeTypes, [ "b", "strong", "i", "em", "mark", "small", "del", "ins", "sub", "sup" ]);
            return t;
        }
        e.get = t;
    })(t = e.Options || (e.Options = {}));
})(t || (t = {}));

var o;

(e => {
    function n(e) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => e());
        } else {
            e();
        }
    }
    e.onContentLoaded = n;
})(o || (o = {}));

(() => {
    let n = {};
    function r() {
        const e = n.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const r = o.length;
            for (let e = 0; e < r; e++) {}
        }
    }
    const i = {
        setConfiguration: o => {
            if (e.definedObject(o)) {
                const e = n;
                let r = false;
                for (const n in o) {
                    if (Object.prototype.hasOwnProperty.call(o, n) && Object.prototype.hasOwnProperty.call(e, n) && e[n] !== o[n]) {
                        e[n] = o[n];
                        r = true;
                    }
                }
                if (r) {
                    n = t.Options.get(e);
                }
            }
            return i;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        n = t.Options.get();
        o.onContentLoaded(() => r());
        if (!e.defined(window.$rink)) {
            window.$rink = i;
        }
    })();
})();//# sourceMappingURL=rink.js.map