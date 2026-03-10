interface HeaderProps {
  isPro: boolean;
  onUpgrade: () => void;
}

export function Header({ isPro, onUpgrade }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-12 px-5 border-b border-white/5 bg-[#0a0a0a] shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
          <span className="text-[10px] font-bold text-black">OG</span>
        </div>
        <span className="text-sm font-semibold tracking-tight">
          OGMaker
        </span>
        {isPro && (
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-black rounded">
            PRO
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!isPro && (
          <button
            onClick={onUpgrade}
            className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
          >
            Pro 업그레이드
          </button>
        )}
        <a
          href="https://openwebside.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          by OpenWebSide
        </a>
      </div>
    </header>
  );
}
