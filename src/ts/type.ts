/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        type.ts
 * @version     v1.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export type ConfigurationOptions = {
    responsiveDelay?: number;
    defaultTarget?: string;
    removeAttributes?: boolean;
    enabled?: boolean;
};

export type AnchorOptions = {
    anchorTag: HTMLAnchorElement;
    newTarget?: string;
    originalTarget?: string;
};

export type AnchorTagsProcessed = {
    screenWidths: string[];
    anchorTags: HTMLAnchorElement[];
}