import React from 'react'
import { useAuth } from '@/hooks/auth'
import {
    Avatar,
    Button,
    Box,
    Nav,
    Stack,
    Text,
    Sidebar,
    Image,
    Anchor,
} from 'grommet'

import { Group, Upload, Copy, Dashboard } from 'grommet-icons'
import ApplicationLogo from '@/components/ApplicationLogo'



const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'
const gravatarSrc =
    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'



const SidebarHeader = () => (
    <Box direction="row" align="center" gap="small">
        <ApplicationLogo/>

        <Anchor color="white" href="#">
            Sparkbooks
        </Anchor>
    </Box>
)

const SidebarButton = ({ icon, label, ...rest }) => (
    <Box pad="small">
        <Button
            gap="medium"
            alignSelf="start"
            plain
            icon={icon}
            label={label}
            href={`/${label.toLowerCase()}`}
            {...rest}
        />
    </Box>
)

const SidebarFooter = ({user}) => {
    const {logout} = useAuth()

    return (
        <>
            <Box
                align="center"
                gap="0"
                direction="row"
                margin={{ bottom: 'large' }}>
                <Anchor color="white" href="/account">
                    {user?.name}
                </Anchor>
            </Box>
            <Box>
                <Anchor size="small" color="white" onClick={logout}>
                    Logout
                </Anchor>
            </Box>
        </>
    )
}

const MainNavigation = () => (
    <Nav
        aria-label="main navigation"
        gap="large"
        responsive={false}
        color="white">
        <SidebarButton
            color="white"
            icon={<Dashboard color="white" />}
            label="Dashboard"
        />
        <SidebarButton
            color="white"
            icon={<Group color="white" />}
            label="Clients"
        />
        <SidebarButton
            color="white"
            icon={<Upload color="white" />}
            label="Uploads"
        />
        <SidebarButton
            color="white"
            icon={<Copy color="white" />}
            label="Files"
        />
    </Nav>
)

export const SideBarNav = ({user}) => (
    <Box
        width="small"
        className="sidebar-nav"
        height={{ min: '100vh' }}
        style={{ position: 'fixed' }}
        animation={[
            { type: 'fadeIn', duration: 300 },
            { type: 'slideRight', size: 'medium', duration: 150 },
        ]}>
        <Sidebar
            className="sidebar"
            responsive={false}
            background="linear-gradient(180deg, #3B86D8 0%, #9881EB 100%);"
            header={<SidebarHeader />}
            footer={<SidebarFooter user={user} />}
            // pad={{ left: "medium", right: "large", vertical: "medium" }}
        >
            <MainNavigation />
        </Sidebar>
    </Box>
)
SideBarNav.args = {
    full: true,
}
