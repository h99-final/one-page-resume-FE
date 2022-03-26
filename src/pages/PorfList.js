import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import { apis } from "../shared/axios";
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import Select from "react-select";
import PortfolioBuisnesscard from "../components/Element/PortfolioBusinesscard";
import { Link, useHistory } from "react-router-dom";
import FetchMore from "../shared/FetchMore";

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

export const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "white",
    // Overwrittes the different states of border
    border: "1px solid #cccccc",
    width: "70vw",
    minWidth: "600px",
    maxWidth: "1140px",
    margin: "0px auto",
    borderRadius: "10px",
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "blue" : "blue",
    },
  }),
};

const PorfList = () => {
  const history = useHistory();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const [porf, setPorf] = useState([]);
  const [proj, setProj] = useState([]);

  const [addStack, setAddStack] = useState([]);

  //무한 스크롤
  const [page, setPage] = useState(0);
  const [is_loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  let stack = [];

  useEffect(() => {
    setLoading(true);
    if (hasMore) {
      apis.mainPorf(stack, page).then((res) => {
        if (res.data.data.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        setPorf((prev) => [...prev, ...res.data.data]);
      });
    } else {
      setLoading(false);
      return;
    }
    setLoading(false);
    return () => {
      setLoading(false);
      setHasMore(true);
    };
  }, [page]);

  const handleChange = (e) => {
    let stackArray = [];
    e.map((addStack) => {
      return stackArray.push(addStack.value);
    });
    setAddStack(stackArray);
  };

  return (
    <>
      <Container>
        <Header />
        <Title>
          <h1>포트폴리오 둘러보기</h1>
          <h2>
            다른 개발자들이 작업한 프로젝트를 한곳에서 모아보고 마음에 드는
            프로젝트를 북마크 해보세요.
          </h2>
        </Title>
        <Select
          styles={customStyles}
          closeMenuOnSelect={false}
          options={options}
          isMulti
          onChange={handleChange}
        />
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
        <PortfolioBox>
          <Portfolio>
            {porf?.map((e, i) => {
              return (
                <div
                  key={`porf-${e.porfId}-${i}`}
                  onClick={() => history.push(`/portfolio/${e.porfId}`)}
                >
                  <PortfolioBuisnesscard {...e} />
                </div>
              );
            })}
          </Portfolio>
        </PortfolioBox>
      </Container>
      <FetchMore is_loading={page !== 0 && is_loading} setPage={setPage} />
    </>
  );
};
const Container = styled.div`
  background-color: #1f2029;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Portfolio = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  min-width: 940px;
  max-width: 1440px;
  border-radius: 10px;
  justify-content: space-around;
  @media only screen and (max-width: 1300px) {
  }
`;

const PortfolioBox = styled.div`
  width: 100%;
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
  width: 70%;
  margin: 10px auto;
  height: 50px;
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
export default PorfList;
