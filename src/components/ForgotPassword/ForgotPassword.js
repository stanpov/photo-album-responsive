import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase'
import {makeStyles,Avatar,Typography,TextField,Button,Grid} from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {
        forgotPage: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f2f2f2",
            width: "400px",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            border: "1px solid black", 
            boxShadow: "-1px 3px 6px 6px rgba(0,0,0,0.5);",
            borderRadius: "80px 0px 80px 0px"
        },
        loginAvatar: {
            marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.secondary.light
        },
        formForgot: {
            display: "flex",
            flexDirection: "column",
            width: "60%",
            padding: "10px 10px 10px 10px"
        },
        loginBtn: {
            margin: theme.spacing(2,0,2)
        },
        links: {
            textDecoration: 'none',
            fontSize: "12px"
        },
        forgotMain: {
            display: "flex",
            width: "100%",
            height: "100vh",
            background: "linear-gradient(to right, #eacea3, #ef120c)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        },
        spanInfo: {
            display: "flex",
            textAlign: "center",
            marginTop: theme.spacing(1)
        }
    }
})


function ForgotPassword() {
    const classes = useStyles();
    const history = useHistory();
    const [email,setEmail] = useState('');

    const resetPass = (e)=>{
        e.preventDefault();
        if(email !== '') {
            auth.sendPasswordResetEmail(email).then(()=>{
                window.alert('Email with new password has been send.')
                history.push('/')
            }).catch(err=>{
                console.log(err)
            })
        } else {
            window.alert("Please write your email first")
        }
        

    }
    return (
        <div className={classes.forgotMain}>
        <div className={classes.forgotPage}>
            <Avatar className={classes.loginAvatar} />
            <Typography component="h1" variant="h5">
                Forgot password?
            </Typography>
            <Typography className={classes.spanInfo} component="h6" variant="span">
                Please enter your email address and we will send you information to recover your account.
            </Typography>
            <form className={classes.formForgot} noValidate>
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    
                 />
                
                 <Button 
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.loginBtn}
                    onClick={resetPass}
                 >
                    Reset password
                 </Button>
                 <Grid container>
                    <Grid item xs>
                        <Link className={classes.links} to="/" variant="body2">
                        Back to Home
                        </Link>
                    </Grid>
                     <Grid item >
                         <Link className={classes.links} to="/login" variant="body2">
                             Sign In
                        </Link>
                    </Grid>
                 </Grid>
            </form>
        </div>
        </div>
    )
}

export default ForgotPassword
