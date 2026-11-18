"use client";

import React, { useState } from "react";
import { CounselingReport, UserRole } from "@/types";
import { Search, Plus, Eye, Calendar, Pencil, Trash2 } from "lucide-react";

interface CounselingTableProps {
  reports: CounselingReport[];
  userRole: UserRole;
  onOpenNewForm?: () => void;
  onSelectReport: (report: CounselingReport) => void;
  onEditReport?: (report: CounselingReport) => void;
  onDeleteReport?: (reportId: string) => void;
}

export function CounselingTable({ reports, userRole, onOpenNewForm, onSelectReport, onEditReport, onDeleteReport }: CounselingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const uniqueClasses = Array.from(new Set(reports.map((r) => r.className)));

  const filteredReports = reports.filter((r) => {
    const matchSearch = r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bapContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = levelFilter === "ALL" || r.problemLevel === levelFilter;
    const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
    const matchClass = classFilter === "ALL" || r.className === classFilter;
    return matchSearch && matchLevel && matchStatus && matchClass;
  });

  const totalCases = reports.length;
  const criticalCases = reports.filter((r) => r.problemLevel === "BERAT").length;
  const monitoringCases = reports.filter((r) => r.status === "MONITORING").length;

  const levelStyle: Record<string, { bg: string; color: string }> = {
    RINGAN: { bg: "#dff0e5", color: "#2d5a3f" },
    SEDANG: { bg: "#fef3cd", color: "#8a6d1b" },
    BERAT: { bg: "#fce8e8", color: "#943030" },
  };

  const selectStyle = "px-2.5 py-2 rounded border text-[11px] font-medium outline-none appearance-none cursor-pointer";

  const handleRowClick = (reportId: string) => {
    if (selectedId === reportId) {
      setSelectedId(null);
    } else {
      setSelectedId(reportId);
    }
    setShowDeleteConfirm(false);
  };

  const handleDelete = (reportId: string) => {
    if (onDeleteReport) {
      onDeleteReport(reportId);
      setSelectedId(null);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
            {userRole === "WALI_MURID" ? "Riwayat Bimbingan Konseling Anak" : "Jurnal Kasus & Bimbingan Konseling"}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {userRole === "BK" && "Kelola seluruh pencatatan kasus bimbingan konseling siswa."}
            {userRole === "BOD" && "Rekapitulasi pemantauan eksekutif kedisiplinan siswa se-sekolah."}
            {userRole === "WALI_MURID" && "Detail riwayat bimbingan dan catatan konselor untuk anak Anda."}
          </p>
        </div>
        {userRole === "BK" && onOpenNewForm && (
          <button type="button" onClick={onOpenNewForm} className="flex items-center justify-center px-4 py-2 text-xs font-semibold rounded text-white shrink-0 transition-opacity hover:opacity-90" style={{ background: "#1e3a5f" }}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Input Laporan Baru
          </button>
        )}
      </div>

      {/* BOD KPI Cards */}
      {userRole === "BOD" && (
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Total Kasus</p>
            <p className="text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{totalCases}</p>
          </div>
          <div className="p-4 rounded border" style={{ background: "#fdf5f5", borderColor: "#f0d0d0" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#943030" }}>Level Berat</p>
            <p className="text-xl font-bold mt-1" style={{ color: "#943030" }}>{criticalCases}</p>
          </div>
          <div className="p-4 rounded border" style={{ background: "#f3f6fb", borderColor: "#d0daea" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#1e3a5f" }}>Monitoring</p>
            <p className="text-xl font-bold mt-1" style={{ color: "#1e3a5f" }}>{monitoringCases}</p>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="p-3 rounded border flex flex-col sm:flex-row gap-2.5" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-light)" }} />
          <input
            type="text"
            placeholder="Cari nama siswa, kelas, atau kata kunci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded border text-xs outline-none"
            style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--foreground)" }}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className={selectStyle} style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--foreground)" }}>
            <option value="ALL">Semua Level</option>
            <option value="RINGAN">Ringan</option>
            <option value="SEDANG">Sedang</option>
            <option value="BERAT">Berat</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectStyle} style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--foreground)" }}>
            <option value="ALL">Semua Status</option>
            <option value="MONITORING">Monitoring</option>
            <option value="REFERRAL">Referral</option>
            <option value="CLEAR">Clear</option>
          </select>
          {uniqueClasses.length > 0 && (
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className={selectStyle} style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--foreground)" }}>
              <option value="ALL">Semua Kelas</option>
              {uniqueClasses.map((cls) => <option key={cls} value={cls}>{cls}</option>)}
            </select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ background: "var(--surface)" }}>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Tanggal</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Siswa / Kelas</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Aspek & Indikator</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Level</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Konselor</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)" }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? filteredReports.map((r, i) => {
                const ls = levelStyle[r.problemLevel] || levelStyle.RINGAN;
                const isSelected = selectedId === r.id;
                return (
                  <React.Fragment key={r.id}>
                    {/* Data Row */}
                    <tr
                      onClick={() => handleRowClick(r.id)}
                      className="transition-colors cursor-pointer"
                      style={{
                        borderBottom: isSelected ? "none" : (i < filteredReports.length - 1 ? "1px solid var(--card-border)" : "none"),
                        background: isSelected ? "#e6f7ed" : "transparent",
                        boxShadow: isSelected ? "inset 3px 0 0 #22c55e" : "none",
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "var(--surface)"; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = isSelected ? "#e6f7ed" : "transparent"; }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" />{r.counselingDate}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>{r.studentName}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{r.className}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="font-semibold" style={{ color: "#1e3a5f" }}>{r.aspect}</p>
                        <p className="truncate" style={{ color: "var(--muted)" }}>{r.indicator}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: ls.bg, color: ls.color }}>{r.problemLevel}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--muted)" }}>{r.counselorName}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>{r.action}</p>
                        <p className="text-[10px]" style={{ color: "var(--muted)" }}>{r.status}</p>
                      </td>
                    </tr>

                    {/* Inline Action Bar (appears below selected row) */}
                    {isSelected && (
                      <tr style={{ background: "#d4f0de", boxShadow: "inset 3px 0 0 #22c55e" }}>
                        <td colSpan={6} className="px-4 py-2" style={{ borderBottom: i < filteredReports.length - 1 ? "1px solid #b8e6c8" : "none" }}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold" style={{ color: "#16a34a" }}>
                              ✓ Terpilih — {r.studentName}
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); onSelectReport(r); }}
                                className="flex items-center px-3 py-1.5 rounded text-[11px] font-semibold transition-colors"
                                style={{ background: "#1e3a5f", color: "#ffffff" }}
                              >
                                <Eye className="w-3 h-3 mr-1" /> Detail
                              </button>
                              {userRole === "BK" && onEditReport && (
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); onEditReport(r); }}
                                  className="flex items-center px-3 py-1.5 rounded border text-[11px] font-semibold transition-colors"
                                  style={{ borderColor: "#b8e6c8", color: "var(--foreground)", background: "#ffffff" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f7ed")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                                >
                                  <Pencil className="w-3 h-3 mr-1" /> Edit
                                </button>
                              )}
                              {userRole === "BK" && onDeleteReport && (
                                <>
                                  {!showDeleteConfirm ? (
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true); }}
                                      className="flex items-center px-3 py-1.5 rounded border text-[11px] font-semibold transition-colors"
                                      style={{ borderColor: "#f0d0d0", color: "#943030", background: "#ffffff" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fce8e8")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                                    >
                                      <Trash2 className="w-3 h-3 mr-1" /> Hapus
                                    </button>
                                  ) : (
                                    <div className="flex items-center space-x-1.5 ml-1 pl-2.5 border-l" style={{ borderColor: "#e0a0a0" }}>
                                      <span className="text-[10px] font-bold" style={{ color: "#943030" }}>Yakin hapus?</span>
                                      <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}
                                        className="px-2.5 py-1.5 rounded text-[11px] font-bold text-white transition-opacity hover:opacity-90"
                                        style={{ background: "#dc2626" }}
                                      >
                                        Ya, Hapus
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                                        className="px-2 py-1.5 rounded text-[11px] font-medium"
                                        style={{ color: "var(--muted)" }}
                                      >
                                        Batal
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }) : (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-xs" style={{ color: "var(--muted-light)" }}>Tidak ada data yang sesuai filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
