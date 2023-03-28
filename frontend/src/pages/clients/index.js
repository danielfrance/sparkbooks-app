import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import { StatusGood, CircleAlert, FormEdit } from 'grommet-icons'
import NewClientLayer from './NewClientLayer'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import axios from '@/lib/axios'
import ErrorMessage from '@/components/ErrorMessage'

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

export default function Clients({ data, status, statusText }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [clients, setClients] = useState([])
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

    const extractClients = clients => {
        clients.forEach(client => {
            const { id, name, upload_count, files_count } = client
            // let uploadsCount = 0
            // let filesCount = 0

            // uploads.forEach(upload => {
            //     uploadsCount++
            //     filesCount = filesCount + upload.files.length
            // })

            setClients(currentClients => [
                ...currentClients,
                {
                    id,
                    name,
                    uploads: upload_count || 0,
                    files: files_count || 0,
                    connected: 'status-ok',
                },
            ])
        })
    }

    useEffect(() => {
        extractClients(data)
    }, [data])

    return (
        <>
            {status !== 200 && (
                <ErrorMessage status={status} statusText={statusText} />
            )}
            {status === 200 && (
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
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const cookie = context.req.headers.cookie

    if (!cookie)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    try {
        const res = await axios.get(`/clients`, {
            headers: {
                cookie: cookie,
            },
        })
        const { data } = res

        return {
            props: { status: 200, data },
        }
    } catch (error) {
        const { status, statusText } = error.response

        return {
            props: { status, statusText },
        }
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
