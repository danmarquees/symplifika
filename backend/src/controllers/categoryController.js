import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar categorias" });
  }
};

// GET a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({ msg: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar categoria" });
  }
};

// POST a new category
export const createCategory = async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao criar categoria" });
  }
};

// PUT (update) a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao atualizar categoria" });
  }
};

// DELETE a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ msg: "Categoria deletada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao deletar categoria" });
  }
};
