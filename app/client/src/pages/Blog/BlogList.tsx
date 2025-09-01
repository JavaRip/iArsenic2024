import { Stack } from "@mui/material";
import React from "react";

export function BlogList({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
        {children}
    </Stack>
  );
}
