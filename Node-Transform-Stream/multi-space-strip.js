'use strict';

const { Transform } = require('stream');

class MultiSpaceStrip extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const text = chunk.toString();
        this.push(text.replace(/\s+/g, ''));
        callback();
    }
}
module.exports = new MultiSpaceStrip();