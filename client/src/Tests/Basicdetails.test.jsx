import { render, screen, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import BasicDetails from '../pages/BasicDetails';
import { checkEmpIdExists, checkEmailExists } from '../services/InstructorService';
import userEvent from '@testing-library/user-event';

// Mock the API calls using jest functions
jest.mock('../services/InstructorService', () => ({
  checkEmpIdExists: jest.fn(),
  checkEmailExists: jest.fn(),
}));
// Mock function for saveBasicDetails
const saveBasicDetailsMock = jest.fn();

describe('BasicDetails Component', () => {
  // Define valid basic details for the instructor
  const validBasicDetails = {
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    formalName: 'John Doe',
    gender: 'Male',
    contactNo: '1234567890',
    employeeID: 'E123',
    email: 'john.doe@metrotrains.com.au'
  };
// Clear all mocks and clean up the DOM after each test
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('renders BasicDetails component and fills in the form', async () => {
    // Test case to check if the BasicDetails component renders correctly and handles form input

    
    await act(async () => {
      render(<BasicDetails fetchedInstructorDetails={validBasicDetails} saveBasicDetails={saveBasicDetailsMock} />);
    });

    // Clear and fill in the form fields one by one and check the function call
    await act(async () => {
      const firstNameField = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameField, { target: { value: '' } });  // Clear the field
      userEvent.type(firstNameField, validBasicDetails.firstName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        firstName: validBasicDetails.firstName,
      }));
    });

    await act(async () => {
      const lastNameField = screen.getByLabelText(/last name/i);
      fireEvent.change(lastNameField, { target: { value: '' } });  // Clear the field
      userEvent.type(lastNameField, validBasicDetails.lastName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        lastName: validBasicDetails.lastName,
      }));
    });

    await act(async () => {
      const formalNameField = screen.getByLabelText(/formal name/i);
      fireEvent.change(formalNameField, { target: { value: '' } });  // Clear the field
      userEvent.type(formalNameField, validBasicDetails.formalName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        formalName: validBasicDetails.formalName,
      }));
    });

    await act(async () => {
      const contactNoField = screen.getByLabelText(/primary contact no/i);
      fireEvent.change(contactNoField, { target: { value: '' } });  // Clear the field
      userEvent.type(contactNoField, validBasicDetails.contactNo);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        contactNo: validBasicDetails.contactNo,
      }));
    });

    await act(async () => {
      const employeeIDField = screen.getByLabelText(/employee id/i);
      fireEvent.change(employeeIDField, { target: { value: '' } });  // Clear the field
      userEvent.type(employeeIDField, validBasicDetails.employeeID);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        employeeID: validBasicDetails.employeeID,
      }));
    });

    await act(async () => {
      const emailField = screen.getByLabelText(/primary email/i);
      fireEvent.change(emailField, { target: { value: '' } });  // Clear the field
      userEvent.type(emailField, validBasicDetails.email);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        email: validBasicDetails.email,
      }));
    });

    // Mock Employee ID check
    checkEmpIdExists.mockResolvedValue(true);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/employee id/i), { target: { value: 'E124' } });
    });
    await waitFor(() => {
      expect(checkEmpIdExists).toHaveBeenCalledWith('E124');
      expect(screen.getByText(/employee id already exists/i)).toBeInTheDocument();
    });

    // Mock Email check
    checkEmailExists.mockResolvedValue(true);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/primary email/i), { target: { value: 'jane.doe@metrotrains.com.au' } });
    });
    await waitFor(() => {
      expect(checkEmailExists).toHaveBeenCalledWith('jane.doe@metrotrains.com.au');
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });


  test('shows error message for duplicate employee ID', async () => {
    // Test case to check if the error message is shown for duplicate email
    checkEmpIdExists.mockResolvedValue(true);

    await act(async () => {
      render(<BasicDetails fetchedInstructorDetails={validBasicDetails} saveBasicDetails={saveBasicDetailsMock} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/employee id/i), { target: { value: 'E124' } });
    });

    await waitFor(() => {
      expect(checkEmpIdExists).toHaveBeenCalledWith('E124');
      expect(screen.getByText(/employee id already exists/i)).toBeInTheDocument();
    });
  });

  test('shows error message for duplicate email', async () => {
    checkEmailExists.mockResolvedValue(true);

    await act(async () => {
      render(<BasicDetails fetchedInstructorDetails={validBasicDetails} saveBasicDetails={saveBasicDetailsMock} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/primary email/i), { target: { value: 'jane.doe@metrotrains.com.au' } });
    });

    await waitFor(() => {
      expect(checkEmailExists).toHaveBeenCalledWith('jane.doe@metrotrains.com.au');
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });




});
