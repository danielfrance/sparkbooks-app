import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import { StatusGood, CircleAlert, FormEdit } from 'grommet-icons'
import NewClientLayer from './NewClientLayer'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar round="xsmall" src={src} /> */}
        <Text>{datum.name}</Text>
    </Box>
)

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

const clientData = [
    {
        id: 1,
        name: 'Random Client Name like this one',
        uploads: 10,
        files: 100,
        connected: <StatusGood color="status-ok" />,
    },
    {
        id: 2,
        name: 'Client 2',
        uploads: 10,
        files: 100,
        connected: <CircleAlert color="status-error" />,
    },
    {
        id: 3,
        name: 'Client 3',
        uploads: 10,
        files: 100,
        connected: <StatusGood color="status-ok" />,
    },
    {
        id: 4,
        name: 'Client 4',
        uploads: 10,
        files: 100,
        connected: <CircleAlert color="status-error" />,
    },
    {
        id: 5,
        name: 'Client 5',
        uploads: 10,
        files: 100,
        connected: <StatusGood color="status-ok" />,
    },
]

const clientEdit = id => {}

export default function Clients() {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(true)
    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onClickRow = ({ datum }) => {
        router.push(`/clients/edit/${datum.id}`)
    }

    const [selected, setSelected] = useState()
    const actions = [
        { label: 'Add client', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    const { filterQuery } = useUIContext()

    const filtered = clientData.filter(datum =>
        datum.name.toLocaleLowerCase().includes(filterQuery),
    )

    return (
        <AppLayout>
            <AppBar />
            <DataTable
                title="Clients"
                columns={columns}
                data={filtered}
                setSelected={setSelected}
                onClickRow={onClickRow}
                actions={actions}
            />

            {isOpen && <NewClientLayer onClose={onClose} isOpen />}
        </AppLayout>
    )
}

// <Box className="box_container" fill>
//               <Box direction="row" justify="between">
//                   <Heading margin="none" level="3" color="brand">
//                       Clients
//                   </Heading>
//                   <Button secondary label="New Client" onClick={onOpen} />
//               </Box>
//               <DataTable
//                   margin={{ top: '3em' }}
//                   sortable
//                   paginate={{ step: 10 }}
//                   alignSelf="stretch"
//                   background={{
//                       body: ['white', 'light-2'],
//                       footer: { dark: 'light-2', light: 'dark-3' },
//                   }}
//                   columns={[
//                       {
//                           property: 'name',
//                           header: <Text>Client Name</Text>,
//                       },
//                       {
//                           property: 'uploads',
//                           header: <Text>Total Uploads</Text>,
//                       },
//                       {
//                           property: 'files',
//                           header: <Text>Total Files</Text>,
//                       },
//                       {
//                           property: 'connected',
//                           align: 'center',
//                           header: <Text>Accounting Software</Text>,
//                       },
//                   ]}
//                   data={clientData}
//                   onClickRow={({ datum }) => {
//                       router.push(`/clients/edit/${datum.id}`)
//                   }}
//               />
//           </Box>
