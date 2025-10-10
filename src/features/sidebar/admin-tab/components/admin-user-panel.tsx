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
import { useState } from "react";
import classnames from "classnames";
import styles from "../styles/admin-user-panel.module.scss";
import { mockUsers } from "../constants/admin-user-panel-config";

export const AdminUserPanel = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Kullanıcı" });
  const [value, setValue] = useState("");

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.headerInfo}>
            <h3 className={styles.headerTitle}>Takım Üyeleri</h3>
            <p className={styles.headerDescription}>Ekip üyelerinizi yönetin ve roller atayın</p>
          </div>
          <Button
            label="Davet Et"
            onClick={() => setInviteOpen(true)}
            buttonType="iconWithText"
            iconType={{ default: "user" }}
            iconTextReverse
          />
        </div>

        <div className={styles.searchSection}>
          <Input
            placeholder="İsim veya e-posta ile ara..."
            className={styles.searchInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
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
                  label="Düzenle"
                  className={styles.editButton}
                  onClick={() => openEditDialog(user)}
                  buttonType="justText"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <Input
                label="İsim"
                name="invite-name"
                placeholder="Kullanıcı adı"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              />
            </div>
            <div className={styles.formField}>
              <Input
                label="E-posta"
                name="invite-email"
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
            <Button
              label="İptal"
              onClick={() => setInviteOpen(false)}
              buttonType="justText"
              variant="secondary"
            />
            <Button
              label="Davet Gönder"
              onClick={handleInvite}
              buttonType="iconWithText"
              iconType={{ default: "mail" }}
              iconTextReverse
            />
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
                <Input
                  label="İsim"
                  name="edit-name"
                  placeholder="Kullanıcı adı"
                  // value={selectedUser.name}
                  onChange={(e) => console.log(e.target.value)}
                  disabled
                  className={styles.disabledInput}
                />
                <p className={styles.fieldHint}>İsim değiştirilemez</p>
              </div>
              <div className={styles.formField}>
                <Input
                  name="edit-email"
                  label="E-posta"
                  type="email"
                  onChange={(e) => console.log(e.target.value)}
                  placeholder="ornek@sirket.com"
                  // value={selectedUser.email}
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
              label="Kullanıcıyı Kaldır"
              onClick={() => {
                console.log("Removing user:", selectedUser);
                setEditOpen(false);
              }}
              buttonType="iconWithText"
              iconType={{ default: "delete" }}
              iconTextReverse
              variant="destructive"
              className={styles.destructive}
            />
            <div className={styles.footerActions}>
              <Button
                label="İptal"
                onClick={() => setEditOpen(false)}
                buttonType="justText"
                variant="secondary"
              />
              <Button label="Kaydet" onClick={handleEdit} buttonType="justText" />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
