const fs = require("fs")
const {promisify} = require("util")
const PdfPrinter = require("pdfmake")
const sizeOf = promisify(require("image-size"))
const combinePdfs = require("./combinePdfs.js")
const streamToPromise = require("stream-to-promise")

module.exports = imagesToPdf

async function imagesToPdf (paths, resultPath) {
  const pagePaths = await Promise.all(paths.map(createOnePagePdfFromImage))
  await combinePdfs(pagePaths, resultPath)
  await Promise.all(pagePaths.map(async pagePath => await promisify(fs.unlink)(pagePath)))
  return resultPath
}

async function createOnePagePdfFromImage (imagePath, page) {
  const pageSize = await sizeOf(imagePath)
  const docDefinition = {
    content: {image: imagePath},
    pageMargins: [0, 0, 0, 0],
    pageOrientation: pageSize.width > pageSize.height ? "landscape" : "portrait",
    pageSize,
  }
  const doc = new PdfPrinter().createPdfKitDocument(docDefinition)
  const pagePath = `${page}.pdf`
  doc.pipe(fs.createWriteStream(pagePath))
  doc.end()
  await streamToPromise(doc)
  return pagePath
}
