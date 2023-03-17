import { useState } from 'react'
import { useUIContext } from '@/contexts/ui'
import { Box, Grid, Header, Text, TextInput } from 'grommet'
import { Search, StatusInfo, Upgrade, Folder } from 'grommet-icons'
import UploadFilesLayer from '@/components/Layouts/UploadFilesLayer'
import Button from '@/components/Button'

const Filter = ({}) => {
    const { filterQuery, setFilterQuery } = useUIContext()
    const handleKeyUp = e => {
        let timer
        clearTimeout(timer)

        timer = setTimeout(setFilterQuery(e.target.value), 1000)
    }
    return (
        <Box>
            <TextInput
                className="search"
                icon={<Search size="medium" color="#C767F5" />}
                reverse
                placeholder="Search"
                onKeyUp={e => handleKeyUp(e)}
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
                Upgrade
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
