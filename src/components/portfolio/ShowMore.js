import React, { useEffect, useRef, useState } from "react";
import { apis } from "../../shared/axios";
//redux
import { useDispatch } from "react-redux";
import { actionCreators as troubleShootingActions } from "../../redux/modules/setProject";
//style
import styled from "styled-components";
import { TroubleShootingContainer } from "../../pages/Project";
//component
import TroubleShooting from "../project/view/TroubleShooting";

function ShowMore(props) {
  const { id, color, fontcolor } = props;
  const dispatch = useDispatch();

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
      scrollTS.current.scrollIntoView();
    }
    if (!show) {
      setTroubleShootings([]);
    }
    return;
  }, [show]);

  return (
    <>
      {!!show
        ? troubleShootings.map((e, i) => {
            return (
              <TroubleShootingContainer key={`troubleShooting-${i}`}>
                {e.tsFiles.map((t, i) => {
                  return (
                    <div
                      id={`troubleShooting-${t.fileId}-${i}`}
                      key={`t.fileId=${i}`}
                    >
                      <TroubleShooting
                        color={color}
                        fontcolor={fontcolor}
                        tsLength={troubleShootings[i].tsFiles?.length}
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
      <SampleButton color={color} ref={scrollTS} onClick={handleShow}>
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
  background-color: ${(props) => props.color};
  border-radius: 10px;
  &:hover {
    //ToDO
    background: #00c4b4;
    transition: all 1s ease;
  }
  cursor: pointer;

  /* flex-shrink: 0; */
`;

export default ShowMore;
