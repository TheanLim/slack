import { Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMessage } from "../api/use-get-message";

interface ThreadProps {
    messageId: Id<"messages">;
    onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
    const workspaceId = useWorkspaceId();
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

    const { data: currentMember } = useCurrentMember({ workspaceId });
    const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId });

    if (loadingMessage) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center h-[49px] p-4 border-b">
                    <p className="text-lg font-bold">Thread</p>
                    <Button onClick={onClose} size="iconSm" variant="ghost">
                        <XIcon className="size-5 storke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )
    }

    // When message is not found, i.e., deleted
    if (!message) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center h-[49px] p-4 border-b">
                    <p className="text-lg font-bold">Thread</p>
                    <Button onClick={onClose} size="iconSm" variant="ghost">
                        <XIcon className="size-5 storke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <AlertTriangle className="size-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Message not found</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center h-[49px] p-4 border-b">
                <p className="text-lg font-bold">Thread</p>
                <Button onClick={onClose} size="iconSm" variant="ghost">
                    <XIcon className="size-5 storke-[1.5]" />
                </Button>
            </div>
            <div>
                <Message
                    hideThreadButton
                    id={message._id}
                    body={message.body}
                    image={message.image}
                    reactions={message.reactions}
                    authorImage={message.user.image}
                    authorName={message.user.name}
                    memberId={message.memberId}
                    isAuthor={message.memberId === currentMember?._id}
                    createdAt={message._creationTime}
                    updatedAt={message.updatedAt}
                    isEditing={editingId === message._id}
                    setEditingId={setEditingId}
                />
            </div>
        </div>
    )
}