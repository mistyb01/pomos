import { LineChart, Line, XAxis, YAxis, Label, Tooltip } from "recharts";
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
    <>
      <LineChart width={600} height={250} data={dailyData} overflow="visible">
        <Line type="monotone" dataKey="totalMins" stroke="#8884d8" />
        <XAxis dataKey="date">
          <Label value="Date" position="bottom" />
        </XAxis>
        <YAxis
          label={{ value: "Focus minutes", angle: -90, position: "left" }}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </>
  );
};

export default SevenDayChart;
