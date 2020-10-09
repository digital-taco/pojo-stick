const { basename, dirname } = require('path')
const { getSyncFileObject } = require('./lib/file-safe')

/**
 * Auto-save a plain-old-javascript-object to local json file when the object changes
 * @param {string} savePath - the path we wish to save the data to when the object changes
 * @param {object} [defaultData] - initial data for the first time the object instantiates
 */
function pojoStick(savePath, defaultData = {}) {
  // if the user only gave us a folder, save to a _probably_ safe index location
  let filePath = savePath;
  let fileName = '.pojo-stick.json'

  // if the user gave us a specific file to save to, use that
  if (savePath.endsWith('.json')) {
    filePath = dirname(savePath)
    fileName = basename(savePath)
  }

  return getSyncFileObject(filePath, fileName, defaultData)
}

module.exports = pojoStick