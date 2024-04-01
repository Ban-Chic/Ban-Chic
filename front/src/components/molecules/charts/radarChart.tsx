import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import theme from "../../../styles/Theme";

interface Props {
  season: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
    day: number;
    night: number;
  };
}

function RadarChartContainer(Props: Props) {
  const data = [
    {
      subject: "Day",
      A: Props.season.day,
      fullMark: 100,
    },
    {
      subject: "Summer",
      A: Props.season.summer,
      fullMark: 100,
    },
    {
      subject: "Winter",
      A: Props.season.winter,
      fullMark: 100,
    },
    {
      subject: "Night",
      A: Props.season.night,
      fullMark: 100,
    },
    {
      subject: "Fall",
      A: Props.season.fall,
      fullMark: 100,
    },
    {
      subject: "Spring",
      A: Props.season.spring,
      fullMark: 100,
    },
  ];

  return (
    <>
      <SContainer>
        <SDiv>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis dataKey="subject" stroke="white" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Seasonality"
                dataKey="A"
                stroke="white"
                fill={theme.color.primaryColor}
                fillOpacity={0.6}
                legendType="diamond"
                isAnimationActive={true}
                animationBegin={1}
                animationEasing="ease-in-out"
              />

              <Legend />
              <Tooltip wrapperStyle={{ color: theme.color.sectionColor }} />
            </RadarChart>
          </ResponsiveContainer>
        </SDiv>
      </SContainer>
    </>
  );
}

const SContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SDiv = styled.div`
  ${theme.font.Body1};
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
`;

export default RadarChartContainer;
