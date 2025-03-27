import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "symplifika_db",
  "symplifika_user",
  "91936798Dex;",
  {
    host: "localhost",
    dialect: "mysql",
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    process.exit(1);
  }
};

export default connectDB; // Exportação correta
