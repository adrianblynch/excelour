var frisby = require('frisby')
var URL = 'http://localhost:8000'
var payload = {
	data: [
		[1, 2, 3, 4, 5],
		[5, 4, 3, 2, 1]
	],
	priority: 100
}

frisby.create('Root')
	.get(URL + '/')
	.expectStatus(200)
	.expectJSON({ok: true})
.toss()

frisby.create('Create request')
	.post(URL + '/request', payload)
	.expectStatus(201)
	.expectJSONTypes({
		id: String
	})
.toss()

frisby.create('Create request')
	.post(URL + '/request', payload)
	.afterJSON(function (request) {
		frisby.create('Get request')
			.get(URL + '/request/' + request.id)
			.expectStatus(200)
			.expectJSONTypes({
				status: String
			})
		.toss()
	})
.toss()
