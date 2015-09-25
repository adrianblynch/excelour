const fs = require('fs')
const Excel = require('exceljs')
const store = require('./store')

const server = {}

function checkQueue() {

	// NOTE: This is lame - Redis will fix this for us
	for (var key in store.get()) {

		if (store.getStatus(key) === 'pending') {

			const fileName = key + '.xlsx'

			// Now let's create an excel file
			var workbook = new Excel.Workbook();
			var sheet = workbook.addWorksheet('Sheet 1');

			store.getData(key).forEach(function (item) {
				sheet.addRow(item)
			})

			workbook.xlsx.writeFile('./files/' + fileName).then(function() {
				store.setFile(key, fileName)
				store.setStatus(key, 'done')
			});

		}

	}

}

server.start = function (callback) {
	setInterval(checkQueue, 2000)
	callback()
}

module.exports = server
