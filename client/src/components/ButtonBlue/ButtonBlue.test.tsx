import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonBlue from "./ButtonBlue";

describe("ButtonBlue component", () => {
  const mockClickHandler = jest.fn();
  const text = "click me";
  const isDisabled = false;
  const isSubmit = false;

  test("renders button with correct attributes", () => {
    render(
      <ButtonBlue
        text={text}
        isDisabled={isDisabled}
        handleOnClick={mockClickHandler}
        isSubmit={isSubmit}
      />
    );

    const btn = screen.getByTestId("btn");

    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveAttribute("type", isSubmit ? "submit" : "button");
  });

  test("renders button with correct text", () => {
    render(
      <ButtonBlue
        text={text}
        isDisabled={isDisabled}
        handleOnClick={mockClickHandler}
        isSubmit={isSubmit}
      />
    );
    const btn = screen.getByText(text);
    expect(btn).toBeInTheDocument();
  });

  test("calls handleOnClick when clicked", () => {
    render(
      <ButtonBlue
        text={text}
        isDisabled={isDisabled}
        handleOnClick={mockClickHandler}
        isSubmit={isSubmit}
      />
    );

    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
