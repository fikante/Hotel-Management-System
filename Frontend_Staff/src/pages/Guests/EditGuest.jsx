import { Button } from "@/components/ui/button";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SpinPage from "@/components/Spin/Spin";
import { useGuestStore } from "@/components/store/useGuestStore";

const EditGuest = ({ guestData, onSuccess }) => {
  const { editGuest } = useGuestStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    defaultValues: {
      fname: guestData.firstName,
      lname: guestData.lastName,
      gender: guestData.gender,
      email: guestData.email,
      phone: guestData.phone,
      nationality: guestData.nationality,
      idType: guestData.idType,
      idNumber: guestData.idNumber,
      id: guestData.id,
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (guestData) {
      reset({
        fname: guestData.firstName,
        lname: guestData.lastName,
        gender: guestData.gender,
        email: guestData.email,
        phone: guestData.phone,
        nationality: guestData.nationality,
        idType: guestData.idType,
        idNumber: guestData.idNumber,
        id: guestData.id,
      });
    }
  }, [guestData, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await editGuest(data, guestData.id);
      onSuccess();
    } catch (error) {
      console.error("Error updating guest:", error);
      setError("Failed to update guest");
    } finally {
      setIsLoading(false);
    }

    onSuccess();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading...</div>
        <SpinPage />
      </div>
    );
  }
  return (
    <div className="flex items-center flex-col justify-center font-serif p-6 gap-3">
      <h2 className="text-2xl font-semibold">Edit Guest</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-6 w-full"
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col items-start justify-center gap-2 ">
            <label className="text-[#232323] " htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              {...register("fname", {
                required: {
                  value: true,
                  message: "First Name is required",
                },
              })}
              placeholder="First Name"
              className="rounded-xl p-3 border w-full"
            />
            {errors.fname && (
              <span className="text-red-500 text-sm">
                {errors.fname.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lname", {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              placeholder="Last Name"
              className="rounded-xl p-3 border w-full"
            />
            {errors.lname && (
              <span className="text-red-500 text-sm">
                {errors.lname.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="email">Email</label>
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
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              id="phoneNumber"
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
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="nationality">Nationality</label>
            <input
              type="text"
              placeholder="Nationality"
              id="nationality"
              {...register("nationality", {
                required: {
                  value: true,
                  message: "Nationality is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.nationality && (
              <span className="text-red-500 text-sm">
                {errors.nationality.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="idType">
              Identification Type</label>
            <select
              id="idType"
              {...register("idType", {
                required: {
                  value: true,
                  message: "Identification Type is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            >
              <option value="">Select ID Type</option>
              <option value="Passport">Passport</option>
              <option value="Driver License">Driving License</option>
              <option value="National ID">National ID</option>
            </select>
            {errors.idType && (
              <span className="text-red-500 text-sm">
                {errors.idType.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] " htmlFor="idNumber">
              Identification Number</label>
            <input
              type="text"
              placeholder="ID Number"
              id="idNumber"
              {...register("idNumber", {
                required: {
                  value: true,
                  message: "ID Number is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.idNumber && (
              <span className="text-red-500 text-sm">
                {errors.idNumber.message}
              </span>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <Button
              variant="default"
              type="submit"
              className="px-10 py-6 text-white rounded-xl bg-blue-700 hover:bg-blue-800 w-1/2"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGuest;
