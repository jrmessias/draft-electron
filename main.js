import { app, BrowserWindow, dialog, Menu, MenuItem, Tray, globalShortcut } from 'electron';
import path from 'path';
import url from 'url';
/*
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const dialog = electron.dialog
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const Tray = electron.Tray;
const globalShortcut = electron.globalShortcut;

const appPath = app.getAppPath()
const appIcon = 'img/icon/icon.png'
app.setName('TV Shows')
const appName = app.getName()
*/

const appPath = app.getAppPath()
const appIcon = 'img/icon/icon.png'
app.setName('TV Shows')
const appName = app.getName()

const buttonsDefault = ['OK', 'Cancelar'];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let menuTemplate = [
  {
    label: appName,
    submenu : [
    {
      label: 'HTGAWM',
      accelerator: 'CommandOrControl+A',
      submenu : [
          {
            label: 'Annelise',
          },
          {
            type: 'separator',
          },
          {
            label: 'Wes',
          },
          {
            type: 'separator',
          },
          {
            label: 'Frank'
          }
        ]
      }
    ]
  },
  {
    label : 'Suits',
  },
  {
    label : 'Santa Clarita Diet',
    submenu : [
      {
        label: 'Hello',
        //role: 'Hi',
        click: function (item, win, event) {
          dialog.showMessageBox(win, {
            type : 'info',
            message: 'Hummm',
            title: 'Hi'
          })
        }
      }
    ]
   }
]

let trayMenuTemplate = [
    {
      label: 'Stark'
    },
    {
      label: 'Lannister'
    },
    {
      label: 'Baratheon'
    },
    {
      type: 'separator'
    },
    {
      label: 'Night Watch'
    }
]

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, title: appName, icon: appIcon})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //mainWindow.loadURL('http://www.google.com.br')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

/*
  dialog.showMessageBox(mainWindow, {
    type : 'info', // warning, question, error, info, none
    message: 'it\'s me',
    title: 'Hello',
    buttons: buttonsDefault
  })

  dialog.showOpenDialog(mainWindow, {
    title: 'Selecione um arquivo',
    buttonLabel: 'Abrir',
    filters: [
      {name: 'Markdown', extensions: ['md']},
    ]
  })

  dialog.showErrorBox('Título', 'Conteúdo')

  dialog.showSaveDialog(mainWindow, {
    title: 'Salvar arquivo',
    buttonLabel: 'Salvar',
    filters: [
      {name: 'Markdown', extensions: ['md']},
    ]
  })
  */

/*
  const menu = new Menu();
  menu.append(new MenuItem({
    label: 'Menu 1'
  }));
  menu.append(new MenuItem({
    label: 'Menu 2'
  }));
  */

  const CommandOrControlA = globalShortcut.register('CommandOrControl+A', () => {
    console.log('CommandOrControl+A is pressed')
  })

  if (!CommandOrControlA) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+A'));

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const trayIcon = new Tray(appIcon);
  var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  trayIcon.setToolTip(appName);
  trayIcon.setContextMenu(trayMenu);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.log('closed');

    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  console.log('before-quit')
})

app.on('will-quit', () => {
  console.log('will-quit')
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  app.quit()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
