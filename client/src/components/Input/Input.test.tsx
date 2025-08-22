import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input component", () => {
  const mockKeyDown = jest.fn();
  const mockSetValue = jest.fn();
  const value = "";
  const placeholder = "text";
  const type = "text";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with correct attributes", () => {
    render(
      <Input
        value={value}
        setValue={mockSetValue}
        placeholder={placeholder}
        type={type}
      />
    );

    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", type);
    expect(input).toHaveValue("");
  });

  test("calls setValue on change", () => {
    render(
      <Input
        value={value}
        setValue={mockSetValue}
        placeholder={placeholder}
        type={type}
      />
    );

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "123" } });

    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith("123");
  });

  test("handles keyDown events", () => {
    render(
      <Input
        value={value}
        setValue={mockSetValue}
        placeholder={placeholder}
        type={type}
        onKeyDown={mockKeyDown}
      />
    );

    const input = screen.getByTestId("input");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockKeyDown).toHaveBeenCalledTimes(1);
  });
});
