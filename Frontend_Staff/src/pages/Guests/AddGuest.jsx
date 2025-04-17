import React, { useState } from "react";
import CountrySelect from "@/components/Country/CountriesNames";

const AddGuest = ({
  formData,
  setFormData,
  onSubmit,
  setBookingFormData,
  bookingFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Natan"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Samuel"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="gender">
              Gender</label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="email">
              Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="natan1995@gmail.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700 " htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              required
              onChange={handleChange}
              placeholder="+251928384839"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700 " htmlFor="address">
              Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="5kilo,Addis Ababa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700 mb-1" htmlFor="nationality">
              Nationality
            </label>
            <CountrySelect
              id = "nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="idType">
              Identification Type
            </label>
            <select
              id="idType"
              value={formData.idType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select ID type</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
              <option value="National ID">National ID</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700" htmlFor="idNumber">
              Identification Number
            </label>
            <input
              type="text"
              id="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="123456789"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-0.5 bg-gray-200 w-2/5"></div>
          <div className="font-semibold">Booking Date</div>
          <div className="h-0.5 bg-gray-200 w-2/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="checkIn">
              Check-In Date
            </label>
            <input
              type="date"
              id="checkIn"
              value={bookingFormData.checkIn}
              onChange={handleBookingChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="checkOut">
              Check-Out Date
            </label>
            <input
              type="date"
              id="checkOut"
              value={bookingFormData.checkOut}
              onChange={handleBookingChange}
              required
              min={bookingFormData.checkIn}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-1/4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddGuest;
