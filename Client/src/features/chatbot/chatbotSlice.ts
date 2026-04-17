import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  ChatMessage,
  ChatState,
  SendMessageResponse,
  GetMessagesResponse,
} from "./chatTypes";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const sendMessage = createAsyncThunk<
  SendMessageResponse,
  string,
  { rejectValue: string }
>("chat/sendMessage", async (message, { rejectWithValue }) => {
  try {
    const res = await api.post("/chat/send", { message });
    return res.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to send message",
    );
  }
});

export const getMessages = createAsyncThunk<
  GetMessagesResponse,
  { limit: number; offset: number },
  { rejectValue: string }
>("chat/getMessages", async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/chat/messages?limit=${limit}&offset=${offset}`);
    return res.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to load messages",
    );
  }
});

export const searchMessages = createAsyncThunk<
  ChatMessage[],
  string,
  { rejectValue: string }
>("chat/searchMessages", async (query, { rejectWithValue }) => {
  try {
    const res = await api.get(`/chat/search?q=${encodeURIComponent(query)}`);
    return res.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to search messages",
    );
  }
});


const initialState: ChatState = {
  messages: [],
  loading: false,
  sending: false,
  error: null,
  hasMore: true,
  total: 0,
  searchResults: [],
  isSearching: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.isSearching = false;
    },
    // addMessageOptimistic: (state, action) => {
    //   state.messages.push(action.payload);
    // },
    streamBotMessage: (
      state,
      action: PayloadAction<{ id: number; char: string }>,
    ) => {
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) {
        msg.message += action.payload.char;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.total = action.payload.total;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load messages";
      })

      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.messages.push(action.payload.userMessage);
        state.messages.push({ ...action.payload.botMessage, message: "" }); //for streem bot message for typing effect
        state.total += 2;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload || "Failed to send message";
      })

      .addCase(searchMessages.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchMessages.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMessages.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload || "Failed to search messages";
      });
  },
});

export const {
  clearError,
  clearSearch,
  // addMessageOptimistic,
  streamBotMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
