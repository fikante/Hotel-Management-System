import React, { useState, useEffect } from "react";
import { CustomTable } from "../Table/Table";
import { managersDatabase } from "./ManagersDatabase";
import AddManager from "./AddManagers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ManagersColumns from "./ManagersCoulumn";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const Managers = () => {
  const [addManagerIsOpen, setAddManagerOpen] = useState(false);

  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const response = await api.get("/manager");
        console.log(response.data.data, "data from api");

        // "id": "9616f09b-2fb2-4100-9703-638e6c8f3a06",
        // "firstName": "John",
        // "lastName": "Doeeeee",
        // "email": "johndoe@example.com",
        // "password": "securepassword123",
        // "phoneNumber": "1234567890",
        // "address": "123 Main Street, Cityville",
        // "dateOfBirth": "1989-12-31T21:00:00.000Z",
        // "registrationDate": "2025-04-05T21:00:00.000Z"

        const formattedManagers = response.data.data.map((manager) => ({
          id: manager.id,
          FirstName: manager.firstName,
          LastName: manager.lastName,
          Email: manager.email,
          Password: manager.password,
          PhoneNumber: manager.phoneNumber,
          Address: manager.address,
          DateOfBirth: manager.dateOfBirth,
          RegistrationDate: manager.registrationDate,
          hotelName: manager.hotelName || "Hotel",
        }));
        setManagers(formattedManagers);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading Managers...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomTable
        data={managersDatabase}
        columns={ManagersColumns}
        onAddClick={() => setAddManagerOpen(true)}
        addButtonText={"Add Manager"}
        pageSize={8}
      />

      <Dialog open={addManagerIsOpen} onOpenChange={setAddManagerOpen}>
        <DialogContent>
          <AddManager onSuccess={() => setAddManagerOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Managers;
