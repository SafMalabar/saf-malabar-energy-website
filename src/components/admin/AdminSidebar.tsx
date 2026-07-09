"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  FolderKanban,
  HelpCircle,
  Wrench,
  Settings,
  BarChart3,
  Inbox,
  Sun,
  ExternalLink,
} from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  adminName: string;
}

export function AdminSidebar({ adminName }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-900 text-white">
      <div className="flex items-center gap-3 border-b border-slate-700 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Sun size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold">SAF Admin</p>
          <p className="text-xs text-slate-400">Malabar Energy</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <p className="mb-3 truncate text-xs text-slate-400">{adminName}</p>
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
          >
            <ExternalLink size={14} />
            View Website
          </Link>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-900 p-2 lg:hidden">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
              isActive ? "bg-primary text-white" : "text-slate-300"
            }`}
          >
            <Icon size={14} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
