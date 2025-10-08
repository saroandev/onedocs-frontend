import {
  MessageSquare,
  Library,
  BookMarked,
  FileText,
  Table,
  Users,
  Clock,
  Shield,
  User,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { RailButton } from "./rail-button";
import styles from "./tab-item.module.scss";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  MessageSquare,
  Library,
  BookMarked,
  FileText,
  Table,
  Users,
  Clock,
  Shield,
  User,
};

export const TabItem = (props: TabItemProps) => {
  const { icon, label, onClick, selected } = props;

  const Icon = ICON_MAP[icon] || Library;

  return (
    <div className={styles.tabItemWrapper}>
      <RailButton icon={<Icon size={16} />} label={label} selected={selected} onClick={onClick} />
    </div>
  );
};

interface TabItemProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}
