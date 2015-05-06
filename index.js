#!/usr/bin/env node

var server = require('./src/server')
var router = require('./src/router')
var watcher = require('./src/watcher')
var cmdline = require('./src/cmdline')

function run(opts) {
  var options = opts || cmdline.args()
  server.init(options)
  watcher.init(options)
  router.init(options)
}

if(!module.parent) // executed via command line
  return run()

module.exports = { // require()'d by another file or module
  run: run
}