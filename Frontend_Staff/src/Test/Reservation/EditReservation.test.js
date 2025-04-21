import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { api } from "@/lib/api";
import EditBooking from "@/pages/Reservations/EditBooking";
import { useReservationStore } from "@/components/store/useReservationStore";

jest.mock("@/components/store/useReservationStore");

describe("EditBooking", () => {
  const mockReservation = {
    bookingId: "123",
    checkIn: "2023-01-01",
    checkOut: "2023-01-05",
    bookingStatus: "pending",
  };

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
  let editReservationSpy;

  beforeEach(() => {
    axiosGetSpy = jest
      .spyOn(api, "get")
      .mockResolvedValue({ data: { data: mockRooms } });

    editReservationSpy = jest.fn().mockResolvedValue({});
    useReservationStore.mockImplementation(() => ({
      editReservation: editReservationSpy,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with reservation data", () => {
    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );
    expect(screen.getByDisplayValue("2023-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-01-05")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("fetches and displays available rooms", async () => {
    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("room-selection-button"));

    await waitFor(() => {
      expect(axiosGetSpy).toHaveBeenCalledWith(
        "/hotels/1/availablerooms?check_in=2023-01-01&check_out=2023-01-05"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Deluxe")).toBeInTheDocument();
      expect(screen.getByText("C101")).toBeInTheDocument();
      expect(screen.getByText("Standard")).toBeInTheDocument();
      expect(screen.getByText("C102")).toBeInTheDocument();
      expect(screen.getByText("Suite")).toBeInTheDocument();
      expect(screen.getByText("C103")).toBeInTheDocument();
    });
  });

  test("shows error when room fetch fails", async () => {
    axiosGetSpy.mockRejectedValue(new Error("Network Error"));

    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );
    fireEvent.click(screen.getByText("Select New Room"));

    await waitFor(() => {
      expect(screen.getByText("No records found")).toBeInTheDocument();
    });
  });

  test("submits updated reservation without room change", async () => {
    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );
    fireEvent.click(screen.getByText("Update Reservation"));

    await waitFor(() => {
      expect(editReservationSpy).toHaveBeenCalledWith(
        "123",
        expect.objectContaining({
          checkIn: "2023-01-01",
          status: "pending",
          checkOut: "2023-01-05",
          room: null,
        })
      );
    });
  });

  test("shows loading state during submission", async () => {
    const pendingPromise = new Promise(() => {});
    editReservationSpy.mockReturnValue(pendingPromise);

    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );
    fireEvent.click(screen.getByText("Update Reservation"));

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  test("Change a room and submit ", async () => {
    render(
      <EditBooking reservationData={mockReservation} onSuccess={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("room-selection-button"));

    await waitFor(() => {
      expect(screen.getByText("C101")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("select-radio-1"));
    expect(screen.getByTestId("select-radio-1")).toBeChecked();

    fireEvent.click(screen.getByText("Update Reservation"));

    await waitFor(() => {
      expect(editReservationSpy).toHaveBeenCalledWith(
        "123",
        expect.objectContaining({
          checkIn: "2023-01-01",
          status: "pending",
          checkOut: "2023-01-05",
          room: {
            id: 1,
            roomNumber: "C101",
            roomType: "Deluxe",
            price: 200,
            amenities: ["WiFi"],
            status: "available",
            size: 245,
            bedType: "King",
            maxOccupancy: 2,
          },
        })
      );
    });
  });
});
