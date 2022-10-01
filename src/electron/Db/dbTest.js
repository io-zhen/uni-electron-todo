const {
	log
} = require('console')
const {
	DBserve
} = require('../Db/index.js')
// 新增记录mDtn6aIVKUHIWuCg
const data = {
	name: '默认',
	updateTime: new Date().getTime()
}

function Find() {
	DBserve({
		DBname: 'category',
		order: 'find',
		option: {
			name: '默认'
		}
	}).then((res) => {
		log(res.data.length)
		return res.data.length
	})
}

function Add(data) {
	const findName = Find()
	log(findName)
	return
	if (findName > 0) {
		log('have')
		return
	}
	DBserve({
		DBname: 'category',
		order: 'insert',
		option: data
	}).then((res) => {
		log(res)
	})
}
Add(data)
// Find()




// 新建一个数据库
// const DB = new NeDB({
// 	autoload: true,
// 	filename: (path.join(__dirname), 'src/electron/Db/data.db')
// })
// 插入数据
// DB.insert({
// 	name: 'wangzhen',
// 	age: 25,
// 	updateTime: new Date().getTime()
// }, function(err, doc) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(doc);
// });
// 按条件查找数据
// DB.find({
// 	age: 25
// }, (err, docs) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(docs);
// });
// 查找一条数据 _id PvieeB0kWJ1kIpKq 
// DB.findOne({
// 	_id: 'PvieeB0kWJ1kIpKq'
// }, (err, docs) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(docs);
// });

// 更新数据 

// DB.update({
// 	_id: 'PvieeB0kWJ1kIpKq'
// }, {
// 	$set: {
// 		name: 'wangzhen666'
// 	}
// }, function(err, data) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(data);
// });


// 删除数据  结果为0时代表失败 1为成功

// DB.remove({
// 	_id: 'PvieeB0kWJ1kIpKq'
// }, {}, function(err, data) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(data);
// });
