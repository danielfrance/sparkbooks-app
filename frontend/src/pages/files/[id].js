import { useState } from 'react'
import getConfig from 'next/config'
import { Box, Heading, Button } from 'grommet'
import UploadResultContainer from '@/components/UploadResults/UploadResultContainer'
import AppLayout from '@/components/Layouts/AppLayout'
import ErrorMessage from '@/components/ErrorMessage'
import axios from '@/lib/axios'

export default function File({ status, statusText, data }) {
    console.log({ status, statusText, data })

    const [fileData, setFileData] = useState([])

    const extractFileData = clients => {
        return
    }

    // useEffect(() => {
    //     extractFileData(workSpace.clients)
    // }, [workSpace])

    return (
        <>
            {status !== 200 && (
                <ErrorMessage status={status} statusText={statusText} />
            )}
            {status === 200 && (
                <AppLayout>
                    <Box
                        className="box_container"
                        alignSelf="stretch"
                        // height="xsmall"
                        pad="medium"
                        height={{ min: '96px', max: '110px' }}>
                        <Box direction="row" justify="between">
                            <Heading margin="none" level="3" color="brand">
                                {/* View {fileData.fileName} details */}
                            </Heading>
                        </Box>
                    </Box>
                    {/* <UploadResultContainer data={fileData} index /> */}
                </AppLayout>
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
        const res = await axios.get(`/files/${context.params.id}`, {
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
