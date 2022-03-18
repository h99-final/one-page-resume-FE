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
        {({ getRootProps, getInputProps, isFocused, isDragActive }) => (
          <section>
            <Inner {...getRootProps()}>
              <input {...getInputProps()} />
              {isFocused || isDragActive
                ? (<>
                  <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/eximghover.svg"}
                  />
                </>)
                : (<>
                  <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/eximg.svg"}
                  />
                </>)}
            </Inner>
          </section>
        )}
      </Dropzone>

      {files.map((file) => (
        <Image>
          <img style={{ borderRadius: "10px" }}
            width="250px" alt="selected" src={file.preview} />
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
`;
const Inner = styled.div`
  width: 250px;
  height: 250px;
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