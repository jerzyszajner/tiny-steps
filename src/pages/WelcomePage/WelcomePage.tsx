import { Link } from "react-router";
import styles from "./WelcomePage.module.css";

export function WelcomePage() {
  return (
    <section className={styles.page} aria-labelledby="welcome-title">
      <div className={styles.intro}>
        <h1 className={styles.title} id="welcome-title">
          Start with one small step
        </h1>
        <p className={styles.lead}>
          tiny-steps shows only the tasks that fit the time and energy you have
          right now.
        </p>
      </div>
      <ol className={styles.steps}>
        <li>Set how much time and energy you have.</li>
        <li>See a short list of tasks that fit.</li>
        <li>Take one small step.</li>
      </ol>

      <div className={styles.actions}>
        <Link className={styles.primary} to="/login">
          Log in
        </Link>
        <Link className={styles.secondary} to="/signup">
          Create account
        </Link>
      </div>
      <p className={styles.note}>
        Your tasks are visible only after logging in. Any other page redirects
        here.
      </p>
    </section>
  );
}
