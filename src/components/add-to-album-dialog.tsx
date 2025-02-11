import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "./icons/folder-plus";
import { useState } from "react";
import { SearchResult } from "@/app/gallery/page";
import { addImageToAlbum } from "./actions";

export function AddToAlbumDialog({ image }: SearchResult) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost">
          <FolderPlus />
          <span>Add to Album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add To Album</DialogTitle>
          <DialogDescription>Type the name of the Album</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              id="album-name"
              defaultValue={albumName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              setOpen(false);
              await addImageToAlbum(image, albumName);
            }}
            type="submit"
          >
            Add to Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
