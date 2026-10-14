import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/user.api";
import type { Iuser } from "../types/user.types";

export const useuserprofile = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("accessToken")
      : null;

  const { data: userprofiledata, isLoading, isError, error } = useQuery<Iuser>({
    queryKey: ["user"],
    queryFn: () => fetchUserProfile(),
    enabled: Boolean(token),
    // retry: false,
  });

  const userprofile: Iuser | undefined = (userprofiledata as any)?.data || userprofiledata;

  return { userprofiledata, userprofile, isLoading, isError, error };
};