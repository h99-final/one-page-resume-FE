import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../../redux/modules/image";
import { Font } from "../view/Introduce";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function FileUpload() {
  const fileInput = useRef();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();

  function onImageChange(e) {
    const reader = new FileReader();
    const file = fileInput?.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreview(reader.result);
    };
  }

  useEffect(() => {
    dispatch(actionCreators.setPreview(preview));
  }, [image]);

  return (
    <>
      <FileInput
        type="file"
        id="file"
        ref={fileInput}
        onChange={onImageChange}
        accept="image/png, image/jpeg, image/gif"
      ></FileInput>
      {preview !== null ? (
        <>
          <Image>
            <label htmlFor="file">
              <Inner src={preview ? preview : "https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/add_icon_143118.png"}>

              </Inner>
              <Font style={{ position: "relative" }} >Drag files to upload</Font>
            </label>
          </Image>

        </>
      ) : (
        <label htmlFor="file">
          <Image>
            <AddPhotoAlternateIcon sx={_styles} />
          </Image>
        </label>
      )}
    </>
  );
}

const _styles = {
  zIndex: 7,
};

const FileInput = styled.input`
  display: none;
`;

const Inner = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  object-fit: cover;
`;

const Image = styled.div`
  display: flex;
  padding: 15px;
  border-radius: 10px;
  background: #ffffff;
  margin-top: 10px;
`;

export default FileUpload;