import { useState } from 'react'
import getConfig from 'next/config'
import { Box, Heading, Button } from 'grommet'
import UploadResultContainer from '@/components/UploadResults/UploadResultContainer'
import AppLayout from '@/components/Layouts/AppLayout'
import ErrorMessage from '@/components/ErrorMessage'
import { useAxios } from '@/hooks/use-axios'

export default function File({ status, statusText, data }) {
    const axios = useAxios()
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
                                View {data.result_details?.name} details
                            </Heading>
                        </Box>
                    </Box>
                    {[data].map((item, index) => (
                        <UploadResultContainer
                            data={item}
                            index={index}
                            key={index}
                        />
                    ))}
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
