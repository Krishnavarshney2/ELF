"use client";

import { useState } from "react";
import { ChevronDown, CircleHelp, ScrollText, SquareStack } from "lucide-react";
import { me } from "@/lib/dashboard";
import { ThemeToggle } from "./theme-toggle";
import { DemoModal } from "./demo-modal";
import { InfoModal, type InfoMode } from "./info-modal";
import { RulesModal } from "./rules-modal";
import { CryptoDecor } from "./crypto-decor";

type AuthMode = "login" | "signup" | null;

export function Topbar() {
  const [authModal, setAuthModal] = useState<AuthMode>(null);
  const [infoModal, setInfoModal] = useState<InfoMode>(null);
  const [rulesOpen, setRulesOpen] = useState(false);

  const closeInfo = () => setInfoModal(null);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 overflow-hidden bg-bg/70 px-5 py-3.5 backdrop-blur sm:px-8">
      <CryptoDecor variant="header" />
      <button className="hidden items-center gap-2 rounded-full border border-line bg-card/60 px-3.5 py-2 text-sm sm:flex">
        <SquareStack size={15} className="text-muted" />
        {me.workspace}
        <ChevronDown size={15} className="text-muted" />
      </button>
      <button
        onClick={() => setRulesOpen(true)}
        className="hidden items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1.5 text-xs font-semibold text-fg sm:flex sm:px-3.5 sm:text-sm"
      >
        <ScrollText size={14} className="text-muted" />
        Rules
      </button>

      <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={() => setInfoModal("how-it-works")}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1.5 text-xs font-semibold text-fg sm:px-3.5 sm:text-sm"
        >
          <CircleHelp size={14} />
          How it works
        </button>
        <ThemeToggle />
        <button onClick={() => setAuthModal("login")} className="rounded-full px-4 py-2 text-sm font-medium text-muted">
          Log in
        </button>
        <button
          onClick={() => setAuthModal("signup")}
          className="rounded-full bg-cassis px-4 py-2 text-sm font-semibold text-wasabi"
        >
          Sign up
        </button>
      </div>

      <DemoModal open={authModal !== null} mode={authModal} onClose={() => setAuthModal(null)} />
      <InfoModal open={infoModal !== null} mode={infoModal} onClose={closeInfo} />
      <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
    </header>
  );
}
