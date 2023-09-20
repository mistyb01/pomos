import { useState } from "react";

export default function CycleEditor({
  showSettings,
  soundOn,
  handleSoundToggle,
  lightModeOn,
  handleLightModeToggle,
  cycleData,
  updateCycle,
}) {
  const [formData, setFormData] = useState(cycleData);
  const isTabbable = showSettings ? "0" : "-1";

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLongBreakChange(e) {
    setFormData({
      ...formData,
      longBreak: e.target.checked,
    });
  }

  return (
    <section
      className={
        showSettings
          ? "settings-container background-light-2 text-main border-accent settings-container-active"
          : "settings-container background-light-2 border-accent text-main"
      }
    >
      <section className="settings-menu">
        <h2 className="text-accent">Settings</h2>
        <section>
          <h3>Color mode</h3>
          <div className="radio-set radio-color-mode">
            <input
              type="radio"
              name="color-mode"
              id="light"
              onClick={() => handleLightModeToggle(true)}
              defaultChecked={lightModeOn}
              tabIndex={isTabbable}
            ></input>
            <label htmlFor="light">light</label>
            <input
              type="radio"
              name="color-mode"
              id="dark"
              onClick={() => handleLightModeToggle(false)}
              defaultChecked={!lightModeOn}
              tabIndex={isTabbable}
            ></input>
            <label htmlFor="dark">dark</label>
          </div>
        </section>

        <section>
          <h3>Alert sound</h3>
          <div className="radio-set radio-sound-mode">
            <input
              type="radio"
              name="sound-mode"
              id="sound-on"
              onClick={() => handleSoundToggle(true)}
              defaultChecked={soundOn}
              tabIndex={isTabbable}
            ></input>
            <label htmlFor="sound-on">on</label>
            <input
              type="radio"
              name="sound-mode"
              id="sound-off"
              onClick={() => handleSoundToggle(false)}
              defaultChecked={!soundOn}
              tabIndex={isTabbable}
            ></input>
            <label htmlFor="sound-off">off</label>
          </div>
        </section>

        <section className="cycle-editor">
          <h3>Edit Cycle</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCycle(formData);
            }}
          >
            <div className="form-row">
              <input
                type="number"
                name="workMins"
                value={formData.workMins}
                onChange={handleInputChange}
                tabIndex={isTabbable}
              ></input>
              <label htmlFor="workMins">work mins</label>
            </div>

            <div className="form-row">
              <input
                type="number"
                value={formData.workSessions}
                name="workSessions"
                onChange={handleInputChange}
                tabIndex={isTabbable}
              ></input>
              <label htmlFor="workSessions">work sessions</label>
            </div>

            <div className="form-row">
              <input
                type="number"
                name="breakMins"
                value={formData.breakMins}
                onChange={handleInputChange}
                tabIndex={isTabbable}
              ></input>
              <label htmlFor="breakMins">break mins</label>
            </div>

            <div className="form-row">
              <input
                type="checkbox"
                name="longBreak"
                checked={formData.longBreak}
                onChange={handleLongBreakChange}
                tabIndex={isTabbable}
              ></input>
              <label htmlFor="longBreak">end with long break</label>
            </div>

            {formData.longBreak && (
              <div className="form-row">
                <input
                  type="number"
                  name="longBreakMins"
                  value={formData.longBreakMins}
                  onChange={handleInputChange}
                  tabIndex={isTabbable}
                ></input>
                <label htmlFor="longBreakMins">long break mins</label>
              </div>
            )}
            <button
              className="form-btn background-contrast text-contrast"
              type="submit"
              tabIndex={isTabbable}
            >
              save
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}
