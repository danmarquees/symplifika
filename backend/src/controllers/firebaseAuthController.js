import { verifyFirebaseToken } from "../services/firebaseService.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const firebaseLogin = async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    const decodedToken = await verifyFirebaseToken(firebaseToken);

    // Check if user exists in your database, create if not
    let user = await prisma.user.findUnique({
      where: { email: decodedToken.email },
    });

    if (!user) {
      // Create a new user in your database (example)
      user = await prisma.user.create({
        data: {
          email: decodedToken.email,
          name: decodedToken.name || decodedToken.email.split("@")[0], // Or prompt the user for a name
          // You might want to generate a random password or leave it null
          password: "", // Set an initial password (optional)
        },
      });
    }

    // Generate a JWT for your application
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Erro ao autenticar com Firebase:", error);
    res
      .status(401)
      .json({ message: "Autenticação falhou", error: error.message });
  }
};
