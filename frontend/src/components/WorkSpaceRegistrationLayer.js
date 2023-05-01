import { Box, Button, Form, FormField, TextInput, Text, Layer } from 'grommet'
import { useState } from 'react'
import { useAxios } from '@/hooks/use-axios'

export default function WorkSpaceRegistrationLayer({ onClose }) {
    const [workspaceName, setWorkspaceName] = useState('')
    const axios = useAxios()
    const submitForm = event => {
        event.preventDefault()
        axios
            .post('/workspace', { workspaceName })
            .then(() => {
                onClose()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Layer
            full
            animation="fadeIn"
            background={{ color: 'neutral-2', opacity: 'medium' }}
            style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Box width="large" pad="medium" background={{ color: 'light-1' }}>
                <Box direction="row">
                    <Text size="medium">
                        Enter a name for your workspace to continue
                    </Text>
                </Box>
                <Box direction="row" margin={{ bottom: 'small' }}>
                    <Form onSubmit={submitForm}>
                        <FormField
                            name="workspaceName"
                            label="Workspace Name"
                        />
                        <TextInput
                            id="workspaceName"
                            name="workspaceName"
                            type="text"
                            required
                            value={workspaceName}
                            onChange={event =>
                                setWorkspaceName(event.target.value)
                            }
                        />
                        <Button type="submit" label="Submit" primary />
                    </Form>
                </Box>
            </Box>
        </Layer>
    )
}
