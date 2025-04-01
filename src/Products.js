import { useEffect, useState } from "react";
import Card from "./Card.js";
import CardHolder from "./CardHolder.js";

export default function Products({ jwtToken, search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/search/${search}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log(data);
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, jwtToken]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!products.length) return <h2>No products found</h2>;

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
