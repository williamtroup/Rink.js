/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        rink.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type AnchorOptions,
    type ConfigurationOptions } from "./ts/type";

import { type PublicApi } from "./ts/api";

import { Is } from "./ts/data/is";
import { Configuration } from "./ts/options/config";
import { DocumentElement } from "./ts/dom/document-element";
import { Constant } from "./ts/constant";
import { Char, ScreenSize, Value } from "./ts/data/enum";


( () : void => {
    // Variables: Configuration
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;

    // Variables: Anchors
    const _screenWidthAnchors: Record<string, AnchorOptions[]> = {};
    let _screenWidthChangeTimer: number = 0;
    

    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() : void {
        const tagTypes: string[] = [ "a" ];
        const tagTypesLength: number = tagTypes.length;
        let anchorTagsFound: boolean = false;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( renderElement( elements[ elementIndex ] as HTMLAnchorElement ) ) {
                    anchorTagsFound = true;
                }
            }
        }

        if ( anchorTagsFound ) {
            window.addEventListener( "resize", onWindowResize );

            updateAnchorTags();
        }
    }

    function renderElement( anchorElement: HTMLAnchorElement ) : boolean {
        let added: boolean = false;

        const attributeSmData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_SM )!;
        const attributeMdData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_MD )!;
        const attributeLgData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_LG )!;
        const attributeXlData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_XL )!;
        const attributeXxlData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_XXL )!;

        if ( Is.definedString( attributeSmData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.sm, anchorElement, attributeSmData );
            added = true;
        }

        if ( Is.definedString( attributeMdData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.md, anchorElement, attributeMdData );
            added = true;
        }

        if ( Is.definedString( attributeLgData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.lg, anchorElement, attributeLgData );
            added = true;
        }

        if ( Is.definedString( attributeXlData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.xl, anchorElement, attributeXlData );
            added = true;
        }

        if ( Is.definedString( attributeXxlData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.xxl, anchorElement, attributeXxlData );
            added = true;
        }

        if ( !added ) {
            findCustomSizeAnchor( anchorElement );
        }

        return added;
    }

    function findCustomSizeAnchor( anchorElement: HTMLAnchorElement ) : void {
        const anchorTagAttributes: NamedNodeMap = anchorElement.attributes;
        const anchorTagAttributesLength: number = anchorTagAttributes.length;

        for ( let anchorTagAttributeIndex = 0; anchorTagAttributeIndex < anchorTagAttributesLength; anchorTagAttributeIndex++ ) {
            const anchorTagAttribute: Attr = anchorTagAttributes[ anchorTagAttributeIndex ];

            if ( anchorTagAttribute.name.startsWith( Constant.RINK_JS_ATTRIBUTE_NAME_CUSTOM ) ) {
                const attributeNameParts: string[] = anchorTagAttribute.name.split( Char.dash );
                const attributeWidth: string = attributeNameParts[ attributeNameParts.length - 1 ];
                const anchorTarget: string = anchorTagAttribute.value;

                if ( Is.definedString( anchorTarget ) ) {
                    addAnchorToScreenWidthAnchors( parseInt( attributeWidth ), anchorElement, anchorTarget );
                }
            }
        }
    }

    function addAnchorToScreenWidthAnchors( screenSize: number, anchorElement: HTMLAnchorElement, newTarget: string ) : void {
        if ( !Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenSize.toString() ) ) {
            _screenWidthAnchors[ screenSize.toString() ] = [];
        }

        _screenWidthAnchors[ screenSize.toString() ].push( {
            anchorTag: anchorElement,
            newTarget: newTarget,
            originalTarget: anchorElement.getAttribute( "target" )!
        } as AnchorOptions );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Window Resizing
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function onWindowResize() : void {
        if ( _screenWidthChangeTimer !== 0 ) {
            clearTimeout( _screenWidthChangeTimer );
        }

        _screenWidthChangeTimer = setTimeout( () => updateAnchorTags(), _configurationOptions.responsiveDelay! );
    }

    function updateAnchorTags() : void {
        updateAnchorTagsNotProcessed( updateAnchorTagTargets() );
    }

    function updateAnchorTagTargets() : string[] {
        const screenWidthsProcessed: string[] = [];

        for ( const screenWidth in _screenWidthAnchors ) {
            if ( Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenWidth ) ) {
                const windowWidth: number = window.innerWidth;
                const windowCheckWidth: number = parseInt( screenWidth );

                if ( windowWidth >= windowCheckWidth ) {
                    const anchorTags: AnchorOptions[] = _screenWidthAnchors[ screenWidth ];
                    const anchorTagsLength: number = anchorTags.length;

                    screenWidthsProcessed.push( screenWidth );

                    for ( let anchorTagIndex = 0; anchorTagIndex < anchorTagsLength; anchorTagIndex++ ) {
                        const anchorTag: AnchorOptions = anchorTags[ anchorTagIndex ];

                        anchorTag.anchorTag.setAttribute( "target", anchorTag.newTarget! );
                    }
                }
            }
        }

        return screenWidthsProcessed;
    }

    function updateAnchorTagsNotProcessed( screenWidthsProcessed: string[] ) : void {
        for ( const screenWidth in _screenWidthAnchors ) {
            if ( Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenWidth ) ) {
                if ( screenWidthsProcessed.indexOf( screenWidth ) === Value.notFound ) {
                    const anchorTags: AnchorOptions[] = _screenWidthAnchors[ screenWidth ];
                    const anchorTagsLength: number = anchorTags.length;

                    for ( let anchorTagIndex = 0; anchorTagIndex < anchorTagsLength; anchorTagIndex++ ) {
                        const anchorTag: AnchorOptions = anchorTags[ anchorTagIndex ];

                        anchorTag.anchorTag.setAttribute( "target", anchorTag.originalTarget! );
                    }
                }
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: ( configurationOptions: ConfigurationOptions ) : PublicApi => {
            if ( Is.definedObject( configurationOptions ) ) {
                const existingConfigurationOptions: ConfigurationOptions = _configurationOptions;
                let configurationOptionsHaveChanged: boolean = false;
            
                for ( const propertyName in configurationOptions ) {
                    if ( Object.prototype.hasOwnProperty.call( configurationOptions, propertyName ) && Object.prototype.hasOwnProperty.call( existingConfigurationOptions, propertyName ) && existingConfigurationOptions[ propertyName ] !== configurationOptions[ propertyName ] ) {
                        existingConfigurationOptions[ propertyName ] = configurationOptions[ propertyName ];
                        configurationOptionsHaveChanged = true;
                    }
                }
        
                if ( configurationOptionsHaveChanged ) {
                    _configurationOptions = Configuration.Options.get( existingConfigurationOptions );
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getVersion: () : string => {
            return "1.0.0";
        }
    };

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Rink.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () : void => {
        _configurationOptions = Configuration.Options.get();
        
        DocumentElement.onContentLoaded( () : void => render() );

        if ( !Is.defined( window.$rink ) ) {
            window.$rink = _public;
        }
    } )();
} )();