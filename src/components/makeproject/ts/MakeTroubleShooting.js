import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButton,
  ButtonText,
  ContentCareer,
  FormText,
  FormTitle,
  MakeCenter,
} from "../../makeporf/shared/_sharedStyle";
import { FormContents } from "../../makeporf/view/Introduce";
import { FormMainText, FormSubText } from "../MakeProject";
import styled from "styled-components";
import TsModal from "./TsModal";
import { apis } from "../../../shared/axios";

function MakeTroubleShooting() {
  const { projectId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [message_list, setMessage_list] = useState([]);

  function openModal() {
    setIsOpen(true);
    apis.gitCommit(projectId).then((res) => {
      console.log(res.data.data);
      setMessage_list(res.data.data);
    });
  }

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
        <MakeCenter style={{ marginTop: "20px" }}>
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

const ContentCareerBottom = styled(ContentCareer)`
  margin-bottom: 50px;
`;

const FormContentsP = styled(FormContents)`
  margin-bottom: 50px;
`;

export default MakeTroubleShooting;
