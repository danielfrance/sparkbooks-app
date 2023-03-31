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

import axios from '@/lib/axios'

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

    let timer

    const handleInputChange = event => {
        clearTimeout(timer)

        const { name, value } = event.target
        setDetails(current => {
            return { ...current, [name]: value }
        })

        if (
            correctSubtotal() &&
            correctTotal() &&
            details.supplier_name.trim().length
        ) {
            console.log("let's update details...")

            const formData = new FormData()
            for (const [key, value] of Object.entries(details)) {
                formData.append(key, value)
            }
            setIsUpdating(true)
            timer = setTimeout(async () => {
                try {
                    const res = await axios.post(
                        `/results/${details.upload_id}/details/${details.result_id}`,
                        formData,
                    )

                    console.log({ data: res.data })
                } catch (error) {
                    console.log({ error })
                }

                setIsUpdating(false)
            }, 3000)
        } else {
            console.log("we can't update details...")
        }
    }

    console.log({ details })
    const addLineItem = () => {
        const newItem = {
            id: uuidv4(),
            amount: 0,
            category_id: '',
            item: '',
            sku: '',
            client_id: details.client_id,
            result_id: details.result_id,
            upload_id: details.upload_id,
            isNew: true,
        }
        setLineItems(items => [...items, newItem])
    }

    const updateLinesItems = (item, action, callback) => {
        clearTimeout(timer)

        const isValid =
            correctSubtotal() &&
            correctTotal() &&
            details.supplier_name.trim().length

        const formData = new FormData()
        for (const [key, value] of Object.entries(item)) {
            formData.append(key, value)
        }

        if (action === 'remove' && item.isNew)
            setLineItems(items => items.filter(el => el.id != item.id))
        else if (action === 'remove' && !item.isNew) {
            timer = setTimeout(() => {
                console.log('Delete exisiting item...')

                try {
                    const res = axios.delete(
                        `/results/${item.upload_id}/lineitem/${item.id}`,
                        formData,
                    )
                } catch (error) {
                    console.log({ newItemError: error })
                }
            }, 3000)
        } else if (action === 'update' && isValid) {
            timer = setTimeout(async () => {
                if (item.isNew) {
                    console.log('add new line item...')
                    try {
                        const res = axios.post(
                            `/results/${item.upload_id}/lineitem`,
                            formData,
                        )
                    } catch (error) {
                        console.log({ newItemError: error })
                    }
                } else {
                    console.log('updatating existing item')
                    try {
                        const res = axios.post(
                            `/results/${item.upload_id}/lineitem/${item.id}`,
                            formData,
                        )
                    } catch (error) {
                        console.log({ newItemError: error })
                    }
                }
            }, 3000)
        }

        const index = lineItems.findIndex(el => el.id === item.id)
        console.log({ index, lineItems, item })

        if (index >= 0) {
            lineItems[index] = item
            setLineItems(lineItems)
        }

        computeCurrentTotal()
        if (callback instanceof Function) callback()
    }

    useEffect(() => computeCurrentTotal(), [lineItems])

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
