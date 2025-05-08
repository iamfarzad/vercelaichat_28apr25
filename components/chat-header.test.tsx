// components/chat-header.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatHeader } from "./chat-header";

describe("ChatHeader", () => {
  const baseProps = {
    chatId: "test-id",
    session: { user: { name: "Test" } } as any,
  };

  it("renders without crashing when onClear is missing", () => {
    render(<ChatHeader {...baseProps} />);
    expect(screen.getByTestId("chat-header")).toBeInTheDocument();
  });

  it("calls onClear when provided", () => {
    const onClear = jest.fn();
    render(<ChatHeader {...baseProps} onClear={onClear} />);
    fireEvent.click(screen.getByLabelText(/Chat options/i));
    // Try to click the clear chat menu item if present
    const clear = screen.queryByText(/Clear Chat/i);
    if (clear) fireEvent.click(clear);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("does not throw if onClear is a no-op", () => {
    render(<ChatHeader {...baseProps} onClear={() => {}} />);
    fireEvent.click(screen.getByLabelText(/Chat options/i));
    const clear = screen.queryByText(/Clear Chat/i);
    if (clear) fireEvent.click(clear);
    // No error expected
    expect(screen.getByTestId("chat-header")).toBeInTheDocument();
  });
});