import { Box, TextInput } from 'grommet'
import { Search } from 'grommet-icons'
import { useEffect, useState } from 'react'
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
    const { workSpace, setWorkSpace } = useUIContext()
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const loadWorkSpace = async () => {
        try {
            const res = await axios.get('/dashboardData')

            setWorkSpace(res.data)
        } catch (error) {}
    }

    useEffect(() => {
        console.log({ workSpace })
        if (!workSpace) loadWorkSpace()
    }, [workSpace])

    return (
        <>
            <div className="flex appbar">
                <Filter />
                <button
                    className={[
                        'btn',
                        workSpace?.subscription ? 'primary' : '',
                    ].join(' ')}
                    onClick={onOpen}
                    disabled={workSpace?.subscription ? false : true}>
                    Upload New Files
                </button>
            </div>

            {isOpen && <UploadFilesLayer onClose={onClose} />}
        </>
    )
}

export default AppBar
