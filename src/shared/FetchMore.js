import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

export const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setPage((page) => page + 1);
  });
  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  if (loading) {
    return (
      <div ref={fetchMoreTrigger}>
        <Spinner />
      </div>
    );
  } else {
    return <div ref={fetchMoreTrigger}></div>;
  }
};

export const Fetch = styled.div`
  display: ${(props) => (props.loading ? "fix" : "none")};
`;
