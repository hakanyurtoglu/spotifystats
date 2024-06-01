"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function DashboardTabs() {
  const tabs = ["Top Artists", "Top Tracks", "Top Tops"];
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      {tabs.map((label, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={cn(
            "text-muted-foreground text-xl transition-all",
            activeTab === index && "font-bold"
          )}
        >
          {label}
        </button>
      ))}
    </>
  );
}
