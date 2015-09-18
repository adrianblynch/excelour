var Hapi = require('hapi')
var Joi = require('joi')
var uuid = require('node-uuid')

////////////
// Server //
////////////

var server = new Hapi.Server()

var STORE = {}

server.connection({ host: 'localhost', port: 8000 })

server.route({
	method: 'GET', path:'/',
	handler: function (request, reply) {
		reply({ok: true})
	}
})

server.route({
	method: 'GET', path:'/store',
	handler: function (request, reply) {
		reply(STORE)
	}
})

server.route({
	method: 'POST', path:'/request',
	handler: function (request, reply) {

		var key = uuid.v1()
		var val = {
			data: request.payload.data,
			priority: request.payload.priority,
			status: 'pending'
		}
		var receipt = {
			id: key
		}

		STORE[key] = val

		reply(receipt).code(201)

	},
	config: {
		validate: {
			payload: {
				data: Joi.array().required(),
				priority: Joi.number().default(50)
			}
		}
	}
})

server.route({
	method: 'GET', path:'/request/{id}',
	handler: function (request, reply) {

		var key = request.params.id
		if (key in STORE) {
			// TODO: Use ES6 object mapping shortcut
			var val = STORE[key]
			return reply({status: val.status})
		}

		reply('Request not found').code(404)

	},
	config: {
		validate: {
			params: {
				id: Joi.string().guid().required()
			}
		}
	}
})

server.start(function () {
	console.log('Server running at:', server.info.uri)
})

////////////
// Worker //
////////////

// TODO: Poll the STORE for pending jobs
