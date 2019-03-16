module.exports = {
  diff: true,
  extension: ['js'],
  opts: './test/mocha.opts',
  package: './package.json',
  reporter: 'spec',
  spec: "**/*.tests.js",
  require: "@babel/register",
  slow: 75,
  timeout: 2000,
  ui: 'bdd'
};
