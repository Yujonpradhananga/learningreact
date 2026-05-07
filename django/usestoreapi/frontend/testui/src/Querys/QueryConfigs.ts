import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "../Components/api";

export default function queryOpt() {
  return queryOptions({
    queryKey: ["id1"],
    queryFn: getProducts,
  });
}
