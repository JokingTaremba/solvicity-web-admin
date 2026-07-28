import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPage } from "@/pages/categories/categories";

export const Route = createFileRoute("/_auth/categories/")({
  component: CategoriesPage,
});
