process.STORE = {}

const store = {}

store.get = function (key) {
	return key ? process.STORE[key] : process.STORE
}

store.add = function (key, val) {
	process.STORE[key] = val
}

store.exists = function (key) {
	return (key in process.STORE)
}

store.incrementDownloads = function (key) {
	process.STORE[key].downloads++
}

store.setStatus = function (key, status) {
	process.STORE[key].status = status
}

store.setFile = function (key, file) {
	process.STORE[key].file = file
}

store.getData = function (key) {
	return process.STORE[key].data
}

store.getStatus = function (key) {
	return process.STORE[key].status
}

store.getFile = function (key) {
	return process.STORE[key].file
}

module.exports = store
