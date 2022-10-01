// 托盘
const {
	app,
	BrowserWindow,
	Menu,
	Tray,
	nativeImage
} = require('electron');
const path = require('path');
const win = BrowserWindow.getFocusedWindow()
const winId = win.id
const iconPath = path.join(__dirname, './../../static/icon/note2.ico')
const tray = new Tray(nativeImage.createFromPath(iconPath)) //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url  
tray.setToolTip('KXKY-记事本') //鼠标移到托盘中应用程序的图标上时，显示的文本
tray.on('click', () => { //点击图标的响应事件，这里是切换主窗口的显示和隐藏
	BrowserWindow.fromId(winId).isVisible() ? BrowserWindow.fromId(winId).hide() : BrowserWindow.fromId(winId)
		.show()
})

tray.on('right-click', () => { //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
	const menuConfig = Menu.buildFromTemplate([{
			label: "写日志",
			click: () => {
				// 简写:如果屏幕未显示，则打开 ||判断false && 可以判断true
				win.isVisible() || win.show()
				win.webContents.send("router", "/app-random")
			}
		},
		{
			label: "记待办"
		},
		{
			label: "开始学习"
		},
		{
			type: 'separator' //分割线
		},
		{
			label: '刷新',
			click: () => {
				win.reload()
			}
		},
		{
			label: '全屏',
			click: () => {
				win.maximize()
			}
		},
		{
			label: '重置缩放',
			click: () => {
				win.unmaximize()
				win.setSize(800, 500)
				win.center()
				// 底部任务栏闪烁
				win.flashFrame(true)

			}
		},
		{
			label: '退出',
			click: () => {
				win.isVisible() ? app.quit() : win.destroy()
			}
		}
	])
	tray.popUpContextMenu(menuConfig)
})

// 实现任务栏闪烁图标
let count = 1;
let timer = setInterval(() => {
	count++
	if (count % 2 === 0) {
		tray.setImage(path.join(__dirname, './../../static/icon/note1.ico'))
	} else {
		tray.setImage(path.join(__dirname, './../../static/icon/note2.ico'))
	}
}, 1000)
