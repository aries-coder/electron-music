const { BrowserWindow, app, Menu, globalShortcut } = require("electron")
const path = require("path")

function createWindow() {
  // 创建窗口
  const win = new BrowserWindow({
    width: 380,
    height: 530,
    alwaysOnTop: true, // 窗口始终在其他窗口之上
    resizable: false, // 不可调整窗口大小
    webPreferences: {
      preload: path.resolve(__dirname, './preload/index.ts') // 预加载脚本路径
    }
  })

  // 设置预览URL
  // win.loadURL('http://localhost:5173/')  
  win.loadFile(path.resolve(__dirname, './render/index.html'))

  // 隐藏顶部菜单栏
  Menu.setApplicationMenu(null)

  // 注册自定义快捷键来打开控制台
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    win.webContents.openDevTools()
  })
}

// 当应用程序准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow()

  // 当应用程序是通过单击任务栏图标激活时，如果没有窗口存在，则创建一个新窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 当所有窗口关闭时退出应用程序（除非在 macOS 上点击窗口菜单中的退出按钮）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
