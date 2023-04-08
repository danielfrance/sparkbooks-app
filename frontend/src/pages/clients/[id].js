import AppBar from '@/components/Layouts/AppBar'
import AppLayout from '@/components/Layouts/AppLayout'
import {
    Box,
    Form,
    FormField,
    Grid,
    Heading,
    TextInput,
    Select,
    Text,
    Meter,
    DataSearch,
    DataSummary,
    Toolbar,
    List,
    Data,
    Menu,
    Notification,
} from 'grommet'
import { More, Trash, Edit } from 'grommet-icons'

import { useEffect, useState } from 'react'
import DataTable from '@/components/Layouts/DataTable'
import { useUIContext } from '@/contexts/ui'
import ChartOfAccountsImport from './chartOfAccountsModal'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import ErrorMessage from '@/components/ErrorMessage'

const clientRender = property => datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar size="small" round="xsmall" src={src} /> */}
        <Text>{datum[property]}</Text>
    </Box>
)

// const numberRender = property => datum => (
//     <Box
//         pad={{ vertical: 'xsmall' }}
//         gap="small"
//         alignSelf="end"
//         direction="row">
//         <Text>{datum[property]}</Text>
//     </Box>
// )

const processingDataRender = property => datum => (
    <Box
        pad={{ vertical: 'xsmall', horizontal: 'medium' }}
        direction="row"
        alignSelf="end">
        {!datum[property] ? (
            <Meter
                background={{ color: '#466EC7', opacity: 'medium' }}
                values={[
                    {
                        value: 70,
                        color: '#C767F5',
                    },
                ]}
                thickness="xsmall"
                round
            />
        ) : (
            <Meter
                background={{ color: '#466EC7', opacity: 'medium' }}
                values={[
                    {
                        value: 100,
                        color: 'green',
                    },
                ]}
                thickness="xsmall"
                round
            />
        )}
    </Box>
)

const columns = [
    // {
    //     property: 'id',
    //     header: <Text>Uploads</Text>,
    //     size: 'small',
    //     render: numberRender('id'),
    //     // sortable: true,
    //     // primary: true,
    // },
    {
        property: 'name',
        size: 'medium',
        header: <Text>Client</Text>,
        render: clientRender('name'),
    },
    // {
    //     property: 'files',
    //     size: 'medium',
    //     header: <Text>Files</Text>,
    // },
    {
        property: 'processed',
        size: 'medium',
        align: 'end',
        header: <Text>Processing</Text>,
        render: processingDataRender('processed'),
    },
]

export default function ClientEdit({ data, status, statusText }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    const [chartData, setChartData] = useState([])
    const [add, setAdd] = useState(false)
    const [account, setAccount] = useState(null)
    const [client, setClient] = useState()
    const [uploads, setUploads] = useState([])
    const { filterQuery } = useUIContext()
    const [isUnvailable, setIsUnvailable] = useState(false)

    const addAccount = () => {
        setAccount({
            detail: '',
            name: '',
        })
        setAdd(true)
    }

    const handleAccountInput = event => {
        const { name, value } = event.target
        setAccount(currentValue => ({ ...currentValue, [name]: value }))
    }

    const handleClientInput = event => {
        const { name, value } = event.target

        setClient(currentValue => ({ ...currentValue, [name]: value }))
    }

    const editAccount = item => {
        setAccount(item)
        setAdd(true)
    }

    const removeAccount = async item => {
        try {
            await axios.delete(`category/${item.id}`)
            router.replace(router.asPath)
        } catch (error) {}
    }

    const handleClientCitySelection = option =>
        setClient(currentValue => ({ ...currentValue, state: option }))

    const submitAccountData = async () => {
        if (!account.name) return

        const accountData = {
            ...account,
            client_id: client.id,
            workspace_id: client.workspace_id,
        }

        try {
            const data = new FormData()
            for (const [key, value] of Object.entries(accountData))
                data.append(key, value)

            let url
            if (accountData.id) url = `category/${account.id}`
            if (!accountData.id) url = `category`

            await axios.post(url, data)

            setAccount(null)
            setAdd(false)
            router.replace(router.asPath)
        } catch (error) {
            console.log({ error })
        }
    }

    const cancelAddAccount = () => {
        setAccount(null)
        setAdd(false)
    }

    const submitClientData = async () => {
        const { id, name, email } = client
        if (!id || !name || !email) return

        try {
            const data = new FormData()

            for (const [key, value] of Object.entries(client))
                if (key !== 'categories' && key !== 'id')
                    data.append(key, value)

            await axios.post(`clients/${id}`, data)

            router.replace(router.asPath)
        } catch (error) {}
    }

    const onClickRow = ({ datum }) => {
        if (datum.processed) router.push(`/uploads/${datum.id}`)
        else setIsUnvailable(true)
    }

    const filtered = uploads
        .filter(datum => datum.name.toLocaleLowerCase().includes(filterQuery))
        .sort((a, b) => new Date(b.percent) - new Date(a.percent))

    const actions = [
        // { label: 'Add', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    useEffect(() => {
        setClient(data.client)
        setUploads(data.uploads)
        setChartData(
            data.chart.map(el => ({
                id: el.id,
                name: el.name,
                detail: el.detail,
            })),
        )
    }, [data])

    return (
        <>
            {isUnvailable && (
                <Notification
                    toast
                    status="warning"
                    title="Not ready"
                    message="Still processing"
                    onClose={() => setIsUnvailable(false)}
                />
            )}
            {status !== 200 && (
                <ErrorMessage status={status} statusText={statusText} />
            )}
            {status === 200 && (
                <AppLayout>
                    <AppBar />
                    <Box className="card" fill height={{ min: '555px' }}>
                        <Box direction="row" justify="between" pad="medium">
                            <Heading
                                level="3"
                                color="brand"
                                className="ff-sans-serif">
                                Edit Client
                            </Heading>
                        </Box>
                        <div className="flex client-details">
                            <div className="panel contact-form">
                                <Form>
                                    <Box margin={{ bottom: '1em' }}>
                                        <FormField name="name" label="Name">
                                            <TextInput
                                                name="name"
                                                value={client?.name || ''}
                                                onChange={handleClientInput}
                                            />
                                        </FormField>
                                    </Box>
                                    <Grid
                                        rows={'small'}
                                        alignSelf="stretch"
                                        columns={'1/2'}
                                        gap="large">
                                        <Box>
                                            <FormField
                                                name="email"
                                                label="Email">
                                                <TextInput
                                                    name="email"
                                                    value={client?.email || ''}
                                                    onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <FormField
                                                name="address"
                                                label="Street">
                                                <TextInput
                                                    name="address"
                                                    value={
                                                        client?.address || ''
                                                    }
                                                    onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <FormField
                                                name="poc"
                                                label="Point of Contact">
                                                <TextInput
                                                    name="point_of_contact"
                                                    value={
                                                        client?.point_of_contact ||
                                                        ''
                                                    }
                                                    onChange={handleClientInput}
                                                />
                                            </FormField>
                                        </Box>
                                        <Box>
                                            <FormField
                                                name="phone"
                                                label="Phone">
                                                <TextInput
                                                    name="phone"
                                                    value={client?.phone || ''}
                                                    onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <FormField name="city" label="City">
                                                <TextInput
                                                    name="city"
                                                    value={client?.city || ''}
                                                    onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <FormField
                                                name="state"
                                                label="State">
                                                <Select
                                                    options={[
                                                        'AL',
                                                        'CA',
                                                        'NY',
                                                        'OK',
                                                        'TX',
                                                        'WY',
                                                    ]}
                                                    value={client?.state}
                                                    onChange={({ option }) =>
                                                        handleClientCitySelection(
                                                            option,
                                                        )
                                                    }
                                                />
                                            </FormField>
                                        </Box>
                                    </Grid>
                                    <Box
                                        direction="row"
                                        justify="end"
                                        margin={{ top: '6rem' }}>
                                        <button
                                            className="btn primary inverse"
                                            onClick={submitClientData}>
                                            Save
                                        </button>
                                    </Box>
                                </Form>
                            </div>
                            <div className="panel coa-container">
                                <Box
                                    margin={{ bottom: 'small' }}
                                    direction="row"
                                    justify="between">
                                    <Text>Chart of Accounts</Text>
                                    {!add && (
                                        <div>
                                            <button
                                                className="btn secondary inverse small"
                                                onClick={addAccount}>
                                                Add
                                            </button>
                                            {/* <button
                                            className="btn secondary inverse small"
                                            onClick={onOpen}>
                                            Upload
                                        </button> */}
                                        </div>
                                    )}
                                </Box>
                                {add && (
                                    <Form>
                                        <Box
                                            margin={{ top: '3em' }}
                                            pad="small"
                                            style={{
                                                // border: 'red 1px solid',
                                                borderRadius: '7px',
                                            }}>
                                            <FormField
                                                name="account-name"
                                                label="Account name">
                                                <TextInput
                                                    name="name"
                                                    value={account?.name || ''}
                                                    onChange={event =>
                                                        handleAccountInput(
                                                            event,
                                                        )
                                                    }
                                                />
                                            </FormField>
                                            <FormField
                                                name="account-detail"
                                                label="Account code">
                                                <TextInput
                                                    name="detail"
                                                    value={
                                                        account?.detail || ''
                                                    }
                                                    onChange={event =>
                                                        handleAccountInput(
                                                            event,
                                                        )
                                                    }
                                                />
                                            </FormField>
                                            <Box
                                                direction="row"
                                                gap="medium"
                                                alignSelf="end"
                                                margin={{ top: '1em' }}>
                                                <button
                                                    className="btn  inverse small"
                                                    onClick={cancelAddAccount}>
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn primary inverse small"
                                                    onClick={submitAccountData}>
                                                    Save
                                                </button>
                                            </Box>
                                        </Box>
                                    </Form>
                                )}
                                {!add && (
                                    <Data data={chartData}>
                                        <Toolbar>
                                            <DataSearch />
                                        </Toolbar>
                                        <DataSummary />
                                        <List
                                            primaryKey="name"
                                            secondaryKey="detail"
                                            pad={{
                                                right: '0px',
                                                top: '10px',
                                                bottom: '10px',
                                                left: '0px',
                                            }}
                                            action={(item, index) => (
                                                <Menu
                                                    key={index}
                                                    icon={<More />}
                                                    hoverIndicator
                                                    // margin={{ right: '0px' }}
                                                    items={[
                                                        {
                                                            label: (
                                                                <Edit
                                                                    onClick={() =>
                                                                        editAccount(
                                                                            item,
                                                                        )
                                                                    }
                                                                />
                                                            ),
                                                        },
                                                        {
                                                            label: (
                                                                <Trash
                                                                    onClick={() =>
                                                                        removeAccount(
                                                                            item,
                                                                        )
                                                                    }
                                                                />
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            )}
                                            style={{
                                                maxHeight: '300px',
                                                overflow: 'scroll',
                                            }}
                                        />
                                    </Data>
                                )}
                            </div>
                        </div>
                    </Box>
                    <DataTable
                        title="Recent Uploads"
                        columns={columns}
                        data={filtered}
                        onClickRow={onClickRow}
                        actions={actions}
                    />

                    {isOpen && (
                        <ChartOfAccountsImport onClose={onClose} isOpen />
                    )}
                </AppLayout>
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const cookie = context.req.headers.cookie

    if (!cookie)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    try {
        const res = await axios.get(`/clients/${context.params.id}`, {
            headers: {
                cookie: cookie,
            },
        })
        const { data } = res

        return {
            props: { status: 200, data },
        }
    } catch (error) {
        const { status, statusText } = error.response

        return {
            props: { status, statusText },
        }
    }
}
