import { Paperclip, ArrowUp, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApp } from "@/lib/app-context";
import { useLocation } from "react-router-dom";

interface ChatPromptProps {
  isResponding: boolean;
  send: (text: string) => Promise<void>;
}

export const ChatPrompt = (props: ChatPromptProps) => {
  return <div className="flex flex-col flex-shrink-0 bg-background px-6 py-4"></div>;
};
