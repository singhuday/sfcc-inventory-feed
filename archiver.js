// Require modules.
var DirArchiver = require("dir-archiver");
// Create an array with the files and directories to exclude.

/**
 * Create a dir-archiver object.
 * @param {string} directoryPath - The path of the folder to archive.
 * @param {string} zipPath - The path of the zip file to create.
 * @param {Boolean} includeBaseDirectory - Includes a base directory at the root of the archive.
 * For example, if the root folder of your project is named "your-project", setting
 * includeBaseDirectory to true will create an archive that includes this base directory.
 * If this option is set to false the archive created will unzip its content to
 * the current directory.
 * @param {array} excludes - A list with the names of the files and folders to exclude.
 */
exports.archiver = {
  zip: function (directoryPath, zipPath, excludes) {
    var archive = new DirArchiver(directoryPath, zipPath, true, excludes);

    // Create the zip file.
    archive.createZip();
  },
};
