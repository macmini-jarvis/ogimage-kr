"use client";

import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";

interface EditorHeaderProps {
  isPro: boolean;
  onUpgrade: () => void;
  user: User | null;
}

export function EditorHeader({ isPro, onUpgrade, user }: EditorHeaderProps) {
  return (
    <header className="flex items-center justify-between h-12 px-4 shrink-0 border-b border-white/5 bg-[#0a0a0a]">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
          <ArrowLeft size={14} />
          <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
            <span className="text-[10px] font-black text-black leading-none">OG</span>
          </div>
          <span className="text-xs font-semibold text-white">OGMaker</span>
        </Link>
        <span className="text-[10px] text-white/20">에디터</span>
        {isPro && (
          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-black rounded">
            PRO
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!isPro && (
          <button
            onClick={onUpgrade}
            className="px-2.5 py-1 text-[10px] font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded hover:shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            Pro 업그레이드
          </button>
        )}
        <AuthButton user={user} />
      </div>
    </header>
  );
}
