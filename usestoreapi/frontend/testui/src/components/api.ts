import axios from "axios";
import useAuthStore from "../store/authStore"

export type Product = {
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
};

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("products/");
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post<Product>("products/", product);
  return response.data;
};
