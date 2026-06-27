/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        rink.ts
 * @version     v1.3.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type AnchorTagsProcessed,
    type AnchorOptions,
    type ConfigurationOptions } from "./ts/type";

import { type PublicApi } from "./ts/api";

import { Is } from "./ts/data/is";
import { Configuration } from "./ts/options/config";
import { DocumentElement } from "./ts/dom/document-element";
import { Constant } from "./ts/constant";
import { Char, ScreenSize, Value } from "./ts/data/enum";
import { Observation } from "./ts/data/observation";
import { Default } from "./ts/data/default";


( () : void => {
    // Variables: Configuration
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;

    // Variables: Anchors
    let _screenWidthAnchors: Record<string, AnchorOptions[]> = {};
    let _screenWidthChangeTimer: number = 0;
    let _enabled: boolean = true;
    let _windowEventListenerAdded: boolean = false;
    

    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Fetching
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fetchAll() : void {
        let anchorTagsFound: boolean = false;

        const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( "a" );
        const elements: HTMLElement[] = [].slice.call( domElements );
        const elementsLength: number = elements.length;

        for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
            if ( processElement( elements[ elementIndex ] as HTMLAnchorElement ) ) {
                anchorTagsFound = true;
            }
        }

        if ( anchorTagsFound ) {
            if ( !_windowEventListenerAdded ) {
                window.addEventListener( "resize", onWindowResize );

                _windowEventListenerAdded = true;
            }

            if ( _enabled ) {
                updateAnchorTags();
            }
        }
    }

    function processElement( anchorElement: HTMLAnchorElement ) : boolean {
        let added: boolean = false;

        const attributeSmData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_SM )!;
        const attributeMdData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_MD )!;
        const attributeLgData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_LG )!;
        const attributeXlData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_XL )!;
        const attributeXxlData: string = anchorElement.getAttribute( Constant.RINK_JS_ATTRIBUTE_NAME_XXL )!;

        if ( Is.definedString( attributeSmData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.sm, anchorElement, attributeSmData, Constant.RINK_JS_ATTRIBUTE_NAME_SM );
            added = true;
        }

        if ( Is.definedString( attributeMdData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.md, anchorElement, attributeMdData, Constant.RINK_JS_ATTRIBUTE_NAME_MD );
            added = true;
        }

        if ( Is.definedString( attributeLgData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.lg, anchorElement, attributeLgData, Constant.RINK_JS_ATTRIBUTE_NAME_LG );
            added = true;
        }

        if ( Is.definedString( attributeXlData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.xl, anchorElement, attributeXlData, Constant.RINK_JS_ATTRIBUTE_NAME_XL );
            added = true;
        }

        if ( Is.definedString( attributeXxlData ) ) {
            addAnchorToScreenWidthAnchors( ScreenSize.xxl, anchorElement, attributeXxlData, Constant.RINK_JS_ATTRIBUTE_NAME_XXL );
            added = true;
        }

        findCustomSizeAttributes( anchorElement );

        return added;
    }

    function findCustomSizeAttributes( anchorElement: HTMLAnchorElement ) : void {
        const anchorTagAttributes: NamedNodeMap = anchorElement.attributes;
        const anchorTagAttributesLength: number = anchorTagAttributes.length;

        for ( let anchorTagAttributeIndex = 0; anchorTagAttributeIndex < anchorTagAttributesLength; anchorTagAttributeIndex++ ) {
            const anchorTagAttribute: Attr = anchorTagAttributes[ anchorTagAttributeIndex ];

            if ( anchorTagAttribute.name.startsWith( Constant.RINK_JS_ATTRIBUTE_NAME_CUSTOM ) ) {
                const attributeNameParts: string[] = anchorTagAttribute.name.split( Char.dash );
                const attributeWidth: number = Default.getNumber( attributeNameParts[ attributeNameParts.length - 1 ], 0 );
                const anchorTarget: string = anchorTagAttribute.value;

                if ( attributeWidth > 0 && Is.definedString( anchorTarget ) ) {
                    addAnchorToScreenWidthAnchors( attributeWidth, anchorElement, anchorTarget, anchorTagAttribute.name );
                }
            }
        }
    }

    function addAnchorToScreenWidthAnchors( screenSize: number, anchorElement: HTMLAnchorElement, newTarget: string, attributeName: string ) : void {
        if ( !Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenSize.toString() ) ) {
            _screenWidthAnchors[ screenSize.toString() ] = [];
        }

        _screenWidthAnchors[ screenSize.toString() ].push( {
            anchorTag: anchorElement,
            newTarget: newTarget,
            originalTarget: anchorElement.getAttribute( "target" ),
        } as AnchorOptions );

        if ( _configurationOptions.removeAttributes ) {
            anchorElement.removeAttribute( attributeName );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Window Resizing
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function onWindowResize() : void {
        if ( _enabled ) {
            if ( _screenWidthChangeTimer !== 0 ) {
                clearTimeout( _screenWidthChangeTimer );
            }

            _screenWidthChangeTimer = setTimeout( () => updateAnchorTags(), _configurationOptions.responsiveDelay! );
        }
    }

    function updateAnchorTags() : void {
        updateAnchorTagTargetsNotProcessed( updateAnchorTagTargets() );
    }

    function updateAnchorTagTargets() : AnchorTagsProcessed {
        const anchorTagsProcessed: AnchorTagsProcessed = {
            screenWidths: [],
            anchorTags: [],
        };

        const screenWidths: string[] = getSortedScreenWidths();
        const screenWidthsLength: number = screenWidths.length;

        for ( let screenWidthIndex = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenWidth ) ) {
                const windowWidth: number = window.innerWidth;
                const windowCheckWidth: number = parseInt( screenWidth );

                if ( windowWidth >= windowCheckWidth ) {
                    const anchorTags: AnchorOptions[] = _screenWidthAnchors[ screenWidth ];
                    const anchorTagsLength: number = anchorTags.length;

                    anchorTagsProcessed.screenWidths.push( screenWidth );

                    for ( let anchorTagIndex = 0; anchorTagIndex < anchorTagsLength; anchorTagIndex++ ) {
                        const anchorTag: AnchorOptions = anchorTags[ anchorTagIndex ];

                        if ( anchorTagsProcessed.anchorTags.indexOf( anchorTag.anchorTag ) === Value.notFound ) {
                            anchorTagsProcessed.anchorTags.push( anchorTag.anchorTag );
                            anchorTag.anchorTag.setAttribute( "target", anchorTag.newTarget! );
                        }
                    }
                }
            }
        }

        return anchorTagsProcessed;
    }

    function updateAnchorTagTargetsNotProcessed( anchorTagsProcessed: AnchorTagsProcessed ) : void {
        const screenWidths: string[] = getSortedScreenWidths();
        const screenWidthsLength: number = screenWidths.length;

        for ( let screenWidthIndex = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthAnchors, screenWidth ) ) {
                if ( anchorTagsProcessed.screenWidths.indexOf( screenWidth ) === Value.notFound ) {
                    const anchorTags: AnchorOptions[] = _screenWidthAnchors[ screenWidth ];
                    const anchorTagsLength: number = anchorTags.length;

                    for ( let anchorTagIndex = 0; anchorTagIndex < anchorTagsLength; anchorTagIndex++ ) {
                        const anchorTag: AnchorOptions = anchorTags[ anchorTagIndex ];

                        if ( anchorTagsProcessed.anchorTags.indexOf( anchorTag.anchorTag ) === Value.notFound ) {
                            let originalTarget: string | null = anchorTag.originalTarget!;

                            if ( !Is.definedString( originalTarget ) ) {
                                originalTarget = _configurationOptions.defaultTarget!;
                            }

                            anchorTag.anchorTag.setAttribute( "target", originalTarget );
                        }
                    }
                }
            }
        }
    }

    function getSortedScreenWidths() : string[] {
        return Object.keys( _screenWidthAnchors ).sort( ( optionA: string, optionB: string ) : number => 
            optionB.toLowerCase().localeCompare( optionA.toLowerCase() )
        );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
        * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        * Public API Functions:  Control
        * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        */

        start: function () : PublicApi {
            if ( !_enabled ) {
                _enabled = true;

                updateAnchorTags();
            }

            return _public;
        },
        
        stop: function () : PublicApi {
            _enabled = false;

            return _public;
        },

        fetch: function () : PublicApi {
            if ( !_configurationOptions.removeAttributes ) {
                _screenWidthAnchors = {} as Record<string, AnchorOptions[]>;
            }

            fetchAll();

            return _public;
        },

        refresh: function () : PublicApi {
            if ( _enabled ) {
                updateAnchorTags();
            }

            return _public;
        },


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
                    _enabled = _configurationOptions.enabled!;

                    Observation.setup( _configurationOptions, () : void => fetchAll() );
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
            return "1.3.0";
        }
    };

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Rink.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () : void => {
        _configurationOptions = Configuration.Options.get();
        _enabled = _configurationOptions.enabled!;
        
        DocumentElement.onContentLoaded( () : void => {
            fetchAll();
            
            Observation.setup( _configurationOptions, () : void => fetchAll() );
        } );

        if ( !Is.defined( window.$rink ) ) {
            window.$rink = _public;
        }
    } )();
} )();