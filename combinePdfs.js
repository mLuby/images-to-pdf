const {createWriteStream} = require("fs")
const pdfmerger = require("pdfmerger")
const streamToPromise = require("stream-to-promise")

module.exports = combinePdfs

async function combinePdfs (pdfPaths, combinedPdfPath) {
  const pdfStream = pdfmerger(pdfPaths)
  const writeStream = createWriteStream(combinedPdfPath)
  pdfStream.pipe(writeStream)
  await streamToPromise(pdfStream)
  return combinedPdfPath
}
