import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 - OGMaker",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-white/80 text-sm leading-relaxed">
      <Link href="/" className="text-emerald-400 text-xs hover:underline">&larr; OGMaker로 돌아가기</Link>
      <h1 className="text-2xl font-bold text-white mt-6 mb-8">개인정보처리방침</h1>
      <p className="text-white/40 text-xs mb-8">최종 수정일: 2026년 3월 10일</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">1. 수집하는 개인정보</h2>
          <p>OGMaker는 최소한의 개인정보만 수집합니다.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>무료 사용자:</strong> 별도의 개인정보를 수집하지 않습니다. 회원가입이 필요하지 않습니다.</li>
            <li><strong>Pro 구독자:</strong> 결제 처리를 위해 이메일 주소가 Paddle(결제 대행사)을 통해 수집됩니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">2. 개인정보 이용 목적</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pro 구독 결제 처리 및 관리</li>
            <li>서비스 개선 및 통계 분석 (비식별 데이터)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">3. 개인정보 제3자 제공</h2>
          <p>결제 처리를 위해 Paddle(paddle.com)에 결제 정보가 전달됩니다. 그 외 제3자에게 개인정보를 제공하지 않습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">4. 개인정보 보유 기간</h2>
          <p>구독 해지 시 관련 개인정보는 결제 기록 보관 의무(5년)를 제외하고 즉시 삭제합니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">5. 쿠키 및 분석</h2>
          <p>서비스는 기본적인 웹 분석을 위해 쿠키를 사용할 수 있습니다. Pro 상태 유지를 위해 localStorage를 사용합니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">6. 이용자의 권리</h2>
          <p>이용자는 언제든지 자신의 개인정보 열람, 수정, 삭제를 요청할 수 있으며, 아래 이메일로 연락하시면 처리해드립니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">7. 개인정보 보호책임자</h2>
          <p>이메일: openwebside@gmail.com</p>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t border-white/10 text-white/30 text-xs">
        문의: openwebside@gmail.com
      </div>
    </main>
  );
}
