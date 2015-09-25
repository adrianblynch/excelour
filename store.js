var jsop = require('jsop')

var disk = {} //jsop('disk.json')

const store = {}

store.get = function (key) {
	return key ? disk[key] : disk
}

store.add = function (key, val) {
	disk[key] = val
}

store.exists = function (key) {
	return (key in disk)
}

store.incrementDownloads = function (key) {
	disk[key].downloads++
}

store.setStatus = function (key, status) {
	disk[key].status = status
}

store.setFile = function (key, file) {
	disk[key].file = file
}

store.getData = function (key) {
	return disk[key].data
}

store.getStatus = function (key) {
	return disk[key].status
}

store.getFile = function (key) {
	return disk[key].file
}

module.exports = store
