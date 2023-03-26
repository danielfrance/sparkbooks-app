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
            pad={{ top: 'medium', horizontal: 'small' }}
            gap="none">
            <Avatar
                size="medium"
                style={{
                    minWidth: '51px',
                    minHeight: '51px',
                    marginLeft: '-5px',
                }}>
                <ApplicationLogo />
            </Avatar>
            {!isSidebarNavCollapsed && (
                <Text
                    className="fs-400 text-white ff-sans-serif"
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
            <Button onClick={() => {}}>
                <Box
                    className={[
                        'btn-nav',
                        isSidebarNavCollapsed ? '' : 'full',
                    ].join(' ')}
                    direction="row"
                    align="center"
                    gap="small">
                    {icon}
                    {!isSidebarNavCollapsed && (
                        <Text className="fs-400 text-white">{label}</Text>
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
                        margin={{ right: '-3.7rem' }}
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
            <Link href={'/account'} style={{ textDecoration: 'none' }}>
                <Box
                    direction="row"
                    pad={{ horizontal: 'small', bottom: 'small' }}
                    gap="xsmall">
                    <img
                        src="/user.png"
                        alt="user avatar"
                        style={{
                            width: '1.7rem',
                            height: '1.7rem',
                            marginTop: '-5px',
                            padding: '0px',
                        }}
                    />
                    {!isSidebarNavCollapsed && (
                        <>
                            <Text className="fs-300 text-white ff-sans-serif">
                                {userContext?.name}
                            </Text>
                        </>
                    )}
                </Box>
            </Link>

            {!isSidebarNavCollapsed && (
                <>
                    <Box
                        pad={{ horizontal: 'small', vertical: 'small' }}
                        onClick={logout}
                        style={{ cursor: 'pointer' }}>
                        <Text className="fs-300 text-white ff-sans-serif">
                            Logout
                        </Text>
                    </Box>
                    <Box
                        direction="column"
                        pad={{ horizontal: 'small' }}
                        gap="xsmall">
                        <Box direction="column">
                            <Text className="fs-200 text-white ff-sans-serif">
                                Get in touch
                            </Text>
                            <Text
                                className="fs-100 text-white ff-sans-serif"
                                style={{ marginTop: '-10px' }}>
                                info@sparkbooks.com
                            </Text>
                            <Text
                                className="fs-100 text-white ff-sans-serif"
                                style={{
                                    marginTop: '5px',
                                }}>
                                @ 2022.
                            </Text>
                            <Text
                                className="fs-100 text-white ff-sans-serif"
                                style={{
                                    marginTop: '-10px',
                                }}

                                //
                            >
                                ver. 1.0
                            </Text>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

const MainNavigation = () => (
    <Nav
        pad={{ left: 'xsmall', right: 'none', vertical: 'none' }}
        margin={{ right: 'none' }}>
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
            // width={isSidebarNavCollapsed ? 'xsmall' : 'small'}
            className={[
                'sidebar-nav',
                isSidebarNavCollapsed
                    ? 'sidenav-container-small'
                    : 'sidenav-container-big',
            ].join(' ')}
            header={<SidebarHeader />}
            footer={<SidebarFooter user={'Herve'} />}
            pad={
                isSidebarNavCollapsed
                    ? { left: 'medium', right: 'none' }
                    : { left: 'medium', right: 'large' }
            }
            margin={{ right: 'none' }}>
            <MainNavigation />
        </Sidebar>
    )
}

// import React from 'react'
// import { useAuth } from '@/hooks/auth'
// import {
//     Avatar,
//     Button,
//     Box,
//     Nav,
//     Stack,
//     Text,
//     Sidebar,
//     Image,
//     Anchor,
// } from 'grommet'

// import { Group, Upload, Copy, Dashboard } from 'grommet-icons'
// import ApplicationLogo from '@/components/ApplicationLogo'

// const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'
// const gravatarSrc =
//     '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

// const SidebarHeader = () => (
//     <Box direction="row" align="center" gap="small">
//         <ApplicationLogo/>

//         <Anchor color="white" href="#">
//             Sparkbooks
//         </Anchor>
//     </Box>
// )

// const SidebarButton = ({ icon, label, ...rest }) => (
//     <Box pad="small">
//         <Button
//             gap="medium"
//             alignSelf="start"
//             plain
//             icon={icon}
//             label={label}
//             href={`/${label.toLowerCase()}`}
//             {...rest}
//         />
//     </Box>
// )

// const SidebarFooter = ({user}) => {
//     const {logout} = useAuth()

//     return (
//         <>
//             <Box
//                 align="center"
//                 gap="0"
//                 direction="row"
//                 margin={{ bottom: 'large' }}>
//                 <Anchor color="white" href="/account">
//                     {user?.name}
//                 </Anchor>
//             </Box>
//             <Box>
//                 <Anchor size="small" color="white" onClick={logout}>
//                     Logout
//                 </Anchor>
//             </Box>
//         </>
//     )
// }

// const MainNavigation = () => (
//     <Nav
//         aria-label="main navigation"
//         gap="large"
//         responsive={false}
//         color="white">
//         <SidebarButton
//             color="white"
//             icon={<Dashboard color="white" />}
//             label="Dashboard"
//         />
//         <SidebarButton
//             color="white"
//             icon={<Group color="white" />}
//             label="Clients"
//         />
//         <SidebarButton
//             color="white"
//             icon={<Upload color="white" />}
//             label="Uploads"
//         />
//         <SidebarButton
//             color="white"
//             icon={<Copy color="white" />}
//             label="Files"
//         />
//     </Nav>
// )

// export const SideBarNav = ({user}) => (
//     <Box
//         width="small"
//         className="sidebar-nav"
//         height={{ min: '100vh' }}
//         style={{ position: 'fixed' }}
//         animation={[
//             { type: 'fadeIn', duration: 300 },
//             { type: 'slideRight', size: 'medium', duration: 150 },
//         ]}>
//         <Sidebar
//             className="sidebar"
//             responsive={false}
//             background="linear-gradient(180deg, #3B86D8 0%, #9881EB 100%);"
//             header={<SidebarHeader />}
//             footer={<SidebarFooter user={user} />}
//             // pad={{ left: "medium", right: "large", vertical: "medium" }}
//         >
//             <MainNavigation />
//         </Sidebar>
//     </Box>
// )
// SideBarNav.args = {
//     full: true,
// }
