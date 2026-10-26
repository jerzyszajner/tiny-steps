import { Link } from "react-router";

export function WelcomePage() {
  return (
    <>
      <h1>Start with one small step</h1>
      <p>
        tiny-steps shows only the tasks that fit the time and energy you have
        right now.
      </p>
      <ol>
        <li>Set how much time and energy you have.</li>
        <li>See a short list of tasks that fit.</li>
        <li>Take one small step.</li>
      </ol>

      <Link to="/login">Log in</Link>
      <Link to="/signup">Create account</Link>
      <p>
        Your tasks are visible only after logging in. Any other page redirects
        here.
      </p>
    </>
  );
}
