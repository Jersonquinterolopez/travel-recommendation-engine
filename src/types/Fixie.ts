export interface Turn {
  id: string;
  timestamp: string;
  role: string;
  messages: Message[];
  generationParams: any;
  state: string;
  inReplyToId?: string;
}

export interface Message {
  kind: string;
  content: string;
}

export interface Content {
  id: string;
  turns: Turn[];
}
