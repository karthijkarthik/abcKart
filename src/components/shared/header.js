import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { CartContext } from '../../contexts/CartContext';
import DialogComponent from "./Dialog";
import styles from './header.module.css';
import Login from './Login';
import Register from './Register';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#a3011a',
        color: '#ffffff',
        fontSize: '11px',
        right: 3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
  }))(Badge);

const Header = () => {
    const {itemCount} = useContext(CartContext);
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setLoginStatus] = React.useState(false);
    const [loggedUser, setLoggedUser] = React.useState({});
    const [isRegister, setIsRegister] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const toggleLoginStatus = (status) => {
        setLoginStatus(status);
    }

    const handleLoggedUser = (value) => {
        setLoggedUser(value);
    }

    const toggleForm = (status) => {
        setIsRegister(status);
    }
    console.log("isRegister", isRegister);
    return ( 
        <header className={`${styles.header} container`}>
            <Link to='/'><img src={require("../../assets/logo.png")} alt="abcKart" className={styles.logo} /></Link>
            <div className={styles.menuContainer}>
                <Link to='/about'>About</Link>
                {isLoggedIn ? 
                    <Chip
                        size="small"
                        icon={<FaceIcon />}
                        label={`Welcome ${loggedUser.name}`}
                        color="secondary"
                        style={{ fontWeight: 'bold' }}
                    /> :
                    <Link onClick={handleClickOpen}>Login</Link>}
                <Link to='/cart'> 
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={itemCount}>
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                </Link>
            </div>
            <DialogComponent open={open} title={isRegister ? "Register" : "Login"} onClose={handleClose}>
                {isRegister ? 
                    <Register setRegister={toggleForm}  /> :
                    <Login 
                        onClose={handleClose} 
                        logStatus={toggleLoginStatus}
                        setUserDetails={handleLoggedUser}
                        setRegister={toggleForm} />
                }
            </DialogComponent>
        </header>
    );
}
 
export default Header;