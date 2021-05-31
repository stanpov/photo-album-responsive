import {useState,useEffect} from 'react';
import {storage,db,timeStamp} from '../firebase/firebase';

const useStorage = (file)=>{
    const [progress,setProgress] = useState(0);
    const [url,setUrl] = useState(null);

    useEffect(()=>{

        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection('images')
        storageRef.put(file).on('state_changed',(snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage.toFixed(0))
        },(err)=>{
            console.log(err)
        }, async ()=>{
            const createdAt = timeStamp()
            const url = await storageRef.getDownloadURL();
            collectionRef.add({url:url,createdAt:createdAt})
            setUrl(url)
        })
    },[file])

    return {progress,url}
}

export default useStorage