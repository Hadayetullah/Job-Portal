import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

import { Navigate } from 'react-router-dom';



const pages = ['Dashboard', 'My Jobs', 'View CV'];
const pagess = ['Register', 'Login'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    let navRightMenu = props.isAuthenticated;

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    let login = (
        <div>
            <Link to="/login">
                <Tooltip title="Login">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"

                        color="inherit"
                    >
                        <LoginIcon sx={{color:"white"}} />
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );    


    let register = (
        <div>
            <Link to="/register">
                <Tooltip title="register">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"

                        color="inherit"
                    >
                        <LockOpenIcon sx={{color:"white"}} />
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );    


    let onResponsiveHandleIcon = null;
    if(props.icon === "login"){
        onResponsiveHandleIcon = register;
    } else {
        onResponsiveHandleIcon = login;
    }


    const beforeLogin = <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avater" />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Link to={"/logout"} style={{ textDecoration: "none", color: "inherit" }}>Logout</Link>
                </Typography>
            </MenuItem>
        </Menu>
    </Box>



    const afterLogin = <div>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <LoginIcon alt="Login" style={{ color: "white" }} />
                </IconButton>
            </Tooltip> */}
            {onResponsiveHandleIcon}
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagess.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</Link>
                </Button>
            ))}
        </Box>
    </div>


    return (
        <AppBar sx={{
            overflow: "hidden",
            position: "fixed",
            top: 0,
            width: "100%"
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/${page.replace(/\s/g, '').toLowerCase()}`}>{page}</Link>
                            </Button>
                        ))}
                    </Box>

                    {navRightMenu ? beforeLogin : afterLogin}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;