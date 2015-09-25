const fs = require('fs')
const Excel = require('exceljs')
const store = require('./store')

const server = {}

function checkQueue() {

	// NOTE: This is lame - Redis will fix this for us
	for (var key in store.get()) {

		if (store.getStatus(key) === 'pending') {

			// Start by saving to a json file
			const fileName = key + '.json'
			fs.writeFileSync('./files/' + fileName, JSON.stringify(store.getData(key)))
			store.setFile(key, key + '.json')
			store.setStatus(key, 'done')

			// Now let's create an excel file
			var workbook = new Excel.Workbook();
			var sheet = workbook.addWorksheet('Sheet 1');

			store.getData(key).forEach(function (item) {
				sheet.addRow(item)
			})

			workbook.xlsx.writeFile('./files/' + key + '.xlsx').then(function() {
				console.log("Done writing", store.getFile(key));
			});

		}

	}

}

server.start = function (callback) {
	setInterval(checkQueue, 2000)
	callback()
}

module.exports = server
