import React from "react";
import { apis } from "../shared/axios";
import Header from "../shared/Header";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { EditSharp } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ProjectCardShow from "../components/Element/ProjectCardShow";
import PortfolioBuisnesscard from "../components/Element/PortfolioBusinesscard";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultprojects = {
  bookmarkCount: 0,
  content: "",
  id: 0,
  imageUrl: "",
  stack: [],
  title: "",
  userJob: "",
  username: "",
};

function MyPage() {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([defaultprojects]);
  const [values, setValues] = useState({
    show: userInfo?.porfShow,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    apis.introPorfGet(userInfo?.porfId).then((res) => {
      setTitle(res.data.data.title);
    });
    apis.projectPorfGet().then((res) => {
      setProjects(res.data.data);
    });
    apis.porfShow(values.show).then((res) => { });
  }, [values]);

  const handleClickShow = () => {
    setValues({
      ...values,
      show: !values.show,
    });
    if (values.show === false) {
      alert("포트폴리오가 공개되었습니다.")
    }
    if (values.show === true) {
      alert("포트폴리오가 비공개되었습니다.")
    }
  };

  return (
    <Container>
      <Header />
      <Form>
        <UserInfoBox>
          <Title>
            <h1>기본 정보</h1>
          </Title>
          <UserInfo>
            <LeftBox>
              <Avatar
                style={{ marginBottom: "50px" }}
                alt=""
                src={userInfo?.profileImage ? userInfo?.profileImage : null}
                sx={{ width: "250px", height: "250px" }}
              />
              <EditButton
                onClick={() => {
                  history.push(`/editinfo/changeinfo/${userInfo?.userId}`);
                }}
              >
                <EditSharp style={{ marginRight: "10px" }} />내 정보 수정
              </EditButton>
            </LeftBox>
            <RightBox>
              <NnE>
                <h1>{userInfo?.name ? userInfo?.name : "ㅡ"}</h1>
              </NnE>
              <NnE>
                <p>{userInfo?.email}</p>
              </NnE>
              <Content>
                <Label>
                  <Font>대표 스택</Font>
                </Label>
                {userInfo?.name ? (
                  <>
                    <MainStack>{userInfo?.stack[0]}</MainStack>
                    <MainStack>{userInfo?.stack[1]}</MainStack>
                    <MainStack>{userInfo?.stack[2]}</MainStack>
                  </>
                ) : (
                  <Font>ㅡ</Font>
                )}
              </Content>
              <Content>
                <Label>
                  <Font>전화번호</Font>
                </Label>
                <Font>{userInfo?.phoneNum ? userInfo?.phoneNum : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>GitHub URL</Font>
                </Label>
                <Font>{userInfo?.gitUrl ? userInfo?.gitUrl : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>Blog URL</Font>
                </Label>
                <Font>{userInfo?.blogUrl ? userInfo?.blogUrl : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>직무</Font>
                </Label>
                <Font>{userInfo?.job ? userInfo?.job : "ㅡ"}</Font>
              </Content>
            </RightBox>
          </UserInfo>
        </UserInfoBox>
        <PortfolioBox>
          <Title
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ minWidth: "120px" }}>포트폴리오</h1>
            <div style={{ display: "flex" }}>

              <button onClick={handleClickShow}>
                {values.show ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
          </Title>
          {title ? (
            <Portfolio>
              <NnE>
                <h2>{userInfo?.name ? userInfo?.name : "ㅡ"}</h2>
              </NnE>
              <NnE>
                <h3>{userInfo?.job}</h3>
              </NnE>
              <NnE>
                <h4>{title}</h4>
              </NnE>
              <Content style={{ margin: "0px 0px 0px 25px" }}>
                <Stack>{userInfo?.stack[0]}</Stack>
                <Stack>{userInfo?.stack[1]}</Stack>
                <Stack>{userInfo?.stack[2]}</Stack>
              </Content>
            </Portfolio>
          ) : (
            <Portfolio
              style={{ background: "#1F2029", border: "1px solid #1F2029" }}
            >
              <AddProfBox style={{ marginTop: "160px" }}>
                <AddProfButton
                  onClick={() => {
                    history.push(
                      `/write/portfolio/introduce/${userInfo?.porfId}`
                    );
                  }}
                >
                  <Add />
                  포트폴리오 작성하기
                </AddProfButton>
              </AddProfBox>
              <AddProfBox>
                <AddProfText>
                  아직 작성된 포트폴리오가 없어요.<br></br>내 이야기를 담아
                  개성넘치는 포트폴리오를 만들어 보세요.
                </AddProfText>
              </AddProfBox>
            </Portfolio>
          )}
        </PortfolioBox>
      </Form>
      <Project>
        <ProjTitle style={{ marginTop: "120px", marginBottom: "20px", marginLeft: "0.7%" }}>
          프로젝트
        </ProjTitle>

        {projects.map((e, i) => {
          return (
            <>
              <ProjectCardShow key={`${e.id}`} {...e} />
            </>
          );
        })}
        <AddProject
          style={{
            backgroundColor: "#393A47",
            width: "444px",
            border: "1px solid #393A47",
          }}
        >
          <AddProfBox style={{ marginTop: "160px" }}>
            <AddProfButton
              style={{ background: "#696B7B" }}
              onClick={() => {
                history.push("/write/project/info");
              }}
            >
              <Add />
              프로젝트 추가
            </AddProfButton>
          </AddProfBox>
          <AddProfBox>
            <AddProfText>
              프로젝트 목록이 비어있어요.
              <br></br>프로젝트 추가 버튼을 눌러 내 프로젝트를
              <br></br>포트폴리오에 등록해 보세요.
            </AddProfText>
          </AddProfBox>
        </AddProject>
      </Project>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1f2029;
  display: inline-block;
  margin-top: 60px;
`;
export const Title = styled.div`
  width: 113px;
  margin: 3px;
  height: 40px;
  margin-top: 60px;
  margin-bottom: 10px;
  h1 {
    height: fit-content;
    padding: 10px 0px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 24px;
    color: white;
  }
  h2 {
    background-color: #393a47;
    color: #cfd3e2;
    padding: 10px 10px;
    height: fit-content;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    margin-right: 3px;
    border-radius: 5px;
  }
  button {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 40px;
    margin-right: 5px;
    padding-top: 3px;
    color: white;
    background-color: #393a47;
    border: none;
  }
`;
export const ProjTitle = styled.div`
  width: 100%;
  margin: 0px auto;
  height: 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 24px;
  color: white;
`;

export const Font = styled.div`
  /* body1 */
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #cfd3e2;
`;
export const Stack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  color: white;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 30px;
  margin-right: 10px;
  padding: 10px 20px;
  width: fit-content;
  height: 40px;
`;

export const MainStack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  color: #00b3a6;
  border: 1px solid #00b3a6;
  box-sizing: border-box;
  border-radius: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  width: fit-content;
  height: 40px;
`;
export const Label = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 120px;
  height: 44px;
  left: 0px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 0px 13px 0px;
  vertical-align: middle;
`;
const Form = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 600px;
  max-width: 1440px;
  min-height: 40vh;
  background: #1f2029;
  display: flex;
  @media screen and (min-width: 1440px) {
    & {
    }
  }
  @media screen and (min-width: 834px) {
    & {
    }
  }
`;

const Project = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  /* justify-content: space-around; */
  max-width: 1400px;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
  }
`;

const UserInfoBox = styled.div`
  width: 64%;
  min-width: 850px;
  margin: 0px auto;
  margin-right: 24px;
  position: relative;
  @media only screen and (max-width: 1300px) {
  }
`;
const PortfolioBox = styled.div`
  position: relative;
  margin: 0px auto;
  width: 450px;
  @media only screen and (max-width: 1300px) {
  }
`;
const UserInfo = styled.div`
  background-color: #2c2e39;
  margin: 0px auto;
  width: 99%;
  min-width: 500px;
  height: 502px;
  border-radius: 10px;
  display: flex;
  @media only screen and (max-width: 1300px) {
  }
`;
const EditButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: white;
  background-color: #00b3a6;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #00b3a6;
  width: 249px;
  height: 60px;
`;
const LeftBox = styled.div`
  margin: 70px 50px;
  min-width: 250px;
  position: relative;
  @media only screen and (max-width: 1300px) {
  }
`;

const AddProfBox = styled.div`
  margin: 0px 0px 0px 0px;
  width: 100%;
  height: 100px;
  min-width: 45px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1300px) {
  }
`;
const AddProfButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: white;
  background-color: #696b7b;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  min-width: 350px;
  height: 80px;
`;
const AddProfText = styled.div`
  width: 482px;
  height: 48px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #CFD3E2;
`;
const RightBox = styled.div`
  margin: 70px 30px 50px 40px;
  position: relative;
  min-width: 450px;
  width: 68%;
  @media only screen and (max-width: 1300px) {
  }
`;
const Portfolio = styled.div`
  border: 1px solid white;
  background-color: lightblue;
  width: 99%;
  height: 502px;
  border-radius: 10px;
  border: 1px solid lightblue;
  @media only screen and (max-width: 1300px) {
  }
`;

const AddProject = styled.div`
  background-color: lightblue;
  justify-content: flex-start;
  width: 444px;
  height: 515px;
  border-radius: 10px;
  margin: 0px 15px;
  background-color: #393a47;
  box-sizing: border-box;
  margin-bottom: 40px;
  @media only screen and (max-width: 1300px) {
  }
`;

const NnE = styled.div`
  min-width: 350px;
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: white;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    margin-bottom: 20px;
    color: #cfd3e2;
    text-align: center;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    margin: 50px 0px 20px 25px;
    color: white;
  }
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    margin-left: 25px;
    color: white;
  }
  h4 {
    line-height: 25px;
    width: 85%;
    margin: 0px 25px;
    height: 200px;
    padding: 50px 0px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: white;
  }
`;

export default MyPage;
