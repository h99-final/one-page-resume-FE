import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButton,
  ButtonText,
  Content,
  ContentCareer,
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
import { useSelector } from "react-redux";
import HighlightWithinTextarea from "react-highlight-within-textarea";

function MakeTroubleShooting() {
  const { projectId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [message_list, setMessage_list] = useState([]);

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const commit = useSelector((state) => state.patchcode.commit);
  const patchcode = useSelector((state) => state.patchcode.selectedPatchCode);
  // console.log(patchcode[0].patchCode);

  function openModal() {
    setIsOpen(true);
    apis.gitCommit(projectId).then((res) => {
      console.log(res.data.data);
      setMessage_list(res.data.data);
    });
  }

  console.log(patchcode);

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
            />
          </Content>
          <Content>
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
              <textarea
                style={{ width: "800px", height: "500px" }}
                // { highlight: "-", className: "red" },
                // { highlight: "+", className: "blue" },
              >
                icanhighlight
              </textarea>
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
              value={value}
              onChange={handleChange}
              maxLength={50}
            />
          </Content>
        </>
      ) : null}

      {modalIsOpen ? (
        <TsModal
          projectId={projectId}
          message_list={message_list}
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
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
