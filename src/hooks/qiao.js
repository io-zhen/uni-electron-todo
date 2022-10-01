'use strict';

import {
	rejects
} from 'assert';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDb('src/nedb/test.db');


// 创建表
async function createTable() {
	// table
	var sql = 'CREATE TABLE category (title TEXT, updateTime TEXT) ';
	try {
		const table = await q.createTable(db, sql);
		console.log(table);
	} catch (e) {
		console.log(e);
	}
}

// 获取表
async function showTables() {
	try {
		const rows = await q.showTables(db);
		console.log(rows);
	} catch (e) {
		console.log(e);
	}
}

// 插入数据


// 插入数据
async function add() {
	var sql = 'insert into category values (?, ?)';
	try {
		const res = await q.insertData(db, sql, ['学习', 'idsadasdasdasdasdas']);
		console.log(res)
	} catch (e) {
		console.log(e);
	}
}

// 查询数据
function get() {
	return new Promise((resolve, rej) => {
		var sql = 'SELECT * FROM category';
		try {
			q.selectData(db, sql).then((res) => {
				resolve(res)
			})
		} catch (e) {
			console.log(e)
			rej(e)
		}
	})
}

// 删除数据
async function del() {
	var sql = 'delete from category where rowid=?';
	try {
		await q.deleteData(db, sql, [1]);
	} catch (e) {
		console.log(e);
	}
}

export {
	get,
	del,
	add
}
