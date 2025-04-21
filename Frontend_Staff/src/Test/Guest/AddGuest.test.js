import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfileAndBooking from "@/pages/Process/GuestCreation";
import { api } from "@/lib/api";
import { useGuestStore } from "@/components/store/useGuestStore";

jest.mock("@/components/store/useGuestStore");

describe("AddGuest Component", () => {
  const mockFormData = {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    gender: "Male",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    nationality: "Croatia",
    idType: "Passport",
    idNumber: "123456789",
  };

  const mockOnSuccess = jest.fn();

  const mockRooms = [
    {
      id: 1,
      roomNumber: "C101",
      type: "Deluxe",
      price: 200,
      status: "available",
      size: 245,
      occupancy: 2,
      bedType: "King",
      amenities: [{ name: "WiFi" }],
    },
    {
      id: 2,
      roomNumber: "C102",
      type: "Standard",
      price: 150,
      status: "available",
      size: 200,
      occupancy: 2,
      bedType: "Queen",
      amenities: [{ name: "WiFi" }, { name: "TV" }],
    },
    {
      id: 3,
      roomNumber: "C103",
      type: "Suite",
      price: 300,
      status: "available",
      size: 300,
      occupancy: 4,
      bedType: "King",
      amenities: [{ name: "WiFi" }, { name: "TV" }, { name: "Mini Bar" }],
    },
  ];

  let axiosGetSpy;
  let addGuestSpy;

  beforeEach(() => {
    axiosGetSpy = jest
      .spyOn(api, "get")
      .mockResolvedValue({ data: { data: mockRooms } });

    addGuestSpy = jest.fn().mockResolvedValue({});
    useGuestStore.mockImplementation(() => ({
      addGuest: addGuestSpy,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1

  test("renders all form fields", () => {
    render(<UserProfileAndBooking onSuccess={mockOnSuccess} />);

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

  // Test 2

  test("validates date constraints", () => {
    render(<UserProfileAndBooking onSuccess={mockOnSuccess} />);

    userEvent.type(screen.getByLabelText("First Name"), "Mikias");
    userEvent.type(screen.getByLabelText("Last Name"), "Berhanu");
    userEvent.type(screen.getByLabelText("Date of Birth"), "1990-01-01");
    userEvent.selectOptions(screen.getByLabelText("Gender"), "Male");
    userEvent.type(screen.getByLabelText("Email"), "mikias@example.com");
    userEvent.type(screen.getByLabelText("Phone"), "+251912345678");
    userEvent.type(screen.getByLabelText("Address"), "123 Main St");
    userEvent.selectOptions(screen.getByLabelText("Nationality"), "Ethiopia");
    userEvent.selectOptions(
      screen.getByLabelText("Identification Type"),
      "Passport"
    );
    userEvent.type(screen.getByLabelText("Identification Number"), "A12345678");

    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-05-02" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-05-01" },
    });

    userEvent.click(screen.getByTestId("submit-button"));

    const checkInInput = screen.getByLabelText("Check-In Date");
    const checkOutInput = screen.getByLabelText("Check-Out Date");

    expect(checkInInput.min).toBe(new Date().toISOString().split("T")[0]);
    expect(checkOutInput.min).toBe(checkInInput.value);
  });

  // Test 3

  test("calls onSubmit with valid data", async () => {
    render(<UserProfileAndBooking onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Mikias" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Berhanu" },
    });
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: "1990-01-01" },
    });

    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "Male" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "mikias@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "+251912345678" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Identification Type"), {
      target: { value: "Passport" },
    });
    fireEvent.change(screen.getByLabelText("Identification Number"), {
      target: { value: "A12345678" },
    });
    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-05-02" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-05-05" },
    });

    fireEvent.change(screen.getByLabelText("Nationality"), {
      target: { value: "Ethiopia" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axiosGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-05-02&check_out=2025-05-05"
      );
    });
  });

  // Test 4
  test("transition to Room Selection and Submit form", async () => {
    render(<UserProfileAndBooking onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Mikias" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Berhanu" },
    });
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: "1990-01-01" },
    });

    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "Male" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "mikias@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "+251912345678" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Identification Type"), {
      target: { value: "Passport" },
    });
    fireEvent.change(screen.getByLabelText("Identification Number"), {
      target: { value: "A12345678" },
    });
    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-05-02" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-05-05" },
    });

    fireEvent.change(screen.getByLabelText("Nationality"), {
      target: { value: "Ethiopia" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axiosGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-05-02&check_out=2025-05-05"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("All Fields")).toBeInTheDocument();
      expect(screen.getByText("C101")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("select-radio-2"));
    fireEvent.click(screen.getByTestId("save-room-selection"));

    await waitFor(() => {
      expect(addGuestSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Mikias",
          lastName: "Berhanu",
          dob: "1990-01-01",
          gender: "Male",
          email: "mikias@example.com",
          phone: "+251912345678",
          address: "123 Main St",
          nationality: "Ethiopia",
          idType: "Passport",
          idNumber: "A12345678",
        }),
        expect.objectContaining({
          amenities: ["WiFi", "TV"],
          bedType: "Queen",
          id: 2,
          maxOccupancy: 2,
          price: 150,
          roomNumber: "C102",
          roomType: "Standard",
          status: "available",
          size: 200,
        }),
        expect.objectContaining({
          checkIn: "2025-05-02",
          checkOut: "2025-05-05",
        })
      );
    });
  });

  // Test 5

  test("displays error message on API failure", async () => {
    axiosGetSpy.mockRejectedValueOnce(new Error("API error"));

    render(<UserProfileAndBooking onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Mikias" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Berhanu" },
    });
    fireEvent.change(screen.getByLabelText("Date of Birth"), {
      target: { value: "1990-01-01" },
    });

    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "Male" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "mikias@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "+251912345678" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Identification Type"), {
      target: { value: "Passport" },
    });
    fireEvent.change(screen.getByLabelText("Identification Number"), {
      target: { value: "A12345678" },
    });
    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-05-02" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-05-05" },
    });

    fireEvent.change(screen.getByLabelText("Nationality"), {
      target: { value: "Ethiopia" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axiosGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-05-02&check_out=2025-05-05"
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Failed to load room")).toBeInTheDocument();
    });
  });
});
