export interface ShortcutStats {
  totalShortcuts: number;
  mostUsedShortcut?: { trigger: string; usageCount: number };
  leastUsedShortcut?: { trigger: string; usageCount: number };
  averageUsage: number;
}
