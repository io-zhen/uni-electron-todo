import nedb from '@/sqlite3/nedb.js'
const db = nedb.getInstance()
const test = '11111'
const find = async () => {
	const res = await db.find()
	console.log("nedbFind:", res)
}
const insert = async () => {
	const res = await db.insert()
	console.log(res)
}
export {
	test,
	find,
	insert
}
