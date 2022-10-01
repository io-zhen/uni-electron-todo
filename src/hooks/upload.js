import {
	getCloudCategoryList,
	addCategory
} from "./unicloud.js"
import {
	getAsyncList,
	delAsync
} from "./Async.js"
// 把本地的上传到云端
let upload = async () => {
	uni.showLoading({
		title: '上传中'
	})
	// 执行新增到云
	await addToCloud()
	// 执行删除操作
	uni.hideLoading()
}
// 执行新增到云数据操作
let addToCloud = async () => {
	const localAdd = await getAsyncList({
		type: "add"
	})
	// 如果没有找到需要新增的记录
	if (localAdd.code == 1) {
		return uni.showToast({
			title: "本地没有找到需要新增到云服务的数据记录",
			icon: "none"
		})

	}
	// 如果找到了本地新增的记录，那就继续
	let newAddArr = []
	if (localAdd.code == 0) {
		for (let i = 0; i < localAdd.data.length; i++) {
			newAddArr.push(localAdd.data[i].data)
		}
	}
	const res = await addCategory(newAddArr)
	// 如果上传失败
	if (res.code == 1) {
		return uni.showToast({
			title: res.message,
			icon: "error"
		})
	} else { // 如果上传成功后，需要删除本地的更新记录
		for (let i = 0; i < localAdd.data.length; i++) {
			await delAsync(localAdd.data[i]._id)
		}
		uni.showToast({
			title: `成功插入${newAddArr.length}云数据`
		})
	}
}
// 把云端的保存到本地
let saveToLocal = () => {
	// const Datastore = require('nedb');
	// const DB = new Datastore({
	// 	autoload: true,
	// 	filename: './src/nedb/test.db',
	// })
	// DB.insert(cloudRes,
	// 	function(err, newDocs) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		console.log(newDocs)
	// 	})
}
export {
	upload
}
