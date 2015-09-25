var store = require('./store');
var server = require('./server')
var worker = require('./worker')

////////////
// Server //
////////////

server.start(function () {
	console.log('Server running at:', server.info.uri)
})

////////////
// Worker //
////////////

worker.start(function () {
	console.log('Worker running')
})
