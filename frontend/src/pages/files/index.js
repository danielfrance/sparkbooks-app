import { Box, DataTable, Heading, Text } from "grommet";
import { useState } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import AppLayout from "@/components/Layouts/AppLayout";
const { publicRuntimeConfig } = getConfig();
const { apiURL } = publicRuntimeConfig;

function Files({ files }) {
  const [allFiles, setAllFiles] = useState(files);
  const router = useRouter();

  return (
      <AppLayout>
          <Box className="box_container" fill>
              <Box direction="row" justify="between">
                  <Heading margin="none" level="3" color="brand">
                      Files
                  </Heading>
              </Box>
              <DataTable
                  margin={{ top: '3em' }}
                  sortable
                  align="center"
                  paginate={{ step: 10 }}
                  alignSelf="stretch"
                  color={{
                      hover: 'brand',
                  }}
                  columns={[
                      {
                          property: 'fileName',
                          header: <Text>File Name</Text>,
                      },
                      {
                          property: 'clientName',
                          header: <Text>Client</Text>,
                      },
                      {
                          property: 'supplierName',
                          header: <Text>Supplier Name</Text>,
                      },
                      {
                          property: 'lineItems',
                          header: <Text>Line Items</Text>,
                          render: data => {
                              return data.lineItems.length
                          },
                      },
                      {
                          property: 'totalAmount',
                          header: <Text>Total</Text>,
                      },
                      {
                          property: 'uploadName',
                          header: <Text>Upload</Text>,
                      },
                      {
                          property: 'date',
                          header: <Text>Date</Text>,
                      },
                  ]}
                  data={allFiles}
                  onClickRow={e => {
                      router.push(`/files/${e.datum.id}`)
                  }}
              />
          </Box>
      </AppLayout>
  )
}

export default Files;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.JSON_SERVER_URL}/files`);
  const files = await res.json();

  return {
    props: { files },
  };
}
