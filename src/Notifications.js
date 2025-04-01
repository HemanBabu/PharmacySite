import {useEffect, useState} from "react";
export default function Notifications({jwtToken}){
  const [notifications, setNotifications] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/notifications",{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      }
    }).then(response => response.json()).then(data => {
      setNotifications(data);
    }).catch(e=>{
      console.log(e);
      setNotifications([{title:"Could'nt fetch notifications", body:"retry after a few minutes"}]);
    });
  }, []);
  return <>
    <h1>Notifications</h1>
    {notifications.map(notification => <div>
      <h2>{notification.title}</h2>
      <p>{notification.body}</p>
    </div>)}
  </>
}