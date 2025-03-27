import { body, validationResult } from "express-validator";

// Middleware para validar a criação/atualização de atalhos
export const validateShortcut = [
  body("trigger").notEmpty().withMessage("O atalho é obrigatório"),
  body("content").notEmpty().withMessage("O conteúdo é obrigatório"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware para validar a criação/atualização de categorias
export const validateCategory = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware para validar a criação/atualização de tags
export const validateTag = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
