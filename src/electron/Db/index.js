/*
 * @Author: cuiht
 * @Date: 2022-04-22 13:38:40
 * @LastEditors: cuiht
 * @LastEditTime: 2022-04-22 16:40:46
 * @Description: 数据库链接 及 数据库操作方法封装
 */
const NeDB = require('nedb')
const path = require('path')
const DBList = {
	category: new NeDB({
		autoload: true,
		// 指定数据库文件路径
		filename: (path.join(__dirname), 'src/electron/Db/category.db')
	})
}
const DBserve = (arg) => {
	return new Promise((resolve, reject) => {
		const {
			DBname = '', order = '', option = {}
		} = arg;
		if (!DBname) {
			return reject({
				code: 0,
				msg: '未获取数据库名！'
			})
		}
		const _DB = DBList[DBname];
		if (!order) {
			return reject({
				code: 0,
				msg: '未获取到指令！'
			})
		}
		switch (order) {
			case 'insert':
				_DB.insert({
					...option,
					createTime: new Date
				}, function(err, data) {
					if (err) {
						return reject({
							code: 0,
							msg: err
						})
					}
					return resolve({
						code: 200,
						msg: "新增成功！",
						data,
					})
				});
				break;
			case 'find':
				_DB.find(option).sort({
					createTime: -1
				}).exec(function(err, data) {
					if (err) {
						return reject({
							code: 0,
							msg: err
						})
					}
					return resolve({
						code: 200,
						msg: "查询列表成功！",
						data,
					})
				});
				break;
			case 'findOne':
				_DB.findOne(option, function(err, data) {
					if (err) {
						return reject({
							code: 0,
							msg: err
						})
					}
					return resolve({
						code: 200,
						msg: "查询成功！",
						data,
					})
				});
				break;
			case 'update':
				if (!option?._id) {
					return reject({
						code: 0,
						msg: '未获取到id'
					})
				}
				_DB.update({
					_id: option._id
				}, {
					$set: option
				}, function(err, data) {
					if (err) {
						return reject({
							code: 0,
							msg: err
						})
					}
					return resolve({
						code: 200,
						msg: "更新成功！",
						data,
					})
				});
				break;
			case 'remove':
				if (!option?._id) {
					return reject({
						code: 0,
						msg: '未获取到id'
					})
				}
				_DB.remove({
					_id: option._id
				}, {}, function(err, data) {
					if (err) {
						return reject({
							code: 0,
							msg: err
						})
					}
					return resolve({
						code: 200,
						msg: "删除成功！",
						data,
					})
				});
				break;
			default:
				break;
		}
	})
}
module.exports = {
	DBserve
}
