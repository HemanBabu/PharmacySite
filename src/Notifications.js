import "./Notifications.css";
import {useEffect, useState} from "react";
export default function Notifications({jwtToken}){
  const [notifications, setNotifications] = useState([]);
  useEffect(()=>{
    fetch("https://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/notifications",{
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
  <div className="notifications">
    <h1>Notifications</h1>
    <div>
    {notifications.map(notification => <div className="notification-plate">
      <h2>{notification.title}</h2>
      <p>{notification.body}</p>
    </div>)}
    </div>
  </div>
  </>
}