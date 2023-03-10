import { TableRow, TableCell, TextInput, Select } from "grommet";
import { Trash } from "grommet-icons";
import { useState } from "react";

const chartOfAccounts = [
  { id: 1, name: "6110 Repairs and Maintenance" },
  { id: 2, name: "63200 Gasoline, Fuel and Oil" },
  { id: 3, name: "67800 Small Tools and Equipment" },
  { id: 4, name: "5609 Inventory Grow Supplies" },
  { id: 5, name: "8400 Ask My Accountant" },
  { id: 6, name: "64900 Office Supplies" },
  { id: 7, name: "5611 Rental Equipment" },
  { id: 8, name: "61500 Chemicals Purchased" },
  { id: 9, name: "61100 Car and Truck Expenses" },
  { id: 10, name: "5614 Soil and Nutrients" },
  { id: 11, name: "9000 Non Deductible Expenses" },
  { id: 12, name: "63000 Fertilizers and Lime" },
  { id: 13, name: "5612 Security" },
  { id: 14, name: "6101 Garbage Expense" },
  { id: 15, name: "68600 Utilities" },
  { id: 16, name: "6440 Postage and Shipping" },
  { id: 17, name: "6610 Parking and other" },
  { id: 18, name: "6620 Uniforms" },
];

export default function UploadResultItem({ item, index }) {
  const [inputValue, setInputValue] = useState(item);
  const [selectValue, setSelectValue] = useState(item.category);
  //   console.log(item);
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedInputValue = [inputValue];
    updatedInputValue[name] = value;

    setInputValue(updatedInputValue);
  };

  return (
    <TableRow key={index}>
      <TableCell scope="row">
        <TextInput
          name="description"
          value={inputValue.description}
          onChange={(e) => handleInputChange(e, index)}
        />
      </TableCell>
      <TableCell scope="row">
        <TextInput
          name="sku"
          value={inputValue.sku}
          onChange={(e) => handleInputChange(e, index)}
        />
      </TableCell>
      <TableCell scope="row">
        <Select
          name="account"
          labelKey="name"
          value={selectValue}
          valueKey={{ key: "id" }}
          options={chartOfAccounts}
          onChange={({ option }) => setSelectValue(option)}
        />
      </TableCell>
      <TableCell scope="row">
        <TextInput
          name="amount"
          value={inputValue.amount}
          onChange={(e) => handleInputChange(e, index)}
        />
      </TableCell>
      <TableCell scope="row">
        <Trash
          color="status-error"
          size="medium"
          onClick={() => alert("delete row")}
        />
      </TableCell>
    </TableRow>
  );
}
