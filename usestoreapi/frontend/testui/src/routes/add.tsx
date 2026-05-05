import { createFileRoute } from "@tanstack/react-router";
import AddProduct from "../components/AddProduct.tsx";

export const Route = createFileRoute("/add")({
  component: AddProduct,
});
