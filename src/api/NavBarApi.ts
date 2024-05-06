import React from "react";

export interface Page {
    name: string;
    icon: React.ReactElement;
    onClick: () => void;
    key: number;
}
