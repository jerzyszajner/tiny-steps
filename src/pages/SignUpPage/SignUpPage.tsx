import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/signUpSchema";
import { getAuthErrorMessage } from "../../services/getAuthErrorMessage";
import { signUp } from "../../services/authService";
import type { SignUpFormValues } from "../../schemas/signUpSchema";

export function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: SignUpFormValues) {
    setError(null);
    try {
      await signUp(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError(getAuthErrorMessage(err, "Failed to sign up"));
    }
  }

  return (
    <>
      <h1>Create account</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
          autoComplete="new-password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
        <Link to="/login">Already have an account? Log in</Link>
        {error && <p>{error}</p>}
      </form>
      <Link to="/welcome">Back</Link>
    </>
  );
}
