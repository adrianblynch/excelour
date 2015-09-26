var Code = require('code')
var Lab = require('lab')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var server = require('./server')
var payload = {
	data: [
		[1, 2, 3, 4, 5],
		[5, 4, 3, 2, 1],
		[2, 4, 6, 8, 10]
	]
}

describe('API', function () {

	it('Root', function (done) {
		server.inject({url: '/'}, function (response) {
			expect(response.statusCode).to.equal(200)
			expect(response.result.ok).to.equal(true)
			done()
		})
	})

	it('Create excel', function (done) {
		server.inject({url: '/excel', method: 'post', payload: payload}, function (response) {
			expect(response.statusCode).to.equal(200)
			done()
		})
	})

})
