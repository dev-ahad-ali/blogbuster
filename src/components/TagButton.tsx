import { Toggle } from "@/components/ui/toggle";
import { BookmarkIcon } from "lucide-react";
import React from "react";

export function TagButton({ children }: { children: React.ReactNode }) {
    return (
        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
            <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
            {children}
        </Toggle>
    );
}
