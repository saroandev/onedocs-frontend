import {
  Alert,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
  ViewCard,
} from "@/shared/ui";
import { Library } from "lucide-react";
import styles from "@/widgets/chat/styles/chat-prompt.module.scss";
import classnames from "classnames";
import { useGetCollections } from "@/features/sidebar/collection-tab/hooks";

export const ChatCollectionMenu = (props: ChatCollectionMenuProps) => {
  const { onSelectCollection, selectedCollections, isMobile = false } = props;

  const {
    data: collectionsData,
    isLoading: loadingCollections,
    isError,
  } = useGetCollections({
    scope: "all",
  });

  const renderCollectionContent = () => {
    if (isError)
      return (
        <Alert
          variant="error"
          title="Koleksiyonlar yüklenemedi"
          message="Koleksiyon listesi yüklenirken beklenmeyen bir hata oluştu."
          showLink={false}
        />
      );

    if (collectionsData?.collections.length === 0) {
      return (
        <ViewCard
          className={styles.emptyCard}
          title="Koleksiyon Listesi"
          description="Henüz koleksiyon yok, yeni bir koleksiyon oluşturarak başlayın"
        />
      );
    }

    if (loadingCollections) return <Skeleton />;

    return collectionsData?.collections?.map((collection) => (
      <DropdownMenuItem
        key={collection.created_at}
        onClick={() => onSelectCollection({ name: collection.name, scopes: [collection.scope] })}
        className={styles.menuItem}
      >
        <Library className={styles.smallIcon} />
        <div className={styles.collectionContent}>
          <span className={styles.collectionName}>{collection.name}</span>
          <span
            className={classnames(styles.badge, {
              [styles.orgBadge]: collection.scope === "shared",
              [styles.personalBadge]: collection.scope !== "shared",
            })}
          >
            {collection.scope === "shared" ? "Organizasyon" : "Kişisel"}
          </span>
        </div>
        {selectedCollections?.some(
          (selectedCollection) => selectedCollection.name === collection.name
        ) && <span className={styles.checkmark}>✓</span>}
      </DropdownMenuItem>
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            label={isMobile ? "" : "Koleksiyon Seç"}
            buttonType="iconWithText"
            iconType={{ default: "library" }}
            variant="secondary"
            iconTextReverse
            className={styles.dropdownButton}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.sourceDropdown}>
        <div className={styles.dropdownHeader}>
          <p className={styles.sectionLabel}>KOLEKSİYONLAR</p>
        </div>
        {renderCollectionContent()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ChatCollectionMenuProps {
  onSelectCollection: ({
    name,
    scopes,
  }: {
    name: string;
    scopes: ("shared" | "private")[];
  }) => void;
  selectedCollections: { name: string; scopes: ("shared" | "private")[] }[];
  isMobile?: boolean;
}
