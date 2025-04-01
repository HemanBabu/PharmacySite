import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
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
import { Routes, Route, Link } from 'react-router-dom';
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/Home">Pharmacy site</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <form className="d-flex ms-auto" onSubmit={(e)=>{e.preventDefault()}}>
          <input onChange={(e)=>{
            setSearch(e.target.value);
          }}
          type="search" placeholder="Search" />
            <Link type="submit" class="btn" to="/products">Search</Link>
        </form>
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {jwtToken ? (
            <>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wishlist">Wishlist</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notifications">Notifications</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
          </>
          ) : (
            <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Signup</Link>
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
