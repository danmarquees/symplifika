document.addEventListener("DOMContentLoaded", () => {
  const shortcutsList = document.getElementById("shortcuts-list");
  const openDashboardButton = document.getElementById("open-dashboard");

  // Função para carregar atalhos do storage
  async function loadShortcuts() {
    try {
      const token = await new Promise((resolve) => {
        chrome.storage.sync.get(["token"], (result) => {
          resolve(result.token);
        });
      });

      if (!token) {
        console.warn("Symplifika: No token found. User not authenticated?");
        shortcutsList.innerHTML = "<p>Você precisa fazer login.</p>";
        return;
      }

      const response = await fetch("http://localhost:5000/api/shortcuts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const shortcuts = await response.json();
      displayShortcuts(shortcuts);
    } catch (error) {
      console.error("Symplifika: Failed to fetch shortcuts:", error);
      shortcutsList.innerHTML = "<p>Falha ao carregar os atalhos.</p>";
    }
  }

  // Função para exibir os atalhos na interface
  function displayShortcuts(shortcuts) {
    shortcutsList.innerHTML = "";
    const ul = document.createElement("ul");
    shortcuts.forEach((shortcut) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${shortcut.trigger}</span>`;
      ul.appendChild(li);
    });
    shortcutsList.appendChild(ul);
  }

  // Evento para abrir o painel de configurações
  openDashboardButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:3000/settings" });
  });

  // Carregar atalhos ao abrir o popup
  loadShortcuts();
});
