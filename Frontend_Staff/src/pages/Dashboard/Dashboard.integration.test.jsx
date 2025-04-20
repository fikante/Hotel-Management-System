import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as DashboardModule from "./Dashboard";
const Dashboard = DashboardModule.default;

if (typeof Dashboard !== 'function') {
    console.error("Dashboard component failed to import correctly. Check exports/imports.", DashboardModule);
}


const mockGuestCountryChartFn = jest.fn(({ guestCountries }) => <div data-testid="country-chart">Countries: {guestCountries?.length ?? 0}</div>);
const mockRoomTypeChartFn = jest.fn(({ roomTypeData }) => <div data-testid="room-type-chart">Room Types: {roomTypeData?.length ?? 0}</div>);

jest.mock("../../components/dashboard/LoadingSpinner", () => () => <div data-testid="loading-spinner">Loading...</div>);
jest.mock("../../components/dashboard/ErrorMessage", () => ({ message }) => message ? <div data-testid="error-message">{message}</div> : null);
jest.mock("../../components/dashboard/KeyMetrics", () => ({ totalRevenue, totalBookings }) => (
  <div data-testid="key-metrics">
    Revenue: {totalRevenue} Bookings: {totalBookings}
  </div>
));
jest.mock("../../components/dashboard/GuestCountryChart", () => (props) => mockGuestCountryChartFn(props));
jest.mock("../../components/dashboard/RoomTypeChart", () => (props) => mockRoomTypeChartFn(props));
jest.mock("../../components/dashboard/GenderDemographicsChart", () => ({ genderDemographics }) => <div data-testid="gender-chart">Male: {genderDemographics?.Male ?? 0}, Female: {genderDemographics?.Female ?? 0}</div>);
jest.mock("../../components/dashboard/AssignmentsInsights", () => ({ assignments }) => <div data-testid="assignments-insights">Assignments: {assignments?.length ?? 0}</div>);


const API_BASE_URL = "http://localhost:3000";
const HOTEL_ID = 1;

const mockEndpoints = {
  revenue: `/api/v1/hms/hotels/${HOTEL_ID}/dashboard/revenue`,
  bookings: `/api/v1/hms/hotels/${HOTEL_ID}/dashboard/bookings`,
  demographics: `/api/v1/hms/hotels/${HOTEL_ID}/dashboard/demographics`,
  countries: `/api/v1/hms/hotels/${HOTEL_ID}/dashboard/countries`,
  roomTypes: `/api/v1/hms/hotels/${HOTEL_ID}/dashboard/room-types`,
  assignments: `/api/v1/hms/hotels/${HOTEL_ID}/assignments`,
};

const mockSuccessData = {
  revenue: { revenue: "123456" },
  bookings: { booked: 50 },
  demographics: { male: 30, female: 20 },
  countries: { country: [{ ethiopia: 15 }, { kenya: 10 }, { usa: 25 }] },
  roomTypes: { data: { 'Standard King': ['room1', 'room2'], Suite: ['suite1'] } },
  assignments: { success: true, data: [{ id: 1, task: 'Clean Room 101' }, { id: 2, task: 'Restock mini-bar' }] },
};

const mockFetch = (url, status, responseData, ok = true) => {
  const endpoint = Object.keys(mockEndpoints).find(key => url.includes(mockEndpoints[key]));
  const data = responseData !== undefined ? responseData : (endpoint ? mockSuccessData[endpoint] : {});
  const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data))
  };
  return Promise.resolve(response);
};

const mockFetchReject = (url, message = 'Network Error') => {
    return Promise.reject(new Error(message));
};

let consoleErrorSpy;

describe("Dashboard Integration Test", () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
    jest.clearAllMocks();
  });

  afterEach(() => {
     fetchSpy.mockRestore();
     if (consoleErrorSpy) {
        consoleErrorSpy.mockRestore();
        consoleErrorSpy = null;
     }
  });

  if (typeof Dashboard !== 'function') {
     throw new Error("Dashboard component did not import correctly in test file.");
  }

  test("should display loading spinner initially", () => {
    fetchSpy.mockImplementation(() => new Promise(() => {}));
    render(<Dashboard />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("key-metrics")).not.toBeInTheDocument();
  });

  test("should display all data correctly on successful fetch", async () => {
    fetchSpy.mockImplementation((url) => mockFetch(url, 200));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId("key-metrics")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();


    expect(screen.getByRole('heading', { name: /Welcome to the Dashboard/i })).toBeInTheDocument();
    expect(screen.getByTestId("key-metrics")).toHaveTextContent("Revenue: 1234.56 Bookings: 50");
    expect(screen.getByTestId("country-chart")).toHaveTextContent("Countries: 3");
    expect(screen.getByTestId("gender-chart")).toHaveTextContent("Male: 30, Female: 20");
    expect(screen.getByTestId("room-type-chart")).toHaveTextContent("Room Types: 2");
    expect(screen.getByTestId("assignments-insights")).toHaveTextContent("Assignments: 2");
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

   test("should display error message if all fetches fail", async () => {
       consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

       fetchSpy.mockImplementation((url) => mockFetchReject(url, `Failed ${url}`));

       render(<Dashboard />);

       await waitFor(() => {
           expect(screen.getByTestId("error-message")).toHaveTextContent(
               "Failed to load dashboard data. Please check the connection or try again later."
           );
       });
       expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

       expect(screen.queryByTestId("key-metrics")).not.toBeInTheDocument();
       expect(screen.queryByTestId("country-chart")).not.toBeInTheDocument();
       expect(screen.queryByTestId("gender-chart")).not.toBeInTheDocument();
       expect(screen.queryByTestId("room-type-chart")).not.toBeInTheDocument();
       expect(screen.queryByTestId("assignments-insights")).not.toBeInTheDocument();
   });

  test("should display partial data and error message if some fetches fail", async () => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      fetchSpy.mockImplementation((url) => {
          if (url.includes(mockEndpoints.revenue) || url.includes(mockEndpoints.bookings)) {
              return mockFetch(url, 200);
          } else {
              return mockFetchReject(url, `Failed ${url}`);
          }
      });

      render(<Dashboard />);

      await waitFor(() => {
          expect(screen.getByTestId("error-message")).toHaveTextContent(
              /Failed to load some data:/i
          );
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      expect(screen.getByTestId("error-message")).toHaveTextContent("Demographics");
      expect(screen.getByTestId("error-message")).toHaveTextContent("Country");
      expect(screen.getByTestId("error-message")).toHaveTextContent("Room Types");
      expect(screen.getByTestId("error-message")).toHaveTextContent("Assignments");

      expect(screen.getByTestId("key-metrics")).toHaveTextContent("Revenue: 1234.56 Bookings: 50");
      expect(screen.getByTestId("country-chart")).toHaveTextContent("Countries: 0");
      expect(screen.getByTestId("gender-chart")).toHaveTextContent("Male: 0, Female: 0");
      expect(screen.getByTestId("room-type-chart")).toHaveTextContent("Room Types: 0");
      expect(screen.getByTestId("assignments-insights")).toHaveTextContent("Assignments: 0");
   });

   test("should handle API response with success: false gracefully", async () => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      fetchSpy.mockImplementation((url) => {
          if (url.includes(mockEndpoints.countries)) {
              return mockFetch(url, 200, { success: false, message: "Country data unavailable" }, true);
          } else {
              return mockFetch(url, 200);
          }
      });

      render(<Dashboard />);

      await waitFor(() => {
          expect(screen.getByTestId("error-message")).toHaveTextContent(/Failed to load some data: Country/i);
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();


      expect(screen.getByTestId("key-metrics")).toHaveTextContent("Revenue: 1234.56 Bookings: 50");
      expect(screen.getByTestId("gender-chart")).toHaveTextContent("Male: 30, Female: 20");
      expect(screen.getByTestId("room-type-chart")).toHaveTextContent("Room Types: 2");
      expect(screen.getByTestId("assignments-insights")).toHaveTextContent("Assignments: 2");
      expect(screen.getByTestId("country-chart")).toHaveTextContent("Countries: 0");
   });


  test("should correctly parse and sort countries data", async () => {
      const unsortedCountries = {
          country: [
              { usa: 25 }, { ethiopia: 15 }, null, { kenya: 10 },
              { " ": 5 }, { zeroVal: 0 }, undefined, { finland: 7 },
              {}, {france: -5}, {germany: "abc"}
            ]
      };
      fetchSpy.mockImplementation((url) => {
          if (url.includes(mockEndpoints.countries)) {
              return mockFetch(url, 200, unsortedCountries, true);
          }
          return mockFetch(url, 200);
      });

      render(<Dashboard />);

      await waitFor(() => {
          expect(screen.getByTestId("country-chart")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      expect(mockGuestCountryChartFn).toHaveBeenCalledTimes(1);
      const expectedCountries = [
          { name: "Usa", value: 25 },
          { name: "Ethiopia", value: 15 },
          { name: "Kenya", value: 10 },
          { name: "Finland", value: 7 },
      ];
      const actualProps = mockGuestCountryChartFn.mock.calls[0][0];
      expect(actualProps.guestCountries).toEqual(expectedCountries);
      expect(actualProps.guestCountries.length).toBe(4);
  });


  test("should correctly parse and sort room type data", async () => {
      const rawRoomData = {
          data: {
              Suite: ['suite101', 'suite102'],
              'Standard King': ['sk201', 'sk202', 'sk203'],
              'Empty Type': [],
              'Single': ['s301'],
              'Null Value': null,
              'Not Array': 'invalid',
              "": ["roomX"],
              5: ["roomY"]
          }
      };
      fetchSpy.mockImplementation((url) => {
          if (url.includes(mockEndpoints.roomTypes)) {
              return mockFetch(url, 200, rawRoomData, true);
          }
          return mockFetch(url, 200);
      });

      render(<Dashboard />);

      await waitFor(() => {
          expect(screen.getByTestId("room-type-chart")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      expect(mockRoomTypeChartFn).toHaveBeenCalledTimes(1);
      const expectedRoomTypes = [
          { type: 'Standard King', count: 3 },
          { type: 'Suite', count: 2 },
          { type: 'Single', count: 1 },
      ];
      const actualProps = mockRoomTypeChartFn.mock.calls[0][0];
      expect(actualProps.roomTypeData).toEqual(expectedRoomTypes);
      expect(actualProps.roomTypeData.length).toBe(3);
  });
});