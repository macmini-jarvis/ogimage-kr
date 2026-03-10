import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 - OGMaker",
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-white/80 text-sm leading-relaxed">
      <Link href="/" className="text-emerald-400 text-xs hover:underline">&larr; OGMaker로 돌아가기</Link>
      <h1 className="text-2xl font-bold text-white mt-6 mb-8">이용약관</h1>
      <p className="text-white/40 text-xs mb-8">최종 수정일: 2026년 3월 10일</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">제1조 (목적)</h2>
          <p>본 약관은 OGMaker(이하 &quot;서비스&quot;)가 제공하는 OG 이미지 생성 서비스의 이용 조건 및 절차, 이용자와 서비스 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제2조 (서비스 내용)</h2>
          <p>서비스는 사용자가 SNS 및 웹사이트용 오픈그래프(OG) 이미지를 생성하고 다운로드할 수 있는 온라인 도구를 제공합니다. 무료 기본 기능과 유료 Pro 구독을 통해 추가 기능을 이용할 수 있습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제3조 (이용자의 의무)</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>서비스를 불법적인 목적으로 사용하지 않아야 합니다.</li>
            <li>타인의 저작권, 상표권 등 지적재산권을 침해하는 콘텐츠를 생성하지 않아야 합니다.</li>
            <li>서비스의 정상적인 운영을 방해하는 행위를 하지 않아야 합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제4조 (유료 서비스)</h2>
          <p>Pro 구독은 월간 또는 연간 단위로 제공되며, 결제는 Paddle을 통해 처리됩니다. 구독은 해지하지 않는 한 자동으로 갱신됩니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제5조 (서비스 변경 및 중단)</h2>
          <p>서비스는 운영상, 기술상의 사유로 서비스 내용을 변경하거나 중단할 수 있으며, 이 경우 사전에 공지합니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제6조 (면책)</h2>
          <p>서비스는 사용자가 생성한 이미지의 내용에 대해 책임을 지지 않습니다. 천재지변, 서버 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">제7조 (준거법 및 관할)</h2>
          <p>본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 서울중앙지방법원을 제1심 관할 법원으로 합니다.</p>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t border-white/10 text-white/30 text-xs">
        문의: openwebside@gmail.com
      </div>
    </main>
  );
}
