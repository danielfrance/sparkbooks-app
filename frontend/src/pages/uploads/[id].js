import { useState, useEffect } from 'react'
import { Box, Button, Heading } from 'grommet'
import UploadResultContainer from '@/components/UploadResults/UploadResultContainer'
import AppLayout from '@/components/Layouts/AppLayout'
import ErrorMessage from '@/components/ErrorMessage'
import axios from '@/lib/axios'

function UploadDetails({ data, status, statusText }) {
    console.log(data)
    const [fileData, setFileData] = useState([])
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
                        pad={{ vertical: 'medium' }}
                        height={{ min: '96px', max: '110px' }}>
                        <Box direction="row" justify="between">
                            <Heading margin="none" level="3" color="brand">
                                View Upload Details
                            </Heading>

                            <button className="btn primary inverse">
                                Export Results
                            </button>
                        </Box>
                    </Box>
                    {data.map((item, index) => (
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
    const cookie = context.req.headers.cookie

    try {
        const res = await axios.get(`/uploads/${context.params.id}`, {
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
        console.log(status, statusText)
        return {
            props: { status, statusText },
        }
    }
}

export default UploadDetails
