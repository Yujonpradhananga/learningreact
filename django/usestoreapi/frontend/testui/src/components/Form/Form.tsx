import type { FormData } from "../AddProduct/AddProduct";
import "./Form.css";

type FormProps = {
  formData: FormData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
};

function Form({ formData, errors, handleChange, handleSubmit }: FormProps) {
  return (
    <div className="form-wrapper">
      <h1>Add New Product</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product name" />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
          <div className="form-field">
            <label>Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Product description" />
          </div>
          <div className="form-field">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" />
            {errors.price && <p className="form-error">{errors.price}</p>}
          </div>
          <div className="checkbox-field">
            <input type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} />
            <label>In Stock</label>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
