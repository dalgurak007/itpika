/**
 *  Created by dalgurak on Wed Nov 07 2018 9:31:52
 */
/*global process:true, global:true */

const yaml = require('node-yaml');
const fs = require('fs');
const path = require('path');

const configRoot = process.cwd() + '/deploy';
let envs = fs.readdirSync(configRoot);
const env = global.env = envs.includes(process.argv[3]) ? process.argv[3] : 'dev';


const deploy = {};

// fs.readdirSync(path.join(configRoot, env)).forEach(f => {
//   deploy[f.substr(0, f.lastIndexOf('.'))] = yaml.readSync(path.join(configRoot, env, f));
// });
['db', 'api', 'rsa'].forEach(f => {
  deploy[f] = yaml.readSync(path.join(configRoot, env, f+'.yml'));
});

module.exports = deploy;