import { useEffect } from "react";
import { useChatStore } from "@/features/chat/store/chat.store";
import { Chat } from "@/widgets/chat/chat";
import { useUIStore } from "@/shared/store/ui.store";

export const DashboardList = () => {
  const clearConversation = useChatStore((state) => state.clearConversation);
  const preloadModule = useUIStore((state) => state.preloadModule);

  useEffect(() => {
    preloadModule("chat/chat.page.tsx");
    clearConversation();
  }, [clearConversation, preloadModule]);

  return <Chat />;
};
