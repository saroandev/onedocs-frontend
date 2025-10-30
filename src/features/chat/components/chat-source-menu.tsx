import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { Globe } from "lucide-react";
// import { providerOptions } from "../constants/chat-prompt-config";
import styles from "@/widgets/chat/styles/chat-prompt.module.scss";
import { optionsSource } from "../constants/chat-config";
import {
  LogoAdaletBakanlik,
  LogoLexPara,
  LogoRekabetKurum,
  LogoReklamKurul,
  LogoTLB,
  LogoYargitay,
} from "@/shared/ui/icons";

export const ChatSourceMenu = (props: ChatSourceMenuProps) => {
  const { onSelectSource, selectedSources, isMobile = false, isSubmit, open, setOpen } = props;

  const renderOptionSourceLogo = {
    "turk-hukuk-mevzuat": <LogoAdaletBakanlik />,
    "reklam-kurum-karar": <LogoReklamKurul />,
    "rekabet-kurum-karar": <LogoRekabetKurum />,
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isSubmit) return;
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <DropdownMenu open={!isSubmit && open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild disabled={isSubmit}>
        <div>
          <Button
            label={isMobile ? "" : "Kaynak Seç"}
            buttonType="iconWithText"
            iconType={{ default: "search" }}
            variant="secondary"
            iconTextReverse
            className={styles.dropdownButton}
            disabled={isSubmit}
            onClick={handleOpen}
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
            onClick={() => !isSubmit && onSelectSource(source.name)}
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
          <Globe />
          <span className={styles.menuLabel}>İnternet Arama</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ChatSourceMenuProps {
  onSelectSource: (name: string) => void;
  selectedSources: string[];
  isMobile?: boolean;
  isSubmit: boolean;
  open: boolean;
  setOpen: (val: boolean) => void;
}
