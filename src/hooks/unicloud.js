// 访问云对象
const todo = uniCloud.importObject('todo-category') //第一步导入云对象
const getCloudCategoryList = async () => {
	const res = await todo.getCategory('title demo', 'content demo') //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
	uni.showToast({
		title: '成功获取云数据'
	})
	// console.log('云端：', res.data)
	return res.data
}
const addCategory = async (arrObj) => {
	const res = await todo.addCategory(arrObj)
	// if (res.code == 1) {
	// 	return uni.showToast({
	// 		title: res.message,
	// 		icon: "error"
	// 	})
	// }
	// uni.showToast({
	// 	title: `成功插入${arrObj.length}云数据`
	// })
	// console.log(res)
	return res
}
const findByTitle = async (arrObj) => {
	const res = await todo.findByTitle(arrObj)
	console.log(res)
	return res
}
const arrObj = [{
	"title": "111设置",
	"updateTime": 1664450784251,
	"_id": "R93wZdnDP9iIJCNk"
}, {
	"title": "设置",
	"updateTime": 1664450784251,
	"_id": "R93wZdnDP5iIJCNk"
}, {
	"title": "阿达1",
	"updateTime": 1664450613995,
	"_id": "bYKGlXlYbpc7uIqu"
}, {
	"title": "学习",
	"updateTime": 1664382911307,
	"_id": "sWlviKTepSeF6f22"
}]
//addCategory()
// findByTitle(arrObj)
export {
	getCloudCategoryList,
	addCategory
}
