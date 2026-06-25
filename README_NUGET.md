# Rink.js v1.0.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Rink.js%2C%20a%20free%20JavaScript%json%20converter&url=https://github.com/williamtroup/Rink.js&hashtags=javascript,json,html,converter)
[![npm](https://img.shields.io/badge/npmjs-v1.0.0-blue)](https://www.npmjs.com/package/rink.js)
[![nuget](https://img.shields.io/badge/nuget-v1.0.0-purple)](https://www.nuget.org/packages/Rink.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Rink.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Rink.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)

> 📃 A JavaScript library for dynamically creating responsive link destinations in HTML.


## What features does Rink.js have?

- 😏 Zero-dependencies and extremely lightweight!
- 🦾 Written in TypeScript, allowing greater support for React, Angular, and other libraries!
- 💻 Full API available via public functions.
- 🌈 Full support for Attributes, CSS style properties, and formatted text!
- ⭐ Write your JSON directly to any DOM element for rendering, or get the base element for use elsewhere.
- 📋 Copy the layout for an entire page without additional files!
- 🔍 Apply additional filters to exclude specific node types, CSS styles, attributes, etc.
- 🔠 Data templating for text (with defaults support).
- 🎥 Write CSS directly back to the head for each element!
- 💧 Bind JSON directly to DOM elements!
- 📷 Include and write images as Base 64 URLs.


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What are the most recent changes?

To see a list of all the most recent changes, click [here](https://www.william-troup.com/rink-js/documentation/recent-changes.html).


## How do I install Rink.js?

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install rink.js
```

Or, you can download the latest zipped up version [here](https://www.william-troup.com/rink-js/download.html).

Or, you can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Rink.js@1.0.0/dist/rink.min.js
https://cdn.jsdelivr.net/gh/williamtroup/Rink.js@1.0.0/dist/rink.export.js
```


## How do I get started?

To get started using Rink.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<script src="dist/rink.js"></script>
```

### 3. DOM Element Binding:

```markdown
<div id="header" class="header">
    <h1>Rink.js</h1>
    <p>This is a {{template_type | basic}} example of how to use <b>Rink.js</b> ... with template data {{template_data}}.</p>
</div>

<script>
    var header = document.getElementById( "header" );

    var json = $rink
        .json()
        .includeAttributes( true )
        .includeDataAttributes( true )
        .includeCssProperties( true )
        .includeText( true )
        .includeChildren( true )
        .includeImagesAsBase64( false )
        .friendlyFormat( true )
        .indentSpaces( 2 )
        .ignoreNodeTypes( "q" )
        .ignoreNodeCondition( null )
        .ignoreCssProperties( "padding" )
        .ignoreAttributes( "data-your-attribute" )
        .ignoreElementIds( "your-element-id" )
        .generateUniqueMissingIds( false )
        .generateUniqueMissingNames( false )
        .propertyReplacer( null )
        .get( header );

    $rink
        .html()
        .json( json )
        .templateData( { "{{template_data}}": "this template data" } )
        .removeOriginalAttributes( true )
        .removeOriginalDataAttributes( true )
        .clearOriginalHTML( true )
        .addCssToHead( false )
        .clearCssFromHead( false )
        .logTemplateDataWarnings( false )
        .addAttributes( true )
        .addDataAttributes( true )
        .addCssProperties( true )
        .addText( true )
        .addChildren( true )
        .insertBefore( false )
        .write( header );

    var element = $rink
        .html()
        .json( json )
        .templateData( { "{{template_data}}": "this template data" } )
        .removeOriginalAttributes( true )
        .removeOriginalDataAttributes( true )
        .clearOriginalHTML( true )
        .addCssToHead( false )
        .clearCssFromHead( false )
        .logTemplateDataWarnings( false )
        .addAttributes( true )
        .addDataAttributes( true )
        .addCssProperties( true )
        .addText( true )
        .addChildren( true )
        .get();
</script>
```


### 4. DOM Element Binding (for writing JSON as HTML):

```markdown
<div data-rink-js="{ 'json': 'json string' }">
    Your HTML.
</div>
```

To see a list of all the available binding options you can use for "data-rink-js", click [here](https://www.william-troup.com/rink-js/documentation/binding-options.html).

To see a list of all the available custom triggers you can use for "data-rink-js", click [here](https://www.william-troup.com/rink-js/documentation/binding-options-custom-triggers.html).


### 5. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Rink.js?

To customize, and get more out of Rink.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://www.william-troup.com/rink-js/documentation/public-functions.html).


### 2. Configuration:

Configuration options allow you to customize how Rink.js will function.  You can set them as follows:

```markdown
<script> 
    $rink.setConfiguration( {
        safeMode: false
    } );
</script>
```

To see a list of all the available configuration options you can use, click [here](https://www.william-troup.com/rink-js/documentation/options.html).