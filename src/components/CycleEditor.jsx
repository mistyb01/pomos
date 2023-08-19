import { useState } from "react";

export default function CycleEditor({ cycleData, updateCycle }) {
  const [formData, setFormData] = useState(cycleData);

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
    <section className="cycle-editor">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCycle(formData);
        }}
      >
        <h2>Edit Cycle</h2>

        <div className="form-row">
          <input
            type="number"
            name="workMins"
            value={formData.workMins}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="workMins">work mins</label>
        </div>

        <div className="form-row">
          <input
            type="number"
            value={formData.workSessions}
            name="workSessions"
            onChange={handleInputChange}
          ></input>
          <label htmlFor="workSessions">work sessions</label>
        </div>

        <div className="form-row">
          <input
            type="number"
            name="breakMins"
            value={formData.breakMins}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="breakMins">break mins</label>
        </div>

        <div className="form-row">
          <input
            type="checkbox"
            name="longBreak"
            checked={formData.longBreak}
            onChange={handleLongBreakChange}
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
            ></input>
            <label htmlFor="longBreakMins">long break mins</label>
          </div>
        )}
        <button
          className="form-btn background-contrast text-contrast"
          type="submit"
        >
          save
        </button>
      </form>
    </section>
  );
}
