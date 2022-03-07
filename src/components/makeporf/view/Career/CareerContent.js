import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as contentActions } from "../../../../redux/modules/careercontent";
import { InputCustom } from "../../shared/_sharedStyle";

function CareerContent(props) {
  const dispatch = useDispatch();
  const { content, index } = props;

  const defaultValues = {};
  const {
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const deleteContent = (e) => {
    console.log(index);
    // e.preventDefault();
    dispatch(contentActions.deleteContent(index));
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
          value={content}
          disabled
        />
        <div onClick={deleteContent}>-</div>
      </div>
    </>
  );
}

export default CareerContent;
