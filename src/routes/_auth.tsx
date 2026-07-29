import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/shared/stores/auth-store";
import { useSessionCheck } from "@/features/auth/hooks/use-session-check";
import { Sidebar } from "@/shared/components/layout/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const { isLoading } = useSessionCheck();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        A verificar sessão...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border px-8 py-3">
          <SidebarTrigger />
        </div>
        <main className="flex-1 overflow-hidden p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
