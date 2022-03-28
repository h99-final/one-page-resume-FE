import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { apis } from "../../../shared/axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../../../redux/modules/user';

function FileUpload() {
  const dispatch = useDispatch()
  const [Images, setImages] = useState([]);
  const [img, setImg] = useState("");
  const userInfo = useSelector((state) => state.user.user);
  // const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));


  const dropHandler = (files) => {
    //file을 백엔드에 전해줌(1)
    let formData = new FormData();
    formData.append("profileImage", files[0]);

    apis
      .addImg(formData)
      // 백엔드가 file저장하고 그 결과가 reponse에 담김
      // 백엔드는 그 결과를 프론트로 보내줌(3)
      .then((response) => {
        setImages([...Images, response.data.data.img]);
        setImg(response.data.data.img);
        dispatch(userActions.userInfoDB());
      });
  };

  // console.log(userInfo)
  //   useEffect(() => {
  //   dispatch(userActions.userInfoDB());
  // }, []);

  return (
    <>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps, isFocused, isDragActive }) => (
          <>
            <Inner {...getRootProps()}>
              {userInfo.profileImage === "empty" ? (
                <Image>
                  {isFocused || isDragActive ? (
                    <>
                      <img
                        style={{ borderRadius: "10px" }}
                        width="100%"
                        alt="여기에 이미지를 드래그해주세요"
                        src={process.env.PUBLIC_URL + "/img/eximghover.svg"}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        style={{ borderRadius: "10px" }}
                        width="100%"
                        alt="이미지를 등록해주세요"
                        src={process.env.PUBLIC_URL + "/img/eximg.svg"}
                      />
                    </>
                  )}
                </Image>
              ) : (
                <Image>
                  <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    alt="이미지를 등록해주세요"
                    src={userInfo.profileImage}
                  />
                </Image>
              )}

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
  border: 1px solid #1f2029;
  :hover {
    outline: #00c4b4 !important;
    border: 1px solid #00c4b4 !important;
  }
  &:focus {
    outline: #00c4b4 !important;
    border: 1px solid #00c4b4 !important;
  }
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
