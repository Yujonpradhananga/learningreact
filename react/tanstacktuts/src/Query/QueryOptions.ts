import { queryOptions } from "@tanstack/react-query";
export default function queryOpt() {
  return queryOptions({
    queryKey: ["test"],
    queryFn: getQuery,
  }
  );
}
const getQuery = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=${1}");
  return response.json()
}
