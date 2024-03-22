import styled from "styled-components";
import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    subject: "Day",
    A: 100,
    fullMark: 100,
  },
  {
    subject: "Summer",
    A: 71.1538,
    fullMark: 100,
  },
  {
    subject: "Winter",
    A: 34.6154,
    fullMark: 100,
  },
  {
    subject: "Night",
    A: 19.2308,
    fullMark: 100,
  },
  {
    subject: "Fall",
    A: 46.1538,
    fullMark: 100,
  },
  {
    subject: "Spring",
    A: 90.3846,
    fullMark: 100,
  },
];

function RadarChartContainer() {
  return (
    <>
      <SContainer>
        <h1>RadarChart</h1>
        <SDiv>
          <RadarChart
            width={310}
            height={270}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={data}
            margin={{top: 15, bottom:0}}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="향수 A"
              dataKey="A"
              stroke="#e2113f"
              fill="#e2113f"
              fillOpacity={0.6}
              legendType="diamond"
              isAnimationActive={true}
              animationBegin={1}
              animationEasing="ease-in-out"
            />
            <Legend />
            <Tooltip/>
          </RadarChart>
        </SDiv>
      </SContainer>
    </>
  );
}

const SContainer = styled.div`
  padding: 10px;
`;

const SDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default RadarChartContainer;
