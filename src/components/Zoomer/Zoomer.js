import React from 'react';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {motion} from "framer-motion"


const useStyles = makeStyles((theme)=>{

    return {
        backdrop: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        zoomImg: {
            display: "block",
            maxWidth: "80%",
            maxHeight: "70%",
            margin: "60px auto",
            boxShadow: "3px 5px 7px rgba(0,0,0,0.5)",
            border: "3px solid white"
        },
        
    }
})

function Zoomer() {
   
    const classes = useStyles()
    const marked = useSelector(state=>state.picture.photo)
  

    

    return (
        <motion.div className={classes.backdrop}>
            
            <motion.img className={classes.zoomImg} src={marked[0].url} alt="large pic"
            initial={{opacity:0}} 
            animate={{opacity:1}}
            transition={{duration: 0.7}}
            />  
        </motion.div>
    )
}

export default Zoomer
