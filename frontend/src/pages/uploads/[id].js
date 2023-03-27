import { useState, useEffect } from "react";
import {
  Box,
  Button,
  DataTable,
  Grid,
  Heading,
  TableHeader,
  TableRow,
  TableCell,
  Text,
  TextInput,
  Table,
  TableBody,
  FormField,
} from "grommet";
import UploadResultContainer from "@/components/UploadResults/UploadResultContainer";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from '@/lib/axios'

function UploadDetails({ data }) {
    console.log(data)
    const [uploadData, setuploadData] = useState(data)
    const [fileData, setFileData] = useState(Object.values(uploadData.files))
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
                        View Upload Details
                    </Heading>
                    <Button
                        secondary
                        size="medium"
                        label="Export Results"
                        onClick={() => alert('clicked')}
                    />
                </Box>
            </Box>
            {fileData.map((item, index) => (
                <UploadResultContainer data={item} index />
            ))}
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || ''

    const data = await axios.get(`/uploads/${context.params.id}`, {
        headers: {
            cookie: cookies,
        },
    })

    const uploadData = data.data

    return {
        props: { data: uploadData },
    }
}

export default UploadDetails;
