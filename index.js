#!/usr/bin/env node

var server = require('./src/server')
var router = require('./src/router')
var watcher = require('./src/watcher')
var options = require('./src/cmdline')

server.init(options)
watcher.init(options)
router.init(options)
