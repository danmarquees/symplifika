import { useState, useEffect, useCallback } from "react";

interface WebSocketHookOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
}

const useWebSocket = (options: WebSocketHookOptions) => {
  const { url, onMessage, onError, onOpen, onClose } = options;
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const sendMessage = useCallback(
    (message: any) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.warn("WebSocket not connected, message not sent.");
      }
    },
    [socket],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const wsUrl = `${url}?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = (event) => {
      console.log("WebSocket conectado!");
      onOpen?.(event);
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.onerror = (event) => {
      console.error("Erro no WebSocket:", event);
      onError?.(event);
    };

    ws.onclose = (event) => {
      console.log("WebSocket desconectado:", event);
      onClose?.(event);
    };

    setSocket(ws);
    return () => {
      ws.close();
    };
  }, [url, onMessage, onError, onOpen, onClose]);

  return { socket, sendMessage };
};

export default useWebSocket;
