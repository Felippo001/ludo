import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { autoUpdater } from 'electron-updater'

autoUpdater.autoInstallOnAppQuit = false
autoUpdater.autoRunAppAfterInstall = true

let win

function createWindow(): BrowserWindow {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            nodeIntegration: true
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    win = createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
    })

    ipcMain.on('get-app-version', (event) => {
        event.returnValue = app.getVersion()
    })

    ipcMain.on('select-folder', (event, title) => {
        event.returnValue = selectFolder(title)

    })

    setTimeout(() => {
        sendStatusToWindow('application-update', 'Running autoUpdater.checkForUpdatesAndNotify')
        autoUpdater.checkForUpdatesAndNotify()
    }, 2000)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function sendStatusToWindow(event: string, message: string) {
    // log.info(text);
    win.webContents.send(event, message)
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('application-update', 'Checking for update...')
})
autoUpdater.on('update-available', () => {
    sendStatusToWindow('application-update', 'Update available.')
})
autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('application-update', 'Update not available.')
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('application-update', 'Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    sendStatusToWindow('application-update', log_message)
})
autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('application-update', 'Update downloaded')

    setTimeout(autoUpdater.quitAndInstall, 500)
})


function selectFolder(title: string) : string | null {
    const result = dialog.showOpenDialogSync({
        title: title,
        properties: ['openDirectory']
    })

    return result?.length! > 0 ? result![0] : null
}

// setInterval(() => {

//   if(!win)
//   return;

//   console.log("sending message")
//   sendStatusToWindow("Running autoUpdater.checkForUpdatesAndNotify")
// }, 1000)
