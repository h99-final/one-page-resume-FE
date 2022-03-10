import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../../redux/modules/careerContent";
import { Content, InputCustom, Label } from "../../shared/_sharedStyle";
import { Font } from "../Introduce";

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

  return (
    <>
      <Content>
        <Label>
          <Font></Font>
        </Label>
        <InputCustom
          type="text"
          style={{
            border: "none",
            background: "white",
            height: "40px",
          }}
          defaultValue={content}
          value={content}
          onChange={handleChange}
        />
      </Content>
    </>
  );
}

export default CareerContent;
