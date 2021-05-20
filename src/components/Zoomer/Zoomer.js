import React from 'react';
import {makeStyles} from '@material-ui/core';

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
            maxHeight: "80%",
            margin: "60px auto",
            boxShadow: "3px 5px 7px rgba(0,0,0,0.5)",
            border: "3px solid white"
        },
        
    }
})

function Zoomer({selectedImg,setSelectedImg}) {
    const classes = useStyles()

    const handleCloseClick = (e) =>{
       console.log(e.target.className)
        if(e.target.className.includes('backdrop')) {
            setSelectedImg(null)
        }
        
    }
    return (
        <div className={classes.backdrop} onClick={handleCloseClick}>
            <img className={classes.zoomImg} src={selectedImg} alt="large pic" />  
        </div>
    )
}

export default Zoomer
