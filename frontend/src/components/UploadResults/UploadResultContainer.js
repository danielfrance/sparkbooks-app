import { useState } from "react";
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
} from "grommet";

import { Add } from "grommet-icons";

import UploadResultItem from "./UploadResultItem";

// TODO: remove this
import getConfig from "next/config";

const styleButton = {
  width: "15rem",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 5px 10px rgba(199, 103, 245, 0.15)",
  borderRadius: "18px",
  color: "#b01df4",
  border: "#c866f567 1px solid",
};

export default function UploadResultContainer({ data, index }) {
  const [uploadData, setuploadData] = useState(data);
  const [lineItems, setLineItems] = useState(
    Object.values(uploadData.lineItems)
  );

  // TODO REMOVE THIS
  const { publicRuntimeConfig } = getConfig();
  const { pdfURL } = publicRuntimeConfig;

  return (
    <Box className="box_container" margin={{ top: "medium" }} fill>
      <Box
        direction="row"
        justify="between"
        margin={{ top: "medium" }}
        height={{ min: "50px", max: "90px" }}
      >
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
          onClick={() => alert("add new line item")}
        />
      </Box>
      <Grid direction="row" margin={{ top: "3em" }} columns={["1/3", "2/3"]}>
        <Box height={{ min: "large" }}>
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
              <TableRow key={`${index}-subtotal`}>
                <TableCell scope="row"></TableCell>
                <TableCell scope="row"></TableCell>
                <TableCell scope="row">
                  <Text color="brand" weight="bold">
                    Subtotal:
                  </Text>
                </TableCell>
                <TableCell scope="row">
                  <TextInput name="subTotal" value="2342.23" />
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
                  <TextInput name="subTotal" value="2342.23" />
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
                  <TextInput name="subTotal" value="2342.23" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Box>
  );
}
