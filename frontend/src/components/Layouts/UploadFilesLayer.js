import { useContext, useEffect, useState } from 'react'

import { Close, StatusGood } from 'grommet-icons'
import {
    Box,
    Button,
    FileInput,
    Form,
    FormField,
    Heading,
    Layer,
    Select,
    TextInput,
    Spinner,
} from 'grommet'
import { useUIContext } from '@/contexts/ui'

import axios from '@/lib/axios'

const UploadFilesLayer = ({ client, isOpen, onClose }) => {
    const [selectedClient, setSelectedClient] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [show, setShow] = useState(false)
    // const fileInputStyles = {}

    const { workSpace, cookie } = useUIContext()

    const clients = workSpace.clients.length
        ? workSpace.clients
        : ['client 1', 'client 2', 'client 3']

    const submit = async event => {
        event.preventDefault()

        if (selectedClient && selectedFiles.length) {
            setShow(true)
            if (!cookie)
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                }

            const formData = new FormData()

            formData.append('client_id', selectedClient.id)
            selectedFiles.forEach(file => {
                formData.append('files[]', file)
            })

            try {
                const res = await axios.post('/upload/new', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
            setShow(false)
            onClose()
        }
    }

    return (
        <>
            <Layer
                className="modalLayer ff-sans-serif fs-400"
                position="right"
                full="vertical"
                modal
                onClickOutside={onClose}
                onEsc={onClose}>
                <Box
                    fill="vertical"
                    overflow="auto"
                    width="medium"
                    pad="medium">
                    <Form
                        validate="blur"
                        onReset={event => console.log(event)}
                        onSubmit={({ value }) => console.log('Submit', value)}>
                        <Box flex={false} direction="row" justify="between">
                            <Heading level={2} margin="none">
                                Upload New Files
                            </Heading>
                            <Button icon={<Close />} onClick={onClose} />
                        </Box>
                        <FormField
                            name="name"
                            label="Client Name"
                            // required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <Select
                                required
                                value={selectedClient}
                                options={clients}
                                onChange={({ option }) =>
                                    setSelectedClient(option)
                                }
                                onSearch={text => console.log(text)}
                            />
                        </FormField>
                        <FormField
                            htmlFor="uploadFilesContainer"
                            name="files"
                            label="Upload Files"
                            // required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <FileInput
                                id="uploadFilesContainer"
                                multiple
                                pad="large"
                                name="files"
                                onChange={(event, { files }) =>
                                    setSelectedFiles(files)
                                }
                            />
                        </FormField>
                        <Box
                            fill="horizontal"
                            align="center"
                            gap="medium"
                            margin="medium">
                            {show && (
                                <Spinner
                                    border={[
                                        {
                                            side: 'all',
                                            color: 'brand',
                                            size: 'medium',
                                            style: 'dotted',
                                        },
                                    ]}
                                />
                            )}

                            <button className="btn primary" onClick={submit}>
                                Submit
                            </button>
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default UploadFilesLayer
