import { useQuery } from "@tanstack/react-query";
import queryOpt from "./QueryConfigs";

function TestQ() {
  const { data, error, isLoading } = useQuery(queryOpt());
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No data returned</div>;
  return (
    <div>
      {data.map((product: any) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>{product.in_stock ? "In Stock" : "Out of Stock"}</p>
        </div>
      ))}
    </div>
  );
}

export default TestQ;
