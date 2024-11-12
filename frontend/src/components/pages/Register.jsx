import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Auth from "../../components/common/auth/Auth";

const Register = () => {
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
      throw new Error();
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  return (
    <Auth legend="Register">
      <input
        {...register("fname", { required: "First name is required" })}
        type="text"
        placeholder="First Name"
        className="auth-input"
      />
      {errors.fname && <p className="text-red-500">{errors.fname.message}</p>}
      <input
        {...register("lname", { required: "Second name is required" })}
        type="text"
        placeholder="Second Name"
        className="auth-input"
      />
      {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
      <input
        {...register("username", { required: "Username name is required" })}
        type="text"
        placeholder="Userame"
        className="auth-input"
      />
      {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
      <input
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Invalid email address";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
        className="auth-input"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
        {isSubmitting ? "Loading..." : "Register"}
      </button>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      <p className="text-slate-300 mt-4 mx-auto">
        Already have an account?{" "}
        <span className="text-sky-400 cursor-pointer">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </Auth>
  );
};

export default Register;
