import { useState } from "react";
import { CreateCollectionModal } from "./create-collection-modal";
import { CollectionDetail } from "./collection-detail";
import styles from "../styles/collection-list.module.scss";
import { Button, Skeleton, Tabs, TabsList, TabsTrigger, ViewCard } from "@/shared/ui";
import { useUIStore } from "@/shared/store/ui.store";
import { useGetCollections } from "../hooks";
import { Collection } from "./collection";

export const CollectionTab = () => {
  const [activeScope, setActiveScope] = useState<"private" | "shared">("private");
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [selectedCollectionData, setSelectedCollectionData] = useState<{
    name: string;
    scope: "private" | "shared";
  } | null>(null);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);

  const { data: collectionsData, isLoading } = useGetCollections({
    scope: "all",
  });

  const handleAskAssistant = () => {
    console.log("Selected collections:", selectedCollectionIds);
  };

  const toggleCollectionSelection = (collectionId: string) => {
    setSelectedCollectionIds((prev) => {
      if (prev.includes(collectionId)) {
        return prev.filter((id) => id !== collectionId);
      } else {
        return [...prev, collectionId];
      }
    });
  };

  const renderFilteredCollections = () => {
    if (isLoading) {
      return <Skeleton />;
    }

    return (
      !selectedCollectionData && (
        <div className={styles.contentScroll}>
          <div className={styles.actionsBar}>
            <Button
              label="Yeni Koleksiyon"
              buttonType={"iconWithText"}
              onClick={() => setShowCreateCollectionModal(true)}
              iconType={{ default: "document" }}
              iconTextReverse
            />
          </div>

          <div className={styles.statsBar}>
            <span className={styles.statsText}>
              {collectionsData?.collections.length} koleksiyon
              {selectedCollectionIds.length > 0 && (
                <span className={styles.selectedCount}>
                  • {selectedCollectionIds.length} seçili
                </span>
              )}
            </span>
            <Tabs
              value={activeScope}
              onValueChange={(v) => {
                setActiveScope(v as "private" | "shared");
                setSelectedCollectionIds([]);
              }}
              className={styles.tabsList}
            >
              <TabsList className={styles.tabsList}>
                <TabsTrigger value="private" className={styles.tabTrigger}>
                  Kişisel
                </TabsTrigger>
                <TabsTrigger value="shared" className={styles.tabTrigger}>
                  Organizasyon
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {selectedCollectionIds.length > 0 && (
            <div className={styles.actionsBar}>
              <Button
                label={`Asistana Sor ${selectedCollectionIds.length}`}
                onClick={handleAskAssistant}
                buttonType={"iconWithText"}
                iconType={{ default: "message" }}
                iconTextReverse
              />
            </div>
          )}

          {collectionsData?.collections.length === 0 && (
            <ViewCard
              className={styles.emptyCard}
              title="Koleksiyon Listesi"
              description="Henüz koleksiyon yok, yeni bir koleksiyon oluşturarak başlayın"
            />
          )}

          {collectionsData?.collections?.map((collection) => {
            const isSelected = selectedCollectionIds.includes(collection.name);

            return (
              collection.scope === activeScope && (
                <Collection
                  key={collection.created_at}
                  data={collection}
                  isSelected={isSelected}
                  setSelectedCollectionData={setSelectedCollectionData}
                  toggleCollectionSelection={toggleCollectionSelection}
                />
              )
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Koleksiyonlar</h2>
          <p>Asistanınızı dökümanlarla özel olarak eğitin</p>
        </div>
        <Button
          label=""
          buttonType="justIcon"
          onClick={() => setChoosenTab("")}
          iconType={{ default: "close" }}
        />
      </div>
      {renderFilteredCollections()}
      {selectedCollectionData && (
        <CollectionDetail
          setSelectedCollectionData={setSelectedCollectionData}
          selectedCollectionData={selectedCollectionData}
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          open={showCreateCollectionModal}
          setOpen={setShowCreateCollectionModal}
        />
      )}
    </div>
  );
};
