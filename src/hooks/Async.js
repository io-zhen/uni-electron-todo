// 记录本地nedb操作记录，保存到单独数据库，用户点击同步时，与云服务器的数据进行同步
import {
	reactive
} from 'vue'
import nedb from "@/nedb/db.js";
const asyncDb = nedb.getInstance('async')
// const asyncDb = new dataStore('async')
const asyncList = reactive([])
const getAsyncLength = async () => {
	const res = await getAsyncList()
	console.log(res)
	if (res.code == 1) {
		return 0
	}
	return res.data.length
}
let getAsyncList = async (condition = {}) => {
	// const asyncDb = new dataStore('async')
	const res = await asyncDb.find(condition)
	asyncList.value = res.data
	// console.log(res)
	return res
}
const getAsyncOne = async (_id, title, docid) => {
	let dataObj = reactive({})
	if (_id != '') {
		dataObj._id = _id
	}
	if (docid != '') {
		dataObj.docid = docid
	}
	if (title != '') {
		dataObj.title = title
	}
	const res = await asyncDb.findOne(dataObj)
	return res
}
// 添加本地操作记录
let addAsync = async (type, data, docid) => {
	if (type == 'del') {
		const findRes = await getAsyncList({
			docid
		})
		console.log("addAsync执行删除时的记录：", findRes)
		//执行删除操作的记录时，如果找到了该删除操作的新建记录和更新记录 那么
		// 1.把 新建记录和编辑记录同时删掉，2最后，也不记录本次删除操作
		// findRes._id是找到的新建记录ID，我们接下来就执行删除和停止
		if (findRes.code == 0) {
			for (let i = 0; i < findRes.data.length; i++) {
				await delAsync(findRes.data[i]._id)
			}
			return
		}
	}
	const dataObj = {
		type,
		data,
		docid,
	}
	const res = await asyncDb.insert(dataObj)
	uni.showToast({
		title: "插入成功",
		icon: "none"
	})
	getAsyncList()
	return res
}
let delAsync = async (_id) => {
	const dataObj = reactive({
		_id
	})
	const res = await asyncDb.del(dataObj)
	getAsyncList()
	return res
}
let updateAsync = async (_id, title) => {
	const dataObj = reactive({
		_id,

	})
	const res = await asyncDb.update(dataObj, {
		title
	})
	uni.showToast({
		title: "修改成功",
		icon: "none"
	})
	getAsyncList()
	return res
}
export {
	asyncList,
	getAsyncList,
	getAsyncOne,
	addAsync,
	delAsync,
	updateAsync,
	getAsyncLength
}
