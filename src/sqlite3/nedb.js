const Datastore = require('nedb');

class nedb {
	constructor() {
		this.instance
		this.db = null
		this.connect('./src/sqlite3/nedbdatebase.db')
	}
	// 连接数据库
	connect(path) {
		return new Promise((resolve, reject) => {
			this.db = new Datastore({
				autoload: true,
				filename: path,
			}, (err) => {
				if (err === null) {
					resolve(err)
				} else {
					reject(err)
				}
			})
		})
	}
	find(condition = {}, sort) {
		return new Promise((resolve, reject) => {
			// this.db.find(condition, (err, docs) => {
			this.db.find(condition).sort({
				updateTime: sort || 1
			}).exec(function(err, docs) {
				if (err) {
					return reject({
						code: 0,
						message: '操作失败',
					})
				}
				if (docs && docs.length > 0) {
					return resolve({
						code: 0,
						message: '操作成功',
						data: docs
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
	insert(dataObj = {
		title: 'nedbTest'
	}) {
		// 插入数据
		return new Promise((resolve, reject) => {
			dataObj.updateTime = Date.now()
			this.db.insert(dataObj, function(err, doc) {
				if (err) {
					return reject({
						code: 1,
						msg: '发生系统错误'
					})
				}
				return resolve({
					code: 0,
					message: '插入成功',
					data: doc
				})
			})
		})
	}
	// 单例
	static getInstance() {
		this.instance = this.instance ? this.instance : new nedb()
		return this.instance
	}
}

export default nedb
