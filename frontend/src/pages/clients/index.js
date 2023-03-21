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

const statusRender = datum => {
    return datum.connected == 'status-ok' ? (
        <StatusGood color="status-ok" />
    ) : (
        <CircleAlert color="status-error" />
    )
}

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
        header: <Text>Status</Text>,
        render: statusRender,
    },
]

export default function Clients({ data }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [clients, setClients] = useState(data)
    const [selected, setSelected] = useState()
    const { filterQuery } = useUIContext()

    const onClose = () => setIsOpen(false)

    const onClickRow = ({ datum }) => {
        router.push(`/clients/${datum.id}`)
    }

    const actions = [{ label: 'Add client', onClick: () => setIsOpen(true) }]

    const filtered = clients.filter(datum =>
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

export async function getServerSideProps() {
    const res = await fetch(`${process.env.JSON_SERVER_URL}/clients`)
    const data = await res.json()

    return {
        props: { data },
    }
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
