import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { TabId } from '../types'
import { TABS } from './content'

const PANE = 'skills-guide'
const TITLE = 'スキル一覧'
const AUTO_OPEN_KEY = 'autoOpen'

const tab = atom({ plugin: 'skills-guide', key: 'tab' } as const, 'dev' as TabId, {
  shape: 'tab-1',
})
const autoOpen = atom({ plugin: 'skills-guide', key: 'autoOpen' } as const, false, {
  shape: 'auto-1',
})

// `/skills-guide 3`, `/skills-guide 文書` or `/skills-guide docs` jump to a tab.
const findTab = (arg: string): TabId | undefined => {
  const want = arg.trim()
  if (want === '') return undefined

  return TABS.find(t => t.hotkey === want || t.label === want || t.id === want)?.id
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'skills-guide',
      description: 'インストールしたスキルの一覧と使い方をサイドパネルに表示',
      argumentHint: '[1-5 | 開発 | デザイン | 文書 | 記憶・節約 | 注意]',
    })

    // The desktop app and VS Code seat a pane beside the chat; the terminal's
    // main screen puts it above the prompt, so there it waits to be asked
    // unless the person turned auto-open on.
    const stored = await $.store.get(AUTO_OPEN_KEY)
    const isOn =
      typeof stored === 'boolean' ? stored : e.surface === 'desktop' || e.surface === 'vscode'
    await update($, autoOpen, () => isOn)
    if (isOn && e.isInteractive) void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'skills-guide' }, async ($, e) => {
    const picked = findTab(e.args)
    if (picked) await update($, tab, () => picked)
    const { isPlaced } = await $.ui.open({ id: PANE, title: TITLE })

    return {
      text: isPlaced
        ? 'スキル一覧を開きました。閉じるには Esc か ctrl+x x です。'
        : 'この画面ではパネルを表示できません。',
    }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Markdown } = $.ui.resolve(e)
    const current = await read($, tab)
    const isAuto = await read($, autoOpen)
    const shown = TABS.find(t => t.id === current) ?? TABS[0]

    const toggleAuto = async () => {
      const after = await update($, autoOpen, was => !was)
      await $.store.set(AUTO_OPEN_KEY, after)
    }

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="row" flexWrap="wrap" columnGap={1}>
          {TABS.map(t => (
            <Button
              key={`tab-${t.id}`}
              hotkey={t.hotkey}
              variant={t.id === shown.id ? 'primary' : 'secondary'}
              onPress={() => update($, tab, () => t.id)}
            >
              {t.label}
            </Button>
          ))}
        </Box>
        <Markdown key={`body-${shown.id}`} text={shown.text} />
        <Box flexDirection="column">
          <Button key="auto-open" hotkey="a" plain onPress={toggleAuto}>
            起動時に自動で開く: {isAuto ? 'ON' : 'OFF'}
          </Button>
          <Text dimColor>/skills-guide でいつでも開けます</Text>
        </Box>
      </Box>
    )
  })
}
