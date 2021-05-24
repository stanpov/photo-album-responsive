import React,{useState,useEffect} from 'react';
import {Container,Grid,makeStyles} from '@material-ui/core';
import {db} from '../../firebase/firebase';
import ImageCard from '../ImageCard/ImageCard';
import Zoomer from '../Zoomer/Zoomer'
import {useDispatch,useSelector} from 'react-redux';
import {MarkOne} from '../../features/actions'


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
    const [docs,setDocs] = useState([])
    const [selectedImg,setSelectedImg] = useState(null);
    const dispatch = useDispatch()
    
    

    const markItem = (item)=>{
        setSelectedImg(item)
        dispatch(MarkOne(item.id))
    }
  
    
  
    
    useEffect(()=>{
       
        const unsub = db.collection('images')
        .onSnapshot((snap)=>{
            let documents = [];
            snap.forEach(doc=>{
                documents.push({...doc.data(),id:doc.id})
            })
            setDocs(documents);
        })
        return () => unsub();
    
        
        
    },[])

    return (
        <Container className={classes.containerMain}>
           <Grid container spacing={2}>
            {docs?.map(item=> (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} onClick={()=>markItem(item)}>
                    <ImageCard item={item} />
                </Grid>
            ))}
           </Grid>
           {selectedImg && <Zoomer selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
           
        </Container>
    )
}

export default AllPhotos
