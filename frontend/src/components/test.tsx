import React from "react";

export const HTMLTest = () => {
  const htmlCode = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Symplifika Options</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Symplifika</h1>
            <p>Expanda seus textos de forma rápida e inteligente.</p>

            <div id="shortcuts-list">
                <!-- Aqui será exibida a lista de atalhos -->
            </div>

            <div id="options">
                <button id="open-dashboard">Configurações</button>
            </div>
        </div>
        <script src="popup.js"></script>
    </body>
    </html>
    `;

  return <div dangerouslySetInnerHTML={{ __html: htmlCode }}></div>;
};
