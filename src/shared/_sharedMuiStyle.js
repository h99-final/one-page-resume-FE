import { TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styled from "styled-components";

export const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    // borderBottomColor: p.focuscolor,
    borderBottomColor: "#696B7B",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor,
    },
    '& fieldset': {
      borderColor: "#CFD3E2"
    },
  },

  "& .MuiInputBase-input": {
    position: "relative",
    color: "#696B7B",
    width: "100%",
    borderBottomColor: "#696B7B",
  },
}));
