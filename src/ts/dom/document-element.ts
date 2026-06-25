/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        document-element.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export namespace DocumentElement {
    export function onContentLoaded( onLoadFunc: Function ) : void {
        if ( document.readyState === "loading" ) {
            document.addEventListener( "DOMContentLoaded", () : void => onLoadFunc() );
        } else {
            onLoadFunc();
        }
    }
}