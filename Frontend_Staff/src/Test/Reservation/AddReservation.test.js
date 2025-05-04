import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectGuestAndBooking from "@/pages/Process/ReservationCreation";
import { useReservationStore } from "@/components/store/useReservationStore";
import { api } from "@/lib/api";

jest.mock("@/components/store/useReservationStore");

describe("ReservationCreation", () => {
  const mockOnSuccess = jest.fn();
  const mockGuests = [
    {
      id: "101",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      nationality: "American",
      identificationType: "Passport",
      idNumber: "A1234567",
      address: "123 Main St, Cityville",
      gender: "Male",
      dob: "1990-01-01",
    },
    {
      id: "102",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 555 678 123",
      gender: "Female",
      address: "789 Oak St, TX",
      nationality: "British",
      identificationType: "Driver License",
      idNumber: "C56789012",
      dob: "1995-03-03",
    },
  ];
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

  let apiGetSpy;
  let addReservationSpy;

  beforeEach(() => {
    apiGetSpy = jest.spyOn(api, "get").mockImplementation((url) => {
      if (url.includes("/guests")) {
        return Promise.resolve({ data: { data: mockGuests } });
      }
      if (url.includes("/availablerooms")) {
        return Promise.resolve({ data: { data: mockRooms } });
      }
      return Promise.reject(new Error("Unexpected URL"));
    });

    addReservationSpy = jest.fn().mockResolvedValue({});
    useReservationStore.mockImplementation(() => ({
      addReservation: addReservationSpy,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the guest selection", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
      expect(screen.getByText("All Fields")).toBeInTheDocument();
      expect(screen.getByText("British")).toBeInTheDocument();
      expect(screen.getByText("American")).toBeInTheDocument();
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });
  });

  test("transitions to room selection after valid guest selection", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
      expect(screen.getByText("All Fields")).toBeInTheDocument();
      expect(screen.getByText("British")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-04-21" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-04-25" },
    });

    fireEvent.click(screen.getByTestId("select-radio-102"));
    fireEvent.click(screen.getByTestId("next-button"));

    // /hotels/1/availablerooms?check_in=${bookingFormData.checkIn}&check_out=${bookingFormData.checkOut}
    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-04-21&check_out=2025-04-25"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("C101")).toBeInTheDocument();
      expect(screen.getByText("C102")).toBeInTheDocument();
      expect(screen.getByText("C103")).toBeInTheDocument();
    });
  });

  test("handle room selection and Submit", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
      expect(screen.getByText("All Fields")).toBeInTheDocument();
      expect(screen.getByText("British")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-04-21" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-04-25" },
    });

    fireEvent.click(screen.getByTestId("select-radio-102"));
    fireEvent.click(screen.getByTestId("next-button"));

    // /hotels/1/availablerooms?check_in=${bookingFormData.checkIn}&check_out=${bookingFormData.checkOut}
    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-04-21&check_out=2025-04-25"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("C101")).toBeInTheDocument();
      expect(screen.getByText("C102")).toBeInTheDocument();
      expect(screen.getByText("C103")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("select-radio-2"));

    fireEvent.click(screen.getByTestId("save-room-selection"));

    await waitFor(() => {
      expect(addReservationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          address: "789 Oak St, TX",
          email: "alice.johnson@example.com",
          firstName: "Alice",
          gender: "Female",
          id: "102",
          idNumber: "C56789012",
          idType: "Driver License",
          lastName: "Johnson",
          nationality: "British",
          phone: "+1 555 678 123",
        }),
        expect.objectContaining({
          amenities: ["WiFi", "TV"],
          bedType: "Queen",
          id: 2,
          maxOccupancy: 2,
          price: 150,
          roomNumber: "C102",
          roomType: "Standard",
          size: 200,
          status: "available",
        }),
        expect.objectContaining({
          checkIn: "2025-04-21",
          checkOut: "2025-04-25",
        })
      );
    });
  });

  test("validates required fields", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("next-button"));
    await waitFor(() => {
      expect(apiGetSpy).not.toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-04-21&check_out=2025-04-25"
      );
    });
  });

  test("validates date constraints", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
    });

    const checkInInput = screen.getByLabelText("Check-In Date");
    const checkOutInput = screen.getByLabelText("Check-Out Date");

    expect(checkInInput.min).toBe(new Date().toISOString().split("T")[0]);

    fireEvent.change(checkInInput, {
      target: { value: "2025-04-21" },
    });
    fireEvent.change(checkOutInput, {
      target: { value: "2025-04-20" },
    });

    fireEvent.click(screen.getByTestId("next-button"));

    await waitFor(() => {
      expect(apiGetSpy).not.toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-04-21&check_out=2025-04-20"
      );
    });
  });

  test("handles API errors", async () => {
    apiGetSpy.mockRejectedValueOnce(new Error("API error"));

    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByText("No records found")).toBeInTheDocument();
    });
  });

  // test validating guest selection
  test("validates guest selection", async () => {
    render(<SelectGuestAndBooking onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledWith("/hotels/1/guests");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Check-In Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-Out Date")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Check-In Date"), {
      target: { value: "2025-04-21" },
    });
    fireEvent.change(screen.getByLabelText("Check-Out Date"), {
      target: { value: "2025-04-25" },
    });

    fireEvent.click(screen.getByTestId("next-button"));

    await waitFor(() => {
      expect(apiGetSpy).not.toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2025-04-21&check_out=2025-04-25"
      );
    });
  });
});