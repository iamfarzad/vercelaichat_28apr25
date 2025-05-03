// Minimal placeholder test for components/app-sidebar.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { AppSidebar } from './app-sidebar';

const mockUser = {} as any;

describe('AppSidebar', () => {
  it('should render without crashing', () => {
    render(<AppSidebar user={mockUser} />);
  });
});