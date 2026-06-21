"use client";

import { useState } from "react";

interface Article {
  id: number;
  title: string;
  note_url: string;
  created_at: string;
  period_start: string;
  period_end: string;
  category: string;
}

const CATEGORIES = ["すべて", "税関", "食品", "経産省", "環境省", "財務省", "その他"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  税関: "bg-blue-100 text-blue-800",
  食品: "bg-green-100 text-green-800",
  経産省: "bg-orange-100 text-orange-800",
  環境省: "bg-teal-100 text-teal-800",
  財務省: "bg-purple-100 text-purple-800",
  その他: "bg-gray-100 text-gray-700",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function stripPeriodTag(title: string): string {
  return title.replace(/^[\d年月【[^\]]*】\s*/, "").replace(/^[\d年月]+\s*/, "");
}

export default function ArticleSection({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("すべて");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "すべて"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const INITIAL_COUNT = 12;
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section id="articles" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f2d5e] mb-3">
            最新記事一覧
          </h2>
          <p className="text-gray-600">
            公開済みnote記事 {articles.length} 件 ／ 随時更新
          </p>
        </div>

        {/* カテゴリタブ */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "すべて"
                ? articles.length
                : articles.filter((a) => a.category === cat).length;
            if (count === 0 && cat !== "すべて") return null;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0f2d5e] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#0f2d5e] hover:text-[#0f2d5e]"
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 text-xs font-bold ${
                    activeCategory === cat ? "text-[#c9a227]" : "text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 記事グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((article) => (
            <a
              key={article.id}
              href={article.note_url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                    CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS["その他"]
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                  {article.created_at}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 leading-relaxed group-hover:text-[#0f2d5e] transition-colors flex-1 line-clamp-4">
                {article.title}
              </h3>
              <div className="mt-3 flex items-center text-xs font-medium text-[#c9a227]">
                <span>noteで読む</span>
                <svg
                  className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* もっと見るボタン */}
        {!showAll && filtered.length > INITIAL_COUNT && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-[#0f2d5e] text-white font-semibold rounded-full hover:bg-[#1a4080] transition-colors shadow-md cursor-pointer"
            >
              残り {filtered.length - INITIAL_COUNT} 件をすべて表示
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            該当する記事がありません
          </div>
        )}
      </div>
    </section>
  );
}
