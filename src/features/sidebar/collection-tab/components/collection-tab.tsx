/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { CollectionDialog } from "./collection-dialog";
import { CollectionList } from "./collection-list";
import { documentsData, mockCollectionData } from "../constants/collection-tab-config";
import { useUIStore } from "@/shared/store/ui.store";

export const CollectionTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionScope, setNewCollectionScope] = useState<"personal" | "org" | string>(
    "personal"
  );
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);
  const [activeScope, setActiveScope] = useState<"personal" | "org" | string>("personal");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCollectionId) {
      setDocuments(documentsData[selectedCollectionId] || []);
    } else {
      setDocuments([]);
    }
  }, [selectedCollectionId]);

  const [collections, setCollections] = useState<any[]>([...mockCollectionData]);

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
    setChoosenTab("");

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

    const fileName = file.name;
    const extension = fileName.split(".").pop()?.toUpperCase() || "FILE";

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
      <CollectionList
        selectedCollectionId={selectedCollectionId}
        setSelectedCollectionId={setSelectedCollectionId}
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
