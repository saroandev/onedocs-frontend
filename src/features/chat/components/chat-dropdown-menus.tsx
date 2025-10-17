import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import {
  Clock,
  FileEdit,
  FileSearch,
  FileText,
  GitCompare,
  Globe,
  Library,
  Scale,
  Search,
} from "lucide-react";
import {
  collectionOptions,
  providerOptions,
  type SelectedPromptOption,
} from "../constants/chat-prompt-config";
import styles from "../styles/chat-prompt.module.scss";
import classnames from "classnames";

export const ChatDropdownMenus = (props: ChatDropdownMenusProps) => {
  const { handleOnSelect, onSelectPromptOption, selectedPromptOptions, isMobile = false } = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              label={isMobile ? "" : "Oluştur"}
              buttonType="iconWithText"
              iconType={{ default: "add" }}
              variant="secondary"
              iconTextReverse
              className={styles.dropdownButton}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={styles.dropdownContent}>
          <DropdownMenuItem onClick={handleOnSelect.documentEdit}>
            <FileEdit className={styles.menuIcon} />
            Belge Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnSelect.documentCreate}>
            <FileText className={styles.menuIcon} />
            Belge Oluştur
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnSelect.documentAnalysis}>
            <FileSearch className={styles.menuIcon} />
            Belge Analizi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnSelect.documentCompare}>
            <GitCompare className={styles.menuIcon} />
            Belgeleri Karşılaştır
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnSelect.timeTrack}>
            <Clock className={styles.menuIcon} />
            Zaman Girişi Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              label={isMobile ? "" : "Kaynak Seç"}
              buttonType="iconWithText"
              iconType={{ default: "search" }}
              variant="secondary"
              iconTextReverse
              className={styles.dropdownButton}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={styles.sourceDropdown}>
          <div className={styles.dropdownHeader}>
            <p className={styles.sectionLabel}>ARAMA KAYNAKLARI</p>
          </div>
          {providerOptions.map((provider) => (
            <DropdownMenuItem
              key={provider.id}
              onClick={() => onSelectPromptOption(provider)}
              className={styles.menuItem}
            >
              <Scale className={styles.smallIcon} />
              <span className={styles.menuLabel}>{provider.name}</span>
              {selectedPromptOptions.some((selectedItem) => selectedItem.id === provider.id) && (
                <span className={styles.checkmark}>✓</span>
              )}
            </DropdownMenuItem>
          ))}
          <div className={styles.divider} />
          <div className={styles.dropdownHeader}>
            <p className={styles.sectionLabel}>YAKINDA</p>
          </div>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <FileText className={styles.smallIcon} />
            <span className={styles.menuLabel}>İçtihat</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <Search className={styles.smallIcon} />
            <span className={styles.menuLabel}>Lexpera</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <Globe className={styles.smallIcon} />
            <span className={styles.menuLabel}>İnternet Arama</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
          {collectionOptions.map((collection) => (
            <DropdownMenuItem
              key={collection.id}
              onClick={() => onSelectPromptOption(collection)}
              className={styles.menuItem}
            >
              <Library className={styles.smallIcon} />
              <div className={styles.collectionContent}>
                <span className={styles.collectionName}>{collection.name}</span>
                <span
                  className={classnames(styles.badge, {
                    [styles.orgBadge]: collection.scope === "org",
                    [styles.personalBadge]: collection.scope !== "org",
                  })}
                >
                  {collection.scope === "org" ? "Organizasyon" : "Kişisel"}
                </span>
              </div>
              {selectedPromptOptions.some((selectedItem) => selectedItem.id === collection.id) && (
                <span className={styles.checkmark}>✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

interface ChatDropdownMenusProps {
  handleOnSelect: {
    documentEdit: () => void;
    documentCreate: () => void;
    documentAnalysis: () => void;
    documentCompare: () => void;
    timeTrack: () => void;
  };
  onSelectPromptOption: (item: SelectedPromptOption) => void;
  selectedPromptOptions: SelectedPromptOption[];
  isMobile?: boolean;
}
