const fs = require("fs")
const {promisify} = require("util")
const PdfPrinter = require("pdfmake")
const Roboto64 = require("pdfmake/build/vfs_fonts.js").pdfMake.vfs // needed to get PdfPrinter to work
const sizeOf = promisify(require("image-size"))
const pdfmerger = require("pdfmerger")
const streamToPromise = require("stream-to-promise")

module.exports = imagesToPdf

async function imagesToPdf (imagePaths, pdfPath) {
  const pagePaths = await Promise.all(imagePaths.map(createOnePagePdfFromImage))
  const pdfStream = pdfmerger(pagePaths)
  const writeStream = fs.createWriteStream(pdfPath)
  pdfStream.pipe(writeStream)
  await streamToPromise(pdfStream)
  await Promise.all(pagePaths.map(async pagePath => await promisify(fs.unlink)(pagePath)))
  return pdfPath
}

async function createOnePagePdfFromImage (imagePath) {
  const pageSize = await sizeOf(imagePath)
  const docDefinition = {
    content: {image: imagePath},
    pageMargins: [0, 0, 0, 0],
    pageOrientation: pageSize.width > pageSize.height ? "landscape" : "portrait",
    pageSize,
  }
  const doc = new PdfPrinter(fonts()).createPdfKitDocument(docDefinition)
  const pagePath = `${imagePath}.pdf`
  doc.pipe(fs.createWriteStream(pagePath))
  doc.end()
  await streamToPromise(doc)
  return pagePath
}

function fonts () { // needed to get PdfPrinter to work
  return {
    Roboto: {
      bold: new Buffer(Roboto64["Roboto-Medium.ttf"], "base64"),
      bolditalics: new Buffer(Roboto64["Roboto-MediumItalic.ttf"], "base64"),
      italics: new Buffer(Roboto64["Roboto-Italic.ttf"], "base64"),
      normal: new Buffer(Roboto64["Roboto-Regular.ttf"], "base64"),
    },
  }
}
