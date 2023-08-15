import { useState } from "react";

export default function CycleEditor({ cycleData, updateCycle }) {
  const [formData, setFormData] = useState(cycleData);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <h2>Edit Cycle</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCycle(formData);
        }}
      >
        <div>
          <label htmlFor="workMins">work mins</label>
          <input
            name="workMins"
            value={formData.workMins}
            onChange={handleInputChange}
          ></input>
        </div>

        <div>
          <label htmlFor="workSessions">work sessions</label>
          <input
            type="number"
            value={formData.workSessions}
            name="workSessions"
            onChange={handleInputChange}
          ></input>
        </div>

        <div>
          <label htmlFor="breakMins">break mins</label>
          <input
            name="breakMins"
            checked={formData.breakMins}
            onChange={handleInputChange}
          ></input>
        </div>

        <div>
          <label htmlFor="longBreak">end with long break</label>
          <input
            type="checkbox"
            name="longBreak"
            value={formData.longBreak}
            onChange={handleInputChange}
          ></input>
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
}
