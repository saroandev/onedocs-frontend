/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Mail, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import classnames from "classnames";
import styles from "../styles/admin-user-panel.module.scss";

export const AdminUserPanel = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Kullanıcı" });

  const handleInvite = () => {
    console.log("Inviting:", inviteForm);
    setInviteOpen(false);
    setInviteForm({ name: "", email: "", role: "Kullanıcı" });
  };

  const handleEdit = () => {
    console.log("Updating:", selectedUser);
    setEditOpen(false);
    setSelectedUser(null);
  };

  const openEditDialog = (user: any) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const mockUsers = [
    {
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Admin",
      color: "blue",
    },
    {
      name: "Ayşe Demir",
      email: "ayse@example.com",
      role: "Kullanıcı",
      color: "green",
    },
    {
      name: "Mehmet Kaya",
      email: "mehmet@example.com",
      role: "Kullanıcı",
      color: "green",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.headerInfo}>
            <h3 className={styles.headerTitle}>Takım Üyeleri</h3>
            <p className={styles.headerDescription}>Ekip üyelerinizi yönetin ve roller atayın</p>
          </div>
          <Button size="sm" className={styles.inviteButton} onClick={() => setInviteOpen(true)}>
            <UserPlus className={styles.inviteIcon} />
            Davet Et
          </Button>
        </div>

        <div className={styles.searchSection}>
          <Input placeholder="İsim veya e-posta ile ara..." className={styles.searchInput} />
        </div>

        <div className={styles.usersList}>
          {mockUsers.map((user, i) => (
            <div key={i} className={styles.userCard}>
              <div className={classnames(styles.userAvatar, styles[`avatar${user.color}`])}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
              </div>
              <div className={styles.userActions}>
                <span className={styles.userRole}>{user.role}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={styles.editButton}
                  onClick={() => openEditDialog(user)}
                >
                  Düzenle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Davet Et</DialogTitle>
            <DialogDescription>
              Yeni bir kullanıcı eklemek için bilgileri girin. Davetiye e-posta ile gönderilecektir.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.dialogContent}>
            <div className={styles.formField}>
              <Label htmlFor="invite-name">İsim</Label>
              <Input
                id="invite-name"
                placeholder="Kullanıcı adı"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="invite-email">E-posta</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="ornek@sirket.com"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="invite-role">Rol</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Kullanıcı">Kullanıcı</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleInvite}>
              <Mail className={styles.mailIcon} />
              Davet Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Düzenle</DialogTitle>
            <DialogDescription>
              Kullanıcı bilgilerini güncelleyin veya hesabı kaldırın.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className={styles.dialogContent}>
              <div className={styles.formField}>
                <Label htmlFor="edit-name">İsim</Label>
                <Input
                  id="edit-name"
                  placeholder="Kullanıcı adı"
                  value={selectedUser.name}
                  disabled
                  className={styles.disabledInput}
                />
                <p className={styles.fieldHint}>İsim değiştirilemez</p>
              </div>
              <div className={styles.formField}>
                <Label htmlFor="edit-email">E-posta</Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="ornek@sirket.com"
                  value={selectedUser.email}
                  disabled
                  className={styles.disabledInput}
                />
                <p className={styles.fieldHint}>E-posta değiştirilemez</p>
              </div>
              <div className={styles.formField}>
                <Label htmlFor="edit-role">Rol</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yönetici">Yönetici</SelectItem>
                    <SelectItem value="Kullanıcı">Kullanıcı</SelectItem>
                    <SelectItem value="Müvekkil">Müvekkil</SelectItem>
                    <SelectItem value="Demo">Demo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className={styles.editFooter}>
            <Button
              variant="destructive"
              className={styles.removeButton}
              onClick={() => {
                console.log("Removing user:", selectedUser);
                setEditOpen(false);
              }}
            >
              <Trash2 className={styles.trashIcon} />
              Kullanıcıyı Kaldır
            </Button>
            <div className={styles.footerActions}>
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                className={styles.cancelButton}
              >
                İptal
              </Button>
              <Button onClick={handleEdit} className={styles.saveButton}>
                Kaydet
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
