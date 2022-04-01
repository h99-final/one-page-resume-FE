import React, { useState } from "react";
import Modal from "react-modal";
//style
import styled from "styled-components";
import { apis } from "../../../shared/axios";
import { FormTextLight } from "../../makeproject/ts/TokenHelp";
import { FormTextCenter, FormTitleFlex } from "../../makeproject/ts/TsModal";
import { FormTextWhite } from "./Template";
import { IconBox, Next } from "./_sharedStyle";
import "./_modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70vw",
    height: "85%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    background: "#2C2E39",
    padding: "0px",
    overflow: "hidden",
    minWidth: "1000px",
  },
};

const options = [
  {
    templateIndex: 1,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/1-1.png"}`,
  },
  {
    templateIndex: 2,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/1-2.png"}`,
  },
  {
    templateIndex: 3,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/1-3.png"}`,
  },
  {
    templateIndex: 4,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/2-1.png"}`,
  },
  {
    templateIndex: 5,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/2-2.png"}`,
  },
  {
    templateIndex: 6,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/2-3.png"}`,
  },
  {
    templateIndex: 7,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/3-1.png"}`,
  },
  {
    templateIndex: 8,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/3-2.png"}`,
  },
  {
    templateIndex: 9,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/3-3.png"}`,
  },
  {
    templateIndex: 10,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/4-1.png"}`,
  },
  {
    templateIndex: 11,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/4-2.png"}`,
  },
  {
    templateIndex: 12,
    source: `${process.env.PUBLIC_URL + "/templateAssets/card/4-3.png"}`,
  },
];

function TemplateModal(props) {
  const { openTemplate, setOpenTemplate, subtitle } = props;
  const closeModal = () => {
    setOpenTemplate(false);
  };

  const [selected, setSelected] = useState();
  const submitTemplate = () => {
    let idx = {
      idx: selected,
    };
    apis
      .templatePut(idx)
      .then((res) => {
        setOpenTemplate(false);
      })
      .catch((error) => {
        alert("적용 실패하였습니다.");
      });
  };

  Modal.setAppElement("#root");

  return (
    <>
      <Modal
        isOpen={openTemplate}
        ariaHideApp={false}
        onRequestClose={closeModal}
        // style={customStyles}
        className="Modal"
        overlayClassName="Overlay"
      >
        <IconBoxLeft onClick={() => setOpenTemplate(false)}>
          <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
        </IconBoxLeft>
        <FormTitleFlex>
          <FormTextCenter>Template 선택하기</FormTextCenter>
          <FormTextLight>
            포트폴리오에 적용할 템플릿을 선택해주세요. (* 템플릿 미선택시
            기본으로 제공합니다.)
          </FormTextLight>
        </FormTitleFlex>
        <Ulist>
          {options.map((e, i) => {
            return (
              <div
                style={{
                  display: "inline-block",
                  margin: "3%",
                  position: "relative",
                  width: "27%",
                  height: "50%",
                }}
              >
                <Image
                  selected={selected === e.templateIndex ? true : false}
                  style={{ width: "100%" }}
                  onClick={() => setSelected(e.templateIndex)}
                  alt="index1"
                  src={e.source}
                />
                <CheckImg
                  selected={selected === e.templateIndex ? true : false}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/check.svg"}
                />
              </div>
            );
          })}
        </Ulist>
        <div
          style={{
            alignItems: "center",
            height: "60px",
            margin: "20px",
          }}
        >
          <Save
            style={{
              marginRight: "20px",
              background: "#00C4B4",
            }}
          >
            <FormTextWhite style={{ color: "white" }} onClick={submitTemplate}>
              <input id="submitngo" type="submit" style={{ display: "none" }} />
              선택 완료
            </FormTextWhite>
          </Save>
        </div>
      </Modal>
    </>
  );
}
const Save = styled(Next)`
  width: 100px;
  height: 36px;
  padding: 5px 10px;
  background-color: white;
  display: flex;
  justify-content: center !important;
  align-items: center;
`;

const Ulist = styled.ul`
  margin: auto 100px;
  height: 50vh;
  overflow: auto;
  border: 1px solid #696b7b;
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

const Image = styled.img`
  width: 100%;
  /* border: 1px solid ${(props) => (props.selected ? "#00C4B4" : "none")}; */
`;

const CheckImg = styled.img`
  width: 30px;
  height: auto;
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 10px;
  opacity: ${(props) => (props.selected ? 1 : 0)};
`;

export const IconBoxLeft = styled(IconBox)`
  width: 50px;
  margin-left: auto;
  background-color: #2c2e39;
`;

export default TemplateModal;
