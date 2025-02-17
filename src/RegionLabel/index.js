// @flow
import CheckIcon from "@mui/icons-material/Check"
import TrashIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import { grey } from "@mui/material/colors"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { styled } from '@mui/system'
import classnames from "classnames"
import React, { memo, useRef } from "react"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import type { Region } from "../ImageCanvas/region-tools.js"

import { asMutable } from "seamless-immutable"

const StyledRegionInfo = styled(Paper)({
  fontSize: 12,
    cursor: "default",
    transition: "opacity 200ms",
    opacity: 0.5,
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer",
    },
    "&.highlighted": {
      opacity: 0.9,
      "&:hover": {
        opacity: 1,
      },
    },
    // pointerEvents: "none",
    fontWeight: 600,
    color: grey[900],
    padding: 8,
    "& .name": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& .circle": {
        marginRight: 4,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.4)",
        width: 10,
        height: 10,
        borderRadius: 5,
      },
    },
    "& .tags": {
      "& .tag": {
        color: grey[700],
        display: "inline-block",
        margin: 1,
        fontSize: 10,
        textDecoration: "underline",
      },
    },
})

const StyledCommentBox = styled(TextField)({
  fontWeight: 400,
  fontSize: 13,
})


type Props = {
  region: Region,
  editing?: boolean,
  allowedClasses?: Array<string>,
  allowedTags?: Array<string>,
  cls?: string,
  tags?: Array<string>,
  onDelete: (Region) => null,
  onChange: (Region) => null,
  onClose: (Region) => null,
  onOpen: (Region) => null,
  onRegionClassAdded: () => {},
  allowComments?: boolean,
}

export const RegionLabel = ({
  region,
  editing,
  allowedClasses,
  allowedTags,
  onDelete,
  onChange,
  onClose,
  onOpen,
  onRegionClassAdded,
  allowComments,
}: Props) => {
  const commentInputRef = useRef(null)
  const onCommentInputClick = (_) => {
    // The TextField wraps the <input> tag with two divs
    const commentInput = commentInputRef.current.children[0].children[0]

    if (commentInput) return commentInput.focus()
  }

  return (
      <StyledRegionInfo
        onClick={() => (!editing ? onOpen(region) : null)}
        className={classnames({
          highlighted: region.highlighted,
        })}
      >
        {!editing ? (
          <div>
            {region.cls && (
              <div className="name">
                <div
                  className="circle"
                  style={{ backgroundColor: region.color }}
                />
                {region.cls}
              </div>
            )}
            {region.tags && (
              <div className="tags">
                {region.tags.map((t) => (
                  <div key={t} className="tag">
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ width: 200 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: region.color || "#888",
                  color: "#fff",
                  padding: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                  borderRadius: 4,
                  fontWeight: "bold",
                  textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                }}
              >
                {region.type}
              </div>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                onClick={() => onDelete(region)}
                tabIndex={-1}
                style={{ width: 22, height: 22 }}
                size="small"
                variant="outlined"
              >
                <TrashIcon style={{ marginTop: -8, width: 16, height: 16 }} />
              </IconButton>
            </div>
            {(allowedClasses || []).length > 0 && (
              <div style={{ marginTop: 6 }}>
                <CreatableSelect
                  placeholder="Classification"
                  onChange={(o, actionMeta) => {
                    if (actionMeta.action == "create-option") {
                      onRegionClassAdded(o.value)
                    }
                    return onChange({
                      ...(region: any),
                      cls: o.value,
                    })
                  }}
                  value={
                    region.cls ? { label: region.cls, value: region.cls } : null
                  }
                  options={asMutable(
                    allowedClasses.map((c) => ({ value: c, label: c }))
                  )}
                />
              </div>
            )}
            {(allowedTags || []).length > 0 && (
              <div style={{ marginTop: 4 }}>
                <Select
                  onChange={(newTags) =>
                    onChange({
                      ...(region: any),
                      tags: newTags.map((t) => t.value),
                    })
                  }
                  placeholder="Tags"
                  value={(region.tags || []).map((c) => ({
                    label: c,
                    value: c,
                  }))}
                  isMulti
                  options={asMutable(
                    allowedTags.map((c) => ({ value: c, label: c }))
                  )}
                />
              </div>
            )}
            {allowComments && (
              <StyledCommentBox
                fullWidth
                multiline
                rows={3}
                ref={commentInputRef}
                onClick={onCommentInputClick}
                value={region.comment || ""}
                onChange={(event) =>
                  onChange({ ...(region: any), comment: event.target.value })
                }
              />
            )}
            {onClose && (
              <div style={{ marginTop: 4, display: "flex" }}>
                <div style={{ flexGrow: 1 }} />
                <Button
                  onClick={() => onClose(region)}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  <CheckIcon />
                </Button>
              </div>
            )}
          </div>
        )}
      </StyledRegionInfo>
  )
}

export default memo(
  RegionLabel,
  (prevProps, nextProps) =>
    prevProps.editing === nextProps.editing &&
    prevProps.region === nextProps.region
)
