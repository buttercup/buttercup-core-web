# Buttercup core library - for the web
Web-based build of the Buttercup core library.

[![Buttercup](https://dl.dropboxusercontent.com/u/16657557/Works/Buttercup/badge.svg)](https://buttercup.pw) [![Join the chat at https://gitter.im/buttercup-pw/buttercup-core-web](https://badges.gitter.im/buttercup-pw/buttercup-core-web.svg)](https://gitter.im/buttercup-pw/buttercup-core-web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/buttercup-pw/buttercup-core-web.svg?branch=master)](https://travis-ci.org/buttercup-pw/buttercup-core-web)

[![Buttercup-web](https://nodei.co/npm/buttercup-web.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/buttercup-web)

For the most part, this library inherits all functionality from [Buttercup core](https://github.com/buttercup-pw/buttercup-core) ([API](https://github.com/buttercup-pw/buttercup-core/blob/master/doc/api.md)).

## Cryptography
The core-web library utilises current technology to encrypt and hash and very high speed, and this is supported by only the [newest browsers](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Browser_compatibility).

Buttercup-core-web, like Buttercup-core, uses [iocane](https://github.com/perry-mitchell/iocane) for text encryption and decryption. iocane uses 256bit AES encryption to securely store password archives, and is completely compatible with most modern browsers.
