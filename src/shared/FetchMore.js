import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

export const FetchMore = ({ is_loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setPage((page) => page + 1);
  });
  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve();
    };
  }, []);

  return (
    <Fetch loading={is_loading ? "loading" : null} ref={fetchMoreTrigger}>
      <Spinner />
    </Fetch>
  );
};

export const Fetch = styled.div`
  display: ${(props) => (props.is_loading ? "block" : "none")};
`;
