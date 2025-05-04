import { Button } from "@/components/ui/button";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { useStaffStore } from "@/components/store/useStaffStore";

const EditStaff = ({ staffData, onSuccess }) => {
  const { editStaff } = useStaffStore();
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: {
      email: staffData.email,
      phone: staffData.phonenumber,
      salary: staffData.staffSalary,
      position: staffData.staffPosition,
      employed_at: staffData.employedAt,
      status: staffData.staffStatus,
      profile_picture: staffData.profilePic,
      fname: staffData.staffName.split(" ")[0],
      lname: staffData.staffName.split(" ")[1],
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (staffData) {
      reset({
        fname: staffData.staffName.split(" ")[0],
        lname: staffData.staffName.split(" ")[1],
        email: staffData.email,
        phone: staffData.phonenumber,
        salary: staffData.staffSalary,
        position: staffData.staffPosition,
        employed_at: staffData.employedAt,
        status: staffData.staffStatus,
        profile_picture: staffData.profilePic,
      });
    }
  }, [staffData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      form.setValue("profile_picture", file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await editStaff(staffData.id, data)
      alert("Staff updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating staff:", error);
      setError("Failed to update staff. Please try again.");
    }

  };

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col justify-center font-serif p-4 gap-3">
      <h2 className="text-2xl font-semibold">Edit Staff</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-10 text-sm w-full"
      >
        <div className="relative">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="size-32 rounded-full"
            />
          ) : (
            <img
              src={staffData?.profilePic}
              alt="Profile"
              className="size-32 rounded-full"
            />
          )}
          <div className="bg-[#1814F3] h-8 w-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src="/pencil.svg" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-row gap-6 w-3/4 justify-between">
          <div className="flex flex-col gap-3 w-1/2 ">
            <input type="hidden" {...register("id")} />
            <div className="flex flex-col items-start justify-center gap-2 ">
              <label className="text-[#232323] ">First Name</label>
              <input
                id="fname"
                {...register("fname", {
                  required: {
                    value: true,
                    message: "First Name is required",
                  },
                })}
                placeholder="First Name"
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Last Name</label>
              <input
                id="lname"
                {...register("lname", {
                  required: {
                    value: true,
                    message: "Last Name is required",
                  },
                })}
                placeholder="Last Name"
                className="rounded-xl p-3 border w-full"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Email</label>
              <input
                placeholder="Email"
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                id="phone"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                  pattern: {
                    value:
                      /^\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                    message: "Invalid Phone Number",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Salary</label>
              <input
                type="text"
                placeholder="Salary"
                id="salary"
                {...register("salary", {
                  required: {
                    value: true,
                    message: "Salary is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Position</label>
              <input
                type="text"
                id="position"
                placeholder="Position"
                {...register("position", {
                  required: {
                    value: true,
                    message: "Position is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Employed At</label>
              <input
                type="date"
                id="employed_at"
                {...register("employed_at", {
                  required: {
                    value: true,
                    message: "Employed At is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Status</label>
              <input
                type="text"
                id="status"
                placeholder="Status"
                {...register("status", {
                  required: {
                    value: true,
                    message: "Status is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex w-full justify-end gap-4">
              <Button
                variant="default"
                className="px-10 py-3 rounded-xl"
                onClick={() => onSuccess()}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                type="submit"
                className="px-10 py-3 text-white rounded-xl bg-blue-700 hover:bg-blue-800"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStaff;
