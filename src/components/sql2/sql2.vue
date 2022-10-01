<template>
	<view>
		sql2组件
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	import {
		insert,
		find
	} from '@/sqlite3/nedbCategory.js'

	onMounted(async () => {
		insert()
		find()
	})
</script>

<style>

</style>
