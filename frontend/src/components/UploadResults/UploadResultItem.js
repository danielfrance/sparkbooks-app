import { TableRow, TableCell, TextInput, Select, Spinner } from 'grommet'

import { Action, Actions, Trash } from 'grommet-icons'

import { useEffect, useState } from 'react'
let timer
const timeout = 2 * 1000

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

const border = [
    {
        side: 'all',
        color: '#C767F5',
        size: 'medium',
        style: 'dotted',
    },
]
export default function UploadResultItem({ item: data, updateItems, index }) {
    // console.log(data)
    const [isUpdating, setIsUpdating] = useState(false)
    const [itemData, setItemData] = useState(data)
    const [selectValue, setSelectValue] = useState(() =>
        chartOfAccounts.find(account => account.id === itemData.category_id),
    )

    const handleInputChange = (event, index) => {
        const { name, value } = event.target

        if (name === 'amount' && isNaN(value)) return

        const updates = { ...itemData, [name]: value }

        setItemData(updates)
        update(updates)
    }

    const handleSelection = option => {
        setSelectValue(option)
        const updates = { ...itemData, category_id: option.id }
        setItemData(updates)

        if (updates.category_id) update(updates)
    }

    const update = updates => {
        clearTimeout(timer)
        setIsUpdating(false)
        const { amount, category_id, item } = updates

        if (amount && category_id && item) {
            setIsUpdating(true)
            timer = setTimeout(() => {
                updateItems(updates, 'update', () => setIsUpdating(false))
            }, timeout)
        }
    }

    const remove = () => {
        setIsUpdating(true)
        updateItems(itemData, 'remove', () => setIsUpdating(false))
    }

    useEffect(() => {
        setItemData(data)
    }, [data])

    return (
        <TableRow key={index}>
            <TableCell scope="row">
                <TextInput
                    name="item"
                    value={itemData.item || ''}
                    onChange={e => handleInputChange(e, index)}
                />
            </TableCell>
            <TableCell scope="row">
                <TextInput
                    name="sku"
                    value={itemData.sku || ''}
                    onChange={e => handleInputChange(e, index)}
                />
            </TableCell>
            <TableCell scope="row">
                <Select
                    name="category_id"
                    labelKey="name"
                    value={selectValue}
                    valueKey={{ key: 'id' }}
                    options={chartOfAccounts}
                    onChange={({ option }) => handleSelection(option)}
                />
            </TableCell>
            <TableCell scope="row">
                <TextInput
                    name="amount"
                    value={itemData.amount || ''}
                    onChange={e => handleInputChange(e, index)}
                />
            </TableCell>
            <TableCell scope="row" pad="small">
                {!isUpdating && (

                    <Trash color="status-error" size="small" onClick={remove} />
                )}
                {isUpdating && (
                    // <Spinner size="5px" margin="0" border={border} />
                    <Actions size="small" color="#C767F5" />
                )}

            </TableCell>
        </TableRow>
    )
}
