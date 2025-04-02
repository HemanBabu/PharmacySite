import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setJwtToken, setUser }) {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const data = await response.json();
      
      if (response.status === 200) {
        setJwtToken(data.token);
        setUser(user);
        navigate("/");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="login-panel">
      {error && <p>Couldn't login</p>}
      <form onSubmit={handleSubmit}>
        <label>Username :</label>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password :</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
