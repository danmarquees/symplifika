console.log("Symplifika: Content script loaded!");

// Função para buscar atalhos do backend
async function fetchShortcuts() {
  try {
    const token = await new Promise((resolve) => {
      chrome.storage.sync.get(["token"], (result) => {
        resolve(result.token);
      });
    });

    if (!token) {
      console.warn("Symplifika: No token found. User not authenticated?");
      return [];
    }

    const response = await fetch("http://localhost:5000/api/shortcuts", {
      // Substitua pela URL correta da sua API
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Cache the shortcuts
    chrome.storage.sync.set({ shortcuts: data });
    return data;
  } catch (error) {
    console.error("Symplifika: Failed to fetch shortcuts:", error);
    return [];
  }
}

let shortcuts = [];

// Carregar atalhos ao carregar o script de conteúdo
(async () => {
  chrome.storage.sync.get(["shortcuts"], async (result) => {
    if (result.shortcuts) {
      shortcuts = result.shortcuts;
      console.log("Symplifika: Loaded shortcuts from storage:", shortcuts);
    } else {
      console.log("Symplifika: No shortcuts in storage. Fetching from API...");
      shortcuts = await fetchShortcuts();
      console.log("Symplifika: Loaded shortcuts from API:", shortcuts);
    }
  });
})();

// Função para expandir atalhos
async function expandShortcut(text) {
  if (!shortcuts || shortcuts.length === 0) {
    console.warn(
      "Symplifika: No shortcuts loaded. Fetching from storage and API...",
    );
    chrome.storage.sync.get(["shortcuts"], async (result) => {
      if (result.shortcuts) {
        shortcuts = result.shortcuts;
      } else {
        shortcuts = await fetchShortcuts();
      }
    });
    return text;
  }

  for (const shortcut of shortcuts) {
    const trigger = shortcut.trigger;
    if (text.endsWith(trigger)) {
      const expandedText = shortcut.content;
      const newText =
        text.slice(0, text.length - trigger.length) + expandedText;
      return newText;
    }
  }
  return text;
}

// Adicionar um listener para detectar atalhos
document.addEventListener("input", async (event) => {
  const target = event.target;

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    const originalText = target.value;
    const newText = await expandShortcut(originalText);

    if (newText !== originalText) {
      target.value = newText;
      target.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input event for React
    }
  }
});
