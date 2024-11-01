import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialogOld";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateChannel } from "../api/use-create-channel";
import { useCreateChannelModal } from "../store/use-create-channel-modal";

export const CreateChannelModal = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useCreateChannel();
    const [open, setOpen] = useCreateChannelModal();
    const [name, setName] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Replaces whitespace with "-" and change to lowercase in real time
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(value);
    }
    // Handle when a Dialog is closed, or when the form is submitted
    const handleClose = () => {
        setName("");
        setOpen(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(
            {
                name,
                workspaceId
            },
            {
                onSuccess: (id) => {
                    toast.success("Channel created")
                    router.push(`/workspace/${workspaceId}/channel/${id}`);
                    handleClose();
                },
                onError: () => {
                    toast.error("Failed to create channel")
                }
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Add a channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        disabled={isPending}
                        onChange={handleChange}
                        required
                        autoFocus
                        minLength={3}
                        maxLength={80}
                        placeholder="e.g. plan-budget"
                    />
                    {/* Create a container that pushes the Button within it to the end (aka far right) */}
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}