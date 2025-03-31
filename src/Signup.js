import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setJwtToken, setUser }) {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
  const isFormValid =
    user &&
    password &&
    password === confirmPassword &&
    isValidEmail(email) &&
    phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000);
      } else {
        alert("internal server error");
      }
    } catch (err) {
      alert("internal server error");
    }
  };

  if (success) {
    return <h2 style={{ textAlign: "center" }}>User successfully created</h2>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <input type="text" placeholder="Username" value={user} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <textarea placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}></textarea>
      <button type="submit" disabled={!isFormValid}>Sign Up</button>
    </form>
  );
}