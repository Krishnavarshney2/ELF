"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Newspaper, Radar, Search, Sparkles, Telescope, X } from "lucide-react";
import { FaInstagram, FaRedditAlien, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { steps } from "@/lib/dashboard";
import { tile } from "@/lib/accent";
import { cn } from "@/lib/cn";

export type InfoMode = "how-it-works" | null;

const stepIcons = [Telescope, Radar, Sparkles];

const sources = [
  { label: "Reddit", sub: "top posts from crypto subs", Icon: FaRedditAlien, color: "text-[#ff4500]" },
  { label: "YouTube", sub: "viral videos & trends", Icon: FaYoutube, color: "text-[#ff0000]" },
  { label: "News", sub: "coindesk, cointelegraph & more", Icon: Newspaper, color: "text-sage" },
  { label: "Web search", sub: "live trend signals & narratives", Icon: Search, color: "text-cool" },
];

const outputs = [
  { n: 5, label: "Instagram reels", Icon: FaInstagram },
  { n: 3, label: "YouTube videos", Icon: FaYoutube },
  { n: 3, label: "X threads", Icon: FaXTwitter },
];

export function InfoModal({
  open,
  mode,
  onClose,
}: {
  open: boolean;
  mode: InfoMode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mode) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fade-in absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className={cn(
          "pop-in relative max-h-[min(90dvh,720px)] w-full overflow-hidden rounded-3xl border border-line bg-card shadow-2xl",
          "max-w-lg",
        )}
      >
        <button aria-label="close" onClick={onClose} className="absolute right-4 top-4 z-10 text-muted">
          <X size={18} />
        </button>

        <div className="modal-scroll max-h-[min(90dvh,720px)] overflow-y-auto overscroll-contain p-6">
          <HowItWorks onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function HowItWorks({ onClose }: { onClose: () => void }) {
  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cool/60 px-3 py-1 text-xs font-semibold text-cassis">
        <Sparkles size={13} /> 3-step pipeline
      </span>

      <h2 id="info-modal-title" className="mt-4 font-display text-2xl font-extrabold leading-tight">
        How Kairos works
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        One click scans what&apos;s going viral in crypto right now, finds the patterns behind it, and hands you
        ready-to-film ideas with hooks and scripts.
      </p>

      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <li key={s.n} className="flex gap-4 rounded-2xl border border-line bg-bg/50 p-4">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl shadow-sm", tile[s.accent])}>
                <Icon size={22} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-sm font-bold">
                  {s.n}. {s.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Where data comes from</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {sources.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-card/60 p-3 text-center">
              <s.Icon size={20} className={cn("mx-auto", s.color)} />
              <p className="mt-2 text-xs font-bold">{s.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-wasabi/15 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Every run gives you</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {outputs.map((o) => (
            <span
              key={o.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1.5 text-xs font-semibold"
            >
              <o.Icon size={14} />
              <span className="font-display text-sm">{o.n}</span>
              {o.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Each idea includes a hook, angle, script outline, and source link.</p>
      </div>

      <button onClick={onClose} className="mt-6 w-full rounded-full bg-cassis py-3 text-sm font-semibold text-wasabi">
        Got it — let&apos;s generate
      </button>
    </>
  );
}
