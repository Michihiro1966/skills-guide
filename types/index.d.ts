export type TabId = 'dev' | 'design' | 'docs' | 'memory' | 'notes'

declare module 'claude-code' {
  interface PluginState {
    'skills-guide': { tab: Shaped<TabId>; autoOpen: Shaped<boolean> }
  }
}
