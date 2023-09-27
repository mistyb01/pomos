import { BarChart, Bar, XAxis, YAxis } from "recharts";

function HourlyChart() {
  const data = [
    {
      id: 13,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-17T17:57:28.395+00:00",
      timer_length: 20,
    },
    {
      id: 14,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-17T18:27:04.323+00:00",
      timer_length: 20,
    },
    {
      id: 16,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-18T20:10:26.788+00:00",
      timer_length: 20,
    },
    {
      id: 17,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-18T20:38:16.053+00:00",
      timer_length: 20,
    },
    {
      id: 18,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-18T22:06:01.244+00:00",
      timer_length: 20,
    },
    {
      id: 19,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-19T19:25:10.025+00:00",
      timer_length: 20,
    },
    {
      id: 20,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-19T19:52:05.819+00:00",
      timer_length: 20,
    },
    {
      id: 21,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-19T21:00:03.698+00:00",
      timer_length: 20,
    },
    {
      id: 22,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T01:46:57.334+00:00",
      timer_length: 20,
    },
    {
      id: 24,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T17:56:42.87+00:00",
      timer_length: 20,
    },
    {
      id: 25,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T18:43:40.136+00:00",
      timer_length: 20,
    },
    {
      id: 26,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T19:29:30.433+00:00",
      timer_length: 20,
    },
    {
      id: 27,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T23:03:05.875+00:00",
      timer_length: 20,
    },
    {
      id: 28,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-20T23:42:53.781+00:00",
      timer_length: 20,
    },
    {
      id: 29,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-21T20:52:59.184+00:00",
      timer_length: 20,
    },
    {
      id: 30,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-21T21:22:44.117+00:00",
      timer_length: 20,
    },
    {
      id: 31,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-21T23:11:20.142+00:00",
      timer_length: 20,
    },
    {
      id: 32,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-21T23:11:20.038+00:00",
      timer_length: 20,
    },
    {
      id: 33,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-25T17:55:23.394+00:00",
      timer_length: 20,
    },
    {
      id: 34,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-25T19:24:26.41+00:00",
      timer_length: 20,
    },
    {
      id: 35,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-25T20:02:19.717+00:00",
      timer_length: 20,
    },
    {
      id: 36,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-25T20:31:39.503+00:00",
      timer_length: 20,
    },
    {
      id: 37,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-25T22:00:37.608+00:00",
      timer_length: 20,
    },
    {
      id: 38,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T00:25:06.234+00:00",
      timer_length: 20,
    },
    {
      id: 39,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T01:29:43.789+00:00",
      timer_length: 20,
    },
    {
      id: 40,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T01:56:27.036+00:00",
      timer_length: 20,
    },
    {
      id: 41,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T02:28:52.591+00:00",
      timer_length: 20,
    },
    {
      id: 42,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T18:25:50.92+00:00",
      timer_length: 20,
    },
    {
      id: 43,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T18:55:18.744+00:00",
      timer_length: 20,
    },
    {
      id: 44,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T20:40:09.595+00:00",
      timer_length: 20,
    },
    {
      id: 45,
      user_id: "08a451bd-14e6-46a7-9ca8-7e9ab62d9fe5",
      created_at: "2023-09-26T21:32:13.472+00:00",
      timer_length: 20,
    },
  ];

  const test = [
    {
      hour: "1:00",
      total: 40,
    },
    {
      hour: "2:00",
      total: 60,
    },
    {
      hour: "3:00",
      total: 50,
    },
    {
      hour: "4:00",
      total: 40,
    },
  ];
  return (
    <>
      <BarChart width={730} height={250} data={test}>
        <Bar dataKey="total" fill="#8884d8" />
        <XAxis dataKey="hour" />
        <YAxis />
      </BarChart>
    </>
  );
}

export default HourlyChart;
