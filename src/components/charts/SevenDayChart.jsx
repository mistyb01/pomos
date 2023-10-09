import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const SevenDayChart = ({ data }) => {
  function formatData(array) {
    return array.map((entry) => ({
      timer_length: entry.timer_length,
      created_at: dayjs(entry.created_at).format("MM-DD"),
    }));
  }

  function getDailyData() {
    const today = dayjs();
    const formattedData = formatData(data);
    const datesAndTotalMins = [];

    for (let i = 6; i >= 0; i--) {
      const nextDay = today.subtract(i, "day").format("MM-DD");

      const filteredToDate = formattedData.filter(
        (entry) => entry.created_at === nextDay
      );

      const aggregatedMinutesByDate = filteredToDate.reduce(
        (acc, entry) => acc + entry.timer_length,
        0
      );
      datesAndTotalMins.push({
        date: nextDay,
        totalMins: aggregatedMinutesByDate,
      });
    }
    return datesAndTotalMins;
  }
  const dailyData = getDailyData();

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

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={dailyData} overflow="visible">
        <Line type="monotone" dataKey="totalMins" stroke="#8884d8" />
        <XAxis
          dataKey="date"
          axisLine={{ stroke: "transparent" }}
          stroke="#76a5c2"
        >
          <Label className="fill-accent" value="Date" position="bottom" />
        </XAxis>
        <YAxis axisLine={{ stroke: "transparent" }} stroke="#76a5c2">
          <Label
            className="fill-accent"
            value="Focus minutes"
            position="left"
            angle={-90}
          />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SevenDayChart;
