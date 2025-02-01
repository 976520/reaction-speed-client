class GameSocket {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  connect() {
    this.socket = new WebSocket("ws://localhost:8000/ws/game/");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const handler = this.messageHandlers.get(data.action);
      if (handler) {
        handler(data);
      }
    };
  }

  on(action: string, callback: (data: any) => void) {
    this.messageHandlers.set(action, callback);
  }

  send(message: object) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}

export const gameSocket = new GameSocket();
