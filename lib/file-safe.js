const util = require('util')
const fs = require('fs')
const { resolve } = require('path')
const { createObservedObject } = require('./observable-object')

const [ readFile, writeFile, exists, mkdir, rmdir ] = [ 
  util.promisify(fs.readFile), 
  util.promisify(fs.writeFile), 
  util.promisify(fs.exists),
  util.promisify(fs.mkdir),
  util.promisify(fs.rmdir),
]

const writeFileSafely = async (dirPath, fileName, data) => {
  const filePath = resolve(dirPath, fileName)
  try {
    await mkdir(dirPath, { recursive: true })
    await writeFile(filePath, data)
  } catch (err) {
    console.error(err)
  }
}

const interpret = (buffer) => {
  const contents = buffer.toString()
  try {
    const json = JSON.parse(contents)
    return json
  } catch (err) {
    return contents
  }
}

const readFileSafely = async (dirPath, fileName, defaultData) => {
  const filePath = resolve(dirPath, fileName)
  try {
    if (await exists(filePath)){
      return interpret(await readFile(filePath))
    } else {
      await mkdir(dirPath, { recursive: true })
      if (defaultData) {
        writeFile(filePath, defaultData)
      }
      return defaultData
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * @function getSyncFileObject
 * @description Create an object which auto-saves itself to the filesystem.
 * @param {string} filePath - the folder the JSON file is stored under
 * @param {string} fileName - the JSON file name
 * @param {object} [defaultData] - initialize the object with default data 
 */
async function getSyncFileObject (filePath, fileName, defaultData = {}) {
  const raw = await readFileSafely(filePath, fileName, JSON.stringify(defaultData))
  return createObservedObject((root) => writeFileSafely(filePath, fileName, JSON.stringify(root)), raw)
}

module.exports = {
  getSyncFileObject,
  
  // helpful with testing
  readFile, exists, mkdir, rmdir, interpret
}