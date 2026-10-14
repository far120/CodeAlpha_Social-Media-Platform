import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/user.api";

export const useUsers = (page = 1, limit = 10, search = "", role = "") => {
  const { data: allUsersdata, isLoading, isError, error } = useQuery({
    queryKey: ["users", page, limit, search, role],
    queryFn: () => getAllUsers(page, limit, search, role),
  });

  const allUsers = allUsersdata?.data;
  const pagination = allUsersdata?.pagination;

  return { allUsers,pagination, isLoading, isError, error };
};
