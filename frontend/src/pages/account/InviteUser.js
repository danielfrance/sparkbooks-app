import { useEffect, useState } from 'react'
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
    Notification,
} from 'grommet'

import axios from '@/lib/axios'

const InviteUser = ({ isNew, onClose, oldName, oldEmail, oldRole }) => {
    const [selectedRole, setSelectedRole] = useState()
    const [name, setName] = useState(oldName)
    const [email, setEmail] = useState(oldEmail)
    const [invitaion, setInvitation] = useState({
        name: oldName,
        email: oldEmail,
        role: oldRole,
    })

    console.log({ invitaion })
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState()

    const handleChange = event => {
        const { name, value } = event.target

        if (name === 'name') setName(value)
        if (name === 'email') setEmail(value)

        setInvitation(currentValue => {
            return { ...currentValue, [name]: value }
        })
    }

    const handleSelection = option => {
        setSelectedRole(option)
        setInvitation(currentValue => {
            return { ...currentValue, role: option.toLowerCase() }
        })
    }

    const submit = async event => {
        event.preventDefault()

        const { name, email, role } = invitaion
        if (name && email && role) {
            setShow(true)

            const data = new FormData()

            for (const [key, value] of Object.entries(invitaion))
                data.append(key, value)

            console.log(data)

            try {
                const res = await axios.post('/account/invite', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                // console.log(res.data)

                setShow(false)
                onClose()
                setVisible(true)
            } catch (error) {
                setError(
                    error?.response?.data?.message ||
                        "We couldn't send invitation",
                )
                setShow(false)
                setVisible(true)
            }
        } else {
            setError('Please select both the client and files')
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
                                Invite member
                            </Heading>
                            <Button icon={<Close />} onClick={onClose} />
                        </Box>
                        <FormField
                            label="Team member name"
                            // required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <TextInput
                                name="name"
                                value={name}
                                onChange={handleChange}
                                aria-label="team member name"
                            />
                        </FormField>
                        <FormField
                            label="Email"
                            // required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <TextInput
                                name="email"
                                value={email}
                                onChange={handleChange}
                                aria-label="team member email"
                            />
                        </FormField>
                        <FormField
                            name="role"
                            label="Team member role"
                            // required
                            margin={{ top: 'medium', bottom: 'medium' }}>
                            <Select
                                required
                                name="role"
                                value={selectedRole}
                                // valueKey={{ key: 'id' }}
                                // labelKey="Role"
                                options={['Admin', 'Editor']}
                                onChange={({ option }) =>
                                    handleSelection(option)
                                }
                                // onSearch={text => console.log(text)}
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
                                {isNew ? 'Send invitation' : 'Save'}
                            </button>
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default InviteUser
