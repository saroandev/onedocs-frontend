import classnames from "classnames";
import styles from "../styles/collection-list.module.scss";
import type { Collection as CollectionType } from "../api/collection.types";
import { formatDate } from "@/shared/lib/dateFormatter";
import { Check } from "lucide-react";

export const Collection = (props: CollectionProps) => {
  const { data, isSelected, toggleCollectionSelection, setSelectedCollectionData } = props;

  return (
    <div className={styles.collectionsList}>
      <div
        key={data.created_at}
        className={classnames(styles.collectionItem, {
          [styles.selected]: isSelected,
        })}
      >
        <div className={styles.collectionContent}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCollectionSelection(data.name);
            }}
            className={classnames(styles.checkbox, {
              [styles.checked]: isSelected,
            })}
          >
            {isSelected && <Check className={styles.checkIcon} />}
          </button>
          <div
            className={styles.collectionInfo}
            onClick={() => setSelectedCollectionData({ name: data.name, scope: data.scope })}
          >
            <h3>{data.name}</h3>
            <p className={styles.lastUpdated}>
              Son güncelleme: {formatDate(data.updated_at, "withText")}
            </p>
            <div className={styles.collectionStats}>
              <span>
                {data.document_count === 0 ? "Dosya yok" : `${data.document_count} dosya`}
              </span>
              <span>{data.size_mb.toFixed(2)} MB</span>
            </div>
            <p className={styles.collectionMembers}>
              {data.chunk_count} chunk • {data.created_by_email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CollectionProps {
  data: CollectionType & {
    size_bytes: number;
    updated_at: string;
  };
  isSelected: boolean;
  toggleCollectionSelection: (collectionId: string) => void;
  setSelectedCollectionData: ({
    name,
    scope,
  }: {
    name: string;
    scope: "private" | "shared";
  }) => void;
}
