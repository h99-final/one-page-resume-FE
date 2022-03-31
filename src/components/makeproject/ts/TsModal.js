import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Content,
  FormText,
  FormTitle,
  IconBox,
  Inner,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
// import { FormContents } from "../../makeporf/view/Introduce";
import styled from "styled-components";
import PreviousNextProject from "../PreviousNextProject";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux/modules/patchcode";
import { apis } from "../../../shared/axios";
import TokenHelp from "./TokenHelp";
import Loading from "./Loading";
import GithubSpinner from "../../../shared/GithubSpinner";
import GithubHelper from "../../../shared/GithubHelper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "80vw",
    height: "90%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    background: "#2C2E39",
    padding: "0px",
    overflow: "hidden",
    minWidth: "1000px",
  },
};

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
    console.log(commit);
    dispatch(actionCreators.setCommit(commit[0]));
  };

  // file 고르기
  const handleFileClick = (e) => {
    setSelectedFileName(e.currentTarget.id);
  };

  // 싱크 맞추기
  const handlesync = async () => {
    let timeout = setInterval(
      () =>
        apis
          .checkSync(projectId)
          .then((res) => {
            if (res.data.data.isDone) {
              apis.gitCommit(projectId).then((res) => {
                setMessage_list(res.data.data);
                clearTimeout(timeout);
                setIsLoading(false);
              });
            }
          })
          .catch((res) => console.log(res.data.data)),
      1500
    );
    setIsLoading(true);
    if (projectId) {
      await apis
        .gitsync(projectId)
        .then((res) => {
          timeout();
        })
        .catch((error) => console.log("워험"));
    } else {
      setIsLoading(false);
    }

    // .catch((error) => {
    //   alert("깃헙 불러오기는 20초에 1번 가능합니다.");
    //   setIsLoading(false);
    // });
  };

  useEffect(() => {
    if (page === 0) {
      apis.gitCommit(projectId).then((res) => {
        setMessage_list(res.data.data);
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
      apis
        .userInfo()
        .then((res) => {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        })
        .then(() => {
          handlesync();
        });
    });
  };

  Modal.setAppElement("#root");

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <IconBoxLeft onClick={closeModalWithoutPatchcode}>
          <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
        </IconBoxLeft>
        {isLoading ? (
          <GithubSpinner />
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
                      <FormTextCenter>
                        Commit 선택하기
                        <img
                          onClick={() => {
                            setHelp(true);
                          }}
                          alt=""
                          src={process.env.PUBLIC_URL + "/img/colortkhelp.svg"}
                        />
                      </FormTextCenter>
                      <FormTextLight>
                        프로젝트에 첨부할 commit을 선택해 주세요.
                      </FormTextLight>
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
                          onClick={handlesync}
                        >
                          <img
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
  img {
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
