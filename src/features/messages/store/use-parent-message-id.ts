import { useQueryState } from "nuqs";

// This allows bidirectional set of state/queries
// [parentMessageId, setParentMessageId] =  useParentMessageId(321) <=> https://localhost:8000?parentMessageId=321
export const useParentMessageId = () => {
    return useQueryState("parentMessageId");
}