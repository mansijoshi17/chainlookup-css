import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import redFlag from "../assets/redflag.png";
import { shortAddress } from "../config";

export default function Analytics({ transfers }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "block",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      {transfers.length > 0 && (
        <>
          {transfers.map((transfer) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={redFlag} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`From - ${shortAddress(transfer.from)}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          To
                        </Typography>
                        {`- ${shortAddress(transfer.to)}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
        </>
      )}
    </List>
  );
}
