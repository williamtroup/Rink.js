/**
 * Rink.js
 * 
 * A JavaScript library for generating responsive HTML link targets.
 * 
 * @file        config.ts
 * @version     v1.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "../type";
import { Default } from "../data/default";


export namespace Configuration {
    export namespace Options {
        export function get( newConfigurationOptions: unknown = null ) : ConfigurationOptions {
            const configurationOptions: ConfigurationOptions = Default.getObject( newConfigurationOptions, {} as ConfigurationOptions );
            configurationOptions.responsiveDelay = Default.getNumber( configurationOptions.responsiveDelay, 250 );
            configurationOptions.defaultTarget = Default.getString( configurationOptions.defaultTarget, "_self" );

            return configurationOptions;
        }
    }
}