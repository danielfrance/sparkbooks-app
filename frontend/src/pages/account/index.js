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
import { useAxios } from '@/hooks/use-axios'

export default function Account({ data }) {
    const axios = useAxios()
    const { id, name, email, is_admin, workspaceInfo, team } = data
    const router = useRouter()
    const [users, setUsers] = useState(team || [])
    const [onOpen, setOnOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [edit, setEdit] = useState(false)
    const [names, setNames] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [action, setAction] = useState()
    const [accountId, setAccountId] = useState(null)
    const [oldName, setOldName] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [oldRole, setOldRole] = useState('')
    const { filterQuery } = useUIContext()

    const actions = [
        {
            label: 'Invite',
            onClick: () => {
                setAction('send invitation')
                setOnOpen(true)
            },
        },
    ]

    const onClose = () => {
        router.replace(router.asPath)
        setOnOpen(false)
        setOldName('')
        setOldEmail('')
        setOldRole('')
        setAccountId(null)
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

    const onClickRow = datum => {
        setAction('edit')
        setAccountId(datum.id)
        setOldName(datum.name)
        setOldEmail(datum.email)
        setOldRole(datum.role)
        setOnOpen(true)
    }

    const onRemove = datum => {
        setAction('remove')
        setAccountId(datum.id)
        setOldName(datum.name)
        setOldEmail(datum.email)
        setOldRole(datum.role)
        setOnOpen(true)
    }

    const remove = async accountId => {
        try {
            await axios.delete(`/account/delete/${accountId}`)
        } catch (error) {
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

    const defaultRender = property => datum => (
        <Box onClick={() => onClickRow(datum)}>
            <Text>{datum[property]}</Text>
        </Box>
    )

    const columns = [
        {
            property: 'name',
            header: <Text>Name</Text>,
            render: defaultRender('name'),
        },
        {
            property: 'email',
            header: <Text>Email</Text>,
            render: defaultRender('email'),
        },
        {
            property: 'role',
            header: <Text>Role</Text>,
            render: defaultRender('role'),
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
                <div>
                    <Box direction="row" pad="medium" justify="between">
                        <div className="title">Account Details</div>
                    </Box>
                    <Grid
                        columns={{
                            count: 2,
                            size: 'auto',
                        }}
                        gap="medium"
                        pad="small">
                        {/* <Box margin="0" pad="0">
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
                        </Box> */}
                        <Box className="card" pad="small">
                            <FormField
                                label="Names"
                                // required
                                // margin={{ top: 'medium', bottom: 'medium' }}
                            >
                                <TextInput
                                    name="names"
                                    icon={
                                        <User size="medium" color="#3396F2" />
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
                                        <Mail size="medium" color="#3396F2" />
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
                        </Box>
                        <Card
                            background="brand"
                            elevation="medium"
                            className="card">
                            <CardBody pad="medium">
                                <Box>
                                    <Text
                                        color="white"
                                        size="xlarge"
                                        weight="bold">
                                        {data.subscriptionPlan.name} Plan
                                    </Text>
                                    <List
                                        align="start"
                                        data={[
                                            {
                                                users: `${data.subscriptionPlan.seats} users`,
                                            },
                                            {
                                                files: `${data.subscriptionPlan.pages} pages`,
                                            },
                                            {
                                                clients: `${data.subscriptionPlan.clients} clients`,
                                            },
                                            {
                                                support: data.subscriptionPlan
                                                    .support_access
                                                    ? 'support access'
                                                    : 'no support access',
                                            },
                                        ]}
                                    />
                                </Box>
                            </CardBody>
                            <CardFooter justify="center" pad="small">
                                <Button
                                    label="Change Plan"
                                    color="white"
                                    href={data.portalLink}
                                />
                            </CardFooter>
                        </Card>
                    </Grid>
                </div>
                {is_admin && team?.length > 0 && (
                    <DataTable
                        title="Users"
                        columns={columns}
                        data={filtered}
                        actions={actions}
                    />
                )}
                {onOpen && (
                    <InviteUser
                        onClose={onClose}
                        action={action}
                        remove={remove}
                        accountId={accountId}
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
    const axios = useAxios()

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
