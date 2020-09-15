const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth       : 800,
    minHeight      : 600,
    frame          : false,
    setResizable   : true,
    webPreferences : { nodeIntegration: true },
  })
  // win.maximize(true)
  win.setMenu(null)

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
