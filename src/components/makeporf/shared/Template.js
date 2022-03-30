import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import { FormText, Next } from "./_sharedStyle";
import { Button, Menu, MenuItem, Select } from "@mui/material";
import { apis } from "../../../shared/axios";
import TemplateModal from "./TemplateModal";

const options = [
  { value: "template1", label: "template1", id: "0" },
  { value: "template2", label: "template2", id: "1" },
  { value: "template3", label: "template3", id: "2" },
];

function Template() {
  const { id } = useParams();
  const history = useHistory();
  const { porfId } = useSelector((state) => state.user.user);
  const [template, setTemplate] = useState(0);
  const open = Boolean(template);

  const [openTemplate, setOpenTemplate] = useState(false);

  const handleClick = (event) => {
    setTemplate(event.currentTarget);
    // window.alert("준비중입니다.");
  };

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
          <FormText style={{ color: "white", marginLeft: "15px" }}>템플릿 선택</FormText>
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
            // onClick={() => history.push(`/portfolio/${porfId}`)}
            >
              <input id="submitngo" type="submit" style={{ display: "none" }} />
              작성 완료
            </FormTextWhite>
          </Save>
          <Label id={id} htmlFor="submit">
            <Save style={{ marginRight: "15px" }}>
              <input id="submit" type="submit" style={{ display: "none" }} />
              <FormTextWhite style={{ fontSize: "16px" }}>임시 저장</FormTextWhite>
            </Save>
          </Label>
        </div>
      </BottomNav>
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
`;

const BottomNav = styled.div`
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
  background: #2c2e39;
  padding: 0px 5px;
`;

export const FormTextWhite = styled(FormText)`
  cursor: pointer;
  color: black;
  width: auto !important;
  font-weight: 600;
`;

export default Template;
