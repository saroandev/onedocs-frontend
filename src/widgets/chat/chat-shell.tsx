import { useState } from "react";
import { MainChatArea } from "./main-chat-area";
import { ChatPrompt } from "./chat-prompt";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export const ChatShell = () => {
  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-1 flex-col">
        <MainChatArea messages={messages} isResponding={isResponding} />
        <ChatPrompt isResponding={isResponding} send={send} />
      </div>
      {/* <DataGridPanel 
          isOpen={dataGridOpen} 
          onClose={() => setDataGridOpen(false)} 
          columns={tableColumns}
          tableName={"tableName"}
        /> */}
    </div>
  );
};

export default ChatShell;
