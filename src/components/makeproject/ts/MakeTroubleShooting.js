import React, { useEffect, useState } from "react";
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

function MakeTroubleShooting() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id, projectId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [message_list, setMessage_list] = useState([]);

  const commit = useSelector((state) => state.patchcode.commit);
  const patchcode = useSelector((state) => state.patchcode.selectedPatchCode);
  const tsFile = useSelector((state) => state.patchcode.tsFile);
  // console.log(patchcode[0].patchCode);

  function openModal() {
    setIsOpen(true);
    apis.gitCommit(projectId).then((res) => {
      console.log(res.data.data);
      setMessage_list(res.data.data);
    });
  }

  const onValid = (data) => {
    const _data = {
      tsName: data.title,
      fileName: patchcode[0].name,
      patchCode: patchcode[0].patchCode,
      tsContent: data.content,
    };
    dispatch(tsfileactions.addFile(_data));
    dispatch(tsfileactions.resetSelectPatchCode());
    handleSubmitDB();
  };

  const handleSubmitDB = () => {
    dispatch(tsfileactions.troubleShootingDB(projectId));
  };

  return (
    <>
      <FormTitle>
        <FormMainText>STEP 2</FormMainText>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormText>트러블 슈팅</FormText>
          <FormSubText>
            커밋 조회를 통해 프로젝트에서 해결한 문제들을 가져올 수 있어요.
          </FormSubText>
        </div>
      </FormTitle>
      <FormContentsP>
        <MakeCenter style={{ margin: "20px auto" }}>
          <AddButton>
            <ContentCareerBottom>
              <ButtonText onClick={openModal}>
                + 트러블 슈팅 파일 추가 하기
              </ButtonText>
            </ContentCareerBottom>
            <FormSubText>
              커밋 조회를 통해 프로젝트에서 해결한 문제들을 가져올 수 있어요.
            </FormSubText>
          </AddButton>
        </MakeCenter>
      </FormContentsP>
      <FormContents>
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
        {commit && patchcode ? (
          <>
            <Content>
              <Label>
                <Font>Commit</Font>
              </Label>
              <InputCustom
                style={{ overflow: "hidden" }}
                type="text"
                defaultValue={commit[0].message}
                maxLength={50}
                {...register("commit", { required: "커밋을 선택해 주세요." })}
              />
            </Content>
            <ErrorMessage>{errors?.commit?.message}</ErrorMessage>
            <Content>
              <Label>
                <Font>File Name</Font>
              </Label>
              <InputCustom
                style={{ overflow: "hidden" }}
                type="text"
                defaultValue={patchcode[0]?.name}
                maxLength={50}
                {...register("fileName", { required: "커밋을 선택해 주세요." })}
              />
            </Content>
            <ErrorMessage>{errors?.fileName?.message}</ErrorMessage>
            <Content>
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
            <ErrorMessage>{errors?.fileName?.message}</ErrorMessage>
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
            <FormContentsP>
              <MakeCenter style={{ margin: "20px auto" }}>
                <AddButton>
                  <ContentCareerBottom>
                    <ButtonText onClick={handleSubmit(onValid)}>
                      + 트러블 슈팅 파일 저장 하기
                    </ButtonText>
                  </ContentCareerBottom>
                  <FormSubText>
                    프로젝트의 트러블 슈팅 내역에 저장됩니다.
                  </FormSubText>
                </AddButton>
              </MakeCenter>
            </FormContentsP>
          </>
        ) : null}

        {tsFile?.map((e) => {
          return (
            <>
              <ShowTroubleShooting {...e} />
            </>
          );
        })}
      </FormContents>

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
  margin-bottom: 50px;
`;

export default MakeTroubleShooting;
