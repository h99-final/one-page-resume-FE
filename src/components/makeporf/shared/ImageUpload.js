
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { apis } from '../../../shared/axios';
import styled from 'styled-components';
function FileUpload() {

  const tokencheck = document.cookie;
  const token = tokencheck.split("=")[1];
  const [Images, setImages] = useState([])
  const [img, setImg] = useState("");

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
          setImg(response.data.data.img)
        } else {
          alert('파일 저장 실패')
        }
      })

  }

  return (

    <ProfileBox style={{ display: "flex", }}>
      <Dropzone onDrop={dropHandler}>


        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>

            <Inner
              {...getRootProps()}>
              {isDragActive ? (
                <p>여기에 올려놓으세요</p>
              ) : (
                <p>여기에 파일을 드래그하거나 <br />클릭하여 이미지를 등록해주세요</p>
              )}
              <Image>
                <img
                  style={{ borderRadius: "10px" }}
                  width='100%'
                  alt=''
                  src={img}
                />
              </Image>
              <input {...getInputProps()} />
            </Inner>

          </section>
        )}

      </Dropzone>

      {/* Dropzone옆에 올린 파일 보여지는 곳 */}

      {/* {Images.map((image, index) => ( */}

      {/* ))} */}


    </ProfileBox>
  )
}

const ProfileBox = styled.div`
  
`;
const Inner = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
  background-color: white;
  p{
    position: relative;
    top: 45%;
    text-align: center;
    padding: 0px 10px;
    z-index: 1;
  }
`;

const Image = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 10px;
  background: #333333;
  z-index: 2;
  img{
    :hover{
      border: 5px solid;
    }
  }
`;

export default FileUpload