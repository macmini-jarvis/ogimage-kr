import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "환불정책 - OGMaker",
};

export default function RefundPage() {
  return (
    <PageLayout>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">환불정책</h1>
      <p className="text-white/30 text-xs mt-3 mb-10">최종 수정일: 2026년 3월 10일</p>

      <section className="space-y-8">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">환불 안내</h2>
          <p className="text-sm text-white/50 leading-relaxed">OGMaker Pro 구독 서비스를 구매하신 후 <strong className="text-white/70">14일 이내</strong>에 환불을 요청하시면 사유에 관계없이 전액 환불해드립니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">환불 방법</h2>
          <p className="text-sm text-white/50 leading-relaxed">아래 이메일로 환불 요청을 보내주세요. 결제 시 사용한 이메일 주소를 함께 기재해 주시면 영업일 기준 3일 이내에 처리됩니다. 환불은 원래 결제 수단으로 진행됩니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">구독 해지</h2>
          <p className="text-sm text-white/50 leading-relaxed">구독은 언제든지 해지할 수 있으며, 해지 후에도 현재 결제 기간이 끝날 때까지 Pro 기능을 사용할 수 있습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">연락처</h2>
          <p className="text-sm text-white/50 leading-relaxed">환불 문의: <a href="mailto:openwebside@gmail.com" className="text-emerald-400 hover:underline">openwebside@gmail.com</a></p>
        </div>
      </section>
    </PageLayout>
  );
}
