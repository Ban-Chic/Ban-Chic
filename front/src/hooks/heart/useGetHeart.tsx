import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getLike, postLike } from "../../api/Api";

export default function useGetHeart(perfumeId: string) {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: () => getLike(perfumeId),
  });
}

export function useUpdateHeart(perfumeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postLike(perfumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
      queryClient.invalidateQueries({ queryKey: ["perfume"] });
    },
    mutationKey: ["likes"],
  });
}
