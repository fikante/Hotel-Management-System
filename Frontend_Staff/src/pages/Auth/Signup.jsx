import { useForm } from "react-hook-form";

import InputField from "../../components/SignUp/InputField";
import Button from "../../components/SignUp/Button";
import ProfilePicUpload from "../../components/SignUp/ProfilePicUpload";
import HotelDropdown from "../../components/SignUp/HotelDropdown";
import SubmissionStatus from "../../components/SignUp/SubmissionStatus";

import { assets } from "@/assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ hotels }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const hotelName = "Pickachu Hotel";
  const onSubmit = async (data) => {
    try {
      console.log(data);
      setSubmissionStatus({
        type: "success",
        message: "Account created successfully!",
      });
      // Redirect after 3 seconds
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error.message || "Account creation failed",
      });
    }
  };

  // Password matching validation
  const validatePasswordMatch = (value) => {
    return value === watch("password") || "Passwords don't match";
  };

  return (
    <div className="flex">
      {/* Left Side - Fixed Background Image */}
      <div className="hidden md:block fixed h-full w-1/2 left-0 top-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${assets.SignUp})`,
            filter: "brightness(0.9)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
            <div className="text-white max-w-md">
              <h2 className="text-4xl font-bold mb-4">
                "Seamless Hospitality, Effortless Management!"
              </h2>
              <p className="text-xl">
                Join us and revolutionize the way you manage your hotel. Smart,
                Fast, and Hassle-Free!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 md:ml-auto px-30 bg-white py-8">
        <div className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer">
          <img
            src="/hotel.png" 
            alt="Hotel Logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
          />
          <span className="font-semibold text-sm md:text-base">
            {hotelName}
          </span>
        </div>
        <h1 className="text-center my-6 text-2xl font-bold">
          Create your Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfilePicUpload register={register} errors={errors} watch={watch} />
          <HotelDropdown
            register={register}
            hotels={[
              { id: 1, name: "Skylight Hotel" },
              { id: 2, name: "Sheraton Hotel" },
              { id: 3, name: "Intercontinental Hotel" },
              { id: 4, name: "Haile Resort" },
            ]}
            errors={errors}
          />
          <div className="flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-between">
            <InputField
              label="First Name"
              register={register}
              errors={errors}
            />
            <InputField label="Last Name" register={register} errors={errors} />
          </div>
          <InputField
            label="Email"
            type="email"
            register={register}
            errors={errors}
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            }}
          />
          <InputField
            label="Phone Number"
            type="tel"
            register={register}
            errors={errors}
            pattern={{
              value: /^\+?[0-9]{10,15}$/, // Allows optional '+' and 10-15 digits
              message:
                "Invalid phone number (e.g., +251968096620 or 0968096620)",
            }}
          />
          <InputField
            label="Password"
            type="password"
            register={register}
            errors={errors}
            validate={(value) =>
              value.length >= 8 || "Password must be at least 8 characters"
            }
          />
          <InputField
            label="Confirm Password"
            type="password"
            register={register}
            errors={errors}
            validate={validatePasswordMatch}
          />

          <div className="flex items-center my-4 text-[12px]">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms",
              })}
              className="mr-2"
            />
            <label>
              I agree to all the{" "}
              <a href="#Terms" className="text-blue-400 underline">
                Terms
              </a>{" "}
              and{" "}
              <a className="text-blue-400 underline" href="#Privacy Policies.">
                Privacy Policies.
              </a>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs ml-2">
                {errors.terms.message}
              </p>
            )}
          </div>

          <Button type="submit">Create account</Button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="#Login" className="text-blue-400 underline">
              Login
            </a>
          </p>

          <SubmissionStatus
            status={submissionStatus}
            onClose={() => setSubmissionStatus(null)}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
