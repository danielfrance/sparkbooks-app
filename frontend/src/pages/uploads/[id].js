import { useState, useEffect } from "react";
import {
  Box,
  Button,
  DataTable,
  Grid,
  Heading,
  TableHeader,
  TableRow,
  TableCell,
  Text,
  TextInput,
  Table,
  TableBody,
  FormField,
} from "grommet";
import UploadResultContainer from "@/components/UploadResults/UploadResultContainer";
import AppLayout from "@/components/Layouts/AppLayout";

function UploadDetails({ data }) {
  const [uploadData, setuploadData] = useState(data);
  const [fileData, setFileData] = useState(Object.values(uploadData.files));

  return (
    <AppLayout>
      <Box
        className="box_container"
        alignSelf="stretch"
        // height="xsmall"
        pad="medium"
        height={{ min: "96px", max: "110px" }}
      >
        <Box direction="row" justify="between">
          <Heading margin="none" level="3" color="brand">
            View Upload Details
          </Heading>
          <Button
            secondary
            size="medium"
            label="Export Results"
            onClick={() => alert("clicked")}
          />
        </Box>
      </Box>
      {fileData.map((item, index) => (
        <UploadResultContainer data={item} index />
      ))}
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${process.env.JSON_SERVER_URL}/uploads/${id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default UploadDetails;
