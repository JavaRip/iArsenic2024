import { Card, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface StandardCardProps {
    children: ReactNode;
    gap?: string;
    sx?: SxProps<Theme>;
    variant?: "outlined" | "elevation";
    expandable?: string; // px value
}

export default function StandardCard({ 
    children, 
    sx, 
    variant = "outlined",
    gap = '1rem',
    expandable,
}: StandardCardProps) {

    const expandableStyle = {
        width: expandable,
        maxWidth: '100vw',
        mx: 'auto',
        px: 2,
    }

    return (
        <Card
            variant={variant}
            sx={{
                margin: "0 1rem 1rem 1rem",
                padding: "1rem",
                width: "100%",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap,
                ...(expandable ? expandableStyle : {}),
                ...sx,
            }}
        >
            {children}
        </Card>
    );
}