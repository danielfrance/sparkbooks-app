import { useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import {
    Grommet,
    Box,
    Button,
    DataTable,
    Meter,
    Heading,
    Text,
    Grid,
    Card,
    CardHeader,
    CardBody,
    Avatar,
} from 'grommet'
import { DocumentStore, DocumentVerified, Blank } from 'grommet-icons'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const SortableIcon = () => (
    <Blank color="text-xweak" opacity="0.3">
        <g fill="none" stroke="#000" strokeWidth="2">
            <path d="M 6 10 L 12 6 L 18 10" />
            <path d="M 6 14 L 12 18 L 18 14" />
        </g>
    </Blank>
)

const customTheme = {
    global: {
        font: {
            family: 'Inter',
        },
    },
    dataTable: {
        header: {
            color: 'text-strong',
            extend: ({ column, sort, sortable }) => `
          ${
              sortable &&
              sort &&
              sort.property !== column &&
              `
              :hover {
                svg {
                   opacity: 100%;
                }
               }
            `
          }
         `,
        },
        icons: {
            sortable: SortableIcon,
        },
    },
}

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

export default function Dashboard() {
    const [sort, setSort] = useState({
        property: 'name',
        direction: 'desc',
    })
    return (
        <AppLayout>
            <Card pad="medium" gap="small">
                <CardHeader className="title">Recent Uploads</CardHeader>
                <CardBody>
                    <Grommet theme={customTheme}>
                        <Box>
                            <DataTable
                                className="ff-sans-serif fs-300"
                                background={{
                                    body: '#FBFBFB',
                                }}
                                border={{
                                    header: {
                                        color: '#FBFBFB',
                                        side: 'bottom',
                                    },
                                }}
                                step={10}
                                paginate
                                alignSelf="stretch"
                                sort={sort}
                                onSort={setSort}
                                columns={[
                                    {
                                        property: 'id',
                                        header: <Text>Uploads</Text>,
                                        size: 'small',
                                        sortable: true,
                                        primary: true,
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
                                ]}
                                data={[
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
                                ]}
                            />
                        </Box>
                    </Grommet>
                </CardBody>
            </Card>
        </AppLayout>
    )
}
