import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const UserInfo = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [user, setUser] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    apis.introPorfGet(id).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  return (
    <>
      <Container>
        <UserInfoBox>
          <ImageBox>
            <Image>
              <img alt="ㅡ" src={user?.profileImage} />
            </Image>
          </ImageBox>
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
        </UserInfoBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 1050px;
  display: inline;
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
  width: 48%;
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
    color: #ffffff;
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
    color: #ffffff;
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
    background-color: #393a47;
    padding: 10px 15px;
    margin-bottom: 10px;
    align-items: center;
    a {
      color: #cfd3e2;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      text-decoration: none;
      :visited {
        color: #cfd3e2;
      }
      :link {
        color: #cfd3e2;
      }
    }
  }
`;

export default UserInfo;
