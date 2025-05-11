import { useChatStore } from './chatStore';
import { act } from 'react-dom/test-utils';

// Helper to get initial state for resetting
const getInitialState = () => ({
  isOpen: false,
  initialQuery: undefined,
  chatId: undefined,
});

describe('chatStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    act(() => {
      useChatStore.setState(getInitialState());
    });
  });

  describe('initial state', () => {
    it('should initialize with popover closed and no initial query or chat ID', () => {
      const { isOpen, initialQuery, chatId } = useChatStore.getState();
      expect(isOpen).toBe(false);
      expect(initialQuery).toBeUndefined();
      expect(chatId).toBeUndefined();
    });
  });

  describe('actions', () => {
    describe('openPopover', () => {
      it('should set isOpen to true', () => {
        act(() => {
          useChatStore.getState().openPopover();
        });
        expect(useChatStore.getState().isOpen).toBe(true);
      });
    });

    describe('closePopover', () => {
      it('should set isOpen to false and clear initialQuery and chatId', () => {
        // First, open and set some query/chatId
        act(() => {
          useChatStore.setState({ isOpen: true, initialQuery: 'test', chatId: 'chat123' });
        });
        act(() => {
          useChatStore.getState().closePopover();
        });
        const { isOpen, initialQuery, chatId } = useChatStore.getState();
        expect(isOpen).toBe(false);
        expect(initialQuery).toBeUndefined();
        expect(chatId).toBeUndefined();
      });
    });

    describe('togglePopover', () => {
      it('should toggle isOpen from false to true', () => {
        act(() => {
          useChatStore.getState().togglePopover();
        });
        expect(useChatStore.getState().isOpen).toBe(true);
      });

      it('should toggle isOpen from true to false and clear query/chatId', () => {
        act(() => {
          useChatStore.setState({ isOpen: true, initialQuery: 'test', chatId: 'chat123' });
        });
        act(() => {
          useChatStore.getState().togglePopover();
        });
        const { isOpen, initialQuery, chatId } = useChatStore.getState();
        expect(isOpen).toBe(false);
        expect(initialQuery).toBeUndefined();
        expect(chatId).toBeUndefined();
      });

      it('should retain query and chatId if opening via toggle', () => {
        act(() => {
          useChatStore.setState({ isOpen: false, initialQuery: 'persisted', chatId: 'persist123' });
        });
        act(() => {
          useChatStore.getState().togglePopover();
        });
        const { isOpen, initialQuery, chatId } = useChatStore.getState();
        expect(isOpen).toBe(true);
        expect(initialQuery).toBe('persisted');
        expect(chatId).toBe('persist123');
      });
    });

    describe('setInitialQuery', () => {
      it('should set initialQuery, open popover, and set a new chatId', () => {
        const testQuery = 'another query';
        act(() => {
          useChatStore.getState().setInitialQuery(testQuery);
        });
        const { isOpen, initialQuery, chatId } = useChatStore.getState();
        expect(isOpen).toBe(true);
        expect(initialQuery).toBe(testQuery);
        expect(chatId).toBeDefined();
        expect(chatId).toMatch(/^chat_\d+$/);
      });
    });

    describe('setChatId', () => {
      it('should set chatId', () => {
        const newChatId = 'customChatId123';
        act(() => {
          useChatStore.getState().setChatId(newChatId);
        });
        expect(useChatStore.getState().chatId).toBe(newChatId);
      });
    });

    describe('clearInitialQuery', () => {
      it('should clear initialQuery', () => {
        act(() => {
          useChatStore.setState({ initialQuery: 'some query' });
        });
        act(() => {
          useChatStore.getState().clearInitialQuery();
        });
        expect(useChatStore.getState().initialQuery).toBeUndefined();
      });
    });
  });
});