import { Badge, Tooltip, TooltipProps } from '@fluentui/react-components'
import { Warning16Regular, Code16Regular, CheckmarkCircle16Regular } from '@fluentui/react-icons'

// @ts-ignore
const props: TooltipProps = { positioning: 'below' }

export const Badges = {
    UNKOWN: (
        <Tooltip
            {...props}
            content={
                <>
                    This is an unkown game.
                    <br />
                    <br />
                    When you're downloading a game you're not familiar with, take a moment to do some research before
                    installing. Some games might have harmful software or viruses, so it's important to be cautious.
                    <br />
                    <br />
                    Use at your own risk!
                </>
            }
            relationship="label"
        >
            <Badge color="severe" appearance="filled" size="small" icon={<Warning16Regular />}>
                Unkown
            </Badge>
        </Tooltip>
    ),
    VERIFIED: (
        <Tooltip
            {...props}
            content={
                <>
                    Verified games provide additional insights into the game and its creators, giving you a greater
                    sense of trustworthiness.
                    <br />
                    <br />
                    However, remember that verification doesn't necessarily mean a game is free from viruses. It's
                    crucial to remain cautious and prioritize your device's security, even when dealing with verified
                    games.
                </>
            }
            relationship="label"
        >
            <Badge color="informative" appearance="tint" size="small" icon={<CheckmarkCircle16Regular />}>
                Verified
            </Badge>
        </Tooltip>
    ),
    OPEN_SOURCE: (
        <Tooltip
            {...props}
            content={
                <>
                    This game is open source, which means its code is accessible to the public. You can find the source
                    code online and even contribute to its development if you have the expertise.
                    <br />
                    <br />
                    Embrace the collaborative spirit of open source and explore the possibilities!
                </>
            }
            relationship="label"
        >
            <Badge color="important" appearance="filled" size="small" icon={<Code16Regular />}>
                Open Source
            </Badge>
        </Tooltip>
    ),
    '...': (
        <Tooltip
            {...props}
            content={
                <>
                    This game features numerous badges, not all of which are displayed here. To explore all available
                    badges, simply navigate to the game settings by clicking on the three dots icon.
                </>
            }
            relationship="label"
        >
            <Badge color="important" appearance="outline" size="small" icon={null}>
                ...
            </Badge>
        </Tooltip>
    )
} as const

