import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Form, FormField, TextInput, Notification } from 'grommet'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'

const AccountDetails = ({ data }) => {
    return (
        <>
            <AppLayout>
                <Box direction="row" justify="between" pad="medium">
                    <Heading level="3" color="brand" className="ff-sans-serif">
                        Edit Account
                    </Heading>
                </Box>
                <div
                    className="card panel contact-form"
                    style={{
                        margin: '10% auto',
                        padding: '2rem',
                        width: '50%',
                        border: '#3396F2 solid 1px',
                    }}>
                    <Form>
                        <Box margin={{ bottom: '1em' }}>
                            <FormField name="name" label="Name">
                                <TextInput name="name" value={''} />
                            </FormField>
                            <FormField name="email" label="Email">
                                <TextInput name="email" value={''} />
                            </FormField>
                        </Box>

                        <Box
                            direction="row"
                            gap="medium"
                            justify="end"
                            margin={{ top: '6rem' }}>
                            <button className="btn secondary inverse">
                                Cancel
                            </button>
                            <button className="btn primary inverse">
                                Save
                            </button>
                        </Box>
                    </Form>
                </div>
            </AppLayout>
        </>
    )
}

export default AccountDetails

export async function getServerSideProps(context) {
    return {
        props: { data: 'details' },
    }
}
