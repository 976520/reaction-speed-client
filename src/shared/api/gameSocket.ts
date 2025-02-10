import { GameAction, MessageHandler, SocketMessage } from "../types/socket";

class GameSocket {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<GameAction, MessageHandler> = new Map();
  private readonly WS_URL = "ws://127.0.0.1:8000/ws/game/" as const;
  private reconnectTimeout: number = 3000;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect(): void {
    try {
      this.socket = new WebSocket(this.WS_URL);
      this.setupSocketListeners();
    } catch (error) {
      this.handleError(error);
    }
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
  }

  private handleOpen(): void {
    console.log("웹소켓 연결됨");
    this.reconnectAttempts = 0;
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data) as SocketMessage;
      const handler = this.messageHandlers.get(data.action);
      if (handler) {
        handler(data);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    console.error("웹소켓 오류:", error);
  }

  private handleClose(): void {
    console.log("웹소켓 죽음");
    this.attemptReconnect();
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`재연결 중... ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
      setTimeout(() => this.connect(), this.reconnectTimeout);
    } else {
      console.error("포기할래");
    }
  }

  on<T extends SocketMessage>(action: T["action"], callback: (data: T) => void): void {
    this.messageHandlers.set(action, callback as MessageHandler);
  }

  send(message: Partial<SocketMessage>): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("웹소켓 연결 안됨");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.messageHandlers.clear();
    }
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const gameSocket = new GameSocket();
