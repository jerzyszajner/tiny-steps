export function AddTaskPage() {
  return (
    <>
      <h1>New task</h1>
      <form noValidate>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Please enter title"
        />
        <fieldset>
          <legend>How many minutes will this task take?</legend>
          <p>A rough guess is fine. Not sure? Pick the bigger value.</p>
          <label>
            5 min
            <input type="radio" name="minutes" value="5" />
          </label>
          <label>
            15 min
            <input type="radio" name="minutes" value="15" />
          </label>
          <label>
            30 min
            <input type="radio" name="minutes" value="30" />
          </label>
        </fieldset>
        <fieldset>
          <legend>How much energy does this task need?</legend>
          <p>Low: almost no thinking. High: you need to focus.</p>
          <label>
            Low
            <input type="radio" name="energy" value="low" />
          </label>
          <label>
            Medium
            <input type="radio" name="energy" value="medium" />
          </label>
          <label>
            High
            <input type="radio" name="energy" value="high" />
          </label>
        </fieldset>
        <label htmlFor="note">Note (optional)</label>
        <textarea name="note" id="note" rows={4}></textarea>
        <button type="submit">Add task</button>
      </form>
    </>
  );
}
