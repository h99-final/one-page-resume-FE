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
  const { id } = props;
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
    // return setShow(false);
  }, [show]);

  return (
    <>
      <SampleButton ref={scrollTS} onClick={handleShow}>
        Show
      </SampleButton>
      {!!show
        ? troubleShootings.map((e, i) => {
            return (
              <TroubleShootingContainer key={i}>
                {e.tsFiles.map((t, i) => {
                  return (
                    <TroubleShooting
                      key={t.fileId}
                      {...e}
                      {...t}
                      tsLength={e.tsFiles.length}
                    />
                  );
                })}
              </TroubleShootingContainer>
            );
          })
        : null}
    </>
  );
}

const SampleButton = styled.div`
  /* position: relative; */
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 50px;
  width: 100%;
  height: 50px;
  background: #424453;
  border-radius: 10px;
  &:hover {
    background: #00c4b4;
    transition: all 1s ease;
  }
  cursor: pointer;

  /* flex-shrink: 0; */
`;

export default ShowMore;
