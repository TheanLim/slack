"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Profile } from "@/features/members/components/profile";
import { Thread } from "@/features/messages/components/threads";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
    const { parentMessageId, profileMemberId, onClose } = usePanel();
    const showPanel = !!parentMessageId || !!profileMemberId;

    return (
        <div className="h-full">
            {/* Toolbar is placed top;has a search bar and an info icon */}
            <Toolbar />
            {/* Toolbar above has h-10 ==> 40px so we offset it */}
            <div className="flex h-[calc(100vh-40px)]">
                {/* Sidebar is placed left; has Home/DMs/Activity/UserButtons and others */}
                <Sidebar />
                <ResizablePanelGroup
                    direction="horizontal"
                    autoSaveId="workspace-layout-id" // can choose any id
                >
                    <ResizablePanel
                        defaultSize={20}
                        minSize={11}
                        className="bg-[#5E2C5F]"
                    >
                        {/* WorkspaceSidebar is between sidebar and workspace; most notably listing out all workspaces */}
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20}>
                        {children}
                    </ResizablePanel>
                    {showPanel && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel minSize={20} defaultSize={29}>
                                {parentMessageId ? (
                                    <Thread
                                        messageId={parentMessageId as Id<"messages">}
                                        onClose={onClose}
                                    />

                                ) : profileMemberId ? (
                                    <Profile
                                        memberId={profileMemberId as Id<"members">}
                                        onClose={onClose}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Loader className="size-5 animate-spin text-muted-foreground" />
                                    </div>
                                )}
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
        </div >
    );
}

export default WorkspaceIdLayout;