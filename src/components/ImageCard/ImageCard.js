import React from 'react';
import {Card,CardMedia,makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme)=>{

    return {
       cardImage: {
           width: "100%",
           height: 0,
           objectFit: "contain",
           paddingTop: "80%",
           paddingBottom: "20%",
       },
    }
})


function ImageCard({item}) {
    const classes = useStyles()
    return (
        <Card>
            
            <CardMedia 
                className={classes.cardImage}
                image={item.url}
            />
        </Card>
    )
}

export default ImageCard
