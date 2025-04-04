import { useEffect } from "react";
export default function Home({user}){
    useEffect(()=>{
        document.title = "Pharmacy Site";
    }, []);
    return <h1 style={{textAlign:"center"}}>Welcome {user}</h1>
}