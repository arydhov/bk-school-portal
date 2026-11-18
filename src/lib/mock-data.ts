import {
  Student,
  User,
  CounselingReport,
  AppNotification,
  DropdownOptions,
} from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "user-bk-1",
    email: "javier.bk@sekolah.sch.id",
    fullName: "Mr. Javier S.Psi",
    role: "BK",
    phoneNumber: "081234567890",
  },
  {
    id: "user-bk-2",
    email: "novita.bk@sekolah.sch.id",
    fullName: "Novita Haryani, S.Pd",
    role: "BK",
    phoneNumber: "081234567891",
  },
  {
    id: "user-bod-1",
    email: "bod@sekolah.sch.id",
    fullName: "Dr. H. Sulaiman, M.Pd (Pimpinan Yayasan)",
    role: "BOD",
  },
  {
    id: "user-parent-1",
    email: "ortu.zufan@gmail.com",
    fullName: "Ibu Rahmawati (Wali Zufan Aji Khairan)",
    role: "WALI_MURID",
    phoneNumber: "081987654321",
  },
  {
    id: "user-parent-2",
    email: "ortu.cyrilla@gmail.com",
    fullName: "Bapak Salsabila (Wali Cyrilla Qanita)",
    role: "WALI_MURID",
    phoneNumber: "081987654322",
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "std-1",
    nis: "20241001",
    fullName: "CYRILLA QANITA SALSABILA",
    className: "XII F3",
    homeroomTeacher: "Muhammad Ardiansyah S.Pd. Gr.",
    parentId: "user-parent-2",
  },
  {
    id: "std-2",
    nis: "20241002",
    fullName: "Al Atha Uqail Ahmad Yudanto",
    className: "XII F1",
    homeroomTeacher: "Derisma, S.Pd. Gr.",
  },
  {
    id: "std-3",
    nis: "20241003",
    fullName: "Zufan Aji Khairan",
    className: "XI F1",
    homeroomTeacher: "Desi Nurhaddiyanti, S.Pd. Gr.",
    parentId: "user-parent-1",
  },
  {
    id: "std-4",
    nis: "20241004",
    fullName: "Didgaya Danadyaksa",
    className: "XI F1",
    homeroomTeacher: "Desi Nurhaddiyanti, S.Pd. Gr.",
  },
  {
    id: "std-5",
    nis: "20241005",
    fullName: "KAYNDRA NADHIF ABYAKTA ARAFA",
    className: "XI F1",
    homeroomTeacher: "Desi Nurhaddiyanti, S. Pd.,Gr.",
  },
];

export const INITIAL_DROPDOWN_OPTIONS: DropdownOptions = {
  aspects: ["KARIR", "PRIBADI", "SOSIAL", "BELAJAR"],
  indicators: [
    "BULLYING & RASIS ( BR )",
    "CAREER PATHWAYS ( CP )",
    "SEXUAL BEHAVIOR ( SB )",
    "UNDICIPLINE ( UD )",
  ],
  behaviorItems: [
    "Pemilihan Kelanjutan Karir",
    "Informasi Jalur Masuk PTN",
    "Informasi TKA",
    "Konflik Sosial/Berkelahi",
    "Praduga kedapatan/melakukan tindakan asusila",
    "Terlambat datang kesekolah",
  ],
  actions: [
    "CLEAR",
    "NASIHAT",
    "SURAT PERNYATAAN TINDAKAN",
    "SP 1",
    "SP 2",
    "SP 3",
    "PEMANGGILAN ORANG TUA",
  ],
  methods: ["INDIVIDUAL", "CLASSICAL", "PARENTING", "HOME VISIT"],
  statuses: ["MONITORING", "REFERRAL", "CLEAR"],
};

export const INITIAL_REPORTS: CounselingReport[] = [
  {
    id: "rep-1",
    reportNumber: "BK/2026/07/001",
    counselingDate: "2026-07-17",
    studentId: "std-1",
    studentName: "CYRILLA QANITA SALSABILA",
    className: "XII F3",
    homeroomTeacher: "Muhammad Ardiansyah S.Pd. Gr.",
    counselorId: "user-bk-1",
    counselorName: "Mr. Javier S.Psi",
    aspect: "KARIR",
    indicator: "CAREER PATHWAYS ( CP )",
    behaviorItem: "Pemilihan Kelanjutan Karir",
    problemLevel: "RINGAN",
    counselingMethod: "INDIVIDUAL",
    bapContent: `1. Ingin diskusi perihal kuliah STUDY ABROAD
2. Mau mengajak orangtua untuk konsultasi
3. Pilihan kampus ke LN adalah negara Malaysia dan Prodi Bioteknologi UPB Komunikasi Digital tetapi terkendala persetujuan orangtua`,
    counselorAdvice: `1. Konselor memberikan arahan orangtua boleh diajak ke BK breakdown perihal diskusi peluang masuk ke PTN LN yaitu Universitas Malaya
2. Prasyarat untuk nilai minimal harus 87 untuk IPA dan IPS 85
3. IELTS harus 6.5
4. Konselor mengarahkan siswa untuk persiapan IELTS Preparation terlebih dahulu`,
    status: "MONITORING",
    action: "CLEAR",
    createdAt: "2026-07-17T08:30:00Z",
  },
  {
    id: "rep-2",
    reportNumber: "BK/2026/07/002",
    counselingDate: "2026-07-20",
    studentId: "std-2",
    studentName: "Al Atha Uqail Ahmad Yudanto",
    className: "XII F1",
    homeroomTeacher: "Derisma, S.Pd. Gr.",
    counselorId: "user-bk-1",
    counselorName: "Mr. Javier S.Psi",
    aspect: "KARIR",
    indicator: "CAREER PATHWAYS ( CP )",
    behaviorItem: "Pemilihan Kelanjutan Karir",
    problemLevel: "RINGAN",
    counselingMethod: "INDIVIDUAL",
    bapContent: `1. Ingin menanyakan perihal peluang masuk kampus PTN UI dan STUDY ABROAD
2. Jika ke LN, ingin ke Waseda University Jepang
3. Membutuhkan arahan persiapan sertifikasi bahasa`,
    counselorAdvice: `1. Konselor menyarankan siswa mengajak orangtua untuk diskusi perihal peluang PTN & LN
2. Persiapan bahasa Jepang dan IELTS
3. Rekomendasi kursus persiapan`,
    status: "MONITORING",
    action: "CLEAR",
    createdAt: "2026-07-20T09:15:00Z",
  },
  {
    id: "rep-3",
    reportNumber: "BK/2026/07/003",
    counselingDate: "2026-07-20",
    studentId: "std-3",
    studentName: "Zufan Aji Khairan",
    className: "XI F1",
    homeroomTeacher: "Desi Nurhaddiyanti, S.Pd. Gr.",
    counselorId: "user-bk-1",
    counselorName: "Mr. Javier S.Psi",
    aspect: "SOSIAL",
    indicator: "BULLYING & RASIS ( BR )",
    behaviorItem: "Konflik Sosial/Berkelahi",
    problemLevel: "BERAT",
    counselingMethod: "INDIVIDUAL",
    bapContent: `BAP Pendalaman Kasus:
1. Tanggal Pelaksanaan: Senin, 20 Juli 2026 pukul 09.00 - 12.00 WIB
2. Pemeriksa Kasus: Mr. Janice Omar Javier
3. Kronologi Singkat: Laporan adanya perselisihan dan konflik di luar lingkungan sekolah terkait dugaan pelanggaran asusila dan keributan antar kelompok. Dilakukan pemanggilan saksi dan klarifikasi kronologis lengkap.`,
    counselorAdvice: `Tindakan Disiplin Sekolah:
1. Pemanggilan resmi Orang Tua / Wali Murid ke sekolah.
2. Penandatanganan Surat Pernyataan Tindakan dan komitmen pembinaan karakter bersama tim TPPK.
3. Pendampingan psikologis intensif oleh Guru BK.`,
    status: "MONITORING",
    action: "SURAT PERNYATAAN TINDAKAN",
    createdAt: "2026-07-20T10:00:00Z",
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    userId: "user-parent-1",
    reportId: "rep-3",
    title: "Laporan Konseling Baru: Zufan Aji Khairan",
    message:
      "Guru BK Mr. Javier S.Psi telah mengunggah catatan konseling dengan tindakan 'SURAT PERNYATAAN TINDAKAN'. Klik untuk membaca detail.",
    isRead: false,
    createdAt: "2026-07-20T10:05:00Z",
  },
  {
    id: "notif-2",
    userId: "user-bod-1",
    reportId: "rep-3",
    title: "Laporan Kasus [BERAT] - Kelas XI F1",
    message:
      "Terdapat penanganan kasus berstatus BERAT pada siswa Zufan Aji Khairan (XI F1). Penanganan: SURAT PERNYATAAN TINDAKAN.",
    isRead: false,
    createdAt: "2026-07-20T10:05:00Z",
  },
];
