import {
	ref,
	reactive,
} from 'vue'
import dataStore from "@/nedb/db.js";
const todoDb = new dataStore('todo')
const todoList = reactive([])
let isInsertTodo = ref(false)
// 当前的分组id
let currentCategoryId = ref('')
// 完成任务finishTodo
let finishTodo = async (_id, status) => {
	const dataObj = reactive({
		_id
	})
	const res = await todoDb.update(dataObj, {
		status: !status
	})
	if (!status) {
		uni.showToast({
			title: "恭喜您完成了一条待办任务",
			icon: "none"
		})
	} else {
		uni.showToast({
			title: "您恢复了一条待办任务",
			icon: "none"
		})
	}

	getTodoList(currentCategoryId.value)
	return res
}
// 删除todo
let delTodo = async (_id) => {
	const dataObj = reactive({
		_id
	})
	const res = await todoDb.del(dataObj)
	uni.showToast({
		title: "删除成功",
		icon: "none"
	})
	getTodoList(currentCategoryId.value)
	return res
}
// 更新todo
let updateTodo = async (_id, title) => {
	const dataObj = reactive({
		_id,
	})
	const res = await todoDb.update(dataObj, {
		title
	})
	uni.showToast({
		title: "修改成功",
		icon: "none"
	})
	getTodoList(currentCategoryId.value)
	return res
}
// 获取列表
const getTodoList = async (_id) => {
	const dataObj = reactive({})
	let res
	if (!_id) {
		currentCategoryId.value = ''
		res = await todoDb.find({}, -1)
	} else {
		currentCategoryId.value = _id
		dataObj.parentID = _id
		res = await todoDb.find(dataObj, -1)
	}
	todoList.value = res.data

}
// 获取一条数据
const getOne = async (findObj) => {
	const res = await todoDb.findOne(findObj)
	return res
}
// 添加数据
let addTodo = async (title, parentID) => {
	const dataObj = reactive({})
	if (title == '') {
		uni.showToast({
			title: "标题不能为空",
			icon: "none"
		})
		return
	} else {
		dataObj.title = title
		dataObj.parentID = parentID
		dataObj.status = false
	}
	const findObj = {
		title,
		parentID
	}
	const findRes = await getOne(findObj)
	if (findRes.code == 1 && findRes.data.parentID == currentCategoryId.value) {
		uni.showToast({
			title: "标题不能重复",
			icon: "none"
		})
		return
	}

	const res = await todoDb.insert(dataObj)
	uni.showToast({
		title: "插入成功",
		icon: "none"
	})
	isInsertTodo.value = false
	getTodoList(currentCategoryId.value)
	return res
}
export {
	todoList,
	getTodoList,
	addTodo,
	isInsertTodo,
	finishTodo,
	delTodo,
	updateTodo,
	currentCategoryId
}
