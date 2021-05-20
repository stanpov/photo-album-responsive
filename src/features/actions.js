import {auth} from '../firebase/firebase'

export const LogIn = (email,password) =>{
    return (dispatch)=>{
        auth.signInWithEmailAndPassword(email,password)
        .then((authUser)=>{
            dispatch({
                type: "Log_In",
                payload: authUser.user
            })
        }).catch(err=>{
            console.log(err.message)
        })
    }
}

export const LogOut = () => {
    return (dispatch)=>{
        auth.signOut().then(()=>{
            dispatch({
                type: "Log_Out",
                payload: null
            })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
}


