import { TableRow, TableCell, TextInput, Select, Spinner } from 'grommet'

import { Action, Actions, Trash } from 'grommet-icons'

import { useEffect, useState } from 'react'
let timer
const timeout = 2 * 1000

export default function UploadResultItem({
    item: data,
    updateItems,
    index,
    categories,
}) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [itemData, setItemData] = useState([])
    const [options, setOptions] = useState([])
    const [selectValue, setSelectValue] = useState([])

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
        setOptions(categories)
    }, [data, categories])

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
                    labelKey={option =>
                        `${option.detail.trim()} ${option.name.trim()}`
                    }
                    value={selectValue}
                    valueKey={{ key: 'id' }}
                    options={options}
                    onChange={({ option }) => handleSelection(option)}
                    onClose={() => setOptions(categories)}
                    onSearch={text => {
                        const escapedText = text.replace(
                            /[-\\^$*+?.()|[\]{}]/g,
                            '\\$&',
                        )
                        const exp = new RegExp(escapedText, 'i')
                        setOptions(
                            categories.filter(
                                category =>
                                    exp.test(category.name) ||
                                    exp.test(category.detail),
                            ),
                        )
                    }}
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
