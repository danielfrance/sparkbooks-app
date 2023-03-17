import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import { useState } from 'react'
import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        <Avatar size="small" round="xsmall" src={src} />
        <Text size="small">{datum.client}</Text>
    </Box>
)

const processingDataRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} direction="row">
        <Meter
            values={[
                {
                    value: datum.percent,
                    color: '#4112fb',
                    background: '#ECECEC',
                },
            ]}
            thickness="xsmall"
            round
        />
        <Text className="text-dark" size="small" margin={{ left: '20px' }}>
            {datum.percent}%
        </Text>
    </Box>
)

const columns = [
    {
        property: 'id',
        header: <Text>Uploads</Text>,
        size: 'small',
        // sortable: true,
        // primary: true,
    },
    {
        property: 'client',
        size: 'medium',
        header: <Text>Client</Text>,
        render: clientRender,
    },
    {
        property: 'files',
        size: 'medium',
        header: <Text>Files</Text>,
    },
    {
        property: 'percent',
        size: 'medium',
        header: 'Processing %',
        render: processingDataRender,
    },
]
const data = [
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
    {
        id: '1',
        client: 'Alan',
        files: 23,
        percent: 20,
    },
    {
        id: '2',
        client: 'Bryan',
        files: 3,
        percent: 30,
    },
    {
        id: '3',
        client: 'Chris',
        files: 11,
        percent: 40,
    },
    {
        id: '4',
        client: 'Eric',
        files: 13,
        percent: 100,
    },
]

export default function Dashboard() {
    const [selected, setSelected] = useState()
    const onClickRow = datum => console.log(datum)
    const actions = [
        // { label: 'Add', onClick: e => console.log(e) },
        // { label: 'Edit', onClick: e => console.log(e) },
    ]

    const { filterQuery } = useUIContext()

    const filtered = data.filter(datum =>
        datum.client.toLocaleLowerCase().includes(filterQuery),
    )

    return (
        <AppLayout>
            <div className="inline-grid dashboard-header">
                <div className="status bg-dark text-white">1</div>
                <div className="status bg-dark text-white">1</div>
                <div className="plan-details bg-white">1</div>
            </div>
            <DataTable
                title="Recent Uploads"
                columns={columns}
                data={filtered}
                setSelected={setSelected}
                onClickRow={onClickRow}
                actions={actions}
            />
        </AppLayout>
    )
}
