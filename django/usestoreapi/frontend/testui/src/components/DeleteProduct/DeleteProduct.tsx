import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../Api/Api.ts";

type Props = {
  id: number;
};

function DeleteProduct({ id }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });

  return (
    <button className="delete-button" onClick={() => mutation.mutate()}>
      Delete
    </button>
  );
}

export default DeleteProduct;
