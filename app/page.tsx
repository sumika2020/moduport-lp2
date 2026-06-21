import fs from "fs";
import path from "path";
import ArticleSection from "./components/ArticleSection";

interface Article {
  id: number;
  title: string;
  note_url: string;
  created_at: string;
  period_start: string;
  period_end: string;
  category: string;
}

interface Stats {
  total_articles: number;
  watch_targets: number;
  ministries_count: number;
  ministries: string[];
}

interface LpData {
  stats: Stats;
  articles: Article[];
}

function getLpData(): LpData {
  try {
    const filePath = path.join(process.cwd(), "public", "articles.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as LpData;
  } catch {
    return {
      stats: {
        total_articles: 177,
        watch_targets: 42,
        ministries_count: 10,
        ministries: [],
      },
      articles: [],
    };
  }
}

export default function Home() {
  const data = getLpData();
  const { stats, articles } = data;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-[#091d3e] py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c9a227] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            ModuPort
          </span>
        </div>
        <a
          href="https://note.com/prime_ixia2156"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#c9a227] font-semibold hover:text-[#e4c76b] transition-colors"
        >
          noteを見る →
        </a>
      </header>

      {/* ヒーローセクション */}
      <section className="hero-gradient py-20 md:py-28 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#c9a227] text-[#091d3e] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            輸入・通関実務担当者向け情報サービス
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            輸入規制・通関の公式情報を
            <br className="hidden md:block" />
            <span className="text-[#c9a227]">毎日チェック</span>、わかりやすく解説
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            財務省・税関・経済産業省・厚生労働省など
            <strong className="text-white"> {stats.watch_targets}サイト</strong>
            の最新情報を毎日自動収集。
            <br />
            変更点をAIが分析し、実務への影響をnoteで解説します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://note.com/prime_ixia2156"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#c9a227] text-[#091d3e] font-bold text-base rounded-full hover:bg-[#e4c76b] transition-colors shadow-lg"
            >
              noteマガジンを読む
            </a>
            <a
              href="#articles"
              className="px-8 py-4 bg-white/10 text-white font-semibold text-base rounded-full border border-white/30 hover:bg-white/20 transition-colors"
            >
              記事一覧を見る ↓
            </a>
          </div>
        </div>
      </section>

      {/* 実績・数字セクション */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-4xl font-extrabold text-[#0f2d5e]">
                {stats.total_articles}
                <span className="text-xl font-bold text-[#c9a227] ml-1">件</span>
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                公開済みnote記事
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-4xl font-extrabold text-[#0f2d5e]">
                {stats.watch_targets}
                <span className="text-xl font-bold text-[#c9a227] ml-1">サイト</span>
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                毎日監視する公式サイト
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-4xl font-extrabold text-[#0f2d5e]">
                {stats.ministries_count}
                <span className="text-xl font-bold text-[#c9a227] ml-1">省庁</span>
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                カバーする省庁・機関
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-4xl font-extrabold text-[#0f2d5e]">
                365
                <span className="text-xl font-bold text-[#c9a227] ml-1">日</span>
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                年間休まず自動収集
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 監視省庁タグ */}
      {stats.ministries.length > 0 && (
        <section className="py-10 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-base font-semibold text-gray-500 mb-5 uppercase tracking-widest">
              監視対象機関
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {stats.ministries.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1.5 bg-[#0f2d5e]/5 text-[#0f2d5e] text-sm font-medium rounded-full border border-[#0f2d5e]/10"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 特徴セクション */}
      <section className="py-16 px-4 bg-[#0f2d5e] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            なぜ ModuPort が選ばれるのか
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-bold text-lg mb-2 text-[#c9a227]">公式一次情報を直接収集</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                税関・経産省・厚労省など官公庁のウェブサイトから、更新情報を毎日自動収集。誤情報のリスクなし。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-bold text-lg mb-2 text-[#c9a227]">AIによる実務影響分析</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                収集した変更点をAIが分析し、「輸入実務に何がどう影響するか」を具体的に解説。見落とし防止に。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-bold text-lg mb-2 text-[#c9a227]">実務担当者目線の要約</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                法令改正・手続き変更・通達発出など、通関・輸入担当者が知るべき情報をコンパクトにまとめています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 記事一覧セクション */}
      <ArticleSection articles={articles} />

      {/* CTAセクション */}
      <section className="py-16 px-4 bg-[#091d3e] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            通関・輸入実務の情報収集を、もっとラクに
          </h2>
          <p className="text-blue-100 mb-8 text-base leading-relaxed">
            毎日の公式情報チェックをModuPortに任せてください。
            <br />
            noteをフォローすると、最新記事が届きます。
          </p>
          <a
            href="https://note.com/prime_ixia2156"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#c9a227] text-[#091d3e] font-bold text-lg rounded-full hover:bg-[#e4c76b] transition-colors shadow-lg"
          >
            noteをフォローする
          </a>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-[#060f1e] text-gray-400 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#c9a227] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-white font-semibold">ModuPort</span>
          </div>
          <p className="text-sm text-center md:text-right">
            輸入規制・通関情報の自動収集・解説サービス
            <br className="md:hidden" />
            <span className="mx-2 hidden md:inline">|</span>
            <a
              href="https://note.com/prime_ixia2156"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a227] hover:text-[#e4c76b] transition-colors"
            >
              note.com/prime_ixia2156
            </a>
          </p>
          <p className="text-xs text-gray-600">
            © 2026 ModuPort. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
