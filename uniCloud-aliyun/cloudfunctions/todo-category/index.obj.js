// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
let dbJQL
const db = uniCloud.database();
const dbCmd = db.command
const dbCol = db.collection('todo-category')
const findByTitle = async (arrObj) => {
	let arr = []
	for (let i = 0; i < arrObj.length; i++) {
		const res = await dbCol.where({
			_id: arrObj[i]._id,
			title: arrObj[i].title,
		}).count()
		if (res.total == 0) {
			arr.push(arrObj[i])
		}
	}
	return arr
}
const getCategory = async (limit = 10) => {
	// let res = await db.collection('my-music-backup').doc(event.id).update({
	let res = await db.collection('todo-category')
		.where({
			title: dbCmd.neq(null)
		})
		.orderBy("updateTime", "desc").limit(20).get()
	//返回数据给客户端
	return {
		code: 0,
		message: '访问成功',
		data: res.data
	}
}

module.exports = {
	_before: function() { // 通用预处理器
		dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
			clientInfo: this.getClientInfo()
		})
	},
	getCategory,
	findByTitle,
	addCategory: async function(dataObj) {
		// const res = await db.collection('todo-category').add(dataObj)
		const res = await db.collection('todo-category').add(dataObj) // 直接执行数据库操作
		return {
			code: 0,
			message: '执行插入成功',
			data: res
		}
	},
	add: function(datas) { //测试函数
		/* 这里必须用function声明函数，不然没法用下面这个this.getHttpInfo() */
		const httpInfo = this.getHttpInfo()
		// 这里必须JSON.parse(httpInfo.body)转换为json对象  因为云对象接受的参数默认是字符串
		const {
			title,
			content
		} = JSON.parse(httpInfo.body)
		if (!title || !content) {
			return {
				errCode: 'INVALID_TODO',
				errMsg: 'TODO标题或内容不可为空',
				data: httpInfo.body
			}
		}
		return {
			errCode: 0,
			errMsg: '创建成功'
		}
	},
	_after(error, result) {
		if (error) {
			// throw error // 如果方法抛出错误，也直接抛出不处理
			return {
				code: 1,
				message: '执行失败',
				data: error
			}
		}
		// result.timeCost = Date.now() - this.startTime
		return result
	}

}
