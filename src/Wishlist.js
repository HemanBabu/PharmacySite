import { useEffect, useState } from "react";
import CardHolder from "./CardHolder.js";
import Card from "./Card.js";

export default function Wishlist({ jwtToken }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!jwtToken) return;

    fetch(process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(e => console.log(e));
  }, [jwtToken]);

  return (
    <CardHolder>
      {products.map((product) => (
        <Card
          key={product.product_code}
          product_code={product.product_code}
          display_name={product.display_name}
          manufacturer_name={product.manufacturer_name}
          mrp={product.mrp}
          selling_price={product.selling_price}
          image_url={product.image_url}
          categories={product.categories}
          in_cart={product.count}
          in_wishlist={product.wished}
          jwtToken={jwtToken}
        />
      ))}
    </CardHolder>
  );
}