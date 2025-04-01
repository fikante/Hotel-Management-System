import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { staffColumns } from "@/components/Staff/staffCoulmns";
import { staffDatabase } from "@/TestData/staffDatabase";  
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const StaffList = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [staff, setStaff] = useState(staffDatabase); 
  const navigate = useNavigate();

  const handleAddStaffClick = () => {
    setIsAddingStaff(true);
  };

  const handleCancelAddStaff = () => {
    setIsAddingStaff(false);
  };

  const handleSaveNewStaff = (newStaffData) => {
    
    setStaff([...staff, newStaffData]);
    setIsAddingStaff(false); 
  };
  const onAddClick = () => {
    navigate("/staff/assign-staff");
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      {isAddingStaff && (
        <AddStaffForm onSave={handleSaveNewStaff} onCancel={handleCancelAddStaff} />
      )}

      <CustomTable
        data={staff} 
        columns={staffColumns}
        addButtonText="Add Staff"
        onAddClick={handleAddStaffClick}
        pageSize={8}
        EnableSelection={true}
        onSelectionChange={setSelectedStaff}
      />
      {selectedStaff && (
        <div className="flex justify-center items-center -mt-10">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={onAddClick}
          >
            Assign Staff
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};


const AddStaffForm = ({ onSave, onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Free'); // Default value

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !age || !hireDate || !salary || !role) {
      alert('Please fill in all fields.');
      return;
    }

    const newStaffData = {
      id: `staff-${Date.now()}`,
      hotelId: 'hotel-1',
      firstName,
      lastName,
      email,
      age: parseInt(age),
      hireDate,
      salary: parseFloat(salary),
      role,
      status,
    };

    onSave(newStaffData);
  };

  return (
    <div className="mb-4 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Add New Staff</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input
            type="number"
            id="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hireDate" className="block text-gray-700 text-sm font-bold mb-2">Hire Date:</label>
          <input
            type="date"
            id="hireDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">Salary:</label>
          <input
            type="number"
            id="salary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <input
            type="text"
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select
            id="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Free">Free</option>
            <option value="Occupied">Occupied</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffList;