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
              <img width="350px" alt="ㅡ" src={user?.profileImage} />
            </Image>
          </ImageBox>
          <InfoBox>
            <h1>{user?.username ? user?.username : "ㅡ"}</h1>
            <h2>{user?.job ? user?.job : "ㅡ"}</h2>
            <p></p>
            <h3>
              <img
                style={{ marginRight: "10px" }}
                width="20"
                alt=""
                src={process.env.PUBLIC_URL + "/img/Vector.svg"}
              />
              {user?.phoneNum ? user.phoneNum : "ㅡ"}
            </h3>
            <h3>
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
  min-width: 800px;
  max-width: 1440px;
  height: 650px;
  display: flex;
`;

const UserInfoBox = styled.div`
  margin: 150px auto;
  width: 65%;
  height: 350px;
  position: relative;
  display: flex;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 2;
  img {
    z-index: 115;
    :hover {
    }
  }
`;

const ImageBox = styled.div`
  min-width: 350px;
  max-width: 700px;
  height: 350px;
  position: relative;
`;

const JustBox = styled.div`
  width: 15%;
  max-width: 1200px;
  height: 350px;
  position: relative;
`;

const InfoBox = styled.div`
  width: 48%;
  min-width: 170px;
  max-width: 700px;
  height: 350px;
  margin-left: 120px;
  position: relative;
  text-align: left;
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
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
  p {
    margin: 25px 0px 25px 0px;
    width: 16px;
    border: 1px solid #ffffff;
  }
  h3 {
    font-style: normal;
    font-weight: 400;
    height: fit-content;
    font-size: 17px;
    color: #ffffff;
    margin-left: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 5px;
  }
  h4 {
    width: fit-content;
    min-width: fit-content;
    height: fit-content;
    border-radius: 30px;
    background-color: #ededed;
    text-align: left;
    padding: 10px 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    a {
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      text-decoration: none;
      :visited {
        color: #555555;
      }
      :link {
        color: #555555;
      }
    }
  }
`;

export default UserInfo;
