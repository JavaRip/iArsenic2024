import { useState } from "react";
import { Button, Popover, ButtonProps } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface HelpInfoPopoverProps {
    id: string;
    children: React.ReactNode;
    buttonAriaLabel?: string;
    buttonProps?: ButtonProps;
    anchorOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" };
    transformOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" };
}

export default function GenericPopover({
    id,
    children,
    buttonAriaLabel = "More info",
    buttonProps,
    anchorOrigin = { vertical: "center", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
}: HelpInfoPopoverProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                aria-label={buttonAriaLabel}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                {...buttonProps}
            >
                <HelpOutlineIcon />
            </Button>

            <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {children}
            </Popover>
        </>
    );
}
