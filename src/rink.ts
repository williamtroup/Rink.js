/**
 * Rink.js
 * 
 * A JavaScript library for dynamically creating responsive link destinations in HTML.
 * 
 * @file        rink.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "./ts/type";
import { type PublicApi } from "./ts/api";
import { Is } from "./ts/data/is";
import { Configuration } from "./ts/options/config";
import { DocumentElement } from "./ts/dom/document-element";


( () : void => {
    // Variables: Configuration
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;
    

    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() : void {
        const tagTypes: string[] = [ "a" ];
        const tagTypesLength: number = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                // TODO:  Add rendering logic here.
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