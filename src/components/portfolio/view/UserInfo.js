import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const UserInfo = ({ templateIdx, color, fontcolor }) => {
  const { id } = useParams();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [user, setUser] = useState(null);
  const [img, setImg] = useState();

  useEffect(() => {
    apis.introPorfGet(id).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  return (
    <>
      {templateIdx <= 6 && templateIdx >= 1 ? (
        <>
          <Container templateIdx={templateIdx}>
            <LeftBox>
              <InfoBox>
                <h1>{user?.username ? user?.username : "ㅡ"}</h1>
                <h2>{user?.job ? user?.job : "ㅡ"}</h2>
                <h3>
                  <img
                    style={{ marginRight: "10px" }}
                    width="20"
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/Vector.svg"}
                  />
                  {user?.phoneNum ? user.phoneNum : "ㅡ"}
                </h3>
                <h3 style={{ marginBottom: "35px" }}>
                  <img
                    style={{ marginRight: "10px" }}
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/Mail.svg"}
                  />
                  {user?.email ? user?.email : "ㅡ"}
                </h3>
                <h4>
                  <img
                    style={{ marginRight: "10px" }}
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/link.svg"}
                  />
                  <a href={user?.githubUrl} target="_blank">
                    {user?.githubUrl}
                  </a>
                </h4>
                <h4>
                  <img
                    style={{ marginRight: "10px" }}
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/link.svg"}
                  />
                  <a href={user?.blogUrl} target="_blank">
                    {user?.blogUrl}
                  </a>
                </h4>
              </InfoBox>
            </LeftBox>

            {!user?.profileImage ? (
              <RightBox>
                <img
                  alt="ㅡ"
                  src={`https://s3.amazonaws.com/www.poug.me/template/1-${
                    templateIdx % 3
                  }userInfoFalse.svg`}
                />
              </RightBox>
            ) : (
              <RightBox user={user.profileImage ? true : false} color={color}>
                <ImageBox>
                  <Image templateIdx={templateIdx}>
                    <img
                      alt="ㅡ"
                      src={
                        user?.profileImage
                          ? user?.profileImage
                          : `https://s3.amazonaws.com/www.poug.me/template/1-${
                              templateIdx % 3
                            }userInfoFalse.svg`
                      }
                    />
                  </Image>
                </ImageBox>
              </RightBox>
            )}
          </Container>
        </>
      ) : (
        <Container fontcolor={fontcolor} templateIdx={templateIdx}>
          <UserInfoBox>
            {!user?.profileImage === "empty" ? (
              <ImageBox>
                <Image>
                  <img
                    alt="ㅡ"
                    src={
                      user?.profileImage
                        ? user?.profileImage
                        : "https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/welcome.png"
                    }
                  />
                </Image>
              </ImageBox>
            ) : null}
            <InfoBox color={color} fontcolor={fontcolor}>
              <h1>{user?.username ? user?.username : "ㅡ"}</h1>
              <h2>{user?.job ? user?.job : "ㅡ"}</h2>
              <h3>
                <img
                  style={{ marginRight: "10px" }}
                  width="20"
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/Vector.svg"}
                />
                {user?.phoneNum ? user.phoneNum : "ㅡ"}
              </h3>
              <h3 style={{ marginBottom: "35px" }}>
                <img
                  style={{ marginRight: "10px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/Mail.svg"}
                />
                {user?.email ? user?.email : "ㅡ"}
              </h3>
              <h4 fontcolor={fontcolor}>
                <img
                  style={{ marginRight: "10px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/link.svg"}
                />
                <Link
                  fontcolor={fontcolor}
                  href={user?.githubUrl}
                  target="_blank"
                >
                  {user?.githubUrl}
                </Link>
              </h4>
              {user?.blogUrl?.length > 0 ? (
                <h4 fontcolor={fontcolor}>
                  <img
                    style={{ marginRight: "10px" }}
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/link.svg"}
                  />
                  <Link
                    fontcolor={fontcolor}
                    href={user?.blogUrl}
                    target="_blank"
                  >
                    {user?.blogUrl}
                  </Link>
                </h4>
              ) : null}
            </InfoBox>
          </UserInfoBox>
        </Container>
      )}
    </>
  );
};
const RightBox = styled.div`
  width: 50%;
  background-color: ${(props) => (props.user ? props.color : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftBox = styled.div`
  width: 45%;
  margin: 0 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  height: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "700px" : "1050px"};
  display: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "flex" : "inline"};
  color: ${(props) => props.fontcolor};
`;

const UserInfoBox = styled.div`
  margin: 150px auto;
  width: 100%;
  height: 750px;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    border-radius: 160px;
    z-index: 1;
    &:hover {
    }
  }
`;

const ImageBox = styled.div`
  width: 380px;
  height: 380px;
  margin: 0px auto;
`;

const InfoBox = styled.div`
  width: 98%;
  margin: 0px auto;
  height: 330px;
  position: relative;
  text-align: center;
  margin-top: 37px;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    letter-spacing: -0.01em;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 35px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #9f9f9f;
  }
  h3 {
    width: fit-content;
    display: flex;
    margin: 0px auto;
    font-style: normal;
    font-weight: 400;
    height: fit-content;
    font-size: 17px;
    margin-bottom: 10px;
    align-items: center;
  }
  img {
    margin-right: 5px;
  }
  h4 {
    display: flex;
    margin: 0px auto;
    width: fit-content;
    min-width: fit-content;
    height: fit-content;
    border-radius: 30px;
    background-color: ${(props) =>
      props.fontcolor === "#fff" ? "#393a47" : "#ededed"};
    padding: 10px 15px;
    margin-bottom: 10px;
    align-items: center;
    a {
      color: ${(props) => (props.fontcolor === "#fff" ? "#cfd3e2" : "#555555")};
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      text-decoration: none;
      :visited {
        color: ${(props) =>
          props.fontcolor === "#fff" ? "#cfd3e2" : "#555555"};
      }
      :link {
        color: ${(props) =>
          props.fontcolor === "#fff" ? "#cfd3e2" : "#555555"};
      }
    }
  }
`;

export default UserInfo;
