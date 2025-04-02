import { useForm } from "react-hook-form";
import InputField from "../../components/SignUp/InputField";
import Button from "../../components/SignUp/Button";
import SubmissionStatus from "../../components/SignUp/SubmissionStatus";
import { assets } from "@/assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      setSubmissionStatus({
        type: "success",
        message: "Login successful! Redirecting...",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Background Section - Using YOUR image */}
      <div 
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.LoginBg})`,
          filter: "brightness(0.9)"
          
        }}
      >
        <div className="flex items-center justify-center p-10 text-center bg-black/40 w-full h-full">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-4">
              "Welcome Back to Hotel Management!"
            </h2>
            <p className="text-xl">
              Access your dashboard and manage your hotel seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-white py-6 relative">
        {/* Form Container */}
        <div className="w-3/4 mx-auto px-6 font-serif">
          {/* Logo - Using hotelicon.svg from public folder */}
          <div className="flex justify-center my-6">
            <img 
              src="/hotelicon.svg" 
              alt="Hotel Logo"
              className="h-16"
            />
          </div>

          <h1 className="text-center my-6 text-2xl font-bold">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              register={register}
              errors={errors}
              required="Email is required"
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
              required="Password is required"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 underline font-semibold"
              >
                Sign up
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

export default Login;