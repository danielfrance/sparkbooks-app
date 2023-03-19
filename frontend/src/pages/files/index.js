import { Box, CheckBox, Heading, Text, Avatar, Tip } from 'grommet'

import { useRouter } from 'next/router'
import { useState } from 'react'
import getConfig from 'next/config'
import AppLayout from '@/components/Layouts/AppLayout'
import DataTable from '@/components/Layouts/DataTable'
// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const TipContent = ({ message }) => (
    <Box direction="row" align="center">
        <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
            <polygon
                fill="#C767F5;
"
                points="6 2 18 12 6 22"
                transform="matrix(-1 0 0 1 30 0)"
            />
        </svg>
        <Box
            background="#C767F5;
"
            direction="row"
            pad="small"
            round="xsmall">
            <Text>{message}</Text>
        </Box>
    </Box>
)

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
        render: defaultRender('lineItems'),
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

function Files({ files }) {
    const [selected, setSelected] = useState()
    const onClickRow = datum => console.log(datum)
    const actions = [
        { label: 'Download selected', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    const { filterQuery } = useUIContext()

    const filtered = files.filter(
        datum =>
            datum.clientName.toLocaleLowerCase().includes(filterQuery) ||
            datum.fileName.toLocaleLowerCase().includes(filterQuery) ||
            datum.supplierName.toLocaleLowerCase().includes(filterQuery),
    )

    return (
        <AppLayout>
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
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files`)
    // console.log(res)
    // const files = await res.json()

    const files = [
        {
            id: 1,
            fileName: 'document 1.doc',
            clientName: 'Dupond Dupont',
            supplierName: 'Joe Hamilton',
            lineItems: 4,
            totalAmount: 100,
            uploadName: 'document',
            date: new Date().toISOString(),
        },
    ]

    return {
        props: { files },
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
