import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonImg from "./ButtonImg";

describe("ButtonImg component", () => {
  const mockClickHandler = jest.fn();

  test("renders button with image", () => {
    render(<ButtonImg img="img" handleOnClick={mockClickHandler} />);

    const btn = screen.getByTestId("btn");
    const img = screen.getByTestId("img");

    expect(btn).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test("calls handleOnClick when clicked", () => {
    render(<ButtonImg img="img" handleOnClick={mockClickHandler} />);

    const btn = screen.getByTestId("btn");

    fireEvent.click(btn);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
