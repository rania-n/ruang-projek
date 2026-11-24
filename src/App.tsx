import { useEffect, useRef, useState } from "react";

type IconName =
  | "folder"
  | "arrow"
  | "search"
  | "book"
  | "heart"
  | "shield"
  | "chat"
  | "code"
  | "spark"
  | "clock"
  | "file"
  | "video"
  | "close"
  | "help"
  | "external"
  | "moon"
  | "sun"
  | "grid"
  | "calendar"
  | "plus";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9H3Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    book: <path d="M12 5v15M12 6C8 3 3 4 3 4v14s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 2Z" />,
    heart: <path d="m12 20-8-8C-2 5 7 0 12 7c5-7 14-2 8 5Z" />,
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z" />
        <path d="M7 10h10M7 14h6" />
      </>
    ),
    code: <path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-13-2 20" />,
    spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H5v18h14V8Z" />
        <path d="M14 3v6h5M8 13h8M8 17h5" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m10 9 5 3-5 3Z" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01" />
      </>
    ),
    external: <path d="M14 3h7v7m0-7L10 14M10 3H4v17h17v-6" />,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    plus: <path d="M12 5v14m-7-7h14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

// Efek kursor ringan, responsif, dan bebas lag
function CustomCursor({ disabled }: { disabled?: boolean }) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;

    if (disabled) {
      root.classList.remove("custom-cursor");
      if (orbRef.current) {
        orbRef.current.classList.remove("cursor-visible", "is-hover", "is-down");
      }
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let orbX = -200;
    let orbY = -200;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        orbX = mouseX;
        orbY = mouseY;
        root.classList.add("custom-cursor");
        orbRef.current?.classList.add("cursor-visible");
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest(
        "button, a, input, [role='button'], .subject-card, .theme-button, .nav-button",
      );
      if (isInteractive) {
        orbRef.current?.classList.add("is-hover");
      } else {
        orbRef.current?.classList.remove("is-hover");
      }
    };

    const onMouseDown = () => orbRef.current?.classList.add("is-down");
    const onMouseUp = () => orbRef.current?.classList.remove("is-down");
    const onMouseLeave = () => {
      isVisible = false;
      root.classList.remove("custom-cursor");
      orbRef.current?.classList.remove("cursor-visible", "is-hover", "is-down");
    };

    const animate = () => {
      if (isVisible) {
        orbX += (mouseX - orbX) * 0.28;
        orbY += (mouseY - orbY) * 0.28;
        if (orbRef.current) {
          orbRef.current.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div ref={orbRef} className="cursor-orb" aria-hidden="true">
      <div className="cursor-orb-inner" />
    </div>
  );
}

export type FileItem = {
  name: string;
  type: "Dokumen" | "Aplikasi" | "Video" | "Dokumentasi";
};

export type Subject = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  color: string;
  files: FileItem[];
  url?: string;
};

// ============================================================================
// KONFIGURASI GOOGLE DRIVE (Akun: timdev3k@gmail.com)
// Tempel tautan folder Google Drive di bawah ini.
// ============================================================================

// 1. Tautan Folder Google Drive Utama (Jika punya 1 folder induk untuk semua mapel)
export const MAIN_DRIVE_URL =
  "https://drive.google.com/drive/folders/1Bahw909HaKD6v1bbQZ5PmHt_n-dPpjc7?usp=sharing";

// 2. Tautan Folder Google Drive per Mata Pelajaran dari akun timdev3k@gmail.com
export const DRIVE_LINKS: Record<string, string> = {
  indonesia: "https://drive.google.com/drive/folders/11MSjDebREUzyVNVT3VGJqG30cQFbPeoI?usp=sharing",
  kik: "https://drive.google.com/drive/folders/1JwG_puHjpxyBGaExziJC8Z6cIAjbXt3P?usp=sharing",
  kk: "https://drive.google.com/drive/folders/1KPWv3G-zjHsWPRUW6i0aK57kCJUr36ih?usp=sharing",
  jawa: "https://drive.google.com/drive/folders/1N9Q-Q7yPEVJXgTgAEZMPnD8jQzfFCkaB?usp=sharing",
  agama: "https://drive.google.com/drive/folders/1VdJPjc1ed2zC1o23TLzaO0zE6RrsaGeB?usp=sharing",
  pancasila: "https://drive.google.com/drive/folders/1j8NZ_pXE72BoIM8n93irHZuppYJoRaQS",
  pilihan: "https://drive.google.com/drive/folders/1OlR7-cf0HmZolrhOcjsihUSNqHgYVNbX?usp=sharing",
  sejarah: "https://drive.google.com/drive/folders/19Qaqzo5i7dGmhgg7hkfDbY4qEiv16lGL?usp=sharing",
};

export type PpknDocItem = {
  id: string;
  name: string;
  date: string;
  files: string[];
  notes?: string;
};

export const DEFAULT_PPKN_DOCS: PpknDocItem[] = [
  {
    id: "proposal",
    name: "Pengajuan Proposal Awal",
    date: "2026-10-10",
    files: ["pengajuan proposal.jpg"],
    notes:
      "Pembentukan struktur kelompok projek dan perumusan berkas pengajuan proposal ke sekolah",
  },
  {
    id: "manna",
    name: "Manna Cafe Tulungagung",
    date: "2026-10-12",
    files: ["manna.jpg", "manna.HEIC"],
    notes: "Kerja kelompok pembahasan konsep projek dan pembagian riset UMKM",
  },
  {
    id: "aksata",
    name: "Aksata (Aksatacerita)",
    date: "2026-10-13",
    files: ["aksata.jpg", "aksata.HEIC"],
    notes:
      "Pertemuan klien via WhatsApp, pembuatan landing page prototype, penyusunan MOU, dan serah terima website",
  },
  {
    id: "eastville",
    name: "Eastville Barbershop",
    date: "2026-10-16",
    files: ["eastville.HEIC"],
    notes:
      "Pertemuan klien Eastville, penyerahan MOU, perancangan prototype, dan revisi fitur absensi kapster/lembur",
  },
  {
    id: "bonbin",
    name: "BonBin Cafe Tulungagung",
    date: "2026-10-16",
    files: ["bonbin.HEIC", "16 okt.jpg"],
    notes: "Kerja kelompok evaluasi pertemuan klien dan koordinasi tugas pembuatan sistem",
  },
  {
    id: "ruang-temu",
    name: "Ruang Temu Kepatihan",
    date: "2026-10-21",
    files: ["ruang temu.jpg", "ruang temu.HEIC"],
    notes: "Kerja kelompok pembahasan revisi proposal dan desain UI website",
  },
  {
    id: "sekolah",
    name: "Kerja Kelompok di Sekolah",
    date: "2026-10-22",
    files: ["E416ADDE-832A-4C4B-A0C3-4272F80D4D3E.jpg"],
    notes: "Koordinasi tatap muka penetapan pembagian tugas dan daftar kebutuhan projek",
  },
  {
    id: "dmr",
    name: "Cafe DMR Tulungagung",
    date: "2026-10-25",
    files: ["dmr.HEIC"],
    notes: "Kerja kelompok penulisan kode program (coding) front-end dan sinkronisasi basis data",
  },
  {
    id: "nonik",
    name: "Warkop Nonik Tulungagung",
    date: "2026-10-30",
    files: ["nonik.jpg", "nonik.HEIC"],
    notes: "Kerja kelompok evaluasi progres akhir bulan Oktober dan pengecekan kelengkapan tugas",
  },
  {
    id: "aji-bram",
    name: "Aji Bram Cafe Tulungagung",
    date: "2026-11-02",
    files: ["aji bram.jpg", "aji bram.PNG", "aji bram.HEIC"],
    notes: "Kerja kelompok pengembangan fitur lanjutan aplikasi dan dokumentasi kemajuan projek",
  },
  {
    id: "tema",
    name: "Tema Cafe Tulungagung",
    date: "2026-11-12",
    files: ["tema.jpg"],
    notes: "Kerja kelompok finalisasi laporan projek dan persiapan serah terima hasil karya",
  },
  {
    id: "photobooth",
    name: "Photobooth Projek",
    date: "2026-11-15",
    files: ["fotobooth.HEIC", "photobooth 2.jpg"],
    notes: "Dokumentasi stan promosi dan display banner photobooth karya kelompok",
  },
];

const subjects: Subject[] = [
  {
    id: "indonesia",
    name: "Bahasa Indonesia",
    description: "Laporan kegiatan dan petunjuk aplikasi",
    icon: "book",
    color: "blue",
    files: [
      { name: "Laporan hasil kegiatan UMKM", type: "Dokumen" },
      { name: "Petunjuk penggunaan aplikasi (Manual Book)", type: "Dokumen" },
    ],
  },
  {
    id: "kik",
    name: "KIK / Kewirausahaan",
    description: "Aplikasi UMKM, promosi, dan ulasan",
    icon: "spark",
    color: "lilac",
    files: [
      { name: "Dokumentasi aplikasi UMKM dan model bisnis", type: "Dokumen" },
      { name: "Materi dan skenario video promosi", type: "Dokumen" },
      { name: "Bukti pemasaran dan ulasan konsumen", type: "Dokumen" },
    ],
  },
  {
    id: "kk",
    name: "KK RPL",
    description: "Aplikasi dan rancangan sistem",
    icon: "code",
    color: "mint",
    files: [
      { name: "Dokumentasi aplikasi front-end dan back-end", type: "Dokumen" },
      { name: "Rancangan sistem ERD, DFD, dan Usecase", type: "Dokumen" },
    ],
  },
  {
    id: "jawa",
    name: "Bahasa Jawa",
    description: "Naskah pranata adicara bahasa Jawa",
    icon: "chat",
    color: "sand",
    files: [{ name: "Naskah pranata adicara (pambyawara)", type: "Dokumen" }],
  },
  {
    id: "agama",
    name: "Pendidikan Agama",
    description: "Penilaian sikap dan akhlak",
    icon: "heart",
    color: "peach",
    files: [
      { name: "Penilaian sikap dan akhlak mulia", type: "Dokumen" },
      { name: "Bukti sopan santun dan kejujuran", type: "Dokumen" },
    ],
  },
  {
    id: "pancasila",
    name: "Pendidikan Pancasila",
    description: "Kedisiplinan dan kerja sama tim",
    icon: "shield",
    color: "rose",
    files: [
      { name: "Dokumentasi kedisiplinan dan tanggung jawab", type: "Dokumen" },
      { name: "Gotong royong dan kerja sama tim", type: "Dokumen" },
      { name: "Etika dan tata krama saat presentasi", type: "Dokumen" },
    ],
  },
  {
    id: "pilihan",
    name: "Mapel Pilihan RPL",
    description: "Fitur Fuzzy Logic pada aplikasi",
    icon: "grid",
    color: "periwinkle",
    files: [
      { name: "Dokumentasi fitur Fuzzy Logic aplikasi", type: "Dokumen" },
      { name: "Implementasi kode algoritma Fuzzy", type: "Dokumen" },
    ],
  },
  {
    id: "sejarah",
    name: "Sejarah",
    description: "Komunikasi dan negosiasi dengan UMKM",
    icon: "clock",
    color: "sage",
    files: [
      { name: "Dokumentasi komunikasi dan wawancara UMKM", type: "Dokumen" },
      { name: "Bukti negosiasi dan kerjasama UMKM", type: "Dokumen" },
    ],
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Subject | null>(null);
  const [guide, setGuide] = useState(false);
  const [ppknModal, setPpknModal] = useState(false);
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [showLauncher, setShowLauncher] = useState(true);

  // State Manajemen Dokumentasi PPKN (Auto-sorting & Input Baru)
  const [ppknDocs, setPpknDocs] = useState<PpknDocItem[]>(() => {
    try {
      const saved = localStorage.getItem("rp_ppkn_docs_v2");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PPKN_DOCS;
  });
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest" | "name">("oldest");
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Form state input dokumentasi baru
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newNotes, setNewNotes] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("rp_ppkn_docs_v2", JSON.stringify(ppknDocs));
    } catch {}
  }, [ppknDocs]);

  const handleUpdateDate = (id: string, date: string) => {
    setPpknDocs((prev) => prev.map((item) => (item.id === id ? { ...item, date } : item)));
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newItem: PpknDocItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      date: newDate,
      files: ["Dokumentasi baru"],
      notes: newNotes.trim() || undefined,
    };
    setPpknDocs((prev) => [newItem, ...prev]);
    setNewName("");
    setNewNotes("");
    setShowAddForm(false);
  };

  const handleDeleteDoc = (id: string) => {
    setPpknDocs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDocs = () => {
    if (window.confirm("Kembalikan daftar dokumentasi ke data awal?")) {
      setPpknDocs(DEFAULT_PPKN_DOCS);
    }
  };

  const sortedPpknDocs = [...ppknDocs].sort((a, b) => {
    if (sortOrder === "newest") {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    }
    if (sortOrder === "oldest") {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    }
    return a.name.localeCompare(b.name);
  });

  const handleCopyTable = () => {
    const text = sortedPpknDocs
      .map(
        (d, idx) =>
          `${idx + 1}. [${d.date || "Belum ada tanggal"}] ${d.name} (${d.files.join(", ")}) ${d.notes ? "- " + d.notes : ""}`,
      )
      .join("\n");
    navigator.clipboard?.writeText(
      `JURNAL DOKUMENTASI PPKN - PROJEK KELOMPOK\nFolder Drive: ${DRIVE_LINKS.pancasila}\n\n` +
        text,
    );
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isModalActive = Boolean(selected || guide || ppknModal);

  useEffect(() => {
    try {
      localStorage.removeItem("rp_shortcut_closed");
    } catch {}
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showLauncher && !isModalActive) {
        setShowLauncher(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLauncher, isModalActive]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#171c19" : "#fafbf8");
  }, [dark]);

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add("dialog-open");
      triggerRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("dialog-open");
      dialogRef.current?.close();
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.classList.remove("dialog-open");
      document.body.style.overflow = "";
    };
  }, [isModalActive]);

  const closeDialog = () => {
    setSelected(null);
    setGuide(false);
    setPpknModal(false);
  };

  const goHome = () => {
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Langsung buka link Google Drive saat kartu diklik
  const handleCardClick = (subject: Subject) => {
    const driveUrl = DRIVE_LINKS[subject.id] || subject.url || MAIN_DRIVE_URL;
    if (driveUrl) {
      window.open(driveUrl, "_blank", "noopener,noreferrer");
    } else {
      // Jika link belum diisi, tampilkan panduan pengisian link Drive
      setSelected(subject);
    }
  };

  const visible = subjects.filter((s) =>
    `${s.name} ${s.description} ${s.files.map((f) => f.name).join(" ")}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <CustomCursor disabled={isModalActive} />

      {loading && (
        <div className="loading-screen" role="status">
          <div className="loader-logo">
            <Icon name="folder" size={34} />
            <span className="loader-spark">
              <Icon name="spark" size={18} />
            </span>
          </div>
          <h2>
            Ruang<span>Projek.</span>
          </h2>
          <p>Sebentar, ya…</p>
          <div className="loading-track">
            <span />
          </div>
          <small>oleh timdev3k</small>
        </div>
      )}

      {showLauncher ? (
        <div className="launcher-screen">
          <header className="launcher-header">
            <div className="launcher-header-inner">
              <a
                className="brand"
                href="#mapel"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLauncher(false);
                }}
                aria-label="RuangProjek"
              >
                <span className="brand-icon">
                  <Icon name="folder" />
                </span>
                <span>
                  Ruang<span className="brand-light">Projek</span>
                  <span className="brand-dot">.</span>
                </span>
              </a>

              <div className="launcher-header-actions">
                {MAIN_DRIVE_URL ? (
                  <a
                    className="nav-button nav-drive"
                    href={MAIN_DRIVE_URL}
                    target="_blank"
                    rel="noreferrer"
                    title="Buka Folder Google Drive Utama"
                  >
                    <Icon name="folder" size={18} />
                    <span className="nav-label">Drive Utama</span>
                    <Icon name="external" size={14} />
                  </a>
                ) : null}
                <button
                  className="nav-button nav-ppkn-btn"
                  onClick={() => setPpknModal(true)}
                  title="Kelola Dokumentasi & Tanggal PPKN"
                >
                  <Icon name="calendar" size={18} />
                  <span className="nav-label">Dokumentasi PPKN</span>
                </button>
                <button
                  className="nav-button"
                  onClick={() => setGuide(true)}
                  title="Bantuan & Panduan"
                >
                  <Icon name="help" size={18} />
                  <span className="nav-label">Bantuan</span>
                </button>
                <button
                  className="nav-button theme-button"
                  onClick={() => setDark(!dark)}
                  aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
                  title={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
                >
                  <Icon name={dark ? "sun" : "moon"} size={18} />
                  <span className="theme-label">{dark ? "Mode terang" : "Mode gelap"}</span>
                </button>
                <button
                  className="launcher-close-btn"
                  onClick={() => setShowLauncher(false)}
                  aria-label="Tutup dan ke halaman biasa"
                  title="Tutup (ke halaman biasa) - Esc"
                >
                  <span className="launcher-close-text">Halaman Biasa</span>
                  <span className="launcher-close-icon">
                    <Icon name="close" size={18} />
                  </span>
                </button>
              </div>
            </div>
          </header>

          <main className="launcher-container">
            <div className="launcher-hero">
              <div className="launcher-sparkle-pill">
                <Icon name="spark" size={14} />
                <span>Pintasan Cepat Google Drive</span>
              </div>
              <h1>
                Pilih Mata Pelajaran<span>.</span>
              </h1>
              <p>
                Klik tombol mapel di bawah untuk langsung membuka folder Google Drive resmi, atau
                klik tombol silang (✕) di pojok kanan atas untuk beralih ke halaman biasa.
              </p>
            </div>

            <div className="launcher-grid">
              {subjects.map((subject, idx) => (
                <button
                  key={subject.id}
                  type="button"
                  className={`launcher-card ${subject.color}`}
                  onClick={() => handleCardClick(subject)}
                  style={{ animationDelay: `${idx * 25}ms` }}
                  title={`Buka Google Drive ${subject.name}`}
                >
                  <div className="launcher-card-icon">
                    <Icon name={subject.icon} size={26} />
                  </div>
                  <span className="launcher-card-name">{subject.name}</span>
                  <div className="launcher-card-arrow" aria-hidden="true">
                    <Icon name="external" size={16} />
                  </div>
                </button>
              ))}
            </div>

            <div className="launcher-footer">
              <button
                type="button"
                className="launcher-footer-btn"
                onClick={() => setShowLauncher(false)}
                title="Buka halaman lengkap dengan pencarian dan rincian berkas"
              >
                <span>Ke Halaman Biasa (Pencarian & Rincian Berkas Lengkap)</span>
                <span className="footer-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </div>
          </main>
        </div>
      ) : (
        <>
          <header className="header">
            <div className="header-inner">
              <a
                className="brand"
                href="#mapel"
                onClick={(e) => {
                  e.preventDefault();
                  goHome();
                }}
                aria-label="RuangProjek, kembali ke daftar mapel"
              >
                <span className="brand-icon">
                  <Icon name="folder" />
                </span>
                <span>
                  Ruang<span className="brand-light">Projek</span>
                  <span className="brand-dot">.</span>
                </span>
              </a>

              <nav aria-label="Menu utama">
                <button
                  className="nav-button"
                  onClick={() => setShowLauncher(true)}
                  title="Buka Akses Cepat Mapel Layar Penuh"
                >
                  <Icon name="grid" size={19} />
                  <span className="nav-label">Akses Cepat</span>
                </button>
                <button
                  className="nav-button nav-ppkn-btn"
                  onClick={() => setPpknModal(true)}
                  title="Kelola Dokumentasi & Tanggal PPKN"
                >
                  <Icon name="calendar" size={19} />
                  <span className="nav-label">Dokumentasi PPKN</span>
                </button>
                <button className="nav-button" onClick={() => setGuide(true)} title="Bantuan">
                  <Icon name="help" size={20} />
                  <span className="nav-label">Bantuan</span>
                </button>
                {MAIN_DRIVE_URL ? (
                  <a
                    className="nav-button nav-drive"
                    href={MAIN_DRIVE_URL}
                    target="_blank"
                    rel="noreferrer"
                    title="Buka semua berkas di Google Drive"
                  >
                    <Icon name="folder" size={19} />
                    <span className="nav-label">Google Drive</span>
                    <Icon name="external" size={15} />
                  </a>
                ) : null}
                <button
                  className="nav-button theme-button"
                  onClick={() => setDark(!dark)}
                  aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
                  aria-pressed={dark}
                  title={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
                >
                  <Icon name={dark ? "sun" : "moon"} size={19} />
                  <span className="theme-label">{dark ? "Mode terang" : "Mode gelap"}</span>
                </button>
              </nav>
            </div>
          </header>

          <main id="mapel">
            <div className="top-section">
              <div className="section-title-wrap">
                <h1>
                  Mata Pelajaran<span>.</span>
                </h1>
              </div>

              <label className="search-box">
                <Icon name="search" size={20} />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Cari mapel atau berkas…"
                  aria-label="Cari mata pelajaran atau berkas"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    className="icon-button"
                    aria-label="Hapus pencarian"
                    onClick={() => {
                      setQuery("");
                      searchRef.current?.focus();
                    }}
                  >
                    <Icon name="close" size={18} />
                  </button>
                )}
              </label>
            </div>

            <section className="subject-grid" aria-label="Daftar mata pelajaran">
              {visible.map((subject, i) => {
                const hasDriveLink = Boolean(
                  DRIVE_LINKS[subject.id] || subject.url || MAIN_DRIVE_URL,
                );
                return (
                  <button
                    key={subject.id}
                    className={`subject-card ${subject.color}`}
                    onClick={() => handleCardClick(subject)}
                    style={{ animationDelay: `${i * 35}ms` }}
                    title={`Klik untuk membuka Google Drive ${subject.name}`}
                  >
                    <div className="card-top-row">
                      <span className="subject-icon">
                        <Icon name={subject.icon} size={25} />
                      </span>
                      <div className="card-top-badges">
                        {subject.id === "pancasila" && (
                          <span
                            className="ppkn-interactive-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPpknModal(true);
                            }}
                            title="Klik untuk melihat dan mengatur tanggal dokumentasi"
                          >
                            <Icon name="calendar" size={13} />
                            <span>Atur Tanggal ({ppknDocs.length})</span>
                          </span>
                        )}
                        <span className="file-badge">{subject.files.length} berkas</span>
                      </div>
                    </div>

                    <div className="card-copy">
                      <h2>{subject.name}</h2>
                      <p>{subject.description}</p>
                    </div>

                    {/* Butir-butir berkas langsung terlihat di kartu */}
                    <div className="card-files-list">
                      {subject.files.map((file) => (
                        <div key={file.name} className="card-file-item">
                          <span className="file-dot" />
                          <span className="file-name">{file.name}</span>
                        </div>
                      ))}
                    </div>

                    <span className="card-action">
                      <span>{hasDriveLink ? "Buka Google Drive" : "Tautkan Google Drive"}</span>
                      <Icon name="external" size={17} />
                    </span>
                  </button>
                );
              })}
            </section>

            {visible.length === 0 && (
              <div className="empty-state">
                <Icon name="search" size={32} />
                <h2>Mapel tidak ditemukan</h2>
                <p>Coba nama mapel atau kata kunci lain.</p>
                <button className="primary-button" onClick={() => setQuery("")}>
                  Lihat semua mapel <Icon name="arrow" size={20} />
                </button>
              </div>
            )}

            <footer>
              <span>Projek UMKM · 8 mata pelajaran</span>
              <a href="https://timdev3k.vercel.app" target="_blank" rel="noreferrer">
                Dibuat oleh <strong>timdev3k</strong>
                <Icon name="external" size={16} />
              </a>
            </footer>
          </main>
        </>
      )}

      <dialog
        ref={dialogRef}
        className={`detail-dialog ${ppknModal ? "ppkn-dialog-wide" : ""}`}
        aria-labelledby="dialog-title"
        onCancel={closeDialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
      >
        <div className="dialog-content">
          {selected ? (
            <>
              <button className="dialog-close icon-button" aria-label="Tutup" onClick={closeDialog}>
                <Icon name="close" />
              </button>
              <span className={`dialog-icon ${selected.color}`}>
                <Icon name={selected.icon} size={30} />
              </span>
              <h2 id="dialog-title">Folder Google Drive {selected.name}</h2>
              <p className="dialog-subtitle">
                Tautan folder untuk <strong>{selected.name}</strong> belum dimasukkan.
              </p>

              <div className="pending-notice">
                <strong>Cara Memasukkan Link Google Drive:</strong>
                <ol className="drive-setup-steps">
                  <li>
                    Buka Google Drive dengan akun <strong>timdev3k@gmail.com</strong>.
                  </li>
                  <li>
                    Buat folder untuk <strong>{selected.name}</strong>.
                  </li>
                  <li>
                    Klik kanan folder &gt; <em>Bagikan (Share)</em> &gt; Ubah akses menjadi{" "}
                    <em>Siapa saja yang memiliki link</em>.
                  </li>
                  <li>Salin link folder tersebut.</li>
                  <li>
                    Buka file <code>src/App.tsx</code> dan tempelkan link pada baris:
                    <pre className="code-hint">DRIVE_LINKS.{selected.id} = "LINK_FOLDER_KAMU"</pre>
                  </li>
                </ol>
              </div>

              <button className="primary-button dialog-action" onClick={closeDialog}>
                Mengerti <Icon name="arrow" size={20} />
              </button>
            </>
          ) : ppknModal ? (
            <div className="ppkn-modal-view">
              <button className="dialog-close icon-button" aria-label="Tutup" onClick={closeDialog}>
                <Icon name="close" />
              </button>

              <div className="ppkn-modal-header">
                <span className="dialog-icon rose">
                  <Icon name="shield" size={30} />
                </span>
                <div>
                  <h2 id="dialog-title">Dokumentasi PPKN</h2>
                  <p className="dialog-subtitle">
                    Daftar foto & kegiatan dikelompokkan per nama berkas. Ubah tanggal untuk
                    auto-sorting.
                  </p>
                </div>
              </div>

              {/* Action bar */}
              <div className="ppkn-action-bar">
                <a
                  href={DRIVE_LINKS.pancasila}
                  target="_blank"
                  rel="noreferrer"
                  className="shortcut-btn ppkn-drive-btn"
                  title="Buka Folder Dokumentasi di Google Drive"
                >
                  <Icon name="folder" size={16} />
                  <span>Buka Drive Dokumentasi</span>
                  <Icon name="external" size={13} />
                </a>

                <button
                  type="button"
                  className="shortcut-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Icon name="plus" size={14} />
                  <span>{showAddForm ? "Tutup Form" : "+ Input Baru"}</span>
                </button>

                <button
                  type="button"
                  className="shortcut-btn secondary"
                  onClick={handleCopyTable}
                  title="Salin daftar tabel untuk laporan Word"
                >
                  <span>{copiedNotification ? "✓ Tersalin!" : "Salin Tabel Laporan"}</span>
                </button>

                <button
                  type="button"
                  className="shortcut-btn secondary"
                  onClick={handleResetDocs}
                  title="Reset ke data awal"
                >
                  <span>Reset Data</span>
                </button>
              </div>

              {/* Form Input Baru */}
              {showAddForm && (
                <form className="ppkn-add-form" onSubmit={handleAddDoc}>
                  <h4>+ Input Dokumentasi Baru</h4>
                  <div className="ppkn-form-grid">
                    <label className="ppkn-form-field">
                      <span>Nama Kegiatan / Lokasi</span>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kunjungan UMKM Aksata..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </label>
                    <label className="ppkn-form-field">
                      <span>Tanggal Pelaksanaan</span>
                      <input
                        type="date"
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </label>
                  </div>
                  <label className="ppkn-form-field">
                    <span>Catatan / Keterangan</span>
                    <input
                      type="text"
                      placeholder="Keterangan singkat kegiatan..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                    />
                  </label>
                  <div className="ppkn-form-actions">
                    <button type="submit" className="primary-button ppkn-save-btn">
                      Simpan & Urutkan
                    </button>
                    <button
                      type="button"
                      className="nav-button"
                      onClick={() => setShowAddForm(false)}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              {/* Sorting Bar */}
              <div className="ppkn-sort-bar">
                <div className="sort-chips-group">
                  <span className="sort-title">Urutkan:</span>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "oldest" ? "active" : ""}`}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Kronologis (Awal - Akhir)
                  </button>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "newest" ? "active" : ""}`}
                    onClick={() => setSortOrder("newest")}
                  >
                    Terbaru di Atas
                  </button>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "name" ? "active" : ""}`}
                    onClick={() => setSortOrder("name")}
                  >
                    Nama (A-Z)
                  </button>
                </div>
                <span className="doc-count">{sortedPpknDocs.length} kegiatan</span>
              </div>

              {/* Dokumentasi List */}
              <div className="ppkn-docs-list">
                {sortedPpknDocs.map((doc, idx) => (
                  <div key={doc.id} className="ppkn-doc-row">
                    <div className="doc-num">{idx + 1}</div>
                    <div className="doc-main-col">
                      <div className="doc-header-line">
                        <strong className="doc-name">{doc.name}</strong>
                        <div className="doc-files-list">
                          {doc.files.map((file) => (
                            <span key={file} className="doc-file-badge">
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                      {doc.notes && <p className="doc-notes-text">{doc.notes}</p>}
                    </div>

                    <div className="doc-date-col">
                      <label className="doc-date-input-wrap">
                        <span className="doc-date-text">Tanggal:</span>
                        <input
                          type="date"
                          className="doc-date-input"
                          value={doc.date}
                          onChange={(e) => handleUpdateDate(doc.id, e.target.value)}
                          title="Ubah tanggal untuk mengurutkan otomatis"
                        />
                      </label>
                      <button
                        type="button"
                        className="doc-delete-btn"
                        onClick={() => handleDeleteDoc(doc.id)}
                        title="Hapus baris ini"
                        aria-label={`Hapus ${doc.name}`}
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ppkn-modal-footer">
                <small>
                  Perubahan tanggal langsung mengurutkan baris secara otomatis dan tersimpan di
                  browser Anda.
                </small>
                <button type="button" className="primary-button" onClick={closeDialog}>
                  Selesai <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          ) : ppknModal ? (
            <div className="ppkn-modal-view">
              <button className="dialog-close icon-button" aria-label="Tutup" onClick={closeDialog}>
                <Icon name="close" />
              </button>

              <div className="ppkn-modal-header">
                <span className="dialog-icon rose">
                  <Icon name="shield" size={30} />
                </span>
                <div>
                  <h2 id="dialog-title">Dokumentasi PPKN</h2>
                  <p className="dialog-subtitle">
                    Daftar foto & kegiatan dikelompokkan per nama berkas. Ubah tanggal untuk
                    auto-sorting.
                  </p>
                </div>
              </div>

              {/* Action bar */}
              <div className="ppkn-action-bar">
                <a
                  href={DRIVE_LINKS.pancasila}
                  target="_blank"
                  rel="noreferrer"
                  className="shortcut-btn ppkn-drive-btn"
                  title="Buka Folder Dokumentasi di Google Drive"
                >
                  <Icon name="folder" size={16} />
                  <span>Buka Drive Dokumentasi</span>
                  <Icon name="external" size={13} />
                </a>

                <button
                  type="button"
                  className="shortcut-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Icon name="plus" size={14} />
                  <span>{showAddForm ? "Tutup Form" : "+ Input Baru"}</span>
                </button>

                <button
                  type="button"
                  className="shortcut-btn secondary"
                  onClick={handleCopyTable}
                  title="Salin daftar tabel untuk laporan Word"
                >
                  <span>{copiedNotification ? "✓ Tersalin!" : "Salin Tabel Laporan"}</span>
                </button>

                <button
                  type="button"
                  className="shortcut-btn secondary"
                  onClick={handleResetDocs}
                  title="Reset ke data awal"
                >
                  <span>Reset Data</span>
                </button>
              </div>

              {/* Form Input Baru */}
              {showAddForm && (
                <form className="ppkn-add-form" onSubmit={handleAddDoc}>
                  <h4>+ Input Dokumentasi Baru</h4>
                  <div className="ppkn-form-grid">
                    <label className="ppkn-form-field">
                      <span>Nama Kegiatan / Lokasi</span>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kunjungan UMKM Aksata..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </label>
                    <label className="ppkn-form-field">
                      <span>Tanggal Pelaksanaan</span>
                      <input
                        type="date"
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </label>
                  </div>
                  <label className="ppkn-form-field">
                    <span>Catatan / Keterangan</span>
                    <input
                      type="text"
                      placeholder="Keterangan singkat kegiatan..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                    />
                  </label>
                  <div className="ppkn-form-actions">
                    <button type="submit" className="primary-button ppkn-save-btn">
                      Simpan & Urutkan
                    </button>
                    <button
                      type="button"
                      className="nav-button"
                      onClick={() => setShowAddForm(false)}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              {/* Sorting Bar */}
              <div className="ppkn-sort-bar">
                <div className="sort-chips-group">
                  <span className="sort-title">Urutkan:</span>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "oldest" ? "active" : ""}`}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Kronologis (Awal - Akhir)
                  </button>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "newest" ? "active" : ""}`}
                    onClick={() => setSortOrder("newest")}
                  >
                    Terbaru di Atas
                  </button>
                  <button
                    type="button"
                    className={`sort-chip ${sortOrder === "name" ? "active" : ""}`}
                    onClick={() => setSortOrder("name")}
                  >
                    Nama (A-Z)
                  </button>
                </div>
                <span className="doc-count">{sortedPpknDocs.length} kegiatan</span>
              </div>

              {/* Dokumentasi List */}
              <div className="ppkn-docs-list">
                {sortedPpknDocs.map((doc, idx) => (
                  <div key={doc.id} className="ppkn-doc-row">
                    <div className="doc-num">{idx + 1}</div>
                    <div className="doc-main-col">
                      <div className="doc-header-line">
                        <strong className="doc-name">{doc.name}</strong>
                        <div className="doc-files-list">
                          {doc.files.map((file) => (
                            <span key={file} className="doc-file-badge">
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                      {doc.notes && <p className="doc-notes-text">{doc.notes}</p>}
                    </div>

                    <div className="doc-date-col">
                      <label className="doc-date-input-wrap">
                        <span className="doc-date-text">Tanggal:</span>
                        <input
                          type="date"
                          className="doc-date-input"
                          value={doc.date}
                          onChange={(e) => handleUpdateDate(doc.id, e.target.value)}
                          title="Ubah tanggal untuk mengurutkan otomatis"
                        />
                      </label>
                      <button
                        type="button"
                        className="doc-delete-btn"
                        onClick={() => handleDeleteDoc(doc.id)}
                        title="Hapus baris ini"
                        aria-label={`Hapus ${doc.name}`}
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ppkn-modal-footer">
                <small>
                  Perubahan tanggal langsung mengurutkan baris secara otomatis dan tersimpan di
                  browser Anda.
                </small>
                <button type="button" className="primary-button" onClick={closeDialog}>
                  Selesai <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="dialog-icon lilac">
                <Icon name="help" size={30} />
              </span>
              <h2 id="dialog-title">Panduan RuangProjek</h2>
              <ol className="guide-steps">
                <li>Setiap kartu mapel langsung menampilkan daftar berkas yang dibutuhkan.</li>
                <li>
                  Klik langsung kartu mapel mana saja untuk{" "}
                  <strong>membuka folder Google Drive</strong> terkait di tab baru.
                </li>
                <li>
                  Tidak perlu bolak-balik memeriksa berkas karena semuanya tersimpan rapi di Google
                  Drive.
                </li>
              </ol>
              <button className="primary-button dialog-action" onClick={closeDialog}>
                Mengerti <Icon name="arrow" size={20} />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
