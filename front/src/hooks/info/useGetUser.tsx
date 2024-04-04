import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMember, updateNickname, updateProfileImage } from "../../api/Api";

export default function useGetUser() {
  return useQuery({
    queryKey: ["mypage"],
    queryFn: () => getMember(Number(localStorage.getItem("uid"))),
  });
}

export function useUpdateNickname() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    },
    mutationKey: ["nickname"],
  });
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    },
    mutationKey: ["profileImage"],
  });
}
