var Hapi = require('hapi')
var Joi = require('joi')
var uuid = require('node-uuid')
var fs = require('fs')
var Excel = require('exceljs')

var server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 8000
})

server.register(require('inert'), () => {})

server.route({
	method: 'GET', path:'/',
	handler: (request, reply) => reply({ok: true})
})

server.route({
	method: 'POST', path:'/excel',
	handler: (request, reply) => {

		var workbook = new Excel.Workbook()
		var sheet = workbook.addWorksheet('Sheet 1')
		var fileName = uuid.v1() + '.xlsx'
		var filePath = './files/' + fileName

		request.payload.data.forEach(item => sheet.addRow(item))

		workbook.xlsx.writeFile(filePath).then(() => {

			reply
				.file(filePath)
				.header('Content-disposition', 'attachment; filename=' + (request.query.fileName || fileName))
				.header('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

			// Until we have a tail event set up - Delete the file later
			setTimeout(() => fs.unlink(filePath), 5000)

		})

	},
	config: {
		validate: {
			payload: {
				data: Joi.array().required()
			}
		}
	}
})

module.exports = server
