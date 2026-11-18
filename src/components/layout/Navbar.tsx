"use client";

import React, { useState } from "react";
import { UserRole, AppNotification, User } from "@/types";
import { Bell, GraduationCap, LogOut, ChevronDown, CheckCircle2, ShieldAlert } from "lucide-react";

interface NavbarProps {
  currentUser: User;
  notifications: AppNotification[];
  onMarkNotificationAsRead: (id: string) => void;
  onSelectReportFromNotification?: (reportId: string) => void;
  onLogout: () => void;
}

export function Navbar({
  currentUser,
  notifications,
  onMarkNotificationAsRead,
  onSelectReportFromNotification,
  onLogout,
}: NavbarProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userNotifs = notifications.filter((n) => {
    if (currentUser.role === "WALI_MURID") return n.userId === currentUser.id;
    if (currentUser.role === "BOD") return n.userId === "user-bod-1" || n.title.includes("Laporan Kasus");
    return true;
  });

  const unreadCount = userNotifs.filter((n) => !n.isRead).length;

  const roleBadge: Record<UserRole, { label: string; color: string; bg: string }> = {
    BK: { label: "Guru BK", color: "#1e3a5f", bg: "#e8edf4" },
    BOD: { label: "Pimpinan / BOD", color: "#6b4c1e", bg: "#f5edcf" },
    WALI_MURID: { label: "Wali Murid", color: "#2d5a3f", bg: "#dff0e5" },
  };

  const badge = roleBadge[currentUser.role];

  return (
    <header className="sticky top-0 z-40 w-full border-b" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "#1e3a5f" }}>
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>BK-Connect</h1>
          </div>
          <div className="hidden sm:block h-5 w-px mx-2" style={{ background: "var(--card-border)" }} />
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded" style={{ color: badge.color, background: badge.bg }}>
            {badge.label}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-2">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }}
              className="relative p-2 rounded-md transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "#b93a3a" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-1 w-80 rounded-lg shadow-lg border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
                <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>Notifikasi</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "#fce8e8", color: "#b93a3a" }}>
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y" style={{ borderColor: "var(--card-border)" }}>
                  {userNotifs.length > 0 ? userNotifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onMarkNotificationAsRead(n.id);
                        onSelectReportFromNotification?.(n.reportId);
                        setShowNotifs(false);
                      }}
                      className="p-3 cursor-pointer transition-colors"
                      style={{ background: n.isRead ? "transparent" : "var(--surface)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = n.isRead ? "transparent" : "var(--surface)")}
                    >
                      <div className="flex items-start space-x-2.5">
                        {n.title.includes("BERAT") ? (
                          <ShieldAlert className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#b93a3a" }} />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#1e3a5f" }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{n.title}</p>
                            {!n.isRead && <span className="w-1.5 h-1.5 rounded-full ml-1 shrink-0" style={{ background: "#1e3a5f" }} />}
                          </div>
                          <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: "var(--muted)" }}>{n.message}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="p-5 text-center text-xs" style={{ color: "var(--muted-light)" }}>Belum ada notifikasi</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }}
              className="flex items-center space-x-2 py-1.5 px-2.5 rounded-md transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ background: "#1e3a5f" }}>
                {currentUser.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold truncate max-w-[130px]" style={{ color: "var(--foreground)" }}>
                  {currentUser.fullName.split(" ").slice(0, 2).join(" ")}
                </p>
              </div>
              <ChevronDown className="w-3 h-3" style={{ color: "var(--muted-light)" }} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1 w-56 rounded-lg shadow-lg border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
                <div className="px-4 py-3 border-b" style={{ borderColor: "var(--card-border)" }}>
                  <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{currentUser.fullName}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{currentUser.email}</p>
                </div>
                <div className="p-1.5">
                  <button
                    type="button"
                    onClick={() => { setShowUserMenu(false); onLogout(); }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                    style={{ color: "#b93a3a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fce8e8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar dari Sistem</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
