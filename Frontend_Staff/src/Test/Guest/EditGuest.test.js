import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditGuest from "@/pages/Guests/EditGuest";
import { useGuestStore } from "@/components/store/useGuestStore";

jest.mock("axios");
jest.mock("@/components/store/useGuestStore");

describe("EditGuest Component", () => {
  const mockGuestData = {
    id: "1",
    firstName: "Mikias",
    lastName: "Berhanu",
    gender: "Male",
    email: "myk@example.com",
    phone: "+1234567890",
    nationality: "Ethiopia",
    idType: "Passport",
    idNumber: "123456789",
  };

  const mockOnSuccess = jest.fn();
  const mockEditGuest = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    jest.clearAllMocks();
    useGuestStore.mockImplementation(() => ({
      editGuest: mockEditGuest,
    }));
  });

  // Test 1

  test("renders with guest data pre-filled", () => {
    render(<EditGuest guestData={mockGuestData} onSuccess={mockOnSuccess} />);

    expect(screen.getByDisplayValue("Mikias")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Berhanu")).toBeInTheDocument();
    expect(screen.getByDisplayValue("myk@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+1234567890")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Passport")).toBeInTheDocument();
  });

  // Test 2
  test("validates required fields on submit", async () => {
    render(<EditGuest guestData={mockGuestData} onSuccess={mockOnSuccess} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "" } });

    const submitButton = screen.getByText("Update");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("First Name is required")).toBeInTheDocument();
    });
    expect(mockEditGuest).not.toHaveBeenCalled();
  });

  // Test 3

  test("validates email format", async () => {
    render(<EditGuest guestData={mockGuestData} onSuccess={mockOnSuccess} />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "x@example" } });

    const submitButton = screen.getByText("Update");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid Email")).toBeInTheDocument();
    });
    expect(mockEditGuest).not.toHaveBeenCalled();
  });

  // Test 4

  test("submits valid form data", async () => {
    render(<EditGuest guestData={mockGuestData} onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByText("Update");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockEditGuest).toHaveBeenCalledWith(
        {
          fname: "Mikias",
          lname: "Berhanu",
          gender: "Male",
          email: "myk@example.com",
          phone: "+1234567890",
          nationality: "Ethiopia",
          idType: "Passport",
          idNumber: "123456789",
          id: "1",
        },
        "1"
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
