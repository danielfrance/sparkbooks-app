import { useState } from 'react'

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
} from 'grommet'

const UploadFilesLayer = ({ client, isOpen, onClose }) => {
    const [value, setValue] = useState(undefined)
    const fileInputStyles = {}

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
                            required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <Select
                                required
                                value={value}
                                options={['client 1', 'client 2', 'client 3']}
                                onChange={({ option }) => setValue(option)}
                                onSearch={text => console.log(text)}
                            />
                        </FormField>
                        <FormField
                            htmlFor="uploadFilesContainer"
                            name="files"
                            label="Upload Files"
                            required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <FileInput
                                id="uploadFilesContainer"
                                multiple
                                pad="large"
                                name="files"
                                onChange={event => {
                                    const fileList = event.target.files
                                    for (
                                        let i = 0;
                                        i < fileList.length;
                                        i += 1
                                    ) {
                                        const file = fileList[i]
                                    }
                                }}
                            />
                        </FormField>
                        <Box flex={false} as="footer" align="start">
                            <Button
                                type="submit"
                                label="submit"
                                onClick={onClose}
                                primary
                            />
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default UploadFilesLayer
