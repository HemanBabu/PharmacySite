import "./Cart.css"
import {useEffect, useState} from 'react';
export default function Cart({jwtToken}){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/cart",{
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
  }, []);

  return (
  <div class="container" id="root">
    <h2 class="p-2 text-center">Shopping Cart</h2>
    <table class="mx-auto">
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>MRP</th>
          <th>Selling Price</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_code}>
            <td>
              <img src={product.thumbnail_url} alt={product.display_name} width="50" height="50" />
            </td>
            <td>{product.display_name}</td>
            <td>${product.mrp}</td>
            <td>${product.selling_price}</td>
            <td>{product.count}</td>
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
            <button className="place-order" onClick={() => console.log("Order Placed")}>Place Order</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  );
}