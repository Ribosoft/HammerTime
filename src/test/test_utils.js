var fs = require('fs');

var rmDirIfExists = function(pathToDir){
    if(fs.existsSync(pathToDir)){
        fs.rmdirSync(pathToDir);        
    }
};

exports.rmDirIfExists = rmDirIfExists;