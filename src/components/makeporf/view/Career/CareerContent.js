import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../../redux/modules/portfolio";
import { InputCustom } from "../../shared/_sharedStyle";

function CareerContent(props) {
  const dispatch = useDispatch();
  const { content, index } = props;

  const defaultValues = {};
  const {
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const [value, setValue] = useState(content);

  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(actionCreators.updateCareer(value, index));
  };
  return (
    <>
      <InputCustom
        type="text"
        style={{
          border: "none",
          background: "white",
          marginTop: "15px",
        }}
        value={content}
        disabled
      />
    </>
  );
}

export default CareerContent;
