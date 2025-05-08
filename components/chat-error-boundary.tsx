'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import React from 'react';

interface ChatErrorBoundaryProps {
  error?: Error;
  retry?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function ChatErrorState({
  error,
  retry,
  className
}: ChatErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">
          {error?.message || 'Something went wrong'}
        </p>
        <p className="text-sm text-muted-foreground max-w-md">
          {error?.cause as string || 'There was an error loading the chat messages. Please try again.'}
        </p>
      </div>
      {retry && (
        <Button
          variant="outline"
          onClick={retry}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}

// Error boundary for chat UI
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ChatErrorBoundary extends React.Component<ChatErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ChatErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Optionally log error
  }

  handleRetry() {
    this.setState({ hasError: false, error: null });
    if (this.props.retry) this.props.retry();
  }

  render() {
    if (this.state.hasError) {
      return (
        <ChatErrorState
          error={this.state.error || undefined}
          retry={this.handleRetry}
          className={this.props.className}
        />
      );
    }
    return this.props.children;
  }
}
