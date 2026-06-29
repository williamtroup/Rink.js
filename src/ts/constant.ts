/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        constant.ts
 * @version     v1.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export namespace Constant {
    export namespace CustomAttribute {
        export const RINK_JS_SM: string = "data-rink-js-sm";
        export const RINK_JS_MD: string = "data-rink-js-md";
        export const RINK_JS_LG: string = "data-rink-js-lg";
        export const RINK_JS_XL: string = "data-rink-js-xl";
        export const RINK_JS_XXL: string = "data-rink-js-xxl";
        export const RINK_JS_CUSTOM: string = "data-rink-js";
    }

    export namespace Attribute {
        export const TARGET: string = "target";
    }

    export namespace Event {
        export const RESIZE: string = "resize";
    }
}