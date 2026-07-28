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
      <main className="flex-1 overflow-y-auto p-8">
        <SidebarTrigger className="mb-4" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
