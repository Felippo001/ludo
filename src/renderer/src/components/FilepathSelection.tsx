import { makeStyles, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Input} from "@fluentui/react-components"
import { get, set, Storage } from "@renderer/scripts/storage"
import { useEffect, useState } from "react"
import {FolderOpen24Regular} from '@fluentui/react-icons'

const useStyles = makeStyles({
    inputIcon: {
        cursor: "pointer",
        transitionDuration: '200ms',
        ':hover': {
            color: 'var(--colorBrandForegroundOnLightHover)'
            // backgroundColor: 'red',
        }
    },
    input: {
        width: "100%",
    }
})

function FilepathSelection() : JSX.Element {
    const styles = useStyles()

    const [open, setOpen] = useState(false)
    const [validFolder, setValidFolder] = useState(false)

    const [inputPath, setInputPath] = useState('')

    useEffect(() => {
        const installationPath = get<string>(Storage.installationPath)
        if(!installationPath)
            setOpen(true)
        
        // const filePath = window.api.selectFolder()
        // console.log(filePath)
    }, [])

    const handleInput = (e) => {
        setInputPath(
            formatPath(e.target.value)
        )

        validatePath(e.target.value)
    }



    const selectFolder = () => {
        const folder = window.api.selectFolder()

        console.log(folder)
        if(!folder)
            return

        setInputPath(
            formatPath(folder)
        )
        validatePath(folder)
    }

    const validatePath = (path: string) => {
        setValidFolder(
            window.api.fs.existsSync(path)
        )
    }

    const formatPath = (path: string) : string => path.replace(/\\/g, "/")


    const savePath = () => {
        const formatted = inputPath.slice(-1) == "/" ? 
            inputPath.slice(0, inputPath.length -1) :
            inputPath
        set(Storage.installationPath, formatted)
        setOpen(false)
    }

    



    return (
        <Dialog open={open}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Select Installation Folder</DialogTitle>
                    <DialogContent>
                        Choose the destination folder where your downloaded games will be stored and installed. This folder will be used to save the game files and manage installations. Make sure to select a location with sufficient storage space and easy access for a seamless experience.
                    </DialogContent>
                    <DialogContent>
                    </DialogContent>
                </DialogBody>
                <DialogBody>
                    <DialogContent>
                        <Input value={inputPath} onChange={handleInput} placeholder="Set a location..." className={styles.input} appearance="filled-darker" contentAfter={<FolderOpen24Regular onClick={selectFolder} className={styles.inputIcon} />} />
                    </DialogContent>
                    
                    <DialogActions>

                        <Button disabled={!validFolder} onClick={savePath} appearance="primary">Save</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}


export default FilepathSelection
