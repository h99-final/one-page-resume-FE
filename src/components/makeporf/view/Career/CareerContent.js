import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../../redux/modules/careerContent";
import { InputCustom } from "../../shared/_sharedStyle";

function CareerContent(props) {
  const dispatch = useDispatch();
  const { content, index, id } = props;

  const defaultValues = {};
  const {
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(actionCreators.updateContent(e.target.value, index));
  };

  const deleteContent = (e) => {
    console.log(index);
    dispatch(actionCreators.deleteContent(id));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <InputCustom
          type="text"
          style={{
            border: "none",
            background: "white",
            marginTop: "15px",
          }}
          defaultValue={content}
          value={content}
          onChange={handleChange}
        />
        <div onClick={deleteContent}>-</div>
      </div>
    </>
  );
}

export default CareerContent;
