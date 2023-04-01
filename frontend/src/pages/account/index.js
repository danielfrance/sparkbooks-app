import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import DataTable from '@/components/Layouts/DataTable'
import {
    Box,
    Heading,
    Grid,
    Avatar,
    Card,
    CardBody,
    Text,
    Stack,
    Button,
    List,
    CardFooter,
} from 'grommet'
import { FormEdit, User, Mail, Phone, Lock, Achievement } from 'grommet-icons'
import axios from '@/lib/axios'

const columns = [
    {
        property: 'name',
        header: <Text>Name</Text>,
    },
    {
        property: 'email',
        header: <Text>Email</Text>,
    },
    {
        property: 'role',
        header: <Text>Role</Text>,
    },
    {
        property: 'active',
        header: <Text>Last Active</Text>,
    },
]

export default function Account({ data }) {
    console.log(data)
    const [selected, setSelected] = useState()
    const [users, setUsers] = useState(data.team)
    const { filterQuery, userContext } = useUIContext()
    const onClickRow = ({ datum }) => {
        // router.push(`/clients/${datum.id}`)
        console.log(datum)
    }
    const actions = [{ label: 'Invite', onClick: e => console.log(e) }]
    const filtered = users.filter(
        datum =>
            datum.name?.toLocaleLowerCase().includes(filterQuery) ||
            datum.type?.toLocaleLowerCase().includes(filterQuery) ||
            datum.email?.toLocaleLowerCase().includes(filterQuery),
    )
    return (
        <AppLayout>
            <AppBar />
            <div className="card">
                <Box direction="row" pad="medium" justify="between">
                    <div className="title">Account Details</div>
                    <button
                        className="btn inverse small"
                        onClick={() => {
                            alert('change text fields to textinputs')
                        }}>
                        Edit Info
                    </button>
                </Box>
                <div className="grid account-info">
                    <div className="grid user-info">
                        <div>
                            <Box>
                                <Stack
                                    alignSelf="center"
                                    align="center"
                                    anchor="bottom-right"
                                    pad="large">
                                    <Avatar
                                        src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                                        size="xlarge"
                                    />
                                    <Box
                                        pad="xsmall"
                                        background={{
                                            color: 'brand',
                                            opacity: 'strong',
                                        }}
                                        round="small">
                                        <FormEdit size="medium" color="white" />
                                    </Box>
                                </Stack>
                            </Box>
                        </div>
                        <div className="flex contacts">
                            <Box>
                                <Box
                                    direction="row"
                                    align="center"
                                    margin={{ bottom: 'medium' }}>
                                    <User
                                        size="medium"
                                        color="brand"
                                        style={{ marginRight: '0.5em' }}
                                    />
                                    <Text size="medium">
                                        {userContext?.name}
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    direction="row"
                                    align="center"
                                    margin={{ bottom: 'medium' }}>
                                    <Mail
                                        size="medium"
                                        color="brand"
                                        style={{ marginRight: '0.5em' }}
                                    />
                                    <Text size="medium">
                                        {userContext?.email}
                                    </Text>
                                </Box>
                            </Box>
                        </div>
                    </div>
                    <Card background="brand" elevation="medium">
                        <CardBody pad="medium">
                            <Grid pad="none" columns={['xsmall', 'large']}>
                                <Box>
                                    <Achievement color="white" size="large" />
                                </Box>
                                <Box margin={{ left: '-1em' }}>
                                    <Text
                                        color="white"
                                        size="xlarge"
                                        weight="bold">
                                        Gold Plan
                                    </Text>
                                    <List
                                        align="start"
                                        data={[
                                            { users: '5 Users' },
                                            { storage: '5GB Storage' },
                                            { support: '24/7 Support' },
                                            { files: '1000 Files' },
                                        ]}
                                    />
                                </Box>
                            </Grid>
                        </CardBody>
                        <CardFooter justify="center" pad="small">
                            <Button
                                label="Change Plan"
                                color="white"
                                href="https://stripe.com"
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <DataTable
                title="Users"
                columns={columns}
                data={filtered}
                setSelected={setSelected}
                onClickRow={onClickRow}
                actions={actions}
            />
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const cookie = context.req.headers.cookie
    const res = await axios.get(`/account`, {
        headers: {
            cookie: cookie,
        },
    })

    const data = res.data

    return {
        props: { data },
    }
}
