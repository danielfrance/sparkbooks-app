import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '@/contexts/ui'
import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import DataTable from '@/components/Layouts/DataTable'
import InviteUser from './InviteUser'
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
import {
    FormEdit,
    User,
    Mail,
    Phone,
    Lock,
    Achievement,
    Organization,
    Trash,
} from 'grommet-icons'
import axios from '@/lib/axios'

export default function Account({ data }) {
    const { id, name, email, is_admin, workspaceInfo, team } = data
    console.log({ data })
    const router = useRouter()
    const [users, setUsers] = useState(team || [])
    const [onOpen, setOnOpen] = useState(false)
    const [selected, setSelected] = useState()
    const { filterQuery } = useUIContext()

    const actions = [{ label: 'Invite', onClick: () => setOnOpen(true) }]

    const onClose = () => {
        router.replace(router.asPath)
        setOnOpen(false)
    }

    const editAccount = () => {
        router.push(`/account/${id}`)
    }

    const onClickRow = ({ datum }) => {
        router.push(`/account/team/${datum.id}`)
        console.log(datum)
    }

    const onRemove = async datum => {
        try {
            await axios.delete(`/account/delete/${datum.id}`)

            setUsers(current => current.filter(user => user.id !== datum.id))
        } catch (error) {
            console.log({ error })
        }
    }

    const filtered = users.filter(
        datum =>
            datum.name?.toLowerCase().includes(filterQuery) ||
            datum.role?.toLowerCase().includes(filterQuery) ||
            datum.email?.toLowerCase().includes(filterQuery),
    )

    const deleteRender = datum => (
        <Box alignSelf="center" style={{ cursor: 'pointer' }}>
            <Trash color="#C767F5" onClick={() => onRemove(datum)} />
        </Box>
    )

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
        {
            property: 'x',
            align: 'end',
            header: <Text>Remove</Text>,
            render: deleteRender,
        },
    ]

    return (
        <AppLayout>
            <AppBar />
            <div className="card">
                <Box direction="row" pad="medium" justify="between">
                    <div className="title">Account Details</div>
                    <button
                        className="btn primary inverse small"
                        onClick={() => editAccount()}>
                        Edit Info
                    </button>
                </Box>
                <div className="grid account-info">
                    <div className="grid user-info">
                        <Box margin="0" pad="0">
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
                        <div className="grid contacts">
                            <Box
                                direction="row"
                                // align="center"
                                // margin={{ bottom: 'medium' }}
                            >
                                <User
                                    // size="medium"
                                    color="brand"
                                    style={{ marginRight: '0.5em' }}
                                />
                                <Text size="medium">{name}</Text>
                            </Box>

                            <Box
                                direction="row"
                                // align="center"
                                // margin={{ bottom: 'medium' }}
                            >
                                <Mail
                                    // size="medium"
                                    color="brand"
                                    style={{ marginRight: '0.5em' }}
                                />
                                <Text size="medium">{email}</Text>
                            </Box>
                            {workspaceInfo && (
                                <>
                                    <Box
                                        direction="row"
                                        // align="center"
                                        // margin={{ bottom: 'medium' }}
                                        margin="0"
                                        pad="0"
                                        gap="0">
                                        <Phone
                                            // size="medium"
                                            color="brand"
                                            style={{ marginRight: '0.5em' }}
                                        />
                                        <Text size="medium">
                                            {workspaceInfo?.phone}
                                        </Text>
                                    </Box>
                                    <Box
                                        direction="row"
                                        // align="center"
                                        // margin={{ bottom: 'medium' }}
                                    >
                                        <Organization
                                            // size="medium"
                                            color="brand"
                                            style={{ marginRight: '0.5em' }}
                                        />
                                        <Text size="medium">
                                            {workspaceInfo?.address}
                                        </Text>
                                    </Box>
                                </>
                            )}
                        </div>
                    </div>
                    <Card background="brand" elevation="medium">
                        <CardBody pad="small">
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
            {is_admin && team?.length > 0 && (
                <DataTable
                    title="Users"
                    columns={columns}
                    data={filtered}
                    // setSelected={setSelected}
                    onClickRow={onClickRow}
                    actions={actions}
                />
            )}
            {onOpen && <InviteUser onClose={onClose} />}
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
