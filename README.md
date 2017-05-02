# Buttercup core library - for the web
Web-based build of the Buttercup core library.

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![Join the chat at https://gitter.im/buttercup-pw/buttercup-core-web](https://badges.gitter.im/buttercup-pw/buttercup-core-web.svg)](https://gitter.im/buttercup-pw/buttercup-core-web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/buttercup/buttercup-core-web.svg?branch=master)](https://travis-ci.org/buttercup/buttercup-core-web)

[![Buttercup-web](https://nodei.co/npm/buttercup-web.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/buttercup-web)

For the most part this library inherits all functionality from [Buttercup core](https://github.com/buttercup-pw/buttercup-core), but it also contains some web-specific functionality in the way of tools and rigs.

API reference:

 * This API ([core-web](API.md))
 * [Core API](https://github.com/buttercup/buttercup-core/blob/master/doc/api.md)
 
## _**Deprecated**: Core-web will slowly be integrated completely with [Buttercup core](https://github.com/buttercup/buttercup-core/)_

## Usage
Buttercup core-web is a UMD module, so you can import it using [AMD](http://requirejs.org/docs/whyamd.html#amd) or [CommonJS](http://requirejs.org/docs/whyamd.html#commonjs) styles, or by simply including it as script on a webpage (exposes `Buttercup` and `Buttercup.Web` on the `window`).

## Cryptography
The core-web library utilises current technology to encrypt and hash and very high speed, and this is supported by only the [newest browsers](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Browser_compatibility).

Buttercup-core-web, like Buttercup-core, uses [iocane](https://github.com/perry-mitchell/iocane) for text encryption and decryption. iocane uses 256bit AES encryption to securely store password archives, and is completely compatible with most modern browsers.
