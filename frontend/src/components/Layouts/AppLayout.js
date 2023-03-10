import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useData } from '@/lib/data-loader';
import {Box, Grommet, Spinner, Text } from 'grommet';
import { theme } from "@/styles/theme";
import { SideBarNav } from './SideBarNav';
import { AppBar } from './AppBar';
import WorkSpaceRegistrationLayer from '../WorkSpaceRegistrationLayer';



const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' });
    const [userData, setUserData] = useState('');
    const [isWorkspacePromptOpen, setIsWorkspacePromptOpen] = useState(false)

    const onClose = () => {
        setIsWorkspacePromptOpen(false);
        setUserData(user);
        console.log("userData in onClose: ",userData);
    }

    useEffect(() => {
        setUserData(user);
        console.log("user: ", user);
        console.log('userData:', userData)
        setIsWorkspacePromptOpen(!userData?.workspace_id)
    }, [user])

    // TODO: this isn't working properly.  If the user does not have a workspace_id then the layer should be open to prompt them to create one. what's currently happening is the prompt to create a workspace is displaying randomly as if the data is not being loaded properly.


        return (
            <Grommet theme={theme}>
                {isWorkspacePromptOpen && (
                    <WorkSpaceRegistrationLayer onClose={onClose} />
                )}
                <div className="pageWrapper">
                    <SideBarNav user={userData} />
                    <Box className="main-container">
                        <Box
                            align="center"
                            className="main-content"
                            width={{ min: '95%', max: '95%' }}>
                            <AppBar />
                            {children}
                        </Box>
                    </Box>
                </div>
            </Grommet>
        )
    


}

export default AppLayout
