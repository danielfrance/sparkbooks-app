import { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    Heading,
    Form,
    FormField,
    TextInput,
    Select,
    Notification,
} from 'grommet'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'

const TeamMember = ({ data }) => {
    return (
        <>
            <AppLayout>
                <Box direction="row" justify="between" pad="medium">
                    <Heading level="3" color="brand" className="ff-sans-serif">
                        Edit Team Member
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
                            <FormField
                                name="role"
                                label="Team member role"
                                // required
                                margin={{ top: 'medium', bottom: 'medium' }}>
                                <Select
                                    required
                                    name="role"
                                    // value={selectedRole}
                                    // valueKey={{ key: 'id' }}
                                    // labelKey="Role"
                                    options={['Admin', 'Editor']}
                                    // onChange={({ option }) =>
                                    //     handleSelection(option)
                                    // }
                                    // onSearch={text => console.log(text)}
                                />
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

export default TeamMember

export async function getServerSideProps(context) {
    return {
        props: { data: 'the member' },
    }
}
