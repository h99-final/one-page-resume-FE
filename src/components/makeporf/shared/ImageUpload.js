import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { apis } from "../../../shared/axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
function FileUpload() {
  const { id } = useParams();
  const match = useRouteMatch();
  const tokencheck = document.cookie;
  const token = tokencheck.split("=")[1];
  const [Images, setImages] = useState([]);
  const [img, setImg] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dropHandler = (files) => {
    //file을 백엔드에 전해줌(1)
    console.log(files);

    let formData = new FormData();
    console.log(files);

    formData.append("profileImage", files[0]);

    apis
      .addImg(formData)
      // 백엔드가 file저장하고 그 결과가 reponse에 담김
      // 백엔드는 그 결과를 프론트로 보내줌(3)
      .then((response) => {
        if (response.data) {
          setImages([...Images, response.data.data.img]);
          setImg(response.data.data.img);
        } else {
          alert("파일 저장 실패");
        }
      });
  };

  return (
    <>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <>
            <Inner {...getRootProps()}>
              <Image>
                <img
                  style={{ borderRadius: "10px" }}
                  width="100%"
                  alt=""
                  src={img ? img : `${userInfo?.profileImage}`}
                />
                {isDragActive ? (
                  <Label>여기에 올려놓으세요</Label>
                ) : (
                  <Label>
                    여기에 파일을 드래그하거나 <br />
                    클릭하여 이미지를 등록해주세요
                  </Label>
                )}
              </Image>
              <input {...getInputProps()} />
            </Inner>
          </>
        )}
      </Dropzone>
    </>
  );
}

const ProfileBox = styled.div``;
const Inner = styled.div`
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid;
  overflow: hidden;
  object-fit: cover;
`;

const Image = styled.div`
  width: 99%;
  height: 99%;
  margin: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 2;
  img {
    z-index: 1125;
    :hover {
      border: 5px solid;
    }
    span {
      width: 99%;
      color: white;
      border: 1px solid white;
      z-index: 1;
    }
  }
`;

export const Label = styled.div`
  position: absolute;
  align-items: center;
  text-align: center;
  flex-direction: row;

  width: 99%;
  z-index: 0;
  min-width: 250px;
`;

export default FileUpload;
