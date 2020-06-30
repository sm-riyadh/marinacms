const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width        : 800,
    height       : 600,
    frame        : true,
    setResizable : true,
  })
  win.setMaximizable(true)
  win.setMenu(null)

  // backgroundColor : '#000000ff',
  // win with show: false
  win.on('ready-to-show', function() {
    var electronVibrancy = require('..')

    electronVibrancy.enableVibrancy(win)

    electronVibrancy.disableVibrancy(win)

    win.show()
  })

  // webPreferences  : { nodeIntegration: true },

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname : path.join(__dirname, '/../build/index.html'),
      protocol : 'file:',
      slashes  : true,
    })
  win.loadURL(startUrl)

  // win.webContents.openDevTools()

  win.on('closed', function() {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (win === null) {
    createWindow()
  }
})