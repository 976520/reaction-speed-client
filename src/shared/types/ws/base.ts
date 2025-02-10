export interface BaseSocketMessage {
  action: string;
}

export type MessageHandler = (data: any) => void;
