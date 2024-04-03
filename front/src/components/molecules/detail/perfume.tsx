import { useEffect } from "react";
import useGetPerfumeDetail from "../../../hooks/info/useGetDetail";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import styled from "styled-components";
import { SBody1, SSubTitle } from "../../../styles/Font";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";
import NoteGroupwrap from "./noteGroupwrap";
function PerfumeSummary({ pid }: { pid: number }) {
  const { data, isLoading, refetch } = useGetPerfumeDetail(String(pid));
  useEffect(() => {
    refetch();
  }, [pid, refetch]);
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
          <SSubTitle>{data.data.koreanName}</SSubTitle>
          <SBody1>{data.data.brandName}</SBody1>
        </SFlex>
        <SNote>
          {JSON.parse(data.data.notes)["TopNotes"] && (
            <NoteGroupwrap notes={JSON.parse(data.data.notes)["TopNotes"]} />
          )}
          {JSON.parse(data.data.notes)["MiddleNotes"] && (
            <NoteGroupwrap notes={JSON.parse(data.data.notes)["MiddleNotes"]} />
          )}
          {JSON.parse(data.data.notes)["BaseNotes"] && (
            <NoteGroupwrap notes={JSON.parse(data.data.notes)["BaseNotes"]} />
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
  text-align: center;
`;

const SNote = styled.span`
  display: grid;
  padding: 0 0.2em;
  grid-template-columns: repeat(auto-fill, 2.5em);
  justify-content: center;
  gap: 3px;
`;

const SImg = styled.div<{ $url: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
`;

const SContatiner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

export default PerfumeSummary;
