import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'
import { openExternalUrl } from '@renderer/scripts/game'
import { SocialProps } from '@renderer/types/socials'
import { SocialsPlatformMap } from './Socials'





function SocialsMenuList({ socials = [] }: SocialProps): JSX.Element {

    return (
        <>
            <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <MenuItem disabled={!socials || socials.length == 0}>Socials</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        {socials?.map((a, i) => (
                            <MenuItem key={i} onClick={() => openExternalUrl(a.url)} icon={SocialsPlatformMap[a.name]}>
                                {a.name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </MenuPopover>
            </Menu>
        </>
    )
}

export default SocialsMenuList
