import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Banner from "../components/Banner";

import { useDispatch, useSelector } from "react-redux";
import { apis } from "../shared/axios";

import MainCard from "../components/Element/MainCard";
import FetchMore from "../shared/FetchMore";
import Spinner from "../shared/Spinner";
import {
  InputCustom,
  InputStack,
} from "../components/makeporf/shared/_sharedStyle";
import { useHistory } from "react-router-dom";

// mui selector
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import { Autocomplete, Chip, FormControl, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { option } from "../shared/common";
import { actionCreators } from "../redux/modules/bookmark";
import MainFooter from '../shared/MainFooter';
import '../components/banner.css'
const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor,
    },
  },
  "& .MuiInputBase-input": {
    position: "relative",
    color: "white",
    width: "100%",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#fff",
      contrastText: "#000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const ProjList = () => {
  const userInfo = useSelector((state) => state.user.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [proj, setProj] = useState([]);

  const [addStack, setAddStack] = useState([]);

  // 무한 스크롤
  const [page, setPage] = useState(0);
  const [is_loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const bookmark = useSelector((state) => state.bookmark.myBookmark);

  useEffect(() => {
    setLoading(true);
    if (hasMore) {
      apis.mainProj(addStack, page).then((res) => {
        if (res.data.data.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        setProj((prev) => [...prev, ...res.data.data]);
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
    if (userInfo) {
      setAddStack(userInfo.stack);
    }
  }, []);

  useEffect(() => {
    setPage(0);
    setProj([]);
  }, [addStack]);

  useEffect(() => {
    dispatch(actionCreators.setBookmarkDB());
  }, []);

  const handleChange = (event, newValue) => {
    setAddStack(newValue);
  };

  const handleDelete = (stack) => {
    setAddStack(addStack.filter((prev) => prev !== stack));
  };

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
          <button
            onClick={() => {
              history.replace("/write/project/info");
            }}
          >
            새 프로젝트 +
          </button>
        </Title>
        <InputBox>
          <ThemeProvider theme={theme}>
            <Autocomplete
              multiple
              fullWidth
              filterSelectedOptions
              id="tags-standard"
              // options={option.map((option) => option.stack)}
              getOptionLabel={(option) => option}
              options={option}
              value={addStack ? addStack : []}
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
                <CssTextField
                  {...params}
                  variant="standard"
                  placeholder="기술스택으로 검색해보세요"
                />
              )}
            />
          </ThemeProvider>
        </InputBox>
        <StackBox style={{ marginBottom: "60px" }}>
          {addStack?.map((addStack, index) => {
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
                    handleDelete(addStack);
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
        {!!is_loading && <Spinner />}
      </Container>
      <FetchMore loading={page !== 0 && is_loading} setPage={setPage} />
      <MainFooter />
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
