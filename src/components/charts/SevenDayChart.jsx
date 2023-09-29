import { LineChart, Line, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";

const SevenDayChart = ({ data }) => {
  function formatData(array) {
    return array.map((entry) => ({
      timer_length: entry.timer_length,
      created_at: dayjs(entry.created_at).format("MM-DD"),
    }));
  }

  function getDailyData() {
    // get the dates of last 7 days in format of mm-dd
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
    console.log(datesAndTotalMins);

    // loop thru each date
    // filter the arr to current date
    // then find the total min of entries for that date
    // push to an array an object {date, totalMin}
  }
  getDailyData();

  return (
    <>
      {/* <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart> */}
    </>
  );
};

export default SevenDayChart;
