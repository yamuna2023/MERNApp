import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './logoutmodel';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100%)`,
        marginLeft: `${0}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
function Welcomedashboard() {
    const [logoutshowmodal, setlogoutShowModal] = useState(false)
    const [getUserName, setGetUserName] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setGetUserName(localStorage.getItem('UserName'))
    }, [])
    return (
        <Box sx={{ height: '50vh' }}>
            <AppBar position="fixed" >
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography onClick={() => navigate('/dashboard')} variant="h6" noWrap component="div" style={{ cursor: 'pointer' }}>
                            Home
                        </Typography>
                        <Typography onClick={() => navigate('/employeetable')} variant="h6" noWrap component="div" style={{ cursor: 'pointer' }} >
                            Employee list
                        </Typography>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'space-between', paddingRight: 10 }}>
                        <Typography onClick={() => setlogoutShowModal(!logoutshowmodal)} > {getUserName}  </Typography>

                        <Typography onClick={() => setlogoutShowModal(!logoutshowmodal)} style={{ cursor: 'pointer' }}> Logout</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            {logoutshowmodal &&
                <LogoutModal open={logoutshowmodal} close={() => setlogoutShowModal(false)} />
            }
            <Typography variant="h5" sx={{ color: 'green', padding: 2 }} noWrap component="div">
                Dashboard
            </Typography>
            <Box sx={{ height: '100%', width: '100%', display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ color: 'green', padding: 2 }} noWrap component="div">
                    Welcome to admin panel
                </Typography>
            </Box>
        </Box>
    )
}

export default Welcomedashboard