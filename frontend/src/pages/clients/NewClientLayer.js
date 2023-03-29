import { useState } from 'react'

import { useRouter } from 'next/router'

import { Close, StatusGood } from 'grommet-icons'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading,
    Layer,
    Select,
    TextInput,
    Spinner,
    Notification,
} from 'grommet'

import axios from '@/lib/axios'

const NewClientLayer = ({ client, isOpen, onClose }) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const submit = async event => {
        event.preventDefault()

        if (name.length && email.length) {
            setShow(true)

            const data = new FormData()

            data.append('name', name)
            data.append('email', email)

            console.log({ data })

            try {
                await axios.post('/clients', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                // refresh work space data after upload
                router.replace(router.asPath)

                setShow(false)
                onClose()
            } catch (error) {
                console.log(error)
                setShow(false)
                setError('Something went wrong, try again later.')
                setVisible(true)
            }
        } else {
            setError('Both fields are required to create a new client')
            setVisible(true)
        }
    }

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
                className="modalLayer"
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
                                Add Client
                            </Heading>
                            <Button icon={<Close />} onClick={onClose} />
                        </Box>
                        <FormField
                            name="name"
                            label="Client Name"
                            required
                            validate={[
                                { regexp: /^[a-z]/i },
                                name => {
                                    if (name && name.length === 1) {
                                        return 'must be >1 character'
                                    }
                                    return undefined
                                },
                                name => {
                                    if (name === 'good') {
                                        return {
                                            message: (
                                                <Box align="end">
                                                    <StatusGood />
                                                </Box>
                                            ),
                                            status: 'info',
                                        }
                                    }
                                },
                            ]}
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <FormField name="email" label="Email" required>
                            <TextInput
                                name="email"
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormField>
                        <Box flex={false} as="footer" align="center">
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
                                Add
                            </button>
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default NewClientLayer
