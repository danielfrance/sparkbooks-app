import { Box, CheckBox, Heading, Text, Avatar } from 'grommet'

import { useRouter } from 'next/router'
import { useState } from 'react'
import getConfig from 'next/config'
import AppLayout from '@/components/Layouts/AppLayout'
import DataTable from '@/components/Layouts/DataTable'
// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        <Avatar size="small" round="xsmall" src={src} />
        <Text size="small">{datum.clientName}</Text>
    </Box>
)

const fileNameRender = datum => (
    <CheckBox
        key={datum.id}
        //  checked={checked.includes(item)}
        label={<Text size="small">{datum.fileName}</Text>}
        onChange={e => console.log(e, datum)}
    />
)

const defaultRender = property => datum => (
    <Text size="small">{datum[property]}</Text>
)

const dateRender = datum => (
    <Text size="small">{new Date(datum.date).toLocaleDateString('en-us')}</Text>
)

const columns = [
    {
        property: 'fileName',
        header: <Text size="small">File Name</Text>,
        render: fileNameRender,
    },
    {
        property: 'clientName',
        header: <Text size="small">Client</Text>,
        render: clientRender,
    },
    {
        property: 'supplierName',
        header: <Text size="small">Supplier Name</Text>,
        render: defaultRender('supplierName'),
    },
    {
        property: 'lineItems',
        header: <Text size="small">Line Items</Text>,
        render: defaultRender('lineItems'),
    },
    {
        property: 'totalAmount',
        header: <Text size="small">Total</Text>,

        render: defaultRender('totalAmount'),
    },
    {
        property: 'uploadName',
        header: <Text size="small">Upload</Text>,
        render: defaultRender('uploadName'),
    },
    {
        property: 'date',
        header: <Text size="small">Date</Text>,
        render: dateRender,
    },
]

const data = [
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

function Files() {
    const [selected, setSelected] = useState()
    const onClickRow = datum => console.log(datum)
    const actions = [
        { label: 'Download selected', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    const { filterQuery } = useUIContext()

    const filtered = data.filter(
        datum =>
            datum.clientName.toLocaleLowerCase().includes(filterQuery) ||
            datum.fileName.toLocaleLowerCase().includes(filterQuery),
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

// export async function getServerSideProps() {
//     const res = await fetch(`${process.env.JSON_SERVER_URL}/files`)
//     const files = await res.json()

//     return {
//         props: { files },
//     }
// }
