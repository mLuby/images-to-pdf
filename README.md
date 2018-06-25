[![Build Status](https://travis-ci.org/mLuby/images-to-pdf.svg?branch=master)](https://travis-ci.org/mLuby/images-to-pdf)[![Coverage Status](https://coveralls.io/repos/github/mLuby/images-to-pdf/badge.svg?branch=master)](https://coveralls.io/github/mLuby/images-to-pdf?branch=master)
# ImagesToPdf
Combines images into a single PDF. 😇

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
