import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCurrentUser = () => {
    const data = useQuery(api.users.current);
    const isLoading = data === undefined;  // it will return null if it doesn't exist, and once it fully loads

    return { data, isLoading };
}