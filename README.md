<h1 align="center">
Rink.js

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Rink.js%2C%20a%20free%20JavaScript%json%20converter&url=https://github.com/williamtroup/Rink.js&hashtags=javascript,json,html,converter)
[![npm](https://img.shields.io/badge/npmjs-v1.0.0-blue)](https://www.npmjs.com/package/rink.js)
[![nuget](https://img.shields.io/badge/nuget-v1.0.0-purple)](https://www.nuget.org/packages/Rink.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Rink.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Rink.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)
</h1>

> <p align="center">📃 A JavaScript library for dynamically creating responsive link destinations in HTML.</p>
> <p align="center">v1.0.0</p>
<br />
<br />


<h1>What features does Rink.js have?</h1>

- 😏 Zero-dependencies and extremely lightweight!
- 🦾 Written in TypeScript, allowing greater support for React, Angular, and other libraries!
- 💻 Full API available via public functions.
<br />
<br />


<h1>What browsers are supported?</h1>

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.
<br>
<br>


<h1>What are the most recent changes?</h1>

To see a list of all the most recent changes, click [here](https://www.william-troup.com/rink-js/documentation/recent-changes.html).
<br>
<br>


<h1>How do I install Rink.js?</h1>

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install rink.js
```

Or, you can download the latest zipped up version [here](https://www.william-troup.com/rink-js/download.html).

Or, you can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Rink.js@1.0.0/dist/rink.min.js
```
<br>
<br>


<h1>How do I get started?</h1>

To get started using Rink.js, do the following steps:
<br>
<br>

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```
<br>


### 2. Include Files:

```markdown
<script src="dist/rink.js"></script>
```
<br>


### 3. Getting/Rendering JSON:

```markdown
<a href="https://www.william-troup.com/" data-rink-js-md="_blank" target="_self"></a>
```

<br>


### 4. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).
<br>
<br>

<h1>How do I go about customizing Rink.js?</h1>

To customize, and get more out of Rink.js, please read through the following documentation.
<br>
<br>


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://www.william-troup.com/rink-js/documentation/public-functions.html).
<br>
<br>


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