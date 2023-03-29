import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import { useEffect, useState } from 'react'
import { useUIContext } from '@/contexts/ui'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import ErrorMessage from '@/components/ErrorMessage'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar size="small" round="xsmall" src={src} /> */}
        <Text>{datum.client}</Text>
    </Box>
)

const numberRender = property => datum => (
    <Box
        pad={{ vertical: 'xsmall', horizontal: 'medium' }}
        alignSelf="end"
        direction="row">
        <Text>{datum[property]}</Text>
    </Box>
)

const processingDataRender = property => datum => (
    <Box
        pad={{ vertical: 'xsmall', horizontal: 'medium' }}
        direction="row"
        alignSelf="end">
        {!datum[property] ? (
            <Meter
                background={{ color: '#466EC7', opacity: 'medium' }}
                values={[
                    {
                        value: 70,
                        color: '#C767F5',
                    },
                ]}
                thickness="xsmall"
                round
            />
        ) : (
            <Meter
                background={{ color: '#466EC7', opacity: 'medium' }}
                values={[
                    {
                        value: 100,
                        color: 'green',
                    },
                ]}
                thickness="xsmall"
                round
            />
        )}
    </Box>
)

const columns = [
    // {
    //     property: 'id',
    //     align: 'end',
    //     header: <Text>Uploads</Text>,
    //     size: 'small',
    //     render: numberRender('id'),
    //     // sortable: true,
    //     // primary: true,
    // },
    {
        property: 'client',
        size: 'medium',
        header: <Text>Client</Text>,
        render: clientRender,
    },
    {
        property: 'files',
        align: 'end',
        size: 'medium',
        header: <Text>Files</Text>,
        render: numberRender('files'),
    },
    {
        property: 'percent',
        align: 'end',
        size: 'medium',
        header: <Text>Processing</Text>,
        render: processingDataRender('percent'),
    },
]

export default function Dashboard({ data }) {
    const { status, statusText, hasWorkSpace } = data
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
        setUploads([])
        clients.forEach(client => {
            setUploads(currentUploads => [
                ...currentUploads,
                ...client.uploads.map(upload => {
                    if (upload.processed) setProcessedFiles(count => count + 1)
                    if (!upload.processed) setRemainingFiles(count => count + 1)
                    return {
                        id: client.id,
                        client: client.name || '',
                        files: upload.files.length,
                        percent: upload.processed,
                    }
                }),
            ])
        })
    }

    useEffect(() => {
        if (hasWorkSpace) {
            setProcessedFiles(0)
            setRemainingFiles(0)
            setWorkSpace(data.workSpace)
            extractUploads(data.workSpace.clients)
        }
    }, [data])

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
            {!hasWorkSpace && (
                <ErrorMessage status={status} statusText={statusText} />
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
        const { status, statusText } = error.response

        return {
            props: { data: { status, statusText, hasWorkSpace: false } },
        }
    }
}
