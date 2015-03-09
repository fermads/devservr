var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var logger = require('./logger')
var router = require('./router')
var watcher = require('./watcher')
var mime = require('../etc/mime')

var port = 80
var basepath = './'
var snippet

function init(options) {
  port = options.port || port
  basepath = options.basepath || basepath

  snippet = fs.readFileSync(__dirname +'/../etc/snippet.html')
      .toString().replace(/[\n\r]/g, '').replace(/ +/g, ' ')

  start()
}

function start() {
  http.Server(function(req, res) {
    var pathname = url.parse(req.url).pathname;

    if(pathname == '/live-reload') {
      watcher.add(res)
      return res.writeHead(200)
    }

    var file = router.match(pathname)

    if(file instanceof Error) {
      res.writeHead(404)
      res.end('not found')
      return logger.error(pathname +' -> '+ file.message)
    }

    var type = file.substr(file.lastIndexOf('.') + 1),
      mimetype = mime[type] || mime.html,
      contents = ''

    res.writeHead(200, header(mimetype))
    contents = fs.readFileSync(file).toString()

    if(mimetype == mime.html) // add live-reload snippet if html
      res.end(contents.replace('</body>', snippet.toString() +'</body>'))
    else
      res.end(contents)

    logger.ok(pathname +' -> '+ file)

  }).listen(port);

  logger.info('Server running on port '+ port)
  logger.info('Serving static files from path '+ path.resolve(basepath))
}

function header(mimetype){
  return {
    'Content-Type': mimetype,
    'Access-Control-Allow-Origin': '*'
  }
}

module.exports = {
  init : init
}