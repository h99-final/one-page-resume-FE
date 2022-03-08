import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { apis } from '../../../shared/axios';
import styled from 'styled-components';

function FileUpload() {

  const tokencheck = document.cookie;
  const token = tokencheck.split("=")[1];
  const [Images, setImages] = useState([])


  const dropHandler = (files) => {

    //file을 백엔드에 전해줌(1)

    let formData = new FormData();

    formData.append("profileImage", files[0])

    apis.addImg(formData)
      // 백엔드가 file저장하고 그 결과가 reponse에 담김
      // 백엔드는 그 결과를 프론트로 보내줌(3)
      .then(response => {
        if (response.data) {
          setImages([...Images, response.data.data.img])
        } else {
          alert('파일 저장 실패')
        }
      })

  }

  return (
    <ProfileBox style={{ display: "flex", }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Inner
              {...getRootProps()}>
              <input {...getInputProps()} />
            </Inner>
          </section>
        )}
      </Dropzone>

      {/* Dropzone옆에 올린 파일 보여지는 곳 */}

      {Images.map((image, index) => (
        <Image>
          <img
            style={{ borderRadius: "10px" }}
            width='250px'
            alt=''
            src={image}
          />
        </Image>
      ))}


    </ProfileBox>
  )
}

const ProfileBox = styled.div`
  margin: 10px 0px;
  width: 100%;
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
`;
export default FileUpload