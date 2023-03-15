import { Box, Grid, Header, Text, TextInput } from 'grommet'
import { Search, StatusInfo, Upgrade, Folder } from 'grommet-icons'
import { useState } from 'react'
import UploadFilesLayer from '@/components/Layouts/UploadFilesLayer'
import Button from '@/components/Button'

const Filter = ({}) => {
    return (
        <Box>
            <TextInput
                className="search"
                icon={<Search />}
                placeholder="search ..."
            />
        </Box>
    )
}

const Info = ({}) => {
    return (
        <div className="info">
            <Folder
                color="#C767F5"
                style={{ paddingRight: '5px', paddingTop: '10px' }}
            />
            You have <span className="text-accent">100</span> files remaining
            for the month
        </div>
    )
}

const AccountUpgrade = ({}) => {
    return (
        <>
            <button className="btn secondary" onClick={() => {}}>
                Click here to upgrade
            </button>
            {/* <Button className="btn primary" onClick={() => {}} active>
                <Box pad="small" direction="row" align="center" gap="small">
                    <Text className="fs-300 ff-sans-serif">
                        Click here to upgrade
                    </Text>
                </Box>
            </Button> */}
        </>
    )
}

export const AppBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="inline-grid appbar">
            <Filter />
            <Info />
            <AccountUpgrade />
        </div>
    )
}
