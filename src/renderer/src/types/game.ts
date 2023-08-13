import { Badge } from "./badges"
import { SocialsProp } from "./socials"


export type Installed = {
    installed: 'INSTALLED'
    path: string
}

export type NotInstalled = {
    installed: 'NOT_INSTALLED'
    removedTimestamp?: number
}

export type Installing = {
    installed: 'INSTALLING'
}

export type RemoteGameData = {
    url: string
    entry: {
        win?: string
        mac?: string
        linux?: string
    }
} & {
    versionControl: 'GIT',
    branch: string
}

export type Token = {
    policy: string
    assetName: string
}

export type GameMetadata = {
    title: string
    description?: string
    image: string
    icon?: string
}

export type GameData = {
    metadata: GameMetadata
    socials?: SocialsProp
    remote?: RemoteGameData
    token: Token
    badges?: Array<Badge>
} & (Installed | NotInstalled | Installing)


export type SimplifiedProgress = {
    phase: string,
    progress: string
}