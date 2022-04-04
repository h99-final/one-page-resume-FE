import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
//component
import Highlighted from "../../makeproject/ts/Highlight";
//마크다운
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Spinner from "../../../shared/Spinner";

const TroubleShooting = (props) => {
  const {
    fileId,
    fileName,
    tsContent,
    tsPatchCodes,
    tsName,
    commitMsg,
    tsLength,
    fontcolor,
    troubleShootingLength,
    index,
    linkIndex,
  } = props;

  const [contrastColor, setContrastColor] = useState();
  useEffect(() => {
    if (fontcolor === "#000") {
      setContrastColor("#fff");
    } else {
      setContrastColor("#000");
    }
  }, []);


  // const [ts, setTS] = useState([]);
  const [selected, setSelected] = useState(0);

  const handleNumClick = (e) => {
    setSelected(e.target.id);
  };

  // 번호칸 만들기
  const NumBoxs = () =>
    Array(troubleShootingLength)
      .fill(0)
      .map((_e, i) => (
        <Link
          key={`number-${i}`}
          to={`troubleShooting-${linkIndex}-${i}`}
          spy={true}
          smooth={true}
          offset={-150}
        >
          <NumberBox
            fontcolor={fontcolor}
            contrastColor={contrastColor}
            onClick={handleNumClick}
            number={i}
            index={index}
          >
            {i + 1}
          </NumberBox>
        </Link>
      ));

  // 자동 영역 조절
  const [is_highlight_loading, setIs_highlight_loading] = useState(false);
  const [height, setHeight] = useState(null);

  const leftBox = useRef(null);

  useEffect(() => {
    setIs_highlight_loading(true);
    setHeight(leftBox?.current?.getBoundingClientRect().height);
    if (height) {
      setIs_highlight_loading(false);
    }
    return () => setIs_highlight_loading(false);
  }, [height]);

  return (
    <>
      <SampleCard fontcolor={fontcolor}>
        <LeftBox ref={leftBox}>
          <LeftTopBox style={{ marginBottom: "40px" }}>
            <FontTitle fontcolor={fontcolor} contrastColor={contrastColor}>
              {tsName}
            </FontTitle>
          </LeftTopBox>
          <MDEditor.Markdown
            style={{
              backgroundColor: "transparent",
              color: `${fontcolor}`,
              height: "100%",
              minHeight: "600px",
              maxWidth: "100%",
              width: "100%",
              boxSizing: "border-box",
            }}
            source={tsContent}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </LeftBox>
        <RightBox fontcolor={fontcolor}>
          <Num>
            <NumBoxs />
          </Num>
          <Font fontcolor={fontcolor} contrastColor={contrastColor}>
            {commitMsg}
          </Font>
          {!is_highlight_loading &&
            leftBox?.current?.getBoundingClientRect().height ? (
            <Highlighted
              fontcolor={fontcolor}
              height={
                leftBox.current.getBoundingClientRect().height > 600
                  ? leftBox.current.getBoundingClientRect().height
                  : 600
              }
              show={true}
              text={tsPatchCodes}
            />
          ) : (
            <Spinner />
          )}
        </RightBox>
      </SampleCard>
    </>
  );
};

const Num = styled.div`
  border: 1px solid white;
  border-bottom: none;
  display: flex;
  grid-gap: 0;
  flex-direction: row;
  width: 45vw;
`;

const SampleCard = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const LeftBox = styled.div`
  width: 45vw;
  display: flex;
  height: 100%;
  flex-direction: column;
  margin-right: 5vw;
`;

const LeftTopBox = styled.div`
  height: 4.5vw;
  width: 50vw;
  color: ${(props) => props.fontcolor};
`;

const LeftBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 20px; */
  min-height: calc(65% - 25px);
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */

  letter-spacing: -0.01em;

  /* WHITE */

  color: #ffffff;
`;
const RightBox = styled.div`
  /* margin: 0px auto; */
  /* display: inline-block; */
  flex-direction: column;
  /* height: ${(props) => (props.height > 600 ? `${props.height}px` : 600)}; */
  height: 600px;
  width: 50vw;
  /* max-width: 800px; */
  color: ${(props) => props.fontcolor};
`;

export const NumberBox = styled.div`
  width: calc(45vw / 10);
  height: calc(45vw / 10);
  /* background-color: ${(props) => props.fontcolor}; */
  background-color: ${(props) =>
    props.number === props.index
      ? `${props.fontcolor}`
      : `${props.contrastColor}`};
  color: ${(props) =>
    props.number === props.index
      ? `${props.contrastColor}`
      : `${props.fontcolor}`};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  h1 {
    padding: 18px 0px;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
  }
`;
// const Left = styled.div`
//   width: 325px;
//   height: 100%;
//   margin-right: 25px;
// `;

// const Number = styled.div`
//   width: 100%;
//   flex-direction: row;
//   flex-wrap: wrap;
//   display: flex;
// `;
export const Font = styled.div`
  padding: 20px;
  position: relative;
  top: 0;
  border: 1px solid ${(props) => props.fontcolor};
  /* position: relative; */
  /* flex-direction: row; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
`;
export const FontTitle = styled.div`
  /* padding: 20px; */
  position: relative;
  height: 100%;
  top: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${(props) => props.fontcolor};
`;

export default TroubleShooting;
