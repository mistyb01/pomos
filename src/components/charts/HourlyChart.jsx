import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
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
    <div className="text-main">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
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
          <XAxis
            dataKey="hour"
            axisLine={{ stroke: "transparent" }}
            stroke="#76a5c2"
          >
            <Label
              className="fill-accent"
              value="Hour of day"
              position="bottom"
            />
          </XAxis>
          <YAxis axisLine={{ stroke: "transparent" }} stroke="#76a5c2">
            <Label
              className="fill-accent"
              value="Focus minutes"
              position="left"
              angle={-90}
              offset={-5}
            />
          </YAxis>
          <Tooltip content={CustomTooltip} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;
