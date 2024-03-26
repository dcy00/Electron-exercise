// app 模块，它控制应用程序的事件生命周期。
// BrowserWindow 模块，它创建和管理应用程序 窗口。
const { app, BrowserWindow } = require('electron')

const path = require('path')


// 添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // __dirname 字符串指向当前正在执行脚本的路径 (在本例中，它指向你的项目的根文件夹)。
            // path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// 接着，调用createWindow()函数来打开您的窗口。
// 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。 
// 您可以通过使用 app.whenReady() API来监听此事件。 在whenReady()成功后调用createWindow()。
app.whenReady().then(() => {
    createWindow();
    console.log('ready')
    // 当 Linux 和 Windows 应用在没有窗口打开时退出了，
    // macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，
    // 并且在没有窗口可用的情况下激活应用时会打开新的窗口。
    app.on('activate', () => {
        console.log('activate')
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
    // 如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()
    if (process.platform !== 'darwin') app.quit()
})    