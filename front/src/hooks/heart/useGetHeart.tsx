import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getLike, postLike } from "../../api/Api";

export default function useGetHeart(perfumeId: string) {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: () => getLike(perfumeId),
  });
}

export function useUpdateHeart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    mutationKey: ["likes"],
  });
}
