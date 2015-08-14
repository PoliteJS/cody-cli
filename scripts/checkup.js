
var wdev = require('../lib/wdev');
var fs = require('fs-extra');

wdev.log('checkup...');
fs.ensureDirSync(process.env.WDEV_DEST);
