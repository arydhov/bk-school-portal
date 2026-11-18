"use client";

import React, { useState } from "react";
import { Student, CounselingReport, DropdownOptions, ProblemLevel, CaseStatus, User } from "@/types";
import { CreatableCombobox } from "@/components/ui/CreatableCombobox";
import { Send, ArrowLeft, AlertCircle } from "lucide-react";

interface CounselingFormProps {
  students: Student[];
  currentUser: User;
  options: DropdownOptions;
  onAddNewOption: (category: keyof DropdownOptions, val: string) => void;
  onSubmitReport: (report: CounselingReport) => void;
  onCancel: () => void;
}

export function CounselingForm({ students, currentUser, options, onAddNewOption, onSubmitReport, onCancel }: CounselingFormProps) {
  const [counselingDate, setCounselingDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [aspect, setAspect] = useState(options.aspects[0] || "");
  const [indicator, setIndicator] = useState(options.indicators[0] || "");
  const [behaviorItem, setBehaviorItem] = useState(options.behaviorItems[0] || "");
  const [problemLevel, setProblemLevel] = useState<ProblemLevel>("RINGAN");
  const [counselingMethod, setCounselingMethod] = useState("INDIVIDUAL");
  const [bapContent, setBapContent] = useState("");
  const [counselorAdvice, setCounselorAdvice] = useState("");
  const [status, setStatus] = useState<CaseStatus>("MONITORING");
  const [action, setAction] = useState(options.actions[0] || "CLEAR");
  const [error, setError] = useState<string | null>(null);

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) { setError("Pilih nama siswa terlebih dahulu."); return; }
    if (!bapContent.trim()) { setError("BAP / kronologi kasus wajib diisi."); return; }
    if (!counselorAdvice.trim()) { setError("Arahan konselor wajib diisi."); return; }

    const newReport: CounselingReport = {
      id: "rep-" + Date.now(),
      reportNumber: `BK/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${Math.floor(100 + Math.random() * 900)}`,
      counselingDate,
      studentId: selectedStudent.id,
      studentName: selectedStudent.fullName,
      className: selectedStudent.className,
      homeroomTeacher: selectedStudent.homeroomTeacher,
      counselorId: currentUser.id,
      counselorName: currentUser.fullName,
      aspect, indicator, behaviorItem, problemLevel, counselingMethod, bapContent, counselorAdvice, status, action,
      createdAt: new Date().toISOString(),
    };
    onSubmitReport(newReport);
  };

  const sectionHeader = (num: number, title: string) => (
    <div className="flex items-center space-x-2.5 pb-3 mb-4 border-b" style={{ borderColor: "var(--card-border)" }}>
      <span className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold text-white" style={{ background: "#1e3a5f" }}>{num}</span>
      <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{title}</h3>
    </div>
  );

  const levelOptions: { value: ProblemLevel; label: string; bg: string; activeBg: string; activeColor: string }[] = [
    { value: "RINGAN", label: "RINGAN", bg: "var(--surface)", activeBg: "#2d5a3f", activeColor: "#fff" },
    { value: "SEDANG", label: "SEDANG", bg: "var(--surface)", activeBg: "#b8860b", activeColor: "#fff" },
    { value: "BERAT", label: "BERAT", bg: "var(--surface)", activeBg: "#943030", activeColor: "#fff" },
  ];

  const inputClass = "w-full px-3 py-2.5 rounded border text-sm outline-none transition-colors";

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="mb-6">
        <button type="button" onClick={onCancel} className="flex items-center text-xs font-medium mb-2 transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Kembali ke Daftar
        </button>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Formulir Laporan Konseling</h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Isi seluruh kolom yang bertanda wajib (*) untuk menyimpan laporan.</p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded border flex items-center text-xs font-medium" style={{ background: "#fce8e8", borderColor: "#f0d0d0", color: "#943030" }}>
          <AlertCircle className="w-3.5 h-3.5 mr-2 shrink-0" />{error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Section 1 */}
        <div className="p-5 rounded border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
          {sectionHeader(1, "Data Identitas Siswa")}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>Tanggal Konseling *</label>
              <input type="date" value={counselingDate} onChange={(e) => setCounselingDate(e.target.value)} required className={inputClass} style={{ borderColor: "var(--card-border)", background: "var(--card)", color: "var(--foreground)" }} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>Nama Siswa *</label>
              <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} required className={inputClass} style={{ borderColor: "var(--card-border)", background: "var(--card)", color: "var(--foreground)" }}>
                <option value="">— Pilih Siswa —</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.fullName} ({s.className})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted-light)" }}>Kelas (Auto)</label>
              <div className="px-3 py-2.5 rounded border text-sm" style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--muted)" }}>
                {selectedStudent?.className || "—"}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted-light)" }}>Wali Kelas (Auto)</label>
              <div className="px-3 py-2.5 rounded border text-sm truncate" style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--muted)" }}>
                {selectedStudent?.homeroomTeacher || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-5 rounded border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
          {sectionHeader(2, "Klasifikasi Masalah")}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CreatableCombobox label="Aspek Masalah" options={options.aspects} value={aspect} onChange={setAspect} onAddNew={(v) => onAddNewOption("aspects", v)} required />
              <CreatableCombobox label="Indikator Masalah" options={options.indicators} value={indicator} onChange={setIndicator} onAddNew={(v) => onAddNewOption("indicators", v)} required />
            </div>
            <CreatableCombobox label="Item Perilaku" options={options.behaviorItems} value={behaviorItem} onChange={setBehaviorItem} onAddNew={(v) => onAddNewOption("behaviorItems", v)} required />
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Level Masalah *</label>
              <div className="grid grid-cols-3 gap-2">
                {levelOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setProblemLevel(opt.value)} className="py-2 px-3 rounded border text-xs font-bold transition-all text-center" style={{
                    background: problemLevel === opt.value ? opt.activeBg : opt.bg,
                    color: problemLevel === opt.value ? opt.activeColor : "var(--muted)",
                    borderColor: problemLevel === opt.value ? opt.activeBg : "var(--card-border)",
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-5 rounded border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
          {sectionHeader(3, "Pelaksanaan & BAP")}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CreatableCombobox label="Metode Konseling" options={options.methods} value={counselingMethod} onChange={setCounselingMethod} onAddNew={(v) => onAddNewOption("methods", v)} />
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted-light)" }}>Counselor In Charge</label>
                <div className="px-3 py-2.5 rounded border text-sm" style={{ borderColor: "var(--card-border)", background: "var(--surface)", color: "var(--muted)" }}>{currentUser.fullName}</div>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>BAP / Kronologi Kasus *</label>
              <textarea rows={5} value={bapContent} onChange={(e) => setBapContent(e.target.value)} placeholder="Kronologi kejadian, saksi, dan temuan pemeriksaan..." required className={inputClass + " leading-relaxed"} style={{ borderColor: "var(--card-border)", background: "var(--card)", color: "var(--foreground)" }} />
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-5 rounded border" style={{ background: "var(--card)", borderColor: "var(--card-border)" }}>
          {sectionHeader(4, "Arahan Konselor & Tindakan")}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>Arahan / Solusi Konselor *</label>
              <textarea rows={4} value={counselorAdvice} onChange={(e) => setCounselorAdvice(e.target.value)} placeholder="Rekomendasi tindak lanjut, saran, atau pasal tata tertib..." required className={inputClass + " leading-relaxed"} style={{ borderColor: "var(--card-border)", background: "var(--card)", color: "var(--foreground)" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>Status Kasus</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as CaseStatus)} className={inputClass} style={{ borderColor: "var(--card-border)", background: "var(--card)", color: "var(--foreground)" }}>
                  <option value="MONITORING">MONITORING</option>
                  <option value="REFERRAL">REFERRAL</option>
                  <option value="CLEAR">CLEAR</option>
                </select>
              </div>
              <CreatableCombobox label="Tindakan" options={options.actions} value={action} onChange={setAction} onAddNew={(v) => onAddNewOption("actions", v)} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-1">
          <button type="button" onClick={onCancel} className="px-4 py-2.5 text-xs font-semibold rounded border transition-colors" style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}>
            Batal
          </button>
          <button type="submit" className="flex items-center px-5 py-2.5 text-xs font-semibold rounded text-white transition-opacity hover:opacity-90" style={{ background: "#1e3a5f" }}>
            <Send className="w-3.5 h-3.5 mr-1.5" /> Simpan & Kirim Notifikasi
          </button>
        </div>
      </form>
    </div>
  );
}
