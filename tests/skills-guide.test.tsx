import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const PANE = {
  plugin: 'skills-guide',
  component: 'Pane',
  requestId: 'skills-guide',
  props: {
    title: 'スキル一覧',
    isFocused: false,
    bodyColumns: 40,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

const engine = (on: On, opened: string[]) => {
  mock.store(on)
  on('command.register', () => ({ value: { command: 'skills-guide' } }))
  on('ui.open', (_, e) => {
    opened.push(e.id)
    return { value: { isPlaced: true } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))
}

test('the desktop app opens the pane on its own; the terminal waits', async ($, on) => {
  const opened: string[] = []
  engine(on, opened)

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  expect(opened.length).toBe(0)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  expect(opened).toEqual(['skills-guide'])
})

test('every tab draws on every surface', async ($, on) => {
  engine(on, [])
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    for (const key of ['tab-dev', 'tab-design', 'tab-docs', 'tab-memory', 'tab-notes']) {
      await ui.press({ key })
      expect(await ui.find({ type: 'Markdown', key: `body-${key.slice(4)}` })).toBeTruthy()
    }
    await ui.unmount()
  }
})

test('the command jumps to the tab it names', async ($, on) => {
  engine(on, [])
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const ran = await $.command.run({
    command: 'skills-guide',
    args: '注意',
    origin: { kind: 'composer' },
    presentation: { isFullscreen: false, columns: 100 },
  })
  expect(ran.text).toContain('開きました')

  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect(await ui.find({ type: 'Markdown', key: 'body-notes' })).toBeTruthy()
  await ui.unmount()
})

test('the auto-open switch is kept for the next session', async ($, on) => {
  const opened: string[] = []
  engine(on, opened)
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  await ui.press({ key: 'auto-open' })
  expect((await ui.find({ type: 'Button', key: 'auto-open' }))?.text).toContain('ON')
  await ui.unmount()

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  expect(opened).toEqual(['skills-guide'])
})
