import { useEffect, useState } from 'react'
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

const InviteUser = ({
    action,
    remove,
    onClose,
    accountId,
    oldName,
    oldEmail,
    oldRole,
}) => {
    const [selectedRole, setSelectedRole] = useState()
    const [name, setName] = useState(oldName)
    const [email, setEmail] = useState(oldEmail)
    const [invitaion, setInvitation] = useState({
        id: accountId,
        name: oldName,
        email: oldEmail,
        role: oldRole,
    })

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

        const url = accountId
            ? `account/team/user/${accountId}`
            : '/account/invite'
        const { name, email, role } = invitaion
        if (name && email && role) {
            setShow(true)

            const data = new FormData()

            for (const [key, value] of Object.entries(invitaion))
                data.append(key, value)

            try {
                const res = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                // TODO/FIXME: Editing/updating an account
                console.log(res.data)

                setShow(false)
                onClose()
            } catch (error) {
                setError(
                    error?.response?.data?.message ||
                        "We couldn't send invitation",
                )
                setShow(false)
                setVisible(true)
            }
        } else {
            setError('Please fill all the fields')
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

                            <Box gap="medium" direction="row">
                                <button className="btn" onClick={onClose}>
                                    Cancel
                                </button>

                                <button
                                    className="btn primary"
                                    // style={{ width: '100%' }}
                                    onClick={
                                        action !== 'remove'
                                            ? submit
                                            : () => remove(accountId)
                                    }>
                                    {action !== 'remove'
                                        ? `${action
                                              .charAt(0)
                                              .toUpperCase()}${action.slice(1)}`
                                        : 'Confirm removal'}
                                </button>
                            </Box>
                        </Box>
                    </Form>
                </Box>
            </Layer>
        </>
    )
}

export default InviteUser
