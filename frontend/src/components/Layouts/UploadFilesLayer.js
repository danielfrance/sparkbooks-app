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
    const [selectedClient, setSelectedClient] = useState()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [show, setShow] = useState(false)
    // const fileInputStyles = {}

    const { workSpace, cookie } = useUIContext()

    const clients = workSpace.clients.length
        ? workSpace.clients
        : ['client 1', 'client 2', 'client 3']

    const submit = async event => {
        event.preventDefault()
        setShow(true)

        if (selectedClient && selectedFiles.length) {
            if (!cookie)
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                }

            const data = {
                files: selectedFiles,
                client_id: selectedClient,
            }

            const res = await axios.post('/upload/new', data, {
                headers: {
                    cookie: cookie,
                },
            })
            console.log(res.data)
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
                        <Box flex={false} as="footer" align="start">
                            <Button
                                type="submit"
                                label="submit"
                                onClick={submit}
                                primary
                            />
                        </Box>
                        {show && (
                            <Spinner message="Start Built-in Spinner Announcement" />
                        )}
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default UploadFilesLayer
