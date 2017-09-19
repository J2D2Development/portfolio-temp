'use strict';

module.exports = function(filePath, additionalName) {
    const filePathArray = filePath.split('.');
    const lastItemInPath = filePathArray[filePathArray.length - 2];
    filePathArray[filePathArray.length - 2] = `${lastItemInPath}-${additionalName}`;

    return filePathArray.join('.');
};