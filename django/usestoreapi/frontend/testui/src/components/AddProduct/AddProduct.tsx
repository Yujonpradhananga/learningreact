import { useState } from "react";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../Api/Api";
import Form from "../Form/Form.tsx";

const ProductSchema = z.object({
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

function AddProduct() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    in_stock: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
      setFormData({
        name: "",
        description: "",
        price: "",
        in_stock: false,
      });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result = ProductSchema.safeParse({
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
    mutation.mutate(result.data);
  };

  return (
    <Form
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddProduct;
