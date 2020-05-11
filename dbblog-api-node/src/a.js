const crpty = require('crypto');
let md5 = crpty.createHash('md5');
console.log(md5.update('2147483647/configDir/config.json secret').digest('base64'))