import { useState } from "react";
import { ImageOff, Images } from "lucide-react";

import type { MediaResponse } from "@/features/reports/types/reports-types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

const MAX_PREVIEW = 4;

function getGridClass(count: number) {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-2 grid-rows-2";
}

function getTileClass(count: number, index: number) {
  if (count === 3 && index === 0) return "row-span-2";
  return "";
}

export function MediaGallery({ media }: { media: MediaResponse[] }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
        <ImageOff className="size-8" />
        <p className="text-sm">Sem imagens neste report.</p>
      </div>
    );
  }

  const visible = media.slice(0, MAX_PREVIEW);
  const remaining = media.length - MAX_PREVIEW;
  const lastUpload = media[media.length - 1];

  return (
    <>
      <div className="flex items-center gap-6">
        <div
          className={`grid h-78 w-78 shrink-0 gap-1 overflow-hidden rounded-md ${getGridClass(visible.length)}`}
        >
          {visible.map((item, index) => {
            const isLastTile = index === MAX_PREVIEW - 1 && remaining > 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setGalleryOpen(true)}
                className={`group relative overflow-hidden ${getTileClass(visible.length, index)}`}
              >
                <img
                  src={item.url}
                  alt=""
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
                {isLastTile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white">
                    +{remaining}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Images className="size-4" />
            <span>
              {media.length} {media.length === 1 ? "imagem" : "imagens"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Último envio por {lastUpload.uploadedBy.name} em{" "}
            {new Date(lastUpload.createdAt).toLocaleDateString("pt-PT")}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => setGalleryOpen(true)}
          >
            Ver todas
          </Button>
        </div>
      </div>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Imagens ({media.length})</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {media.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-md border border-border"
              >
                <img
                  src={item.url}
                  alt=""
                  className="size-full object-cover transition-transform hover:scale-105"
                />
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
