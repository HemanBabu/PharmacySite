import './App.css';
import logo from "./logo.png";
import { useState, useEffect } from 'react';
import Home from "./Home.js";
import Cart from "./Cart.js";
import Wishlist from "./Wishlist.js";
import Notifications from "./Notifications.js";
import Products from "./Products.js";
import NotFound from "./NotFound.js";
import Login from "./Login.js";
import Logout from "./Logout.js";
import Signup from "./Signup.js";
import { FaHome, FaSearch, FaShoppingCart, FaHeart, FaBell, FaCapsules } from "react-icons/fa";
import { GrLogin, GrLogout} from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const navigator = new useNavigate();
  return <>
    <nav className="nav">
      <Link className="nav-brand" to="/Home"><FaCapsules /> <span>Pharmacy</span></Link>

      <div className="nav-complement">
        <form className="" onSubmit={(e)=>{e.preventDefault();
          if(!document.location.href.includes("/products")) navigator("/products");
          if(e.target.searchInput.value=="") navigator("/");
          else navigator("/products");
          setSearch(e.target.searchBtn.value) 
          }}>
          <input name="searchInput" className="searchInput" onChange={(e)=>{
          if(e.target.value=="") navigator("/");
          else navigator("/products");
            setSearch(e.target.value);
          }}
          type="search" placeholder="Search" />
            <Link type="submit" className="searchBtn" to="/products"><FaSearch /></Link>
        </form>

        <ul className="nav-item-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
            <FaHome /> 
            <span>Home</span>
            </Link>
          </li>
          {jwtToken ? (
            <>
          <li className="nav-item">
            
            <Link className="nav-link" to="/cart">
            <FaShoppingCart />
            <span>Cart</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wishlist">
          <FaHeart />
            <span>Wishlist</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notifications">
            <FaBell />
            <span>Notifications</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
            <GrLogout />
            <span>Logout</span>
            </Link>
          </li>
          </>
          ) : (
            <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
            <GrLogin /> 
            <span>Login</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
            <GiArchiveRegister />
            <span>Signup</span>
            </Link>
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
