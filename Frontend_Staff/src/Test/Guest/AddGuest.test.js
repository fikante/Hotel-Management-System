import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddGuest from "@/pages/Guests/AddGuest";
import axios from "axios";

jest.mock("axios");
jest.mock(
  "@/components/Country/CountriesNames",
  () =>
    ({ value, onChange }) =>
      (
        <select
          data-testid="Nationality-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="United States">United States</option>
        </select>
      )
);

describe("AddGuest Component", () => {
  const mockFormData = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    idType: "",
    idNumber: "",
  };

  const mockSetFormData = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockSetBookingFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(
      <AddGuest
        formData={mockFormData}
        setFormData={mockSetFormData}
        onSubmit={mockOnSubmit}
        setBookingFormData={mockSetBookingFormData}
        bookingFormData={{ checkIn: "", checkOut: "" }}
      />
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Identification Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Identification Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Nationality")).toBeInTheDocument();
  });

  //   test('validates required fields on submit', async () => {
  //     render(
  //       <AddGuest
  //         formData={mockFormData}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '', checkOut: '' }}
  //       />
  //     );

  //     const submitButton = screen.getByText('Next');
  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText('First Name is required')).toBeInTheDocument();
  //       expect(screen.getByText('Last Name is required')).toBeInTheDocument();
  //       expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
  //       expect(screen.getByText('Gender is required')).toBeInTheDocument();
  //       expect(screen.getByText('Phone is required')).toBeInTheDocument();
  //       expect(screen.getByText('Address is required')).toBeInTheDocument();
  //       expect(screen.getByText('ID Type is required')).toBeInTheDocument();
  //       expect(screen.getByText('ID Number is required')).toBeInTheDocument();
  //       expect(screen.getByText('Check-In Date is required')).toBeInTheDocument();
  //       expect(screen.getByText('Check-Out Date is required')).toBeInTheDocument();
  //     });
  //   });

  //   test('validates email format', async () => {
  //     render(
  //       <AddGuest
  //         formData={{ ...mockFormData, email: 'invalid' }}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '', checkOut: '' }}
  //       />
  //     );

  //     const submitButton = screen.getByText('Next');
  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  //     });
  //   });

  //   test('validates phone number format', async () => {
  //     render(
  //       <AddGuest
  //         formData={{ ...mockFormData, phone: 'abc' }}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '', checkOut: '' }}
  //       />
  //     );

  //     const submitButton = screen.getByText('Next');
  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  //     });
  //   });

  //   test('validates date constraints', () => {
  //     render(
  //       <AddGuest
  //         formData={mockFormData}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '2023-01-01', checkOut: '2023-01-05' }}
  //       />
  //     );

  //     const checkInInput = screen.getByLabelText('Check-In Date');
  //     const checkOutInput = screen.getByLabelText('Check-Out Date');

  //     expect(checkInInput.min).toBe(new Date().toISOString().split('T')[0]);
  //     expect(checkOutInput.min).toBe('2023-01-01');
  //   });

  //   test('calls onSubmit with valid data', async () => {
  //     const validFormData = {
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       dob: '1990-01-01',
  //       gender: 'Male',
  //       email: 'john@example.com',
  //       phone: '+1234567890',
  //       address: '123 Main St',
  //       nationality: 'US',
  //       idType: 'Passport',
  //       idNumber: '123456789'
  //     };

  //     render(
  //       <AddGuest
  //         formData={validFormData}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '2023-01-01', checkOut: '2023-01-05' }}
  //       />
  //     );

  //     const submitButton = screen.getByText('Next');
  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(mockOnSubmit).toHaveBeenCalledWith(validFormData);
  //     });
  //   });

  //   test('updates form data on input change', () => {
  //     render(
  //       <AddGuest
  //         formData={mockFormData}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '', checkOut: '' }}
  //       />
  //     );

  //     const firstNameInput = screen.getByLabelText('First Name');
  //     fireEvent.change(firstNameInput, { target: { value: 'John', name: 'firstName' } });

  //     expect(mockSetFormData).toHaveBeenCalledWith({
  //       ...mockFormData,
  //       firstName: 'John'
  //     });
  //   });

  //   test('updates booking dates on change', () => {
  //     render(
  //       <AddGuest
  //         formData={mockFormData}
  //         setFormData={mockSetFormData}
  //         onSubmit={mockOnSubmit}
  //         setBookingFormData={mockSetBookingFormData}
  //         bookingFormData={{ checkIn: '', checkOut: '' }}
  //       />
  //     );

  //     const checkInInput = screen.getByLabelText('Check-In Date');
  //     fireEvent.change(checkInInput, { target: { value: '2023-01-01', name: 'checkIn' } });

  //     expect(mockSetBookingFormData).toHaveBeenCalledWith({
  //       checkIn: '2023-01-01',
  //       checkOut: ''
  //     });
  //   });
});
