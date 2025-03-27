import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"; // Import nodemailer

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register endpoint chamado:", { name, email, password }); // Adicionado

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ msg: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Usuário criado com sucesso:", user); // Adicionado

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("Token gerado:", token); // Adicionado

    res.json({ token, user: { id: user.id, name, email } });
  } catch (err) {
    console.error("Erro no registro:", err); // Adicionado
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Senha inválida" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user.id, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ msg: "Logout realizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Gerar token para redefinição de senha
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Tempo de expiração do token
    });

    // Atualizar o usuário com o token de redefinição
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(Date.now() + 3600000),
      }, // Token expira em 1 hora
    });

    // Enviar email com o link para redefinir a senha
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Substitua pela URL do seu frontend
    await sendResetPasswordEmail(user.email, resetLink);

    res.json({ msg: "Email de redefinição de senha enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao solicitar redefinição de senha" });
  }
};

async function sendResetPasswordEmail(email, resetLink) {
  // Configurar o transporte de email (exemplo com Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configurar o email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Redefinição de Senha - Symplifika",
    html: `<p>Clique <a href="${resetLink}">aqui</a> para redefinir sua senha.</p>
               <p>Este link expira em 1 hora.</p>`,
  };

  // Enviar o email
  await transporter.sendMail(mailOptions);
  console.log("Email de redefinição de senha enviado");
}

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() }, // Token não expirou
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token inválido ou expirado" });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar a senha do usuário e limpar os campos de redefinição
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.json({ msg: "Senha redefinida com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao redefinir a senha" });
  }
};
