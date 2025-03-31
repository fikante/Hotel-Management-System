import React, { useState } from 'react';

const AddBooking = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    status: 'pending',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        New Reservation
      </h1>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guest Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="booking-form-input"
              required
            />
          </div>

          {/* Room Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number <span className="text-red-500">*</span>
            </label>
            <select
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="booking-form-input"
              required
            >
              <option value="">Select Room</option>
              {['101', '102', '201', '202', '301'].map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-In <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="booking-form-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-Out <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              className="booking-form-input"
              required
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="booking-form-input"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Create Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;