import { useState } from 'react';
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  return (
    <div>
      <SearchBar />
      <ProductTable values={products} />
    </div>
  );
}
const ProductTable = ({ values }) => {
  const rows = [];
  let lastCategory = null;
  values.forEach((niga) => {
    if (niga.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={niga.category}
          key={niga.category}
        />
      );
    }
    rows.push(
      <ProductRow
        product={niga}
        key={niga.name}
      />
    );
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const ProductCategoryRow = ({ category }) => (
  <tr><td><strong>{category}</strong></td></tr>
);
const ProductRow = ({ product }) => (
  <tr>
    <td>{product.name}</td>
    <td>{product.price}</td>
  </tr>
);


const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
