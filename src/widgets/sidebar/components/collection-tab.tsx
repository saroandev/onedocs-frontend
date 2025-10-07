import { CollectionDialog } from "@/features/sidebar/collection";
import { CollectionList } from "@/features/sidebar/collection/components/collection-list";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SIDEBAR_MENU_IDS } from "../constants/sidebar-config";

interface Document {
  id: number;
  collectionId: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  content?: string | null;
  userId: string;
}

interface CollectionTabProps {
  setChoosenTab: (val: string) => void;
  choosenTab: string;
}

export const CollectionTab = (props: CollectionTabProps) => {
  const { setChoosenTab, choosenTab } = props;

  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionScope, setNewCollectionScope] = useState<"personal" | "org" | string>(
    "personal"
  );
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);
  const [activeScope, setActiveScope] = useState<"personal" | "org" | string>("personal");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  const documentsData: Record<string, Document[]> = {
    "1": [
      {
        id: 1,
        collectionId: 1,
        name: "Çalışan El Kitabı 2024",
        type: "PDF",
        size: "485 KB",
        uploadDate: "2024-10-05",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 2,
        collectionId: 1,
        name: "İç Yönetmelik",
        type: "DOCX",
        size: "320 KB",
        uploadDate: "2024-10-04",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 3,
        collectionId: 1,
        name: "Bilgi Güvenliği Politikası",
        type: "PDF",
        size: "890 KB",
        uploadDate: "2024-10-03",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 4,
        collectionId: 1,
        name: "Etik Kurallar",
        type: "PDF",
        size: "425 KB",
        uploadDate: "2024-10-02",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
    ],
    "3": [
      {
        id: 11,
        collectionId: 3,
        name: "İş Kanunu",
        type: "PDF",
        size: "2.1 MB",
        uploadDate: "2024-10-04",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 12,
        collectionId: 3,
        name: "Borçlar Kanunu",
        type: "PDF",
        size: "1.8 MB",
        uploadDate: "2024-10-04",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 13,
        collectionId: 3,
        name: "Ticaret Kanunu",
        type: "PDF",
        size: "2.3 MB",
        uploadDate: "2024-10-03",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 14,
        collectionId: 3,
        name: "KVKK Kanunu",
        type: "PDF",
        size: "680 KB",
        uploadDate: "2024-10-03",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 15,
        collectionId: 3,
        name: "İcra İflas Kanunu",
        type: "PDF",
        size: "1.9 MB",
        uploadDate: "2024-10-02",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 16,
        collectionId: 3,
        name: "Tüketici Koruma Kanunu",
        type: "PDF",
        size: "890 KB",
        uploadDate: "2024-10-02",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 17,
        collectionId: 3,
        name: "Kira Yönetmeliği",
        type: "PDF",
        size: "1.2 MB",
        uploadDate: "2024-10-01",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 18,
        collectionId: 3,
        name: "Vergi Usul Kanunu",
        type: "PDF",
        size: "1.5 MB",
        uploadDate: "2024-10-01",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
    ],
    "4": [
      {
        id: 19,
        collectionId: 4,
        name: "İşe Alım Politikası",
        type: "PDF",
        size: "445 KB",
        uploadDate: "2024-10-03",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 20,
        collectionId: 4,
        name: "Performans Değerlendirme",
        type: "DOCX",
        size: "512 KB",
        uploadDate: "2024-10-03",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 21,
        collectionId: 4,
        name: "Çalışan Hakları",
        type: "PDF",
        size: "678 KB",
        uploadDate: "2024-10-02",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 22,
        collectionId: 4,
        name: "Ücret Politikası",
        type: "PDF",
        size: "890 KB",
        uploadDate: "2024-10-02",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 23,
        collectionId: 4,
        name: "İş Sağlığı ve Güvenliği",
        type: "PDF",
        size: "720 KB",
        uploadDate: "2024-10-01",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
    ],
    "5": [
      {
        id: 24,
        collectionId: 5,
        name: "Distribütörlük Sözleşmesi",
        type: "PDF",
        size: "1.2 MB",
        uploadDate: "2024-09-28",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 25,
        collectionId: 5,
        name: "Franchise Sözleşmesi",
        type: "DOCX",
        size: "980 KB",
        uploadDate: "2024-09-28",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 26,
        collectionId: 5,
        name: "Bayilik Sözleşmesi",
        type: "PDF",
        size: "1.5 MB",
        uploadDate: "2024-09-27",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 27,
        collectionId: 5,
        name: "Temsil Sözleşmesi",
        type: "DOCX",
        size: "890 KB",
        uploadDate: "2024-09-27",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 28,
        collectionId: 5,
        name: "Alım Satım Sözleşmesi",
        type: "PDF",
        size: "1.1 MB",
        uploadDate: "2024-09-26",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 29,
        collectionId: 5,
        name: "Ortaklık Sözleşmesi",
        type: "DOCX",
        size: "1.3 MB",
        uploadDate: "2024-09-26",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
      {
        id: 30,
        collectionId: 5,
        name: "Lisans Sözleşmesi",
        type: "PDF",
        size: "1.6 MB",
        uploadDate: "2024-09-25",
        uploadedBy: "Emrullah Saruhan",
        userId: "user1",
      },
    ],
  };

  useEffect(() => {
    if (selectedCollectionId) {
      const docs = documentsData[selectedCollectionId] || [];
      setDocuments(docs);
    } else {
      setDocuments([]);
    }
  }, [selectedCollectionId]);

  const [collections, setCollections] = useState<
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

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection = {
      id: `${Date.now()}`,
      name: newCollectionName,
      fileCount: 0,
      size: "0 MB",
      members: 1,
      creator: "Emrullah",
      lastUpdated: "Az önce",
      scope: newCollectionScope,
    };

    setCollections([...collections, newCollection]);
    setNewCollectionName("");
    setNewCollectionScope("personal");
    setNewCollectionDialogOpen(false);
  };

  const selectedCollections = collections.filter((c) => selectedCollectionIds.includes(c.id));

  const handleAskAssistant = () => {
    if (selectedCollectionIds.length === 0 || selectedCollections.length === 0) return;

    // Dispatch custom event with selected collections
    const event = new CustomEvent("selectCollections", {
      detail: selectedCollections,
    });
    window.dispatchEvent(event);

    // Close the knowledge base panel
    setChoosenTab(uuidv4());

    // Navigate to chat
    // router.push("/");
  };

  const filteredCollections = collections.filter((col) => col.scope === activeScope);

  const toggleCollectionSelection = (collectionId: string) => {
    setSelectedCollectionIds((prev) => {
      if (prev.includes(collectionId)) {
        return prev.filter((id) => id !== collectionId);
      } else {
        return [...prev, collectionId];
      }
    });
  };

  const selectedCollection = !selectedCollectionId
    ? null
    : collections.find((col) => col.id === selectedCollectionId);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCollectionId) return;

    const file = e.target.files?.[0];
    if (!file) return;

    // Extract file extension
    const fileName = file.name;
    const extension = fileName.split(".").pop()?.toUpperCase() || "FILE";

    // Create mock document with real file name
    const newDocument: Document = {
      id: Date.now(),
      collectionId: parseInt(selectedCollectionId),
      name: fileName,
      type: extension,
      size: `${Math.floor(Math.random() * 900) + 100} KB`,
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "Emrullah Saruhan",
      userId: "user1",
    };

    setDocuments([newDocument, ...documents]);

    // Update collection file count
    setCollections(
      collections.map((col) =>
        col.id === selectedCollectionId ? { ...col, fileCount: col.fileCount + 1 } : col
      )
    );

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {choosenTab == SIDEBAR_MENU_IDS.COLLECTION && (
        <CollectionList
          selectedCollectionId={selectedCollectionId}
          setSelectedCollectionId={setSelectedCollectionId}
          setChoosenTab={setChoosenTab}
          setNewCollectionDialogOpen={setNewCollectionDialogOpen}
          handleAskAssistant={handleAskAssistant}
          selectedCollectionIds={selectedCollectionIds}
          filteredCollections={filteredCollections}
          toggleCollectionSelection={toggleCollectionSelection}
          activeScope={activeScope}
          setActiveScope={setActiveScope}
          selectedCollection={selectedCollection}
          fileInputRef={fileInputRef}
          handleFileSelected={handleFileSelected}
          documents={documents}
        />
      )}
      <CollectionDialog
        open={newCollectionDialogOpen}
        setOpen={setNewCollectionDialogOpen}
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        newCollectionScope={newCollectionScope}
        setNewCollectionScope={setNewCollectionScope}
        handleCreateCollection={handleCreateCollection}
      />
    </>
  );
};
