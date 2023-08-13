import { contextBridge, ipcRenderer, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer
// import git from 'isomorphic-git'
const fs = require('fs')
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const path = require('path')
const childProcess = require('child_process')

const api = {
    getVersion: (): string => ipcRenderer.sendSync('get-app-version'),
    shell: shell,
    fs: fs,
    git: git,
    http: http,
    childProcess: childProcess,
    path: path,
    selectFolder: (title: string) : string => ipcRenderer.sendSync('select-folder', title)
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
        // contextBridge.exposeInMainWorld('fs', fs)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
    // // @ts-ignore (define in dts)
    // window.fs = fs
}
