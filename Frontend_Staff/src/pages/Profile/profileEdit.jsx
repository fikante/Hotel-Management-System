import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const EditProfile = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };
  const [profileImage, setProfileImage] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex justify-center items-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                className="size-32 rounded-full"
              />
            ) : (
              <img src="/placepp.png" className="size-32" />
            )}
            <div className="bg-[#1814F3] h-8 w-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
              <label htmlFor="fileInput" className="cursor-pointer">
                <img src="/pencil.svg" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-start justify-center gap-2 ">
                <label className="text-[#232323] ">Your Name</label>
                <input
                  id="name"
                  {...register("Name", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                  placeholder="Full Name"
                  className="w-[400px] rounded-xl p-3 border border-[#DFEAF2]  text-[#718EBF]"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end mt-5 px-[30px] ">
            <button
              type="submit"
              className="px-10 py-3 text-white rounded-xl bg-[#1814F3]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
