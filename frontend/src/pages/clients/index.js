import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import { StatusGood, CircleAlert, FormEdit, Trash } from 'grommet-icons'
import NewClientLayer from './NewClientLayer'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Notification } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import axios from 'axios'
import ErrorMessage from '@/components/ErrorMessage'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

export default function Clients({ data, status, statusText }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [clients, setClients] = useState([])
    const [selected, setSelected] = useState()
    const { filterQuery } = useUIContext()
    const [removeError, setRemoveError] = useState('')

    const onClose = () => setIsOpen(false)

    const onClickRow = datum => {
        router.push(`/clients/${datum.id}`)
    }

    const remove = async clientId => {
        try {
            const res = await axios.delete(`clients/${clientId}`)
            setClients(current =>
                current.filter(client => client.id !== clientId),
            )
        } catch (error) {
            console.log({ error })
            setRemoveError("Couldn't remove the client, try again")
        }
    }

    const clientRender = datum => {
        return (
            <Box
                pad={{ vertical: 'xsmall' }}
                gap="small"
                direction="row"
                onClick={() => onClickRow(datum)}>
                {/* <Avatar round="xsmall" src={src} /> */}
                <Text>{datum.name}</Text>
            </Box>
        )
    }

    const numberRender = property => datum => (
        <Box
            onClick={() => onClickRow(datum)}
            pad={{ vertical: 'xsmall', horizontal: 'medium' }}
            alignSelf="end"
            direction="row">
            <Text>{datum[property]}</Text>
        </Box>
    )

    const removeRender = datum => (
        <Trash
            color="red"
            size="small"
            cursor="pointer"
            onClick={() => remove(datum.id)}
        />
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
            align: 'end',
            header: <Text>Total Uploads</Text>,
            render: numberRender('uploads'),
        },
        {
            property: 'files',
            size: 'small',
            align: 'end',
            header: <Text>Total Files</Text>,
            render: numberRender('files'),
        },
        {
            property: 'x',
            size: 'small',
            align: 'center',
            header: <Text>Remove</Text>,
            render: removeRender,
        },
        // {
        //     property: 'connected',
        //     size: 'small',
        //     align: 'center',
        //     header: <Text>Status</Text>,
        //     render: statusRender,
        // },
    ]

    const actions = [{ label: 'Add client', onClick: () => setIsOpen(true) }]

    const filtered = clients.filter(datum =>
        datum.name.toLocaleLowerCase().includes(filterQuery),
    )

    const extractClients = clients => {
        setClients([])
        clients.forEach(client => {
            const { id, name, uploads_count, files_count } = client

            setClients(currentClients => [
                ...currentClients,
                {
                    id,
                    name: name || '',
                    uploads: uploads_count || 0,
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
                        // onClickRow={onClickRow}
                        actions={actions}
                    />

                    {isOpen && <NewClientLayer onClose={onClose} isOpen />}
                </AppLayout>
            )}
            {removeError.length > 0 && (
                <Notification
                    toast
                    status="critical"
                    title="Something went wrong"
                    message={removeError}
                    onClose={() => setRemoveError('')}
                />
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
        const res = await axios.get(`http://backend/clients`, {
            headers: {
                cookie: cookie,
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
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
