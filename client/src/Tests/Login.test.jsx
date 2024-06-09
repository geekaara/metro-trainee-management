import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
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
  // Purpose: Verify that the login function works correctly with valid credentials.
  test("Login with valid credentials", async () => {
    // Define a mocked response for axios.post
    const mockedResponse = {
      data: {
        message: "Login successful",
      },
    };

    // Mock axios.post to resolve with the mocked response
    axios.post.mockResolvedValue(mockedResponse);

    // Render the LoginPage component within BrowserRouter
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Act: Fill in the form and submit
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });

    // Use a more specific query to find the button
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert: Ensure axios.post was called with the correct URL and payload
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/users/login',
      { email: validEmail, password }
    ));

    // Ensure the success toast is shown
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Logged in successfully!", expect.any(Object)));
  });

  // Test Case 2
  // Purpose: Verify that an error message is shown for invalid email.
  test("Show error message for invalid email", async () => {
    // Render the LoginPage component within BrowserRouter
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Act: Fill in the form with invalid email and submit
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: invalidEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert: Check for the error message
    const errorMessage = await screen.findByText(/email address is invalid/i);
    expect(errorMessage).toBeInTheDocument();
  });


});
