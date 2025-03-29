import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller para sincronizar dados
export const syncData = async (req, res) => {
  try {
    const { shortcuts, categories, lastSyncedAt } = req.body;
    const userId = req.userId;

    // Implementar a lógica para criar/atualizar atalhos
    for (const shortcutData of shortcuts) {
      const { id, ...rest } = shortcutData;

      if (id) {
        // Atualizar atalho existente
        await prisma.shortcut.update({
          where: { id: parseInt(id) },
          data: { ...rest, userId: req.userId },
        });
      } else {
        // Criar novo atalho
        await prisma.shortcut.create({
          data: { ...rest, userId: req.userId },
        });
      }
    }

    // Implementar a lógica para criar/atualizar categorias
    for (const categoryData of categories) {
      const { id, ...rest } = categoryData;

      if (id) {
        // Atualizar categoria existente
        await prisma.category.update({
          where: { id: parseInt(id) },
          data: rest,
        });
      } else {
        // Criar nova categoria
        await prisma.category.create({
          data: rest,
        });
      }
    }

    // Atualiza a data da última sincronização
    await prisma.userSync.upsert({
      where: { userId: req.userId },
      update: { lastSyncedAt: new Date(lastSyncedAt) },
      create: { userId: req.userId, lastSyncedAt: new Date(lastSyncedAt) },
    });

    // Lógica de sucesso
    res.json({ message: "Sincronização concluída com sucesso" });
  } catch (error) {
    console.error("Erro na sincronização:", error);
    res.status(500).json({ message: "Erro ao sincronizar os dados" });
  }
};

// Controller para obter a última data de sincronização
export const getLastSync = async (req, res) => {
  try {
    const userSync = await prisma.userSync.findUnique({
      where: { userId: req.userId },
    });
    const lastSyncedAt = userSync ? userSync.lastSyncedAt : null;
    res.json({ lastSyncedAt });
  } catch (error) {
    console.error("Erro ao obter a última data de sincronização:", error);
    res.status(500).json({ message: "Erro ao obter a data" });
  }
};
