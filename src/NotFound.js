import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from "react";
export default function NotFound({jwtToken}){
    const navigator = useNavigate();
    useEffect(()=>{
        navigator("/");
    }, []);
}