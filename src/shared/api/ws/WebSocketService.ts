import { GameAction, SocketMessage } from "@/shared/types/socket";

import { EventEmitter } from "@/shared/lib/events/EventEmitter";

export class WebSocketService extends EventEmitter {
  private socket: WebSocket | null = null;
  private readonly url: string;
  private reconnectTimeout: number;
  private reconnectAttempts: number;
  private readonly maxReconnectAttempts: number;
  private isConnecting: boolean = false;

  constructor(
    url: string,
    options: {
      reconnectTimeout?: number;
      maxReconnectAttempts?: number;
    } = {}
  ) {
    super();
    this.url = url;
    this.reconnectTimeout = options.reconnectTimeout || 3000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectAttempts = 0;
  }

  async connect(): Promise<void> {
    if (this.isConnected() || this.isConnecting) return;

    try {
      this.isConnecting = true;
      this.socket = new WebSocket(this.url);
      this.setupSocketListeners();

      await new Promise<void>((resolve, reject) => {
        if (!this.socket) return reject(new Error("소켓이 초기화되지 않았습니다"));

        this.socket.onopen = () => resolve();
        this.socket.onerror = () => reject(new Error("연결에 실패했습니다"));
      });

      this.reconnectAttempts = 0;
    } catch (error) {
      this.handleError(error);
      throw error;
    } finally {
      this.isConnecting = false;
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
    this.emit("connected");
    this.reconnectAttempts = 0;
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data) as SocketMessage;
      this.emit(message.action, message);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    this.emit("error", error);
  }

  private handleClose(): void {
    this.emit("disconnected");
    this.attemptReconnect();
  }

  private async attemptReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit("reconnectFailed");
      return;
    }

    this.reconnectAttempts++;
    this.emit("reconnecting", this.reconnectAttempts);

    await new Promise((resolve) => setTimeout(resolve, this.reconnectTimeout));
    this.connect();
  }

  send(message: Partial<SocketMessage>): void {
    if (!this.isConnected()) {
      throw new Error("웹소켓이 연결되어 있지 않습니다");
    }
    this.socket?.send(JSON.stringify(message));
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.clear();
    }
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const gameSocket = new WebSocketService("ws://127.0.0.1:8000/ws/game/");
