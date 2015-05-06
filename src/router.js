var fs = require('fs')
var path = require('path')
var logger = require('./logger')

var routes = {}
var routefile = __dirname +'/../etc/routes.json'
var basepath

function init(options) {
  basepath = options.basepath || './'
  routefile = options.routefile || routefile
  load()
}

function load() {
  try {
    routes = JSON.parse(fs.readFileSync(routefile))
    logger.info(Object.keys(routes).length +' routes loaded from '
      + path.resolve(routefile))
  }
  catch(e) {
    logger.info('No routes loaded from '+ path.resolve(routefile))
  }
}

function match(url) {
  var tmp = basepath
  var routeParts
  var urlParts = url.split('/').filter(Boolean)

  for(var route in routes) {
    routeParts = route.split('/').filter(Boolean)
    tmp = routes[route]

    if(routeParts.length != urlParts.length)
      continue

    for(var i = 0, found = true; i < routeParts.length; i++) {
      if(routeParts[i].indexOf(':') == -1
          && routeParts[i] != urlParts[i]) {
        found = false
        break
      }
      else if(routeParts[i] != urlParts[i]) {
        tmp = tmp.replace(routeParts[i], urlParts[i])
      }
    }

    if(found)
      return filepath(tmp)
  }

  return filepath(url)
}

function fileOk(file) {
  var stat

  try {
    stat = fs.statSync(file)
  }
  catch(e) {
    return false
  }

  return stat.isFile() ? true : false
}

function isDirectory(file) {
  var stat

  try {
    stat = fs.statSync(file)
  }
  catch(e) {
    return false
  }

  return stat.isDirectory() ? true : false
}

function filepath(url) {
  var fileFromUrl = path.normalize(basepath +'/'+ url)
  var fileNotFound = path.normalize(basepath +'/'+ routes['*'])

  if(routes['*/'] && isDirectory(fileFromUrl))
    return filepath(url +'/'+ routes['*/'])

  if(fileOk(fileFromUrl))
    return fileFromUrl
  else if(fileOk(fileNotFound))
    return fileNotFound
  else
    return Error(fileFromUrl)
}

module.exports = {
  init: init,
  match: match,
  filepath: filepath
}