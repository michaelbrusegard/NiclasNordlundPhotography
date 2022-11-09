
// This is a simple "run once script" to compress the shop images for display on the webpage

const fs = require('fs');
const files = fs.readdirSync('../../Site/img/shopQualityImages');
import ImageCompressor from 'image-compressor.js';

