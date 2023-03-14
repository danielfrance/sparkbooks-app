import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useUIContext } from '@/contexts/ui'
import { Avatar, Button, Box, Nav, Text, Sidebar } from 'grommet'
import {
    Group,
    Upload,
    Copy,
    AppsRounded,
    Logout,
    FormNext,
    FormPrevious,
} from 'grommet-icons'
import ApplicationLogo from '@/components/ApplicationLogo'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const SidebarHeader = () => {
    const { isSidebarNavCollapsed } = useUIContext()

    return (
        <Box
            direction="row"
            pad={{ top: 'medium', horizontal: 'medium' }}
            gap="none">
            <Avatar size="medium">
                <ApplicationLogo />
            </Avatar>
            {!isSidebarNavCollapsed && (
                <Text
                    size="medium"
                    color="white"
                    style={{ paddingTop: '16px' }}>
                    Sparkbooks
                </Text>
            )}
        </Box>
    )
}

const SidebarButton = ({ icon, label, color, path, ...rest }) => {
    const { isSidebarNavCollapsed } = useUIContext()

    return (
        <Link href={path}>
            <Button onClick={() => {}} hoverIndicator={{ color: '#466EC7' }}>
                <Box
                    margin={{ vertical: 'none', horizontal: 'small' }}
                    pad={{ right: 'small', vertical: 'small' }}
                    direction="row"
                    align="center"
                    gap="small">
                    {icon}
                    {!isSidebarNavCollapsed && (
                        <Text size="medium" color="white">
                            {label}
                        </Text>
                    )}
                </Box>
            </Button>
        </Link>
    )
}

const TaggleButton = () => {
    const { isSidebarNavCollapsed, setIsSidebarNavCollapsed } = useUIContext()

    return (
        <>
            {!isSidebarNavCollapsed ? (
                <Box
                    alignSelf="end"
                    pad={{ left: 'none' }}
                    margin={{ right: 'none' }}>
                    <Button
                        margin={{ right: '-25px' }}
                        alignSelf="end"
                        icon={<FormPrevious color="#C767F5" size={'large'} />}
                        onClick={() => {
                            setIsSidebarNavCollapsed(!isSidebarNavCollapsed)
                        }}
                    />
                </Box>
            ) : (
                <Box>
                    <Button
                        alignSelf="start"
                        margin={{ left: '-16px' }}
                        icon={<FormNext color="#C767F5" size={'large'} />}
                        onClick={() => {
                            setIsSidebarNavCollapsed(!isSidebarNavCollapsed)
                        }}
                    />
                </Box>
            )}
        </>
    )
}
const SidebarFooter = () => {
    const { logout } = useAuth()
    const { isSidebarNavCollapsed, userContext } = useUIContext()

    return (
        <>
            <Box direction="row" pad={{ bottom: 'medium' }}>
                <Box
                    direction="row"
                    pad={{ horizontal: 'medium' }}
                    gap="xsmall">
                    <Avatar size="small" round="xsmall" src={src} />
                    {!isSidebarNavCollapsed && (
                        <>
                            <Text
                                size="xsmall"
                                color="white"
                                style={{ paddingTop: '3px' }}>
                                {userContext?.name}
                            </Text>
                            <Box pad={{ top: 'xsmall', left: 'small' }}>
                                <Logout color="white" size="small" />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            {!isSidebarNavCollapsed && (
                <Box
                    direction="column"
                    pad={{ horizontal: 'medium' }}
                    gap="xsmall">
                    <Box direction="column">
                        <Text size="small" color="white">
                            Get in touch
                        </Text>
                        <Text
                            size="xsmall"
                            color="white"
                            style={{ fontSize: '0.375rem' }}>
                            info@sparkbooks.com
                        </Text>
                        <Text
                            size="xsmall"
                            color="white"
                            style={{ fontSize: '0.375rem' }}>
                            @ 2022. All rights reserved
                        </Text>
                        <Text
                            size="xsmall"
                            color="white"
                            style={{
                                fontSize: '0.313rem',
                                marginTop: '0px',
                                paddingTop: '0px',
                            }}>
                            ver. 1.0
                        </Text>
                    </Box>
                </Box>
            )}
        </>
    )
}

const MainNavigation = () => (
    <Nav pad={{ left: 'medium', right: 'none' }} margin={{ right: 'none' }}>
        <SidebarButton
            color="white"
            icon={<AppsRounded color="white" size="medium" />}
            label="Dashboard"
            path="/dashboard"
        />
        <SidebarButton
            color="white"
            icon={<Group color="white" size="medium" />}
            label="Clients"
            path="/clients"
        />
        <SidebarButton
            color="white"
            icon={<Upload color="white" size="medium" />}
            label="Uploads"
            path="/uploads"
        />
        <SidebarButton
            color="white"
            icon={<Copy color="white" size="medium" />}
            label="Files"
            path="/files"
        />
        <TaggleButton />
    </Nav>
)

export const SideBarNav = () => {
    const { isSidebarNavCollapsed } = useUIContext()
    return (
        <Sidebar
            background="linear-gradient(180deg, #3B86D8 0%, #9881EB 100%);"
            height="100vh"
            width={isSidebarNavCollapsed ? 'xsmall' : 'small'}
            header={<SidebarHeader />}
            footer={<SidebarFooter user={'Herve'} />}
            pad={
                isSidebarNavCollapsed
                    ? { left: 'none', right: 'none' }
                    : { left: 'none', right: 'none' }
            }
            margin={{ right: 'none' }}>
            <MainNavigation />
        </Sidebar>
    )
}
