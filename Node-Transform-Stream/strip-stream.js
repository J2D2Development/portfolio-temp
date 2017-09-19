'use strict';

const fs = require('fs');
const spaceStripStream = require('./multi-space-strip');
const pathSplitter = require('./path-splitter');

const filePath = process.argv[2];

fs.createReadStream(filePath)
    .pipe(spaceStripStream)
    .pipe(fs.createWriteStream(pathSplitter(filePath, 'str')));