class GameSocket {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  connect() {
    try {
      this.socket = new WebSocket("ws://127.0.0.1:8000/ws/game/");

      this.socket.onopen = () => {
        console.log("웹소켓 연결");
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const handler = this.messageHandlers.get(data.action);
        if (handler) {
          handler(data);
        }
      };

      this.socket.onerror = (error) => {
        console.error("웹소켓 이슈", error);
      };

      this.socket.onclose = () => {
        console.log("웹소켓 사망");
        setTimeout(() => this.connect(), 3000);
      };
    } catch (error) {
      console.error("웹소켓 이슈.. 일걸", error);
    }
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
