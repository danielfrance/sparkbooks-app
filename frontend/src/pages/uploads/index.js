import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  DataTable,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
  Button,
  Anchor,
  Meter,
} from "grommet";
import {
  DocumentStore,
  DocumentVerified,
  StatusGood,
  CircleAlert,
  FormEdit,
} from "grommet-icons";
// TODO: remove this
import getConfig from "next/config";
import AppLayout from "@/components/Layouts/AppLayout";
const { publicRuntimeConfig } = getConfig();
const { apiURL } = publicRuntimeConfig;

function Uploads({ data }) {
  const [allUploads, setAllUploads] = useState(data);
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState({});
  const router = useRouter();

  return (
      <AppLayout>
          <Box className="box_container" fill>
              <Box direction="row" justify="between">
                  <Heading margin="none" level="3" color="brand">
                      Uploads
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
                          property: 'id',
                          header: <Text>ID</Text>,
                      },
                      {
                          property: 'client',
                          header: <Text>Client</Text>,
                      },
                      {
                          property: 'files',
                          header: <Text>Files</Text>,
                          render: datum => (
                              <Text>{Object.keys(datum.files).length}</Text>
                          ),
                      },
                      {
                          property: 'percent',
                          size: 'medium',
                          header: 'Processing %',
                          render: datum => (
                              <Box
                                  pad={{ vertical: 'xsmall' }}
                                  direction="row"
                                  fill>
                                  <Meter
                                      values={[
                                          {
                                              value: datum.percent,
                                              color: 'brand',
                                              background: 'primary',
                                          },
                                      ]}
                                      thickness="small"
                                      size="small"
                                  />
                                  <Text size="small" margin={{ left: '20px' }}>
                                      {datum.percent}%
                                  </Text>
                              </Box>
                          ),
                      },
                  ]}
                  data={allUploads}
                  onClickRow={e => {
                      router.push(`uploads/${e.datum.id}`)
                  }}
              />
          </Box>
      </AppLayout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.JSON_SERVER_URL}/uploads`)
  const data = await res.json();

  return {
    props: { data },
  };
}

export default Uploads;
