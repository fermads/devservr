var fs = require('fs')
var path = require('path')
var logger = require('./logger')

var requests = []
var basepath = './'

function init(options) {
  basepath = options.basepath || basepath
  watch()
}

function add(req) {
  requests.push(req)
}

function watch() {
  var cooldown = 0

  try {
    fs.watch(basepath, { persistent: true, recursive: true }, function () {
      // bulk file changes trigger too many reloads. Just wait a
      // little bit AND on windows, fs.watch seems to trigger 2 times
      // for the same file
      if(Date.now() - cooldown > 1000) {
        cooldown = Date.now()
        // socket write is so fast that sometimes it reloads before
        // the file was written to disk. Wait a few ms then
        setTimeout(reload, 200)
      }
    })

    logger.info('Monitoring path '+ path.resolve(basepath) + ' for changes')
  }
  catch(e) {
    logger.info('Base path '+ path.resolve(basepath) + ' not found')
    process.exit(1)
  }
}

function reload() {
  for (var r in requests) {
    requests[r].end('RELOAD')
  }

  requests = [] // reset

  logger.info('Sending RELOAD to all pages')
}

module.exports = {
  add  : add,
  init : init
}