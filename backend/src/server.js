import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import shortcutRoutes from "./routes/shortcutRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler.js";
import firebaseAuthRoutes from "./routes/firebaseAuthRoutes.js";
import { WebSocketServer } from "ws"; // Import WebSocketServer

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const csrfProtection = csrf({ cookie: true });

// Configurar CORS para permitir requisições do seu frontend
app.use(
  cors({
    origin: "http://localhost:3000",
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

// Rota para obter o token CSRF - REMOVA O MIDDLEWARE csrfProtection
app.get("/api/csrf-token", (req, res) => {
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
//app.use("/api/firebaseAuth", firebaseAuthRoutes);

// Usar as rotas de estatísticas
app.use("/api/stats", statsRoutes);

// Middleware de tratamento de erros global (DEVE SER O ÚLTIMO MIDDLEWARE)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando na porta ${PORT}`),
); // Inicia o servidor e guarda a instância

// --- WebSocket Setup ---
const wss = new WebSocketServer({ server }); // Conecta o WebSocketServer ao servidor HTTP

// Função para autenticar a conexão WebSocket
const authenticateWebSocket = (ws, req) => {
  // Extrair o token do header ou da query string
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    ws.close(4001, "Token ausente");
    return false;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      ws.close(4003, "Token inválido");
      return false;
    }
    ws.userId = user.id; // Store user ID
    return true;
  });
};

wss.on("connection", (ws, req) => {
  // Autenticar a conexão
  if (!authenticateWebSocket(ws, req)) {
    return;
  }

  console.log("Cliente WebSocket conectado!");

  ws.on("message", (message) => {
    console.log(`Recebido: ${message}`);
    ws.send(`Mensagem do servidor: ${message}`); // Echo back
  });

  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado!");
  });

  ws.on("error", (error) => {
    console.error("Erro no WebSocket:", error);
  });
});

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
