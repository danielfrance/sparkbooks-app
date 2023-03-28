import { Box, CheckBox, Heading, Text, Avatar, Tip } from 'grommet'
import { View } from 'grommet-icons'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import DataTable from '@/components/Layouts/DataTable'
import ErrorMessage from '@/components/ErrorMessage'
import axios from '@/lib/axios'

import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

function Files({ status, statusText, data }) {
    const router = useRouter()

    const onClick = datum => {
        router.push(`/files/${datum.id}`)
    }

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

    const numberRender = property => datum => (
        <Box
            pad={{ vertical: 'xsmall' }}
            gap="small"
            alignSelf="end"
            direction="row">
            <Text>{datum[property]}</Text>
        </Box>
    )

    const defaultRender = property => datum => <Text>{datum[property]}</Text>

    // const lineItemsRender = property => datum => (
    //     <Text>{datum[property].lenght}</Text>
    // )

    const dateRender = datum => (
        <Text>{new Date(datum.date).toLocaleDateString('en-us')}</Text>
    )

    const viewFileRender = datum => (
        <Box align="center" style={{ cursor: 'pointer' }}>
            <View color="#C767F5" onClick={() => onClick(datum)} />
        </Box>
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
            render: numberRender('lineItems'),
        },
        {
            property: 'totalAmount',
            header: <Text>Total</Text>,
            render: numberRender('totalAmount'),
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
        { property: 'x', header: <Text>Details</Text>, render: viewFileRender },
    ]

    const [files, setFiles] = useState([])
    const [selected, setSelected] = useState()

    const actions = [
        { label: 'Download selected', onClick: e => console.log(e) },
    ]

    const { filterQuery, workSpace } = useUIContext()

    const filtered = files.filter(
        datum =>
            datum.clientName.toLocaleLowerCase().includes(filterQuery) ||
            datum.fileName.toLocaleLowerCase().includes(filterQuery) ||
            datum.supplierName.toLocaleLowerCase().includes(filterQuery),
    )

    const extractFiles = files => {
        files.forEach(file => {
            setFiles(currentFiles =>
                [
                    ...currentFiles,
                    {
                        id: file.id,
                        fileName: file.file_name,
                        clientName: file.client_name,
                        supplierName: file.supplier_name,
                        lineItems: file.line_items_count,
                        totalAmount: file.receipt_total,
                        uploadName: file.upload_name,
                        date: file.created_at,
                        sorting_date: file.update_at,
                    },
                ].sort(
                    (a, b) =>
                        new Date(b.sorting_date) - new Date(a.sorting_date),
                ),
            )
        })
    }

    useEffect(() => {
        if (data.length) extractFiles(data)
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
                        title="Files"
                        columns={columns}
                        data={filtered}
                        setSelected={setSelected}
                        actions={actions}
                    />
                </AppLayout>
            )}
        </>
    )
}

export default Files

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
        const res = await axios.get('/files', {
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
