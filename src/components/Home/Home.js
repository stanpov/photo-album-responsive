import React from 'react'
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({

    homePage: {
        display: "flex",
        width: "100%",
        height: "100vh", 
    },
    homeImage: {
        display: "flex",
        width: "100%",
        height: "100%",
       
        
    }

})

function Home() {
    
    const classes = useStyles()
    return (
        <div className={classes.homePage} >
            <img className={classes.homeImage} src="https://wallpaperaccess.com/full/5652892.jpg" alt="home_img" />
        </div>
    )
}

export default Home
