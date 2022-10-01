const {
	app,
	BrowserWindow,
	screen,
	ipcMain,
	Notification
} = require('electron')
const win = BrowserWindow.getFocusedWindow()
// require('../Db/dbTest.js')

// 监听渲染进程事件     
ipcMain.on('action', (e, method, parameter) => {
	switch (method) {
		case 'closeApp':
			setTimeout(() => {
				app.quit()
			}, 100)
			break;
		case 'alwaysOnTop': // alwaysOnTop窗口置顶 win.isAlwaysOnTop() 判断当前是否置顶  FullScreen
			win.isAlwaysOnTop() ? win.setAlwaysOnTop(false) : win.setAlwaysOnTop(true)
			break;
		case 'FullScreen': // FullScreen全屏操作  win.isSimpleFullScreen() 判断当前是否全屏注意不是最大化  
			win.isSimpleFullScreen() ? win.setSimpleFullScreen(false) : win.setSimpleFullScreen(true)
			break;
		case 'minimize':
			win.hide()
			break;
		case 'minimize2':
			win.minimize()
			e.reply('hasMax', false)
			break;
		case 'maximize':
			const state = win.isMaximized()
			console.log(state)
			if (!state) {
				win.maximize()
				e.reply('hasMax', true)
			} else {
				win.unmaximize()
				win.setSize(800, 500)
				win.center()
				e.reply('hasMax', false)
			}
			break;
			// Notification
		case 'Notification':
			showNotification(parameter)
			break;
		default:
			break;
	}
})
const showNotification = (parameter) => {
	// console.log('showNotification:', parameter)
	const myNotification = new Notification(parameter)
	myNotification.show()
}
// 当前窗口的监听
win.on('maximize', function() {
	console.log('最大化了')
	win.webContents.send('hasMax', true);
})
win.on('unmaximize', function() {
	console.log('没有最大化')
	win.webContents.send('hasMax', false);
})
// always-on-top-changed  改变置顶状态时触发
win.on('always-on-top-changed', function(e, isAlwaysOnTop) {
	console.log('置顶状态变化', isAlwaysOnTop)
	win.webContents.send('isAlwaysOnTop', isAlwaysOnTop);
})
// 事件: 'enter-full-screen'
// 窗口进入全屏状态时触发
win.on('enter-full-screen', function(e, isFullScreen) {
	console.log('全屏状态变化', isFullScreen)
	win.webContents.send('isFullScreen', true);
})
// 事件: 'leave-full-screen'
// 窗口离开全屏状态时触发 
win.on('leave-full-screen', function(e, isFullScreen) {
	console.log('全屏状态变化', isFullScreen)
	win.webContents.send('isFullScreen', false);
})
// 取消默认原生的顶部右键菜单，并传递会渲染进程显示其他内容
win.hookWindowMessage(278, function(e) {
	console.log('hookWindowMessage')
	// 获取当前鼠标的坐标
	const winPosition = win.getPosition();
	const cursorPosition = screen.getCursorScreenPoint();
	let x = cursorPosition.x - winPosition[0];
	let y = cursorPosition.y - winPosition[1];
	const mouseDip = {
		x,
		y
	}
	// 关闭默认右键菜单的同时，开启自定义菜单
	win.webContents.send('showContextmenu', mouseDip);
	win.setEnabled(false); //窗口禁用
	setTimeout(() => {
		win.setEnabled(true); //窗口启用
	}, 100);
	return true;
})
