import { useForm } from "react-hook-form";
import InputField from "../../components/SignUp/InputField";
import Button from "../../components/SignUp/Button";
import SubmissionStatus from "../../components/SignUp/SubmissionStatus";
//import { assets } from "@/assets/assets"; // Removed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaHome } from "react-icons/fa";

// Replace with a URL to a stock image (from a CDN or similar)
const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a690aa31b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60";

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
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Background Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          filter: "brightness(0.85)",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-teal-500 opacity-70"></div>

        {/* Content Over Gradient */}
        <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
          <div className="text-white max-w-md">
            <FaHome className="mx-auto mb-4 text-5xl text-white" />
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              "Effortless Hotel Management Starts Here!"
            </h2>
            <p className="text-xl leading-relaxed">
              Simplify your operations, enhance guest experiences, and drive
              profitability with our intuitive dashboard.
            </p>
            <div className="mt-8">
              <p className="text-gray-200 italic">
                "The key is not to prioritize what's on your schedule, but to
                schedule your priorities."
              </p>
              <span className="block mt-2 text-sm text-gray-300">
                - Mahder Tesfaye
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-white py-12 px-6 flex items-center justify-center">
        {/* Form Container */}
        <div className="w-full max-w-md">
          {/* Logo - Using hotelicon.svg from public folder */}
          <div className="flex justify-center mb-8">
            <img src="/hotelicon.svg" alt="Hotel Logo" className="h-16" />
          </div>

          <h1 className="text-center mb-8 text-3xl font-extrabold text-gray-800">
            Welcome Back!
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input with Icon */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input with Icon */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-md"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md shadow-md transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Submission Status Message */}
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