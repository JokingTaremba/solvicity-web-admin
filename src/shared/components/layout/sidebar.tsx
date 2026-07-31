import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Users,
  MessageSquare,
} from "lucide-react";

import {
  Sidebar as SidebarPrimitive,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/shared/components/ui/sidebar";
import { UserProfileMenu } from "./user-profile-menu";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/comments", label: "Comentários", icon: MessageSquare },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/users", label: "Utilizadores", icon: Users },
] as const;

export function Sidebar() {
  return (
    <SidebarPrimitive>
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            SC
          </div>
          <span className="text-xl font-semibold">Solvicity Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    size="lg"
                    render={
                      <Link
                        to={to}
                        activeOptions={{ exact: to === "/" }}
                        activeProps={{
                          className:
                            "!bg-primary-container !text-primary !font-bold",
                        }}
                      />
                    }
                  >
                    <Icon />
                    <span className="font-semibold">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <UserProfileMenu />
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
