// Minimal placeholder test for components/chat-popover.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { ChatPopover } from './chat-popover';

const mockSession = {} as any;
const mockModel = {} as any;

describe('ChatPopover', () => {
  it('should render without crashing', () => {
    render(
      <ChatPopover
        open={false}
        onClose={() => {}}
        id="test"
        selectedChatModel={mockModel}
        session={mockSession}
      />
    );
  });
});