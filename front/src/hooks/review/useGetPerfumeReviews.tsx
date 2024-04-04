import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPerfumeReviews,
  postPerfumeReview,
  updatePerfumeReview,
  deletePerfumeReview,
} from "../../api/Api";

export default function useGetPerfumeReviews(perfumeId: string) {
  return useQuery({
    queryKey: ["perfumereviews"],
    queryFn: () => getPerfumeReviews(perfumeId),
  });
}

export function usePostReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ perfumeId, rate, content }: any) =>
      postPerfumeReview(perfumeId, rate, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfumereviews"] });
    },
    mutationKey: ["postReview"],
  });
}

interface Props {
  perfumeId: string;
  reviewId: number;
  rate: number;
  content: string;
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ perfumeId, reviewId, rate, content }: Props) =>
      updatePerfumeReview(Number(perfumeId), reviewId, {
        rate: rate,
        content: content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfumereviews"] });
    },
    mutationKey: ["putReview"],
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ perfumeId, reviewId }: any) =>
      deletePerfumeReview(perfumeId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfumereviews"] });
    },
    mutationKey: ["deleteReview"],
  });
}
