import { useApp } from "@/lib/app-context";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy as CopyIcon, Mail } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

interface MainChatAreaProps {
  messages: ChatMessage;
  isResponding: boolean;
}

export const MainChatArea = (props: MainChatAreaProps) => {
  return (
    <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden bg-background"></div>
  );
};

export default MainChatArea;
