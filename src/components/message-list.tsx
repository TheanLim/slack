import { useCurrentMember } from "@/features/members/api/use-current-members";
import { GetMesagesReturnType } from "@/features/messages/api/use-get-messages";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { ChannelHero } from "./channel-hero";
import { ConversationHero } from "./conversation-hero";
import { Message } from "./message";

const TIME_THRESHOLD = 5;

interface MessageListProps {
    memberName?: string;
    memberImage?: string;
    channelName?: string;
    channelCreationTime?: number;
    variant?: "channel" | "thread" | "conversation";
    data: GetMesagesReturnType | undefined;
    loadMore: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
};

const formatDateLabel = (dateString: string): string => {
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d"); // such as Thursday, October 17
}

export const MessageList = ({
    memberName,
    memberImage,
    channelName,
    channelCreationTime,
    variant = "channel",
    data,
    loadMore,
    isLoadingMore,
    canLoadMore,
}: MessageListProps) => {
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

    const workspaceId = useWorkspaceId();
    const { data: currentMember } = useCurrentMember({ workspaceId });

    // data is the latest BATCH_SIZE messages (in reverse -- latest message is on the top)
    // groupMessages is an array of {datekey:[messageArray]}
    const groupMessages = data?.reduce(
        // ReducerFn(accumulatedValue, arrayItem)
        // accumulatedValue is passed on to the next iteration
        (groups, message) => {
            const date = new Date(message._creationTime);
            const dateKey = format(date, "yyyy-MM-dd");
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            // unshift adds at the beggining of an array
            // Basically the older message is at the front?
            groups[dateKey].unshift(message);
            return groups;
        },
        // Initial Value ---> an empty array
        {} as Record<string, typeof data>
    )
    return (
        // Need flex-col-reverse to reverse the reversed data order, 
        // because data[0] is the latest message, and we want to display at the bottom
        // we also want to load more data as we scroll up
        <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
            {/* Object.entries convert an array into a list of [key, value] pairs */}
            {Object.entries(groupMessages || {}).map(([dateKey, messages]) => (
                <div key={dateKey}>
                    <div className="text-center my-2 relative">
                        <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
                        <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                            {formatDateLabel(dateKey)}
                        </span>
                    </div>
                    {messages.map((message, index) => {
                        const prevMessage = messages[index - 1];
                        const isCompact =
                            prevMessage &&
                            prevMessage.user?._id === message.user?._id &&
                            differenceInMinutes(new Date(message._creationTime), new Date(prevMessage._creationTime)) < TIME_THRESHOLD

                        return (
                            <Message
                                key={message._id}
                                id={message._id}
                                memberId={message.memberId}
                                authorImage={message.user.image}
                                authorName={message.user.name}
                                isAuthor={message.memberId === currentMember?._id}
                                reactions={message.reactions}
                                body={message.body}
                                image={message.image}
                                updatedAt={message.updatedAt}
                                createdAt={message._creationTime}
                                isEditing={editingId === message._id}
                                setEditingId={setEditingId}
                                isCompact={isCompact}
                                hideThreadButton={variant === "thread"}
                                threadCount={message.threadCount}
                                threadImage={message.threadImage}
                                threadTimestamp={message.threadTimestamp}
                            />
                        )
                    })}
                </div>
            ))}
            <div
                className="h-1"
                ref={(el) => {
                    if (el) {
                        const observer = new IntersectionObserver(
                            // Callback function that gets triggered whenever 
                            // the target element’s visibility status crosses a specified threshold.
                            ([entry]) => {
                                if (entry.isIntersecting && canLoadMore) {
                                    loadMore();
                                }
                            },
                            // callback fires only when 100% of the element is visible within the viewport.
                            { threshold: 1.0 }
                        );

                        observer.observe(el);
                        // for cleanup when the component unmounts
                        return () => observer.disconnect();
                    }
                }}
            />
            {isLoadingMore && (
                <div className="text-center my-2 relative">
                    <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
                    <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                        <Loader className="size-4 animate-spin" />
                    </span>
                </div>
            )}
            {variant === "channel" && channelName && channelCreationTime && (
                <ChannelHero
                    name={channelName}
                    creationTime={channelCreationTime}
                />
            )}
            {variant === "conversation" && (
                <ConversationHero
                    name={memberName}
                    image={memberImage}
                />
            )}
        </div>
    )
};