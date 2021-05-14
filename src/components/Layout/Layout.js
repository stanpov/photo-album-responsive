import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {auth} from '../../firebase/firebase';
import {useDispatch,useSelector} from 'react-redux';
import {logout,selectUser} from '../../features/auth/userSlice'
import { makeStyles,Toolbar,AppBar,Typography,IconButton,Menu,MenuItem } from '@material-ui/core';
import {HomeOutlined,AccountCircle} from '@material-ui/icons'

const useStyles = makeStyles({
    page: {
        display: "flex",
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        

    },
    appBar: {
        backgroundColor: "#e2e2e2",
    },
    homeIcon: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    logoImage: {
        width: 40,
        height: 40
    },
    headerMiddle: {
        display: 'flex',
        alignItems: "center",
    },
    headerLinks: {
        textDecoration: "none",
        color: "black"
    },
    footerBar: {
        position: "fixed",
        display: "flex",
        top: "auto",
        bottom: 0,
        height: "40px",
        marginTop: "20px"
    }
})


function Layout({children}) {
    const [anchorEl,setAnchorEl] = useState(null);
    const classes = useStyles();
    let open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser)
    

    const handleMenu = (e)=>{
        
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e)=>{
        
        setAnchorEl(null)
    }
    const handleLogOut = (e)=>{
        auth.signOut().then(()=>{
            dispatch(logout())
            setAnchorEl(null);
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div className={classes.root}>
        <AppBar
        className={classes.appBar}
        position="sticky"
        elevation= {2}
        >
            <Toolbar className={classes.homeIcon}>
               <Link to="/"> <IconButton color="primary"  className={classes.headerMiddle}> 
                 <HomeOutlined />
                </IconButton> </Link>
                <Typography variant="h6" component="h2" color="secondary">
                    <div ><img className={classes.logoImage} src="camera.png" alt="logo" /></div>
                </Typography>
                <IconButton aria-controls="menu-appbar" onClick={handleMenu} color="primary">
                    <AccountCircle />
                </IconButton>
                    <Menu
                     id="menu-appbar"
                     getContentAnchorEl={null}
                     anchorEl={anchorEl}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'center'
                     }}
                     keepMounted
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'center'
                     }}
                     open={open}
                     onClose={handleClose}
                     >
                         {user ? (<> <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to="/photos">View Photos</Link></MenuItem>
                        <MenuItem onClick={handleLogOut}><Link className={classes.headerLinks} to="/">Logout</Link></MenuItem> </>)
                         : (<> <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to="/login">Login</Link></MenuItem>
                         <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to='/register'>Register</Link></MenuItem> </>) }
                        
                        

                    </Menu>
                
            </Toolbar>
        </AppBar>
        
        <div className={classes.page}>
            {children}
        </div>
        </div>
    )
}

export default Layout
