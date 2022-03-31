import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormText, Next } from "./_sharedStyle";
import TemplateModal from "./TemplateModal";
import FinishModal from "./FinishModal";

function Template({ submitStack, projectSubmit }) {
  const { id } = useParams();
  let subtitle;
  const [modalOpen, setModalOpen] = useState(false);

  const exitClose = () => {
    setModalOpen(!modalOpen);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const [openTemplate, setOpenTemplate] = useState(false);

  return (
    <>
      <BottomNav>
        {openTemplate && (
          <TemplateModal
            openTemplate={openTemplate}
            setOpenTemplate={setOpenTemplate}
          />
        )}
        <TemplateSelector onClick={() => setOpenTemplate((prev) => !prev)}>
          <img
            alt="템플릿 선택"
            src={process.env.PUBLIC_URL + "/img/template.svg"}
          />
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
              // onClick={() => setModalOpen((prev) => !prev)}
            >
              {/* <input id="submitngo" type="submit" style={{ display: "none" }} /> */}
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
        <FinishModal
          subtitle={subtitle}
          afterOpenModal={afterOpenModal}
          exitClose={exitClose}
        ></FinishModal>
      )}
    </>
  );
}

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
    color: #00c4b4;
    transition: 0.2s ease-in-out;
  }
`;

const BottomNav = styled.div`
  z-index: 5;
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
