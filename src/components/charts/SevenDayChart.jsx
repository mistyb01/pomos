import { LineChart, Line, XAxis, YAxis, Label } from "recharts";
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

  return (
    <>
      <LineChart width={730} height={250} data={dailyData} overflow="visible">
        <Line type="monotone" dataKey="totalMins" stroke="#8884d8" />
        <XAxis dataKey="date">
          <Label value="Date" position="bottom" />
        </XAxis>
        <YAxis
          label={{ value: "Focus minutes", angle: -90, position: "left" }}
        />
      </LineChart>
    </>
  );
};

export default SevenDayChart;
