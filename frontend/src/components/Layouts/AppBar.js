import { Box, TextInput } from 'grommet'
import { Search } from 'grommet-icons'
import { useState } from 'react'
import UploadFilesLayer from '@/components/Layouts/UploadFilesLayer'
import { useUIContext } from '@/contexts/ui'

const Filter = ({}) => {
    const { filterQuery, setFilterQuery } = useUIContext()
    const [value, setValue] = useState(filterQuery)
    let timer

    const handleChange = e => {
        setValue(e.target.value)

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
                value={value}
                onChange={e => handleChange(e)}
            />
        </Box>
    )
}

const AppBar = () => {
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

            {isOpen && <UploadFilesLayer onClose={onClose} />}
        </>
    )
}

export default AppBar
