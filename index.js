var server = require('./server.js')

////////////
// Server //
////////////

server.start(function () {
	console.log('Server running at:', server.info.uri)
})

////////////
// Worker //
////////////

// TODO: Poll the STORE for pending jobs
