import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";

const style = {
  width: "100%",
  maxWidth: 800,
  bgcolor: "background.paper",
  display: "flex",
};

function SideBar() {
  const history = useHistory();
  return (
    <>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText
            primary="포트폴리오 정보"
            onClick={() => history.push("/write/portfolio/introduce/:porfid")}
          />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText
            primary="내 소개"
            onClick={() => history.push("/write/portfolio/info/:porfid")}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="기술 스택"
            onClick={() => history.push("/write/portfolio/stack/:porfid")}
          />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText
            primary="직무 경험"
            onClick={() => history.push("/write/portfolio/career/:porfid")}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="프로젝트"
            onClick={() => history.push("/write/portfolio/project/:porfid")}
          />
        </ListItem>
      </List>
    </>
  );
}

export default SideBar;
