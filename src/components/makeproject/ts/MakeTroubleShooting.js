import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButton,
  ButtonText,
  Content,
  ContentCareer,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  MakeCenter,
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
import ShowTroubleShooting from "./ShowTroubleShooting";
import PreviousNextProject from "../PreviousNextProject";
import TemplateProject from "../shared/TemplateProject";
import { actionCreators as tsActions } from "../../../redux/modules/setProject";

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

  const [message_list, setMessage_list] = useState([]);

  // 선택된 커밋
  const commit = useSelector((state) => state.patchcode.commit);
  // 선택된 패치코드, 파일명
  const patchcode = useSelector((state) => state.patchcode.selectedPatchCode);
  console.log(patchcode);
  // 프로젝트에 속해있는 모든 파일
  const tsFile = useSelector((state) => state.patchcode.tsFile);

  // setIsOpen(true);
  const onValid = (data) => {
    // 모달창에서 커밋 목록 조회
    dispatch(tsfileactions.resetSelectPatchCode());

    const _data = {
      tsName: data.title,
      fileName: patchcode[0].name,
      patchCode: patchcode[0].patchCode,
      tsContent: data.content,
    };
    // 트러블 슈팅 redux에만 추가
    console.log(_data);
    dispatch(tsfileactions.addFile(_data));
    // 트러블 슈팅 선택된 패치 코드 지우기
    // DB에 저장하기
    handleSubmitDB(_data);
    setValue("title", "");
    setValue("content", "");
  };

  const modalOpen = () => {
    setIsOpen(true);
    apis.gitCommit(projectId).then((res) => {
      setMessage_list(res.data.data);
    });
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
              커밋 조회를 통해 프로젝트에서 해결한 문제들을 가져올 수 있어요.
            </FormSubText>
          </div>
        </FormTitle>
        <FormContents>
          {!!commit && !!patchcode ? (
            <>
              <Content>
                <Label>
                  <Font>트러블슈팅 제목</Font>
                </Label>
                <InputCustom
                  style={{ overflow: "hidden" }}
                  type="text"
                  {...register("title", { required: "제목을 입력해주세요." })}
                  maxLength={50}
                />
              </Content>
              <ErrorMessage>{errors?.title?.message}</ErrorMessage>
              <Content>
                <Label>
                  <Font>Commit</Font>
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
                  <Font>File Name</Font>
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
                  <Font>Patch Code</Font>
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
                    *추가 설명<br></br>(0/500)
                  </Font>
                </Label>
                <InputCustom
                  style={{ overflow: "hidden", height: "20vh" }}
                  type="text"
                  maxLength={50}
                  {...register("content", { required: true })}
                />
              </Content>
              <ErrorMessage>{errors?.content?.message}</ErrorMessage>
            </>
          ) : null}

          <FormContentsP>
            <MakeCenter style={{ margin: "20px auto" }}>
              <AddButton>
                <ContentCareerBottom>
                  {/* <ButtonText onClick={handleSubmit(onValid)}> */}
                  {patchcode ? (
                    <ButtonText onClick={handleSubmit(onValid)}>
                      + 트러블 슈팅 파일 저장 하기
                    </ButtonText>
                  ) : (
                    <ButtonText onClick={modalOpen}>
                      + 트러블 슈팅 파일 추가 하기
                    </ButtonText>
                  )}
                </ContentCareerBottom>
                <FormSubText>
                  커밋 조회를 통해 프로젝트에서 해결한 문제들을 가져올 수
                  있어요.
                </FormSubText>
              </AddButton>
            </MakeCenter>
          </FormContentsP>
          <hr style={{ margin: "50px" }} />

          {tsFile
            ? tsFile.map((e, i) => {
                return (
                  <>
                    <ShowTroubleShooting
                      key={tsFile.fileName + `${i}`}
                      {...e}
                    />
                  </>
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

const Textarea = styled.div``;

const InputCustomPatchCode = styled.div`
  width: 1120px;
  height: 19px;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  resize: none;
  border: none;
  background-color: white;
`;

const ContentCareerBottom = styled(ContentCareer)`
  margin-bottom: 50px;
`;

const FormContentsP = styled(FormContents)`
  margin-bottom: 0px;
`;

export default MakeTroubleShooting;
