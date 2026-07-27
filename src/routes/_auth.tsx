import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/shared/stores/auth-store";
import { useSessionCheck } from "@/features/auth/hooks/use-session-check";

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
      <div className="p-8 text-sm text-slate-500">A verificar sessão...</div>
    );
  }

  return <Outlet />;
}
