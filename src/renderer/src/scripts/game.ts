import { GameData, Installed } from "@renderer/types/game"

const {exec} = window.api.childProcess 
const fs = window.api.fs
const isWin32 = window.electron.process.platform == "win32"



export function startGame(gameData: GameData & Installed){
    console.log(gameData)
    if(isWin32){
        const executablePath = `"${gameData.path}/${gameData.remote!.entry.win}"`
        // const executablePath = '"C:/Users/Felippo/Documents/Empty Test Project/Build' + "/" + gameData.remote?.entry.win + '"'
        // TODO error handling
        console.log(executablePath)
        exec(executablePath, (err, out, sterr) => {
            if (err) {
                console.error('Error:', err);
                return;
              }
            
              console.log('stdout:', out);
              console.error('stderr:', sterr);
        })

    }
}

export function removeFolder(path: string) {
    if(!fs.existsSync(path))
        console.warn(`Path ${path} doesnt exist but tried to remove`)
    
    fs.rmSync(path, {recursive: true, force: true})
}


export function openGameInFolder(path: string){
    console.log(path)

    if(isWin32){
        path = path.replace(/\//g, '\\')
    }


    window.api.shell.openPath(path)

}

export function openExternalUrl(url: string){
    window.api.shell.openExternal(url)
}

