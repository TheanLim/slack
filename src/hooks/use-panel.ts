import { useProfileMemberId } from "@/features/members/store/use-profile-member-id";
import { useParentMessageId } from "@/features/messages/store/use-parent-message-id";

export const usePanel = () => {
    const [parentMessageId, setParentMessageId] = useParentMessageId();
    const [profileMemberId, setProfileMemberId] = useProfileMemberId();

    const onOpenMessage = (messageId: string) => {
        setParentMessageId(messageId);
        // Only open either Message or Profile at once
        setProfileMemberId(null)
    }

    const onOpenProfile = (memberId: string) => {
        setProfileMemberId(memberId);
        // Only open either Message or Profile at once
        setParentMessageId(null);
    }

    const onClose = () => {
        setParentMessageId(null);
        setProfileMemberId(null);
    }

    return {
        parentMessageId,
        profileMemberId,
        onOpenMessage,
        onOpenProfile,
        onClose,
    }
}