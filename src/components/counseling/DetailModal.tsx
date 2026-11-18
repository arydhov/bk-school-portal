"use client";

import React from "react";
import { CounselingReport } from "@/types";
import { X, Calendar, User, BookOpen, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DetailModalProps {
  report: CounselingReport | null;
  onClose: () => void;
}

export function DetailModal({ report, onClose }: DetailModalProps) {
  if (!report) return null;

  const levelStyle: Record<string, { bg: string; color: string }> = {
    RINGAN: { bg: "#dff0e5", color: "#2d5a3f" },
    SEDANG: { bg: "#fef3cd", color: "#8a6d1b" },
    BERAT: { bg: "#fce8e8", color: "#943030" },
  };

  const ls = levelStyle[report.problemLevel] || levelStyle.RINGAN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div
        className="relative w-full max-w-2xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh] border"
        style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded font-semibold" style={{ background: "#e8edf4", color: "#1e3a5f" }}>
                {report.reportNumber}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded font-bold" style={{ background: ls.bg, color: ls.color }}>
                {report.problemLevel}
              </span>
            </div>
            <h2 className="text-base font-bold" style={{ color: "var(--foreground)" }}>
              {report.studentName}
              <span className="font-normal text-sm ml-2" style={{ color: "var(--muted)" }}>
                {report.className}
              </span>
            </h2>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-md transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-border)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Metadata */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-md border" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5 flex items-center" style={{ color: "var(--muted-light)" }}>
                <Calendar className="w-3 h-3 mr-1" /> Tanggal
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{formatDate(report.counselingDate)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5 flex items-center" style={{ color: "var(--muted-light)" }}>
                <User className="w-3 h-3 mr-1" /> Wali Kelas
              </p>
              <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{report.homeroomTeacher}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5 flex items-center" style={{ color: "var(--muted-light)" }}>
                <BookOpen className="w-3 h-3 mr-1" /> Konselor
              </p>
              <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{report.counselorName}</p>
            </div>
          </div>

          {/* Klasifikasi */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted-light)" }}>Klasifikasi Masalah</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded border" style={{ borderColor: "var(--card-border)" }}>
                <span style={{ color: "var(--muted)" }}>Aspek: </span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>{report.aspect}</span>
              </div>
              <div className="p-2.5 rounded border" style={{ borderColor: "var(--card-border)" }}>
                <span style={{ color: "var(--muted)" }}>Indikator: </span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>{report.indicator}</span>
              </div>
              <div className="p-2.5 rounded border col-span-2" style={{ borderColor: "var(--card-border)" }}>
                <span style={{ color: "var(--muted)" }}>Item Perilaku: </span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>{report.behaviorItem}</span>
              </div>
            </div>
          </div>

          {/* BAP */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1.5 flex items-center" style={{ color: "var(--muted-light)" }}>
              <FileText className="w-3 h-3 mr-1" style={{ color: "#1e3a5f" }} /> BAP / Kronologi Pemeriksaan
            </h4>
            <div className="p-4 rounded border text-xs leading-relaxed whitespace-pre-line" style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--foreground)" }}>
              {report.bapContent}
            </div>
          </div>

          {/* Advice */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1.5 flex items-center" style={{ color: "var(--muted-light)" }}>
              <AlertTriangle className="w-3 h-3 mr-1" style={{ color: "#b8860b" }} /> Arahan Konselor
            </h4>
            <div className="p-4 rounded border text-xs leading-relaxed whitespace-pre-line mb-3" style={{ borderColor: "#e8dbb8", background: "#fdf8ed", color: "var(--foreground)" }}>
              {report.counselorAdvice}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center px-2.5 py-1 rounded text-[11px] border" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
                <span style={{ color: "var(--muted)" }}>Status:&nbsp;</span>
                <span className="font-bold flex items-center" style={{ color: "#1e3a5f" }}>
                  <CheckCircle2 className="w-3 h-3 mr-0.5" />{report.status}
                </span>
              </div>
              <div className="flex items-center px-2.5 py-1 rounded text-[11px] border" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
                <span style={{ color: "var(--muted)" }}>Tindakan:&nbsp;</span>
                <span className="font-bold" style={{ color: "#6b4c1e" }}>{report.action}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex justify-end" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold rounded text-white transition-opacity hover:opacity-90" style={{ background: "#1e3a5f" }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
