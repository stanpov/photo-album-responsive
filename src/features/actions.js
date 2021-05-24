import {auth,db} from '../firebase/firebase'

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

export const DeleteOne = (id)=>{
    
    return (dispatch)=>{
        db.collection('images').doc(id).delete()  
        .then((response)=>{
            dispatch({
                type: "DELETE_ONE",
                payload: response
            })
        }).catch(err=>{
            console.log(err.message)
        })
        
    }
}

export const MarkOne = (id)=>{
    let item = [];
    return(dispatch)=>{
        db.collection('images').doc(id).get()
        .then((response)=>{
            item.push({...response.data(),id:response.id})
            dispatch({
                type: "MARK_ONE",
                payload: item
            })
        }).catch(err=>{
            console.log(err.message)
        })
    }
   
}

export const UnmarkOne = ()=>{
        return(dispatch)=>{
            dispatch({
                type: "UNMARK_ONE",
                payload: null
            })
        }
}


