import { useState } from "react";
import getConfig from "next/config";
import { Box, Heading, Button } from "grommet";
import UploadResultContainer from "@/components/UploadResults/UploadResultContainer";
import AppLayout from "@/components/Layouts/AppLayout";

const { publicRuntimeConfig } = getConfig();
const { apiURL } = publicRuntimeConfig;

export default function File({ data }) {
  const [fileData, setFileData] = useState(data);

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
            View {fileData.fileName} details
          </Heading>
        </Box>
      </Box>
      <UploadResultContainer data={fileData} index />
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${process.env.JSON_SERVER_URL}/files/${id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}
