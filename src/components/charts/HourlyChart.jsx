import { BarChart, Bar, XAxis, YAxis, Label } from "recharts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const HourlyChart = ({ data }) => {
  let formattedData = data.map((entry) => {
    let timestamp = Date.parse(entry.created_at);
    let timestampHour = new Date(timestamp).toTimeString().substring(0, 2);
    return { timer_length: entry.timer_length, created_time: timestampHour };
  });
  console.log("original", data);

  function convertDataToUserTimezone() {
    const userTz = dayjs.tz.guess();
    const convertedData = data.map((entry) => ({
      timer_length: entry.timer_length,
      created_at: dayjs.utc(entry.created_at).tz(userTz).format("HH:mm:ss"),
      time_zone: userTz,
    }));
    console.log("converted", convertedData);
  }
  convertDataToUserTimezone();

  function getHourlyData() {
    let hourlyData = [];
    for (let i = 0; i < 24; i++) {
      let hour = i.toString();
      if (hour.length < 2) {
        hour = "0" + hour;
      }

      let filtered = formattedData.filter((entry) =>
        entry.created_time.startsWith(hour)
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

  return (
    <>
      <h2>At which hours have you focused most?</h2>
      <BarChart width={730} height={250} data={hourlyData} overflow="visible">
        <Bar dataKey="total" className="fill-accent" />
        <XAxis dataKey="hour">
          <Label value="Hour of day" position="bottom" />
        </XAxis>
        <YAxis
          label={{ value: "Focus minutes", angle: -90, position: "left" }}
        />
      </BarChart>
    </>
  );
};

export default HourlyChart;
