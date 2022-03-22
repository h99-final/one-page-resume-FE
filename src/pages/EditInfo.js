import React from "react";
import { useParams } from "react-router-dom";
import ChangeInfo from '../components/editInfo/ChangeInfo';
import SideBar from '../components/editInfo/SideBar';
import Header from "../shared/Header";
import styled from "styled-components";
import MainStack from '../components/editInfo/MainStack';
import EditPwd from '../components/editInfo/EditPwd';
import EditInfoHeader from '../components/Element/EditInfoHeader';

function EditInfo() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Header />
      <WriteForm>
        <EditInfoHeader />
        <WriteTemplate>
          <SideBar />
          <WriteableForm>
            {id === "changeinfo" ? <ChangeInfo /> : null}
            {id === "mainstack" ? <MainStack /> : null}
            {id === "editpwd" ? <EditPwd /> : null}
          </WriteableForm>
        </WriteTemplate>
      </WriteForm>
    </>
  );
}
export const WriteForm = styled.div`
  width: 95%;
  height: auto;
  min-height: 80vh;
  max-width: 1440px;
  display: block;
  justify-content: center;
  margin: 0px auto;
  background: #1F2029;
  @media screen and (min-width: 1194px) {
    & {
      width: 95%;
      max-width: 1440px;
      justify-content: center;
    }
  }
  @media screen and (min-width: 834px) {
    & {
      max-width: 1440px;
    }
  }
`;

export const WriteTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 252px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export const WriteableForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: 100%;
  height: 100%;
  background-color: #2C2E39;
  border-radius: 10px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
  padding-bottom: 10px;
`;
export default EditInfo;
