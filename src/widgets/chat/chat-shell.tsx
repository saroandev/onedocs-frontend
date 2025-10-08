// import { useState } from "react";
import { ChatPrompt } from "./chat-prompt";
import { useUIStore } from "@/shared/store/ui.store";
import { MainChatArea } from "./main-chat-area";

export const ChatShell = () => {
  const dataGridOpen = useUIStore((state) => state.dataGridOpen);
  const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);

  // const [playbookAnalysisOpen, setPlaybookAnalysisOpen] = useState(false);
  // const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false);

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-col" style={{ width: dataGridOpen ? `50%` : "100%" }}>
        <MainChatArea />
        <ChatPrompt />
      </div>
      {dataGridOpen && (
        <div className="relative flex-shrink-0 w-1 bg-border hover:bg-primary/20 cursor-col-resize transition-colors">
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>
      )}
      {/* Right Panels */}
      {/* {playbookAnalysisOpen ? (
        <PlaybookAnalysisPanel
          isOpen={playbookAnalysisOpen}
          onClose={() => setPlaybookAnalysisOpen(false)}
        />
      ) : documentPreviewOpen ? (
        <DocumentPreviewPanel
          isOpen={documentPreviewOpen}
          onClose={() => setDocumentPreviewOpen(false)}
          documentName={selectedDocumentForPreview?.name || ""}
          documentUrl={selectedDocumentForPreview?.url}
        />
      ) : (
        <DataGridPanel
          isOpen={dataGridOpen}
          onClose={() => setDataGridOpen(false)}
          columns={tableColumns}
          tableName={tableName}
        />
      )} */}
    </div>
  );
};
