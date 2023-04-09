import { useEffect, useState } from 'react'

import { Close } from 'grommet-icons'
import {
    Box,
    Button,
    FileInput,
    Form,
    FormField,
    Heading,
    Layer,
    Select,
    Spinner,
    Notification,
} from 'grommet'

import axios from '@/lib/axios'
import { useRouter } from 'next/router'

const UploadFilesLayer = ({ onClose }) => {
    const router = useRouter()
    const [selectedClient, setSelectedClient] = useState()
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState()
    const [clients, setClients] = useState([])

    const selectOptions = clients.map(client => {
        const { id, name } = client

        return { id, name }
    })

    const submit = async event => {
        event.preventDefault()

        if (selectedClient.id && selectedFiles?.length) {
            setShow(true)

            const formData = new FormData()

            formData.append('client_id', selectedClient.id)
            selectedFiles.forEach(file => {
                formData.append('files[]', file)
            })

            try {
                await axios.post('/upload/new', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                router.replace(router.asPath)
                setShow(false)
                onClose()
            } catch (error) {
                // console.log(error)
                setShow(false)
                setError("We couldn't save files, try again")
                setVisible(true)
            }
        } else {
            setError('Please select both the client and files')
            setVisible(true)
        }
    }

    const getClients = async () => {
        try {
            const res = await axios.get('/clients')
            setClients(res.data)
        } catch (error) {
            setError("We couldn't load your clients")
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    return (
        <>
            {visible && (
                <Notification
                    toast
                    status="critical"
                    title="Something went wrong"
                    message={error}
                    onClose={() => setVisible(false)}
                />
            )}
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
                        // onReset={event => console.log(event)}
                        // onSubmit={({ value }) => console.log('Submit', value)}
                    >
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
                                valueKey={{ key: 'id' }}
                                labelKey="name"
                                options={selectOptions}
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
                        <Box fill="horizontal" align="center" gap="medium">
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

                            <button
                                className="btn primary"
                                style={{ width: '100%' }}
                                onClick={submit}>
                                Upload
                            </button>
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default UploadFilesLayer
