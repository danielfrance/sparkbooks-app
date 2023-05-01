import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar, Notification } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import ErrorMessage from '@/components/ErrorMessage'
import { useAxios } from '@/hooks/use-axios'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const defaultRender = property => datum => <Text>{datum[property]}</Text>

const numberRender = property => datum => (
    <Box
        pad={{ vertical: 'xsmall', horizontal: 'medium' }}
        alignSelf="end"
        direction="row">
        <Text>{datum[property]}</Text>
    </Box>
)

const fileRender = property => datum => (
    <Text>{datum[property] || 'unknown'}</Text>
)

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} direction="row">
        {/* <Avatar round="xsmall" src={src} /> */}
        <Text>{datum.name}</Text>
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
    //     sortable: true,
    //     primary: true,
    //     render: numberRender('id'),
    // },
    {
        property: 'name',
        size: 'medium',
        header: <Text>Client</Text>,
        render: clientRender,
    },
    {
        property: 'files',
        size: 'medium',
        align: 'end',
        header: <Text>Files</Text>,
        render: numberRender('files_count'),
    },
    {
        property: 'processed',
        size: 'medium',
        align: 'end',
        header: <Text>Processing</Text>,
        render: processingDataRender('processed'),
    },
]

function Uploads({ data, status, statusText }) {
    // console.log({ data, status, statusText })
    const router = useRouter()
    const { filterQuery } = useUIContext()
    const [show, setShow] = useState(false)
    const [clicked, setClicked] = useState({})

    // const [clients, setClients] = useState(data.clients || [])

    const [uploads, setUploads] = useState(data)

    const [selected, setSelected] = useState()

    const [isUnvailable, setIsUnvailable] = useState(false)

    const onClickRow = ({ datum }) => {
        if (datum.processed) router.push(`/uploads/${datum.id}`)
        else setIsUnvailable(true)
    }

    const filtered = uploads.filter(
        datum =>
            datum.deleted_at === null &&
            datum.name?.toLocaleLowerCase().includes(filterQuery),
    )

    return (
        <>
            {isUnvailable && (
                <Notification
                    toast
                    status="warning"
                    title="Not ready"
                    message="Still processing"
                    onClose={() => setIsUnvailable(false)}
                />
            )}
            {status !== 200 && (
                <ErrorMessage status={status} statusText={statusText} />
            )}
            {status === 200 && (
                <AppLayout>
                    <AppBar />
                    <DataTable
                        title="Uploads"
                        columns={columns}
                        data={filtered}
                        setSelected={setSelected}
                        onClickRow={onClickRow}
                    />
                </AppLayout>
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const axios = useAxios()
    const cookie = context.req.headers.cookie

    if (!cookie)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    try {
        const res = await axios.get('/uploads', {
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

export default Uploads

// <Box className="box_container" fill>
//               <Box direction="row" justify="between">
//                   <Heading margin="none" level="3" color="brand">
//                       Uploads
//                   </Heading>
//               </Box>
//               <DataTable
//                   margin={{ top: '3em' }}
//                   sortable
//                   align="center"
//                   paginate={{ step: 10 }}
//                   alignSelf="stretch"
//                   color={{
//                       hover: 'brand',
//                   }}
//                   columns={[
//                       {
//                           property: 'id',
//                           header: <Text>ID</Text>,
//                       },
//                       {
//                           property: 'client',
//                           header: <Text>Client</Text>,
//                       },
//                       {
//                           property: 'files',
//                           header: <Text>Files</Text>,
//                           render: datum => (
//                               <Text>{Object.keys(datum.files).length}</Text>
//                           ),
//                       },
//                       {
//                           property: 'percent',
//                           size: 'medium',
//                           header: 'Processing %',
//                           render: datum => (
//                               <Box
//                                   pad={{ vertical: 'xsmall' }}
//                                   direction="row"
//                                   fill>
//                                   <Meter
//                                       values={[
//                                           {
//                                               value: datum.percent,
//                                               color: 'brand',
//                                               background: 'primary',
//                                           },
//                                       ]}
//                                       thickness="small"
//
//                                   />
//                                   <Text  margin={{ left: '20px' }}>
//                                       {datum.percent}%
//                                   </Text>
//                               </Box>
//                           ),
//                       },
//                   ]}
//                   data={allUploads}
//                   onClickRow={e => {
//                       router.push(`uploads/${e.datum.id}`)
//                   }}
//               />
//           </Box>
