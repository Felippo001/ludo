import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
    shorthands,
    makeStyles,
    Subtitle2,
    Caption1,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    MenuDivider,
    Image,
    Caption2
} from '@fluentui/react-components'
import {
    CaretRight24Filled,
    ArrowDownload24Filled,
    FormNew24Regular,
    MoreHorizontal24Filled,
    Delete24Regular,
    FolderOpen24Regular,
    Play24Regular
} from '@fluentui/react-icons'
import { Badges } from '@renderer/components/Badges'
import { clone,  simplifyProgress } from '@renderer/scripts/git'
import { useState } from 'react'
import SocialsMenuList from './SocialsMenuList'

import { TailSpin } from 'react-loader-spinner'
import { openGameInFolder, removeFolder, startGame } from '@renderer/scripts/game'
import { updateGameData } from '@renderer/scripts/storage'
import { GameData, Installed, NotInstalled, SimplifiedProgress } from '@renderer/types/game'


export const CardWidth = 350

const useStyles = makeStyles({
    card: {
        ...shorthands.margin('10px'),
        //width: "250px",
        width: 'calc(100% - 20px)',
        maxWidth: `${CardWidth}px`
        //   height: "270px"
    },
    cardFooter: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    redHover: {
        transitionDuration: '200ms',
        ':hover': {
            coblor: 'red'
            // backgroundColor: 'red',
        }
    },
    imageHeight: {
        // height: "145px"
    },
    badgeBox: {
        ...shorthands.gap('6px'),
        maxWidth: '100%',
        flexWrap: 'wrap',
        display: 'flex'
    }
})

function GameCard(_props: GameData): JSX.Element {
    const styles = useStyles()

    const [props, setProps] = useState(_props)

    const [deleteIconColor, setDeleteIconColor] = useState('')
    const [installationProgress, setInstalltionProgress] = useState({} as SimplifiedProgress)

    // TODO error handling when cloning
    const downloadGame = async () => {

        setProps({...props, installed: 'INSTALLING'})

        const path = await clone(
            props.remote!,
            (progress) => {
                setInstalltionProgress(
                    simplifyProgress(progress)
                )
                // console.log(simplifyProgress(progress))
            }
        )

        const update : Installed = {
            installed: 'INSTALLED',
            path: path
        }

        const newProps = {...props, ...update}
        
        setProps(newProps)
        setInstalltionProgress({} as SimplifiedProgress)
        updateGameData(newProps)

    }

    const play = () => {
        startGame(props as GameData & Installed)
    }

    const removeGame = () => {
        removeFolder((props as Installed).path)

        const update : NotInstalled = {
            installed: 'NOT_INSTALLED',
            removedTimestamp: Date.now()
        }

        const newProps = {...props, ...update}
        
        setProps(newProps)
        updateGameData(newProps)
    }

    const openInFolder = () => {
        openGameInFolder((props as Installed).path)
    }

    return (
        <Card className={styles.card}>
            <CardPreview
                className={styles.imageHeight}
                logo={
                    props.metadata.icon && (
                        <Image
                            style={{ border: '3px solid #fff', borderRadius: '50%' }}
                            height={'25px'}
                            src={props.metadata.icon}
                            alt="Icon"
                        />
                    )
                }
            >
                <Image fit="cover" src={props.metadata.image} alt="Image" />
            </CardPreview>
            <CardHeader
                header={<Subtitle2>{props.metadata.title}</Subtitle2>}
                description={props.metadata.description ?? <Caption1>{props.metadata.description}</Caption1>}
            />

            <CardFooter className={styles.cardFooter}>
                {props.installed == 'INSTALLED' && (
                    <Button onClick={play} appearance="primary" shape="circular" icon={<CaretRight24Filled />}>
                        Play
                    </Button>
                )}
                {props.installed == 'NOT_INSTALLED' && (
                    <Button onClick={downloadGame} appearance="secondary" shape="circular" icon={<ArrowDownload24Filled />}>
                        Install
                    </Button>
                )}
                {/* @ts-ignore */}
                {props.installed == 'INSTALLING' && (
                    <Button appearance="secondary" shape="circular" icon={<TailSpin color="var(--colorNeutralForeground1)" height={16} width={16} />}>
                        {installationProgress.progress}
                    </Button>
                )}
                <Caption2 italic>{installationProgress.phase}</Caption2>
                <Menu>
                    <MenuTrigger>
                        <Button
                            className={styles.redHover}
                            appearance="transparent"
                            icon={<MoreHorizontal24Filled />}
                        ></Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            {props.installed == 'INSTALLED' && <MenuItem onClick={play} icon={<Play24Regular />}>Play</MenuItem>}
                            {props.installed == 'NOT_INSTALLED' && (
                                <MenuItem onClick={downloadGame} icon={<ArrowDownload24Filled />}>Install</MenuItem>
                            )}

                            <MenuDivider />
                            <MenuItem onClick={openInFolder} disabled={props.installed == 'NOT_INSTALLED'} icon={<FolderOpen24Regular />}>
                                Open in Explorer
                            </MenuItem>
                            <MenuItem icon={<FormNew24Regular />} disabled>
                                Changelog
                            </MenuItem>
                            <SocialsMenuList socials={props.socials} />
                            <MenuDivider />
                            <MenuItem
                                disabled={props.installed == 'NOT_INSTALLED'}
                                onMouseEnter={() => setDeleteIconColor('red')}
                                onMouseLeave={() => setDeleteIconColor('')}
                                onClick={removeGame}
                                icon={<Delete24Regular opacity={props.installed == 'NOT_INSTALLED' ? 0.4 : 1} primaryFill={deleteIconColor} className={styles.redHover} />}
                            >
                                Uninstall
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </CardFooter>
            <CardFooter className={styles.cardFooter}>
                <div className={styles.badgeBox}>{props.badges?.map((a) => Badges[a])}</div>
            </CardFooter>
        </Card>
    )
}

export default GameCard
