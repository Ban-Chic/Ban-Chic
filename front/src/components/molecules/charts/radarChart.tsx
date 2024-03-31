import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import theme from "../../../styles/Theme";

interface Props {
  season: {
    day: string;
    night: string;
    spring: string;
    summer: string;
    fall: string;
    winter: string;
  };
}

function RadarChartContainer(Props: Props) {
  const data = [
    {
      subject: "Day",
      // A: 100,
      A: parseFloat(Props.season.day),
      fullMark: 100,
    },
    {
      subject: "Summer",
      A: parseFloat(Props.season.summer),
      fullMark: 100,
    },
    {
      subject: "Winter",
      A: parseFloat(Props.season.winter),
      fullMark: 100,
    },
    {
      subject: "Night",
      A: parseFloat(Props.season.night),
      fullMark: 100,
    },
    {
      subject: "Fall",
      A: parseFloat(Props.season.fall),
      fullMark: 100,
    },
    {
      subject: "Spring",
      A: parseFloat(Props.season.spring),
      fullMark: 100,
    },
  ];

  return (
    <>
      <SContainer>
        <SDiv>
          <RadarChart
            width={300}
            height={270}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={data}
            margin={{ top: 15, bottom: 0 }}
          >
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Seasonality"
              dataKey="A"
              stroke="white"
              fill="yellow"
              fillOpacity={0.6}
              legendType="diamond"
              isAnimationActive={true}
              animationBegin={1}
              animationEasing="ease-in-out"
            />
            <Legend />
            <Tooltip />
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
  ${theme.font.Body1};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default RadarChartContainer;
