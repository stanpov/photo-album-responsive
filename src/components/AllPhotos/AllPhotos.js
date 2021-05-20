import React,{useState,useEffect} from 'react';
import {Container,Grid,makeStyles} from '@material-ui/core';
import {db} from '../../firebase/firebase';
import ImageCard from '../ImageCard/ImageCard';
import Zoomer from '../Zoomer/Zoomer'

const useStyles = makeStyles((theme)=>{

    return {
        containerMain: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        }
    }
})


function AllPhotos() {
    const classes = useStyles()
    const [photo,setPhoto] = useState([]);
    const [selectedImg,setSelectedImg] = useState(null)

    useEffect(()=>{
        const unsubs = db.collection('images')
        .get().then((snapshot)=>{
            let documents = []
            snapshot.forEach(doc=>{
                documents.push({...doc.data(),id:doc.id})
            })
            setPhoto(documents)
        })
        return () => unsubs()
    },[])

    return (
        <Container className={classes.containerMain}>
           <Grid container spacing={2}>
            {photo.map(item=> (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} onClick={()=>setSelectedImg(item.url)}>
                    <ImageCard item={item} />
                </Grid>
            ))}
           </Grid>
           {selectedImg && <Zoomer selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
        </Container>
    )
}

export default AllPhotos
