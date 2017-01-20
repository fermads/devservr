var colors = {
  'info'  : '\033[37m',
  'ok'    : '\033[32m[200] ',
  'error' : '\033[31m[404] ',
  'time'  : '\033[1;30m',
  'reset' : '\x1b[0m'
}

function ok(message){
  log(colors.ok + message + colors.reset)
}

function error(message) {
  log(colors.error + message + colors.reset)
}

function info(message) {
  log(colors.info + message + colors.reset)
}

function log(message) {
  var time = colors.time + (new Date()).toTimeString().substr(0, 8)
    + colors.reset

  console.log('['+ time +'] ' + message)
}

module.exports = {
  info  : info,
  ok    : ok,
  error : error
}