/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        is.ts
 * @version     v1.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { Char } from "./enum";


export namespace Is {
    export function defined( value: any ) : boolean {
        return value !== null && value !== undefined && value.toString() !== Char.empty;
    }

    export function definedObject( object: any ) : boolean {
        return defined( object ) && typeof object === "object";
    }

    export function definedString( object: any ) : boolean {
        return defined( object ) && typeof object === "string";
    }

    export function definedNumber( object: any ) : boolean {
        return defined( object ) && typeof object === "number";
    }

    export function definedBoolean( object: unknown ) : boolean {
        return defined( object ) && typeof object === "boolean";
    }
}