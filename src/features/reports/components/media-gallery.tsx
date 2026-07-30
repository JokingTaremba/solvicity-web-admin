import { ImageOff } from "lucide-react";
import type { MediaResponse } from "@/features/reports/types/reports-types";

export function MediaGallery({ media }: { media: MediaResponse[] }) {
  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
        <ImageOff className="size-8" />
        <p className="text-sm">Sem imagens neste report.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
  );
}
