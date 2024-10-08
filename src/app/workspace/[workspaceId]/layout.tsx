"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            {/* Toolbar is placed top;has a searc hbar and an info icon */}
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
                </ResizablePanelGroup>
            </div>
        </div>
    );
}

export default WorkspaceIdLayout;