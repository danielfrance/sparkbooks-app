import { useState } from "react";

import { Close, StatusGood } from "grommet-icons";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Select,
  TextInput,
} from "grommet";

const NewClientLayer = ({ client, isOpen, onClose }) => {
  return (
    <>
      <Layer
        className="modalLayer"
        position="right"
        full="vertical"
        modal
        onClickOutside={onClose}
        onEsc={onClose}
      >
        <Box fill="vertical" overflow="auto" width="medium" pad="medium">
          <Form
            validate="blur"
            onReset={(event) => console.log(event)}
            onSubmit={({ value }) => console.log("Submit", value)}
          >
            <Box flex={false} direction="row" justify="between">
              <Heading level={2} margin="none">
                Add Client
              </Heading>
              <Button icon={<Close />} onClick={onClose} />
            </Box>
            <FormField
              name="name"
              label="Client Name"
              required
              validate={[
                { regexp: /^[a-z]/i },
                (name) => {
                  if (name && name.length === 1) {
                    return "must be >1 character";
                  }
                  return undefined;
                },
                (name) => {
                  if (name === "good") {
                    return {
                      message: (
                        <Box align="end">
                          <StatusGood />
                        </Box>
                      ),
                      status: "info",
                    };
                  }
                },
              ]}
            />
            <FormField name="email" label="Email" required>
              <TextInput name="email" type="email" />
            </FormField>
            <Box flex={false} as="footer" align="start">
              <Button type="submit" label="submit" onClick={onClose} primary />
            </Box>
          </Form>
        </Box>
      </Layer>
    </>
  );
};

export default NewClientLayer;
