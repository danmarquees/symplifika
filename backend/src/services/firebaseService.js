// Desativando a inicialização e verificação do Firebase
export const verifyFirebaseToken = async (token) => {
  console.warn("Firebase authentication is disabled.");
  return null;
};
