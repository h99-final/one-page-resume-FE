import React from "react";
import styled from "styled-components";

function PortfolioFooter({ fontcolor }) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  return (
    <Section fontcolor={fontcolor}>
      <Star
        fontcolor={fontcolor}
        onClick={() => window.open(`${userInfo.gitUrl}`)}
      >
        {fontcolor === "#fff" ? (
          <img
            style={{ color: "black", width: "28px", margin: "3px" }}
            alt="star"
            src={process.env.PUBLIC_URL + "/img/star.svg"}
          />
        ) : (
          <img
            style={{ color: "black", width: "28px", margin: "3px" }}
            alt="star"
            src={process.env.PUBLIC_URL + "/img/starBlack.svg"}
          />
        )}
        Star on Github
      </Star>
      {/* 
      <Bookmark onClick={() => alert("준비중")}>
        <img
          style={{ color: "black", width: "28px", margin: "3px" }}
          alt="star"
          src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
        />
        북마크 추가
      </Bookmark> */}
    </Section>
  );
}

const Section = styled.section`
  height: 480px;
  width: 100%;
  background-color: ${(props) =>
    props.fontcolor === "#fff" ? "#000" : "#ededed"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 200px;
  height: 60px;
  border-radius: 30px;
  border: 1px solid ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")};
  background-color: transparent;
  color: ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")};
  margin-right: 20px;
`;

const Bookmark = styled(Star)`
  margin-left: 20px;
`;

export default PortfolioFooter;
