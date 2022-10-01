<template>
	<view>
		<sql></sql>
		<button @click="insert">提交数据</button>
		<!-- <input class="border m-1" type="text" v-model="title"> -->
		<!-- <view class="" v-for="item in dataList.value">
			{{item.title}}
		</view> -->
		<sql2></sql2>
	</view>
</template>

<script setup>
	import
	sql
	from "@/components/sql/sql.vue"
	import
	sql2
	from "@/components/sql2/sql2.vue"
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	import {
		insert
	} from '@/sqlite3/categoryDb.js'

	// import sqlite3db from "@/hooks/sqlite3.js"
	// const db = new sqlite3db('category')
	// let title = ref('')

	// const dataList = reactive([])

	// const add = () => {
	// 	insert()
	// }
	// const get = async () => {
	// 	const res = await db.getAll()
	// 	console.log(res)
	// 	dataList.value = res
	// }
	onMounted(() => {
		// get()
		// insert()
	})
</script>

<style>

</style>
