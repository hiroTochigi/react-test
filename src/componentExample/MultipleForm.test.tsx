import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MultipleForm from "./MultipleForm";

describe("MultipleForm component", () => {
  test("renders input fields and displays full name", () => {
    render(<MultipleForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const fullNameDisplay = screen.getByText(/full name:/i);
    const submitButton = screen.getByText(/submit/i);

    // Check initial state
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(fullNameDisplay).toHaveTextContent("Full Name:");
    expect(submitButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Check updated state
    expect(fullNameDisplay).toHaveTextContent("Full Name: John Doe");
  });

  test("calls preventDefault on form submit", () => {
    render(<MultipleForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    const form = screen.getByTestId("form");
    const preventDefault = jest.fn();
    form.addEventListener("submit", (e) => (e.preventDefault = preventDefault));

    // The above code does the following:
    // 1. Creates a mock function using Jest to track calls to preventDefault.
    // 2. Adds an event listener to the form's submit event.
    // 3. When the form is submitted, the event listener sets the preventDefault method
    //    of the event (e) to the mock function preventDefault, allowing us to track
    //    whether preventDefault was called during the form submission.

    // Simulate form submission
    // Using fireEvent.submit(form) instead of fireEvent.click(submitButton)
    // because we want to directly trigger the form's submit event and ensure
    // that preventDefault is called on the form submission event.
    fireEvent.submit(form);

    // Check if preventDefault was called
    expect(preventDefault).toHaveBeenCalled();

    // Restore the original method
    // This is required to clean up the mock and restore the original implementation
    // of preventDefault, ensuring it does not affect other tests.
    preventDefault.mockRestore();
  });
});
