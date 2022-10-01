<template>
	<view class="index-body flex" :style="`height:${windowHeight}px`">
		<view class="body-left flex-shrink main-bg mx-1 rounded flex flex-column ">
			<view class="left-list flex-1">
				<view v-if="!isEditor" :class="[currentCategoryId?'':'activeCategory']" @click="getTodoList()"
					class="flex align-center justify-between list-item m-1 p-1 rounded">
					<view class="flex align-center">
						<text class="iconfont icon-daibanshiwu font mr-1"></text>
						<text>全部</text>
					</view>
				</view>
				<view class="" style="width: 200px;" v-for="(item,index) in categoryList.value" :key="index">
					<view v-if="isEditor" class="flex align-center justify-between list-item ">
						<view class="flex align-center ml-1 my-1">
							<uni-easyinput spellcheck="false" :clearable="false" :inputBorder="false" :maxlength="6"
								:focus="item._id===currentCategoryId?true:false" type="text" v-model="item.title"
								:ref="item._id" @confirm="updateCategory(item._id,item.title)" />
						</view>
						<view class="flex align-center opacity7 editorIcon">
							<view class="iconfont icon-shanchu m-1" @click="delCategory(item._id)">
							</view>
							<view class="iconfont icon-bianji mr-1" @click="updateCategory(item._id,item.title)">
							</view>
						</view>
					</view>
					<view v-else>
						<view class="flex align-center list-item p-1 m-1 rounded"
							:class="[item._id==currentCategoryId?'activeCategory':'']" @click="getTodoList(item._id)">

							<view class="flex align-center">
								<text class="iconfont icon-liebiao font mr-1"></text>
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="mx-1 py-1 border-top">
					<view class="left-bottom">
						<text class="iconfont icon-jia mr-1"></text>
						<text @click="addCategory(newCatgoryTitle)">添加分组</text>
					</view>
					<input spellcheck="false" @confirm="addCategory(newCatgoryTitle)" type="text" placeholder="新的分组名"
						placeholder-style="color:#DEE4F2" class="border-bottom font-sm mt-1" v-model="newCatgoryTitle">
				</view>
				<view class="flex align-center">
					<view class="flex align-center left-bottom mx-1 py-1"><text
							class="iconfont icon-shezhi mr-1"></text>设置
					</view>
					<view class="flex align-center left-bottom mx-1 py-1" @click="isEditor=!isEditor"><text
							class="iconfont icon-shezhi mr-1"></text>
						<text>{{isEditor?'完成':'编辑'}}</text>
					</view>
					<view class="ml-1 font-lg">
						<navigator url="/pages/sqlite/sqlite">SQLITE</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="body-right flex-3 main-bg mr-1 p-2 rounded">
			<view class="w-100 flex justify-between">
				<view class="font-weight-bold text-dark font">待处理</view>
				<view class="flex align-center">
					<view style="width: 200px;" class="mr-1">
						<input class="border-bottom font-sm" type="text" v-model="newTodoTitle" placeholder="添加一个新的任务吧"
							placeholder-style="color:#DEE4F2" @confirm="addTodo(newTodoTitle,currentCategoryId)">
					</view>
					<view class="iconfont icon-jia" @click="addTodo(newTodoTitle,currentCategoryId)"></view>
					<view class="iconfont icon-gengduo ml-1"></view>
				</view>
			</view>
			<view class="todo-list mt-1 shadow p-1 my-1 rounded bg-white flex justify-between align-center"
				v-for="item in todoList.value">
				<view class=""><input spellcheck="false" :disabled="item.status?true:false"
						:class="[item.status?'line-through':'']" type="text" v-model="item.title"></view>
				<view class="todoIcon flex align-center">
					<uni-badge text="设置提醒" type="success"></uni-badge>
					<button style="font-size: 10px;background-color: #DEE4F2;border: 0;color: #7188CD;" class="mx-1"
						type="default" size="mini"
						@click="finishTodo(item._id,item.status)">{{item.status?'已完成,从新开始？':'未完成'}}</button>
					<view class="iconfont icon-shanchu" @click="delTodo(item._id)">
					</view>
					<view v-show="!item.status" class="iconfont icon-bianji mx-1"
						@click="updateTodo(item._id,item.title)">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		getTodoList,
		todoList,
		addTodo,
		finishTodo,
		delTodo,
		updateTodo,
		currentCategoryId
	} from "@/hooks/todo.js"
	import {
		categoryList,
		getCategoryList,
		addCategory,
		delCategory,
		updateCategory,
		isEditor
	} from "@/hooks/category.js"
	let emits = defineEmits(['add', 'delCategory', 'update'])
	defineProps({
		windowHeight: { //动态调整列表和窗口的宽度同步
			type: [String, Number],
			default: 0,
			required: true
		}
	})
	// 是否编辑状态


	// 要插入的新分组名称
	const newCatgoryTitle = ref('')
	// 要插入的新todo事项名称
	let newTodoTitle = ''
	// 加载初始数据
	onMounted(() => {
		getCategoryList()
		getTodoList()
	})
</script>

<style scoped>
	.line-through {
		text-decoration: line-through;
	}

	.activeCategory {
		background-color: #DEE4F2;
		font-weight: bold;
	}

	.inputFocus {
		outline: 1px solid #7188CD;
		background: rgba(255, 255, 255, 1);
	}

	.left-bottom:hover {
		color: #7188CD !important;
		cursor: pointer;
	}

	.index-body {
		margin-top: 20px;
	}

	.body-left {
		width: 200px !important;
		/* min-width: 200px; */
		/* background-color: #3C4043; */
	}



	.editorIcon {
		display: none;
		visibility: hidden;
	}

	.editorIcon:hover {
		color: black;
	}

	.list-item {}

	.list-item:hover>.editorIcon {
		visibility: visible;
	}

	.todo-list {
		border: 1px solid #fff;
	}

	.todoIcon {
		display: none;
		visibility: hidden;
	}

	.todo-list:hover {
		border: 1px solid #7188CD;
		cursor: pointer;
	}

	.todo-list:hover>.todoIcon {
		visibility: visible;
	}

	.list-item:hover {
		background-color: #DEE4F2;
	}

	.body-right,
	.left-list {
		overflow: hidden;
	}

	.body-right:hover,
	.left-list:hover {
		overflow-y: overlay;
		overflow-x: hidden;
	}
</style>
