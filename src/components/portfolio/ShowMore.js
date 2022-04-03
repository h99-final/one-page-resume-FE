import React, { useEffect, useRef, useState } from "react";
import { apis } from "../../shared/axios";
//style
import styled from "styled-components";
import { TroubleShootingContainer } from "../../pages/Project";
//component
import TroubleShooting from "../project/view/TroubleShooting";
import { Link } from "react-scroll";

function ShowMore(props) {
  const { id, color, fontcolor } = props;

  const scrollTS = useRef(null);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const [show, setShow] = useState(false);
  const [troubleShootings, setTroubleShootings] = useState([]);

  useEffect(() => {
    if (show) {
      apis
        .projectTSGet(id)
        .then((res) => setTroubleShootings(res.data.data))
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.data.errors[0].message);
          }
        });
      scrollTS.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (!show) {
      setTroubleShootings([]);
    }
    return;
  }, [show]);

  console.log(troubleShootings);

  return (
    <>
      {!!show
        ? troubleShootings.map((e, i) => {
            return (
              <TroubleShootingContainer key={`troubleShooting-${i}`}>
                {e.tsFiles.map((t, i) => {
                  return (
                    <div
                      id={`troubleShooting-${e.commitId}-${i}`}
                      key={`t.fileId=${i}`}
                    >
                      <TroubleShooting
                        color={color}
                        fontcolor={fontcolor}
                        troubleShootingLength={e.tsFiles.length}
                        index={i}
                        linkIndex={e.commitId}
                        {...e}
                        {...t}
                      />
                    </div>
                  );
                })}
              </TroubleShootingContainer>
            );
          })
        : null}
      <SampleButton
        color={color}
        fontcolor={fontcolor}
        ref={scrollTS}
        onClick={handleShow}
      >
        {show ? (
          <img
            alt="show"
            src={process.env.PUBLIC_URL + "/img/UpArrowWhite.svg"}
          />
        ) : (
          <img
            style={{ transform: `rotate(180deg)` }}
            alt="show"
            src={process.env.PUBLIC_URL + "/img/UpArrowWhite.svg"}
          />
        )}
      </SampleButton>
    </>
  );
}

const SampleButton = styled.div`
  /* position: relative; */
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 50px 0px;
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.fontcolor === "#fff"
      ? "rgba(66, 68, 83, 1)"
      : "rgba(237, 237, 237, 1)"};
  border-radius: 10px;
  &:hover {
    background-color: ${(props) =>
      props.color === "rgba(256,256,256, 0.9)"
        ? "rgba(0, 196, 180, 1)"
        : `${props.color}`};
    transition: all 1s ease;
  }
  cursor: pointer;

  /* flex-shrink: 0; */
`;

export default ShowMore;
