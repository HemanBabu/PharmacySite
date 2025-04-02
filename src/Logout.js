import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Logout({ jwtToken, setJwtToken, setUser }) {
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwtToken}`
          }
        });
        
        if (response.status === 200) {
          setMessage("Successfully logged out");
          setJwtToken(null);
          setUser("");
        } else {
          setMessage("Couldn't log out");
        }
      } catch (err) {
        setMessage("Couldn't log out");
      }
    };

    logout();
  }, []);

  return <><h2 style={{ textAlign: "center" }}>{message}</h2></>;
}
