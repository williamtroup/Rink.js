/**
 * Rink.js
 * 
 * A JavaScript library for dynamically creating responsive link destinations in HTML.
 * 
 * @file        trigger.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { Is } from "../data/is";


export namespace Trigger {
    export function customEvent( triggerFunction: Function, ...args : any[] ) : void {
        if ( Is.definedFunction( triggerFunction ) ) {
            triggerFunction.apply( null, [].slice.call( args, 0 ) );
        }
    }
}