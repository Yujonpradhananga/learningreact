import { useQuery, queryOptions } from "@tanstack/react-query";
import queryOpt from "./QueryOptions";

function TestQ() {
  const { data, error } = useQuery(queryOpt());
  if (error) {
    alert("something went wrong")
  };
  return (
    <>
      <div>{JSON.stringify(data.slice(0, 5))} </div>
    </>
  );
}


export default TestQ
