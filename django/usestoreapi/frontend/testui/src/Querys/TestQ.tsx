import { useQuery } from "@tanstack/react-query";
import queryOpt from "./QueryConfigs";
import DeleteProduct from "../components/DeleteProduct/DeleteProduct";
import "./TestQ.css";

function TestQ() {
  const { data, error, isLoading } = useQuery(queryOpt());
  if (isLoading) return <div className="loading-text">Loading...</div>;
  if (error) return <div className="error-text">Error: {String(error)}</div>;
  if (!data) return <div className="no-data-text">No data returned</div>;

  return (
    <div className="products-wrapper">
      <p className="products-subheading">Your Inventory</p>
      <h1 className="products-heading">Your Products</h1>
      <div className="products-grid">
        {data.map((product: any) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            <p className={product.in_stock ? "in-stock" : "out-of-stock"}>
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </p>
            <DeleteProduct id={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestQ;
