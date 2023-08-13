import { RemoteGameData } from "@renderer/types/game";
import { GitProgressEvent } from "isomorphic-git";
import { get, Storage } from "./storage";
// import git from "isomorphic-git"
// import http from "isomorphic-git/http/node"
const fs = window.api.fs
const git = window.api.git

export async function clone(remote: RemoteGameData, onProgress?: (progress: GitProgressEvent) => void) : Promise<string>{

    const installationPath = get<string>(Storage.installationPath)
    const folderName = folderNameFromGitUrl(remote.url)
    const path = installationPath + "/" + folderName

    try {
        var result = await git.clone({
            http: window.api.http,
            fs: fs.promises,
            dir: path,
            url: remote.url,
            onProgress: onProgress,
            
            ref: remote.branch,
            // singleBranch: true
        })

        console.log(result)


        console.log("Downloaded")
        return path
    } catch (error) {
        throw new Error(error as any)
    }
}

function folderNameFromGitUrl(url: string): string{
    const parts = url.split('/')
    const repo = parts[parts.length-1]
    const [repoName] = repo.split('.')
    return repoName
}



export function simplifyProgress(progress: GitProgressEvent){
    return {
        phase: progress.phase,
        progress: progress.total ? `${Math.round((progress.loaded / progress.total) * 100)} %` : "---"
    }
}

