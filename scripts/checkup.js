
var cody = require('../lib/cody');
var fs = require('fs-extra');

cody.log('checkup...');
fs.ensureDirSync(process.env.CODY_DEST);
