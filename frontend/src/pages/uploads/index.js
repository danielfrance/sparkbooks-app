import { useState } from 'react'
import { useUIContext } from '@/contexts/ui'
import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const defaultRender = property => datum => <Text>{datum[property]}</Text>

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
        render: defaultRender('files'),
    },
    {
        property: 'percent',
        size: 'medium',
        header: <Text>Processing %</Text>,
        render: processingDataRender,
    },
]

// const { publicRuntimeConfig } = getConfig();
// const { apiURL } = publicRuntimeConfig;

function Uploads({ data }) {
    //   const [show, setShow] = useState(false);
    //   const [clicked, setClicked] = useState({});
    //   const router = useRouter();

    const [selected, setSelected] = useState()
    const onClickRow = datum => console.log(datum)

    const { filterQuery } = useUIContext()

    const filtered = data.filter(datum =>
        datum.client.toLocaleLowerCase().includes(filterQuery),
    )

    return (
        <AppLayout>
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

export async function getServerSideProps() {
    //   const res = await fetch(`${process.env.JSON_SERVER_URL}/uploads`)
    //   const data = await res.json();

    const data = [
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
        {
            id: '1',
            client: 'Alan',
            files: 23,
            percent: 20,
        },
        {
            id: '2',
            client: 'Bryan',
            files: 3,
            percent: 30,
        },
        {
            id: '3',
            client: 'Chris',
            files: 11,
            percent: 40,
        },
        {
            id: '4',
            client: 'Eric',
            files: 13,
            percent: 100,
        },
    ]

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
