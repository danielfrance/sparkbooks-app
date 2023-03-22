import { Box, CheckBox, Heading, Text, Avatar, Tip } from 'grommet'

import { useRouter } from 'next/router'
import { useState } from 'react'
import getConfig from 'next/config'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import DataTable from '@/components/Layouts/DataTable'
// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar  round="xsmall" src={src} /> */}
        <Text>{datum.clientName}</Text>
    </Box>
)

const fileNameRender = datum => (
    <CheckBox
        key={datum.id}
        //  checked={checked.includes(item)}
        label={<Text>{datum.fileName}</Text>}
        onChange={e => console.log(e, datum)}
    />
)

const defaultRender = property => datum => <Text>{datum[property]}</Text>

const lineItemsRender = property => datum => (
    <Text>{datum[property].lenght}</Text>
)

const dateRender = datum => (
    <Text>{new Date(datum.date).toLocaleDateString('en-us')}</Text>
)

const columns = [
    {
        property: 'fileName',
        header: <Text>File Name</Text>,
        render: fileNameRender,
    },
    {
        property: 'clientName',
        header: <Text>Client</Text>,
        render: clientRender,
    },
    {
        property: 'supplierName',
        header: <Text>Supplier Name</Text>,
        render: defaultRender('supplierName'),
    },
    {
        property: 'lineItems',
        header: <Text>Line Items</Text>,
        render: lineItemsRender('lineItems'),
    },
    {
        property: 'totalAmount',
        header: <Text>Total</Text>,

        render: defaultRender('totalAmount'),
    },
    {
        property: 'uploadName',
        header: <Text>Upload</Text>,
        render: defaultRender('uploadName'),
    },
    {
        property: 'date',
        header: <Text>Date</Text>,
        render: dateRender,
    },
]

// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

function Files({ data }) {
    const router = useRouter()
    const [files, setFiles] = useState(data)
    const [selected, setSelected] = useState()

    const actions = [
        { label: 'Download selected', onClick: e => console.log(e) },
    ]

    const { filterQuery } = useUIContext()

    const filtered = files.filter(
        datum =>
            datum.clientName.toLocaleLowerCase().includes(filterQuery) ||
            datum.fileName.toLocaleLowerCase().includes(filterQuery) ||
            datum.supplierName.toLocaleLowerCase().includes(filterQuery),
    )

    const onClickRow = row => {
        router.push(`/files/${row.datum.id}`)
    }

    return (
        <AppLayout>
            <AppBar />
            <DataTable
                title="Files"
                columns={columns}
                data={filtered}
                setSelected={setSelected}
                onClickRow={onClickRow}
                actions={actions}
            />
        </AppLayout>
    )
}

export default Files

export async function getServerSideProps() {
    const res = await fetch(`${process.env.JSON_SERVER_URL}/files`)
    const data = await res.json()

    return {
        props: { data },
    }
}

//  <Box className="box_container" fill>
//                 <Box direction="row" justify="between">
//                     <Heading margin="none" level="3" color="brand">
//                         Files
//                     </Heading>
//                 </Box>
//                 <DataTable
//                     margin={{ top: '3em' }}
//                     sortable
//                     align="center"
//                     paginate={{ step: 10 }}
//                     alignSelf="stretch"
//                     color={{
//                         hover: 'brand',
//                     }}
//                     columns={[
//                         {
//                             property: 'fileName',
//                             header: <Text>File Name</Text>,
//                         },
//                         {
//                             property: 'clientName',
//                             header: <Text>Client</Text>,
//                         },
//                         {
//                             property: 'supplierName',
//                             header: <Text>Supplier Name</Text>,
//                         },
//                         {
//                             property: 'lineItems',
//                             header: <Text>Line Items</Text>,
//                             render: data => {
//                                 return data.lineItems.length
//                             },
//                         },
//                         {
//                             property: 'totalAmount',
//                             header: <Text>Total</Text>,
//                         },
//                         {
//                             property: 'uploadName',
//                             header: <Text>Upload</Text>,
//                         },
//                         {
//                             property: 'date',
//                             header: <Text>Date</Text>,
//                         },
//                     ]}
//                     data={allFiles}
//                     onClickRow={e => {
//                         router.push(`/files/${e.datum.id}`)
//                     }}
//                 />
//             </Box>
