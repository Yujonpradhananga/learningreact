import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "../components/Api/Api";

export default function queryOpt() {
  return queryOptions({
    queryKey: ["test"],
    queryFn: getProducts,
  });
}
