import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import axios from '@/lib/axios'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const defaultRender = property => datum => <Text>{datum[property]}</Text>

const fileRender = property => datum => <Text>{datum[property].length}</Text>

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar round="xsmall" src={src} /> */}
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
        sortable: true,
        primary: true,
        render: defaultRender('id'),
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
        render: fileRender('files'),
    },
    {
        property: 'percent',
        size: 'medium',
        header: <Text>Processing %</Text>,
        render: processingDataRender,
    },
]


function Uploads({ data }) {
    console.log(data)
    const router = useRouter()
    const { filterQuery } = useUIContext()
    const [show, setShow] = useState(false)
    const [clicked, setClicked] = useState({})

    const [uploads, setUploads] = useState(data)

    const [selected, setSelected] = useState()

    const onClickRow = ({ datum }) => {
        router.push(`/uploads/${datum.id}`)
    }

    const filtered = uploads.filter(datum =>
        datum.client.toLocaleLowerCase().includes(filterQuery),
    )

    return (
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
    )
}

export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || ''
    const res = await axios.get('/uploads', {
        headers: {
            cookie: cookies,
        },
    })
    const data = res.data

    return {
        props: { data },
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
