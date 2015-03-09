#!/usr/bin/env node

var server = require('./app/server')
var router = require('./app/router')
var watcher = require('./app/watcher')
var options = require('./app/cmdline')

server.init(options)
watcher.init(options)
router.init(options)
