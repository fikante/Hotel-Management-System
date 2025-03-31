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
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error.message || "Account creation failed",
      });
    }
  };

  const validatePasswordMatch = (value) => {
    return value === watch("password") || "Passwords don't match";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Side - Background Image */}
      <div
        className="hidden md:flex w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.SignUp})`,
          filter: "brightness(0.9)",
        }}
      >
        <div className="flex items-center justify-center p-10 text-center">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-4">
              "Seamless Hospitality, Effortless Management!"
            </h2>
            <p className="text-xl">
              Join us and revolutionize the way you manage your hotel.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 bg-white py-6 relative">
        {/* Form Container */}
        <div className="w-3/4 mx-auto px-6 font-serif">
          <h1 className="text-center my-6 text-2xl font-bold ">
            Create your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <ProfilePicUpload
              register={register}
              errors={errors}
              watch={watch}
            />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                register={register}
                errors={errors}
              />
              <InputField
                label="Last Name"
                register={register}
                errors={errors}
              />
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

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                className="mr-2 mt-1"
              />
              <label htmlFor="terms">
                I agree to all the{" "}
                <a href="" className="text-blue-400 underline">
                  Terms
                </a>{" "}
                and{" "}
                <a className="text-blue-400 underline" href="">
                  Privacy Policies
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs -mt-3">
                {errors.terms.message}
              </p>
            )}

            <Button type="submit" className=" w-full ">
              Create account
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 underline font-semibold "
              >
                Login
              </a>
            </p>
          </form>

          <SubmissionStatus
            status={submissionStatus}
            onClose={() => setSubmissionStatus(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
