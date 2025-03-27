import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import shortcutRoutes from "./routes/shortcutRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tagRoutes from "./routes/tagRoutes.js"; // Importe a rota de tags
import syncRoutes from "./routes/syncRoutes.js";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler.js";
import firebaseAuthRoutes from "./routes/firebaseAuthRoutes.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const csrfProtection = csrf({ cookie: true });

// Configurar CORS para permitir requisições do seu frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Substitua pela URL correta do seu frontend
    credentials: true,
  }),
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 requisições por janela
  message:
    "Muitas requisições da mesma origem, por favor tente novamente em 15 minutos",
  standardHeaders: true, // Retorna informações de RateLimit-* headers no header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Aplica o rate limiting a todas as rotas API
app.use("/api/", limiter);

// Usar as rotas de autenticação
app.use("/api/auth", authRoutes);

// Rota para obter o token CSRF
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Usar as rotas da OpenAI
app.use("/api/openai", openaiRoutes);

// Usar as rotas de atalhos
app.use("/api/shortcuts", csrfProtection, shortcutRoutes);

// Usar as rotas de categorias
app.use("/api/categories", csrfProtection, categoryRoutes);

// Use as rotas de tags
app.use("/api/tags", csrfProtection, tagRoutes);

// Use as rotas de sincronização
app.use("/api/sync", csrfProtection, syncRoutes);

// Usar a rota do Firebase
app.use("/api/firebaseAuth", firebaseAuthRoutes);

// Middleware de tratamento de erros global (DEVE SER O ÚLTIMO MIDDLEWARE)
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log("Conexão bem-sucedida! Usuários encontrados:", users);
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
