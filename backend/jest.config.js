/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.js"], // Padrão para encontrar arquivos de teste
  verbose: true,
  forceExit: true, // Forçar o Jest a sair após os testes
  clearMocks: true, // Limpar mocks entre os testes
};
