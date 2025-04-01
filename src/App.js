import './App.css';
import logo from "./logo.png";
import { useState } from 'react';
import Home from "./Home.js";
import Cart from "./Cart.js";
import Wishlist from "./Wishlist.js";
import Notifications from "./Notifications.js";
import Products from "./Products.js";
import NotFound from "./NotFound.js";
import Login from "./Login.js";
import Logout from "./Logout.js";
import Signup from "./Signup.js";
import { FaReact, FaHome, FaSearch, FaShoppingCart, FaHeart, FaBell } from "react-icons/fa";
import { GrLogin, GrLogout} from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";

import { Routes, Route, Link } from 'react-router-dom';
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  return <>
    <nav className="nav">
      <Link className="nav-brand" to="/Home"><img class="nav-logo" src={logo} alt="+Pharmacy" height={"40px"}/>-----Pharmacy</Link>

      <div className="nav-complement">
        <form className="" onSubmit={(e)=>{e.preventDefault()}}>
          <input onChange={(e)=>{
            setSearch(e.target.value);
          }}
          type="search" placeholder="Search" />
            <Link type="submit" className="" to="/products"><FaSearch /></Link>
        </form>

        <ul className="nav-item-list">
          <li className="nav-item">
            <FaHome /> 
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {jwtToken ? (
            <>
          <li className="nav-item">
            <FaShoppingCart />
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          <li className="nav-item">
            <FaHeart />
            <Link className="" to="/wishlist">Wishlist</Link>
          </li>
          <li className="nav-item">
            <FaBell />
            <Link className="" to="/notifications">Notifications</Link>
          </li>
          <li className="nav-item">
            <GrLogout />
            <Link className="" to="/logout">Logout</Link>
          </li>
          </>
          ) : (
            <>
          <li className="nav-item">
            <GrLogin /> 
            <Link className="" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <GiArchiveRegister />
            <Link className="" to="/signup">Signup</Link>
          </li>
          </>
          )}
        </ul>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products jwtToken={jwtToken} search={search} />} ></Route>

      {jwtToken ? (
        <>
          <Route path="/cart" element={<Cart jwtToken={jwtToken} />}></Route>
          <Route path="/wishlist" element={<Wishlist jwtToken={jwtToken} />}></Route>
          <Route path="/notifications" element={<Notifications jwtToken={jwtToken} />}></Route>
          <Route path="/logout" element={<Logout jwtToken={jwtToken} setJwtToken={setJwtToken} setUser={setUser}/>}></Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<Login setJwtToken={setJwtToken} setUser={setUser}/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </>
      )}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
}

export default App;
