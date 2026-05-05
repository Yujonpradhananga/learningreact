import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "../components/api";

export default function queryOpt() {
  return queryOptions({
    queryKey: ["id1"],
    queryFn: getProducts,
  });
}
