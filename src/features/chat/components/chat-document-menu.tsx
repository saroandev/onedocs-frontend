/* eslint-disable @typescript-eslint/no-unused-vars */
// import // Clock,
// FileEdit,
// FileSearch,
// GitCompare,
// FileText,
// "lucide-react";
import styles from "@/widgets/chat/styles/chat-prompt.module.scss";
import classnames from "classnames";

export const ChatDocumentMenu = (props: ChatDocumentMenuProps) => {
  const {
    // handleOnSelect,
    isMobile = false,
  } = props;

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
    </>
  );
};

interface ChatDocumentMenuProps {
  // handleOnSelect: {
  //   documentEdit: () => void;
  //   documentCreate: () => void;
  //   documentAnalysis: () => void;
  //   documentCompare: () => void;
  //   timeTrack: () => void;
  // };
  isMobile?: boolean;
}
