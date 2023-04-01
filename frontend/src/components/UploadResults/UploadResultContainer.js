import { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    TextInput,
    Text,
    Spinner,
} from 'grommet'

import { Checkmark, StatusWarning } from 'grommet-icons'
import { v4 as uuidv4 } from 'uuid'

import UploadResultItem from './UploadResultItem'

import axios from '@/lib/axios'

let timer
const timeout = 3 * 1000

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
    const [correctSubtotal, setCorrectSubtotal] = useState(false)
    const [correctTotal, setCorrectTotal] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const computeCurrentTotal = () => {
        const total = lineItems.reduce(
            (cum, item) => cum + parseFloat(item.amount),
            0,
        )
        setCurrentTotal(total)
    }

    const handleInputChange = event => {
        setIsUpdating(true)
        const { name, value } = event.target

        if (
            (name === 'net_amount' ||
                name === 'total_tax_amount' ||
                name === 'total') &&
            isNaN(value)
        )
            return

        setDetails(current => {
            return { ...current, [name]: value }
        })
    }

    const updateDetails = () => {
        clearTimeout(timer)

        const formData = new FormData()
        for (const [key, value] of Object.entries(details)) {
            formData.append(key, value)
        }
        timer = setTimeout(async () => {
            console.log("let's update details...")
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
        }, timeout)
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
            upload_id: details.upload_id,
            isNew: true,
        }
        setLineItems(items => [...items, newItem])
    }

    const updateLinesItems = (item, action, callback) => {
        clearTimeout(timer)

        const formData = new FormData()
        for (const [key, value] of Object.entries(item)) {
            formData.append(key, value)
        }

        if (action === 'remove') {
            if (!item.isNew) {
                timer = setTimeout(async () => {
                    console.log('Delete exisiting item...')

                    try {
                        const res = await axios.delete(
                            `/results/${item.upload_id}/lineitem/${item.id}`,
                            formData,
                        )
                    } catch (error) {
                        console.log({ error })
                    }
                }, timeout)
            }

            setLineItems(items => items.filter(el => el.id != item.id))
        }

        if (action === 'update') {
            const index = lineItems.findIndex(el => el.id === item.id)
            lineItems[index] = item

            computeCurrentTotal()

            if (isValid) {
                let res

                timer = setTimeout(async () => {
                    if (item.isNew) {
                        console.log('add new line item...')
                        try {
                            res = await axios.post(
                                `/results/${item.upload_id}/lineitem`,
                                formData,
                            )
                        } catch (error) {
                            res = error
                        }
                    } else {
                        console.log('updatating existing item')
                        try {
                            res = await axios.post(
                                `/results/${item.upload_id}/lineitem/${item.id}`,
                                formData,
                            )
                        } catch (error) {
                            res = error
                        }
                    }
                }, timeout)
                console.log({ res })
            }
        }

        if (callback instanceof Function) callback()
    }

    useEffect(() => {
        setCorrectTotal(() => {
            return (
                parseFloat(details.total) ===
                parseFloat(details.net_amount) +
                    parseFloat(details.total_tax_amount)
            )
        })

        setCorrectSubtotal(
            () => parseFloat(details.net_amount) == parseFloat(currentTotal),
        )

        setIsValid(() => {
            return (
                correctSubtotal &&
                correctTotal &&
                details.supplier_name.trim().length > 0
            )
        })
    }, [
        currentTotal,
        details.net_amount,
        details.total_tax_amount,
        details.total,
        details.supplier_name,
    ])

    useEffect(() => {
        computeCurrentTotal()

        if (
            parseFloat(details.total) ===
                parseFloat(details.net_amount) +
                    parseFloat(details.total_tax_amount) &&
            parseFloat(details.net_amount) === parseFloat(currentTotal) &&
            details.supplier_name.trim().length > 0
        )
            updateDetails()
        else setIsUpdating(false)
    }, [
        details.net_amount,
        details.total_tax_amount,
        details.total,
        details.supplier_name,
    ])

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
                                    {correctSubtotal &&
                                        correctTotal &&
                                        !isUpdating && (
                                            <Checkmark color="green" />
                                        )}
                                    {(!correctSubtotal || !correctTotal) &&
                                        !isUpdating && (
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
                                    {correctSubtotal &&
                                        correctTotal &&
                                        !isUpdating && (
                                            <Checkmark color="green" />
                                        )}
                                    {(!correctSubtotal || !correctTotal) &&
                                        !isUpdating && (
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
