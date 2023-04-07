import AppBar from '@/components/Layouts/AppBar'
import AppLayout from '@/components/Layouts/AppLayout'
import {
    Box,
    Button,
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
import { SettingsOption, More, Trash, Edit } from 'grommet-icons'

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

// [
//         { id: 1, name: 'Repairs and Maintenance', code: '6110' },
//         { id: 2, name: 'Gasoline, Fuel and Oil', code: '63200' },
//         { id: 3, name: 'Small Tools and Equipment', code: '67800' },
//         { id: 4, name: 'Inventory Grow Supplies', code: '5609' },
//         { id: 5, name: 'Ask My Accountant', code: '8400' },
//         { id: 6, name: 'Office Supplies', code: '64900' },
//         { id: 7, name: 'Rental Equipment', code: '5611' },
//         { id: 8, name: 'Chemicals Purchased', code: '61500' },
//         { id: 9, name: 'Car and Truck Expenses', code: '61100' },
//         { id: 10, name: 'Soil and Nutrients', code: '5614' },
//         { id: 11, name: 'Non Deductible Expenses', code: '9000' },
//         { id: 12, name: 'Fertilizers and Lime', code: '63000' },
//         { id: 13, name: 'Security', code: '5612' },
//         { id: 14, name: 'Garbage Expense', code: '6101' },
//         { id: 15, name: 'Utilities', code: '68600' },
//         { id: 16, name: 'Postage and Shipping', code: '6440' },
//         { id: 17, name: 'Parking and other', code: '6610' },
//         { id: 18, name: 'Uniforms', code: '6620' },
//     ]

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
    console.log({ data, status, statusText })
    const router = useRouter()
    // const [value, setValue] = useState(data.client.state)
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    const [chartData, setChartData] = useState([])
    const [add, setAdd] = useState(false)
    const [client, setClient] = useState()
    // console.log({ client })
    const [uploads, setUploads] = useState([])
    const { filterQuery } = useUIContext()
    const [isUnvailable, setIsUnvailable] = useState(false)

    const handleClientInput = event => {
        const { name, value } = event.target

        setClient(currentValue => ({ ...currentValue, [name]: value }))
    }

    const handleClientCitySelection = option =>
        setClient(currentValue => ({ ...currentValue, state: option }))

    const submitClientData = async () => {
        const { id, name, email, phone } = client
        if (!id || !name || !email) return

        try {
            console.log({ client })

            const data = new FormData()

            for (const [key, value] of Object.entries(client))
                if (key !== 'categories' && key !== 'id')
                    data.append(key, value)

            console.log({ data })

            // FIXME: Returning 422 ??
            const res = await axios.put(`/clients/${id}`, data)

            console.log({ res })
        } catch (error) {
            console.log({ error })
        }
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
                code: el.detail,
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
                            <div className="panel">
                                <Box
                                    margin={{ bottom: 'small' }}
                                    direction="row"
                                    justify="between">
                                    <Text>Chart of Accounts</Text>
                                    {!add && (
                                        <div>
                                            <button
                                                className="btn secondary inverse small"
                                                onClick={() => setAdd(true)}>
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
                                            <FormField name="name" label="Name">
                                                <TextInput
                                                    name="account"
                                                    // value={client?.name || ''}
                                                    // onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <FormField name="code" label="code">
                                                <TextInput
                                                    name="code"
                                                    // value={client?.name || ''}
                                                    // onChange={handleClientInput}
                                                />
                                            </FormField>
                                            <Box
                                                direction="row"
                                                gap="medium"
                                                alignSelf="end"
                                                margin={{ top: '1em' }}>
                                                <button
                                                    className="btn  inverse small"
                                                    onClick={() =>
                                                        setAdd(false)
                                                    }>
                                                    Cancel
                                                </button>
                                                <button className="btn primary inverse small">
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
                                            secondaryKey="code"
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
                                                        { label: <Edit /> },
                                                        { label: <Trash /> },
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
