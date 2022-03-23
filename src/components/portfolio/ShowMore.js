import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { apis } from "../../shared/axios";
import { actionCreators as troubleShootingActions } from "../../redux/modules/setProject";

function ShowMore(props) {
  const { show, setShow, id } = props;
  const dispatch = useDispatch();
  const [is_loading, setIs_loading] = useState(true);
  const [troubleShootings, setTroubleShootings] = useState([]);

  const scrollTS = useRef(null);

  const handleShow = () => {
    setShow((prev) => !prev);
    console.log(show);
  };

  useEffect(() => {
    if (show) {
      dispatch(troubleShootingActions.setTroubleShootingDB(id));
      scrollTS.current.scrollIntoView();
    }
  }, [show]);

  return (
    <>
      <SampleButton ref={scrollTS} onClick={handleShow}>
        Show
      </SampleButton>
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

  /* flex-shrink: 0; */
`;

export default ShowMore;
