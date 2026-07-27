import { Navigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuthStore } from "@/shared/stores/auth-store";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/features/auth/schemas/login-schema";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const token = useAuthStore((s) => s.token);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Solvicity Admin</h1>
        <p className="mb-6 text-sm text-slate-500">
          Inicia sessão para gerir a plataforma.
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {loginMutation.isError && (
            <p className="text-sm text-red-500">
              Credenciais inválidas. Verifica o email e a password.
            </p>
          )}

          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "A entrar..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
