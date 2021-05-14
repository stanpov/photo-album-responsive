import React,{useState} from 'react';
import {auth} from '../../firebase/firebase';
import {useHistory} from 'react-router-dom'
import {makeStyles,Avatar,Typography,TextField,Button,Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme)=>{

    return {
        registerPage: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f2f2f2",
            overflow: "auto",
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
        registerAvatar: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.secondary.light
        },
        formRegister: {
            display: "flex",
            flexDirection: "column",
            width: "60%",
            padding: "10px 10px 10px 10px"
        },
        registerBtn: {
            margin: theme.spacing(2,0,2)
        },
        links: {
            textDecoration: 'none',
            fontSize: "12px"
        },
        registerMain: {
            display: "flex",
            width: "100%",
            background: "linear-gradient(to right, #00c9ff, #92fe9d)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
    }
})


function Register() {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const classes = useStyles();
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault()
        let errors = [];
        if(username.length < 4) {
            errors.push('Username have to be at least 4 symbols ');
        }
        if(email.length < 4) {
            errors.push('Email have to be at least 4 symbols');
        }
        if(password.length < 4) {
            errors.push('Password have to be at least 4 symbols');
        }
        if(password !== confirmPass) {
            errors.push('Password must match!');
        }
        if(errors.length > 0) { 
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPass('')
                return
        }
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: username
            })
            history.push('/login');
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className={classes.registerMain}>
        <div className={classes.registerPage}>
            <Avatar className={classes.registerAvatar} />
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.formRegister} noValidate>
            <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                 />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
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
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                 />
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="rePassword"
                    type="password"
                    label="Confirm Password"
                    name="rePassword"
                    autoFocus
                    value={confirmPass}
                    onChange={(e)=>setConfirmPass(e.target.value)}
                 />
                 <Button 
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.registerBtn}
                    onClick={handleSubmit}
                 >
                    Sign Up
                 </Button>
                 <Grid container>
                    <Grid item xs>
                        <Link className={classes.links} to="/login" variant="body2">
                       Already have an account? Sign in
                        </Link>
                    </Grid>
                 </Grid>
            </form>
        </div>
        </div>
    )
}

export default Register
