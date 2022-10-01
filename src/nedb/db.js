const Datastore = require('nedb');
const path = require('path')

const nedb = class { //将类赋给一个表达式或变量
	constructor(dataName) {
		this.instance
		this.db = null
		this.init(dataName)
	}
	init(dataName) {
		this.db = new Datastore({
			autoload: true,
			filename: this.getExtraFilesPath(dataName),
		})
		console.log('init:', dataName)
	}
	// 单例
	static getInstance(dataName) {
		this.instance = this.instance ? this.instance : new nedb(dataName)
		return this.instance
	}
	getExtraFilesPath(dataName) {
		if (process.env.NODE_ENV == 'development') {
			return path.join(process.cwd(), `/src/nedb/${dataName}.db`);
		} else {
			return path.join(process.cwd(), `/resources/nedb/${dataName}.db`);
		}
	}
	// 查询某一个文档
	findOne(dataObj) {
		return new Promise((resolve, reject) => {
			this.db.findOne(dataObj, (err, doc) => {
				if (err) {
					return reject({
						code: 0,
						message: '操作失败',
					})
				}
				if (doc) {
					return resolve({
						code: 1,
						message: '查找成功',
						data: doc
					})
				} else {
					return resolve({
						code: 0,
						message: '查找失败',
					})
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
	insert(dataObj = {}) {
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
	del(condition = {}) {
		return new Promise((resolve, reject) => {
			this.db.remove(condition, (err, docs) => {
				if (err) {
					return reject({
						code: 0,
						message: '操作失败',
					})
				}
				return resolve({
					code: 0,
					message: '删除成功',
					data: docs
				})
			})
		})
	}
	update(condition = {}, setData = {}) {
		return new Promise((resolve, reject) => {
			this.db.update(condition, {
					$set: setData
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
						data: doc
					})
				})
		})
	}
}

export default nedb
