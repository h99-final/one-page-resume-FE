import React, { useEffect, useState } from "react";
import Modal from "react-modal";
//style
import "../../../components/makeporf/shared/_modal.css";
import {
  Content,
  FormText,
  FormTitle,
  IconBox,
  InputCustom,
} from "../../makeporf/shared/_sharedStyle";
import styled from "styled-components";
// component
import PreviousNextProject from "../PreviousNextProject";
import TokenHelp from "./TokenHelp";
import GithubSpinner from "../../../shared/GithubSpinner";
import GithubHelper from "../../../shared/GithubHelper";
//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux/modules/patchcode";
// api
import { apis } from "../../../shared/axios";
import { Routing } from "../MakeProject";

function TsModal(props) {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { modalIsOpen, setIsOpen, message_list, projectId, setMessage_list } =
    props;
  const [selectedSha, setSelectedSha] = useState("");
  const [page, setPage] = useState(2);
  const [token, setToken] = React.useState("");
  const file_list = useSelector((state) => state.patchcode.patchcode);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const [githubSpinner, setGithubSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalCommitCount, setTotalCommitCount] = useState(0);

  //file 중복 선택이 가능하게 만들기 위해
  // const [selectedFileName_list, setSelectedFileName_list] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalWithoutPatchcode() {
    dispatch(actionCreators.resetSelectPatchCode());
    setIsOpen(false);
  }

  // commit message 고르기
  const handleCommitClick = (e) => {
    setSelectedSha(e.currentTarget.id);
    let commit = message_list.filter(
      (commit) => commit.sha === e.currentTarget.id
    );
    dispatch(actionCreators.setCommit(commit[0]));
  };

  // file 고르기
  const handleFileClick = (e) => {
    setSelectedFileName(e.currentTarget.id);
  };

  // 싱크 맞추기
  const handlesync = () => {
    let timeout = setInterval(
      () =>
        apis
          .checkSync(projectId)
          .then((res) => {
            if (res.data.data.totalCommitCount !== 0) {
              setTotalCommitCount(res.data.data.totalCommitCount);
              setProgress(res.data.data.curCommitCount);
            }
            if (res.data.data.isDone === true) {
              apis
                .gitCommit(projectId)
                .then((res) => {
                  setMessage_list(res.data.data);
                  clearInterval(timeout);
                  setIsLoading(false);
                })
                .catch((res) => {
                  clearInterval(timeout);
                  alert("github 정보를 불러오는데 실패하였습니다.");
                  setIsLoading(false);
                });
            }
          })
          // .catch((res) => {
          //   clearTimeout(timeout);
          //   window.alert(error.response.data.data.errors[0].message);
          // }),
          .catch((res) => {
            clearInterval(timeout);
            alert(
              "github 정보를 불러오는데 실패하였습니다. 토큰이 만료되었는지 확인해주세요."
            );
            setIsLoading(false);
          }),
      1500
    );

    setIsLoading(true);
    if (projectId) {
      apis
        .gitsync(projectId)
        // .then((res) => {
        //   timeout
        // })
        .catch((error) => {
          // clearTimeout(timeout);
          setIsLoading(false);
          alert(error.response.data?.data?.errors[0].message);
        });
    } else {
      setIsLoading(false);
    }

    // .catch((error) => {
    //   alert("깃헙 불러오기는 20초에 1번 가능합니다.");
    //   setIsLoading(false);
    // });
    return () => {
      clearInterval(timeout);
      setPage(0);
    };
  };

  useEffect(() => {
    if (page === 0) {
      apis
        .gitCommit(projectId)
        .then((res) => {
          if (res.data.data.length === 0) {
            setIsLoading(true);
            handlesync();
            return;
          }
          setMessage_list(res.data.data);
        })

        .catch((error) => {
          window.alert(error.response.data.data.errors[0].message);
          setIsLoading(false);
        });
    }
    if (page === 1) {
      dispatch(actionCreators.setPatchCodeAPI(projectId, selectedSha));
    }
  }, [page]);

  useEffect(() => {
    if (userInfo.isToken) {
      setPage(0);
    }
  }, [userInfo.isToken]);

  const submitToken = () => {
    const _token = { token: token };
    apis.gitToken(_token).then((res) => {
      setPage(0);
      apis.userInfo().then((res) => {
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
      });
      // .then(() => {
      //   handlesync();
      // });
    });
  };

  const [date, setDate] = useState("");

  // useEffect(() => {
  //   apis
  //     .gitCommitDate(projectId, date)
  //     .then((res) => {
  //       setMessage_list(res.data.data);
  //     })
  //     .catch(() => {
  //       alert("날짜가 유효하지 않습니다.");
  //     });
  // }, [date]);

  Modal.setAppElement("#root");

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <IconBoxLeft onClick={closeModalWithoutPatchcode}>
          <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
        </IconBoxLeft>
        {isLoading ? (
          <GithubSpinner
            totalCommitCount={totalCommitCount}
            curCommitCount={progress}
          />
        ) : (
          <FormContentsModal>
            {page === 2 ? (
              <>
                <FormTitleFlex>
                  <TokenTitle>
                    Git Token 인증이 필요합니다
                    <img
                      onClick={() => {
                        setHelpModalOpen(true);
                      }}
                      alt=""
                      src={process.env.PUBLIC_URL + "/img/colortkhelp.svg"}
                    />
                  </TokenTitle>
                  <FormTextLight>
                    파일을 불러오기 위해 Git Token을 인증해주세요.
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                    >
                      GitHub 바로가기
                    </a>
                  </FormTextLight>
                </FormTitleFlex>
                <GetTokenBox>
                  <InputBox>
                    <InputCustom
                      style={{ width: "90%", margin: "30px 0px" }}
                      placeholder="여기에 토큰을 입력해주세요"
                      onChange={(e) => {
                        setToken(e.target.value);
                      }}
                    />
                    <div style={{ width: "99%", textAlign: "right" }}>
                      <button
                        onClick={() => {
                          submitToken();
                        }}
                      >
                        인증완료
                      </button>
                    </div>
                  </InputBox>
                </GetTokenBox>
              </>
            ) : (
              <>
                {page === 0 ? (
                  <>
                    <FormTitleFlex>
                      <FormTextCenter style={{ display: "flex" }}>
                        Commit 선택하기
                        <img
                          style={{
                            marginTop: "5px",
                            marginLeft: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setHelp(true);
                          }}
                          alt=""
                          src={process.env.PUBLIC_URL + "/img/colortkhelp.svg"}
                        />
                      </FormTextCenter>
                      <FormTextLight>
                        프로젝트에 첨부할 commit을 선택해 주세요.
                        <Routing href={userInfo.gitUrl} target="_blank">
                          GitHub 바로가기
                        </Routing>
                      </FormTextLight>
                      {/* <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                      /> */}
                    </FormTitleFlex>
                    {githubSpinner ? (
                      <GithubSpinner />
                    ) : (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginLeft: "auto",
                            marginRight: "100px",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            onClick={handlesync}
                            style={{ cursor: "pointer" }}
                            width="30px"
                            alt="새로고침"
                            height="auto"
                            src={process.env.PUBLIC_URL + "/img/rotate.svg"}
                          />
                        </div>
                        <Ulist>
                          {message_list.map((e, i) => {
                            if (selectedSha === e.sha) {
                              return (
                                <>
                                  <List
                                    selected
                                    onClick={handleCommitClick}
                                    key={e.sha + `${i}`}
                                    id={e.sha}
                                    value={e.message}
                                  >
                                    <div style={{ display: "flex" }}>
                                      <img
                                        width="30"
                                        height="auto"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/check.svg"
                                        }
                                        alt="checked"
                                      />
                                      <Font>{e.message}</Font>
                                    </div>
                                  </List>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <List
                                    onClick={handleCommitClick}
                                    key={e.sha + `${i}`}
                                    id={e.sha}
                                  >
                                    <Font>{e.message}</Font>
                                  </List>
                                </>
                              );
                            }
                          })}
                        </Ulist>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <FormTitleFlex>
                      <FormTextCenter>파일 선택 하기</FormTextCenter>
                      <FormTextLight>
                        트러블슈팅을 설명할 Patch Code 파일을 모두 골라주세요.
                      </FormTextLight>
                    </FormTitleFlex>
                    <div>
                      <Ulist>
                        {file_list?.map((e, i) => {
                          if (selectedFileName === e.name) {
                            return (
                              <>
                                <List
                                  selected
                                  onClick={handleFileClick}
                                  key={e.name + `${i}`}
                                  id={e.name}
                                >
                                  <div style={{ display: "flex" }}>
                                    <img
                                      width="30"
                                      height="auto"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/img/check.svg"
                                      }
                                      alt="checked"
                                    />
                                    <Font>{e.name}</Font>
                                  </div>
                                </List>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <List
                                  onClick={handleFileClick}
                                  key={e.sha + `${i}`}
                                  id={e.name}
                                >
                                  <Font>{e.name}</Font>
                                </List>
                              </>
                            );
                          }
                        })}
                      </Ulist>
                    </div>
                  </>
                )}
              </>
            )}

            <PreviousNextProject
              closeModal={closeModal}
              selectedFileName={selectedFileName}
              selected={selectedSha}
              setPage={setPage}
              page={page}
            />
          </FormContentsModal>
        )}
      </Modal>
      <TokenHelp
        helpModalOpen={helpModalOpen}
        setHelpModalOpen={setHelpModalOpen}
      />
      {help && <GithubHelper help={help} setHelp={setHelp} />}
      {/* <Loading helpModalOpen={helpModalOpen} setHelpModalOpen={setHelpModalOpen} /> */}
    </>
  );
}

const FormContents = styled.div`
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  height: 100%;
`;
const Font = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* C1 */

  color: #ffffff;
  margin: 10px;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 78px;
  margin: 0px 30px 0px 40px;
  border-bottom: solid 1px #cccccc;
  ${Font} {
    color: ${(props) => (props.selected ? "#00C4B4" : "white")};
  }
  cursor: pointer;
`;
export const TokenTitle = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 20px;
  img {
    margin-left: 10px;
  }
`;

const FormContentsModal = styled(FormContents)`
  height: 50vh;
  padding-bottom: 0px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #696b7b;
  }
`;

const Ulist = styled.ul`
  margin: auto 100px;
  height: 50vh;
  overflow: auto;
  border: 1px solid #cccccc;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #696b7b;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;

const GetTokenBox = styled.div`
  margin: auto 100px;
  height: 50vh;
  overflow: hidden;
  border-radius: 10px;
`;

const InputBox = styled.div`
  width: 99%;
  margin: 180px auto;
  align-items: center;
  text-align: center;
  button {
    margin-right: 20px;
    background-color: white;
    color: #191919;
    border: 1px solid white;
    padding: 10px 20px;
    border-radius: 5px;
  }
`;

export const FormTextCenter = styled(FormText)`
  width: auto;
  height: 63px;
  padding: 10px;
  font-size: 36px;
  line-height: 43px;
  align-content: center;
  align-items: center;
  img {
    filter: grayscale(100%);
    &:hover {
      filter: none;
    }
  }
`;

export const FormTitleFlex = styled(FormTitle)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 500px;
  margin: 10px auto;
`;

export const FormTextLight = styled(FormText)`
  justify-content: center;
  font-size: 15px;
  font-weight: 100;
  width: auto;
  a {
    color: #cfd3e2;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
    text-decoration: underline;
    :visited {
      color: #00c4b4;
    }
    :link {
      color: #00c4b4;
    }
  }
`;

export const IconBoxLeft = styled(IconBox)`
  width: 50px;
  margin-left: auto;
  background-color: #2c2e39;
`;

export default TsModal;
