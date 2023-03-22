import { useState } from 'react'
import {
    Box,
    Grid,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Select,
    FormField,
    TextInput,
    Button,
    Text,
} from 'grommet'

import { Add, Close } from 'grommet-icons'

import UploadResultItem from './UploadResultItem'

// TODO: remove this
import getConfig from 'next/config'

const styleButton = {
    width: '15rem',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 5px 10px rgba(199, 103, 245, 0.15)',
    borderRadius: '18px',
    color: '#b01df4',
    border: '#c866f567 1px solid',
}

const chartOfAccounts = [
    { id: 1, name: '6110 Repairs and Maintenance' },
    { id: 2, name: '63200 Gasoline, Fuel and Oil' },
    { id: 3, name: '67800 Small Tools and Equipment' },
    { id: 4, name: '5609 Inventory Grow Supplies' },
    { id: 5, name: '8400 Ask My Accountant' },
    { id: 6, name: '64900 Office Supplies' },
    { id: 7, name: '5611 Rental Equipment' },
    { id: 8, name: '61500 Chemicals Purchased' },
    { id: 9, name: '61100 Car and Truck Expenses' },
    { id: 10, name: '5614 Soil and Nutrients' },
    { id: 11, name: '9000 Non Deductible Expenses' },
    { id: 12, name: '63000 Fertilizers and Lime' },
    { id: 13, name: '5612 Security' },
    { id: 14, name: '6101 Garbage Expense' },
    { id: 15, name: '68600 Utilities' },
    { id: 16, name: '6440 Postage and Shipping' },
    { id: 17, name: '6610 Parking and other' },
    { id: 18, name: '6620 Uniforms' },
]

export default function UploadResultContainer({ data }) {
    const [selectValue, setSelectValue] = useState()
    const [isLineItemFormVisible, setIsLineItemFormVisible] = useState(false)
    const [uploadData, setuploadData] = useState(data)
    const [lineItems, setLineItems] = useState(
        Object.values(uploadData.lineItems),
    )

    // TODO REMOVE THIS
    const { publicRuntimeConfig } = getConfig()
    const { pdfURL } = publicRuntimeConfig

    return (
        <Box className="box_container" margin={{ top: 'medium' }} fill>
            <Box
                direction="row"
                justify="between"
                margin={{ top: 'medium' }}
                height={{ min: '50px', max: '90px' }}>
                <TextInput
                    name="supplierName"
                    value={uploadData.supplierName}
                    width="medium"
                    margin="none"
                />
                <Button
                    fill="false"
                    plain="true"
                    style={styleButton}
                    icon={<Add color="#b01df4" />}
                    label="New Line Item"
                    onClick={() => setIsLineItemFormVisible(true)}
                />
            </Box>
            <Grid
                direction="row"
                margin={{ top: '3em' }}
                columns={['1/3', '2/3']}>
                <Box height={{ min: 'large' }}>
                    <embed
                        src={pdfURL}
                        height="100%"
                        // min-height="500px"
                    />
                </Box>
                <Box align="start">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope="col" border="bottom">
                                    Line Item
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    SKU
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Category
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineItems.map((item, index) => (
                                <UploadResultItem item={item} index={index} />
                            ))}
                            {isLineItemFormVisible && (
                                <TableRow
                                    style={{ border: '#CB5DFE solid 1px' }}
                                    key={`${data.id}-new-line-item`}>
                                    <TableCell scope="row">
                                        <TextInput
                                            name="description"
                                            value={0}
                                            onChange={e =>
                                                handleInputChange(e, index)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell scope="row">
                                        <TextInput
                                            name="sku"
                                            value={0}
                                            onChange={e =>
                                                handleInputChange(e, index)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell scope="row">
                                        <Select
                                            name="account"
                                            labelKey="name"
                                            value={selectValue}
                                            valueKey={{ key: 'id' }}
                                            options={chartOfAccounts}
                                            onChange={({ option }) =>
                                                setSelectValue(option)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell scope="row">
                                        <TextInput name="subTotal" value="0" />
                                    </TableCell>
                                    <TableCell scope="row">
                                        <Close
                                            color="status-error"
                                            size="medium"
                                            onClick={() =>
                                                setIsLineItemFormVisible(false)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow key={`${data.id}-subtotal`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Subtotal:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="subTotal"
                                        value="2342.23"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${data.id}-tax`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Tax:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="subTotal"
                                        value="2342.23"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${data.id}-total`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Total:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="subTotal"
                                        value="2342.23"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Grid>
        </Box>
    )
}
