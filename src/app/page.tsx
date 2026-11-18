"use client";

import React, { useState } from "react";
import { UserRole, CounselingReport, AppNotification, DropdownOptions, User } from "@/types";
import {
  MOCK_USERS,
  MOCK_STUDENTS,
  INITIAL_DROPDOWN_OPTIONS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
} from "@/lib/mock-data";
import { LoginPage } from "@/components/auth/LoginPage";
import { Navbar } from "@/components/layout/Navbar";
import { CounselingTable } from "@/components/counseling/CounselingTable";
import { CounselingForm } from "@/components/counseling/CounselingForm";
import { DetailModal } from "@/components/counseling/DetailModal";
import { ClipboardList, Users, CalendarCheck2, DollarSign, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  // Auth State
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // Navigation
  const [currentView, setCurrentView] = useState<"PORTAL_HUB" | "COUNSELING_VIEW" | "COUNSELING_FORM">("PORTAL_HUB");

  // Data
  const [reports, setReports] = useState<CounselingReport[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>(INITIAL_DROPDOWN_OPTIONS);
  const [selectedReport, setSelectedReport] = useState<CounselingReport | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingReport, setEditingReport] = useState<CounselingReport | null>(null);

  // === LOGIN ===
  if (!loggedInUser) {
    return (
      <LoginPage
        onLogin={(email: string) => {
          const user = MOCK_USERS.find((u) => u.email === email);
          if (user) {
            setLoggedInUser(user);
            setCurrentView("PORTAL_HUB");
          }
        }}
      />
    );
  }

  const activeRole = loggedInUser.role;

  // Handle Add New Dynamic Option
  const handleAddNewOption = (category: keyof DropdownOptions, newValue: string) => {
    setDropdownOptions((prev) => {
      const list = prev[category] as string[];
      if (!list.includes(newValue)) return { ...prev, [category]: [...list, newValue] };
      return prev;
    });
  };

  // Handle Submit
  const handleSubmitReport = (newReport: CounselingReport) => {
    setReports((prev) => [newReport, ...prev]);

    const newNotifs: AppNotification[] = [];
    const student = MOCK_STUDENTS.find((s) => s.id === newReport.studentId);
    if (student?.parentId) {
      newNotifs.push({
        id: "notif-" + Date.now() + "-p",
        userId: student.parentId,
        reportId: newReport.id,
        title: `Laporan Konseling Baru: ${newReport.studentName}`,
        message: `${newReport.counselorName} menambahkan catatan konseling dengan tindakan '${newReport.action}'.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    }
    newNotifs.push({
      id: "notif-" + Date.now() + "-b",
      userId: "user-bod-1",
      reportId: newReport.id,
      title: `Laporan Kasus [${newReport.problemLevel}] - ${newReport.className}`,
      message: `Kasus baru: ${newReport.studentName} (${newReport.className}) oleh ${newReport.counselorName}.`,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    setNotifications((prev) => [...newNotifs, ...prev]);
    setCurrentView("COUNSELING_VIEW");
    setToastMessage(`Laporan ${newReport.reportNumber} berhasil disimpan.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter visible reports
  const visibleReports = reports.filter((r) => {
    if (activeRole === "WALI_MURID") {
      if (loggedInUser.id === "user-parent-1") return r.studentName.includes("Zufan");
      if (loggedInUser.id === "user-parent-2") return r.studentName.includes("CYRILLA");
      return false;
    }
    return true;
  });

  // Menu items for Portal Hub
  const menuItems = [
    {
      key: "counseling",
      icon: ClipboardList,
      title: "Report Counseling",
      desc: "Pencatatan jurnal konseling, BAP kasus, indikator perilaku siswa, dan tindakan sekolah.",
      active: true,
      onClick: () => setCurrentView("COUNSELING_VIEW"),
    },
    { key: "master", icon: Users, title: "Master Siswa & Kelas", desc: "Manajemen biodata siswa, rombel kelas per tahun ajaran.", active: false },
    { key: "attendance", icon: CalendarCheck2, title: "Presensi Kehadiran", desc: "Rekam kehadiran harian dan integrasi absensi.", active: false },
    { key: "finance", icon: DollarSign, title: "Keuangan & SPP", desc: "Tagihan SPP, riwayat pembayaran, dan bukti transfer.", active: false },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <Navbar
        currentUser={loggedInUser}
        notifications={notifications}
        onMarkNotificationAsRead={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))}
        onSelectReportFromNotification={(rid) => {
          const rep = reports.find((r) => r.id === rid);
          if (rep) { setSelectedReport(rep); setCurrentView("COUNSELING_VIEW"); }
        }}
        onLogout={() => { setLoggedInUser(null); setCurrentView("PORTAL_HUB"); }}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="text-xs font-medium px-4 py-2.5 flex items-center justify-center space-x-2 text-white" style={{ background: "#2d5a3f" }}>
          <CheckCircle className="w-3.5 h-3.5" /><span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PORTAL HUB */}
        {currentView === "PORTAL_HUB" && (
          <div className="space-y-8">
            {/* Welcome */}
            <div className="p-6 sm:p-8 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted-light)" }}>
                {activeRole === "BK" ? "Guru Bimbingan Konseling" : activeRole === "BOD" ? "Pimpinan Sekolah / BOD" : "Orang Tua / Wali Murid"}
              </p>
              <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                Selamat Datang, {loggedInUser.fullName}
              </h1>
              <p className="text-xs mt-1.5 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                {activeRole === "BK" && "Anda memiliki akses penuh untuk mengisi jurnal bimbingan, menambah klasifikasi masalah, dan mengelola laporan konseling siswa."}
                {activeRole === "BOD" && "Anda dapat memantau rekapitulasi kedisiplinan dan kasus bimbingan konseling seluruh siswa se-sekolah."}
                {activeRole === "WALI_MURID" && "Anda dapat memantau seluruh riwayat bimbingan dan catatan konselor untuk anak Anda secara transparan."}
              </p>
            </div>

            {/* Menu Grid */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Modul Sistem</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      onClick={item.active ? item.onClick : undefined}
                      className="p-5 rounded-lg border transition-all"
                      style={{
                        background: "var(--card)",
                        borderColor: item.active ? "#1e3a5f" : "var(--card-border)",
                        opacity: item.active ? 1 : 0.5,
                        cursor: item.active ? "pointer" : "default",
                      }}
                      onMouseEnter={(e) => { if (item.active) e.currentTarget.style.borderColor = "#2a4f7f"; }}
                      onMouseLeave={(e) => { if (item.active) e.currentTarget.style.borderColor = "#1e3a5f"; }}
                    >
                      <div className="w-10 h-10 rounded flex items-center justify-center mb-3" style={{ background: item.active ? "#e8edf4" : "var(--surface)" }}>
                        <Icon className="w-5 h-5" style={{ color: item.active ? "#1e3a5f" : "var(--muted-light)" }} />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                        {item.active ? (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "#dff0e5", color: "#2d5a3f" }}>Aktif</span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "var(--surface)", color: "var(--muted-light)" }}>Segera</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{item.desc}</p>
                      {item.active && (
                        <span className="text-[11px] font-semibold flex items-center" style={{ color: "#1e3a5f" }}>
                          Buka Modul <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* COUNSELING TABLE VIEW */}
        {currentView === "COUNSELING_VIEW" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--card-border)" }}>
              <button type="button" onClick={() => setCurrentView("PORTAL_HUB")} className="text-xs font-medium" style={{ color: "var(--muted)" }}>← Menu Utama</button>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ background: "#e8edf4", color: "#1e3a5f" }}>Report Counseling</span>
            </div>
            <CounselingTable
              reports={visibleReports}
              userRole={activeRole}
              onOpenNewForm={() => setCurrentView("COUNSELING_FORM")}
              onSelectReport={(rep) => setSelectedReport(rep)}
              onEditReport={(rep) => {
                setEditingReport(rep);
                setCurrentView("COUNSELING_FORM");
              }}
              onDeleteReport={(reportId) => {
                setReports((prev) => prev.filter((r) => r.id !== reportId));
                setToastMessage("Laporan berhasil dihapus.");
                setTimeout(() => setToastMessage(null), 4000);
              }}
            />
          </div>
        )}

        {/* FORM INPUT */}
        {currentView === "COUNSELING_FORM" && activeRole === "BK" && (
          <CounselingForm
            students={MOCK_STUDENTS}
            currentUser={loggedInUser}
            options={dropdownOptions}
            onAddNewOption={handleAddNewOption}
            onSubmitReport={handleSubmitReport}
            onCancel={() => setCurrentView("COUNSELING_VIEW")}
          />
        )}
      </main>

      <DetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />

      {/* Footer */}
      <footer className="border-t py-4 px-6 text-center" style={{ borderColor: "var(--card-border)" }}>
        <p className="text-[10px] font-medium" style={{ color: "var(--muted-light)" }}>
          &copy; 2026 BK-Connect &middot; School Management System &middot; All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
