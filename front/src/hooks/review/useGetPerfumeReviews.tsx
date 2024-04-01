import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPerfumeReviews, postPerfumeReview, updatePerfumeReview } from "../../api/Api";

export default function useGetPerfumeReviews(perfumeId: string) {
  return useQuery({
    queryKey: ["perfumereviews"],
    queryFn: () => getPerfumeReviews(perfumeId),
  });
}


export function usePostReview(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({perfumeId, rate, content}:any)=>postPerfumeReview(perfumeId, rate, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfumereviews"] });
    },
    mutationKey: ["postReview"],
  });
}

export function useUpdateReview(perfumeId:number, reviewId:number, newReview:object){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ()=>updatePerfumeReview(perfumeId, reviewId, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfumereviews"] });
    },
    mutationKey: ["updateReview"],
  });
}