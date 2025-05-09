import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllShortcuts = async (req, res) => {
  try {
    const shortcuts = await prisma.shortcut.findMany({
      where: { userId: req.userId },
    });
    res.json(shortcuts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar atalhos" });
  }
};

// GET a single shortcut by ID
export const getShortcutById = async (req, res) => {
  try {
    const { id } = req.params;
    const shortcut = await prisma.shortcut.findUnique({
      where: { id: parseInt(id), userId: req.userId }, // Only get shortcuts belonging to current user
    });
    if (!shortcut) {
      return res.status(404).json({ msg: "Atalho não encontrado" });
    }
    res.json(shortcut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar atalho" });
  }
};

export const createShortcut = async (req, res) => {
  try {
    const shortcut = await prisma.shortcut.create({
      data: { ...req.body, userId: req.userId },
    });
    res.status(201).json(shortcut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao criar atalho" });
  }
};

// PUT (update) a shortcut by ID
export const updateShortcut = async (req, res) => {
  try {
    const { id } = req.params;
    const shortcut = await prisma.shortcut.update({
      where: { id: parseInt(id), userId: req.userId },
      data: req.body,
    });
    res.json(shortcut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao atualizar atalho" });
  }
};

// DELETE a shortcut by ID
export const deleteShortcut = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.shortcut.delete({
      where: { id: parseInt(id), userId: req.userId }, // Only delete shortcuts belonging to current user
    });
    res.json({ msg: "Atalho deletado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao deletar atalho" });
  }
};
