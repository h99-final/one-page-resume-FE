import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import { apis } from "../shared/axios";
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import MainCard from "../components/Element/MainCard";
import FetchMore from "../shared/FetchMore";
import { InputCustom, InputStack } from '../components/makeporf/shared/_sharedStyle';

export const options = [
  { value: "Python", label: "Python" },
  { value: "Javascript", label: "Javascript" },
  { value: "Spring", label: "Spring" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "React", label: "React" },
  { value: "iOS", label: "iOS" },
  { value: "Android", label: "Android" },
  { value: "Node.js", label: "Node.js" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Git", label: "Git" },
];

const ProjList = () => {
  const { stack } = useSelector((state) => state.user.user);
  // console.log(userInfo)

  const [proj, setProj] = useState([]);
  const [newStack, setNewStack] = useState("");

  const [addStack, setAddStack] = useState([]);
  // useEffect(() => {
  //   const stack = [];

  //   apis.mainProj(stack).then((res) => {
  //     setProj(res.data.data);
  //   });
  // }, [index]);

  const handleChange = (e) => {
    if (e.keycode === 13) {
      console.log(newStack)
    }
    // console.log(newStack)
    // let stackArray = [];
    // e.map((addStack) => {
    //   return stackArray.push(addStack.value);
    // });
    // setAddStack(stackArray);

  };

  // 무한 스크롤
  const [page, setPage] = useState(0);
  const [is_loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (hasMore && addStack.length > 0) {
      apis.mainProj(addStack, page).then((res) => {
        if (res.data.data.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        setProj((prev) => [...prev, ...res.data.data]);
      });
    } else {
      apis.mainProj(stack, page).then((res) => {
        if (res.data.data.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        setProj((prev) => [...prev, ...res.data.data]);
      });
    }
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, [page, addStack]);

  return (
    <>
      <Header />
      <Container>
        <Title>
          <h1>프로젝트 둘러보기</h1>
          <h2>
            다른 개발자들이 작업한 프로젝트를 한곳에서 모아보고 마음에 드는
            프로젝트를 북마크 해보세요.
          </h2>
        </Title>
        <InputBox>
          <InputStack
            value={newStack}
            onChange={(e) => { setNewStack(e.target.value) }}
            // onSubmit={handleChange}
            onKeyPress={handleChange}
            style={{ width: "100%" }} />
        </InputBox>
        <StackBox style={{ marginBottom: "60px" }}>
          {addStack.map((addStack, index) => {
            return (
              <SelectStack key={`stack-${index}`} {...addStack}>
                {addStack}
                <ClearIcon
                  sx={{
                    fontSize: 14,
                    color: grey[500],
                    marginLeft: 1,
                    borderRadius: 1000,
                  }}
                  onClick={() => {
                    alert("@@");
                  }}
                ></ClearIcon>
              </SelectStack>
            );
          })}
        </StackBox>
        <ProjectBox>
          <Project>
            {proj?.map((e, i) => {
              return (
                <>
                  <MainCard key={`${e.id}`} {...e} />
                </>
              );
            })}
          </Project>
        </ProjectBox>
      </Container>
      <FetchMore loading={page !== 0 && is_loading} setPage={setPage} />
    </>
  );
};
const Container = styled.div`
  background-color: #1f2029;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  margin: 0px auto;
`;
const ProjectBox = styled.div`
  width: 100%;
  margin: 0px auto;
`;
const Project = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0px auto;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 120px;
  margin-bottom: 60px;
  h1 {
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    letter-spacing: -0.01em;
    color: white;
    margin-bottom: 20px;
  }
  h2 {
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: white;
  }
`;

const StackBox = styled.div`
  width: 76%;
  margin: 10px auto;
  height: auto;
  border-radius: 10px;
`;

const SelectStack = styled.button`
  margin: 15px 15px;
  padding: 10px 20px;
  width: fit-content;
  height: 40px;
  font-size: 17px;
  color: white;
  border: 1px solid white;
  background-color: #1f2029;
  border-radius: 100px;
  text-align: center;
`;
export default ProjList;
