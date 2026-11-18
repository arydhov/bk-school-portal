"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, GraduationCap, ShieldCheck } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const VALID_EMAILS: Record<string, string> = {
    "javier.bk@sekolah.sch.id": "bk123",
    "novita.bk@sekolah.sch.id": "bk123",
    "bod@sekolah.sch.id": "bod123",
    "ortu.zufan@gmail.com": "ortu123",
    "ortu.cyrilla@gmail.com": "ortu123",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const correctPassword = VALID_EMAILS[email.toLowerCase()];
    if (!correctPassword || correctPassword !== password) {
      setError("Email atau password salah. Silakan coba lagi.");
      setIsLoading(false);
      return;
    }

    onLogin(email.toLowerCase());
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel: School Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden" style={{ background: "linear-gradient(160deg, #142b47 0%, #1e3a5f 50%, #2a4f7f 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                BK-Connect
              </h1>
              <p className="text-xs text-white/50 font-medium tracking-wider uppercase">
                School Management System
              </p>
            </div>
          </div>

          {/* Center Content */}
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
              Sistem Informasi<br />
              Bimbingan Konseling<br />
              <span className="text-[#c8a84e]">Terintegrasi</span>
            </h2>
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-md">
              Platform digital terpusat untuk pencatatan jurnal konseling, pemantauan kedisiplinan siswa, dan pelaporan eksekutif secara transparan bagi seluruh pemangku kepentingan sekolah.
            </p>

            {/* Feature Points */}
            <div className="mt-8 space-y-3">
              {[
                "Pencatatan Kasus & BAP Terdigitalisasi",
                "Dashboard Eksekutif untuk Pimpinan Sekolah",
                "Transparansi Akses Orang Tua / Wali Murid",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a84e] shrink-0" />
                  <span className="text-xs text-white/70 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/30">
              &copy; 2026 BK-Connect &middot; All Rights Reserved
            </p>
            <div className="flex items-center space-x-1.5 text-white/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">Secure &amp; Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[var(--background)]">
        <div className="w-full max-w-sm">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
              Masuk ke Sistem
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1.5">
              Gunakan email dan password yang telah didaftarkan oleh administrator sekolah.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--muted-light)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:text-[var(--muted-light)]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--muted-light)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:text-[var(--muted-light)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-light)] hover:text-[var(--foreground)] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[var(--primary)] hover:underline font-medium">
                Lupa Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
              style={{ background: isLoading ? "#64707d" : "#1e3a5f" }}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  <span>Memverifikasi...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </span>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 rounded-lg border border-dashed border-[var(--card-border)] bg-[var(--surface)]">
            <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-2.5">
              Demo Credentials
            </p>
            <div className="space-y-1.5 text-[11px] text-[var(--muted)] font-mono">
              <div className="flex justify-between">
                <span>javier.bk@sekolah.sch.id</span>
                <span className="text-[var(--muted-light)]">bk123</span>
              </div>
              <div className="flex justify-between">
                <span>bod@sekolah.sch.id</span>
                <span className="text-[var(--muted-light)]">bod123</span>
              </div>
              <div className="flex justify-between">
                <span>ortu.zufan@gmail.com</span>
                <span className="text-[var(--muted-light)]">ortu123</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <p className="mt-6 text-center text-[10px] text-[var(--muted-light)]">
            Dengan masuk, Anda menyetujui kebijakan privasi data siswa yang berlaku di sekolah.
          </p>
        </div>
      </div>
    </div>
  );
}
