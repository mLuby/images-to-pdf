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
# How it works
1. Create a one-page full-size PDF for each image (put PDFs in the same directory) (`123.png` -> `123.png.pdf`)
2. Combine those PDFs into the result PDF using included `combinePdfs`
3. Remove the temporary one-pages PDFs.

# Dependencies
- Java 6 apparently due to [pdfmerger](https://www.npmjs.com/package/pdfmerger). If anyone knows a way to remove this dependency please comment here [#1](https://github.com/mLuby/images-to-pdf/issues/1)!
