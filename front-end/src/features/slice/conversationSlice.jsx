// conversationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedConversation: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      console.log("sssssssssss", action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      // console.log("messaddddddd", action.payload);
    },

  },
});

export const { setSelectedConversation, setMessages,  } = conversationSlice.actions;
export default conversationSlice.reducer;


