import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Plus } from "lucide-react";

export const Collection = () => {
  return (
    <Dialog open={newCollectionDialogOpen} onOpenChange={setNewCollectionDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni Koleksiyon Oluştur</DialogTitle>
          <DialogDescription>
            Dökümanlarınızı organize etmek için yeni bir koleksiyon oluşturun.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="collection-name">Koleksiyon Adı</Label>
            <Input
              id="collection-name"
              placeholder="Örn: Proje Dökümanları"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateCollection();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Kapsam</Label>
            <RadioGroup
              value={newCollectionScope}
              onValueChange={(v) => setNewCollectionScope(v as "personal" | "org")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">
                  Kişisel - Sadece size özel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="org" id="org" />
                <Label htmlFor="org" className="font-normal cursor-pointer">
                  Organizasyon - Ekip üyeleriyle paylaşılabilir
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNewCollectionDialogOpen(false)}>
            İptal
          </Button>
          <Button onClick={handleCreateCollection} disabled={!newCollectionName.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
