import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Auth from "../common/auth/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  return (
    <Auth legend="Login">
      <input
        {...register("username", { required: "Username is required" })}
        type="text"
        placeholder="Username"
        className="auth-input"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}

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
        className="auth-input"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className="auth-btn"
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <p className="text-slate-300 mt-4 mx-auto">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-sky-400">
          Register
        </Link>
      </p>
    </Auth>
  );
};

export default Login;
