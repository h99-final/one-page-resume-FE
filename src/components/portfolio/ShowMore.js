import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apis } from "../../shared/axios";
import TSPortfolio from "./view/TSPortfolio";

function ShowMore() {
  const [show, setShow] = useState(false);
  const [is_loading, setIs_loading] = useState(true);
  const [troubleShootings, setTroubleShootings] = useState([]);

  const handleTroubleShootingsClick = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    apis
      .projectTSGet(1)
      .then((res) => setTroubleShootings(res.data.data))
      .then(setIs_loading(false));
  }, [show]);

  return (
    <>
      <div>
        <button onClick={handleTroubleShootingsClick}>Show</button>
      </div>
    </>
  );
}

const SampleCard = styled.div`
  /* position: relative; */
  width: 100vw;
  height: 100%;
  margin-right: 75px;
  /* flex-shrink: 0; */
`;

export default ShowMore;
