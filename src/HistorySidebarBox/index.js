// @flow

import HistoryIcon from "@mui/icons-material/History"
import UndoIcon from "@mui/icons-material/Undo"
import { grey } from "@mui/material/colors"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import ListItemText from "@mui/material/ListItemText"
import isEqual from "lodash/isEqual"
import moment from "moment"
import React, { memo } from "react"
import SidebarBoxContainer from "../SidebarBoxContainer"
import { styled } from '@mui/system';

const StyledEmptyText = styled('div')({
  fontSize: 14,
  fontWeight: "bold",
  color: grey[500],
  textAlign: "center",
  padding: 20,
});

const listItemTextStyle = { paddingLeft: 16 }

export const HistorySidebarBox = ({
  history,
  onRestoreHistory,
}: {
  history: Array<{ name: string, time: Date }>,
}) => {

  return (
      <SidebarBoxContainer
        title="History"
        icon={<HistoryIcon style={{ color: grey[700] }} />}
        expandedByDefault
      >
        <List>
          {history.length === 0 && (
            <StyledEmptyText>No History Yet</StyledEmptyText>
          )}
          {history.map(({ name, time }, i) => (
            <ListItem button dense key={i}>
              <ListItemText
                style={listItemTextStyle}
                primary={name}
                secondary={moment(time).format("LT")}
              />
              {i === 0 && (
                <ListItemSecondaryAction onClick={() => onRestoreHistory()}>
                  <IconButton>
                    <UndoIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </SidebarBoxContainer>
  )
}

export default memo(HistorySidebarBox, (prevProps, nextProps) =>
  isEqual(
    prevProps.history.map((a) => [a.name, a.time]),
    nextProps.history.map((a) => [a.name, a.time])
  )
)
