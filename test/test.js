const test = require("tape")
const {promisify} = require("util")
const fs = require("fs")
// files to test
const combinePdfs = require("../combinePdfs.js")
const imagesToPdf = require("../imagesToPdf.js")
const testDir = __dirname

test("combines PDFs into a single PDF", async t => {
  t.plan(2)
  const combinedPath = `${testDir}/combine/combined.pdf`
  const pdfPaths = [`${testDir}/combine/1.pdf`, `${testDir}/combine/2.pdf`, `${testDir}/combine/3.pdf`]
  // combined PDF doesn't exist
  await (promisify(fs.readFile))(combinedPath).then(() => t.fail("PDF already exists")).catch(() => t.pass("PDF doesn't exist yet"))
  // combine the PDFs
  await combinePdfs(pdfPaths, combinedPath)
  // combined PDF exists
  await (promisify(fs.readFile))(combinedPath).then(() => t.pass("PDF exists")).catch(() => t.fail("PDF doesn't exist"))
  // clean up combined PDF
  await (promisify(fs.unlink))(combinedPath)
})

test("combines images into a single PDF", async t => {
  const TEST_COUNT = 4
  t.plan(TEST_COUNT)
  const imagesPdfPath = `${testDir}/images/images.pdf`
  const imagePaths = [`${testDir}/images/1.jpeg`, `${testDir}/images/2.jpg`, `${testDir}/images/3.png`]
  // temp page PDFs don't exist
  await (promisify(fs.readFile))("${testDir}/images/1.jpeg.pdf").then(() => t.fail("temp page PDFs exist")).catch(() => t.pass("temp page PDFs don't exist"))
  // images PDF doesn't exist
  await (promisify(fs.readFile))(imagesPdfPath).then(() => t.fail("PDF already exists")).catch(() => t.pass("PDF doesn't exist yet"))
  // combine the images
  await imagesToPdf(imagePaths, imagesPdfPath)
  // images PDF exists
  await (promisify(fs.readFile))(imagesPdfPath).then(() => t.pass("PDF exists")).catch(() => t.fail("PDF doesn't exist"))
  // temp page PDFs don't exist
  await (promisify(fs.readFile))(`${testDir}/images/1.jpeg.pdf`).then(() => t.fail("temp page PDFs exist")).catch(() => t.pass("temp page PDFs don't exist"))
  // clean up images PDF
  await (promisify(fs.unlink))(imagesPdfPath)
})
