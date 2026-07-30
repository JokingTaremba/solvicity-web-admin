import { MessageSquareOff } from "lucide-react";
import type { CommentResponse } from "@/features/reports/types/reports-types";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CommentList({ comments }: { comments: CommentResponse[] }) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
        <MessageSquareOff className="size-8" />
        <p className="text-sm">Ainda sem comentários.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={comment.user.avatarUrl ?? undefined} />
            <AvatarFallback className="text-xs">
              {getInitials(comment.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleString("pt-PT")}
              </span>
            </div>
            <p className="mt-0.5 text-sm">{comment.text}</p>
            {comment.media.length > 0 && (
              <div className="mt-2 flex gap-2">
                {comment.media.map((m) => (
                  <a
                    key={m.id}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={m.url}
                      alt=""
                      className="size-16 rounded-md border border-border object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
