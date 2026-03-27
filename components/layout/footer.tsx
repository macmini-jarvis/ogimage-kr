import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
                <span className="text-[9px] font-black text-black">OG</span>
              </div>
              <span className="text-sm font-semibold text-white">OGMaker</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              블로그, SNS 공유용 OG 이미지를 무료로 생성하세요.
              프리미엄 템플릿과 한국어 폰트를 지원합니다.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">제품</h4>
            <div className="flex flex-col gap-2">
              <Link href="/editor" className="text-xs text-white/40 hover:text-white/70 transition-colors">에디터</Link>
              <Link href="/pricing" className="text-xs text-white/40 hover:text-white/70 transition-colors">가격</Link>
              <a href="#templates" className="text-xs text-white/40 hover:text-white/70 transition-colors">템플릿</a>
              <a href="#features" className="text-xs text-white/40 hover:text-white/70 transition-colors">기능</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">법적고지</h4>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">이용약관</Link>
              <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">개인정보처리방침</Link>
              <Link href="/refund" className="text-xs text-white/40 hover:text-white/70 transition-colors">환불정책</Link>
              <a href="mailto:openwebside@gmail.com" className="text-xs text-white/40 hover:text-white/70 transition-colors">문의</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} OGMaker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
