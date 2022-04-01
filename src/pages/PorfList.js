import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import { apis } from "../shared/axios";
import PortfolioBuisnesscard from "../components/Element/PortfolioBusinesscard";
import { Link, useHistory } from "react-router-dom";
import FetchMore from "../shared/FetchMore";
import {
  InputCustom,
  InputStack,
} from "../components/makeporf/shared/_sharedStyle";
// mui selector
import { option } from "../shared/common";
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import {
  Autocomplete,
  Chip,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssTextField, theme } from "../shared/_sharedMuiStyle";
import { AccountCircle } from "@mui/icons-material";
import MainFooter from '../shared/MainFooter';

const PorfList = () => {
  const history = useHistory();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const [porf, setPorf] = useState([]);

  const [addStack, setAddStack] = useState([]);

  //무한 스크롤
  const [page, setPage] = useState(0);
  const [is_loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setAddStack(userInfo.stack);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    if (hasMore) {
      apis.mainPorf(addStack, page).then((res) => {
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
  }, [page, addStack]);

  useEffect(() => {
    setPage(0);
    setPorf([]);
  }, [addStack]);

  const handleChange = (event, newValue) => {
    setAddStack(newValue);
  };

  const handleDelete = (stack) => {
    return setAddStack(addStack.filter((prev) => prev !== stack));
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
          <ButtonHolder>
            <button
              onClick={() => {
                history.push(`/write/portfolio/introduce/${userInfo.porfId}`);
              }}
            >
              내 포트폴리오
              <img
                style={{
                  float: "right",
                  width: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                alt="arrow"
                src={process.env.PUBLIC_URL + "/img/RightArrowSimple.svg"}
              />
            </button>
          </ButtonHolder>
        </Title>
        {/* <InputBox>
          <InputStack style={{ width: "100%" }} />
        </InputBox> */}
        <InputBox>
          <Autocomplete
            sx={{
              display: "inline-block",
              "& input": {
                width: 200,
                bgcolor: "none",
                color: "#696B7B",
                borderBottomColor: " #696B7B",
              },
            }}
            multiple
            fullWidth
            filterSelectedOptions
            id="tags-standard"
            // options={option.map((option) => option.stack)}
            options={option}
            value={addStack}
            defaultValue={userInfo?.stack}
            onChange={handleChange}
            renderTags={(addStack, getTagProps) =>
              addStack?.map((option, index) => (
                <Chip
                  sx={{ display: "none" }}
                  variant="outlined"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                sx={{
                  color: "#696B7B",
                  "&.MuiInput-input ": {
                    color: "#696B7B",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
                {...params}
                variant="standard"
                placeholder="기술스택으로 검색해보세요"
              />
            )}
          />
        </InputBox>

        <StackBox style={{ marginBottom: "60px" }}>
          {addStack?.map((addStack, index) => {
            return (
              <SelectStack key={`stack-${index}`} {...addStack}>
                {addStack}
                <ClearIcon
                  value={addStack}
                  sx={{
                    fontSize: 14,
                    color: grey[500],
                    marginLeft: 1,
                    borderRadius: 1000,
                  }}
                  onClick={() => handleDelete(addStack)}
                />
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
      <MainFooter />
    </>
  );
};
const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0px auto;
`;

const PortfolioBox = styled.div`
  width: 100%;
  margin: 0px auto;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 120px;
  margin-bottom: 60px;
  text-align: center;
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
    margin-bottom: 50px;
  }
  button {
    cursor: pointer;
    border: 1px solid white;
    border-radius: 30px;
    padding: 12px 35px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #191919;
  }
`;

const StackBox = styled.div`
  width: 80%;
  margin: 10px auto;
  height: 50px;
  border-radius: 10px;
`;

const SelectStack = styled.button`
  margin: 15px 10px;
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
