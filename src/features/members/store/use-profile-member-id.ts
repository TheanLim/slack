import { useQueryState } from "nuqs";

// This allows bidirectional set of state/queries
// [profileMemberId, setProfileMemberId] =  useProfileMemberId(321) <=> https://localhost:8000?parentMessageId=321
export const useProfileMemberId = () => {
    return useQueryState("profileMemberId");
}