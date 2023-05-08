import {
    Anchor,
    Box,
    Button,
    Form,
    FormField,
    Grid,
    Spinner,
    TextInput,
} from 'grommet'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Google } from 'grommet-icons'

const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}

const googleButtonStyles = {
    textDecoration: 'none',
    transition: 'background-color .3s, box-shadow .3s',

    padding: '12px 16px 12px 42px',
    border: 'none',
    borderRadius: '3px',
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',

    color: '#757575',
    fontSize: '14px',
    fontWeight: '500',

    backgroundImage:
        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '12px 11px',
}

export default function Login() {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isBusy, setIsBusy] = useState(false)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()
        setIsBusy(true)
        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
        setIsBusy(false)
    }

    return (
        <>
            <div style={backgroundStyles}>
                <Box
                    style={{
                        backgroundColor: '#EBF1F3',
                        borderRadius: '7px',
                        minWidth: '700px',
                    }}>
                    <Grid
                        // columns={['2/3', '1/3']}

                        gap="small"
                        animation="fadeIn"
                        pad="medium">
                        <Box
                            alignContent="center"
                            justifyContent="center"
                            background={{ color: '#EBF1F3' }}
                            pad="small"
                            // border={{
                            //     color: 'brand',
                            //     size: 'xsmall',
                            //     side: 'right',
                            // }}>
                        >
                            <Form onSubmit={submitForm}>
                                <FormField
                                    name="email"
                                    label="Email"
                                    error={errors.email}>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={email}
                                        required
                                        autoFocus
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </FormField>
                                <FormField
                                    name="password"
                                    label="Password"
                                    error={errors.password}>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={password}
                                        className="block mt-1 w-full"
                                        onChange={event =>
                                            setPassword(event.target.value)
                                        }
                                        required
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
                                    <Anchor
                                        size="small"
                                        weight="small"
                                        label="Forgot Password?"
                                        href="/forgot-password"
                                    />
                                </Box>
                            </Form>
                        </Box>
                        {/* <Box
                            background={{ color: '#EBF1F3' }}
                            fill
                            alignItems="center"
                            justify="center">
                            <a
                                style={googleButtonStyles}
                                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/google`}>
                                Sign in with Google
                            </a>
                        </Box> */}
                    </Grid>
                    <Box alignSelf="center">
                        <Anchor size="small" href="/register">
                            Register a new account?
                        </Anchor>
                    </Box>
                </Box>
            </div>
        </>
    )
}
