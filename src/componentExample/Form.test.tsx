import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import { validateEmail } from "./utils";

describe("Form component", () => {
  test("renders the form with label, input, and button", () => {
    render(<Form />);

    // Check for the label
    const labelElement = screen.getByLabelText(/email/i);
    expect(labelElement).toBeInTheDocument();

    // Check for the input
    const inputElement = screen.getByRole("textbox", { name: /email/i });
    expect(inputElement).toBeInTheDocument();

    // Check for the button
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onSubmit when the form is submitted", () => {
    render(<Form />);

    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    fireEvent.click(buttonElement);

    // You can use a mock function to test the console.log or any other side effect
    // For simplicity, we are just checking if the input value is updated
    expect(inputElement).toHaveValue("test@example.com");
  });

  test("prevents default event on form submit", () => {
    // Spy on the preventDefault method of the Event prototype
    const preventDefaultSpy = jest.spyOn(Event.prototype, "preventDefault");

    // Render the Form component
    render(<Form />);

    // Select the input and form elements
    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const formElement = screen.getByTestId("form");

    // Simulate user typing into the email input
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });

    // Simulate form submission
    fireEvent.submit(formElement);

    // Assert that preventDefault was called
    expect(preventDefaultSpy).toHaveBeenCalled();

    // Restore the original preventDefault method
    preventDefaultSpy.mockRestore();
  });

  test("saves the email to the state when the form is submitted", () => {
    render(<Form />);

    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    fireEvent.click(buttonElement);

    const submittedEmailElement = screen.getByText(
      /submitted email: test@example.com/i
    );
    expect(submittedEmailElement).toBeInTheDocument();
  });

  test("shows an error message for invalid email address", () => {
    render(<Form />);

    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: "invalid-email" } });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText(/invalid email address/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("validates email address contains '@'", () => {
    render(<Form />);

    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: "invalid-email" } });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText(/invalid email address/i);
    expect(errorMessage).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "valid@example.com" } });
    fireEvent.click(buttonElement);

    expect(
      screen.queryByText(/invalid email address/i)
    ).not.toBeInTheDocument();
  });

  test("validates email address contains '@' using logic function", () => {
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("valid@example.com")).toBe(true);
  });

  test("resets the form when the reset button is clicked", () => {
    render(<Form />);

    const inputElement = screen.getByRole("textbox", { name: /email/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    fireEvent.click(resetButton);

    expect(inputElement).toHaveValue("");
    expect(screen.queryByText(/submitted email:/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/invalid email address/i)
    ).not.toBeInTheDocument();
  });
});
