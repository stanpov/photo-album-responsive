import React,{useEffect} from 'react';
import {makeStyles} from '@material-ui/core'
import useStorage from '../../hooks/useStorage'

const useStyles = makeStyles({
    progressDiv: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        right: 150,
        width: "25px",
        backgroundColor: "red",
        height: "20px",
        borderRadius: "50%",
        fontSize: '10px'
    }
})

function ProgressBar({file,setFile}) {
    const {url,progress} = useStorage(file)
    const classes = useStyles()
    console.log(url)

    useEffect(()=>{
        if(url) {
            setFile(null);
        }
    },[url,setFile])
    return (
        <div className={classes.progressDiv}>
                {progress + '%'}
        </div>
    )
}

export default ProgressBar
