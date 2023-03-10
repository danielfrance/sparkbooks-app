import { Anchor, Box, Button, Form, FormField, Grid, TextInput } from 'grommet'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Google } from 'grommet-icons'

const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}


export default function Login() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()
        console.log('registration form submitted');

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

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
                            name="name"
                            label="Full Name"
                            error={errors.name}>
                            <TextInput
                                id="name"
                                name="name"
                                type="name"
                                value={name}
                                required
                                autoFocus
                                onChange={event => setName(event.target.value)}
                            />
                        </FormField>
                        <FormField
                            name="email"
                            label="Email"
                            error={errors.email}>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                required
                                autoFocus
                                onChange={event => setEmail(event.target.value)}
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
                            label="Password Confirmation"
                            error={errors.password_confirmation}>
                            <TextInput
                                id="passwordConfirmation"
                                type="password"
                                name="passwordConfirmation"
                                value={passwordConfirmation}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                required
                            />
                        </FormField>
                        <Box direction="row" justify="between">
                            <Button type="submit" primary label="Submit" />
                            <Anchor
                                size="small"
                                weight="small"
                                label="Cancel"
                                href="/login"
                            />
                        </Box>
                    </Form>
                </Box>
            </div>
        </>
    )
}
