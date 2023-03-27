import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import { useEffect, useState } from 'react'
import { useUIContext } from '@/contexts/ui'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const ErrorMessage = ({ status }) => {
    const { logout } = useAuth()

    return (
        <div
            className="card"
            style={{
                font: 'ff-sans-serif',
                margin: '10% auto',
                padding: '2rem',
                width: '50%',
            }}>
            {status == 500 && (
                <>
                    <span className="title">Account</span>
                    <p>Please contact your manageer to activate your account</p>

                    <button
                        className="btn secondary"
                        style={{ marginTop: '2rem' }}
                        onClick={logout}>
                        Logout
                    </button>
                </>
            )}
            {status != 500 && (
                <>
                    <span className="title">Login problem</span>
                    <p>Something went wrong, try again later</p>

                    <button
                        className="btn secondary"
                        style={{ marginTop: '2rem' }}
                        onClick={logout}>
                        Try in again
                    </button>
                </>
            )}
        </div>
    )
}

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar size="small" round="xsmall" src={src} /> */}
        <Text>{datum.client}</Text>
    </Box>
)

const processingDataRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} direction="row">
        <Meter
            values={[
                {
                    value: datum.percent,
                    color: '#4112fb',
                    background: '#ECECEC',
                },
            ]}
            thickness="xsmall"
            round
        />
        <Text className="text-dark" margin={{ left: '20px' }}>
            {datum.percent}%
        </Text>
    </Box>
)

const columns = [
    {
        property: 'id',
        header: <Text>Uploads</Text>,
        size: 'small',
        // sortable: true,
        // primary: true,
    },
    {
        property: 'client',
        size: 'medium',
        header: <Text>Client</Text>,
        render: clientRender,
    },
    {
        property: 'files',
        size: 'medium',
        header: <Text>Files</Text>,
    },
    {
        property: 'percent',
        size: 'medium',
        header: <Text>Processing %</Text>,
        render: processingDataRender,
    },
]

// const fixedData = [
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
//     {
//         id: '1',
//         client: 'Alan',
//         files: 23,
//         percent: 20,
//     },
//     {
//         id: '2',
//         client: 'Bryan',
//         files: 3,
//         percent: 30,
//     },
//     {
//         id: '3',
//         client: 'Chris',
//         files: 11,
//         percent: 40,
//     },
//     {
//         id: '4',
//         client: 'Eric',
//         files: 13,
//         percent: 100,
//     },
// ]

export default function Dashboard({ data }) {
    const { status, hasWorkSpace } = data
    const router = useRouter()
    const { filterQuery, workSpace, setWorkSpace } = useUIContext()
    const [uploads, setUploads] = useState([])

    const [selected, setSelected] = useState()
    const [processedFiles, setProcessedFiles] = useState(0)
    const [remainingFiles, setRemainingFiles] = useState(0)

    const onClickRow = ({ datum }) => {
        router.push(`/uploads/${datum.id}`)
        router.push(`/uploads/1`)
    }

    const filtered = uploads.filter(datum =>
        datum.client.toLocaleLowerCase().includes(filterQuery),
    )
    // .slice(-5)

    const actions = [
        // { label: 'Add', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    const extractUploads = clients => {
        clients.forEach(client => {
            setUploads(currentUploads => [
                ...currentUploads,
                ...client.uploads.map(upload => {
                    if (upload.percent === 100)
                        setProcessedFiles(count => count + 1)
                    if (upload.percent !== 100)
                        setRemainingFiles(count => count + 1)
                    return {
                        id: client.id,
                        client: client.name,
                        files: upload.files.length,
                        percent: Number.parseFloat(upload.processed) || 0.1,
                    }
                }),
            ])
        })
    }

    useEffect(() => {
        if (hasWorkSpace) {
            setWorkSpace(data.workSpace)
            extractUploads(data.workSpace.clients)
        }
    }, [workSpace])

    return (
        <>
            {hasWorkSpace && (
                <AppLayout>
                    <AppBar />
                    <div className="flex dashboard-header">
                        <div className="flex status bg-dark text-white">
                            <img src="/processed.png" />
                            <div>
                                <span className="fs-700">{processedFiles}</span>
                                <span className="fs-300">Files processed</span>
                            </div>
                        </div>
                        <div className="flex status bg-dark text-white">
                            <img src="/pending.png" />
                            <div>
                                <span className="fs-700">{remainingFiles}</span>
                                <span className="fs-300">Files remaining</span>
                                <span
                                    className="fs-300"
                                    style={{
                                        marginTop: '-0.213rem',
                                        textDecoration: 'underline',
                                    }}>
                                    Upgrade
                                </span>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        title="Recent Uploads"
                        columns={columns}
                        data={filtered}
                        setSelected={setSelected}
                        onClickRow={onClickRow}
                        actions={actions}
                    />
                </AppLayout>
            )}
            {!hasWorkSpace && <ErrorMessage status={status} />}
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
        const res = await axios.get('/dashboardData', {
            headers: {
                cookie: cookie,
            },
        })
        const workSpace = res.data

        return {
            props: { data: { status: 200, workSpace, hasWorkSpace: true } },
        }
    } catch (error) {
        const { status } = error.response

        return {
            props: { data: { status, hasWorkSpace: false } },
        }
    }
}
