import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <h1 className={styles.title} id="not-found-title">
        Page not found
      </h1>
      <p className={styles.text}>This page does not exist or was moved.</p>
      <Link className={styles.link} to="/">
        Back to list
      </Link>
    </section>
  );
}
