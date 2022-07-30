import TextField from "@mui/material/TextField"
import { styled } from '@mui/system';
import React from "react"

const ShortcutKeyFieldWrapper = styled('div')({
  paddingTop: 8,
  display: "inline-flex",
  width: "100%",
});

const ShortcutTextfield = styled(TextField)({
  width: "100%",
  boxSizing: "border-box",
  textAlign: "center",
});

const ShortcutField = ({ actionId, actionName, keyName, onChangeShortcut }) => {
  return (
      <ShortcutKeyFieldWrapper>
        <ShortcutTextfield
          variant="outlined"
          label={actionName}
          value={keyName}
          onKeyPress={(e) => {
            onChangeShortcut(actionId, e.key)
            e.stopPropagation()
          }}
        />
      </ShortcutKeyFieldWrapper>
  )
}

export default ShortcutField
