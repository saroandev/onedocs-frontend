import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import classNames from "classnames";
import {
  PanelLeftOpen,
  MessageSquare,
  FileSearch,
  User,
  Shield,
  Table,
  LayoutTemplate,
  Briefcase,
} from "lucide-react";
import styles from "./sidebar.module.scss";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Button } from "@/shared/ui/button";

interface IconRailButtonProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
}

const IconRailButton: React.FC<IconRailButtonProps> = ({
  icon,
  label,
  selected = false,
  onClick,
  href,
}) => {
  if (href) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            aria-label={label}
            className={classNames(styles.iconButton, {
              [styles.selected]: selected,
            })}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className={classNames(styles.iconButton, {
            [styles.selected]: selected,
          })}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const appIconForId = (id: string) => {
    switch (id) {
      case "hukuk-asistani":
        return <MessageSquare size={16} />;
      case "belge-otomasyonu":
        return <FileSearch size={16} />;
      case "proje-yonetimi":
        return <Table size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  const apps = [
    { id: "hukuk-asistani", label: "Hukuk Asistanı", icon: <MessageSquare size={18} /> },
    { id: "belge-otomasyonu", label: "Belge Oluşturma", icon: <LayoutTemplate size={18} /> },
    { id: "proje-yonetimi", label: "Analiz Tabloları", icon: <Briefcase size={18} /> },
  ];

  return (
    <div className={styles.sidebarContainer}>
      {/* Icon Rail */}
      <div className={styles.iconRail}>
        <div className={styles.topSection}>
          <div className={styles.logoContainer}>
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-1758453889486.png"
              alt="Logo"
              className={styles.logo}
            />
          </div>
          {collapsed && (
            <IconRailButton
              icon={<PanelLeftOpen size={16} />}
              label="Sidebar'ı Aç"
              onClick={() => setCollapsed(false)}
            />
          )}
          <div className={styles.appsContainer}>
            {apps.map((app) => {
              const isSelected = pathname.startsWith(`/${app.id}`);
              return (
                <IconRailButton
                  key={app.id}
                  icon={appIconForId(app.id)}
                  label={app.label}
                  selected={pathname.startsWith("/yonetici-paneli") ? false : isSelected}
                  href={`/${app.id}`}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.bottomSection}>
          <IconRailButton
            icon={<Shield size={16} />}
            label="Yönetici Paneli"
            href="/yonetici-paneli"
            selected={pathname.startsWith("/yonetici-paneli")}
          />
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Profil" className={styles.profileButton}>
                <div className={styles.iconButton}>
                  <User size={16} />
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className={styles.sheetContent}>
              <SheetHeader>
                <SheetTitle>Profil</SheetTitle>
              </SheetHeader>
              <div className={styles.profileActions}>
                <Button variant="secondary" className={styles.profileActionButton}>
                  Profil Ayarları
                </Button>
                <Button className={styles.profileActionButton}>Çıkış</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
