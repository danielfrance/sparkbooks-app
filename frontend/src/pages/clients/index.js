import { useState } from 'react'
import { useRouter } from 'next/router'
import { StatusGood, CircleAlert, FormEdit } from 'grommet-icons'
import NewClientLayer from './NewClientLayer'
import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        <Avatar size="small" round="xsmall" src={src} />
        <Text size="small">{datum.name}</Text>
    </Box>
)

const clientData = [
    {
        id: 1,
        name: 'Random Client Name like this one',
        uploads: <Text size="small">10</Text>,
        files: <Text size="small">100</Text>,
        connected: <StatusGood size="small" color="status-ok" />,
    },
    {
        id: 2,
        name: 'Client 2',
        uploads: <Text size="small">10</Text>,
        files: <Text size="small">100</Text>,
        connected: <CircleAlert size="small" color="status-error" />,
    },
    {
        id: 3,
        name: 'Client 3',
        uploads: <Text size="small">10</Text>,
        files: <Text size="small">100</Text>,
        connected: <StatusGood size="small" color="status-ok" />,
    },
    {
        id: 4,
        name: 'Client 4',
        uploads: <Text size="small">10</Text>,
        files: <Text size="small">100</Text>,
        connected: <CircleAlert size="small" color="status-error" />,
    },
    {
        id: 5,
        name: 'Client 5',
        uploads: <Text size="small">10</Text>,
        files: <Text size="small">100</Text>,
        connected: <StatusGood size="small" color="status-ok" />,
    },
]

const columns = [
    {
        property: 'name',
        size: 'medium',
        header: <Text>Client Name</Text>,
        render: clientRender,
    },
    {
        property: 'uploads',
        size: 'small',
        header: <Text>Total Uploads</Text>,
    },
    {
        property: 'files',
        size: 'small',
        header: <Text>Total Files</Text>,
    },
    {
        property: 'connected',
        size: 'small',
        align: 'center',
        header: <Text>Accounting Software</Text>,
    },
]

const onClickRow = ({ datum }) => {
    router.push(`/clients/edit/${datum.id}`)
}

const clientEdit = id => {}

export default function Clients() {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const [selected, setSelected] = useState()
    const actions = [
        { label: 'Add client', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]
    return (
        <AppLayout>
            <DataTable
                title="Clients"
                columns={columns}
                data={clientData}
                setSelected={setSelected}
                onClickRow={onClickRow}
                actions={actions}
            />
        </AppLayout>
    )
}
