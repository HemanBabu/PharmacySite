export default function Card({ product_code, display_name, manufacturer_name, mrp, selling_price, image_url, categories }) {
    console.log(image_url);
  return (
    <div style={styles.card}>
      <img src={"https://netmeds.com/"+image_url} alt={display_name} style={styles.image} />
      <div style={styles.info}>
        <h3>{display_name}</h3>
        <p><strong>Manufacturer:</strong> {manufacturer_name}</p>
        <p><strong>MRP:</strong> ₹{mrp}</p>
        <p><strong>Price:</strong> ₹{selling_price}</p>
        <p><strong>Categories:</strong> {categories.join(", ")}</p>
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
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: {
    marginTop: "10px",
  },
};
