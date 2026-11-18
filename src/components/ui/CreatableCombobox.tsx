"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react";

interface CreatableComboboxProps {
  label?: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  onAddNew?: (val: string) => void;
  required?: boolean;
}

export function CreatableCombobox({
  label,
  placeholder = "Pilih atau cari opsi...",
  options,
  value,
  onChange,
  onAddNew,
  required,
}: CreatableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const isExactMatch = options.some(
    (opt) => opt.toLowerCase() === search.trim().toLowerCase()
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setSearch("");
    setIsOpen(false);
  };

  const handleAddNew = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    if (onAddNew) {
      onAddNew(trimmed);
    }
    onChange(trimmed);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
          {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded border text-sm transition-all text-left"
        style={{
          background: "#ffffff",
          borderColor: isOpen ? "var(--primary)" : "var(--card-border)",
          color: value ? "var(--foreground)" : "var(--muted-light)",
          boxShadow: isOpen ? "0 0 0 1px var(--primary)" : "none",
        }}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronsUpDown className="w-4 h-4 ml-2 shrink-0" style={{ color: "var(--muted-light)" }} />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1.5 rounded-lg shadow-lg border overflow-hidden"
          style={{ background: "#ffffff", borderColor: "var(--card-border)" }}
        >
          {/* Search Box */}
          <div className="flex items-center px-3 py-2 border-b" style={{ borderColor: "var(--card-border)", background: "var(--surface)" }}>
            <Search className="w-4 h-4 mr-2 shrink-0" style={{ color: "var(--muted-light)" }} />
            <input
              type="text"
              className="w-full text-sm bg-transparent outline-none"
              placeholder="Ketik untuk mencari atau menambah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{ color: "var(--foreground)" }}
            />
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-left transition-colors"
                  style={{
                    color: value === opt ? "var(--primary)" : "var(--foreground)",
                    fontWeight: value === opt ? 600 : 400,
                    background: value === opt ? "#f0f4f8" : "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4f8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = value === opt ? "#f0f4f8" : "transparent")}
                >
                  <span className="truncate">{opt}</span>
                  {value === opt && <Check className="w-4 h-4 ml-2 shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-3.5 py-3 text-xs text-center" style={{ color: "var(--muted-light)" }}>
                Opsi tidak ditemukan
              </div>
            )}

            {/* Add New Option on-the-fly */}
            {search.trim() && !isExactMatch && onAddNew && (
              <div className="p-1 border-t" style={{ borderColor: "var(--card-border)" }}>
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="w-full flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors"
                  style={{ color: "var(--primary)", background: "#eef2f7" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e7f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#eef2f7")}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Tambah &quot;<span className="font-semibold underline">{search.trim()}</span>&quot; baru
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
