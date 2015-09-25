var Hapi = require('hapi')
var Joi = require('joi')
var uuid = require('node-uuid')
var fs = require('fs')
var store = require('./store')

var server = new Hapi.Server()

server.connection({ host: 'localhost', port: 8000 })

server.register(require('inert'), function (err) {

})

server.route({
	method: 'GET', path:'/',
	handler: function (request, reply) {
		reply({ok: true})
	}
})

// View the store
server.route({
	method: 'GET', path:'/store',
	handler: function (request, reply) {
		reply(store.get())
	}
})

// Create an excel generation request
server.route({
	method: 'POST', path:'/request',
	handler: function (request, reply) {

		var key = uuid.v1()
		var val = {
			data: request.payload.data,
			priority: request.payload.priority,
			status: 'pending',
			downloads: 0,
			file: null
		}

		store.add(key, val);

		reply({id: key}).code(201)

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

// A fake route to quickly create an excel generation request
server.route({
	method: 'GET', path:'/request',
	handler: function (request, reply) {

		var key = uuid.v1()
		var val = {
			data: [
				[1, 2, 3, 4, 5],
				[5, 4, 3, 2, 1]
			],
			priority: 100,
			status: 'pending',
			downloads: 0,
			file: null
		}
		var receipt = {
			id: key
		}

		store.add(key, val)

		reply(receipt).code(201)

	}
})

// Get the state of a request
server.route({
	method: 'GET', path:'/request/{id}',
	handler: function (request, reply) {

		var key = request.params.id

		if (key in store.get()) {

			var val = store.get(key)

			return reply({status: val.status, downloads: val.downloads})

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

server.route({
	method: 'GET', path:'/request/{id}/file',
	handler: function (request, reply) {

		var key = request.params.id
		var fileName = key + '.json'
		var filePath = './files/' + fileName

		if (store.exists(key) && fs.statSync(filePath)) {
			store.incrementDownloads(key)
			return reply.file(filePath).header('Content-disposition', 'attachment; filename=' + fileName).header('Content-type', 'application/json')
		}

		reply('File not found').code(404)

	},
	config: {
		validate: {
			params: {
				id: Joi.string().guid().required()
			}
		}
	}
})

module.exports = server
