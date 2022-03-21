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

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
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
        {({ getRootProps, getInputProps, isFocused, isDragActive }) => (
          <>
            <Inner {...getRootProps()}>
              <Image>
                {isFocused || isDragActive
                  ? (<>
                    <img
                      style={{ borderRadius: "10px" }}
                      width="100%"
                      alt={process.env.PUBLIC_URL + "/img/eximghover.svg"}
                      src={img ? img : userInfo.profileImage}
                    />
                  </>)
                  : (<>
                    <img
                      style={{ borderRadius: "10px" }}
                      width="100%"
                      alt={process.env.PUBLIC_URL + "/img/eximg.svg"}
                      src={img ? img : userInfo.profileImage}
                    />
                  </>)}


              </Image>
              <input {...getInputProps()} />
            </Inner>
          </>
        )}
      </Dropzone>
    </>
  );
}

const Inner = styled.div`
  width: 250px;
  height: 250px;
  margin: 20px 0px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 2;
  img {
    z-index: 115;
    :hover {
    }
    span {
      width: 99%;
      color: white;
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
