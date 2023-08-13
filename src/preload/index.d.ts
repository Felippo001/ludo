import { ElectronAPI } from '@electron-toolkit/preload'
declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            getVersion: () => string,
            selectFolder: () => string | null
            shell: typeof import('electron').shell,
            fs: typeof import('fs'),
            http: typeof import('isomorphic-git/http/node'),
            git: typeof import('isomorphic-git'),
            childProcess: typeof import('child_process'),
            path: typeof import('path'),
        }
    }
}
