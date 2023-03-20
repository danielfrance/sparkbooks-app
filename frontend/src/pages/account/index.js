import AppLayout from '@/components/Layouts/AppLayout'
import AppBar from '@/components/Layouts/AppBar'
import {
    Box,
    Heading,
    Grid,
    Avatar,
    Card,
    CardBody,
    Text,
    Stack,
    Button,
    DataTable,
    List,
    CardFooter,
} from 'grommet'
import { FormEdit, User, Mail, Phone, Lock, Achievement } from 'grommet-icons'

export default function Client() {
    return (
        <AppLayout>
            <AppBar />
            <Box
                className="accountDetails box_container"
                alignSelf="stretch"
                margin={{ bottom: '3em' }}
                height={{ min: '440px', max: '500px' }}>
                <Box direction="row" justify="between">
                    <Heading margin="none" level="3" color="brand">
                        Account Details
                    </Heading>
                    <Button
                        secondary
                        label="Edit Info"
                        onClick={() => {
                            alert('change text fields to textinputs')
                        }}
                    />
                </Box>
                <Grid
                    alignSelf="stretch"
                    rows={['auto', 'flex']}
                    pad="medium"
                    columns={['small', 'small', 'small', 'medium']}
                    justifyContent="between"
                    margin={{ top: 'medium' }}>
                    <Box>
                        <Stack
                            alignSelf="center"
                            align="center"
                            anchor="bottom-right"
                            pad="large">
                            <Avatar
                                src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                                size="xlarge"
                            />
                            <Box
                                pad="xsmall"
                                background={{
                                    color: 'brand',
                                    opacity: 'strong',
                                }}
                                round="small">
                                <FormEdit size="medium" color="white" />
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Box
                            direction="row"
                            align="center"
                            margin={{ bottom: 'medium' }}>
                            <User
                                size="medium"
                                color="brand"
                                style={{ marginRight: '0.5em' }}
                            />
                            <Text size="medium">Daniel France</Text>
                        </Box>
                        <Box
                            direction="row"
                            align="center"
                            margin={{ bottom: 'medium' }}>
                            <Mail
                                size="medium"
                                color="brand"
                                style={{ marginRight: '0.5em' }}
                            />
                            <Text size="medium">dan@sparkbooks.io</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box
                            direction="row"
                            align="center"
                            margin={{ bottom: 'medium' }}>
                            <Phone
                                size="medium"
                                color="brand"
                                style={{ marginRight: '0.5em' }}
                            />
                            <Text size="medium">123-456-7890</Text>
                        </Box>
                        <Box
                            direction="row"
                            align="center"
                            margin={{ bottom: 'medium' }}>
                            <Lock
                                size="medium"
                                color="brand"
                                style={{ marginRight: '0.5em' }}
                            />
                            <Text size="medium">********</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Card background="brand" elevation="medium">
                            <CardBody pad="medium">
                                <Grid pad="none" columns={['xsmall', 'large']}>
                                    <Box>
                                        <Achievement
                                            color="white"
                                            size="large"
                                        />
                                    </Box>
                                    <Box margin={{ left: '-1em' }}>
                                        <Text
                                            color="white"
                                            size="xlarge"
                                            weight="bold">
                                            Gold Plan
                                        </Text>
                                        <List
                                            align="start"
                                            data={[
                                                { users: '5 Users' },
                                                { storage: '5GB Storage' },
                                                { support: '24/7 Support' },
                                                { files: '1000 Files' },
                                            ]}
                                        />
                                    </Box>
                                </Grid>
                            </CardBody>
                            <CardFooter justify="center" pad="small">
                                <Button
                                    label="Change Plan"
                                    color="white"
                                    href="https://stripe.com"
                                />
                            </CardFooter>
                        </Card>
                    </Box>
                </Grid>
            </Box>
            <Box
                className="userDetails box_container"
                alignSelf="stretch"
                margin={{ bottom: '3em' }}
                height={{ min: 'medium', max: 'xlarge' }}>
                <Box direction="row" justify="between">
                    <Heading level="3" color="brand">
                        Users
                    </Heading>
                </Box>
                <Box>
                    <DataTable
                        sortable
                        paginate={{ step: 10 }}
                        fill="vertical"
                        alignSelf="stretch"
                        onSelect={() => {
                            alert('selected')
                        }}
                        background={{
                            body: ['white', 'light-2'],
                            footer: { dark: 'light-2', light: 'dark-3' },
                        }}
                        columns={[
                            {
                                property: 'name',
                                header: <Text>Name</Text>,
                            },
                            {
                                property: 'email',
                                header: <Text>Email</Text>,
                            },
                            {
                                property: 'type',
                                header: <Text>Type</Text>,
                            },
                            {
                                property: 'active',
                                header: <Text>Last Active</Text>,
                            },
                        ]}
                        data={[
                            {
                                name: 'Daniel France',
                                email: 'dan@ittybam.com',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                            {
                                name: 'Daniel France',
                                email: '',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                            {
                                name: 'Daniel France',
                                email: '',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                            {
                                name: 'Daniel France',
                                email: '',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                            {
                                name: 'Daniel France',
                                email: '',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                            {
                                name: 'Daniel France',
                                email: '',
                                type: 'Admin',
                                joined: '12/12/2019',
                                active: '12/12/2019',
                                avatar:
                                    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
                            },
                        ]}
                    />
                </Box>
            </Box>
        </AppLayout>
    )
}
