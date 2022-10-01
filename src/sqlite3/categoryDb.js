import Sqlite from '@/sqlite3/sqlite3.js'
import {
	ref,
	reactive
} from "vue"
const db = Sqlite.getInstance()


const dataList = reactive([])
let length = ref()
const getAll = async () => {
	const response = await db.all('SELECT * FROM category')
	dataList.value = response
	length.value = response.length
	// return response
}
const insert = async () => {
	await db.run(`INSERT INTO category VALUES(null, 'abcd','')`)
	await getAll()
}
// 清空表
const clear = async () => {
	await db.run("delete from category")
	await db.run("update sqlite_sequence set seq=0 where name='category'")
	await getAll()
}
export {
	clear,
	length,
	getAll,
	insert,
	dataList
}
