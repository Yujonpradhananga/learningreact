import type { FormData } from "./AddProduct";


type FormProps = {
  formData: FormData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
};

function Form({ formData, errors, handleChange, handleSubmit }: FormProps) {
  return (
    <div style={{ margin: "20px" }}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br />

        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />

        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        <br />

        <label>
          In Stock:
          <input type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
