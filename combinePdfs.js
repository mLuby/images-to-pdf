const fs = require("fs")
const {promisify} = require("util")
const pdfmerger = require("pdfmerger")
const streamToPromise = require("stream-to-promise")

module.exports = combinePdfs

async function combinePdfs (paths, resultPath) {
  if (!Array.isArray(paths) || paths.length === 0) {
    throw new Error("Must have at least one path in array")
  } else if (paths.length === 1) {
    await promisify(fs.copyFile)(paths[0], resultPath)
    return resultPath
  }
  const pdfStream = pdfmerger(paths)
  const writeStream = fs.createWriteStream(resultPath)
  pdfStream.pipe(writeStream)
  await streamToPromise(pdfStream)
  return resultPath
}
