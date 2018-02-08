const ENVIRONMENTS = ['prod','test','dev'];
const env = process.argv[2];
const currentEnv = ENVIRONMENTS.indexOf(env) === -1 ? 'test' : env;

module.exports = require('./' + currentEnv + '.json');

