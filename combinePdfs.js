const {createReadStream, createWriteStream} = require("fs")
const pdfmerger = require("pdfmerger")
const streamToPromise = require("stream-to-promise")

module.exports = combinePdfs

async function combinePdfs (pdfPaths, combinedPdfPath) {
  if (!Array.isArray(pdfPaths) || pdfPaths.length === 0) {
    throw new Error("Must have at least one PDF path in array")
  } else if (pdfPaths.length === 1) {
    const readStream = createReadStream(pdfPaths[0])
    readStream.pipe(createWriteStream(combinedPdfPath))
    await streamToPromise(readStream)
    return combinedPdfPath
  }
  console.log("Foo", pdfPaths)
  const pdfStream = pdfmerger(pdfPaths)
  const writeStream = createWriteStream(combinedPdfPath)
  pdfStream.pipe(writeStream)
  await streamToPromise(pdfStream)
  return combinedPdfPath
}
