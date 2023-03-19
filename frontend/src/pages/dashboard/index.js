import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Meter, Text, Avatar } from 'grommet'
import DataTable from '@/components/Layouts/DataTable'
import { useState } from 'react'
import { useUIContext } from '@/contexts/ui'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const clientRender = datum => (
    <Box pad={{ vertical: 'xsmall' }} gap="small" direction="row">
        {/* <Avatar size="small" round="xsmall" src={src} /> */}
        <Text>{datum.client}</Text>
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
        <Text className="text-dark" margin={{ left: '20px' }}>
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
        header: <Text>Processing %</Text>,
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
            <div className="flex dashboard-header">
                <div className="flex status bg-dark text-white">
                    <img src="/processed.png" />
                    <div>
                        <span className="fs-700">120</span>
                        <span className="fs-100">Files processed</span>
                    </div>
                </div>
                <div className="flex status bg-dark text-white">
                    <img src="/pending.png" />
                    <div>
                        <span className="fs-700">880</span>
                        <span className="fs-100">Files remaining</span>
                        <span
                            className="fs-100"
                            style={{
                                marginTop: '-0.313rem',
                                textDecoration: 'underline',
                            }}>
                            Upgrade
                        </span>
                    </div>
                </div>
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

{
    /* <Box className="box_container" fill>
                <Box direction="row" justify="between">
                    <Heading margin="none" level="3" color="brand">
                        Recent Uploads
                    </Heading>
                </Box>
                <DataTable
                    sortable
                    margin={{ top: '3em' }}
                    paginate={{ step: 10 }}
                    alignSelf="stretch"
                    columns={[
                        {
                            property: 'id',
                            header: <Text>ID</Text>,
                            primary: true,
                        },
                        {
                            property: 'client',
                            header: <Text>Client</Text>,
                        },
                        {
                            property: 'files',
                            header: <Text>Files</Text>,
                        },
                        {
                            property: 'percent',
                            size: 'medium',
                            header: 'Processing %',
                            render: datum => (
                                <Box
                                    pad={{ vertical: 'xsmall' }}
                                    direction="row">
                                    <Meter
                                        values={[
                                            {
                                                value: datum.percent,
                                                color: 'brand',
                                                background: 'primary',
                                            },
                                        ]}
                                        thickness="small"
                                        size="small"
                                    />
                                    <Text
                                        size="small"
                                        margin={{ left: '20px' }}>
                                        {datum.percent}%
                                    </Text>
                                </Box>
                            ),
                        },
                    ]}
                    data={[
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                        { id: '1', client: 'Alan', files: 23, percent: 20 },
                        { id: '2', client: 'Bryan', files: 3, percent: 30 },
                        { id: '3', client: 'Chris', files: 11, percent: 40 },
                        { id: '4', client: 'Eric', files: 13, percent: 100 },
                    ]}
                />
            </Box> */
}

{
    /* <Grid
              alignSelf="stretch"
              rows={['auto', 'flex']}
              pad="medium"
              columns={['medium', 'medium']}
              justifyContent="between"
              areas={[
                  {
                      name: 'totalFiles',
                      start: [0, 1],
                      end: [0, 1],
                  },
                  { name: 'remainingFiles', start: [1, 1], end: [1, 1] },
              ]}>
              <Card
                  gridArea="totalFiles"
                  pad="medium"
                  background="brand"
                  elevation="medium"
                  gap="medium">
                  <CardBody pad="medium">
                      <Grid pad="none" columns={['xsmall', 'large']}>
                          <Box pad="small">
                              <DocumentVerified color="white" size="large" />
                          </Box>
                          <Box margin={{ left: '-1em' }}>
                              <Text color="white" size="2xl" weight="bold">
                                  120
                              </Text>
                              <Text color="white">Total Files Processed</Text>
                          </Box>
                      </Grid>
                  </CardBody>
              </Card>
              <Card
                  gridArea="remainingFiles"
                  pad="medium"
                  background="brand"
                  elevation="medium"
                  gap="medium">
                  <CardBody pad="medium">
                      <Grid pad="none" columns={['xsmall', 'large']}>
                          <Box pad="small">
                              <DocumentStore color="white" size="large" />
                          </Box>
                          <Box margin={{ left: '-1em' }}>
                              <Text color="white" size="2xl" weight="bold">
                                  880
                              </Text>
                              <Text color="white">Remaining Files</Text>
                          </Box>
                      </Grid>
                  </CardBody>
              </Card>
          </Grid> */
}
