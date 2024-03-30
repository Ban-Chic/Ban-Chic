import styled from "styled-components";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PieChartContainer() {
  return (
    <>
      <SContainer>
        <h1>PieChart</h1>
        <SDiv>
          <PieChart width={290} height={250}>
            <Tooltip />
            <Pie
              data={data}
              cx={120}
              cy={120}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </SDiv>
      </SContainer>
    </>
  );
}

const SContainer = styled.div``;

const SDiv = styled.div`
  /* display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center; */
  margin: 0 auto;
`;

export default PieChartContainer;
