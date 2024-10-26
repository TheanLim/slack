import { Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { useCreateMessage } from "../api/use-create-message";
import { useGetMessage } from "../api/use-get-message";
import { useGetMessages } from "../api/use-get-messages";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const TIME_THRESHOLD = 5;

interface ThreadProps {
    messageId: Id<"messages">;
    onClose: () => void;
}

type CreateMessageValues = {
    channelId: Id<"channels">;
    workspaceId: Id<"workspaces">;
    parentMessageId: Id<"messages">;
    body: string;
    image: Id<"_storage"> | undefined;
}

const formatDateLabel = (dateString: string): string => {
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d"); // such as Thursday, October 17
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
    const channelId = useChannelId();
    const workspaceId = useWorkspaceId();

    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
    const [editorKey, setEditorKey] = useState(0)
    const [isPending, setIsPending] = useState(false);

    // Defined at this level because we want to disable it in handleSubmit
    const editorRef = useRef<Quill | null>(null);

    const { data: currentMember } = useCurrentMember({ workspaceId });
    const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId });
    const { mutate: generateUploadUrl } = useGenerateUploadUrl();
    const { mutate: createMessage } = useCreateMessage();
    // results doesn't include parent message itself
    const { results, status, loadMore } = useGetMessages({ channelId, parentMessageId: messageId });

    const canLoadMore = status === "CanLoadMore";
    const isLoadingMore = status === "LoadingMore";

    // data is the latest BATCH_SIZE messages (in reverse -- latest message is on the top)
    // groupMessages is an array of {datekey:[messageArray]}
    const groupMessages = results?.reduce(
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
        {} as Record<string, typeof results>
    )

    if (loadingMessage || status === "LoadingFirstPage") {
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

    const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
        try {
            setIsPending(true);
            editorRef?.current?.enable(false);

            const values: CreateMessageValues = {
                channelId: channelId,
                workspaceId: workspaceId,
                parentMessageId: messageId,
                body: body,
                image: undefined,
            }

            if (image) {
                const url = await generateUploadUrl(
                    {},
                    {
                        throwError: true
                    }
                );

                if (!url) {
                    throw new Error("Url not found");;
                }

                const result = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": image.type },
                    body: image,
                });

                if (!result.ok) {
                    throw new Error("Failed to upload image");
                }

                const { storageId } = await result.json();
                values.image = storageId;
            }

            await createMessage(
                values,
                {
                    throwError: true
                }
            );

            // Setting a new key for the Editor forces it to rerender
            setEditorKey((prevKey) => prevKey + 1);
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setIsPending(false);
            editorRef?.current?.enable(true);
        }
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
            <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
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
                                    hideThreadButton
                                    threadCount={message.threadCount}
                                    threadImage={message.threadImage}
                                    threadTimestamp={message.threadTimestamp}
                                />
                            )
                        })}
                    </div>
                ))}
                {isLoadingMore && (
                    <div className="text-center my-2 relative">
                        <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
                        <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                            <Loader className="size-4 animate-spin" />
                        </span>
                    </div>
                )}
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
            <div className="px-4">
                <Editor
                    key={editorKey}
                    onSubmit={handleSubmit}
                    innerRef={editorRef}
                    disabled={isPending}
                    placeholder="Reply.."
                />
            </div>
        </div>
    )
}