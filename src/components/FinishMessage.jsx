import RestartCycleIcon from "./icons/RestartCycleIcon";

export default function FinishMessage({ cycle, resetCycle }) {
  return (
    <div className="finish-cycle-stats">
      <h3>Yippee! You did it!</h3>
      <p>
        total work minutes: &nbsp;
        {cycle
          .filter((session) => session.mode === "work")
          .reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.minutes + currentValue.seconds / 60,
            0
          )}
      </p>
      <p>
        total break minutes: &nbsp;
        {cycle
          .filter(
            (session) =>
              session.mode === "break" || session.mode === "long break"
          )
          .reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.minutes + currentValue.seconds / 60,
            0
          )}
      </p>
      <p>
        overall: &nbsp;
        {cycle.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.minutes + currentValue.seconds / 60,
          0
        )}
      </p>
      <button onClick={resetCycle}>
        <RestartCycleIcon /> do another session!
      </button>
    </div>
  );
}
