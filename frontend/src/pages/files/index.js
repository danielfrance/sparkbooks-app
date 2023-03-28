import { Box, CheckBox, Heading, Text, Avatar, Tip } from 'grommet'
import { View } from 'grommet-icons'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import DataTable from '@/components/Layouts/DataTable'
import axios from '@/lib/axios'

import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

// const { publicRuntimeConfig } = getConfig()
// const { apiURL } = publicRuntimeConfig

function Files(data) {
  console.log('here', data)
    const onClick = datum => {
        // TODO: Either we include all data in work space or we get data from dedicated API Route
        alert(
            'Either we include all data (client names, supplier names,...) in work space or we get data from dedicated API Route',
        )
        // router.push(`/files/${datum.id}`)
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
        { property: 'x', header: <Text>Details</Text>, render: viewFileRender },
    ]

    const router = useRouter()
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

    const extractFiles = clients => {
        clients.forEach(client => {
            const { uploads } = client

            uploads.forEach(upload => {
                upload.files.forEach(file => {
                    setFiles(currentFiles =>
                        [
                            ...currentFiles,
                            {
                                id: file.id,
                                fileName: file.name,
                                clientName: `Client with id ${upload.client_id}`,
                                supplierName: `Supplier of id ${upload.client_id}`,
                                lineItems: 0,
                                totalAmount: 0,
                                uploadName: upload.results_directory,
                                date: file.update_at || file.created_at,
                            },
                        ].sort((a, b) => new Date(b.date) - new Date(a.date)),
                    )
                })
            })
        })
    }

    useEffect(() => {
        extractFiles(workSpace.clients)
    }, [workSpace])

    return (
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
    )
}

export default Files


export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || ''
    const res = await axios.get('/files', {
        headers: {
            cookie: cookies,
        },
    })
    const data = res.data
    return {
        props: { data },
    }
}

