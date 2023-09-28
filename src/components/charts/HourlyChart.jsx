import { BarChart, Bar, XAxis, YAxis, Label } from "recharts";

const HourlyChart = ({ data }) => {
  const mock = [
    { timer_length: 20, created_time: "17:57:28" },
    { timer_length: 20, created_time: "18:27:04" },
    { timer_length: 20, created_time: "20:10:26" },
    { timer_length: 20, created_time: "20:38:16" },
    { timer_length: 20, created_time: "22:06:01" },
    { timer_length: 20, created_time: "19:25:10" },
    { timer_length: 20, created_time: "19:52:05" },
    { timer_length: 20, created_time: "21:00:03" },
    { timer_length: 20, created_time: "01:46:57" },
    { timer_length: 20, created_time: "17:56:42" },
    { timer_length: 20, created_time: "18:43:40" },
    { timer_length: 20, created_time: "19:29:30" },
    { timer_length: 20, created_time: "23:03:05" },
    { timer_length: 20, created_time: "23:42:53" },
    { timer_length: 20, created_time: "20:52:59" },
    { timer_length: 20, created_time: "21:22:44" },
    { timer_length: 20, created_time: "23:11:20" },
    { timer_length: 20, created_time: "23:11:20" },
    { timer_length: 20, created_time: "17:55:23" },
    { timer_length: 20, created_time: "19:24:26" },
    { timer_length: 20, created_time: "20:02:19" },
    { timer_length: 20, created_time: "20:31:39" },
    { timer_length: 20, created_time: "22:00:37" },
    { timer_length: 20, created_time: "00:25:06" },
    { timer_length: 20, created_time: "01:29:43" },
    { timer_length: 20, created_time: "01:56:27" },
    { timer_length: 20, created_time: "02:28:52" },
    { timer_length: 20, created_time: "18:25:50" },
    { timer_length: 20, created_time: "18:55:18" },
    { timer_length: 20, created_time: "20:40:09" },
    { timer_length: 20, created_time: "21:32:13" },
    { timer_length: 20, created_time: "22:35:20" },
  ];

  function getHourlyData() {
    let hourlyData = [];
    for (let i = 0; i < 24; i++) {
      let hour = i.toString();
      if (hour.length < 2) {
        hour = "0" + hour;
      }

      let filtered = mock.filter((entry) =>
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
