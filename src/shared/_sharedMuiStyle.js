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
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor,
    },
  },
  "& .MuiInputBase-input": {
    position: "relative",
    color: "white",
    width: "100%",
  },
}));

export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#fff",
      contrastText: "#000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});
