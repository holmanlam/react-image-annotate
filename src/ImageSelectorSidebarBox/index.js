// @flow

import CollectionsIcon from "@mui/icons-material/Collections"
import { grey } from "@mui/material/colors"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import isEqual from "lodash/isEqual"
import React, { memo } from "react"
import SidebarBoxContainer from "../SidebarBoxContainer"
import { styled } from '@mui/system';

const StyledImg = styled('img')({
  width: 40, height: 40, borderRadius: 8
});

export const ImageSelectorSidebarBox = ({ images, onSelect }) => {
  return (
      <SidebarBoxContainer
        title="Images"
        subTitle={`(${images.length})`}
        icon={<CollectionsIcon style={{ color: grey[700] }} />}
      >
        <div>
          <List>
            {images.map((img, i) => (
              <ListItem button onClick={() => onSelect(img)} dense key={i}>
                <StyledImg src={img.src} />
                <ListItemText
                  primary={img.name}
                  secondary={`${(img.regions || []).length} Labels`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </SidebarBoxContainer>
  )
}

const mapUsedImageProps = (a) => [a.name, (a.regions || []).length, a.src]

export default memo(ImageSelectorSidebarBox, (prevProps, nextProps) =>
  isEqual(
    prevProps.images.map(mapUsedImageProps),
    nextProps.images.map(mapUsedImageProps)
  )
)
