import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStats = async (req, res) => {
  try {
    const userId = req.userId;

    // Obter todos os atalhos do usuário
    const shortcuts = await prisma.shortcut.findMany({
      where: { userId: userId },
    });

    const totalShortcuts = shortcuts.length;

    // Ordenar atalhos por contagem de uso (do mais usado para o menos usado)
    const sortedShortcuts = [...shortcuts].sort(
      (a, b) => (b.usageCount || 0) - (a.usageCount || 0),
    );

    // Atalho mais usado
    const mostUsedShortcut =
      sortedShortcuts.length > 0
        ? {
            trigger: sortedShortcuts[0].trigger,
            usageCount: sortedShortcuts[0].usageCount || 0,
          }
        : null;

    // Atalho menos usado
    const leastUsedShortcut =
      sortedShortcuts.length > 0
        ? {
            trigger: sortedShortcuts[sortedShortcuts.length - 1].trigger,
            usageCount:
              sortedShortcuts[sortedShortcuts.length - 1].usageCount || 0,
          }
        : null;

    const totalUsage = shortcuts.reduce(
      (sum, shortcut) => sum + (shortcut.usageCount || 0),
      0,
    );
    const averageUsage = totalShortcuts > 0 ? totalUsage / totalShortcuts : 0;

    res.json({
      totalShortcuts,
      mostUsedShortcut,
      leastUsedShortcut,
      averageUsage,
    });
  } catch (error) {
    console.error("Erro ao obter as estatísticas:", error);
    res.status(500).json({ message: "Erro ao obter as estatísticas" });
  }
};
