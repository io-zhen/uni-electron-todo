// 导入相关方法
const NeDB = require('nedb');
const path = require('path')
// 建立一个数据库列表 
console.log(process.cwd())
console.log(process.env.NODE_ENV)
// 根据开发环境设置数据库的目录
function getExtraFilesPath(filename) {
	if (process.env.NODE_ENV == 'development') {
		return path.join(process.cwd(), `/src/nedb/${filename}`);
	} else {
		return path.join(process.cwd(), `/resources/nedb/${filename}`);
	}

}
const DBList = {
	category: new NeDB({
		autoload: true,
		// 指定数据库文件路径
		filename: (getExtraFilesPath('category.db'))
	}),
	test: new NeDB({
		autoload: true,
		// 指定数据库文件路径
		filename: (getExtraFilesPath('test.db'))
	})
}
// 初始化当前链接的数据库
let DB = null
const dbInit = (name) => {
	DB = DBList[name]
}
// db.update(query, update, options, callback)
const update = (id, newTitle) => {
	// 插入数据
	return new Promise((resolve, reject) => {
		DB.update({
				_id: id
			}, {
				$set: {
					title: newTitle
				}
			},
			(err, doc) => {
				if (err) {
					return reject({
						code: -1,
						msg: '发生系统错误'
					})
				}
				return resolve({
					code: 0,
					message: '修改成功',
				})
			})
	})
}
const del = (id) => {
	// 插入数据
	return new Promise((resolve, reject) => {
		DB.remove({
			_id: id
		}, (err, doc) => {
			if (err) {
				return reject({
					code: -1,
					msg: '发生系统错误'
				})
			}
			return resolve({
				code: 0,
				message: '删除成功',
			})
		})
	})
}
const add = (data) => {
	// 插入数据
	return new Promise((resolve, reject) => {
		data.updateTime = Date.now()
		DB.insert(data, function(err, doc) {
			if (err) {
				return reject({
					code: -1,
					msg: '发生系统错误'
				})
			}
			return resolve({
				code: 0,
				message: '插入成功',
			})
		})
	})
}
const find = (condition = {}) => {
	// 按条件查找数据
	return new Promise((resolve, reject) => {
		DB.find(condition, (err, docs) => {
			if (err) {
				return reject({
					code: -1,
					msg: '发生系统错误'
				})
			}
			if (docs.length > 0) {
				docs.sort(function(a, b) {
					return a.updateTime - b.updateTime
				})
				return resolve({
					code: 0,
					message: '查找成功',
					data: docs,
					nums: docs.length
				})
			} else {
				return resolve({
					code: 1,
					message: '没有找到',
				})
			}
		})
	})
}

export default {
	dbInit,
	add,
	find,
	del,
	update
}
