import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
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
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <PolarAngleAxis
                dataKey="subject"
                stroke="white"
                tick={{ fontSize: "20px" }}
                tickLine={false}
              />
              <Radar
                name="계절감"
                dataKey="A"
                stroke="white"
                fill={theme.color.primaryColor}
                fillOpacity={0.6}
                legendType="diamond"
                isAnimationActive={true}
                animationBegin={1}
                animationEasing="ease"
              />

              <Tooltip
                content={<CustomTooltip />}
                labelFormatter={(value) => `Subject: ${value}`}
                filterNull={true}
                cursor={{ strokeDasharray: "3 3" }}
                wrapperStyle={{
                  color: "black",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid #aaa",
                  borderRadius: "15px",
                  padding: "5px",
                }}
                contentStyle={{ padding: "10px" }}
                itemStyle={{ color: "#000" }}
                separator=" -> "
              />
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
      </div>
    );
  }

  return null;
};

const getIntroOfPage = (label: string) => {
  if (label === "Day") {
    return "낮과 어울리는 향";
  }
  if (label === "Spring") {
    return "봄과 어울리는 향";
  }
  if (label === "Summer") {
    return "여름과 어울리는 향";
  }
  if (label === "Fall") {
    return "가을과 어울리는 향";
  }
  if (label === "Winter") {
    return "겨울과 어울리는 향";
  }
  if (label === "Night") {
    return "밤과 어울리는 향";
  }
  return "";
};

export default RadarChartContainer;
