import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EmojiPopoverProps {
    children: React.ReactNode;              // The content that will trigger the popover (e.g., an emoji icon or button).
    hint?: string;                          // A string that will be shown in the tooltip. 
    onEmojiSelect: (emoji: any) => void;    // A function that will be called when an emoji is selected.
}

export const EmojiPopover = ({
    children,
    hint = "Emoji",
    onEmojiSelect,
}: EmojiPopoverProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const onSelect = (emoji: any) => {
        onEmojiSelect(emoji);
        setPopoverOpen(false);

        // Buggy: Need to set timeout
        setTimeout(() => {
            setTooltipOpen(false);
        }, 500)
    }

    return (
        <TooltipProvider>
            {/* Popover provides a floating interface for the emoji picker. 
            It opens when triggered and closes when a user selects an emoji or clicks outside. */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger>
                            {children}
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent className="bg-black text-white border border-white/5">
                        <p className="font-medium text-xs">{hint}</p>
                    </TooltipContent>
                </Tooltip>
                <PopoverContent className="p-0 w-full border-none shadow-none">
                    <Picker data={data} onEmojiSelect={onSelect} />
                </PopoverContent>
            </Popover>
        </TooltipProvider>
    )
}