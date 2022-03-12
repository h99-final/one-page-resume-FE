import React from "react";
import { useSelector } from "react-redux";

const Highlighted = ({ text = "", highlight = "" }) => {
  const patchcode = useSelector((state) => state.patchcode.selectedPatchCode);
  if (!highlight) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {patchcode[0].patchCode.map((e, i) => {
        return e.charAt(0) === "-" ? (
          <mark key={i}>{e}</mark>
        ) : e.charAt(0) === "+" ? (
          <mark key={i}>{e}</mark>
        ) : (
          <span key={i}>{e}</span>
        );
      })}
    </span>
  );
};

export default Highlighted;
