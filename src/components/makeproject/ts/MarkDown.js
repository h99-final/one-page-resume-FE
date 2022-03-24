import React from "react";
import MDEditor from "@uiw/react-md-editor";

function MarkDown({ value, setValue }) {
  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} />
    </div>
  );
}

export default MarkDown;
