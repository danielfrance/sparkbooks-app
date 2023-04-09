import { Anchor, Box, Button, Form, FormField, Grid, TextInput } from 'grommet'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <>
            <div style={backgroundStyles}>
                <Box
                    alignContent="center"
                    justifyContent="center"
                    background={{ color: '#EBF1F3' }}
                    pad="medium"
                    width="large"
                    round="small">
                    <Form onSubmit={submitForm}>
                        <FormField
                            name="email"
                            label="Email"
                            error={errors.email}>
                            <TextInput
                                id="email"
                                name="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                        </FormField>
                        <FormField
                            name="password"
                            label="Password"
                            error={errors.password}>
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                        </FormField>
                        <FormField
                            name="passwordConfirmation"
                            label="Confirm Password"
                            error={errors.password_confirmation}>
                            <TextInput
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                required
                            />
                        </FormField>
                        <Box
                            direction="row"
                            justify="between"
                            margin={{ top: 'medium' }}>
                            <Button
                                type="submit"
                                label="Reset Password"
                                primary
                            />
                        </Box>
                    </Form>
                </Box>
            </div>
        </>
    )
}

export default PasswordReset
