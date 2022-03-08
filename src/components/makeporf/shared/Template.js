import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
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
        <Save>
          <FormTextWhite>포트폴리오 저장</FormTextWhite>
        </Save>
      </BottomNav>
    </>
  );
}

const Save = styled(Next)`
  width: 125px;
  height: 62px;
  padding: 5px 50px;
  background-color: #cccccc;
`;

const TemplateSelector = styled.div`
  display: flex;
  margin: 20px 32px;
  justify-content: center;
  align-items: center;
`;

const BottomNav = styled.div`
  border-bottom: 1px solid black;
  display: fixed;
  align-items: center;
  justify-content: space-between;
  width: auto;
  min-width: 1440px;
  height: 100px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  bottom: 0px;
  background: #999999;
`;

const FormTextWhite = styled(FormText)`
  color: #ffffff;
`;

export default Template;
