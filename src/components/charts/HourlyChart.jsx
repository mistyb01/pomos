import { BarChart, Bar, XAxis, YAxis, Label, Tooltip, Cell } from "recharts";
import { useState } from "react";
import dayjs from "dayjs";

const HourlyChart = ({ data }) => {
  function dataWithNeededColumns(array) {
    return array.map((entry) => ({
      timer_length: entry.timer_length,
      created_at: dayjs(entry.created_at).format("HH"),
    }));
  }

  let formattedData = dataWithNeededColumns(data);

  function getHourlyData() {
    let hourlyData = [];
    for (let i = 0; i < 24; i++) {
      let hour = i.toString();
      if (hour.length < 2) {
        hour = "0" + hour;
      }

      let filtered = formattedData.filter((entry) =>
        entry.created_at.startsWith(hour)
      );
      let total = filtered.reduce(
        (total, entry) => total + entry.timer_length,
        0
      );
      hourlyData.push({ hour, total });
    }
    return hourlyData;
  }

  let hourlyData = getHourlyData();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip background-light-2 text-emphasize">
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };

  const [focusBar, setFocusBar] = useState(null);

  return (
    <>
      <BarChart
        width={600}
        height={250}
        data={hourlyData}
        overflow="visible"
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
      >
        <Bar dataKey="total">
          {data.map((entry, index) => (
            <Cell
              className={focusBar === index ? "fill-light" : "fill-accent"}
            />
          ))}
        </Bar>
        <XAxis dataKey="hour">
          <Label value="Hour of day" position="bottom" />
        </XAxis>
        <YAxis
          label={{ value: "Focus minutes", angle: -90, position: "left" }}
        />
        <Tooltip content={CustomTooltip} cursor={false} />
      </BarChart>
    </>
  );
};

export default HourlyChart;
