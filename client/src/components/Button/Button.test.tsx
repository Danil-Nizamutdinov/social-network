import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button component", () => {
  const mockClickHandler = jest.fn();
  const buttonText = "click me";

  test("calls handleOnClick when clicked", () => {
    render(
      <Button
        text={buttonText}
        handleOnClick={mockClickHandler}
        isSubmit={false}
      />
    );

    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
  test("renders button with correct text", () => {
    render(
      <Button
        text={buttonText}
        handleOnClick={mockClickHandler}
        isSubmit={false}
      />
    );
    const btn = screen.getByText(buttonText);
    expect(btn).toBeInTheDocument();
  });
  test("has type 'button' when isSubmit is false", () => {
    render(
      <Button
        text={buttonText}
        handleOnClick={mockClickHandler}
        isSubmit={false}
      />
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveAttribute("type", "button");
  });

  test("has type 'submit' when isSubmit is true", () => {
    render(
      <Button text={buttonText} handleOnClick={mockClickHandler} isSubmit />
    );

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveAttribute("type", "submit");
  });
});
