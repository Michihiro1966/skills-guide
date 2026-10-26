import type { TabId } from '../types'

export type Tab = { id: TabId; label: string; hotkey: string; text: string }

// Plugin skills are spelled /<plugin>:<skill>, which always resolves even
// where two plugins share a skill name. gstack is a folder under
// ~/.claude/skills, not a plugin, so its commands carry no prefix.
export const TABS: [Tab, ...Tab[]] = [
  {
    id: 'dev',
    label: '開発',
    hotkey: '1',
    text: `### superpowers
アイデア→計画→実装→確認の進め方
- \`/superpowers:brainstorming\` 作る前にアイデアを詰める
- \`/superpowers:writing-plans\` 実装計画を書く
- \`/superpowers:systematic-debugging\` バグの原因を順に探す

### gstack
- \`/office-hours\` アイデアの壁打ち
- \`/autoplan\` 計画を自動で作る
- \`/review\` コードレビュー
- \`/qa <URL>\` 画面を実際に操作してテスト
- \`/ship\` テスト→コミット→PR作成
- \`/cso\` セキュリティ点検

### ECC
大型パッケージ（スキル約300・コマンド約100）
- \`/ecc:ecc-guide\` ECCの使い方案内
- \`/ecc:plan\` 計画
- \`/ecc:code-review\` コードレビュー

### agent-skills
- \`/agent-skills:interview-me\` 要件を一問ずつ聞き出す
- \`/agent-skills:spec-driven-development\` 仕様から作る
- \`/agent-skills:code-review-and-quality\` マージ前の点検

### mattpocock-skills
- 最初に一度 \`/mattpocock-skills:setup-matt-pocock-skills\`
- \`/mattpocock-skills:grill-me\` 計画を質問攻めで固める
- \`/mattpocock-skills:tdd\` テスト駆動開発

### ponytail
最小限のコードで済ませる
- \`/ponytail:ponytail-review\` 変更をレビュー
- \`/ponytail:ponytail-audit\` リポジトリ全体を点検`,
  },
  {
    id: 'design',
    label: 'デザイン',
    hotkey: '2',
    text: `### frontend-design
「〜の画面を作って」と頼むと自動で使われます。

### ui-ux-pro-max
配色・フォント・レイアウトのデータベース
- \`/ui-ux-pro-max:ui-ux-pro-max\` UIを設計・見直す
- \`/ui-ux-pro-max:design-system\` デザインの決まりごとを作る
- \`/ui-ux-pro-max:slides\` スライドのデザイン

### hyperframes
HTMLで動画を作る（HeyGen）
- \`/hyperframes:hyperframes\` 「〜の動画を作って」`,
  },
  {
    id: 'docs',
    label: '文書',
    hotkey: '3',
    text: `### document-skills
Word・Excel・PowerPoint・PDF を作る・読む
- 「このPDFを要約して」「表をExcelにして」と頼むだけで使われます

### example-skills
- \`/example-skills:canvas-design\` ポスターや図版
- \`/example-skills:doc-coauthoring\` 文書を一緒に書く
- \`/example-skills:skill-creator\` 自分用のスキルを作る

### humanizer
AIっぽい文章を自然に直す（英文向け）
- \`/humanizer:humanizer\` のあとに文章を貼る

### notebooklm
Google NotebookLM に質問する
- 「このノートブックに〜を聞いて: <リンク>」
- 初回は Google へのログインを求められます`,
  },
  {
    id: 'memory',
    label: '記憶・節約',
    hotkey: '4',
    text: `### claude-mem
会話を自動で記録し、次のセッションで思い出す
- \`/claude-mem:mem-search\` 過去の作業を探す
- 止める: \`claude plugin disable claude-mem@thedotmack\`

### caveman
返答を極端に短くしてトークンを節約
- \`/caveman\` 短文モードを始める
- 「stop caveman」で元に戻る
- 外す: \`claude plugin disable caveman@caveman\``,
  },
  {
    id: 'notes',
    label: '注意',
    hotkey: '5',
    text: `### 患者情報を扱う時
claude-mem は会話をMacに保存し続けます。作業前に止めてください。
\`claude plugin disable claude-mem@thedotmack\`
再開は \`disable\` を \`enable\` に変えるだけです。

### 返答の文体が変わる
caveman・ponytail・humanizer は書き方を変えます。返答がおかしい時はこの3つを疑ってください。

### 重い時は
ECC・gstack・superpowers は役割が重なっています。どれかを止めると軽くなります。

### 使い方のコツ
- \`/\` のあとに名前の一部を打つと候補が出ます
- 多くのスキルは、日本語で頼むだけで自動で使われます
- 一覧: \`claude plugin list\``,
  },
]
