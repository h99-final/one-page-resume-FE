import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButton,
  ButtonText,
  ButtonTextTS,
  Content,
  ContentCareer,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  MakeCenter,
  Star,
} from "../../makeporf/shared/_sharedStyle";
import { Font, FormContents } from "../../makeporf/view/Introduce";
import { FormMainText, FormSubText } from "../MakeProject";
import styled from "styled-components";
import TsModal from "./TsModal";
import { apis } from "../../../shared/axios";
import { useDispatch, useSelector } from "react-redux";
import Highlighted from "./Highlight";
import { useForm } from "react-hook-form";
import { actionCreators as tsfileactions } from "../../../redux/modules/patchcode";
import ShowTroubleShooting, { IconBox } from "./ShowTroubleShooting";
import PreviousNextProject from "../PreviousNextProject";
import TemplateProject from "../shared/TemplateProject";
import { actionCreators as tsActions } from "../../../redux/modules/setProject";
import MarkDown from "./MarkDown";

function MakeTroubleShooting() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id, projectId } = useParams();

  const ref = useRef(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  // markdown value
  const [mdValue, setMDValue] = useState("");

  const [message_list, setMessage_list] = useState([]);

  // 선택된 커밋
  const commit = useSelector((state) => state.patchcode.commit);
  // 선택된 패치코드, 파일명
  const patchcode = useSelector((state) => state.patchcode.selectedPatchCode);
  // 프로젝트에 속해있는 모든 파일
  const tsFile = useSelector((state) => state.patchcode.tsFile);

  // setIsOpen(true);
  const onValid = (data) => {
    // 모달창에서 커밋 목록 조회
    const _data = {
      tsName: data.title,
      fileName: patchcode[0].name,
      patchCode: patchcode[0].patchCode,
      tsContent: mdValue,
    };
    // 트러블 슈팅 redux에만 추가
    // 트러블 슈팅 선택된 패치 코드 지우기
    // DB에 저장하기
    const { commit, ..._obj } = _data;
    handleSubmitDB(_obj);
    dispatch(tsfileactions.resetSelectPatchCode());
    setValue("title", "");
    // setValue("content", "");
  };
  const delGitToken = () => {
    apis.delGitToken();
  };
  const modalOpen = () => {
    setIsOpen(true);
    // apis.gitCommit(projectId).then((res) => {
    //   setMessage_list(res.data.data);
    // });
  };

  const handleDelete = () => {
    dispatch(tsfileactions.resetSelectPatchCode());
  };

  const handleSubmitDB = (_data) => {
    dispatch(tsfileactions.troubleShootingDB(projectId, _data));
  };

  useEffect(() => {
    dispatch(tsfileactions.getTroubleShootingDB(projectId));
  }, []);

  return (
    <>
      <form>
        <FormTitle>
          <FormMainText>STEP 2</FormMainText>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormText>트러블 슈팅</FormText>
            <FormSubText>
              Patch Code 파일을 불러와 프로젝트에서 해결한 문제들을
              설명해보세요.
            </FormSubText>
          </div>
        </FormTitle>
        <FormContents>
          {!!commit && !!patchcode ? (
            <>
              <IconBox onClick={handleDelete}>
                <img alt="" src={process.env.PUBLIC_URL + "/img/Trash.svg"} />
              </IconBox>
              <Content>
                <Label>
                  <Font>
                    트러블슈팅 제목<Star>*</Star>
                  </Font>
                </Label>
                <InputCustom
                  placeholder="제목을 적어주세요."
                  style={{ overflow: "hidden" }}
                  type="text"
                  {...register("title", { required: "제목을 입력해주세요." })}
                  maxLength={50}
                />
              </Content>
              <ErrorMessage>{errors?.title?.message}</ErrorMessage>
              <Content>
                <Label>
                  <Font>
                    Commit<Star>*</Star>
                  </Font>
                </Label>
                <InputCustom
                  style={{ overflow: "hidden" }}
                  type="text"
                  defaultValue={commit.message}
                  maxLength={50}
                />
              </Content>
              <ErrorMessage>{errors?.fileName?.message}</ErrorMessage>
              <Content style={{ marginBottom: "30px" }}>
                <Label>
                  <Font>
                    File Name<Star>*</Star>
                  </Font>
                </Label>
                <InputCustom
                  style={{ overflow: "hidden" }}
                  type="text"
                  defaultValue={patchcode[0]?.name}
                  maxLength={50}
                />
              </Content>
              <Content style={{ marginBottom: "30px" }}>
                <Label>
                  <Font>
                    Patch Code<Star>*</Star>
                  </Font>
                </Label>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Highlighted text={patchcode[0]?.patchCode} />
                </div>
              </Content>
              <Content>
                <Label>
                  <Font>
                    *추가 설명<br></br>(0/1500)
                  </Font>
                </Label>
                <MarkDown setValue={setMDValue} value={mdValue} />
              </Content>
              <ErrorMessage>{errors?.content?.message}</ErrorMessage>
            </>
          ) : null}

          <FormContentsP>
            <MakeCenter style={{ margin: "20px auto" }}>
              <AddButton>
                <ContentCareerBottom>
                  {/* <ButtonText onClick={handleSubmit(onValid)}> */}
                  {patchcode && commit ? (
                    <ButtonText onClick={handleSubmit(onValid)}>
                      + 트러블 슈팅 파일 저장 하기
                    </ButtonText>
                  ) : (
                    <>
                      <ButtonText onClick={modalOpen}>
                        + 트러블 슈팅 파일 추가 하기
                      </ButtonText>
                    </>
                  )}
                </ContentCareerBottom>
              </AddButton>
            </MakeCenter>
            <FormSubText style={{ width: "100%", textAlign: "center" }}>
              커밋 조회를 통해 프로젝트에서 해결한 문제들을 가져올 수 있어요.
            </FormSubText>
          </FormContentsP>
          <ButtonTextTS
            onClick={() => {
              delGitToken();
            }}
          >
            토큰삭제
          </ButtonTextTS>
          <hr style={{ margin: "50px" }} />

          {tsFile
            ? tsFile.map((e, i) => {
                return (
                  <ShowTroubleShooting
                    key={`tsFile.fileName-${i}`}
                    commit={commit}
                    {...e}
                  />
                );
              })
            : null}

          <TemplateProject />
        </FormContents>
      </form>

      {modalIsOpen ? (
        <TsModal
          projectId={projectId}
          message_list={message_list}
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setMessage_list={setMessage_list}
        />
      ) : null}
    </>
  );
}

const ContentCareerBottom = styled(ContentCareer)`
  margin-bottom: 50px;
`;

const FormContentsP = styled(FormContents)`
  margin-bottom: 0px;
`;

export default MakeTroubleShooting;
