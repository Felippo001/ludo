import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components'
import { useState } from 'react'
import FilepathSelection from './components/FilepathSelection'
import GameCardMasonry from './components/GameCardMasonry'
import { addGameEntry, getListOfGames } from './scripts/storage'
import { GameData } from './types/game'
import { SocialsProp } from './types/socials'



const socials: SocialsProp = [
    {
        name: 'Discord',
        url: 'https://dmitripavlutin.com/typescript-function-type/'
    },
    {
        name: 'Discord',
        url: 'https://dmitripavlutin.com/typescript-function-type/'
    },
    {
        name: 'Twitter',
        url: 'https://dmitripavlutin.com/typescript-function-type/'
    }
]

const cards: GameData[] = [
    {
        installed: 'NOT_INSTALLED',
        // path: '',
        metadata: {
            title: 'Ludo Unity Demo',
            image: 'https://cdn.discordapp.com/attachments/522069091255582731/1140201571511173120/image.png',
            description: '',
            icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
        },
        token: {
            policy: 'aaaa',
            assetName: 'Demo'
        },
        remote: {
            versionControl: 'GIT',
            url: 'https://github.com/Felippo001/empty-unity-project.git',
            branch: 'master',
            entry: {
                win: "Build/win/Empty Test Project.exe"
            }
        },
        badges: ['VERIFIED', 'OPEN_SOURCE'],
        socials: socials
    },
    // {
    //     installed: 'NOT_INSTALLED',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/call-of-duty-black-ops-2-file-48980dd1.jpeg',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['VERIFIED']
    // },
    // {
    //     installed: 'NOT_INSTALLED',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.discordapp.com/attachments/522069091255582731/1139222000741666987/landing2.png',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['UNKOWN']
    // },
    // {
    //     installed: 'INSTALLED',
    //     path: '',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/call-of-duty-black-ops-2-file-48980dd1.jpeg',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['UNKOWN']
    // },
    // {
    //     installed: 'NOT_INSTALLED',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.discordapp.com/attachments/522069091255582731/1139222000741666987/landing2.png',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['UNKOWN']
    // },
    // {
    //     installed: 'NOT_INSTALLED',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/call-of-duty-black-ops-2-file-48980dd1.jpeg',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['UNKOWN']
    // },
    // {
    //     installed: 'INSTALLED',
    //     path: '',
    //     metadata: {
    //         title: 'Blockchain Party - Zombie',
    //         image: 'https://cdn.discordapp.com/attachments/522069091255582731/1139222000741666987/landing2.png',
    //         description: '',
    //         icon: 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
    //     },
    //     token: {
    //         policy: '',
    //         assetName: ''
    //     },
    //     badges: ['UNKOWN']
    // }
]

function App(): JSX.Element {
    const [games, setGames] = useState(getListOfGames())

    return (
        <FluentProvider theme={webLightTheme}>
            <FilepathSelection />
            <Button onClick={() => {
                addGameEntry(cards[0])
                setGames(getListOfGames())
            }} appearance="primary">Add Game</Button>

            {/* <GameCard
                installed='INSTALLED'
                title='Blockchain Party - Zombie'
                image='https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/call-of-duty-black-ops-2-file-48980dd1.jpeg'
                path=''
                icon='https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'
                token={{policy: "", assetName: ""}}
                badges={["UNKOWN"]}
            />
            <GameCard
                installed='NOT_INSTALLED'
                title='Demo game'
                image='https://cdn.discordapp.com/attachments/522069091255582731/1139222000741666987/landing2.png'
                token={{policy: "", assetName: ""}}
                badges={["VERIFIED", "OPEN_SOURCE", "VERIFIED", "OPEN_SOURCE", "..."]}
            /> */}

            <GameCardMasonry cards={games} />
        </FluentProvider>
    )
}

export default App
