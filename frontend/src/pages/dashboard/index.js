import AppLayout from "@/components/Layouts/AppLayout";
import {
  Box,
  DataTable,
  Meter,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
} from "grommet";
import { DocumentStore, DocumentVerified } from "grommet-icons";

export default function Dashboard() {
  return (
      <AppLayout>
          <Grid
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
          </Grid>
          <Box className="box_container" fill>
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
                              <Box pad={{ vertical: 'xsmall' }} direction="row">
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
                                  <Text size="small" margin={{ left: '20px' }}>
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
          </Box>
      </AppLayout>
  )
}