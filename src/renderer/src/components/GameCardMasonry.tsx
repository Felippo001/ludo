import { GameData } from '@renderer/types/game'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import GameCard, { CardWidth } from './GameCard'

function GameCardMasonry({ cards = [] }: { cards?: GameData[] }): JSX.Element {
    return (
        <ResponsiveMasonry
            style={{ maxWidth: '1980px' }}
            columnsCountBreakPoints={(function () {
                const obj = {}
                const max = 8

                for (let i = 0; i < 20; i++) obj[CardWidth * i] = Math.min(i + 1, max)
                return obj
            })()}
        >
            <Masonry>
                {cards.map((a, i) => (
                    <GameCard key={i} {...a} />
                ))}
                {/* {[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9].map(a =>
                    <GameCard
                    installed={a % 2 == 0 ? "INSTALLED" : "NOT_INSTALLED"}
                    title='Demo game'
                    image={a % 2 == 0 ? 'https://cdn.discordapp.com/attachments/522069091255582731/1139222000741666987/landing2.png' : 'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/call-of-duty-black-ops-2-file-48980dd1.jpeg'}
                    icon={Math.random() > 0.5 ? undefined : 'https://cdn.discordapp.com/attachments/522069091255582731/1139225777204887592/favicon_3.png'}
                    token={{policy: "", assetName: ""}}
                    badges={["VERIFIED", "OPEN_SOURCE", "VERIFIED", "OPEN_SOURCE", "..."].slice(0, a) as Array<Badge>}
                />
                    )} */}
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default GameCardMasonry
