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
  const [previews, setPreviews] = useState([]);

  const dropHandler = (file) => {
    let _images = [...file, ...images];
    console.log(_images);
    setImages(_images);
  };

  // function onImageChange(e) {
  //   const reader = new FileReader();
  //   const file = images;
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     console.log(reader.result);
  //     setPreview(reader.result);
  //   };
  // }

  // useEffect(() => {
  //   let _preview = [];
  //   for (let i = 0; i < images.length; i++) {
  //     let reader = new FileReader();

  //     reader.readAsDataURL(images[i]);
  //     reader.onloadend = () => {
  //       _preview.push(reader.result);
  //     };
  //   }
  //   setPreviews(_preview);
  // }, [images]);

  // console.log(previews);

  return (
    <ProfileBox style={{ display: "flex" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Inner {...getRootProps()}>
              <input {...getInputProps()} />
            </Inner>
          </section>
        )}
      </Dropzone>

      {/* Dropzone옆에 올린 파일 보여지는 곳 */}

      {/* {previews.map((preview, index) => (
        <Image bgUrl={preview}>
          <img
            style={{ borderRadius: "10px" }}
            width="250px"
            alt=""
            src={preview}
          />
        </Image>
      ))} */}
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  margin: 10px 0px;
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: white;
`;
const Inner = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
  background-color: #555555;
`;

const Image = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 10px;
  background: #333333;
  background-image: ${(props) => (props ? props.bgUrl : null)};
`;

const portrait = styled.div`
  background-image: url("/static/images/profile.png");
  background-size: cover;
  background-position: center;
  padding-top: 56.25%;
`;
export default ForProjUpload;
