<template>
	<view class="index-body flex" :style="`height:${windowHeight}px`">
		<view class="body-left flex-shrink main-bg mx-1 rounded flex flex-column ">
			<view class="left-list flex-1">
				<view class="" style="width: 200px;" v-for="(item,index) in nedbData" :key="index">
					<view v-if="isEditor" class="flex align-center justify-between list-item ">
						<view class="flex align-center ml-1 my-1">
							<uni-easyinput :clearable="false" :inputBorder="false" :maxlength="6"
								:focus="item._id===currentId?true:false" type="text" v-model="item.title"
								:ref="item._id" />
						</view>
						<view class="flex align-center opacity7 editorIcon">
							<view class="iconfont icon-shanchu m-1" @click="dialogToggle('info',index)">
							</view>
							<view class="iconfont icon-bianji mr-1" @click="editor(item._id,item.title)">
							</view>
						</view>
					</view>
					<view v-else class="flex align-center list-item p-1" @click="getTodoList(item._id)">
						<view class="flex align-center">
							<text class="iconfont icon-liebiao font mr-1"></text>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="mx-1 py-1 border-top">
					<view class="left-bottom">
						<text class="iconfont icon-jia mr-1"></text>
						<text @click="add">添加分组</text>
					</view>
					<input @confirm="add" type="text" placeholder="新的分组名" placeholder-style="color:#DEE4F2"
						class="border-bottom font mt-1" v-model="addData.title">
				</view>
				<view class="flex ">
					<view class="left-bottom mx-1 py-1"><text class="iconfont icon-shezhi mr-1"></text>设置
					</view>
					<view class="left-bottom mx-1 py-1" @click="changeIsEditor"><text
							class="iconfont icon-shezhi mr-1"></text>
						<text>{{isEditor?'完成':'编辑'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="body-right flex-3 main-bg mr-1 p-2 rounded">
			<view class="font-weight-bold text-dark font w-100 flex justify-between">
				<view class="">待处理</view>
				<view class="flex">
					<view class="iconfont icon-jia" @click="isInsertTodo = true"></view>
					<view class="iconfont icon-gengduo ml-1"></view>
				</view>
			</view>
			{{currentCategoryId}}
			{{categoryList}}
			<view class="" v-if="isInsertTodo"><input type="text" focus v-model="newTodoTitle" @confirm="insertTodo">
			</view>
			<view class="mt-1 shadow p-1 my-1 rounded bg-white" v-for="item in todoList">{{item.title}}</view>
		</view>
	</view>
	<!-- 删除提示窗示例 -->
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog :type="msgType" cancelText="我再想想" confirmText="确认" title="通知" content="确认删除吗?"
			@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	import {
		getCurrentInstance,
		ref
	} from 'vue'
	export default {
		emits: ['add', 'del', 'update'],
		props: {
			windowHeight: {
				type: Number,
				default: 0
			},
			nedbData: {
				type: Object,
				default: () => {}
			}
		},
		setup() {
			const instance = getCurrentInstance()
			const todoDb = new instance.proxy.$db2('test2')
			const categoryDb = new instance.proxy.$db2('category')
			let categoryList = ref([])
			const getCategory = async () => {
				const res = await categoryDb.find()
				categoryList.value = res.data
			}
			return { //必须返回 模板中才能使用
				todoDb,
				getCategory,
				categoryList
			}
		},
		data() {
			return {
				newTodoTitle: '',
				todoList: [],
				newTitle: '',
				isEditor: false,
				isInsertTodo: false,
				addData: {
					title: ''
				},
				currentCategoryId: 0,
				msgType: 'success',
			}
		},
		mounted() {
			this.getTodoList()
			this.getCategory()
		},
		methods: {
			async insertTodo() {
				try {
					const res = await this.todoDb.insert({
						title: this.newTodoTitle,
						parentId: this.currentCategoryId
					})
				} catch (e) {
					console.log(e)
				} finally {
					this.getTodoList(this.currentCategoryId)
					this.isInsertTodo = false
				}
			},
			async getTodoList(parentId) {
				let dataObj = {}
				if (parentId) {
					this.currentCategoryId = parentId
					dataObj.parentId = parentId
				}
				try {
					const res = await this.todoDb.find(dataObj)
					console.log(res)
					this.todoList = res.data
					// this.currentCategoryId = res.data[0]._id
				} catch (e) {
					console.log(e)
				}
			},
			add() {
				this.$emit('add', this.addData)
			},
			changeIsEditor() {
				this.isEditor = !this.isEditor
			},
			editor(id, title) {
				this.$emit('update', id, title)
			},
			dialogToggle(type, index) {
				this.currentId = this.nedbData[index]._id
				console.log(this.nedbData[index])
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			dialogConfirm() {
				console.log('点击确认', this.currentId)
				this.$emit('del', this.currentId)
			}
		}
	}
</script>

<style scoped>
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

	.left-list {
		overflow: hidden;
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

	.list-item:hover {
		background-color: #DEE4F2;
	}

	.left-list:hover {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.body-right {
		/* height: 100%; */
	}
</style>
