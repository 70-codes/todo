import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../common/auth/Auth";
import { normalAxios } from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await normalAxios.post("/api/auth/register", {
        username: formData.username,
        password: formData.password,
      });

      console.log(response.data);

      if (response.data?.token) {
        localStorage.setItem("access", response.data.token);
        navigate("/dashboard"); // Adjust this route as needed
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("root", {
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <Auth legend="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
            className="auth-input w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="auth-input w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-btn w-full"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>

        {errors.root && (
          <p className="text-red-500 text-center">{errors.root.message}</p>
        )}

        <p className="text-slate-300 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:text-sky-300">
            Register
          </Link>
        </p>
      </form>
    </Auth>
  );
};

export default Login;
