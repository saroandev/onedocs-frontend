import { useEffect } from "react";
import { useChatStore } from "@/features/chat/store/chat.store";
import { Chat } from "@/widgets/chat/chat";

/**
 * DashboardList - Yeni chat başlangıç ekranı
 * URL: /
 *
 * Bu sayfa:
 * 1. Kullanıcı ilk kez açtığında conversationId olmadan açılır
 * 2. Kullanıcı ilk mesajı gönderdiğinde backend'den conversationId alır
 * 3. /chat/:conversationId URL'ine navigate edilir
 * 4. Conversation o sayfada devam eder
 */
export const DashboardList = () => {
  const clearConversation = useChatStore((state) => state.clearConversation);

  // Dashboard'a geldiğimizde conversationId'yi temizle (yeni chat için)
  useEffect(() => {
    clearConversation();
  }, [clearConversation]);

  return <Chat />;
};
