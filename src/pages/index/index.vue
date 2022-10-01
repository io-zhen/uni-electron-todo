<template>
	<view class="">
		<!-- topMenu -->
		<view class="index-top flex justify-between align-center border-bottom">
			<view class="flex align-center">
				<text class="iconfont icon-jishiben ml-2 transform2" style="color: #7188CD;"></text>
				<text class="ml-2">KXKY-记事本</text>
			</view>
			<view class="font-smaller noDrag"></view>
			<view class="p-2  flex align-center opacity7">
				<!-- alwaysOnTop 窗口置顶 FullScreen -->
				<uni-tooltip :content="`${asyncLength}上传到云服务器`">

					<view @click="upload()"
						class="top-icon noDrag rounded-circle p-1 iconfont icon-yunshangchuan_o font-lg " />
				</uni-tooltip>

				<view class="top-icon noDrag rounded-circle p-1 iconfont icon-guanyu font-lg "></view>
				<view class="top-icon noDrag rounded-circle p-1 iconfont icon-shezhi2 font-lg "></view>
				<uni-tooltip content="全屏显示">
					<view @click="toIpcMain('FullScreen')"
						:class="[electronState.isFullScreen?'icon-suoxiao':'icon-fangda']"
						class="top-icon noDrag rounded-circle p-1 iconfont font-lg " />
				</uni-tooltip>
				<uni-tooltip content="窗口置顶">
					<view @click="toIpcMain('alwaysOnTop')"
						:class="[electronState.isAlwaysOnTop?'icon-tuding':'icon-tuding1']"
						class="top-icon noDrag rounded-circle p-1 iconfont font-lg" />
				</uni-tooltip>

				<view @click="toIpcMain('minimize2')"
					class="top-icon noDrag rounded-circle p-1 iconfont icon-jian font ml-2  transform11"></view>
				<view @click="toIpcMain('maximize')" :class="[electronState.hasMax?'icon-zuidahua':'icon-zuidahua-1']"
					class="top-icon noDrag rounded-circle p-1 iconfont  font  transform13"></view>
				<view @click="toIpcMain('closeApp')"
					class="top-icon noDrag rounded-circle p-1 iconfont icon-cuohao  font transform12"></view>
			</view>
		</view>
		<!-- body -->
		<index-body :windowHeight="windowHeight" />
		<!-- bottom -->
		<view class="bg-dark" style="height: 0px;">
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="uniState.msgType" :message="uniState.messageText" :duration="2000">
			</uni-popup-message>
		</uni-popup>
		<!-- 删除提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="我再想想" confirmText="确认" title="通知" content="确认删除吗?"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	const {
		ipcRenderer
	} = require('electron')
	import {
		upload,
	} from "@/hooks/upload.js"
	import {
		getAsyncLength,
		getAsyncList
	} from "@/hooks/Async.js"
	export default {
		data() {
			return {
				asyncLength: 0,
				uniState: { //uniapp组件相关参数信息
					msgType: 'info',
					messageText: '这是一条信息提示'
				},
				electronState: {
					isAlwaysOnTop: false,
					hasMax: false, //窗口是否最大化
					isFullScreen: false, //窗口是否全屏
				},
				windowHeight: 0, //窗口的实时高度
				cloudData: '' //云端数据
			}
		},

		mounted() {
			this.getAsyncList()
			// 首次加载时获取窗口高并赋值
			const wh = uni.getWindowInfo().windowHeight
			this.windowHeight = wh - 30

			// 利用uniapp的API监听窗口宽高
			const windowResizeCallback = (res) => {
				this.windowHeight = res.size.windowHeight - 30
				// console.log('变化后的窗口宽度=' + res.size.windowWidth)
				// console.log('变化后的窗口高度=' + res.size.windowHeight)
			}
			uni.onWindowResize(windowResizeCallback)
			// 监听主进程事件
			ipcRenderer.on('hasMax', (e, v) => {
				this.electronState.hasMax = v
			})
			// 监听是否置顶事件
			ipcRenderer.on('isAlwaysOnTop', (e, v) => {
				this.electronState.isAlwaysOnTop = v
				if (v) {
					this.messageToggle('info', '已置顶')
				} else {
					this.noticeToggle('已取消置顶')
				}

			})
			// 监听是否全屏事件isFullScreen
			ipcRenderer.on('isFullScreen', (e, v) => {
				this.electronState.isFullScreen = v
				if (v) {
					this.noticeToggle('已全屏')
				} else {
					this.noticeToggle('已取消全屏')
				}

			})
		},
		methods: {
			async getAsyncList() {
				const length = await getAsyncLength()
				this.asyncLength = length
			},
			upload() {
				upload()
			},
			delCategory() {
				console.log('fu')
				this.$refs.alertDialog.open()
			},
			// 向主进程发送消息
			toIpcMain(e) {
				ipcRenderer.send('action', e)
			},
			messageToggle(type, message) {
				this.uniState.msgType = type
				this.uniState.messageText = message
				this.$refs.message.open()
			},
			noticeToggle(title, icon = "none") {
				uni.showToast({
					title: title,
					icon: icon
				})
			}
		}
	}
</script>

<style>

</style>
