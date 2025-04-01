import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
export default function Card({ product_code, display_name, manufacturer_name, mrp, selling_price, image_url, categories, in_cart, in_wishlist, jwtToken}) {
  const navigator = useNavigate();
  const [isWished, setIsWished] = useState(in_wishlist);
  const [inCart, setInCart] = useState(in_cart);
  useEffect(()=>{
    if(!jwtToken){
      if(isWished || inCart) navigator("/login");
      return;
    }
    fetch("http://localhost:3001/wishlist",{
      method : isWished ? "POST" : "DELETE",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      },
      body : JSON.stringify({
        product_code : String(product_code)
      })
    });
    
    fetch("http://localhost:3001/cart",{
      method : inCart ? "POST" : "DELETE",
      headers :{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      },
      body : JSON.stringify({
        product_code : String(product_code),
        count : inCart
      })
    });
  }, [isWished, inCart]);
  function toggleWish(){
    setIsWished(!isWished);
  }
  return (
    <div style={styles.card}>
      <img src={image_url} alt={display_name} style={styles.image} />
      <div style={styles.info}>
        <h3>{display_name}</h3>
        <p><strong>Manufacturer:</strong> {manufacturer_name}</p>
        <p><strong>MRP:</strong> ₹{mrp}</p>
        <p><strong>Price:</strong> ₹{selling_price}</p>
        <p><strong>Categories:</strong> {categories.join(", ")}</p>
        <div>
            <div style={styles.floatLeft}><button onClick={toggleWish}> {isWished ? " ❤️ " : " 🤍 "}</button></div>
            <div style={styles.floatRight}>
              <strong> 🛒 </strong>: 
              <input type={"number"}
               value={inCart}
               onChange={(e)=>{
                setInCart(e.target.value);
               }}></input>
              </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width:"130px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: {
    marginTop: "10px",
  },
  floatLeft:{
    float : "left",
    display: "inline-block"
  },
  floatRight:{
    float:"right",
    display:"inline-block"
  }
};
