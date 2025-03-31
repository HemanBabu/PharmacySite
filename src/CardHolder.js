export default function CardHolder({ children }) {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    padding: "16px",
  },
};
