import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    value1: 200,
    // value2: 300,
    type: "gd1",
    name: "하이요",
  },
  {
    value1: 120,
    // value2: 250,
  },
  {
    value1: 100,
    // value2: 200,
  },
];

// const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];

function BarChartContainer() {
  return (
    <>
      <div>
        <div>bar chart</div>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="#e86f18"
            fillOpacity={0}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis width={20} type="category" dataKey="type" offset={10} />
          <Tooltip />
          <Legend />
          <Bar
            radius={[0, 30, 30, 0]}
            dataKey="value1"
            fill="#6123d5"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            stackId="a"
          />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </>
  );
}

export default BarChartContainer;
