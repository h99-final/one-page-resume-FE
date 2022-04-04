import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Spinner() {
  const [time, setTime] = useState(1);
  const [isIncrease, setIsIncrease] = useState(false);
  useEffect(() => {
    function tick() {
      return setTimeout(() => setTime((time + 1) % 5), 500);
    }
    // if (!isIncrease) return undefined;
    tick();
    return () => {
      clearTimeout(tick);
    };
    // }, [time, isIncrease]);
  }, [time]);

  return (
    <>
      <SpinnerContainer>
        <img
          alt="로딩중"
          src={process.env.PUBLIC_URL + "/img/loadingFont.svg"}
        />
        <></>
        {time >= 1 ? (
          <>
            <img alt="" src={process.env.PUBLIC_URL + "/img/andoperator.svg"} />
            <img alt="" src={process.env.PUBLIC_URL + "/img/andoperator.svg"} />
          </>
        ) : null}
        {time >= 2 ? (
          <img alt="" src={process.env.PUBLIC_URL + "/img/rightarrow.svg"} />
        ) : null}
        {time >= 3 ? (
          <img
            alt="option"
            src={process.env.PUBLIC_URL + "/img/optionalchaining.svg"}
          />
        ) : null}
        {time >= 4 ? (
          <img alt="%" src={process.env.PUBLIC_URL + "/img/percent.svg"} />
        ) : null}
      </SpinnerContainer>
    </>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Font = styled.div`
  position: static;
  /* width: 238px; */
  height: 56px;
  left: 10px;
  top: 10px;

  font-family: "Determination Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 56px;
  /* identical to box height, or 93% */

  letter-spacing: -0.022em;

  color: #000000;
`;

export default Spinner;
