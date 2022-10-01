<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url('static/free.css');
	@import url('static/iconfont.css');

	html,
	body {
		margin: 0;
		padding: 0;
		overflow: hidden;
		color: #7C8088;
		height: 100%;
		font-size: 14rpx;
	}

	.canDrag {
		-webkit-app-region: drag;
	}

	.noDrag {
		-webkit-app-region: no-drag;
	}

	.index-top {
		color: #3C4043;
		height: 55px;
		background-color: #E7EAED;
		z-index: 999;
		width: 100%;
		-webkit-app-region: drag;
		-webkit-user-select: none;
		position: fixed;
		top: 0;
		left: 0;
	}

	.top-icon {
		/* background-color: #3C4043; */
	}

	.top-icon:hover {
		background-color: #dddddd;
	}

	.main-bg {
		background-color: #F3F4F6;
	}

	::-webkit-scrollbar {
		width: 4px;
		height: 9px;
	}

	/* 滚动条整体宽度 */
	::-webkit-scrollbar-track {
		background-color: #eee;
	}

	/*滚动条背景色*/
	::-webkit-scrollbar-thumb {
		background-color: #E0E0E0;
		border-radius: 8px;
	}

	/* 光标颜色 */
	input {
		caret-color: #DEE4F2;
	}
</style>
