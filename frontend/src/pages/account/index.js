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
    FormField,
    TextInput,
    Grid,
    Avatar,
    Card,
    CardBody,
    Text,
    Stack,
    Button,
    List,
    CardFooter,
    Notification,
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
    const router = useRouter()
    const [users, setUsers] = useState(team || [])
    const [onOpen, setOnOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [edit, setEdit] = useState(false)
    const [names, setNames] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [isNew, setIsNew] = useState(true)
    const [oldName, setOldName] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [oldRole, setOldRole] = useState('')
    const { filterQuery } = useUIContext()

    const actions = [{ label: 'Invite', onClick: () => setOnOpen(true) }]

    const onClose = () => {
        router.replace(router.asPath)
        setOnOpen(false)
        setOldName('')
        setOldEmail('')
        setOldRole('')
    }

    const handleChange = event => {
        setEdit(true)
        const { name, value } = event.target

        if (name === 'names') setNames(value)
        if (name === 'usser-email') setUserEmail(value)
    }

    const save = async () => {
        const data = new FormData()
        data.append('name', names)
        data.append('email', userEmail)

        try {
            await axios.post(`account/user/${id}`, data)

            setEdit(false)
        } catch (error) {
            setErrorMessage("Sorry, we couldn't save, try again")
        }
    }

    const onClickRow = ({ datum }) => {
        setIsNew(false)
        setOldName(datum.name)
        setOldEmail(datum.email)
        setOldRole(datum.role)
        setOnOpen(true)
    }

    const onRemove = async datum => {
        try {
            await axios.delete(`/account/delete/${datum.id}`)

            setUsers(current => current.filter(user => user.id !== datum.id))
        } catch (error) {
            // console.log({ error })
            setErrorMessage("Sorry, we couldn't remove it, try again")
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
        <>
            {errorMessage.length > 0 && (
                <Notification
                    toast
                    status="warning"
                    title="Not ready"
                    message="Still processing"
                    onClose={() => setIsUnvailable(false)}
                />
            )}
            <AppLayout>
                <AppBar />
                <div className="card">
                    <Box direction="row" pad="medium" justify="between">
                        <div className="title">Account Details</div>
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
                                <FormField
                                    label="Names"
                                    // required
                                    // margin={{ top: 'medium', bottom: 'medium' }}
                                >
                                    <TextInput
                                        name="names"
                                        icon={
                                            <User
                                                size="medium"
                                                color="#3396F2"
                                            />
                                        }
                                        value={names}
                                        onChange={handleChange}
                                        aria-label="user names"
                                    />
                                </FormField>

                                <FormField label="Names">
                                    <TextInput
                                        name="user-email"
                                        icon={
                                            <Mail
                                                size="medium"
                                                color="#3396F2"
                                            />
                                        }
                                        value={userEmail}
                                        onChange={handleChange}
                                        aria-label="user names"
                                    />
                                </FormField>

                                {edit && (
                                    <>
                                        <Box></Box>
                                        <button
                                            className="btn secondary inverse"
                                            onClick={() => save()}>
                                            Save
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <Card background="brand" elevation="medium">
                            <CardBody pad="small">
                                <Grid pad="none" columns={['xsmall', 'large']}>
                                    <Box>
                                        <Achievement
                                            color="white"
                                            size="large"
                                        />
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
                {onOpen && (
                    <InviteUser
                        onClose={onClose}
                        isNew={isNew}
                        oldName={oldName}
                        oldEmail={oldEmail}
                        oldRole={oldRole}
                    />
                )}
            </AppLayout>
        </>
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
