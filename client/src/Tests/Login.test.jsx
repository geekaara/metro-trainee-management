import { render, screen, cleanup, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import axios from "axios";
import { toast } from 'react-toastify';

// Mock the api calls using jest functions
jest.mock("axios", () => ({
  post: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));

describe("LoginPage Component", () => {
  afterEach(cleanup);

  const validEmail = "test@metrotrains.com.au";
  const invalidEmail = "invalidemail";
  const password = "password123";

  afterEach(() => {
    // clear the mocks after each run
    jest.clearAllMocks();
  });



  // Test Case 1
  // Purpose: Verify that an error message is shown for invalid email.
  test("Show error message for invalid email", async () => {
    // Render the LoginPage component within BrowserRouter
    await act(async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });
  await act(async () => {
    // Act: Fill in the form with invalid email and submit
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: invalidEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });
    // Assert: Check for the error message
    const errorMessage = await screen.findByText(/email address is invalid/i);
    expect(errorMessage).toBeInTheDocument();
  });


});
