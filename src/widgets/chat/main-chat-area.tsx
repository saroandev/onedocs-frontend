import { useEffect, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown, Copy as CopyIcon, Mail, Edit } from "lucide-react";
import { useUIStore } from "@/shared/store/ui.store";
import { useChatStore } from "@/features/chat/store/chat.store";
import { Button } from "@/shared/ui";
import type { ChatMessage } from "./types/chat.types";

export const MainChatArea = () => {
  const setEditorOpen = useUIStore((state) => state.setEditorOpen);
  const setEditorContent = useUIStore((state) => state.setEditorContent);
  const setTableName = useUIStore((state) => state.setTableName);
  const setTableColumns = useUIStore((state) => state.setTableColumns);
  const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);
  const messages = useChatStore((state) => state.messages);
  const isResponding = useChatStore((state) => state.isResponding);
  const setMessages = useChatStore((state) => state.setMessages);
  const setIsResponding = useChatStore((state) => state.setIsResponding);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfOpen, setPdfOpen] = useState<boolean>(false);
  const [waitingForTimeEntryResponse, setWaitingForTimeEntryResponse] = useState(false);
  const prevIsRespondingRef = useRef(isResponding);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isResponding]);

  // Listen for time entry request event
  useEffect(() => {
    const handleTimeEntryRequest = async (event: CustomEvent) => {
      const { prompt, date } = event.detail;

      // Send the prompt to assistant
      await send(prompt);

      // Set flag to wait for response
      setWaitingForTimeEntryResponse(true);
    };

    window.addEventListener("timeEntryRequest", handleTimeEntryRequest as EventListener);
    return () =>
      window.removeEventListener("timeEntryRequest", handleTimeEntryRequest as EventListener);
  }, []);

  // Watch for response completion and open data grid
  useEffect(() => {
    // Check if responding just finished
    if (prevIsRespondingRef.current && !isResponding && waitingForTimeEntryResponse) {
      // Response is complete, now open data grid
      setWaitingForTimeEntryResponse(false);

      // Set up the data grid
      setTableName("7 Ekim 2025, Zaman Girişi");
      setTableColumns(["Kategori", "Aktivite", "Harcanan Süre", "Faturalandırma", "Firma"]);
      setDataGridOpen(true);
    }

    prevIsRespondingRef.current = isResponding;
  }, [isResponding, waitingForTimeEntryResponse, setTableName, setTableColumns, setDataGridOpen]);

  // Helper function to check if message is a time entry response
  const isTimeEntryMessage = (content: string) => {
    return content.includes("Bugün") && content.includes("saat bilgisayar başındaydın");
  };

  // Helper function to open time entry data grid
  const handleOpenTimeEntryGrid = () => {
    setTableName("7 Ekim 2025, Zaman Girişi");
    setTableColumns(["Kategori", "Aktivite", "Harcanan Süre", "Faturalandırma", "Firma"]);
    setDataGridOpen(true);
  };

  // Detect PDF link in the latest assistant message and auto-open preview
  useEffect(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant) return;
    const match = lastAssistant.content.match(/https?:\/\/\S+\.pdf(\?\S*)?/i);
    if (match) {
      const url = match[0];
      setPdfUrl(url);
      setPdfOpen(true);
    }
  }, [messages]);

  const send = async (userMessage: string) => {
    // Add user message immediately
    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, newUserMsg]);

    // Start responding
    setIsResponding(true);

    // Simulate assistant response
    setTimeout(() => {
      const isTimeEntryPrompt = userMessage.includes("zaman girişi yapmak istiyorum");

      if (isTimeEntryPrompt) {
        const response = `Bugün 7 saat bilgisayar başındaydın. Aşağıdaki tahminleri yaptım:

<table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
  <thead>
    <tr style="background-color: #F3F4F6; border-bottom: 1px solid #E5E7EB;">
      <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #1F2937;">Süre</th>
      <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #1F2937;">Aktivite</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 12px 16px; color: #6B7280;">1.5 saat</td>
      <td style="padding: 12px 16px; color: #1F2937;">KG AI lansman hazırlığı (Toplantı notları + Chrome + Notion)</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 12px 16px; color: #6B7280;">1 saat</td>
      <td style="padding: 12px 16px; color: #1F2937;">Müşteri görüşmesi (Takvim etkinliği)</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 12px 16px; color: #6B7280;">2.5 saat</td>
      <td style="padding: 12px 16px; color: #1F2937;">Onedocs demo ve dokümantasyon</td>
    </tr>
    <tr>
      <td style="padding: 12px 16px; color: #6B7280;">1 saat</td>
      <td style="padding: 12px 16px; color: #1F2937;">Slack & Mail — İletişim</td>
    </tr>
  </tbody>
</table>`;

        const newAssistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, newAssistantMsg]);
      } else {
        const response =
          "Bu bir örnek yanıt. Gerçek AI entegrasyonu eklendiğinde gerçek cevaplar gelecek.";
        const newAssistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, newAssistantMsg]);
      }
      setIsResponding(false);
    }, 4000);
  };

  return (
    <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden bg-background">
      <div className="mx-auto max-w-[800px] px-6">
        <div className="py-12">
          {/* PDF toggle */}
          {pdfUrl && (
            <div className="mb-3 flex justify-end">
              <Button variant="outline" className="h-8" onClick={() => setPdfOpen((v) => !v)}>
                {pdfOpen ? "PDF Önizlemeyi Kapat" : "PDF Önizleme"}
              </Button>
            </div>
          )}

          {/* When no messages, keep the welcome section */}
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full max-w-full flex-col items-center gap-12">
                {/* Welcome Section */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <h1 className="text-[32px] font-bold text-text-primary">hukuk-asistani</h1>
                  </div>
                  <p className="mt-6 text-center text-base leading-relaxed text-text-secondary">
                    Hukuk Asistanı; sorularınızı yanıtlar, metinleri özetler, dilekçe ve sözleşme
                    taslakları oluşturur, ilgili mevzuat ve emsal kararlara yönlendirir. Kısaca,
                    günlük hukuki işlerinizi hızlandırmak için yanınızdadır
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Messages list
            <div className="flex w-full min-w-0 flex-col gap-4">
              {messages.map((m) => {
                const isUser = m.role === "user";
                const hasHtmlTable = !isUser && m.content.includes("<table");
                const isTimeEntry = !isUser && isTimeEntryMessage(m.content);

                return (
                  <div
                    key={m.id}
                    className={`flex w-full min-w-0 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] min-w-0 w-full ${isUser ? "flex justify-end" : ""}`}
                    >
                      {isUser ? (
                        <div className="inline-block w-fit max-w-full md:max-w-[80%] rounded-2xl bg-black text-white px-4 py-2">
                          <div className="whitespace-pre-wrap break-words break-all [overflow-wrap:anywhere] text-sm leading-relaxed">
                            {m.content}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {hasHtmlTable ? (
                            <div
                              className="text-sm leading-relaxed text-foreground overflow-hidden max-w-full"
                              dangerouslySetInnerHTML={{ __html: m.content }}
                            />
                          ) : (
                            <div className="whitespace-pre-wrap break-words break-all [overflow-wrap:anywhere] text-sm leading-relaxed text-foreground overflow-hidden max-w-full">
                              {m.content}
                            </div>
                          )}

                          {/* Time Entry Edit Card */}
                          {isTimeEntry && (
                            <button
                              onClick={handleOpenTimeEntryGrid}
                              className="flex items-center justify-center rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md"
                            >
                              Zaman Girişi Raporunu Düzenle
                            </button>
                          )}

                          {/* If assistant message contains a PDF link, show quick preview opener */}
                          {(() => {
                            const match = m.content.match(/https?:\/\/\S+\.pdf(\?\S*)?/i);
                            if (!match) return null;
                            const url = match[0];
                            return (
                              <div className="mt-2 flex justify-start">
                                <Button
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => {
                                    setPdfUrl(url);
                                    setPdfOpen(true);
                                  }}
                                >
                                  Sağda PDF Önizle
                                </Button>
                              </div>
                            );
                          })()}

                          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Beğen"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Beğenme"
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Kopyala"
                              onClick={() => navigator.clipboard?.writeText(m.content)}
                            >
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="E-posta"
                              onClick={() => {
                                const subject = encodeURIComponent("Sohbet Mesajı");
                                const body = encodeURIComponent(m.content);
                                window.location.href = `mailto:?subject=${subject}&body=${body}`;
                              }}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Editöre Ekle"
                              onClick={() => {
                                setEditorContent(m.content);
                                setEditorOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isResponding && (
                <div className="flex w-full justify-start">
                  <div className="max-w-[80%] rounded-2xl border bg-card text-foreground border-border px-4 py-2 shadow-sm">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]"></span>
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></span>
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.2s]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Right-side PDF preview panel */}
      {pdfOpen && pdfUrl && (
        <aside className="fixed right-0 top-0 z-30 hidden h-full w-[420px] border-l border-border bg-white md:block">
          <div className="flex items-center justify-between border-b border-border p-2">
            <div className="text-sm font-medium text-text-secondary truncate">PDF Önizleme</div>
            <Button variant="ghost" size="sm" className="h-8" onClick={() => setPdfOpen(false)}>
              Kapat
            </Button>
          </div>
          <iframe src={pdfUrl} className="h-[calc(100%-40px)] w-full" title="PDF Preview" />
        </aside>
      )}
    </div>
  );
};
