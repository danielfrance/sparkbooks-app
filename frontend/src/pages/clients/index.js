import { useState } from "react";
import { useRouter } from "next/router";
import { Anchor, Box, Button, DataTable, Heading, Text } from "grommet";
import { StatusGood, CircleAlert, FormEdit } from "grommet-icons";
import NewClientLayer from "./NewClientLayer";
import AppLayout from "@/components/Layouts/AppLayout";

const clientData = [
  {
    id: 1,
    name: "Random Client Name like this one",
    uploads: 10,
    files: 100,
    connected: <StatusGood size="medium" color="status-ok" />,
  },
  {
    id: 2,
    name: "Client 2",
    uploads: 10,
    files: 100,
    connected: <CircleAlert size="medium" color="status-error" />,
  },
  {
    id: 3,
    name: "Client 3",
    uploads: 10,
    files: 100,
    connected: <StatusGood size="medium" color="status-ok" />,
  },
  {
    id: 4,
    name: "Client 4",
    uploads: 10,
    files: 100,
    connected: <CircleAlert size="medium" color="status-error" />,
  },
  {
    id: 5,
    name: "Client 5",
    uploads: 10,
    files: 100,
    connected: <StatusGood size="medium" color="status-ok" />,
  },
];

const clientEdit = (id) => {};

export default function Clients() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
      <AppLayout>
          <Box className="box_container" fill>
              <Box direction="row" justify="between">
                  <Heading margin="none" level="3" color="brand">
                      Clients
                  </Heading>
                  <Button secondary label="New Client" onClick={onOpen} />
              </Box>
              <DataTable
                  margin={{ top: '3em' }}
                  sortable
                  paginate={{ step: 10 }}
                  alignSelf="stretch"
                  background={{
                      body: ['white', 'light-2'],
                      footer: { dark: 'light-2', light: 'dark-3' },
                  }}
                  columns={[
                      {
                          property: 'name',
                          header: <Text>Client Name</Text>,
                      },
                      {
                          property: 'uploads',
                          header: <Text>Total Uploads</Text>,
                      },
                      {
                          property: 'files',
                          header: <Text>Total Files</Text>,
                      },
                      {
                          property: 'connected',
                          align: 'center',
                          header: <Text>Accounting Software</Text>,
                      },
                  ]}
                  data={clientData}
                  onClickRow={({ datum }) => {
                      router.push(`/clients/edit/${datum.id}`)
                  }}
              />
          </Box>
          {isOpen && <NewClientLayer onClose={onClose} isOpen />}
      </AppLayout>
  )
}
