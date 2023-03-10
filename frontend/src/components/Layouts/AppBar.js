import { Box, Button, Grid, Header, Text, TextInput } from 'grommet'
import { Search, StatusInfo } from 'grommet-icons'
import { useState } from 'react'
import UploadFilesLayer from '@/components/Layouts/UploadFilesLayer'

export const AppBar = ({user}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Header
                className="AppBar"
                as="header"
                direction="row"
                justify="between"
                width="100%"
                pad={{ vertical: 'small' }}>
                <Grid
                    rows={['auto', 'flex']}
                    columns={['medium', 'flex']}
                    fill="horizontal"
                    gap="medium"
                    areas={[
                        { name: 'search', start: [0, 1], end: [0, 1] },
                        { name: 'info', start: [1, 1], end: [1, 1] },
                    ]}>
                    <Box gridArea="search">
                        <TextInput icon={<Search />} placeholder="search ..." />
                    </Box>
                    <Box gridArea="info" align="end">
                        <Button
                            primary
                            label="Upload New Files"
                            onClick={onOpen}
                            margin={{ left: '1em', right: '1em' }}
                            background="primary"
                        />
                    </Box>
                </Grid>
            </Header>
            {isOpen && <UploadFilesLayer onClose={onClose} isOpen />}
        </>
    )
}
