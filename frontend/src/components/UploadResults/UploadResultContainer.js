import { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    FormField,
    TextInput,
    Button,
    Text,
    Spinner,
} from 'grommet'

import { Checkmark, StatusWarning } from 'grommet-icons'
import { v4 as uuidv4 } from 'uuid'

import UploadResultItem from './UploadResultItem'

const border = [
    {
        side: 'all',
        color: '#C767F5',
        size: 'medium',
        style: 'dotted',
    },
]

export default function UploadResultContainer({ data, index }) {
    const { result_items, result_details, imageURL } = data
    const [isUpdating, setIsUpdating] = useState(false)
    const [lineItems, setLineItems] = useState(result_items)
    const [currentTotal, setCurrentTotal] = useState(0)

    const [details, setDetails] = useState(result_details)

    const correctTotal = () => {
        return (
            parseFloat(details.total) ===
            parseFloat(currentTotal) + parseFloat(details.total_tax_amount)
        )
    }

    const correctSubtotal = () =>
        parseFloat(details.net_amount) === parseFloat(currentTotal)

    const computeCurrentTotal = () => {
        const total = lineItems.reduce(
            (cum, item) => cum + parseFloat(item.amount),
            0,
        )
        setCurrentTotal(total)
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setDetails(current => {
            return { ...current, [name]: value }
        })

        submit()
    }

    const submit = () => {
        let timer
        clearTimeout(timer)
        setIsUpdating(false)

        // TODO: Submit to the server
    }

    const addLineItem = () => {
        const newItem = {
            id: uuidv4(),
            amount: 0,
            category_id: '',
            item: '',
            sku: '',
            client_id: details.client_id,
            result_id: details.result_id,
            isNew: true,
        }
        setLineItems(items => [...items, newItem])
    }

    const updateLinesItems = (index, item, action, callback) => {
        console.log({ index, item, lineItems })
        if (action === 'remove' && item.isNew)
            setLineItems(items => items.filter(el => el.id != item.id))
        else {
            // TODO: Update the backend and update lineItems with result
            lineItems.splice(index, 1, item)
        }

        if (callback instanceof Function) {
            setTimeout(() => {
                callback()
                computeCurrentTotal()
            }, 2000)
        }
    }

    useEffect(() => computeCurrentTotal(), [])

    return (
        <Box className="box_container" margin={{ top: 'medium' }} fill>
            <Box
                direction="row"
                justify="between"
                margin={{ top: 'medium' }}
                height={{ min: '50px', max: '90px' }}>
                <Box direction="row" gap="small">
                    <TextInput
                        name="supplier_name"
                        value={details.supplier_name}
                        onChange={e => handleInputChange(e)}
                        width="medium"
                        margin="none"
                    />

                    {isUpdating && (
                        <Spinner
                            size="xsmall"
                            margin={{ top: 'xsmall' }}
                            border={border}
                        />
                    )}
                </Box>

                <button
                    className="btn secondary inverse"
                    style={{ width: '30%' }}
                    onClick={addLineItem}>
                    New Line Item
                </button>
            </Box>
            <Grid
                direction="row"
                gap="small"
                margin={{ top: '3em' }}
                columns={['1/3', '2/3']}>
                <Box height={{ min: 'large' }}>
                    <embed src={imageURL} height="100%" />
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
                                <UploadResultItem
                                    item={item}
                                    index={index}
                                    updateItems={updateLinesItems}
                                    key={index}
                                />
                            ))}
                            <TableRow key={`${index}-subtotal`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Subtotal:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="net_amount"
                                        value={details.net_amount || ''}
                                        onChange={e =>
                                            handleInputChange(e, index)
                                        }
                                    />
                                </TableCell>
                                <TableCell scope="row">
                                    {isUpdating && (
                                        <Spinner
                                            size="xsmall"
                                            border={border}
                                        />
                                    )}
                                    {correctSubtotal() && !isUpdating && (
                                        <Checkmark color="green" />
                                    )}
                                    {!correctSubtotal() && !isUpdating && (
                                        <StatusWarning
                                            size="large"
                                            color="red"
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${index}-tax`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Tax:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="total_tax_amount"
                                        value={details.total_tax_amount || ''}
                                        onChange={e =>
                                            handleInputChange(e, index)
                                        }
                                    />
                                </TableCell>
                                <TableCell scope="row">
                                    {isUpdating && (
                                        <Spinner
                                            size="xsmall"
                                            border={border}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${index}-total`}>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row"></TableCell>
                                <TableCell scope="row">
                                    <Text color="brand" weight="bold">
                                        Total:
                                    </Text>
                                </TableCell>
                                <TableCell scope="row">
                                    <TextInput
                                        name="total"
                                        value={details.total || ''}
                                        onChange={e =>
                                            handleInputChange(e, index)
                                        }
                                    />
                                </TableCell>
                                <TableCell scope="row">
                                    {isUpdating && (
                                        <Spinner
                                            size="xsmall"
                                            border={border}
                                        />
                                    )}
                                    {correctTotal() && !isUpdating && (
                                        <Checkmark color="green" />
                                    )}
                                    {!correctTotal() && !isUpdating && (
                                        <StatusWarning
                                            size="large"
                                            color="red"
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Grid>
        </Box>
    )
}
