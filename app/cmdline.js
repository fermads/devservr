var port
var basepath
var routefile

process.argv.forEach(function(value, index) {
  if (index < 2)
    return // skip first 2 arguments

  if (parseInt(value, 10))
    port = parseInt(value, 10)
  else if(value.indexOf('.json') != -1)
    routefile = value
  else
    basepath = value
})

module.exports = {
  port      : port,
  basepath  : basepath,
  routefile : routefile
}