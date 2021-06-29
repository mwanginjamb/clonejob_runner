
const fs = require('fs');
const glob = require('glob');

options = {};

glob("**/fms.*", options, function (er, files) {
    for (const file of files) {
         // remove file
         fs.unlinkSync(file);
        //console.log(`File is no: ${file}`);
    }
})