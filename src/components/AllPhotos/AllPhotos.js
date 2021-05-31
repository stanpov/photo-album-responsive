import React,{useState,useEffect} from 'react';
import {Container,Grid,makeStyles,CircularProgress} from '@material-ui/core';
import {db} from '../../firebase/firebase';
import ImageCard from '../ImageCard/ImageCard';
import Zoomer from '../Zoomer/Zoomer'
import {useDispatch,useSelector} from 'react-redux';
import {MarkOne} from '../../features/actions';
import {motion} from 'framer-motion'


const useStyles = makeStyles((theme)=>{

    return {
        containerMain: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        },
        circulasProg: {
            display: "flex",
            alignItems: "center",
            margin: "20px auto",
            justifyContent: "center"
        }
       
    }
})


function AllPhotos() {
    const marked = useSelector(state=>state.picture.photo)
    const classes = useStyles()
    const [loader,setLoader] = useState(true)
    const [docs,setDocs] = useState(null)
    const dispatch = useDispatch()
    
    

    const markItem = (item)=>{
        
        dispatch(MarkOne(item.id))
    }
  
    
  
    
    useEffect(()=>{
        
        const unsub = db.collection('images')
        .orderBy('createdAt',"desc")
        .onSnapshot((snap)=>{
            let documents = [];
            snap.forEach(doc=>{
                documents.push({...doc.data(),id:doc.id})
            })
            setDocs(documents);
            
                setLoader(false)
            
        })
        return () => unsub();
    
        
        
    },[])

    return (
        <Container className={classes.containerMain}>
            {loader ? <CircularProgress className={classes.circulasProg} /> : 
                <Grid container spacing={2}>
                {docs?.length === 0 ? <h3>You dont have photos yet.</h3> : docs?.map(item=> (
                    <Grid item xs={4} sm={3} md={2} lg={2} key={item.id} onClick={()=>markItem(item)}
                        component={motion.div}
                        initial={{y: "-200vh"}}
                        layout
                        animate={{y: 0}}
                        transition={{duration: 0.6}}
                    >
                        
                        <ImageCard item={item}  />
                       
                        
                        
                    </Grid>
                ))}
               </Grid>
            }
           
           {marked &&  <Zoomer/>}
           
        </Container>
    )
}

export default AllPhotos
