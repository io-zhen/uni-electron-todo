const sqlite3 = require('sqlite3').verbose();
const db = class {
	constructor(tableName) {
		this.tableName = tableName
		this.db = new sqlite3.Database("./src/sqlite3/datebase.db", function(err) {
			if (err) {
				console.log(err)
			}
		})
	}
	addTable() {
		this.db.run("CREATE TABLE " + this.tableName +
			" (id INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,title TEXT,updateTime TIMESTAMP NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')) NULL)",
			function(e) {
				if (e !== null) {
					throw e;
				}
			})
	}
	insert(title = '111') {
		const updateTime = new Date().getTime()
		this.db.run(`insert into ${this.tableName} (title,updateTime) values ('${title}','${updateTime}')`)
	}
	getAll() {
		return new Promise((resolve, reject) => {
			this.db.all(`select * from ${this.tableName}`, function(err, res) {
				if (!err) {
					// console.log(res);
					return resolve(res)
				} else {
					console.log(err);
				}
			})
		})

	}
	close() {
		db.close(function(err) {
			if (err) throw err;
		})
	}
	test() {
		console.log('test')
	}
}



// ${new Date().getTime()}
// const values = `'wangzhen',''`
// console.log(values)
// var sqls = "insert into category3 (title) values ('value1')"

// db.run(sqls)
// db.all("select * from category3", function(err, res) {
// 	if (!err)
// 		console.log(res);
// 	else
// 		console.log(err);
// })
// each逐条查询数据,每一段会单独打印
// db.each("select * from foo", function(err, row) {
// 	if (err) throw err
// 	else {
// 		console.log(' ②each查询结果：', row)
// 	}
// })


export default db
