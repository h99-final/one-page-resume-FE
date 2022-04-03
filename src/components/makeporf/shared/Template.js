import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormText, Next } from "./_sharedStyle";
import TemplateModal from "./TemplateModal";
import FinishModal from "./FinishModal";

//svg
import { ReactComponent as TemplateIcon } from "../../../assets/template.svg";
import { apis } from "../../../shared/axios";

function Template({
  submitStack,
  projectSubmit,
  submitOnlyUserStack,
  stack,
  careerSubmit,
}) {
  const { id } = useParams();
  const history = useHistory();
  let subtitle;
  const [modalOpen, setModalOpen] = useState(false);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const exitClose = () => {
    setModalOpen(false);
  };

  const [openTemplate, setOpenTemplate] = useState(false);

  const handleCheck = () => {
    apis
      .introPorfGet(userInfo.porfId)
      .then((res) => {
        let { title, contents } = res.data.data;
        if (title === null || contents === null) {
          alert("필수값을 입력해 주세요.");
          history.push(`/write/portfolio/introduce/${userInfo.porfId}`);
          return;
        }

        if (userInfo.name === null || userInfo.githubUrl === null) {
          alert("필수값을 입력해 주세요.");
          history.push(`/write/portfolio/info/${userInfo.porfId}`);
          return;
        }

        if (userInfo?.stack.length !== 3) {
          history.push(`/write/portfolio/stack/${userInfo.porfId}`);
          alert("필수값을 입력해 주세요.");
          return;
        }
        if (userInfo?.stack.length === 3) {
          const data = {
            stack: stack,
          };
          apis
            .putStack(data)
            .then()
            .catch((error) => {
              return;
            });
        }
      })
      .then(() => {
        setModalOpen(true);
      });
  };

  // TemplateModal.setAppElement("#root");

  return (
    <>
      {openTemplate && (
        <TemplateModal
          openTemplate={openTemplate}
          setOpenTemplate={setOpenTemplate}
        />
      )}
      <BottomNav>
        <TemplateSelector onClick={() => setOpenTemplate((prev) => !prev)}>
          <TemplateIconSet />
          <FormText style={{ marginLeft: "15px" }}>템플릿 선택</FormText>
        </TemplateSelector>
        <div>
          <Save
            style={{
              marginRight: "20px",
              background: "#00C4B4",
            }}
          >
            <FormTextWhite
              style={{ color: "white", fontSize: "16px" }}
              // onClick={}
              onClick={handleCheck}
            >
              {id === "career" ? (
                <input
                  id="submitngo"
                  type="submit"
                  style={{ display: "none" }}
                />
              ) : null}
              작성 완료
            </FormTextWhite>
          </Save>
          {id === "stack" ? (
            <Save onClick={submitStack} style={{ marginRight: "15px" }}>
              <FormTextWhite style={{ fontSize: "16px" }}>
                임시 저장
              </FormTextWhite>
            </Save>
          ) : id === "project" ? (
            <Save onClick={projectSubmit} style={{ marginRight: "15px" }}>
              <FormTextWhite style={{ fontSize: "16px" }}>
                임시 저장
              </FormTextWhite>
            </Save>
          ) : (
            <Label id={id} htmlFor="submit">
              <Save style={{ marginRight: "15px" }}>
                <input id="submit" type="submit" style={{ display: "none" }} />
                <FormTextWhite style={{ fontSize: "16px" }}>
                  임시 저장
                </FormTextWhite>
              </Save>
            </Label>
          )}
        </div>
      </BottomNav>

      {modalOpen && (
        <FinishModal subtitle={subtitle} exitClose={exitClose}></FinishModal>
      )}
    </>
  );
}
const TemplateIconSet = styled(TemplateIcon)`
  path {
    fill: #fff;
  }
`;

const Save = styled(Next)`
  width: 120px;
  height: 42px;
  padding: 5px 10px;
  background-color: white;
  display: flex;
  justify-content: center !important;
  align-items: center;
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
`;

const TemplateSelector = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  color: #fff;
  &:hover {
    path {
      fill: #00c4b4;
    }
    color: #00c4b4;
  }
`;

const BottomNav = styled.div`
  z-index: 3;
  display: fixed;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  left: 0;
  width: 100%;
  min-width: 768px;
  height: 80px;
  margin-top: 50px;
  bottom: 0px;
  background: rgba(19, 19, 27, 0.8);
  backdrop-filter: blur(20px);
  padding: 0px 5px;
`;

export const FormTextWhite = styled(FormText)`
  cursor: pointer;
  color: black;
  width: auto !important;
  font-weight: 600;
`;

export default Template;
