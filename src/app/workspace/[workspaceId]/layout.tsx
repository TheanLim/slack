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
            <Toolbar />
            {/* Toolbar above has h-10 ==> 40px so we offset it */}
            <div className="flex h-[calc(100vh-40px)]">
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