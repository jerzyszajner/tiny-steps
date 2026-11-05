import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { signUpSchema } from "../../schemas/signUpSchema";
import { getAuthErrorMessage } from "../../services/getAuthErrorMessage";
import { signUp } from "../../services/authService";
import type { SignUpFormValues } from "../../schemas/signUpSchema";
import styles from "./SignUpPage.module.css";

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
    <section className={styles.page}>
      <h1 className={styles.title}>Create account</h1>
      <form
        className={styles.card}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
            autoComplete="email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
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
            autoComplete="new-password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
          <Link className={styles.link} to="/login">
            Already have an account? Log in
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <Link className={`${styles.link} ${styles.back}`} to="/welcome">
        Back
      </Link>
    </section>
  );
}
