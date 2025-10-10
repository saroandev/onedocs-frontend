import {
  X,
  Save,
  Download,
  Printer,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./document-editor.module.scss";
import { useUIStore } from "@/shared/store/ui.store";
import { Button, Separator } from "@/shared/ui";

export const DocumentEditor = () => {
  const editorOpen = useUIStore((state) => state.editorOpen);
  const setEditorOpen = useUIStore((state) => state.setEditorOpen);
  const editorContent = useUIStore((state) => state.editorContent);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (editorContent) {
      setContent(editorContent);
    }
  }, [editorContent]);

  if (!editorOpen) return null;

  return (
    <aside className={styles.editorAside}>
      <div className={styles.header}>
        <h2 className={styles.title}>Belge Editörü</h2>
        <div className={styles.headerActions}>
          <div
            // variant="ghost"
            //  size="icon"
            className={styles.iconButton}
            title="Kaydet"
          >
            <Save size={16} />
          </div>
          <div
            // variant="ghost"
            //  size="icon"
            className={styles.iconButton}
            title="İndir"
          >
            <Download size={16} />
          </div>
          <div
            // variant="ghost"
            //  size="icon"
            className={styles.iconButton}
            title="Yazdır"
          >
            <Printer size={16} />
          </div>
          <div
            // variant="ghost"
            // size="icon"
            className={styles.iconButton}
            onClick={() => setEditorOpen(false)}
            title="Kapat"
          >
            <X size={16} />
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Geri Al"
        >
          <Undo size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="İleri Al"
        >
          <Redo size={16} />
        </div>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        <select className={styles.fontSizeSelect}>
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>20</option>
          <option>24</option>
        </select>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Kalın"
        >
          <Bold size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="İtalik"
        >
          <Italic size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Altı Çizili"
        >
          <Underline size={16} />
        </div>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Sola Hizala"
        >
          <AlignLeft size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Ortala"
        >
          <AlignCenter size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Sağa Hizala"
        >
          <AlignRight size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="İki Yana Yasla"
        >
          <AlignJustify size={16} />
        </div>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Madde İşareti"
        >
          <List size={16} />
        </div>
        <div
          // variant="ghost"
          //  size="icon"
          className={styles.toolButton}
          title="Numaralı Liste"
        >
          <ListOrdered size={16} />
        </div>
      </div>

      <div className={styles.documentArea}>
        <div className={styles.documentWrapper}>
          <textarea
            className={styles.documentTextarea}
            placeholder="Belge içeriğinizi buraya yazın veya AI tarafından oluşturulan içeriği düzenleyin..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
};
