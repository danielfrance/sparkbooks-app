import { Box, Button, Grid, Header, Text, TextInput } from 'grommet'
import { Search, StatusInfo } from 'grommet-icons'
import { useState } from 'react'
import UploadFilesLayer from '@/components/Layouts/UploadFilesLayer'
import { useUIContext } from '@/contexts/ui'

const Filter = ({}) => {
    const { filterQuery, setFilterQuery } = useUIContext()
    const handleKeyUp = e => {
        let timer

        clearTimeout(timer)
        timer = setTimeout(() => setFilterQuery(e.target.value), 1000)
    }
    return (
        <Box style={{ minWidth: '40%' }}>
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

export const AppBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div className="flex appbar">
                <Filter />
                <button className="btn primary" onClick={onOpen}>
                    Upload New Files
                </button>
            </div>

            {isOpen && <UploadFilesLayer onClose={onClose} isOpen />}
        </>
    )
}
