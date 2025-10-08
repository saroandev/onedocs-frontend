import {
  Paperclip,
  ArrowUp,
  Globe,
  Loader2,
  Plus,
  FileEdit,
  FileText,
  FileSearch,
  GitCompare,
  Search,
  Scale,
  X,
  Library,
  Clock,
} from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useUIStore } from "@/shared/store/ui.store";
import { useChatStore } from "@/features/chat/store/chat.store";
import { showNotification } from "@/shared/lib/notification";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";

// Document templates from belge-otomasyonu
const DOCUMENT_TEMPLATES = [
  {
    id: "is-sozlesmesi",
    title: "İş Sözleşmesi Şablonu",
    description:
      "Standart iş sözleşmesi için çalışan bilgileri, pozisyon, maaş ve iş koşullarını içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "gizlilik-sozlesmesi",
    title: "Gizlilik Sözleşmesi (NDA)",
    description:
      "Taraflar arası gizlilik taahhüdü için şablon. Gizli bilgi kapsamı, yükümlülükler ve süre bilgilerini içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "hizmet-sozlesmesi",
    title: "Hizmet Sözleşmesi",
    description:
      "Hizmet sağlayıcı ile müşteri arasında kapsam, süre, ücret ve ödeme koşullarını belirler.",
    category: "Sözleşmeler",
  },
  {
    id: "kira-sozlesmesi",
    title: "Kira Sözleşmesi",
    description:
      "Konut veya işyeri kiralaması için kiracı-malik bilgileri, kira bedeli, süre ve depozito şartlarını içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "satis-sozlesmesi",
    title: "Satış Sözleşmesi",
    description:
      "Mal veya hizmet satışı için alıcı-satıcı, bedel, teslimat ve ödeme şartlarını düzenler.",
    category: "Sözleşmeler",
  },
  {
    id: "ihtarname",
    title: "İhtarname",
    description:
      "Karşı tarafa resmi uyarı ve talep bildirimi. Edimin ifası, süre ve yasal sonuçları içerir.",
    category: "Bildirimler",
  },
  {
    id: "vekaletname",
    title: "Vekâletname",
    description:
      "Belirli işlemler için yetki devri belgesi. Vekil bilgileri, yetki kapsamı ve geçerlilik süresi.",
    category: "Yetkilendirme",
  },
  {
    id: "muvafakatname",
    title: "Muvafakatname",
    description:
      "Belirli bir işlem veya eylem için açık rıza beyanı. Kişi bilgileri ve muvafakat konusunu içerir.",
    category: "Beyanlar",
  },
  {
    id: "toplanti-tutanagi",
    title: "Toplantı Tutanağı",
    description:
      "Resmi toplantı özeti için şablon. Katılımcılar, gündem, alınan kararlar ve aksiyon maddeleri.",
    category: "Tutanaklar",
  },
];

export const ChatPrompt = () => {
  const [preSelectedProvider, setPreSelectedProvider] = useState<string | null>(null);
  const setEditorOpen = useUIStore((state) => state.setEditorOpen);
  const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);
  const setEditorContent = useUIStore((state) => state.setEditorContent);
  const setPlaybookAnalysisOpen = useChatStore((state) => state.setPlaybookAnalysisOpen);
  const isResponding = useChatStore((state) => state.isResponding);
  const setSelectedPlaybookForAnalysis = useChatStore(
    (state) => state.setSelectedPlaybookForAnalysis
  );
  const [value, setValue] = useState("");
  const [providers, setProviders] = useState<{ karar: boolean; mevzuat: boolean; reklam: boolean }>(
    { karar: false, mevzuat: false, reklam: false }
  );
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

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

  // Collections state - mock data matching sidebar
  const [collections] = useState<
    Array<{
      id: string;
      name: string;
      fileCount: number;
      size: string;
      members: number;
      creator: string;
      lastUpdated: string;
      scope: "personal" | "org";
    }>
  >([
    {
      id: "1",
      name: "İç Politika ve Prosedürler",
      fileCount: 4,
      size: "2.1 MB",
      members: 1,
      creator: "Emrullah",
      lastUpdated: "Bugün",
      scope: "personal",
    },
    {
      id: "3",
      name: "Mevzuat ve Yönetmelikler",
      fileCount: 8,
      size: "12.3 MB",
      members: 2,
      creator: "Emrullah",
      lastUpdated: "Dün",
      scope: "org",
    },
    {
      id: "4",
      name: "İnsan Kaynakları Politikaları",
      fileCount: 5,
      size: "3.2 MB",
      members: 1,
      creator: "Emrullah",
      lastUpdated: "2 gün önce",
      scope: "personal",
    },
    {
      id: "5",
      name: "Ticari Sözleşmeler",
      fileCount: 7,
      size: "8.5 MB",
      members: 3,
      creator: "Emrullah",
      lastUpdated: "1 hafta önce",
      scope: "org",
    },
  ]);
  const [selectedCollections, setSelectedCollections] = useState<Array<(typeof collections)[0]>>(
    []
  );

  // Load selected collections from custom event (from sidebar)
  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<Array<(typeof collections)[0]>>;
      const selectedCols = ce.detail ?? [];
      if (selectedCols.length > 0) {
        setSelectedCollections(selectedCols);
      }
    };
    window.addEventListener("selectCollections", handler as EventListener);
    return () => window.removeEventListener("selectCollections", handler as EventListener);
  }, []);

  // Modal states
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [playbookModalOpen, setPlaybookModalOpen] = useState(false);

  // Playbooks for analysis
  const [playbooks] = useState([
    {
      id: "pb1",
      title: "SaaS Sözleşmesi (Alıcı Olarak)",
      titleEn: "SaaS Agreement (as Buyer)",
      description:
        "Bu playbook, yazılım hizmet (SaaS) sözleşmelerini alıcı/müşteri perspektifinden değerlendirmek için kullanılır.",
    },
    {
      id: "pb2",
      title: "Ticari Gizlilik Sözleşmesi (Alıcı Olarak)",
      titleEn: "Commercial NDA (as Receiver)",
      description:
        "Bu playbook, ticari gizlilik sözleşmelerini (NDA) bilgi alan taraf perspektifinden incelemek için kullanılır.",
    },
    {
      id: "pb3",
      title: "Birleşme & Devralma GİS (Alıcı Olarak)",
      titleEn: "M&A NDA (as Acquirer)",
      description:
        "Bu playbook, birleşme ve devralma (M&A) süreçlerinde kullanılan gizlilik sözleşmelerini devralan taraf bakış açısından değerlendirmek içindir.",
    },
    {
      id: "pb4",
      title: "Tedarikçi/Satıcı Sözleşmesi (Alıcı Olarak)",
      titleEn: "Vendor/Supplier (as Buyer)",
      description:
        "Bu playbook, mal veya hizmet tedarik sözleşmelerini alıcı şirket açısından incelemek için kullanılır.",
    },
    {
      id: "pb5",
      title: "İş Sözleşmesi (İşveren Olarak)",
      titleEn: "Employment Agreement (as Employer)",
      description:
        "Bu playbook, iş sözleşmelerini işveren tarafı açısından hazırlamak ve gözden geçirmek için kullanılır.",
    },
  ]);

  // File inputs
  const docxEditInputRef = React.useRef<HTMLInputElement | null>(null);
  const docxAnalysisInputRef = React.useRef<HTMLInputElement | null>(null);

  // Show all collections (both personal and org)
  const filteredCollections = React.useMemo(() => {
    return collections;
  }, [collections]);

  // Apply pre-selected provider on mount
  React.useEffect(() => {
    if (preSelectedProvider) {
      if (preSelectedProvider === "karar") {
        setProviders({ karar: true, mevzuat: false, reklam: false });
      } else if (preSelectedProvider === "mevzuat") {
        setProviders({ karar: false, mevzuat: true, reklam: false });
      } else if (preSelectedProvider === "reklam") {
        setProviders({ karar: false, mevzuat: false, reklam: true });
      }
      setPreSelectedProvider(null);
    }
  }, [preSelectedProvider, setPreSelectedProvider]);

  // Listen for prompt insert events
  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<string>;
      const text = ce.detail ?? "";
      if (!text) return;
      if (text.startsWith("ŞABLON:")) {
        const title = text.replace(/^ŞABLON:\s*/i, "").trim();
        if (title) setActiveTemplate(title);
      }
      setValue((prev) => (prev ? prev + "\n" : "") + text);
    };
    window.addEventListener("insertPrompt", handler as EventListener);
    return () => window.removeEventListener("insertPrompt", handler as EventListener);
  }, []);

  const canSend = useMemo(() => value.trim().length > 0 && !isResponding, [value, isResponding]);

  const handleSend = useCallback(async () => {
    if (!canSend) return;
    const userText = value.trim();

    if (userText.toLowerCase().includes("belge oluştur")) {
      setEditorOpen(true);
    }

    if (userText.toLowerCase().includes("tablo oluştur")) {
      setDataGridOpen(true);
    }

    setValue("");

    if (activeTemplate) {
      const composed = `[AKILLI ŞABLON]\nŞABLON: ${activeTemplate}\nKULLANICI MESAJI: ${userText}\nTALİMAT: Bu şablonu tamamlamak için ihtiyaç duyduğun bilgileri birer birer sor. İlk soruyla başla ve cevaplara göre ilerle.`;
      setActiveTemplate(null);
      await send(composed);
      return;
    }

    await send(userText);
  }, [canSend, value, send, activeTemplate, setEditorOpen, setDataGridOpen]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        if (e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // File upload handlers
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const sizeKB = Math.max(1, Math.round(f.size / 1024));
      const msg = `📎 Belge yüklendi: ${f.name} (${sizeKB} KB)`;
      await send(msg);
      e.target.value = "";
    },
    [send]
  );

  // Belge Düzenle handler
  const handleDocxEdit = useCallback(() => {
    docxEditInputRef.current?.click();
  }, []);

  const handleDocxEditChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;

      if (!f.name.toLowerCase().endsWith(".docx")) {
        showNotification("error", "Sadece .docx dosyaları yükleyebilirsiniz");
        e.target.value = "";
        return;
      }

      // Read file content
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        // Set editor content and open editor
        setEditorContent(`Yüklenen belge: ${f.name}\n\n[Belge içeriği buraya eklenecek]`);
        setEditorOpen(true);
        showNotification("success", `${f.name} editöre yüklendi`);
      };
      reader.readAsText(f);
      e.target.value = "";
    },
    [setEditorContent, setEditorOpen]
  );

  // Belge Oluştur - Template selection
  const handleDocumentTemplateSelect = useCallback(
    (template: (typeof DOCUMENT_TEMPLATES)[0]) => {
      setDocumentModalOpen(false);

      // Create template content for editor
      const templateContent = `${template.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kategori: ${template.category}

${template.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Belge içeriğini buraya yazın...]
`;

      setEditorContent(templateContent);
      setEditorOpen(true);
      showNotification("success", `${template.title} editöre yüklendi`);
    },
    [setEditorContent, setEditorOpen]
  );

  // Belge Analizi handler - now opens playbook selection modal
  const handleDocxAnalysis = useCallback(() => {
    setPlaybookModalOpen(true);
  }, []);

  // Belgeleri Karşılaştır handler - opens Tables panel in sidebar
  const handleDocumentComparison = useCallback(() => {
    // Dispatch custom event to open tables panel in sidebar
    const event = new CustomEvent("openTablesPanel");
    window.dispatchEvent(event);
    showNotification("success", "Tablolar paneli açıldı. Lütfen bir tablo seçin.");
  }, []);

  // Handle playbook selection for analysis
  const handlePlaybookSelect = useCallback(
    (playbook: (typeof playbooks)[0]) => {
      setPlaybookModalOpen(false);
      setSelectedPlaybookForAnalysis(playbook);
      setPlaybookAnalysisOpen(true);

      // Send message to assistant asking for document upload
      const msg = `[PLAYBOOK ANALİZİ BAŞLATILDI]\n\nSeçilen Playbook: ${playbook.title}\n\nLütfen analiz edilecek dokümanı yükleyin. Doküman yüklendikten sonra, seçtiğiniz playbook'a göre detaylı bir analiz yapılacaktır.`;
      send(msg);

      showNotification("success", `${playbook.title} seçildi. Lütfen dokümanınızı yükleyin.`);
    },
    [send, setSelectedPlaybookForAnalysis, setPlaybookAnalysisOpen]
  );

  const handleDocxAnalysisChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // This is no longer used directly, but kept for compatibility
      const f = e.target.files?.[0];
      if (!f) return;

      const sizeKB = Math.max(1, Math.round(f.size / 1024));
      const msg = `[BELGE ANALİZİ]\nBelge yüklendi: ${f.name} (${sizeKB} KB)\n\nLütfen bu belgeyi analiz et:\n1. Belge türünü belirle (sözleşme, dilekçe, karar, vb.)\n2. İlgili playbook'u otomatik seç\n3. Kapsamlı analiz raporu oluştur (önemli maddeler, riskler, eksiklikler, öneriler)`;
      await send(msg);
      showNotification("success", "Belge analizi başlatıldı");

      e.target.value = "";
    },
    [send]
  );

  // Toggle collection selection
  const toggleCollection = useCallback((collection: (typeof collections)[0]) => {
    setSelectedCollections((prev) => {
      const isSelected = prev.some((c) => c.id === collection.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== collection.id);
      } else {
        return [...prev, collection];
      }
    });
  }, []);

  // Remove a specific collection
  const removeCollection = useCallback((collectionId: string) => {
    setSelectedCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  return (
    <div className="flex flex-col flex-shrink-0 bg-background px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2 sm:p-3 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.02)]">
        <div className="relative px-0.5 sm:px-1">
          <textarea
            className="min-h-[50px] sm:min-h-[60px] max-h-[180px] sm:max-h-[220px] w-full resize-y border-none bg-transparent text-xs sm:text-sm focus:outline-none"
            placeholder="Mesajınızı yazın..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Mesajınızı yazın"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-surface pt-2">
          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center gap-1 flex-wrap">
            {/* Oluştur Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-full text-[12px] text-text-secondary hover:text-text-primary hover:bg-accent"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Oluştur
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={handleDocxEdit}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Belge Düzenle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentModalOpen(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Belge Oluştur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDocxAnalysis}>
                  <FileSearch className="mr-2 h-4 w-4" />
                  Belge Analizi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDocumentComparison}>
                  <GitCompare className="mr-2 h-4 w-4" />
                  Belgeleri Karşılaştır
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const event = new CustomEvent("openTimeTrackingPanel");
                    window.dispatchEvent(event);
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Zaman Girişi Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Kaynak Seç Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-full text-[12px] text-text-secondary hover:text-text-primary hover:bg-accent"
                >
                  <Search className="mr-1 h-4 w-4" />
                  Kaynak Seç
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px]">
                <div className="px-2 py-1.5">
                  <p className="text-[11px] font-medium text-muted-foreground">ARAMA KAYNAKLARI</p>
                </div>
                <DropdownMenuItem
                  onClick={() => setProviders((p) => ({ ...p, karar: !p.karar }))}
                  className="py-2.5"
                >
                  <Scale className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Rekabet Kurumu Kararları</span>
                  {providers.karar && <span className="ml-auto text-blue-600">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setProviders((p) => ({ ...p, reklam: !p.reklam }))}
                  className="py-2.5"
                >
                  <Scale className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Reklam Kurulu Kararları</span>
                  {providers.reklam && <span className="ml-auto text-blue-600">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setProviders((p) => ({ ...p, mevzuat: !p.mevzuat }))}
                  className="py-2.5"
                >
                  <FileText className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mevzuat</span>
                  {providers.mevzuat && <span className="ml-auto text-blue-600">✓</span>}
                </DropdownMenuItem>

                <div className="my-1 h-px bg-border" />

                <div className="px-2 py-1.5">
                  <p className="text-[11px] font-medium text-muted-foreground">YAKINDA</p>
                </div>
                <DropdownMenuItem disabled className="py-2.5 opacity-50">
                  <FileText className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">İçtihat</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="py-2.5 opacity-50">
                  <Search className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Lexpera</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="py-2.5 opacity-50">
                  <Globe className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">İnternet Arama</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Koleksiyon Seç Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-full text-[12px] text-text-secondary hover:text-text-primary hover:bg-accent"
                >
                  <Library className="mr-1 h-4 w-4" />
                  Koleksiyon Seç
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px]">
                <div className="px-2 py-1.5">
                  <p className="text-[11px] font-medium text-muted-foreground">KOLEKSİYONLAR</p>
                </div>
                {collections.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    Henüz koleksiyon yok
                  </div>
                ) : (
                  filteredCollections.map((collection) => {
                    const isSelected = selectedCollections.some((c) => c.id === collection.id);
                    return (
                      <DropdownMenuItem
                        key={collection.id}
                        onClick={() => toggleCollection(collection)}
                        className="py-2.5"
                      >
                        <Library className="mr-3 h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-sm">{collection.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ml-2 ${
                              collection.scope === "org"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {collection.scope === "org" ? "Organizasyon" : "Kişisel"}
                          </span>
                        </div>
                        {isSelected && <span className="ml-2 text-blue-600">✓</span>}
                      </DropdownMenuItem>
                    );
                  })
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hidden file inputs */}
            <input
              ref={docxEditInputRef}
              type="file"
              accept=".docx"
              className="hidden"
              onChange={handleDocxEditChange}
            />
            <input
              ref={docxAnalysisInputRef}
              type="file"
              className="hidden"
              onChange={handleDocxAnalysisChange}
            />

            <div className="mx-1 h-5 w-px bg-border" role="separator" />

            {/* Seçili Kaynaklar ve Koleksiyonlar */}
            <div className="flex items-center gap-1.5 ml-1">
              {(() => {
                // Combine all selected items
                const allSelectedItems = [
                  ...selectedCollections.map((c) => ({
                    type: "collection" as const,
                    id: c.id,
                    name: c.name,
                    color: "bg-[#e8dce8] text-[#6d5a6d]",
                    hoverColor: "hover:bg-[#dccfdc]",
                  })),
                  ...(providers.karar
                    ? [
                        {
                          type: "provider" as const,
                          id: "karar",
                          name: "RK Kararları",
                          color: "bg-[#d5e8e4] text-[#4a6d68]",
                          hoverColor: "hover:bg-[#c2d9d4]",
                        },
                      ]
                    : []),
                  ...(providers.reklam
                    ? [
                        {
                          type: "provider" as const,
                          id: "reklam",
                          name: "Reklam Kurulu",
                          color: "bg-[#e8d8dc] text-[#7a5f65]",
                          hoverColor: "hover:bg-[#dcc9cd]",
                        },
                      ]
                    : []),
                  ...(providers.mevzuat
                    ? [
                        {
                          type: "provider" as const,
                          id: "mevzuat",
                          name: "Mevzuat",
                          color: "bg-[#e8dcc7] text-[#7a6e4f]",
                          hoverColor: "hover:bg-[#dcceb8]",
                        },
                      ]
                    : []),
                ];

                const visibleItems = allSelectedItems.slice(0, 3);
                const hiddenItems = allSelectedItems.slice(3);

                const handleRemove = (item: (typeof allSelectedItems)[0]) => {
                  if (item.type === "collection") {
                    removeCollection(item.id);
                  } else {
                    setProviders((p) => ({ ...p, [item.id]: false }));
                  }
                };

                return (
                  <>
                    {visibleItems.map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${item.color} text-[11px] font-medium`}
                      >
                        <span>{item.name}</span>
                        <button
                          onClick={() => handleRemove(item)}
                          className={`ml-0.5 ${item.hoverColor} rounded-full p-0.5 transition-colors`}
                          aria-label="Kaldır"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {hiddenItems.length > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-[11px] font-medium transition-colors">
                            +{hiddenItems.length} daha
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-[280px] p-2">
                          <div className="flex flex-col gap-1.5">
                            {hiddenItems.map((item) => (
                              <div
                                key={`${item.type}-${item.id}`}
                                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md ${item.color}`}
                              >
                                <span className="text-[11px] font-medium">{item.name}</span>
                                <button
                                  onClick={() => handleRemove(item)}
                                  className={`${item.hoverColor} rounded-full p-0.5 transition-colors`}
                                  aria-label="Kaldır"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Mobile - Compact button group */}
          <div className="flex sm:hidden items-center gap-1 w-full justify-between">
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={handleDocxEdit}>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Belge Düzenle
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDocumentModalOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Belge Oluştur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDocxAnalysis}>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Belge Analizi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDocumentComparison}>
                    <GitCompare className="mr-2 h-4 w-4" />
                    Belgeleri Karşılaştır
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const event = new CustomEvent("openTimeTrackingPanel");
                      window.dispatchEvent(event);
                    }}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Zaman Girişi Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                    <Search className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[280px]">
                  <div className="px-2 py-1.5">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      ARAMA KAYNAKLARI
                    </p>
                  </div>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, karar: !p.karar }))}
                    className="py-2.5"
                  >
                    <Scale className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Rekabet Kurumu Kararları</span>
                    {providers.karar && <span className="ml-auto text-blue-600">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, reklam: !p.reklam }))}
                    className="py-2.5"
                  >
                    <Scale className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reklam Kurulu Kararları</span>
                    {providers.reklam && <span className="ml-auto text-blue-600">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, mevzuat: !p.mevzuat }))}
                    className="py-2.5"
                  >
                    <FileText className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Mevzuat</span>
                    {providers.mevzuat && <span className="ml-auto text-blue-600">✓</span>}
                  </DropdownMenuItem>

                  <div className="my-1 h-px bg-border" />

                  <div className="px-2 py-1.5">
                    <p className="text-[11px] font-medium text-muted-foreground">YAKINDA</p>
                  </div>
                  <DropdownMenuItem disabled className="py-2.5 opacity-50">
                    <FileText className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">İçtihat</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="py-2.5 opacity-50">
                    <Search className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Lexpera</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="py-2.5 opacity-50">
                    <Globe className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">İnternet Arama</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                    <Library className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[280px]">
                  <div className="px-2 py-1.5">
                    <p className="text-[11px] font-medium text-muted-foreground">KOLEKSİYONLAR</p>
                  </div>
                  {collections.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      Henüz koleksiyon yok
                    </div>
                  ) : (
                    filteredCollections.map((collection) => {
                      const isSelected = selectedCollections.some((c) => c.id === collection.id);
                      return (
                        <DropdownMenuItem
                          key={collection.id}
                          onClick={() => toggleCollection(collection)}
                          className="py-2.5"
                        >
                          <Library className="mr-3 h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm">{collection.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ml-2 ${
                                collection.scope === "org"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {collection.scope === "org" ? "Organizasyon" : "Kişisel"}
                            </span>
                          </div>
                          {isSelected && <span className="ml-2 text-blue-600">✓</span>}
                        </DropdownMenuItem>
                      );
                    })
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                aria-label="Attach file"
                onClick={handleAttachClick}
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                className="h-9 w-9 p-0 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
                aria-label={isResponding ? "Yükleniyor" : "Send message"}
                disabled={!canSend || isResponding}
                onClick={handleSend}
              >
                {isResponding ? (
                  <Loader2 className="text-white w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUp className="text-white w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Desktop send buttons */}
          <div className="hidden sm:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              aria-label="Attach file"
              onClick={handleAttachClick}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

            <Button
              variant="ghost"
              className="ml-1 h-12 w-12 p-0 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={isResponding ? "Yükleniyor" : "Send message"}
              disabled={!canSend || isResponding}
              onClick={handleSend}
              title={isResponding ? "Yükleniyor" : "Gönder"}
            >
              {isResponding ? (
                <Loader2 className="text-white w-[28px] h-[28px] animate-spin" />
              ) : (
                <ArrowUp className="text-white w-[36px] h-[36px]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Playbook Selection Modal */}
      <Dialog open={playbookModalOpen} onOpenChange={setPlaybookModalOpen}>
        <DialogContent className="md:max-w-[700px] max-w-[95vw] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Playbook Seçin</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-2">
            <div className="grid gap-3">
              {playbooks.map((playbook) => (
                <div
                  key={playbook.id}
                  className="group relative flex flex-col gap-2 p-4 rounded-lg border bg-white hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer transition-colors"
                  onClick={() => handlePlaybookSelect(playbook)}
                >
                  <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                    {playbook.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {playbook.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Template Selection Modal */}
      <Dialog open={documentModalOpen} onOpenChange={setDocumentModalOpen}>
        <DialogContent className="md:max-w-[800px] max-w-[95vw] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Belge Şablonu Seçin</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-2">
            <div className="grid gap-3 md:grid-cols-2">
              {DOCUMENT_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="group relative flex flex-col gap-2 p-4 rounded-lg border bg-white hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleDocumentTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm text-gray-900">{template.title}</h3>
                    <span className="shrink-0 inline-flex items-center rounded-full border bg-secondary px-2 py-0.5 text-[10px] font-medium">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
