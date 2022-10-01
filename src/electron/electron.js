const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
const isDev = require('electron-is-dev')
const path = require("path")
let win = null
const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 500,
		minWidth: 800,
		frame: false,
		// transparent:true,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			enableRemoteModule: true,
			nodeIntegrationInWorker: true,
			nodeIntegrationInSubframes: true,
		}
	})
	if (isDev) {
		console.log('Running in development');
		win.loadURL('http://localhost:3000/')
	} else {
		console.log('Running in production');
		win.loadFile(path.join(__dirname, '../../dist/build/h5/index.html'))
	}
}
app.whenReady().then(() => {
	createWindow()
	require('./ipcmMain/index.js')
	require('./ipcmMain/tray.js')
})
//如果没有窗口打开则打开一个窗口 (macOS)   
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
//关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
