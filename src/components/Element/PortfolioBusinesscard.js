import React from "react";
import styled from "styled-components";

function PortfolioBuisnesscard(props) {
  const {
    id,
    title,
    userStack,
    content,
    bookmarkCount,
    imageUrl,
    username,
    job,
    templateIdx,
  } = props;

  return (
    <>
      <Portfolio
        background={
          templateIdx === 0
            ? "https://s3.amazonaws.com/www.poug.me/namecard/0.svg"
            : templateIdx === 1
            ? "https://s3.amazonaws.com/www.poug.me/namecard/1-1.svg"
            : templateIdx === 2
            ? "https://s3.amazonaws.com/www.poug.me/namecard/1-2.svg"
            : templateIdx === 3
            ? "https://s3.amazonaws.com/www.poug.me/namecard/1-3.svg"
            : templateIdx === 4
            ? "https://s3.amazonaws.com/www.poug.me/namecard/2-1.svg"
            : templateIdx === 5
            ? "https://s3.amazonaws.com/www.poug.me/namecard/2-2.svg"
            : templateIdx === 6
            ? "https://s3.amazonaws.com/www.poug.me/namecard/2-3.svg"
            : templateIdx === 7
            ? "https://s3.amazonaws.com/www.poug.me/namecard/3-1.svg"
            : templateIdx === 8
            ? "https://s3.amazonaws.com/www.poug.me/namecard/3-2.svg"
            : templateIdx === 9
            ? "https://s3.amazonaws.com/www.poug.me/namecard/3-3.svg"
            : templateIdx === 10
            ? "https://s3.amazonaws.com/www.poug.me/namecard/4-1.svg"
            : templateIdx === 11
            ? "https://s3.amazonaws.com/www.poug.me/namecard/4-2.svg"
            : templateIdx === 12
            ? "https://s3.amazonaws.com/www.poug.me/namecard/4-3.svg"
            : templateIdx === 13
            ? "https://s3.amazonaws.com/www.poug.me/namecard/1.svg"
            : null
        }
        templateIdx={templateIdx}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <NnE>
            <h2>{username ? username : "ㅡ"}</h2>
            <h3>{job ? job : "ㅡ"}</h3>
            <h4>{title ? title : "ㅡ"}</h4>
          </NnE>
          <Content>
            {userStack?.map((e, i) => {
              return <Stack key={`stack-${i}`}>{e}</Stack>;
            })}
          </Content>
        </div>
      </Portfolio>
    </>
  );
}

const Stack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: #cfd3e2; */
  border: 1px solid
    ${(props) =>
      props.templateIdx === 0 ||
      props.templateIdx === 4 ||
      props.templateIdx === 5 ||
      props.templateIdx === 6 ||
      props.templateIdx === 10 ||
      props.templateIdx === 11 ||
      props.templateIdx === 12
        ? "#fff"
        : "#000"};
  box-sizing: border-box;
  border-radius: 30px;
  padding: 10px 20px;
  width: fit-content;
  height: 100%;
  margin-right: 2.8%;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: flex-start;
  /* justify-content: space-around; */
  /* width: 351px; */
  height: 7.9%;
  margin-bottom: 10%;
  margin-left: 5.6%;
`;
const Portfolio = styled.div`
  position: absolute;
  margin: 10px 0px;
  /* background-color: #414457; */
  /* background-image: url("https://s3.amazonaws.com/www.poug.me/namecard/0.svg"); */
  background-size: 100%;
  /* background-repeat: no-repeat; */
  background-image: ${(props) => `url(${props.background})`};
  /* width: 444px;
  height: 502px; */
  width: 327px;
  height: 370px;
  border-radius: 10px;
  color: ${(props) =>
    props.templateIdx === 0 ||
    props.templateIdx === 4 ||
    props.templateIdx === 5 ||
    props.templateIdx === 6 ||
    props.templateIdx === 10 ||
    props.templateIdx === 11 ||
    props.templateIdx === 12
      ? "#fff"
      : "#000"};
  @media only screen and (min-width: 1900px) {
  }
`;

const NnE = styled.div`
  position: relative;
  margin: 0px 5.6%;
  h2 {
    width: 100%;
    margin-top: 10%;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
  h3 {
    margin-top: 4%;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
  h4 {
    margin-top: 16.9%;
    height: 150px;
    margin-bottom: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.01em;
  }
`;
export default PortfolioBuisnesscard;
