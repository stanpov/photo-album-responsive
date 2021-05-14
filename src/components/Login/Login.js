import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../../firebase/firebase'
import {login} from '../../features/auth/userSlice';
import {useDispatch} from 'react-redux';
import {makeStyles,Avatar,Typography,TextField,Button,Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme)=>{
    return {
        loginPage: {
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
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.secondary.light
        },
        formLogin: {
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
        loginMain: {
            display: "flex",
            width: "100%",
            background: "linear-gradient(to right, #eecda3, #ef629f)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
    }
})

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogIn = (e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then((authUser)=>{
            if(authUser) {
                dispatch(login({
                    id: authUser.user.uid,
                    email: authUser.user.email,
                    username: authUser.user.displayName
                }))
                history.push('/')
            } else {
                throw new Error('Wrong username or password');
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className={classes.loginMain}>
        <div className={classes.loginPage}>
            <Avatar className={classes.loginAvatar} />
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.formLogin} noValidate>
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
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                 />
                 <Button 
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.loginBtn}
                    onClick={handleLogIn}
                 >
                    Sign In
                 </Button>
                 <Grid container>
                    <Grid item xs>
                        <Link className={classes.links} to="/forgotpass" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                     <Grid item >
                         <Link className={classes.links} to="/register" variant="body2">
                             Sign Up here.
                        </Link>
                    </Grid>
                 </Grid>
            </form>
        </div>
        </div>
    )
}

export default Login
