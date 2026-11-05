import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { loginSchema } from "../../schemas/loginSchema";
import { getAuthErrorMessage } from "../../services/getAuthErrorMessage";
import { signIn } from "../../services/authService";
import type { LoginFormValues } from "../../schemas/loginSchema";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError(getAuthErrorMessage(err, "Failed to log in"));
    }
  }

  return (
    <section className={styles.page} aria-labelledby="login-title">
      <h1 className={styles.title} id="login-title">
        Log in
      </h1>
      <form
        className={styles.card}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className={styles.error} id="email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p className={styles.error} id="password-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
          <Link className={styles.link} to="/signup">
            No account? Create one
          </Link>
        </div>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </form>
      <Link className={`${styles.link} ${styles.back}`} to="/welcome">
        Back
      </Link>
    </section>
  );
}
