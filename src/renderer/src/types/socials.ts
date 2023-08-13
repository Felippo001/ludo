import { SocialsPlatformMap } from "@renderer/components/Socials";


export type SocialPlatform = keyof typeof SocialsPlatformMap

export type SocialsProp = Array<{
    name: SocialPlatform
    url: string
}> | null

export type SocialProps = {
    socials: SocialsProp | undefined
}