import {BsCartDashFill, BsCartPlusFill} from "react-icons/bs";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
export default function Card({ product_code, display_name, manufacturer_name, mrp, selling_price, image_url, categories, in_cart, in_wishlist, jwtToken}) {
  const navigator = useNavigate();
  const [isWished, setIsWished] = useState(in_wishlist);
  const [inCart, setInCart] = useState(in_cart ?? 0);
  useEffect(()=>{
    if(!jwtToken){
      if(isWished || inCart) navigator("/login");
      return;
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/wishlist",{
      method : isWished ? "POST" : "DELETE",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      },
      body : JSON.stringify({
        product_code : String(product_code)
      })
    });
    
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/cart",{
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
  function addToCart(){
    setInCart(inCart+1);
  }
  function removeFromCart(){
    setInCart(inCart==0 ? 0 : inCart-1);
  }
  return (
    <div style={styles.card}>
      <img src={image_url} alt={display_name} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{display_name}</h3>
        <p><strong>Manufacturer:</strong> {manufacturer_name}</p>
        <p><strong>MRP:</strong> ₹{mrp}</p>
        <p><strong>Price:</strong> ₹{selling_price}</p>
        <p><strong>Categories:</strong> {categories.join(", ")}</p>
        <div style={styles.flexEnd}>
            <div style={styles.floatLeft}><button style={styles.wishBtn} onClick={toggleWish}> {isWished ? " ❤️ " : " 🤍 "}</button></div>
            <div style={styles.floatRight}>

              <BsCartDashFill color="darkred" onClick={removeFromCart}/>

              <input style={styles.cartInput}
               value={inCart} disabled
               onChange={(e)=>{
                setInCart(e.target.value);
               }}></input>
              <BsCartPlusFill color="darkgreen" onClick={addToCart} />
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
    display:"flex",
    flexDirection:"column",
    background:"#ffa"
  },
  image: {
    margin:"auto",
    width:"130px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: {
    marginTop: "10px",
    display:"flex",
    flexDirection:"column",
    flexGrow:"1"
  },
  title:{
//    flexGrow:"1"
  },
  flexEnd : {
    display:"flex",
    alignItems:"center",
    marginTop:"auto",
    width:"100%",
  },
  floatLeft:{
    alignItem:"flex-start",
    marginRight:"auto",
    display: "inline-block"
  },
  floatRight:{
    marginLeft:"auto",
    fontSize:"1.7rem",
    float:"right",
    display:"flex"
  },
  wishBtn : {
    border:"none",
    fontSize:"1.3rem",
    background:"none"
  },
  cartInput : {
    color:"black",
    backgroundColor:"#ffa",
    fontSize:"1.3rem",
    width:"23px",
    border:"none"
  }
};
