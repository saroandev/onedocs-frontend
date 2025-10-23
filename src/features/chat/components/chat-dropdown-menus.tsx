/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import {
  // Clock,
  // FileEdit,
  // FileSearch,
  // GitCompare,
  // FileText,
  Globe,
  Library,
} from "lucide-react";
// import { providerOptions } from "../constants/chat-prompt-config";
import styles from "@/widgets/chat/styles/chat-prompt.module.scss";
import classnames from "classnames";
import { useGetCollections } from "@/features/sidebar/collection-tab/hooks";
import { optionsSource } from "../constants/chat-config";
import {
  LogoAdaletBakanlik,
  LogoLexPara,
  LogoRekabetKurum,
  LogoReklamKurul,
  LogoTLB,
  LogoYargitay,
} from "@/shared/ui/icons";

export const ChatDropdownMenus = (props: ChatDropdownMenusProps) => {
  const {
    // handleOnSelect,
    onSelectCollection,
    onSelectSource,
    selectedCollections,
    selectedSources,
    isMobile = false,
  } = props;

  const { data: collectionsData, isLoading: loadingCollections } = useGetCollections({
    query: "all",
  });

  const renderOptionSourceLogo = {
    "turk-hukuk-mevzuat": <LogoAdaletBakanlik />,
    "reklam-kurum-karar": <LogoReklamKurul />,
    "rekabet-kurum-karar": <LogoRekabetKurum />,
  };

  return (
    <>
      {/* <DropdownMenu>
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
      </DropdownMenu> */}

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
          {optionsSource.map((source) => (
            <DropdownMenuItem
              key={source.name}
              onClick={() => onSelectSource(source.name)}
              className={styles.menuItem}
            >
              {renderOptionSourceLogo[source.id]}
              <span className={styles.menuLabel}>{source.name}</span>
              {selectedSources.some((selectedSource) => selectedSource === source.name) && (
                <span className={styles.checkmark}>✓</span>
              )}
            </DropdownMenuItem>
          ))}
          <div className={styles.divider} />
          <div className={styles.dropdownHeader}>
            <p className={styles.sectionLabel}>YAKINDA</p>
          </div>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <LogoYargitay />
            <span className={styles.menuLabel}>Yargıtay Karar Arama</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <LogoLexPara />
            <span className={styles.menuLabel}>Lexpera</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className={styles.disabledItem}>
            <LogoTLB />
            <span className={styles.menuLabel}>Turkish Law Blog</span>
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
          {collectionsData?.collections?.map((collection) => (
            <DropdownMenuItem
              key={collection.created_at}
              onClick={() =>
                onSelectCollection({ name: collection.name, scopes: [collection.scope] })
              }
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
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

interface ChatDropdownMenusProps {
  // handleOnSelect: {
  //   documentEdit: () => void;
  //   documentCreate: () => void;
  //   documentAnalysis: () => void;
  //   documentCompare: () => void;
  //   timeTrack: () => void;
  // };
  onSelectCollection: ({
    name,
    scopes,
  }: {
    name: string;
    scopes: ("shared" | "private")[];
  }) => void;
  onSelectSource: (name: string) => void;
  selectedCollections: { name: string; scopes: ("shared" | "private")[] }[];
  selectedSources: string[];
  isMobile?: boolean;
}
