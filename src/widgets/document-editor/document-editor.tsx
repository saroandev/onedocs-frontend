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
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import styles from "./document-editor.module.scss";
import { Separator } from "@/shared/ui/separator";

export const DocumentEditor = () => {
  const [editorContent, setEditorContent] = useState(""); //TODO
  const [editorOpen, setEditorOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editorContent) {
      setContent(editorContent);
    }
  }, [editorContent]);

  if (!editorOpen) return null;

  return (
    <aside className={styles.editorAside}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Belge Editörü</h2>
        <div className={styles.headerActions}>
          <Button variant="ghost" size="icon" className={styles.iconButton} title="Kaydet">
            <Save size={16} />
          </Button>
          <Button variant="ghost" size="icon" className={styles.iconButton} title="İndir">
            <Download size={16} />
          </Button>
          <Button variant="ghost" size="icon" className={styles.iconButton} title="Yazdır">
            <Printer size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={styles.iconButton}
            onClick={() => setEditorOpen(false)}
            title="Kapat"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Toolbar - Word Style */}
      <div className={styles.toolbar}>
        {/* Undo/Redo */}
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Geri Al">
          <Undo size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="İleri Al">
          <Redo size={16} />
        </Button>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        {/* Font Size */}
        <select className={styles.fontSizeSelect}>
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>20</option>
          <option>24</option>
        </select>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        {/* Text Formatting */}
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Kalın">
          <Bold size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="İtalik">
          <Italic size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Altı Çizili">
          <Underline size={16} />
        </Button>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        {/* Text Alignment */}
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Sola Hizala">
          <AlignLeft size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Ortala">
          <AlignCenter size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Sağa Hizala">
          <AlignRight size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="İki Yana Yasla">
          <AlignJustify size={16} />
        </Button>

        <Separator orientation="vertical" className={styles.toolbarSeparator} />

        {/* Lists */}
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Madde İşareti">
          <List size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.toolButton} title="Numaralı Liste">
          <ListOrdered size={16} />
        </Button>
      </div>

      {/* Document Area */}
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
