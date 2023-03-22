import {
  Box,
  Button,
  Layer,
  Form,
  FileInput,
  Heading,
  Text,
  Anchor,
} from "grommet";
import { Close } from "grommet-icons";
import { useState } from "react";

export default function ChartOfAccountsImport({ isOpen, onClose }) {
  return (
    <Layer position="center" onEsc={onClose}>
      <Box pad="medium">
        <Box direction="row" justify="between" align="start">
          <Heading>Import Chart of Accounts</Heading>
          <Button icon={<Close />} onClick={onClose} />
        </Box>
        {/* TODO: add a sample chart of accounts csv  */}
        <Box>
          <Text>
            Importing a new Chart of Accounts will overwrite the existing Chart
            of Accounts. Please use <Anchor>this format</Anchor> when uploading
            a Chart of Accounts. You can edit specific items after the import.
          </Text>
          <Form>
            <Box margin={{ top: "medium", bottom: "medium" }}>
              <FileInput />
            </Box>
            <Box>
              <Button label="Import" />
            </Box>
          </Form>
        </Box>
      </Box>
    </Layer>
  );
}
