import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct, type Product } from "../Api/Api.ts";
import z from "zod";
import { useState } from "react";

const UpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  price: z.number().positive("Price must be positive"),
  in_stock: z.boolean(),
});
export type FormData = {
  name: string;
  description: string;
  price: string;
  in_stock: boolean;
};
type Props = {
  id: number;
  product: FormData;
};
function UpdateProduct({ id, product }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: product.name,
    description: product.description,
    price: String(product.price),
    in_stock: product.in_stock,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updateProduct(id, {
      ...formData,
      price: Number(formData.price),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = UpdateSchema.safeParse({
      ...formData,
      price: Number(formData.price),
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[key] = value?.[0] ?? "";
      }
      setErrors(fieldErrors);
      return;
    }
    mutation.mutate();
  };
  if (!isOpen) {
    return (
      <button className="update-button" onClick={() => setIsOpen(true)}>
        Edit
      </button>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>
        <div>
          <input type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} />
          <label>In Stock</label>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
