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
          <h2 className="text-base font-semibold text-white mb-2">1. 환불 대상</h2>
          <p>OGMaker Pro 구독 서비스에 대한 환불 정책입니다. 무료 서비스는 별도의 결제가 없으므로 환불 대상이 아닙니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">2. 환불 조건</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>결제 후 7일 이내:</strong> 전액 환불이 가능합니다.</li>
            <li><strong>결제 후 7일 초과:</strong> 해당 결제 건에 대한 환불은 불가하며, 구독 해지 시 다음 결제일부터 과금이 중단됩니다.</li>
            <li><strong>서비스 장애:</strong> 서비스 측 귀책사유로 72시간 이상 서비스 이용이 불가한 경우 해당 기간에 대해 비례 환불합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">3. 구독 해지</h2>
          <p>구독은 언제든지 해지할 수 있으며, 해지 후에도 현재 결제 기간이 끝날 때까지 Pro 기능을 사용할 수 있습니다. 결제는 Paddle을 통해 관리되며, Paddle 고객 포털에서 직접 해지할 수 있습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">4. 환불 절차</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>아래 이메일로 환불 요청을 보내주세요.</li>
            <li>결제 시 사용한 이메일 주소와 환불 사유를 함께 기재해 주세요.</li>
            <li>요청 접수 후 영업일 기준 3일 이내에 처리됩니다.</li>
            <li>환불은 원래 결제 수단으로 진행됩니다.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">5. 연락처</h2>
          <p>환불 관련 문의: openwebside@gmail.com</p>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t border-white/10 text-white/30 text-xs">
        문의: openwebside@gmail.com
      </div>
    </main>
  );
}
