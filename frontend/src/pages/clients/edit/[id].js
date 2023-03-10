import AppLayout from "@/components/Layouts/AppLayout";
import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Heading,
  TextInput,
  Select,
  DataTable,
  Text,
  Meter,
  FileInput,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  Toolbar,
  List,
  Data,
  Menu,
} from "grommet";
import { SettingsOption } from "grommet-icons";

import { useState } from "react";
import ChartOfAccountsImport from "./chartOfAccountsModal";

export default function ClientEdit({ client }) {
  const [value, setValue] = useState("OK");
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const chartData = [
    { id: 1, name: "Repairs and Maintenance", code: "6110" },
    { id: 2, name: "Gasoline, Fuel and Oil", code: "63200" },
    { id: 3, name: "Small Tools and Equipment", code: "67800" },
    { id: 4, name: "Inventory Grow Supplies", code: "5609" },
    { id: 5, name: "Ask My Accountant", code: "8400" },
    { id: 6, name: "Office Supplies", code: "64900" },
    { id: 7, name: "Rental Equipment", code: "5611" },
    { id: 8, name: "Chemicals Purchased", code: "61500" },
    { id: 9, name: "Car and Truck Expenses", code: "61100" },
    { id: 10, name: "Soil and Nutrients", code: "5614" },
    { id: 11, name: "Non Deductible Expenses", code: "9000" },
    { id: 12, name: "Fertilizers and Lime", code: "63000" },
    { id: 13, name: "Security", code: "5612" },
    { id: 14, name: "Garbage Expense", code: "6101" },
    { id: 15, name: "Utilities", code: "68600" },
    { id: 16, name: "Postage and Shipping", code: "6440" },
    { id: 17, name: "Parking and other", code: "6610" },
    { id: 18, name: "Uniforms", code: "6620" },
  ];

  return (
      <AppLayout>
          <Box className="box_container" fill height={{ min: '555px' }}>
              <Box direction="row" justify="between">
                  <Heading level="3" color="brand">
                      Edit Client NAME
                  </Heading>
              </Box>
              <Grid columns={['2/3', '1/3']} gap="medium">
                  <Box direction="row" fill>
                      <Form>
                          <Box margin={{ bottom: '1em' }}>
                              <FormField name="name" label="Name">
                                  <TextInput name="name" />
                              </FormField>
                          </Box>
                          <Grid
                              rows={'small'}
                              alignSelf="stretch"
                              columns={'1/3'}
                              gap="large">
                              <Box>
                                  <FormField name="email" label="Email">
                                      <TextInput name="email" />
                                  </FormField>
                                  <FormField
                                      name="address"
                                      label="Street Address">
                                      <TextInput name="address" />
                                  </FormField>
                              </Box>
                              <Box>
                                  <FormField name="phone" label="Phone">
                                      <TextInput name="phone" />
                                  </FormField>
                                  <FormField name="city" label="City">
                                      <TextInput name="city" />
                                  </FormField>
                              </Box>
                              <Box>
                                  <FormField
                                      name="poc"
                                      label="Point of Contact">
                                      <TextInput name="poc" />
                                  </FormField>
                                  <FormField name="state" label="State">
                                      <Select
                                          options={[
                                              'AL',
                                              'CA',
                                              'NY',
                                              'OK',
                                              'TX',
                                              'WY',
                                          ]}
                                          value={value}
                                          onChange={({ option }) =>
                                              setValue(option)
                                          }
                                      />
                                  </FormField>
                              </Box>
                          </Grid>
                          <Box
                              direction="row"
                              justify="end"
                              margin={{ top: '1em' }}>
                              <Button type="submit" label="Save" secondary />
                          </Box>
                      </Form>
                  </Box>
                  <Box fill>
                      <Box margin={{ bottom: 'small' }}>
                          <Text>Chart of Accounts</Text>
                      </Box>
                      <Data data={chartData}>
                          <Toolbar>
                              <DataSearch />
                              <Menu
                                  label={<SettingsOption />}
                                  items={[{ label: 'Import', onClick: onOpen }]}
                              />
                          </Toolbar>
                          <DataSummary />
                          {/* TODO: onclick, this item should be editable. off click will save the updated value */}
                          <List
                              primaryKey="name"
                              secondaryKey="code"
                              style={{ maxHeight: '400px', overflow: 'scroll' }}
                          />
                      </Data>
                  </Box>
              </Grid>
          </Box>

          <Box
              className="box_container"
              fill
              margin={{ top: '3em' }}
              height={{ min: '650px' }}>
              <Box
                  direction="row"
                  justify="between"
                  margin={{ bottom: 'medium' }}>
                  <Heading margin="none" level="3" color="brand">
                      Recent Uploads
                  </Heading>
                  <FileInput
                      name="file"
                      multiple
                      onChange={event => {
                          const fileList = event.target.files
                          for (let i = 0; i < fileList.length; i += 1) {
                              const file = fileList[i]
                          }
                      }}
                  />
              </Box>
              <DataTable
                  sortable
                  paginate={{ step: 10 }}
                  alignSelf="stretch"
                  background={{
                      body: ['white', 'light-2'],
                      footer: { dark: 'light-2', light: 'dark-3' },
                  }}
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
          {isOpen && <ChartOfAccountsImport onClose={onClose} isOpen />}
      </AppLayout>
  )
}
