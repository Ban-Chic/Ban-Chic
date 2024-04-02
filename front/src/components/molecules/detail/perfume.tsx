import { useEffect } from "react";
import useGetPerfumeDetail from "../../../hooks/info/useGetDetail";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import styled from "styled-components";
import NoteGroup from "./noteGroup";
import { SBody1, SSubTitle } from "../../../styles/Font";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";

function PerfumeSummary({ pid }: { pid: number }) {
  const { data, isLoading, refetch } = useGetPerfumeDetail(String(pid));
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) <LoadingSpinner />;
  if (data)
    return (
      <SContatiner
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        as={Link}
        to={Page_Url.PerfumeDetail + data.data.id}
      >
        <SImg $url={data.data.perfumeImg}></SImg>
        <SFlex>
          <SSubTitle>{data.data.perfumeName}</SSubTitle>
          <SBody1>{data.data.brandName}</SBody1>
        </SFlex>
        <SNote>
          {JSON.parse(data.data.notes)["TopNotes"] && (
            <NoteGroup notes={JSON.parse(data.data.notes)["TopNotes"]} />
          )}
          {JSON.parse(data.data.notes)["MiddleNotes"] && (
            <NoteGroup notes={JSON.parse(data.data.notes)["MiddleNotes"]} />
          )}
          {JSON.parse(data.data.notes)["BaseNotes"] && (
            <NoteGroup notes={JSON.parse(data.data.notes)["BaseNotes"]} />
          )}
        </SNote>
      </SContatiner>
    );
}

const SFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SNote = styled.span`
  display: flex;
  padding: 0 0.2em;
`;

const SImg = styled.div<{ $url: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
`;

const SContatiner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

export default PerfumeSummary;
