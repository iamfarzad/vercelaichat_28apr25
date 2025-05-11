import { create } from 'zustand';

interface ChatStoreState {
  isOpen: boolean;
  initialQuery?: string;
  chatId?: string; // Added chatId
  openPopover: () => void;
  closePopover: () => void;
  togglePopover: () => void;
  setInitialQuery: (query: string) => void;
  setChatId: (chatId: string) => void; // Added setChatId
  clearInitialQuery: () => void; // Added clearInitialQuery
}

export const useChatStore = create<ChatStoreState>()((set) => ({
  isOpen: false,
  initialQuery: undefined,
  chatId: undefined, // Initialized chatId
  openPopover: () => set({ isOpen: true }),
  closePopover: () => set({ isOpen: false, initialQuery: undefined, chatId: undefined }), // Clear chatId on close
  togglePopover: () => set((state) => ({
    isOpen: !state.isOpen,
    initialQuery: !state.isOpen ? state.initialQuery : undefined,
    chatId: !state.isOpen ? state.chatId : undefined, // Clear chatId if closing
  })),
  setInitialQuery: (query) => set({
    initialQuery: query,
    isOpen: true,
    chatId: `chat_${Date.now()}` // Generate new chatId for new query context
  }),
  setChatId: (chatId) => set({ chatId }),
  clearInitialQuery: () => set({ initialQuery: undefined }),
}));