import SoundOffIcon from "./icons/SoundOffIcon";
import SoundOnIcon from "./icons/SoundOnIcon";
import RestartCycleIcon from "./icons/RestartCycleIcon";

export default function OptionButtonGroup({
  soundOn,
  updateSound,
  cycleIndex,
  resetCycle,
}) {
  return (
    <div className="option-container">
      <button className="option-button text-light" onClick={updateSound}>
        {soundOn ? (
          <>
            <SoundOnIcon /> sound on
          </>
        ) : (
          <>
            <SoundOffIcon /> sound off
          </>
        )}
      </button>

      {cycleIndex !== 0 && (
        <button className="option-button text-light" onClick={resetCycle}>
          <RestartCycleIcon /> restart cycle
        </button>
      )}
    </div>
  );
}
