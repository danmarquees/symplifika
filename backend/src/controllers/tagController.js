import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar tags" });
  }
};

// GET a single tag by ID
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });
    if (!tag) {
      return res.status(404).json({ msg: "Tag não encontrada" });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar tag" });
  }
};

// POST a new tag
export const createTag = async (req, res) => {
  try {
    const tag = await prisma.tag.create({
      data: req.body,
    });
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao criar tag" });
  }
};

// PUT (update) a tag by ID
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao atualizar tag" });
  }
};

// DELETE a tag by ID
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tag.delete({
      where: { id: parseInt(id) },
    });
    res.json({ msg: "Tag deletada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao deletar tag" });
  }
};
