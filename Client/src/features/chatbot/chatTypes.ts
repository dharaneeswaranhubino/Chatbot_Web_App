export interface ChatMessage {
  id: number;
  userId: number;
  sender: "user" | "bot";
  message: string;
  createdAt: string;
  // updatedAt: string;   //infuture I will add the edit message option like chatGpt
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  sending: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  searchResults: ChatMessage[];
  isSearching: boolean;
}

export interface SendMessageResponse {
  userMessage: ChatMessage;
  botMessage: ChatMessage;
}

export interface GetMessagesResponse {
  messages: ChatMessage[];
  total: number;
  hasMore: boolean;
}