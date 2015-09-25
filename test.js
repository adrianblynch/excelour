var Code = require('code')
var Lab = require('lab')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var store = require('./store')
var server = require('./server')
var payload = {
	data: [
		[1, 2, 3, 4, 5],
		[5, 4, 3, 2, 1]
	],
	priority: 100
}

describe('API', function () {

	it('Root', function (done) {

		server.inject({url: '/'}, function (response) {
			expect(response.statusCode).to.equal(200)
			expect(response.result.ok).to.equal(true)
			done()
		})

	})

	it('Create request', function (done) {

		server.inject({url: '/request', method: 'post', payload: payload}, function (response) {
			expect(response.statusCode).to.equal(201)
			expect(response.result).to.only.include(['id'])
			done()
		})

	})

	it('Get request', function (done) {

		server.inject({url: '/request', method: 'post', payload: payload}, function (response) {

			var id = response.result.id

			server.inject({url: '/request/' + id}, function (response) {
				expect(response.statusCode).to.equal(200)
				expect(response.result).to.only.include(['status', 'downloads'])
				done()
			})

		})

	})

})
