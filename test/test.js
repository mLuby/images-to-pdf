const tape = require("tape")
const {promisify} = require("util")
const fs = require("fs")
const PDFJS = require("pdfjs-dist")
// files to test
const imagesToPdf = require("../imagesToPdf.js")

tape("imagesToPdf combines images into a single PDF", async t => {
  const TEST_COUNT = 3
  t.plan(TEST_COUNT)
  const testDir = `${__dirname}/images`
  const resultPath = `${testDir}/result.pdf`
  const imagePaths = [`${testDir}/1.jpeg`, `${testDir}/2.jpg`, `${testDir}/3.png`]
  const EXPECTED_PAGES = 3
  // confirm clean test directory
  t.deepEqual(await promisify(fs.readdir)(testDir), ["1.jpeg", "2.jpg", "3.png"])
  // create PDF
  await imagesToPdf(imagePaths, resultPath)
  // confirm expected test directory
  t.deepEqual(await promisify(fs.readdir)(testDir), ["1.jpeg", "2.jpg", "3.png", "result.pdf"])
  // confirm expected PDF properities
  t.equal(await numPages(resultPath), EXPECTED_PAGES)
  // clean up result PDF
  await (promisify(fs.unlink))(resultPath)
})

tape("imagesToPdf turns a single image into a single PDF", async t => {
  const TEST_COUNT = 3
  t.plan(TEST_COUNT)
  const testDir = `${__dirname}/images`
  const resultPath = `${testDir}/result.pdf`
  const imagePaths = [`${testDir}/1.jpeg`]
  // confirm clean test directory
  t.deepEqual(await promisify(fs.readdir)(testDir), ["1.jpeg", "2.jpg", "3.png"])
  // create PDF
  await imagesToPdf(imagePaths, resultPath)
  // confirm expected test directory
  t.deepEqual(await promisify(fs.readdir)(testDir), ["1.jpeg", "2.jpg", "3.png", "result.pdf"])
  // confirm expected PDF properities
  t.equal(await numPages(resultPath), 1)
  // clean up result PDF
  await (promisify(fs.unlink))(resultPath)
})

tape("imagesToPdf throws if no images provided", async t => {
  const TEST_COUNT = 2
  t.plan(TEST_COUNT)
  const testDir = `${__dirname}/images`
  const resultPath = `${testDir}/result.pdf`
  const imagePaths = []
  // create PDF
  imagesToPdf(imagePaths, resultPath).then(t.fail).catch(error => t.equal(error.message, "Must have at least one path in array"))
  // confirm expected test directory
  t.deepEqual(await promisify(fs.readdir)(testDir), ["1.jpeg", "2.jpg", "3.png"])
})

// HELPER FUNCTIONS

async function numPages (pdfPath) {
  const data = new Uint8Array(await promisify(fs.readFile)(pdfPath))
  return await PDFJS.getDocument(data).then(doc => doc.numPages)
}
