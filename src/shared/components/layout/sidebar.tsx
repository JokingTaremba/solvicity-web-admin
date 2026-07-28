import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Tag, Users, LogOut } from "lucide-react";

import { useAuthStore } from "@/shared/stores/auth-store";
import { Button } from "@/shared/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/users", label: "Utilizadores", icon: Users },
] as const;

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  function handleLogout() {
    clearAuth();
    navigate({ to: "/login" });
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
          S
        </div>
        <span className="font-semibold">Solvicity Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            activeProps={{
              className: "!bg-primary-container !text-primary",
            }}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{user?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          title="Terminar sessão"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </aside>
  );
}
