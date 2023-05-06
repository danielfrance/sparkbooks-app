import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import {
    Anchor,
    Box,
    Button,
    Form,
    FormField,
    Heading,
    TextInput,
    Text,
    Spinner,
} from 'grommet'
import styled from 'styled-components'
import AuthSessionStatus from '@/components/AuthSessionStatus'

const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}

export default function ForgotPassword() {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isBusy, setIsBusy] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setIsBusy(true)
        await forgotPassword({ email, setErrors, setStatus })
        setIsBusy(false)
    }

    return (
        <>
            <div style={backgroundStyles}>
                <Box
                    alignContent="center"
                    justifyContent="center"
                    background={{ color: '#EBF1F3' }}
                    animation="fadeIn"
                    basis="large"
                    pad="medium"
                    round="small">
                    <Box
                        pad="xsmall"
                        margin={{ bottom: 'small' }}
                        elevation="xsmall"
                        border={{
                            size: 'xsmall',
                            color: 'status-unknown',
                            radius: '7px',
                        }}>
                        <Heading
                            level="3"
                            margin={{ bottom: 'xsmall', top: 'none' }}>
                            Password Reset
                        </Heading>
                        <Text size="medium">
                            Forget your password? No problem. Enter your email
                            address and we will send you a password reset link.
                        </Text>
                    </Box>
                    <Box>
                        <AuthSessionStatus status={status} />
                        <Form onSubmit={submitForm}>
                            <FormField
                                name="email"
                                label="Email"
                                error={errors.email}>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                            </FormField>
                            <Box direction="row" justify="between">
                                {!isBusy ? (
                                    <Button
                                        type="submit"
                                        primary
                                        label="Submit"
                                    />
                                ) : (
                                    <Spinner />
                                )}
                                <Anchor label="Cancel" href="/login" />
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </div>
        </>
    )
}
