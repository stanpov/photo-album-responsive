import React,{useState} from 'react';
import ProgressBar from '../ProgressBar/ProgressBar'
import {Link,useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {LogOut} from '../../features/actions'
import {UnmarkOne,DeleteOne} from '../../features/actions';
import { makeStyles,Toolbar,AppBar,Typography,IconButton,Menu,MenuItem } from '@material-ui/core';
import {HomeOutlined,AccountCircle,Delete,Close,CloudUpload} from '@material-ui/icons'


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
        height: 40,
        marginLeft: "10px",
        marginRight: "10px"
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
    },
    middleOptionNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"

    },
    unmarkClass: {

    },
    inputStyled: {
        display: "none"
    }
})


function Layout({children}) {
    const marked = useSelector(state=>state.picture.photo)
    const [file,setFile] = useState(null)
    const types = ['image/png','image/jpg','image/jpeg']
    const user = useSelector(state=>state.user.logged)
    const [anchorEl,setAnchorEl] = useState(null);
    const classes = useStyles();
    let open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const history = useHistory();

    const closeZoomer = (e)=>{
        e.preventDefault()
        dispatch(UnmarkOne())
        
    }

    const uploadPic = (e)=>{
        let selected = e.target.files[0]
        console.log(selected)
        if(selected) {
            if(types.includes(selected.type)) {
                setFile(selected)
            } else {
                console.log('Wrong format')
            }
            
        }else {
            setFile(null)
        }
    }
    

    const handleMenu = (e)=>{
        
        setAnchorEl(e.currentTarget)
    }
    
    const deleteMarkedOne = (e)=>{
        e.preventDefault()
        dispatch(DeleteOne(marked[0].id))
        dispatch(UnmarkOne())
    }

    const handleClose = (e)=>{
        
        setAnchorEl(null)
    }
    const handleLogOut = (e)=>{
        e.preventDefault()
        dispatch(LogOut())
        setAnchorEl(null);
        history.push('/')
       
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
                    <div className={classes.middleOptionNav}>  
                        {marked &&  <IconButton onClick={deleteMarkedOne}>
                        <Delete color="primary" />
                            </IconButton> }
                        
                        
                        <img className={classes.logoImage} src="camera.png" alt="logo" />

                        {marked && <IconButton  className={classes.unmarkClass} onClick={closeZoomer}>
                        <Close color="primary" />
                        </IconButton>}
                        
                        
                        </div> 
                </Typography>
                    <div>
                        {user && <><input
                         className={classes.inputStyled}
                          accept="image/*" 
                          id="icon-button-file"
                           type="file"
                           onChange={uploadPic}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                <CloudUpload color="primary" />
                             </IconButton>
                            </label>
                        </>}
                            

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
                         {user ? (<div> <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to="/photos">View Photos</Link></MenuItem>
                        <MenuItem onClick={handleLogOut}><Link className={classes.headerLinks} to="/">Logout</Link></MenuItem> </div>)
                         : (<div> <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to="/login">Login</Link></MenuItem>
                         <MenuItem onClick={handleClose}><Link className={classes.headerLinks} to='/register'>Register</Link></MenuItem> </div>) }
                        
                        

                    </Menu>
                    </div>
            </Toolbar>
            {file && <ProgressBar file={file} setFile={setFile} />}
            
        </AppBar>
        
        <div className={classes.page}>
            
            {children}
           
        </div>
        </div>
    )
}
    

export default Layout
