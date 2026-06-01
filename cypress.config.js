const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Eventos do node (não precisamos para este projeto)
    },
    supportFile: false, // Desabilita arquivos extras para simplificar
  },
});