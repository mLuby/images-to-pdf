[![Build Status](https://travis-ci.org/mLuby/images-to-pdf.svg?branch=master)](https://travis-ci.org/mLuby/images-to-pdf)[![Coverage Status](https://coveralls.io/repos/github/mLuby/images-to-pdf/badge.svg?branch=master)](https://coveralls.io/github/mLuby/images-to-pdf?branch=master)
# ImagesToPdf [[Deprecated](#deprecation)]
Combines images into a single PDF. 😇

### Deprecation
This package relies entirely on the wonderful [HummusJS](https://github.com/galkahana/HummusJS) PDF library, which unfortunately but understandably is [no longer being maintained](https://github.com/galkahana/HummusJS#hummusjs). Hummus now **`fails as of Node v14`**, so that limitation is present in this library as well. I have no plans to rewrite this package to use a different PDF library, but I'll happily entertain contributions and discussions to that end.

# Quick Start
### Install
```sh
npm install --save images-to-pdf
```

### Use
```js
const imagesToPdf = require("images-to-pdf")
await imagesToPdf(["path/to/image1.jpg", "path/to/image2.png"], "path/to/combined.pdf")
// path/to/combined.pdf now exists.
```
