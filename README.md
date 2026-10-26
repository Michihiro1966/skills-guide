# skills-guide

Claude Code に入れたスキル（14種類）の一覧と使い方メモを、会話の横のサイドパネルに表示する mod です。
タブで「開発」「デザイン」「文書」「記憶・節約」「注意」を切り替えられます。

## インストール

Claude Code のプロンプトで:

```
/plugin install skills-guide --marketplace michihiro1966/skills-guide
```

ターミナル（シェル）から:

```
claude plugin install skills-guide --marketplace michihiro1966/skills-guide
```

マーケットプレイスの追加を聞かれたら `y`、インストール先はそのまま Enter（user）で進みます。

デスクトップアプリでは `/plugin` が使えないので、プロンプト欄の横の + → Plugins → Add marketplace で `michihiro1966/skills-guide` を追加し、Add plugin で入れてください。

## 使い方

- `/skills-guide` でパネルを開きます。閉じるには Esc か ctrl+x x です。
- `/skills-guide 3` や `/skills-guide 注意` のように付けると、そのタブで開きます。
- パネルの中では 1〜5 のキーでタブを切り替えられます。
- 「起動時に自動で開く」（キー a）を ON にすると、次のセッションから自動で開きます。デスクトップアプリと VS Code では最初から ON、ターミナルでは OFF です。

## 載っているスキル

superpowers / mattpocock-skills / ECC / anthropics skills（document-skills・example-skills） / ponytail / ui-ux-pro-max / gstack / caveman / agent-skills / claude-mem / humanizer / notebooklm / hyperframes / frontend-design

内容を変えたい時は `hooks/content.ts` を編集してください。
