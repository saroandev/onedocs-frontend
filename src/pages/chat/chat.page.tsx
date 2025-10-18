import { Chat } from "@/widgets/chat/chat";
/**
 * ChatPage - Mevcut conversation ekranı
 * URL: /chat/:conversationId
 *
 * Bu sayfa:
 * 1. URL'den conversationId'yi alır
 * 2. useGetChatById ile conversation history'sini yükler
 * 3. Kullanıcı refresh attığında conversation'ı tekrar yükler
 * 4. Yeni mesajlar eklendiğinde conversation'ı günceller
 */
export const ChatPage = () => <Chat />;
