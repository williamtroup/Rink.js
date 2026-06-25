/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        type.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export type ConfigurationOptions = {
    responsiveDelay?: number;
};

export type AnchorOptions = {
    anchorTag: HTMLAnchorElement;
    newTarget?: string;
    originalTarget?: string;
};