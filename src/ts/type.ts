/**
 * Rink.js
 * 
 * A JavaScript library for dynamically creating responsive link destinations in HTML.
 * 
 * @file        type.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export type ConfigurationOptions = {
    safeMode?: boolean;
};

export type AnchorOptions = {
    anchorTag: HTMLAnchorElement;
    newTarget?: string;
    originalTarget?: string;
};