<template>
	<view class="font-lg">
		sql子组件
		{{length}}
		<button @click="clear()">清空category表</button>
		{{dataList.value}}
	</view>
</template>


<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	import {
		clear,
		length,
		getAll,
		dataList
	} from '@/sqlite3/categoryDb.js'
	import {
		test,
		find
	} from '@/sqlite3/nedbCategory.js'

	onMounted(async () => {
		getAll()
		find()

	})
</script>

<style>

</style>
