import "./Cart.css"
import {useEffect, useState} from 'react';
export default function Cart({jwtToken}){
  const [products, setProducts] = useState([]);

  function fetchProducts(){
    fetch(process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/cart",{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`,
      }
    })
    .then(response => response.json()).then(data => {
      const sieve = ["product_code", "display_name", "mrp", "selling_price", "thumbnail_url", "count"];
      setProducts(
        data.map(p =>
          Object.fromEntries(Object.entries(p).filter(entry=> sieve.includes(entry[0])))
        )
      );
    })
    .catch(e => console.log(e));
  }
  function placeOrder(){
    fetch(process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/cart/placeorder",{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      }
    }).then(fetchProducts);
  }
  useEffect(()=>{
    fetchProducts();
  }, []);

  return (
  <div class="cart-container">
    <h2>Shopping Cart</h2>
    <table>
      <thead>
        <tr>
          <th colSpan="2">Name</th>
          <th>MRP</th>
          <th>Selling Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_code}>
            <td>
              <img src={product.thumbnail_url} alt={product.display_name} width="50" height="50" />
            </td>
            <td>{product.display_name}</td>
            <td>₹{product.mrp}</td>
            <td>₹{product.selling_price}</td>
            <td>x{product.count}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total:</td>
          <td>
            ${products.reduce((total, product) => {
  return total + product.selling_price * product.count;
}, 0).toFixed(2)}
          </td>
          <td>
            <button className="place-order" onClick={placeOrder}>Place Order</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  );
}