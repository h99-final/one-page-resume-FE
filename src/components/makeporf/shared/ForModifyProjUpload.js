import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { apis } from "../../../shared/axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../redux/modules/image";
import { Icon, IconBox } from "./_sharedStyle";

function ForModifyProjUpload(props) {
  const dispatch = useDispatch();

  // 파일 상태 관리
  const { images, setImages, projectId } = props;

  // 프리뷰 상태 관리
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);

  const dropHandler = (file) => {
    if (file.length !== 0) {
      let modifyPic = new FormData();
      for (let i = 0; i < file.length; i++) {
        modifyPic.append("images", file[i]);
      }
      apis.modifyPictureProject(modifyPic, projectId).then((res) => {
        setFiles(res.data.data);
      });
    }
  };

  useEffect(() => {
    apis.projectGet(projectId).then((res) => {
      setFiles(res.data.data.img);
    });
  }, []);

  function deletePreview(e) {
    apis
      .deletePictureProject(projectId, e.target.id)
      .then((res) => { })
      .catch((err) => {
        alert("삭제 실패했습니다.");
      });

    let _files = files.filter(
      (element, index) => Number(element.id) !== Number(e.target.id)
    );
    setFiles(_files);
  }

  return (
    <ProfileBox style={{ display: "flex" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps, isFocused, isDragActive }) => (
          <section>
            <Inner {...getRootProps()}>
              <input {...getInputProps()} />
              {isFocused || isDragActive ? (
                <>
                  <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/eximghover.svg"}
                  />
                </>
              ) : (
                <>
                  <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/eximg.svg"}
                  />
                </>
              )}
            </Inner>
          </section>
        )}
      </Dropzone>

      {files.map((file, i) => (
        <Image key={`files-${file.id}`}>
          <img
            style={{ borderRadius: "10px" }}
            width="250px"
            alt="selected"
            src={file.url}
          />
          <TrashImg
            id={file.id}
            onClick={(e) => deletePreview(e)}
            alt=""
            src={process.env.PUBLIC_URL + "/img/delete.svg"}
          />
        </Image>
      ))}
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
  position: relative;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  background-image: ${(props) => (props ? props.bgUrl : null)};
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;

const TrashImg = styled.img`
  width: 30px;
  height: auto;
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 10px;
  opacity: 0;
  ${Image}:hover & {
    opacity: 1;
  }
`;

const portrait = styled.div`
  background-image: url("/static/images/profile.png");
  background-size: cover;
  background-position: center;
  padding-top: 56.25%;
`;

export default ForModifyProjUpload;
