const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log do erro para o console do servidor

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Use o status code existente ou 500 por padrão

  res.status(statusCode).json({
    msg: "Erro no servidor",
    error: err.message, // Mensagem de erro
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Exibir stack trace apenas em desenvolvimento
  });
};

export default errorHandler;
