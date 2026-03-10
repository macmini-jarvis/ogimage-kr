import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "환불정책 - OGMaker",
};

export default function RefundPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-white/80 text-sm leading-relaxed">
      <Link href="/" className="text-emerald-400 text-xs hover:underline">&larr; OGMaker로 돌아가기</Link>
      <h1 className="text-2xl font-bold text-white mt-6 mb-8">환불정책</h1>
      <p className="text-white/40 text-xs mb-8">최종 수정일: 2026년 3월 10일</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">환불 안내</h2>
          <p>OGMaker Pro 구독 서비스를 구매하신 후 <strong>14일 이내</strong>에 환불을 요청하시면 사유에 관계없이 전액 환불해드립니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">환불 방법</h2>
          <p>아래 이메일로 환불 요청을 보내주세요. 결제 시 사용한 이메일 주소를 함께 기재해 주시면 영업일 기준 3일 이내에 처리됩니다. 환불은 원래 결제 수단으로 진행됩니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">구독 해지</h2>
          <p>구독은 언제든지 해지할 수 있으며, 해지 후에도 현재 결제 기간이 끝날 때까지 Pro 기능을 사용할 수 있습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">연락처</h2>
          <p>환불 문의: <a href="mailto:openwebside@gmail.com" className="text-emerald-400 underline">openwebside@gmail.com</a></p>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t border-white/10 text-white/30 text-xs">
        운영: soulmateai · 문의: openwebside@gmail.com
      </div>
    </main>
  );
}
