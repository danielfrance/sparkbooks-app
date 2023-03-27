import { useState } from 'react'
import getConfig from 'next/config'
import { Box, Heading, Button } from 'grommet'
import UploadResultContainer from '@/components/UploadResults/UploadResultContainer'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'

export default function File({ data }) {
    console.log(data)
    const [fileData, setFileData] = useState(data)

    return (
        <AppLayout>
            <Box
                className="box_container"
                alignSelf="stretch"
                // height="xsmall"
                pad="medium"
                height={{ min: '96px', max: '110px' }}>
                <Box direction="row" justify="between">
                    <Heading margin="none" level="3" color="brand">
                        View {fileData.fileName} details
                    </Heading>
                </Box>
            </Box>
            <UploadResultContainer data={fileData} index />
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || ''

    const data = await axios.get(`/files/${context.params.id}`, {
        headers: {
            cookie: cookies,
        },
    })

    return {
        props: { data: data.data },
    }
}
