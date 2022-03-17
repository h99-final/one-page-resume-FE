import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { apis } from "../../../shared/axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../redux/modules/image";

function ForProjUpload(props) {
  const dispatch = useDispatch();

  // 파일 상태 관리
  const { images, setImages } = props;

  // 프리뷰 상태 관리
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState([]);

  const dropHandler = (file) => {
    let _images = [...file, ...images];
    console.log(_images);
    setImages(_images);
    setFiles(
      file.map((e) =>
        Object.assign(e, {
          preview: URL.createObjectURL(e)
        })
      )
    );
  };

  console.log(files.preview)


  function onImageChange(e) {
    const reader = new FileReader();
    const file = images;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreview(reader.result);
    };
  }

  return (
    <ProfileBox style={{ display: "flex" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Inner {...getRootProps()}>
              <input {...getInputProps()} />
              <img
                style={{ borderRadius: "10px" }}
                width="250px"
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/1330259.png"
              />
            </Inner>
          </section>
        )}
      </Dropzone>
      {files.map((file) => (
        <Image>
          <img width="250px" alt="selected" src={file.preview} />
        </Image>
      ))
      }
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  margin: 10px auto;
  width: 100%;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: white;
`;
const Inner = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
`;

const Image = styled.div`
  display: flex;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  background-image: ${(props) => (props ? props.bgUrl : null)};
  opacity: 1;
`;

const portrait = styled.div`
  background-image: url("/static/images/profile.png");
  background-size: cover;
  background-position: center;
  padding-top: 56.25%;
`;

export default ForProjUpload;
