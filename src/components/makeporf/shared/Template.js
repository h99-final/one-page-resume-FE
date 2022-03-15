import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import { FormText, Next } from "./_sharedStyle";
import { Button, Menu, MenuItem, Select } from "@mui/material";

const options = [
  { value: "template1", label: "template1", id: "0" },
  { value: "template2", label: "template2", id: "1" },
  { value: "template3", label: "template3", id: "2" },
];

function Template() {
  const { id } = useParams();
  const { porfId } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [template, setTemplate] = useState(0);
  const open = Boolean(template);

  const handleClick = (event) => {
    setTemplate(event.currentTarget);
  };

  const handleClose = (event) => {
    setTemplate(null);
  };

  useEffect(() => {}, []);

  return (
    <>
      <BottomNav>
        <TemplateSelector>
          <Button
            sx={{ color: "white" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <TableChartRoundedIcon onClick={handleClick} />
            <FormText style={{ color: "white" }}>템플릿 선택</FormText>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={template}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>0</MenuItem>
            <MenuItem onClick={handleClose}>1</MenuItem>
            <MenuItem onClick={handleClose}>2</MenuItem>
          </Menu>
        </TemplateSelector>
        <div>
          <Save>
            <FormTextWhite>작성 완료</FormTextWhite>
          </Save>
          <Label id={id} htmlFor="submit">
            <Save style={{ marginRight: "5px" }}>
              <input id="submit" type="submit" style={{ display: "none" }} />
              <FormTextWhite>임시 저장</FormTextWhite>
            </Save>
          </Label>
        </div>
      </BottomNav>
    </>
  );
}

const Save = styled(Next)`
  width: 125px;
  height: 42px;
  padding: 5px 10px;
  background-color: #cccccc;
  display: flex;
  justify-content: center !important;
  align-items: center;
`;
const TempSave = styled(Next)`
  width: 125px;
  height: 42px;
  padding: 5px 10px;
  background-color: #cccccc;
  display: flex;
  justify-content: center !important;
  align-items: center;
`;

const Label = styled.label`
  display: ${(props) =>
    props.id === "career" || props.id === "stack" || props.id === "project"
      ? "none"
      : "flex"};
`;

const TemplateSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomNav = styled.div`
  display: fixed;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  left: 0;
  width: 100%;
  min-width: 768px;
  height: 70px;
  margin-top: 50px;
  bottom: 0px;
  background: #999999;
`;

const FormTextWhite = styled(FormText)`
  color: #ffffff;
`;

export default Template;
