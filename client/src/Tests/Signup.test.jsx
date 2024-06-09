import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import axios from 'axios';
import { toast } from 'react-toastify';
import userEvent from '@testing-library/user-event';

// Mock the api calls using jest functions
jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignupPage Component', () => {
  afterEach(cleanup);

  const validEmail = 'test@metrotrains.com.au';
  const password = 'Password1!';
  const invalidEmail = 'invalid@domain.com';

  afterEach(() => {
    // clear the mocks after each run
    jest.clearAllMocks();
  });

  // Test Case 1
  // Purpose: Verify that the signup function works correctly with valid credentials.
  test('Signup with valid credentials', async () => {
    // Define a mocked response for axios.post
    const mockedResponse = {
      data: {
        message: 'Signup successful',
      },
    };

    // Mock axios.post to resolve with the mocked response
    axios.post.mockResolvedValue(mockedResponse);

    // Render the SignupPage component within BrowserRouter
    await act(async () => {
      render(
        <BrowserRouter>
          <SignupPage />
        </BrowserRouter>
      );
    });

    // Act: Fill in the form and submit
    await act(async () => {
      userEvent.type(screen.getByTestId('email-input').querySelector('input'), validEmail);
      userEvent.type(screen.getByTestId('password-input').querySelector('input'), password);
      userEvent.type(screen.getByTestId('confirmPassword-input').querySelector('input'), password);

      // Use a more specific query to find the button
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    // Assert: Ensure axios.post was called with the correct URL and payload
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/users/register',
        { email: validEmail, password }
      );
    });

    // Ensure the success toast is shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Successfully Registered!!', expect.any(Object));
    });
  });

  // Test Case 2
  // Purpose: Verify that the signup function shows an error toast with invalid credentials.
  test('Signup with invalid credentials', async () => {
    // Render the SignupPage component within BrowserRouter
    await act(async () => {
      render(
        <BrowserRouter>
          <SignupPage />
        </BrowserRouter>
      );
    });

    // Act: Fill in the form with invalid email
    await act(async () => {
      userEvent.type(screen.getByTestId('email-input').querySelector('input'), invalidEmail);
      userEvent.type(screen.getByTestId('password-input').querySelector('input'), password);
      userEvent.type(screen.getByTestId('confirmPassword-input').querySelector('input'), password);

      // Use a more specific query to find the button
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    // Assert: Ensure error messages are shown
    expect(screen.getByText('Email address must be from the domain @metrotrains.com.au')).toBeInTheDocument();

    // Ensure axios.post was not called due to validation errors
    expect(axios.post).not.toHaveBeenCalled();
  });
});
