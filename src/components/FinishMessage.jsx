import RestartCycleIcon from "./icons/RestartCycleIcon";

export default function FinishMessage({ cycle, resetCycle }) {
  return (
    <div className="finish-cycle-stats text-accent">
      <h3 className="text-main">Yippee! You did it!</h3>
      <p>
        <span className="text-bold">
          {cycle
            .filter((session) => session.mode === "work")
            .reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.minutes + currentValue.seconds / 60,
              0
            )}
        </span>
        &nbsp;total work minutes
      </p>
      <p>
        <span className="text-bold">
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
        </span>
        &nbsp;total break minutes
      </p>
      <p>
        <span className="text-bold">
          {cycle.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.minutes + currentValue.seconds / 60,
            0
          )}
        </span>
        &nbsp;minutes overall
      </p>
      <div className="option-container">
        <button className="option-button text-light" onClick={resetCycle}>
          <RestartCycleIcon /> do another session!
        </button>
      </div>
    </div>
  );
}
